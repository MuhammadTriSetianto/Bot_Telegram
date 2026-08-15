export interface MemberData {
  msisdn: string;
  subscription_status: string;
  suspended_status: string;
  balance_remaining: number;
  balance_expired_at_label: string;
  credit_limit: number;
  grace_end_date_label: string;
}

export interface MemberResponse {
  success: boolean;
  data: MemberData;
}