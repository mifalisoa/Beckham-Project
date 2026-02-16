export type UserRole = 'admin' | 'client';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  avatar?: string;
  joinedDate: string;
}

export interface Publication {
  id: string;
  author: User;
  title: string;
  content: string;
  image?: string;
  createdAt: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked?: boolean;
}

export interface Comment {
  id: string;
  author: User;
  content: string;
  createdAt: string;
  postId: string;
}

export interface Conversation {
  id: string;
  user: User;
  lastMessage: string;
  timestamp: string;
  unread: number;
  isOnline: boolean;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  timestamp: string;
  isSent: boolean;
}

export interface Review {
  id: string;
  author: User;
  rating: number;
  comment: string;
  service: string;
  createdAt: string;
}

export interface Stats {
  totalPublications: number;
  totalClients: number;
  unreadMessages: number;
  averageRating: number;
}
