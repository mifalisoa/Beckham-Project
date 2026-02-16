import { useState } from 'react';
import { ArrowLeft, Mail, Calendar, Edit2, Heart, MessageCircle, Share2 } from 'lucide-react';
import { currentUser } from '../data/mockData';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface ProfilePageProps {
  onBack: () => void;
  role: 'admin' | 'client';
}

export function ProfilePage({ onBack, role }: ProfilePageProps) {
  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState({
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
  });

  const stats = {
    publications: role === 'admin' ? 24 : 0,
    interactions: role === 'client' ? 156 : 0,
    reviews: role === 'client' ? 8 : 0,
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving profile:', editData);
    setEditOpen(false);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0055A4] to-[#4A90E2] text-white p-6">
        <div className="container mx-auto">
          <Button
            variant="ghost"
            className="text-white hover:bg-white/20 mb-4"
            onClick={onBack}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour au tableau de bord
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-16">
        {/* Profile Card */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <Avatar className="w-32 h-32 border-4 border-white shadow-xl">
                <AvatarImage src={currentUser.avatar} />
                <AvatarFallback className="text-3xl">
                  {currentUser.firstName[0]}{currentUser.lastName[0]}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row items-center gap-3 mb-2">
                  <h1>
                    {currentUser.firstName} {currentUser.lastName}
                  </h1>
                  <Badge
                    className={
                      role === 'admin'
                        ? 'bg-[#0055A4]'
                        : 'bg-[#27AE60]'
                    }
                  >
                    {role === 'admin' ? 'Administrateur' : 'Client'}
                  </Badge>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-4 text-muted-foreground mb-4">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {currentUser.email}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Membre depuis {format(new Date(currentUser.joinedDate), 'MMMM yyyy', { locale: fr })}
                  </div>
                </div>

                <Button
                  onClick={() => setEditOpen(true)}
                  className="gap-2"
                  variant="outline"
                >
                  <Edit2 className="w-4 h-4" />
                  Modifier le profil
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t">
              {role === 'admin' ? (
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#0055A4]">{stats.publications}</div>
                  <div className="text-sm text-muted-foreground">Publications</div>
                </div>
              ) : (
                <>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#EF4135]">{stats.interactions}</div>
                    <div className="text-sm text-muted-foreground">Interactions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#F39C12]">{stats.reviews}</div>
                    <div className="text-sm text-muted-foreground">Avis donnés</div>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Tabs Content */}
        <Tabs defaultValue={role === 'admin' ? 'publications' : 'interactions'} className="mb-8">
          <TabsList className="grid w-full grid-cols-3">
            {role === 'admin' ? (
              <TabsTrigger value="publications">Mes Publications</TabsTrigger>
            ) : (
              <>
                <TabsTrigger value="interactions">Mes Interactions</TabsTrigger>
                <TabsTrigger value="reviews">Mes Avis</TabsTrigger>
              </>
            )}
            <TabsTrigger value="activity">Activité récente</TabsTrigger>
          </TabsList>

          <TabsContent value="publications" className="mt-6">
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">
                  Vos publications apparaîtront ici
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="interactions" className="mt-6">
            <div className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-[#EF4135]/10">
                      <Heart className="w-5 h-5 text-[#EF4135]" />
                    </div>
                    <div className="flex-1">
                      <p>Vous avez aimé une publication</p>
                      <p className="text-sm text-muted-foreground">Il y a 2 heures</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-[#0055A4]/10">
                      <MessageCircle className="w-5 h-5 text-[#0055A4]" />
                    </div>
                    <div className="flex-1">
                      <p>Vous avez commenté une publication</p>
                      <p className="text-sm text-muted-foreground">Il y a 5 heures</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-[#4A90E2]/10">
                      <Share2 className="w-5 h-5 text-[#4A90E2]" />
                    </div>
                    <div className="flex-1">
                      <p>Vous avez partagé une publication</p>
                      <p className="text-sm text-muted-foreground">Hier</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">
                  Vos avis apparaîtront ici
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="mt-6">
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">
                  Votre activité récente apparaîtra ici
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Edit Profile Modal */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Modifier le profil</DialogTitle>
            <DialogDescription>
              Mettez à jour vos informations personnelles
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSaveProfile}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Prénom</Label>
                <Input
                  id="firstName"
                  value={editData.firstName}
                  onChange={(e) => setEditData({ ...editData, firstName: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Nom</Label>
                <Input
                  id="lastName"
                  value={editData.lastName}
                  onChange={(e) => setEditData({ ...editData, lastName: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={editData.email}
                  onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setEditOpen(false)}>
                Annuler
              </Button>
              <Button type="submit" className="bg-[#0055A4] hover:bg-[#003d7a]">
                Enregistrer
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
