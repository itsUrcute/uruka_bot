import type { Message } from "discord.js";

export const command = {
    name: "ping",
    aliases: ["pinggg"],
    description: "A normal ping command",
    ownerOnly: false,
    guildOnly: false,
    nsfw: false,
    execute(message: Message, args: string[]){
        message.reply("Poong!");
    }
};