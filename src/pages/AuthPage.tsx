import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

interface AuthPageProps {
  onLogin: (role: 'admin' | 'client') => void;
}

export function AuthPage({ onLogin }: AuthPageProps) {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'client' as 'admin' | 'client',
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login - in real app would validate credentials
    const role = loginEmail.includes('admin') ? 'admin' : 'client';
    onLogin(role);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(registerData.role);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0055A4] via-white to-[#EF4135] p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-3 h-12 bg-[#0055A4] rounded"></div>
            <div className="w-3 h-12 bg-white border border-gray-300 rounded"></div>
            <div className="w-3 h-12 bg-[#EF4135] rounded"></div>
          </div>
          <CardTitle>Plateforme Sociale</CardTitle>
          <CardDescription>
            Connectez-vous pour accéder à votre espace
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Connexion</TabsTrigger>
              <TabsTrigger value="register">Inscription</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="votre@email.fr"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Mot de passe</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="text-right">
                  <a href="#" className="text-sm text-[#0055A4] hover:underline">
                    Mot de passe oublié ?
                  </a>
                </div>
                <Button type="submit" className="w-full bg-[#0055A4] hover:bg-[#003d7a]">
                  Se connecter
                </Button>
                <p className="text-xs text-center text-muted-foreground mt-4">
                  Astuce : utilisez "admin@test.fr" pour le rôle Admin ou "client@test.fr" pour Client
                </p>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Prénom</Label>
                    <Input
                      id="firstName"
                      placeholder="Marie"
                      value={registerData.firstName}
                      onChange={(e) => setRegisterData({ ...registerData, firstName: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nom</Label>
                    <Input
                      id="lastName"
                      placeholder="Dupont"
                      value={registerData.lastName}
                      onChange={(e) => setRegisterData({ ...registerData, lastName: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="registerEmail">Email</Label>
                  <Input
                    id="registerEmail"
                    type="email"
                    placeholder="votre@email.fr"
                    value={registerData.email}
                    onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="registerPassword">Mot de passe</Label>
                  <Input
                    id="registerPassword"
                    type="password"
                    placeholder="••••••••"
                    value={registerData.password}
                    onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Rôle</Label>
                  <Select
                    value={registerData.role}
                    onValueChange={(value: 'admin' | 'client') => 
                      setRegisterData({ ...registerData, role: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="client">Client</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full bg-[#EF4135] hover:bg-[#d4183d]">
                  S'inscrire
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
