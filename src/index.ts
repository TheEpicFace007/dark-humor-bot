import DiscordJs from "discord.js";
import { readFileSync } from "fs";
import SlashCommand from "discord-slash-commands-client";

const BOT_TOKEN = readFileSync("../bot-api-key.txt", { encoding: "utf-8" });

(async function () 
{
  const discordBotClient = new DiscordJs.Client();
  await discordBotClient.login(BOT_TOKEN)
  const slashCommand = new SlashCommand.Client(BOT_TOKEN, discordBotClient.user?.id ?? "");

})();