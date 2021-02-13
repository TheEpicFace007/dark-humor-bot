import Discord from "discord.js";
import { readFileSync } from "fs";
import { SlashCreator, GatewayServer } from "slash-create";
import path from "path";

const BOT_STUFF = readFileSync("bot-api-key.txt", { encoding: "utf-8" }).replaceAll("\r", "").split("\n")
console.log("🚀 ~ file: index.ts ~ line 7 ~ BOT_STUFF", BOT_STUFF)

const discordBotClient = new Discord.Client();
const creator = new SlashCreator({
  applicationID: BOT_STUFF[0],
  token: BOT_STUFF[1],
  publicKey: BOT_STUFF[2]
});

creator
  // Registers all of your commands in the ./commands/ directory
  .registerCommandsIn(path.join(__dirname, 'commands'))
  // This will sync commands to Discord, it must be called after commands are loaded.
  // This also returns itself for more chaining capabilities.
  .syncCommands()
  //@ts-ignore
  .withServer(new GatewayServer((handler) => discordBotClient.ws.on("INTERACTION_CREATE", handler)))

discordBotClient.login(BOT_STUFF[1]);