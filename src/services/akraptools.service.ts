import type { InfoMemberResponse, MemberResponse } from "../model/akraptools.model";
import type { ApiService } from "./api.service";

export class AkrapToolsService {
    constructor( private apiService : ApiService) {}

    async infoMember(msisdn : string){
    try{
        const members = await this.apiService.post<InfoMemberResponse>(
        'akrab-family/member-info.php',
        {
            msisdn: msisdn
        }
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

    async addChangeMember (msisdn : string, parent_alias : string, slot_id : number, alias : string, member_msisdn : string) {
        
        try{
            const member = await this.apiService.post<MemberResponse>("akrab-family/change-member.php" ,
                {
                    msisdn: msisdn,
                    parent_alias: parent_alias, 
                    slot_id:   slot_id,
                    alias : alias, 
                    member_msisdn : member_msisdn
                }
            );
            return member
        } catch (err){
            console.error("Error add/change member:", err);
            throw err;
        }
        }
    async  removeMember ( msisdn : string, family_member_id : string) {
        try {
            const member = await this.apiService.post<MemberResponse>("Takrab-family/remove-member.php" ,
                {
                    msisdn: msisdn,
                    family_member_id: family_member_id
                }
            );
            return member
        } catch (err){
            console.error("Error add/change member:", err);
            throw err;
        }
    }

    async setKouta ( msisdn : string, family_member_id : string, new_alloc_gb : number, original_bytes : number) {
        try {
            const member = await this.apiService.post<MemberResponse>("akrab-family/allocate-quota.php",{
                msisdn: msisdn,
                family_member_id: family_member_id,
                new_alloc_gb: new_alloc_gb,
                original_bytes: original_bytes
            } );
            return member
        } catch (err){
            console.error("Error add/change member:", err);
            throw err;
        }
    }
}