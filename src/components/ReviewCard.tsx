import { Star } from 'lucide-react';
import { Review } from '../types';
import { Card, CardContent, CardHeader } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  const timeAgo = formatDistanceToNow(new Date(review.createdAt), {
    addSuffix: true,
    locale: fr,
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-start gap-4 p-4">
        <Avatar>
          <AvatarImage src={review.author.avatar} alt={review.author.firstName} />
          <AvatarFallback>
            {review.author.firstName[0]}{review.author.lastName[0]}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <p className="font-medium">
              {review.author.firstName} {review.author.lastName}
            </p>
            <p className="text-xs text-muted-foreground">{timeAgo}</p>
          </div>
          <div className="flex items-center gap-1 mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < review.rating
                    ? 'fill-[#F39C12] text-[#F39C12]'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <Badge variant="secondary" className="mb-2">
            {review.service}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <p className="text-muted-foreground">{review.comment}</p>
      </CardContent>
    </Card>
  );
}
