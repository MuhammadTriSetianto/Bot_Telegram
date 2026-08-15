import { Bot } from "grammy";
import { BOT_TOKEN } from "./config/env";
import { startCommand } from "./bot/commands/start.commnd";
import {findMemberCommand} from './bot/commands/getmember.command';


const bot = new Bot(BOT_TOKEN!);

bot.command("start", startCommand);

bot.on("message", async (ctx : any) => {
  if (!ctx.message?.text?.startsWith("/getmember")) {
    ctx.reply("❌ Perintah tidak dikenali.");
  }
  
  await findMemberCommand(ctx);
  
});


bot.command("massage", async (ctx : any) => {

  if(!ctx.message?.text?.startsWith("/infomember")){ctx.reply("❌ Perintah tidak dikenali.");}

  await findMemberCommand(ctx);

});



bot.start();