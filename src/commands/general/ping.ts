import { Message } from "discord.js";
import { Command } from "../../types";

export const command: Command = {
    name: "ping",
    aliases: ["pinggg"],
    description: "A normal ping command",
    ownerOnly: false,
    guildOnly: false,
    nsfw: false,
    execute(message: Message, args: string[]){
        message.reply("Pong!");
    }
};