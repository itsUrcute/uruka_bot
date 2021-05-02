import { Message } from "discord.js";

interface Command{
    name: string;
    description: string;
    aliases?: Array<string>;
    ownerOnly?: boolean;
    guildOnly?: boolean;
    nsfw?: boolean;
    clientPermissions?:Array<string>;
    execute(message: Message, args: string[]): void;
}
export {
    Command
}