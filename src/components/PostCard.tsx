import { useState } from 'react';
import { Heart, MessageCircle, Share2, MoreVertical } from 'lucide-react';
import { Publication } from '../types';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface PostCardProps {
  post: Publication;
  onLike?: (postId: string) => void;
  onComment?: (postId: string) => void;
  onShare?: (postId: string) => void;
  onClick?: (postId: string) => void;
}

export function PostCard({ post, onLike, onComment, onShare, onClick }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [likes, setLikes] = useState(post.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
    onLike?.(post.id);
  };

  const timeAgo = formatDistanceToNow(new Date(post.createdAt), {
    addSuffix: true,
    locale: fr,
  });

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center gap-4 p-4">
        <Avatar>
          <AvatarImage src={post.author.avatar} alt={post.author.firstName} />
          <AvatarFallback>
            {post.author.firstName[0]}{post.author.lastName[0]}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <p className="font-medium">
            {post.author.firstName} {post.author.lastName}
          </p>
          <p className="text-sm text-muted-foreground">{timeAgo}</p>
        </div>
        <Button variant="ghost" size="icon">
          <MoreVertical className="w-4 h-4" />
        </Button>
      </CardHeader>

      <CardContent className="p-0">
        <div 
          className="px-4 pb-4 cursor-pointer"
          onClick={() => onClick?.(post.id)}
        >
          <h3 className="mb-2">{post.title}</h3>
          <p className="text-muted-foreground">{post.content}</p>
        </div>
        {post.image && (
          <ImageWithFallback
            src={post.image}
            alt={post.title}
            className="w-full aspect-video object-cover cursor-pointer"
            onClick={() => onClick?.(post.id)}
          />
        )}
      </CardContent>

      <CardFooter className="p-4 flex flex-col gap-3">
        <div className="flex items-center gap-6 text-sm text-muted-foreground w-full">
          <span>{likes} j'aime</span>
          <span>{post.comments} commentaires</span>
          <span>{post.shares} partages</span>
        </div>
        <div className="flex gap-2 w-full border-t pt-3">
          <Button
            variant="ghost"
            size="sm"
            className={`flex-1 gap-2 ${isLiked ? 'text-[#EF4135]' : ''}`}
            onClick={handleLike}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            J'aime
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex-1 gap-2"
            onClick={() => onComment?.(post.id)}
          >
            <MessageCircle className="w-4 h-4" />
            Commenter
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex-1 gap-2"
            onClick={() => onShare?.(post.id)}
          >
            <Share2 className="w-4 h-4" />
            Partager
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
