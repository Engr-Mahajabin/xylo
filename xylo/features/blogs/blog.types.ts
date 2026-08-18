export interface BlogReaction {
  id: number;
  blog: number;
  user: string;
  reaction_type: string;
  created_at: string;
}

export interface BlogReply {
  id: number;
  comment: number;
  user: string;
  text: string;
  emoji?: string;
  created_at: string;
  updated_at?: string;
  is_active?: boolean;
}

export interface BlogComment {
  id: number;
  blog: number;
  user: string;
  text: string;
  emoji?: string;
  created_at: string;
  updated_at?: string;
  is_active?: boolean;
  replies?: BlogReply[];
  reaction_count?: string;
  reply_count?: string;
}

export interface BlogPost {
  id: number;
  title: string;
  description: string;
  author: string;
  author_id?: number;
  video?: string;
  image?: string;
  created_at: string;
  updated_at?: string;
  published_date?: string;
  is_published?: boolean;
  slug: string;
  tags?: string;
  category?: string;
  reactions?: BlogReaction[];
  comments?: BlogComment[];
  total_reactions?: string;
  comment_count?: string;
  share_count?: string;
}
