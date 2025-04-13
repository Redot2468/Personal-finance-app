export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      balance: {
        Row: {
          created_at: string
          current: number | null
          expenses: number | null
          id: number
          income: number | null
          userId: string | null
        }
        Insert: {
          created_at?: string
          current?: number | null
          expenses?: number | null
          id?: number
          income?: number | null
          userId?: string | null
        }
        Update: {
          created_at?: string
          current?: number | null
          expenses?: number | null
          id?: number
          income?: number | null
          userId?: string | null
        }
        Relationships: []
      }
      budgets: {
        Row: {
          category: string | null
          colorTag: string | null
          created_at: string
          id: string
          maxSpending: number | null
          userId: string | null
        }
        Insert: {
          category?: string | null
          colorTag?: string | null
          created_at?: string
          id?: string
          maxSpending?: number | null
          userId?: string | null
        }
        Update: {
          category?: string | null
          colorTag?: string | null
          created_at?: string
          id?: string
          maxSpending?: number | null
          userId?: string | null
        }
        Relationships: []
      }
      pots: {
        Row: {
          created_at: string
          id: string
          potCurrentBalance: number | null
          potName: string | null
          potTarget: number | null
          potTheme: string | null
          userId: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          potCurrentBalance?: number | null
          potName?: string | null
          potTarget?: number | null
          potTheme?: string | null
          userId?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          potCurrentBalance?: number | null
          potName?: string | null
          potTarget?: number | null
          potTheme?: string | null
          userId?: string | null
        }
        Relationships: []
      }
      transactions: {
        Row: {
          amount: number | null
          avatar: string | null
          category: string | null
          created_at: string
          date: string
          id: string
          name: string | null
          recurring: boolean | null
          userId: string | null
        }
        Insert: {
          amount?: number | null
          avatar?: string | null
          category?: string | null
          created_at?: string
          date?: string
          id?: string
          name?: string | null
          recurring?: boolean | null
          userId?: string | null
        }
        Update: {
          amount?: number | null
          avatar?: string | null
          category?: string | null
          created_at?: string
          date?: string
          id?: string
          name?: string | null
          recurring?: boolean | null
          userId?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
