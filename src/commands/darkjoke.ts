import { SlashCommand, SlashCommandOptions, Context, SlashCreator, CommandContext, CommandOptionType, } from "slash-create";
import { MessageEmbed } from "discord.js";


export default class darkjoke extends SlashCommand
{
  constructor(creator: SlashCreator)
  {
    super(creator, {
      name: "darkjoke",
      description: "Says a dark humor joke",
      options: [
        {
          name: "offense",
          description: "How offensive the joke is on a scale of 1 to 10",
          type: CommandOptionType.INTEGER
        }
      ]
    });
    this.filePath = __filename;
  }

  async run(ctx: CommandContext)
  {
    ctx.acknowledge();
    const offenseLevel: number = Number(ctx.options.offense);

    if (offenseLevel > 10 || offenseLevel < 1) {
      const embed = new MessageEmbed();
      embed.setColor("red");
      embed.addField("Error", `Error sending joke: ${offenseLevel > 10 ? "Offense level too high" : "Offense level too low"}`);
      embed.setColor("#cc0f10");
      const message = await ctx.send({ embeds: [embed] });
      setTimeout(() => { typeof message == "boolean" || message.delete() }, 3000);
      return;
    }
    return "joke";
  }
}