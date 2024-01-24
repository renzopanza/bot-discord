// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();
const { TOKEN } = process.env
// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection()

// Importacao dos comandos -- node:fs é o modulo nativo do node para mexer com arquivos -- node:path serve para mexer com caminhos 
const fs = require("node:fs")
const path = require("node:path")

//busco o caminho/path do arquivo
const commandsPath = path.join(__dirname, "commands")

//Le o diretorio do commandsPath que foi pego acima e filtra para apenas arquivos .js
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"))
console.log(commandFiles)

//Busca dentro desse array e traz a informacao de dentro desse arquivo
for (const file of commandFiles){
	const filePath = path.join(commandsPath, file)
	const commands = require(filePath)
	if ("data" in commands && "execute" in commands) {
		client.commands.set(commands.data.name, commands)
	} else {
		console.log(`Este comando do caminhp ${filePath} esta com Data ou Execute ausentes`)
	}
	console.log(client.commands)
}

// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, readyClient => {
	console.log(`Sucesso! Você logou como ${readyClient.user.tag}`);
});

// Log in to Discord with your client's token
client.login(TOKEN);

// Listener de interacoes com o bot
client.on(Events.InteractionCreate, async interaction =>{
	if (!interaction.isChatInputCommand()) return
	const command = interaction.client.commands.get(interaction.commandName)
	if(!command) {
		console.error("Comando não encontrado")
		return
	}
	try {
		await command.execute(interaction)
	}
	catch (error) {
		console.error(error)
		await interaction.reply("Houve um erro ao executar esse comando")
	}
})