import "./env";

import { Client, IntentsBitField } from "discord.js";
import { Commands } from "./command/commands";
import { NatsirtCommandManager } from "./lib/command/NatsirtCommandManager";

const client = new Client({
  intents: [IntentsBitField.Flags.Guilds],
});

const commands = new NatsirtCommandManager(client);

for (const command of Commands) {
  commands.registerCommand(command);
}

commands.applyCommandHandlers();

client.once("ready", async () => {
  console.log(`Logged in as ${client.user?.tag}!`);

  try {
    console.log(`Deploying ${Commands.length} commands...`);
    await commands.deployCommands();
    console.log("Commands deployed!");
  } catch (error) {
    console.log("Error deploying commands!");
    console.error(error);
    throw error;
  }
});

client.login(process.env.DISCORD_TOKEN);
