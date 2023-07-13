/* eslint-disable @typescript-eslint/no-namespace */
import { z } from "zod";

const envVariables = z.object({
  DISCORD_TOKEN: z.string(),
  DISCORD_GUILD_ID: z.string(),
  USE_LOCAL_AMETHYST: z.string().optional(),
  AMETHYST_TOKEN: z.string(),
});

envVariables.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariables> {}
  }
}
