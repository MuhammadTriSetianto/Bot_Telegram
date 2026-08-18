import { Bot } from "grammy";
import { BOT_TOKEN } from "./config/env";
import {CooldownService} from './services/cooldown.service';
import { startCommand } from "./bot/commands/start.commnd";
import { addChangeMemberCommand } from "./bot/commands/addChangeMember.command";
import { findMemberCommand } from "./bot/commands/getmember.command";
import { akrapTools } from "./bot/commands/infomember,command";

const bot = new Bot(BOT_TOKEN!);

bot.command(
  "start",
  startCommand
);

bot.command(
  "getmember",
  CooldownService(10),
  findMemberCommand
);

bot.command(
  "infomember",
  CooldownService(10),
  akrapTools
);
bot.command(
  "addChangeMember",
  CooldownService(10),
  addChangeMemberCommand
); 

bot.on("message", async (ctx) => {
  const text = ctx.message?.text;

  if (!text) {
    return;
  }

  if (text.startsWith("/")) {
    await ctx.reply("❌ Perintah tidak dikenali.");
  }
});

bot.start();