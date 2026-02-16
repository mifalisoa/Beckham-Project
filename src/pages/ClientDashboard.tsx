import { useState } from 'react';
import { Bell, User, TrendingUp } from 'lucide-react';
import { PostCard } from '../components/PostCard';
import { mockPublications, currentUser } from '../data/mockData';
import { Button } from '../components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../components/ui/dropdown-menu';

interface ClientDashboardProps {
  onLogout: () => void;
  onNavigate: (page: string) => void;
}

export function ClientDashboard({ onLogout, onNavigate }: ClientDashboardProps) {
  const [activeTab, setActiveTab] = useState('publications');

  const suggestions = [
    { name: 'Sophie Bernard', role: 'Marketing', avatar: 'https://images.unsplash.com/photo-1630283017802-785b7aff9aac?w=200&h=200&fit=crop' },
    { name: 'Lucas Petit', role: 'Design', avatar: 'https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=200&h=200&fit=crop' },
  ];

  const trending = [
    { tag: '#Innovation', posts: 245 },
    { tag: '#Digital', posts: 189 },
    { tag: '#Community', posts: 156 },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header Navigation */}
      <header className="sticky top-0 z-10 bg-[#0055A4] text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <div className="w-2 h-6 bg-white rounded"></div>
                <div className="w-2 h-6 bg-[#EF4135] rounded"></div>
                <h2 className="ml-2">Plateforme</h2>
              </div>
              <nav className="hidden md:flex gap-6">
                <button
                  onClick={() => setActiveTab('publications')}
                  className={`pb-2 border-b-2 transition-colors ${
                    activeTab === 'publications'
                      ? 'border-white'
                      : 'border-transparent hover:border-white/50'
                  }`}
                >
                  Publications
                </button>
                <button
                  onClick={() => {
                    setActiveTab('messages');
                    onNavigate('messages');
                  }}
                  className={`pb-2 border-b-2 transition-colors ${
                    activeTab === 'messages'
                      ? 'border-white'
                      : 'border-transparent hover:border-white/50'
                  }`}
                >
                  Messages
                </button>
                <button
                  onClick={() => {
                    setActiveTab('profile');
                    onNavigate('profile');
                  }}
                  className={`pb-2 border-b-2 transition-colors ${
                    activeTab === 'profile'
                      ? 'border-white'
                      : 'border-transparent hover:border-white/50'
                  }`}
                >
                  Mon Profil
                </button>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative text-white hover:bg-white/10">
                <Bell className="w-5 h-5" />
                <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-[#EF4135]">
                  2
                </Badge>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2 text-white hover:bg-white/10">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={currentUser.avatar} />
                      <AvatarFallback>
                        {currentUser.firstName[0]}{currentUser.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden md:inline">{currentUser.firstName}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onNavigate('profile')}>
                    Mon Profil
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onNavigate('reviews')}>
                    Mes Avis
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={onLogout}>
                    Déconnexion
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Feed */}
          <div className="lg:col-span-8 space-y-6">
            {mockPublications.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onClick={() => onNavigate(`post-${post.id}`)}
              />
            ))}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Suggestions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {suggestions.map((user, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.role}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="text-[#0055A4] border-[#0055A4]">
                      Suivre
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Trending Topics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Tendances
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {trending.map((topic, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{topic.tag}</p>
                      <p className="text-xs text-muted-foreground">{topic.posts} publications</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* My Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Mes statistiques</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Likes donnés</span>
                  <span>156</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Commentaires</span>
                  <span>42</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Partages</span>
                  <span>28</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
