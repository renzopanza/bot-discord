const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")

const gitEmbed = new EmbedBuilder()
	.setColor("DarkBlue")
	.setTitle('Comandos Git')
	.setURL('https://www.freecodecamp.org/portuguese/news/10-comandos-do-git-que-todo-desenvolvedor-deveria-conhecer/')
	.setAuthor({ name: 'Git', iconURL: 'https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png'})
	.setDescription('Lista de comandos do Git')
	//.setThumbnail('https://i.imgur.com/AfFp7pu.png')
	.addFields(
        { name: 'git commit -m "mensagem do commit"', value: 'Permite que você crie um commit, ou seja, você consegue guardar o estado do seu repositório naquele momento', inline: true },
		{ name: '\u200B', value: '\u200B' },
		{ name: 'git push', value: 'Permite que você envie os commits de sua branch e repositório Git local para o seu repositório remoto', inline: true },
		{ name: '\u200B', value: '\u200B' },
		{ name: 'git pull', value: 'Atualiza o branch de trabalho local atual', inline: true },
        { name: '\u200B', value: '\u200B' },
		{ name: 'git checkout <nome-do-branch>', value: 'Alterna entre branches', inline: true },
        { name: '\u200B', value: '\u200B' },
        { name: 'git stash', value: 'Como se fizesse um backup das modificações dos seus arquivos', inline: true },
        { name: '\u200B', value: '\u200B' },
        { name: 'git revert', value: 'Pega as alterações do commit que você quer reverter e criar um novo commit com essas alterações desfeitas', inline: true },
	)
	//.addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
	//.setImage('https://i.imgur.com/AfFp7pu.png')
	.setTimestamp();
	//.setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });


module.exports = {
    data: new SlashCommandBuilder()
        .setName("git")
        .setDescription("Retorna todos os principais comandos do Git e suas funcionalidades"),
    async execute(interaction) {
        await interaction.reply({ embeds: [gitEmbed]})
    }
}