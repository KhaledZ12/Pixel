export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      about_content: {
        Row: {
          created_at: string
          description: string
          id: string
          image_url: string
          mission_description: string
          mission_title: string
          title: string
          updated_at: string
          vision_description: string
          vision_title: string
        }
        Insert: {
          created_at?: string
          description?: string
          id?: string
          image_url?: string
          mission_description?: string
          mission_title?: string
          title?: string
          updated_at?: string
          vision_description?: string
          vision_title?: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          image_url?: string
          mission_description?: string
          mission_title?: string
          title?: string
          updated_at?: string
          vision_description?: string
          vision_title?: string
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          content: string
          created_at: string
          excerpt: string
          id: string
          image_url: string
          published: boolean
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          content?: string
          created_at?: string
          excerpt?: string
          id?: string
          image_url?: string
          published?: boolean
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          excerpt?: string
          id?: string
          image_url?: string
          published?: boolean
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      contact_content: {
        Row: {
          address: string
          created_at: string
          description: string
          email: string
          id: string
          phone: string
          title: string
          updated_at: string
          whatsapp: string
        }
        Insert: {
          address?: string
          created_at?: string
          description?: string
          email?: string
          id?: string
          phone?: string
          title?: string
          updated_at?: string
          whatsapp?: string
        }
        Update: {
          address?: string
          created_at?: string
          description?: string
          email?: string
          id?: string
          phone?: string
          title?: string
          updated_at?: string
          whatsapp?: string
        }
        Relationships: []
      }
      faqs: {
        Row: {
          answer: string
          created_at: string
          display_order: number
          id: string
          question: string
          updated_at: string
        }
        Insert: {
          answer: string
          created_at?: string
          display_order?: number
          id?: string
          question: string
          updated_at?: string
        }
        Update: {
          answer?: string
          created_at?: string
          display_order?: number
          id?: string
          question?: string
          updated_at?: string
        }
        Relationships: []
      }
      google_ads_results: {
        Row: {
          created_at: string
          display_order: number
          id: string
          image: string
          price: string
          title: string
          total_clicks: string
          total_cost: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_order?: number
          id?: string
          image?: string
          price?: string
          title: string
          total_clicks?: string
          total_cost?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_order?: number
          id?: string
          image?: string
          price?: string
          title?: string
          total_clicks?: string
          total_cost?: string
          updated_at?: string
        }
        Relationships: []
      }
      homepage_content: {
        Row: {
          about_description: string
          about_title: string
          blog_subtitle: string
          blog_title: string
          created_at: string
          faq_subtitle: string
          faq_title: string
          google_ads_subtitle: string
          google_ads_title: string
          hero_background_image: string
          hero_button_link: string
          hero_button_text: string
          hero_description: string
          hero_subtitle: string
          hero_title: string
          id: string
          portfolio_subtitle: string
          portfolio_title: string
          services_subtitle: string
          services_title: string
          updated_at: string
        }
        Insert: {
          about_description?: string
          about_title?: string
          blog_subtitle?: string
          blog_title?: string
          created_at?: string
          faq_subtitle?: string
          faq_title?: string
          google_ads_subtitle?: string
          google_ads_title?: string
          hero_background_image?: string
          hero_button_link?: string
          hero_button_text?: string
          hero_description?: string
          hero_subtitle?: string
          hero_title?: string
          id?: string
          portfolio_subtitle?: string
          portfolio_title?: string
          services_subtitle?: string
          services_title?: string
          updated_at?: string
        }
        Update: {
          about_description?: string
          about_title?: string
          blog_subtitle?: string
          blog_title?: string
          created_at?: string
          faq_subtitle?: string
          faq_title?: string
          google_ads_subtitle?: string
          google_ads_title?: string
          hero_background_image?: string
          hero_button_link?: string
          hero_button_text?: string
          hero_description?: string
          hero_subtitle?: string
          hero_title?: string
          id?: string
          portfolio_subtitle?: string
          portfolio_title?: string
          services_subtitle?: string
          services_title?: string
          updated_at?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          created_at: string
          description: string
          desktop_image: string
          display_order: number
          featured: boolean
          id: string
          link: string
          mobile_image: string
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          desktop_image?: string
          display_order?: number
          featured?: boolean
          id?: string
          link?: string
          mobile_image?: string
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          desktop_image?: string
          display_order?: number
          featured?: boolean
          id?: string
          link?: string
          mobile_image?: string
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      services: {
        Row: {
          category: string
          created_at: string
          description: string
          display_order: number
          id: string
          image_url: string
          title: string
          updated_at: string
        }
        Insert: {
          category?: string
          created_at?: string
          description: string
          display_order?: number
          id?: string
          image_url?: string
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string
          display_order?: number
          id?: string
          image_url?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
