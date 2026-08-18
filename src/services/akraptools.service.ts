import type { InfoMemberResponse, MemberData } from "../model/akraptools.model";
import type { ApiService } from "./api.service";

export class AkrapToolsService {
    constructor( private apiService : ApiService) {}

    async infoMember(msisdn : string){
    try{
        const members = await this.apiService.post<InfoMemberResponse>(
        'akrab-family/member-info.php',
        {
            msisdn: msisdn
        },
        5000,
    );
        return members;
        
    }catch (err : any){
        console.log("ERROR:", err.message);
        console.log("STATUS:", err.response?.status);
        console.log("RESPONSE:", err.response?.data);
        console.log("HEADERS:", err.response?.headers);
        throw err;
        }
    }

    async addChangeMember () {
        
        try{
            const member = await this.apiService.post<MemberData>("akrab-family/change-member.php" ,
                {
                    msisdn: "087788194260",
                    parent_alias: "Joko", // nama awal member
                    slot_id: 1,
                    alias : "Joko", // nama akhir member
                    member_msisdn : "087788194260"
                },
                30000,
            );
        } catch (err){
            console.log(err)
        }
        }
    
}