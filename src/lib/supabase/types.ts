export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          created_at?: string;
        };
      };
      websites: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          subdomain: string;
          config: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          subdomain: string;
          config: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          subdomain?: string;
          config?: Json;
          created_at?: string;
        };
      };
      components: {
        Row: {
          id: string;
          website_id: string;
          type: string;
          config: Json;
          animation: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          website_id: string;
          type: string;
          config: Json;
          animation: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          website_id?: string;
          type?: string;
          config?: Json;
          animation?: Json;
          created_at?: string;
        };
      };
    };
  };
}
