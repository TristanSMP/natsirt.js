import { SlashCommandBuilder } from "discord.js";
import { INatsirtCommand } from "../../lib/command/INatsirtCommand";

export const pingCommand = {
  data: new SlashCommandBuilder().setName("ping").setDescription("System check"),
  execute(interaction) {
    interaction.reply("yes");
  },
} satisfies INatsirtCommand;
