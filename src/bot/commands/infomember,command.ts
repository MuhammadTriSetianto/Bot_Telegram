import { AkrapToolsService } from "../../services/akrapTools.service";
import { ApiService } from "../../services/api.service";

export const akrapTools = async (ctx: any) => {
  try {
      const apiService = new ApiService();
      const akrapToolsService = new AkrapToolsService(apiService);
      
      const msisdn = ctx.message.text
      .replace("/infomember", "")
      .trim();
      
      if (!msisdn) {
      await ctx.reply(
          "❌ Nomor belum dimasukkan.\n\n" +
          "Contoh:\n" +
          "/infomember 087788194260"
      );
      return;
    }

    const members = await akrapToolsService.infoMember(msisdn);
    console.log(members);
    if (!members.success) {
      await ctx.reply("❌ Data member tidak ditemukan.");
      return;
    }

    const data = members.data;

    // =========================
    // QUOTA
    // =========================

    const totalQuotaGB = (
      data.total_quota_bytes / 1024 / 1024 / 1024
    ).toFixed(2);

    const remainingQuotaGB = (
      data.remaining_quota_bytes / 1024 / 1024 / 1024
    ).toFixed(2);

    // =========================
    // MEMBER
    // =========================

    const memberList = data.members
      .map((member, index) => {
        const status = member.is_empty_slot
          ? "🟡 Kosong"
          : "🟢 Terisi";

        return (
          `${index + 1}. ${status}\n` +
          `   📱 Nomor: ${member.msisdn || "-"}\n` +
          `   👤 Alias: ${member.alias || "-"}\n` +
          `   👥 Tipe: ${member.member_type}`
        );
      })
      .join("\n\n");

    // =========================
    // REPLY
    // =========================

            const message =
        `👤 <b>INFORMASI MEMBER XL</b>\n\n` +

        `📱 <b>Nomor:</b> ${msisdn}\n` +
        `👤 <b>Role:</b> ${data.role}\n` +
        `📦 <b>Paket:</b> ${data.plan_type}\n` +
        `🆔 <b>Group ID:</b> ${data.group_id}\n\n` +

        `📊 <b>INFORMASI KUOTA</b>\n` +
        `• Total: ${totalQuotaGB} GB\n` +
        `• Sisa: ${remainingQuotaGB} GB\n\n` +

        `👥 <b>SLOT MEMBER</b>\n` +
        `• Regular Slot: ${data.total_regular_slot}\n` +
        `• Paid Slot: ${data.total_paid_slot}\n\n` +

        `📋 <b>DAFTAR MEMBER</b>\n` +
        `${memberList}`;

        await ctx.reply(message, {
        parse_mode: "HTML",
        });

  } catch (error) {
    console.error("Error info member:", error);

    await ctx.reply(
      "❌ Terjadi kesalahan saat mengambil informasi member."
    );
  }
};