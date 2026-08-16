

export interface InfoMemberResponse{
    success : boolean;
    data : InfoMember;
}
export interface InfoMember{
    role : string;
    group_id: string;
    group_name  : string;
    plan_type : string;
    total_quota_bytes : number;
    remaining_quota_bytes : number;
    total_regular_slot: number ;
    total_paid_slot : number;
    members : Members[];
}
export interface Members{
    member_type : string;
    msisdn : string;
    alias : string;
    is_empty_slot: boolean;

} 