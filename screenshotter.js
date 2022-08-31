require('dotenv').config()

const puppeteer = require("puppeteer-extra")
const randomUserAgent = require("random-useragent")
const stealthPlugin = require("puppeteer-extra-plugin-stealth")
const token = process.env.DISCORDJS_BOT_TOKEN;
puppeteer.use(stealthPlugin());

const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36'

// Require the necessary discord.js classes
const { Client, GatewayIntentBits } = require('discord.js');

// Create a new client instance
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('Ping: ' + client.ws.ping + 'ms');
	} else if (commandName === 'server') {
		await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
	} else if (commandName === 'user') {
		await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
	} else if (commandName === 'chegg') {
        const link = interaction.options.getString('link');
        await interaction.reply(interaction.user.tag + ' sent this link: ' + link);
    }
});

// When the client is ready, run this code (only once)
client.on('ready', () => {
	console.log('Bot Online!');
});

const screenshot = async () => {

    const browser = await puppeteer.launch({
        headless: false
    })

    const userAgent = randomUserAgent.getRandom()
    const UA = USER_AGENT

    const page = await browser.newPage()


    await page.setViewport({
        width: 1280,
        height: 800
    })

    await page.setUserAgent(UA)
    await page.setJavaScriptEnabled(true)
  
    await page.goto('https://www.chegg.com/Auth/Login')
    // await page.goto('https://bot.sannysoft.com/')
    await new Promise(r => setTimeout(r, 3000))
    await page.screenshot({
        path: 'test.png',
        fullPage: true
    })

    await page.waitForSelector("#emailForSignIn");
    await page.type("#emailForSignIn", "theboisarehere@gmail.com", {delay: 250});
    await page.type("#passwordForSignIn", "Pche_415251", {delay: 250});
    await page.click(".login-button.button.flat");
    // await browser.close();
  };
  
  client.login(token);
//   screenshot();