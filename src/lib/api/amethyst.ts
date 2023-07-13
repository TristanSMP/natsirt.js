import { AmethystClient, AmethystEnvironment } from "@tristansmp/amethyst";

export const amethyst = new AmethystClient({
  environment:
    process.env.USE_LOCAL_AMETHYST === "true" ? AmethystEnvironment.Development : AmethystEnvironment.Production,
  token: process.env.AMETHYST_TOKEN,
});
