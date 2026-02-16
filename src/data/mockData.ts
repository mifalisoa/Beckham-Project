import { User, Publication, Comment, Conversation, Message, Review, Stats } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    firstName: 'Marie',
    lastName: 'Dupont',
    email: 'marie.dupont@example.fr',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1762341116674-784c5dbedeb1?w=200&h=200&fit=crop',
    joinedDate: '2024-01-15',
  },
  {
    id: '2',
    firstName: 'Pierre',
    lastName: 'Martin',
    email: 'pierre.martin@example.fr',
    role: 'client',
    avatar: 'https://images.unsplash.com/photo-1581093687571-a70d2bd979e4?w=200&h=200&fit=crop',
    joinedDate: '2024-03-20',
  },
  {
    id: '3',
    firstName: 'Sophie',
    lastName: 'Bernard',
    email: 'sophie.bernard@example.fr',
    role: 'client',
    avatar: 'https://images.unsplash.com/photo-1630283017802-785b7aff9aac?w=200&h=200&fit=crop',
    joinedDate: '2024-02-10',
  },
  {
    id: '4',
    firstName: 'Lucas',
    lastName: 'Petit',
    email: 'lucas.petit@example.fr',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=200&h=200&fit=crop',
    joinedDate: '2024-01-05',
  },
];

export const mockPublications: Publication[] = [
  {
    id: '1',
    author: mockUsers[0],
    title: 'Nouvelle fonctionnalité disponible !',
    content: 'Nous sommes ravis de vous annoncer le lancement de notre nouvelle messagerie intégrée. Vous pouvez désormais communiquer directement avec votre communauté sans quitter la plateforme.',
    image: 'https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=800&h=450&fit=crop',
    createdAt: '2024-11-05T10:30:00',
    likes: 24,
    comments: 12,
    shares: 5,
    isLiked: false,
  },
  {
    id: '2',
    author: mockUsers[3],
    title: 'Conseils pour optimiser votre profil',
    content: 'Un profil bien rempli augmente vos chances de visibilité ! Pensez à ajouter une photo de profil professionnelle et à compléter toutes vos informations.',
    image: 'https://images.unsplash.com/photo-1762341116674-784c5dbedeb1?w=800&h=450&fit=crop',
    createdAt: '2024-11-04T14:15:00',
    likes: 42,
    comments: 18,
    shares: 8,
    isLiked: true,
  },
  {
    id: '3',
    author: mockUsers[0],
    title: 'Mise à jour de sécurité',
    content: 'Nous avons renforcé la sécurité de notre plateforme avec une authentification à deux facteurs. Votre protection est notre priorité.',
    createdAt: '2024-11-03T09:00:00',
    likes: 67,
    comments: 23,
    shares: 15,
    isLiked: true,
  },
  {
    id: '4',
    author: mockUsers[3],
    title: 'Événement communautaire à venir',
    content: 'Rejoignez-nous le 15 novembre pour notre webinaire exclusif sur les tendances du digital. Inscriptions ouvertes !',
    image: 'https://images.unsplash.com/photo-1581093687571-a70d2bd979e4?w=800&h=450&fit=crop',
    createdAt: '2024-11-02T16:45:00',
    likes: 89,
    comments: 34,
    shares: 22,
    isLiked: false,
  },
];

export const mockComments: Comment[] = [
  {
    id: '1',
    author: mockUsers[1],
    content: 'Excellente nouvelle ! J\'attendais cette fonctionnalité avec impatience.',
    createdAt: '2024-11-05T11:00:00',
    postId: '1',
  },
  {
    id: '2',
    author: mockUsers[2],
    content: 'Super initiative, merci à toute l\'équipe !',
    createdAt: '2024-11-05T11:30:00',
    postId: '1',
  },
  {
    id: '3',
    author: mockUsers[1],
    content: 'Merci pour ces conseils, très utile pour les nouveaux membres.',
    createdAt: '2024-11-04T15:00:00',
    postId: '2',
  },
];

export const mockConversations: Conversation[] = [
  {
    id: '1',
    user: mockUsers[1],
    lastMessage: 'Merci pour votre réponse rapide !',
    timestamp: '2024-11-06T09:30:00',
    unread: 2,
    isOnline: true,
  },
  {
    id: '2',
    user: mockUsers[2],
    lastMessage: 'À quelle heure commence l\'événement ?',
    timestamp: '2024-11-06T08:15:00',
    unread: 0,
    isOnline: false,
  },
  {
    id: '3',
    user: mockUsers[3],
    lastMessage: 'On se synchronise demain ?',
    timestamp: '2024-11-05T18:45:00',
    unread: 1,
    isOnline: true,
  },
];

export const mockMessages: Message[] = [
  {
    id: '1',
    conversationId: '1',
    senderId: '1',
    content: 'Bonjour Pierre, comment puis-je vous aider ?',
    timestamp: '2024-11-06T09:00:00',
    isSent: false,
  },
  {
    id: '2',
    conversationId: '1',
    senderId: '2',
    content: 'Bonjour ! J\'ai une question concernant la nouvelle fonctionnalité.',
    timestamp: '2024-11-06T09:15:00',
    isSent: true,
  },
  {
    id: '3',
    conversationId: '1',
    senderId: '1',
    content: 'Bien sûr, je vous écoute !',
    timestamp: '2024-11-06T09:20:00',
    isSent: false,
  },
  {
    id: '4',
    conversationId: '1',
    senderId: '2',
    content: 'Merci pour votre réponse rapide !',
    timestamp: '2024-11-06T09:30:00',
    isSent: true,
  },
];

export const mockReviews: Review[] = [
  {
    id: '1',
    author: mockUsers[1],
    rating: 5,
    comment: 'Excellente plateforme ! Interface intuitive et fonctionnalités complètes.',
    service: 'Plateforme générale',
    createdAt: '2024-11-01T10:00:00',
  },
  {
    id: '2',
    author: mockUsers[2],
    rating: 4,
    comment: 'Très bon service, quelques améliorations possibles sur la messagerie.',
    service: 'Messagerie',
    createdAt: '2024-10-28T14:30:00',
  },
  {
    id: '3',
    author: mockUsers[1],
    rating: 5,
    comment: 'Support client réactif et professionnel. Merci !',
    service: 'Support',
    createdAt: '2024-10-25T16:20:00',
  },
  {
    id: '4',
    author: mockUsers[2],
    rating: 4,
    comment: 'Bonne expérience globale, je recommande.',
    service: 'Plateforme générale',
    createdAt: '2024-10-20T11:45:00',
  },
];

export const mockStats: Stats = {
  totalPublications: 47,
  totalClients: 328,
  unreadMessages: 12,
  averageRating: 4.6,
};

export const currentUser: User = mockUsers[0];
