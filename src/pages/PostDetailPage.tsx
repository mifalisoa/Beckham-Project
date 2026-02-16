import { useState } from 'react';
import { ArrowLeft, Heart, MessageCircle, Share2, Send } from 'lucide-react';
import { mockPublications, mockComments } from '../data/mockData';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Input } from '../components/ui/input';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

interface PostDetailPageProps {
  postId: string;
  onBack: () => void;
}

export function PostDetailPage({ postId, onBack }: PostDetailPageProps) {
  const post = mockPublications.find((p) => p.id === postId.replace('post-', ''));
  const [isLiked, setIsLiked] = useState(post?.isLiked || false);
  const [likes, setLikes] = useState(post?.likes || 0);
  const [commentText, setCommentText] = useState('');
  const comments = mockComments.filter((c) => c.postId === postId.replace('post-', ''));

  if (!post) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <p>Publication non trouvée</p>
      </div>
    );
  }

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  const handleAddComment = () => {
    if (!commentText.trim()) return;
    console.log('Adding comment:', commentText);
    setCommentText('');
  };

  const timeAgo = formatDistanceToNow(new Date(post.createdAt), {
    addSuffix: true,
    locale: fr,
  });

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-[#0055A4] text-white p-6">
        <div className="container mx-auto">
          <Button
            variant="ghost"
            className="text-white hover:bg-white/20"
            onClick={onBack}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour au fil d'actualité
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Post */}
        <Card className="mb-8">
          <CardContent className="p-6">
            {/* Author Info */}
            <div className="flex items-center gap-4 mb-6">
              <Avatar className="w-12 h-12">
                <AvatarImage src={post.author.avatar} />
                <AvatarFallback>
                  {post.author.firstName[0]}{post.author.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">
                  {post.author.firstName} {post.author.lastName}
                </p>
                <p className="text-sm text-muted-foreground">{timeAgo}</p>
              </div>
            </div>

            {/* Content */}
            <div className="mb-6">
              <h1 className="mb-4">{post.title}</h1>
              <p className="text-muted-foreground leading-relaxed">{post.content}</p>
            </div>

            {/* Image */}
            {post.image && (
              <ImageWithFallback
                src={post.image}
                alt={post.title}
                className="w-full rounded-lg mb-6"
              />
            )}

            {/* Stats */}
            <div className="flex items-center gap-6 text-sm text-muted-foreground mb-4 pb-4 border-b">
              <span>{likes} j'aime</span>
              <span>{comments.length} commentaires</span>
              <span>{post.shares} partages</span>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button
                variant="ghost"
                className={`flex-1 gap-2 ${isLiked ? 'text-[#EF4135]' : ''}`}
                onClick={handleLike}
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                J'aime
              </Button>
              <Button variant="ghost" className="flex-1 gap-2">
                <MessageCircle className="w-4 h-4" />
                Commenter
              </Button>
              <Button variant="ghost" className="flex-1 gap-2">
                <Share2 className="w-4 h-4" />
                Partager
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Comments Section */}
        <Card>
          <CardContent className="p-6">
            <h2 className="mb-6">Commentaires ({comments.length})</h2>

            {/* Add Comment */}
            <div className="flex gap-3 mb-8 pb-6 border-b">
              <Avatar>
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className="flex-1 flex gap-2">
                <Input
                  placeholder="Ajouter un commentaire..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
                />
                <Button
                  onClick={handleAddComment}
                  className="bg-[#0055A4] hover:bg-[#003d7a]"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Comments List */}
            <div className="space-y-6">
              {comments.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  Aucun commentaire pour le moment. Soyez le premier à commenter !
                </p>
              ) : (
                comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    <Avatar>
                      <AvatarImage src={comment.author.avatar} />
                      <AvatarFallback>
                        {comment.author.firstName[0]}{comment.author.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="bg-muted rounded-lg p-4">
                        <p className="font-medium mb-1">
                          {comment.author.firstName} {comment.author.lastName}
                        </p>
                        <p className="text-sm">{comment.content}</p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2 ml-4">
                        {formatDistanceToNow(new Date(comment.createdAt), {
                          addSuffix: true,
                          locale: fr,
                        })}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Similar Posts */}
        <div className="mt-8">
          <h2 className="mb-4">Publications similaires</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockPublications
              .filter((p) => p.id !== post.id)
              .slice(0, 2)
              .map((relatedPost) => (
                <Card key={relatedPost.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    {relatedPost.image && (
                      <ImageWithFallback
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        className="w-full h-32 object-cover rounded-lg mb-3"
                      />
                    )}
                    <h4 className="mb-2">{relatedPost.title}</h4>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {relatedPost.content}
                    </p>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
