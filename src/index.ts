import { data } from "../config.js";
import { Command } from "./types";
import { Client, Collection } from "discord.js";
import { loadCommands, runCommand } from "./utils.js";

const client = new Client(data.options);
const commands = new Collection<string, Command>();

loadCommands(commands);

client.once("ready", () => {
    console.log(`${client.user!.tag} (${client.user!.id}) is ready in ${client.guilds.cache.size} guilds with ${client.users.cache.size} users`);
})

client.on("message", (message) => {
    if(message.author.bot) return;
    let prefix = data.prefix.find(p => message.content.startsWith(p));
    if(message.channel.type === "dm"){
        const args = (prefix?message.content.slice(prefix.length):message.content).trim().split(/\s+/);
        if(args.length < 1) return;
        const command = args.shift()!.toLowerCase();
        return runCommand(command, message, args);
    }
    if(!prefix) return;
    const args = message.content.slice(prefix.length).trim().split(/\s+/);
    if(args.length < 1) return;
	const command = args.shift()!.toLowerCase();
    return runCommand(command, message, args);

})


client.login(data.token);