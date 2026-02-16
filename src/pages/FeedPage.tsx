import { useState } from 'react';
import { ArrowLeft, Plus, Filter } from 'lucide-react';
import { PostCard } from '../components/PostCard';
import { CreatePostModal } from '../components/CreatePostModal';
import { mockPublications } from '../data/mockData';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

interface FeedPageProps {
  onBack: () => void;
  onNavigateToPost: (postId: string) => void;
  isAdmin: boolean;
}

export function FeedPage({ onBack, onNavigateToPost, isAdmin }: FeedPageProps) {
  const [createPostOpen, setCreatePostOpen] = useState(false);
  const [sortBy, setSortBy] = useState('recent');

  const sortedPublications = [...mockPublications].sort((a, b) => {
    if (sortBy === 'popular') {
      return b.likes - a.likes;
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-[#0055A4] text-white p-6">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              className="text-white hover:bg-white/20"
              onClick={onBack}
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Retour au tableau de bord
            </Button>
            {isAdmin && (
              <Button
                onClick={() => setCreatePostOpen(true)}
                className="bg-[#EF4135] hover:bg-[#d4183d] gap-2"
              >
                <Plus className="w-4 h-4" />
                Nouvelle publication
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Filters */}
        <div className="flex items-center justify-between mb-6">
          <h1>Fil d'actualité</h1>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Plus récentes</SelectItem>
                <SelectItem value="popular">Plus populaires</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Posts */}
        <div className="space-y-6">
          {sortedPublications.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onClick={onNavigateToPost}
            />
          ))}
        </div>
      </div>

      {/* Floating Action Button (Mobile) */}
      {isAdmin && (
        <Button
          onClick={() => setCreatePostOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[#EF4135] hover:bg-[#d4183d] shadow-lg md:hidden"
        >
          <Plus className="w-6 h-6" />
        </Button>
      )}

      <CreatePostModal
        open={createPostOpen}
        onClose={() => setCreatePostOpen(false)}
        onSubmit={(data) => {
          console.log('New post:', data);
        }}
      />
    </div>
  );
}
