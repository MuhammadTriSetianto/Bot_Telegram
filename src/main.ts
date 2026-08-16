import { Bot } from "grammy";
import { BOT_TOKEN } from "./config/env";

import { startCommand } from "./bot/commands/start.commnd";
import { findMemberCommand } from "./bot/commands/getmember.command";
import { akrapTools } from "./bot/commands/infomember,command";

const bot = new Bot(BOT_TOKEN!);

bot.command("start", startCommand);

bot.command("getmember", async (ctx : any) => {
  await findMemberCommand(ctx);
});

bot.command("infomember", async (ctx : any) => {
 
  await akrapTools(ctx);
});

bot.on("message", async (ctx) => {
  const text = ctx.message?.text;

  if (!text) {
    await ctx.reply("❌ Perintah tidak dikenali.");
    return;
  }

  if (text.startsWith("/")) {
    await ctx.reply("❌ Perintah tidak dikenali.");
  }
});

bot.start();