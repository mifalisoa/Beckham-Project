import { useState } from 'react';
import { Home, FileText, Users, Mail, BarChart3, Search, Bell, LogOut, Plus } from 'lucide-react';
import { StatCard } from '../components/StatCard';
import { PostCard } from '../components/PostCard';
import { CreatePostModal } from '../components/CreatePostModal';
import { mockStats, mockPublications, currentUser } from '../data/mockData';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../components/ui/dropdown-menu';

interface AdminDashboardProps {
  onLogout: () => void;
  onNavigate: (page: string) => void;
}

export function AdminDashboard({ onLogout, onNavigate }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [createPostOpen, setCreatePostOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'publications', label: 'Publications', icon: FileText },
    { id: 'users', label: 'Utilisateurs', icon: Users },
    { id: 'messages', label: 'Messages', icon: Mail },
    { id: 'stats', label: 'Statistiques', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-[#0055A4] text-white p-4 flex flex-col">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-2 h-8 bg-white rounded"></div>
          <div className="w-2 h-8 bg-[#EF4135] rounded"></div>
          <h2 className="ml-2">Admin Panel</h2>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                if (item.id === 'publications') onNavigate('feed');
                if (item.id === 'messages') onNavigate('messages');
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === item.id
                  ? 'bg-white/20'
                  : 'hover:bg-white/10'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-white hover:bg-white/10"
          onClick={onLogout}
        >
          <LogOut className="w-5 h-5" />
          Déconnexion
        </Button>
      </aside>

      {/* Main Content */}
      <div className="ml-64">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-white border-b px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher..."
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-[#EF4135]">
                  3
                </Badge>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={currentUser.avatar} />
                      <AvatarFallback>
                        {currentUser.firstName[0]}{currentUser.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <span>{currentUser.firstName}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onNavigate('profile')}>
                    Mon Profil
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={onLogout}>
                    Déconnexion
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-8">
          <div className="mb-6">
            <h1>Tableau de bord</h1>
            <p className="text-muted-foreground">
              Bienvenue, {currentUser.firstName} {currentUser.lastName}
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Publications"
              value={mockStats.totalPublications}
              icon={FileText}
              trend="+12% ce mois"
            />
            <StatCard
              title="Total Clients"
              value={mockStats.totalClients}
              icon={Users}
              trend="+23% ce mois"
              iconColor="text-[#27AE60]"
            />
            <StatCard
              title="Messages non lus"
              value={mockStats.unreadMessages}
              icon={Mail}
              iconColor="text-[#EF4135]"
            />
            <StatCard
              title="Note moyenne"
              value={`${mockStats.averageRating} ⭐`}
              icon={BarChart3}
              trend="Excellent"
              iconColor="text-[#F39C12]"
            />
          </div>

          {/* Recent Publications */}
          <div className="flex items-center justify-between mb-4">
            <h2>Publications récentes</h2>
            <Button
              onClick={() => setCreatePostOpen(true)}
              className="bg-[#EF4135] hover:bg-[#d4183d] gap-2"
            >
              <Plus className="w-4 h-4" />
              Nouvelle publication
            </Button>
          </div>

          <div className="space-y-6">
            {mockPublications.slice(0, 3).map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onClick={() => onNavigate(`post-${post.id}`)}
              />
            ))}
          </div>
        </main>
      </div>

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
