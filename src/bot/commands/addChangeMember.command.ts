import { AkrapToolsService } from "../../services/akrapTools.service";
import { ApiService } from "../../services/api.service";

export  const addChangeMemberCommand = async (ctx : any) =>{
    try {
        const apiService = new ApiService();
        const akrapToolsService = new AkrapToolsService(apiService);
        const text = ctx.massage.text.replace("/addChangeMember", "").trim().split("/\s+/");
        
        console.log("hasil split : ",text);
        await ctx.reply(text);
        // const member = await akrapToolsService.addChangeMember();
    }catch ( err){

    }
}