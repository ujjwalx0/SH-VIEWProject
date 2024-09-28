export interface HoursDTO {
    dayOfWeek: string;
    openTime: string;
    closeTime: string;
    message: string;
  }
  
  export interface StandardHours {
    id: number;
    dayOfWeek: string;
    openTime: string;
    closeTime: string;
  }
  
  export interface SpecialHours {
    id: number;
    date: string;
    openTime: string;
    closeTime: string;
    message: string;
  }
  
  export interface SHResponse<T> {
    data: T;
    message: string;
    status: string;
  }
  export interface SpecialHoursInput {
    date: string;
    openTime: string;
    closeTime: string;
    message: string;
  }
  