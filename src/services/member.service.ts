import { ApiService } from "./api.service";
import type { MemberResponse } from "../model/member.model";

export class MemberService {

  constructor(private apiService: ApiService) {}

  async getMember() {
    const members = await this.apiService.get<MemberResponse>(
      "list-token.php",
    );

    return members;
  }

  async getMemberbyMsisdn(msisdn: string) {
    try {
      const member = await this.apiService.post<MemberResponse>(
        "getProfile.php",
        {
          msisdn: msisdn,
        },
      );
      return member;

    } catch (error: any) {
      console.log("ERROR:", error.message);
      console.log("STATUS:", error.response?.status);
      console.log("RESPONSE:", error.response?.data);
      console.log("HEADERS:", error.response?.headers);

      throw error;
    }
  }

  
}