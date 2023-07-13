import { CommandInteraction, SlashCommandBuilder } from "discord.js";

export interface INatsirtCommand {
  data: SlashCommandBuilder;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  execute: (interaction: CommandInteraction) => Promise<any> | any;
}
