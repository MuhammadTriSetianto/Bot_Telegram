import type { InfoMemberResponse } from "../model/akraptools.model";
import type { ApiService } from "./api.service";

export class AkrapToolsService {
    constructor( private apiService : ApiService) {}

    async infoMember(msisdn : string){
    try{

        const members = await this.apiService.post<InfoMemberResponse>(
        'akrab-family/member-info.php',
        {
            msisdn: msisdn
        });

        return members;
        
    }catch (err : any){
        console.log("ERROR:", err.message);
        console.log("STATUS:", err.response?.status);
        console.log("RESPONSE:", err.response?.data);
        console.log("HEADERS:", err.response?.headers);

        throw err;
        }
    }

    
}