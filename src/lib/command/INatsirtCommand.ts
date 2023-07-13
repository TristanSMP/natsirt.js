import { CommandInteraction, RESTPostAPIChatInputApplicationCommandsJSONBody } from "discord.js";

export interface INatsirtCommand {
  data:
    | RESTPostAPIChatInputApplicationCommandsJSONBody
    | {
        toJSON: () => RESTPostAPIChatInputApplicationCommandsJSONBody;
      };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  execute: (interaction: CommandInteraction) => Promise<any> | any;
}
