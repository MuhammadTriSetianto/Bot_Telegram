import { ApiService } from "../../services/api.service";
import { MemberService } from "../../services/member.service";
import type { Context } from "grammy";

export const findMemberCommand = async (ctx: any) => {
  try {
    const apiService = new ApiService();
    const memberService = new MemberService(apiService);

    const member = await memberService.getMemberbyMsisdn(ctx.message.text.replace("/getmember", "").trim());

    if (!member.success) {
      await ctx.reply("❌ Data member tidak ditemukan.");
      return;
    }

    const data = member.data;

    await ctx.reply(
      `👤 *INFORMASI MEMBER XL*\n\n` +
      `📱 MSISDN: ${data.msisdn}\n` +
      `📊 Status: ${data.subscription_status}\n` +
      `🚫 Suspended: ${data.suspended_status || "-"}\n\n` +
      `💰 Sisa Balance: ${data.balance_remaining}\n` +
      `📅 Balance Expired: ${data.balance_expired_at_label}\n` +
      `💳 Credit Limit: ${data.credit_limit}\n` +
      `📅 Grace End: ${data.grace_end_date_label}`,
      {
        parse_mode: "Markdown",
      }
    );

  } catch (error) {
    console.error(error);

    await ctx.reply(
      "❌ Terjadi kesalahan saat mengambil data member."
    );
  }
};