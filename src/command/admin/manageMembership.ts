import { AmethystError } from "@tristansmp/amethyst";
import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { amethyst } from "../../lib/api/amethyst";
import { INatsirtCommand } from "../../lib/command/INatsirtCommand";

export const manageMembershipCommand = {
  data: new SlashCommandBuilder()
    .setName("manage-membership")
    .setDescription("manage membership of a player")
    .addStringOption((option) =>
      option
        .setName("action")
        .addChoices({ name: "Revoke", value: "NotMember" }, { name: "Member", value: "Member" })
        .setDescription("action to perform")
        .setRequired(true)
    )
    .addUserOption((option) => option.setName("player").setDescription("player to manage").setRequired(true)),
  async execute(interaction) {
    await interaction.deferReply();

    const action = interaction.options.get("action", true).value as "NotMember" | "Member";
    const player = interaction.options.getUser("player", true);

    try {
      const { syncedRole, syncedUser } = await amethyst.applications.manageApplication({
        action,
        player: player.id,
      });

      const embed = new EmbedBuilder()
        .setTitle("Manage Membership")
        .setDescription(
          `${action === "Member" ? "Added" : "Removed"} ${player.username}#${player.discriminator} member status.`
        )
        .addFields([
          {
            name: "Synced User",
            value: syncedUser.success ? "Success" : `Failed: \`${syncedUser.error}\``,
          },
          {
            name: "Synced Role",
            value: syncedRole.success ? "Success" : `Failed: \`${syncedRole.error}\``,
          },
        ]);

      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      if (!(error instanceof AmethystError)) throw error;
      await interaction.editReply({ content: error.message });
    }
  },
} satisfies INatsirtCommand;
