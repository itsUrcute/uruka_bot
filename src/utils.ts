import { Collection } from "discord.js";
import { readdirSync } from "fs";
import { data } from "../config.js";
import type { Message } from "discord.js";
import type { Command } from "./types";


const commands = new Collection<string, Command>()

function loadCommands() {
    const commandFiles = readdirSync('./commands');
    commandFiles.forEach(async element => {
        const folder = readdirSync(`./commands/${element}`).filter(f => f.endsWith('.js'));
        for (const file of folder) {
            const { command }: {command: Command} = await import(`./commands/${element}/${file}`);
            commands.set(command.name.toLowerCase(), command);
        }
    })
    return commands
}

async function runCommand(command: string, message: Message, args: string[]): Promise<void> {
    const cmd = commands.get(command) || commands.find(cmd => !!cmd.aliases?.includes?.(command));
    if(cmd == null) return;
    if(cmd.nsfw && message.channel.type !== "dm" && !message.channel.nsfw) return;
    if(cmd.ownerOnly && !data.owners.includes(message.author.id)) return;
    if(cmd.guildOnly) return;
    try {
        await cmd.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }
}

export {
    commands,
    loadCommands,
    runCommand
}