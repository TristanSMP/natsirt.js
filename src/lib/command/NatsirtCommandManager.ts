import { Client } from "discord.js";
import { INatsirtCommand } from "./INatsirtCommand";

export class NatsirtCommandManager {
  private commands: Map<string, INatsirtCommand> = new Map();

  constructor(private client: Client) {}

  /**
   * Register a command to this manager
   * @param command Command to register
   */
  public registerCommand(command: INatsirtCommand): void {
    this.commands.set(command.data.name, command);
  }

  /**
   * Deploy commands in this manager to Discord
   */
  public async deployCommands(): Promise<void> {
    const commands = [...this.commands.values()].map((command) => command.data.toJSON());

    await this.client.guilds.cache.get(process.env.DISCORD_GUILD_ID)?.commands.set(commands);
  }

  /**
   * Apply command handlers to the client
   */
  public applyCommandHandlers(): void {
    this.client.on("interactionCreate", async (interaction) => {
      if (interaction.guildId !== process.env.DISCORD_GUILD_ID) return;
      if (!interaction.isCommand()) return;

      const command = this.commands.get(interaction.commandName);
      if (!command) return void interaction.reply({ content: "Command not found!", ephemeral: true });

      try {
        await command.execute(interaction);
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });
      }
    });
  }
}
