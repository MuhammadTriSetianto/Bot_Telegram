import { AkrapToolsService } from "../../services/akrapTools.service";
import { ApiService } from "../../services/api.service";

export const addChangeMemberCommand = async (ctx: any) => {
try {
    const apiService = new ApiService();
    const akrapToolsService = new AkrapToolsService(apiService);

    const text = ctx.message.text
      .replace("/addChangeMember", "")
      .trim()
      .split(/\s+/);

    const data = {
      msisdn: text[0]? text[0] : "",
      parent_alias: text[1] ? text[1] : "",
      slot_id: text[2] ? text[2] : 1,
      alias: text[3] ? text[3] : "",
      member_msisdn: text[4] ? text[4] : "",
    }
    console.log("Hasil split:", text);

    await ctx.reply(text.join("\n"));


    const member = await akrapToolsService.addChangeMember(data.msisdn, data.parent_alias, data.slot_id, data.alias, data.member_msisdn);

    if (member.success) {
      await ctx.reply(
        `✅ Member berhasil diubah.`
      );
    } else {
      await ctx.reply(
        `❌ Terjadi kesalahan saat memproses command.`
      );
    }
  } catch (err) {
    console.error(err);

    await ctx.reply(
      "❌ Terjadi kesalahan saat memproses command."
    );
  }
};