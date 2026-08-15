import { ApiService } from "../../services/api.service";
import { MemberService } from "../../services/member.service";

export const startCommand = async (ctx : any) => {

const apiService = new ApiService();
const memberService = new MemberService(apiService);

  const now = new Date();

  const hari = now.toLocaleDateString("id-ID", {
    weekday: "long",
  });

  const tanggal = now.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const waktu = now.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  await ctx.reply(
    `🤖 *Bot berhasil dimulai!*\n\n` +
    `📅 Hari: ${hari}\n` +
    `📆 Tanggal: ${tanggal}\n` +
    `🕐 Waktu: ${waktu} WIB`,
    {
      parse_mode: "Markdown",
    }
  );

  try {
    const  member : any = await memberService.getMember();
    
    const jumlahMember = member.data.length > 0 ? member.data.length : 0;
  
    await ctx.reply(
      `👥 *Informasi Member*\n\n` +
      `Terdaftar saat ini: *${jumlahMember}*`
    );
    
  } catch (error) {
    console.error(error);

    await ctx.reply(
      "❌ *Gagal mengambil data member.*\n\n" +
      "Silakan coba lagi beberapa saat."
    );
  }
}