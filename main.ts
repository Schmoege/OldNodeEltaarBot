import discord from 'discord.js';
const bot = new discord.Client();
import config from './config.json';
import { DiceSlugger } from './dice-slugger';
// import {DiceResult} from './dice-slugger';
var diceSlugger = new DiceSlugger();

if (!config) {
    console.log('Can\'t find the config. Shutting down.');
    process.exit();
}

bot.login(config.token);

//Krävs för att botten ska svara på kommande anrop
bot.on('ready', () => {
    console.info(`Logged in!`);
});

bot.on('message', msg => {
    if (msg.author.bot) {
        return;
    }

    if (msg.content.toLowerCase() == 'destroy m40') {
        msg.channel.send('Shutting down...');
        //Timeout så att botten hinner skriva meddelandet
        setTimeout(logOut, 3000);
    }
    else if (msg.content.toLowerCase() == 'hello mr 40') {
        //Test för att se att botten lever och svarar som den ska
        msg.channel.send('I am a generous god.');
    }
    else if (msg.content != '' && msg.content.toLowerCase().startsWith('$d')) {
        let diceSides = getDiceRolls(msg.content);
        msg.reply(diceSides);
    }
    else {
        msg.reply('Skriv så här istället: $d {nummer}');
    }
});

function getDiceRolls(message: string): string {
    let args = message.split(' ');

    if (args.length > 1) {
        args.shift();
        let results: Array<String> = new Array<String>();
        let roll:number = 0;
        for(var i = 0; i < args.length; i++){
            let diceSides = args[i];
            if (!Number.isNaN(diceSides)) {
                let result = diceSlugger.RollDice(Number(diceSides));
                results.push(`D${diceSides}: ${result}`);
                roll += result;
            }
        }
        let diceResults = results.join(', ').replace(/,+$/g, '').trim(); //Ta bort trailing ,
        return `Roll: ${roll} from ${diceResults}`;
    }
    return '';
}

function logOut() {
    bot.destroy();
    console.log('The bot is terminated');
    process.exit();
}