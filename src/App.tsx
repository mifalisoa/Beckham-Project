import { useState, useEffect } from 'react';
import { AuthPage } from './pages/AuthPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { ClientDashboard } from './pages/ClientDashboard';
import { MessagesPage } from './pages/MessagesPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { ProfilePage } from './pages/ProfilePage';
import { PostDetailPage } from './pages/PostDetailPage';
import { FeedPage } from './pages/FeedPage';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner';

type Page = 'auth' | 'dashboard' | 'feed' | 'messages' | 'reviews' | 'profile' | string;

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'admin' | 'client'>('client');
  const [currentPage, setCurrentPage] = useState<Page>('auth');

  useEffect(() => {
    if (isAuthenticated) {
      setCurrentPage('dashboard');
    }
  }, [isAuthenticated]);

  const handleLogin = (role: 'admin' | 'client') => {
    setUserRole(role);
    setIsAuthenticated(true);
    toast.success(`Bienvenue ! Vous êtes connecté en tant que ${role === 'admin' ? 'Administrateur' : 'Client'}`);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole('client');
    setCurrentPage('auth');
    toast.info('Vous êtes déconnecté');
  };

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
  };

  const handleBackToDashboard = () => {
    setCurrentPage('dashboard');
  };

  if (!isAuthenticated) {
    return (
      <>
        <AuthPage onLogin={handleLogin} />
        <Toaster position="top-right" />
      </>
    );
  }

  return (
    <>
      {currentPage === 'dashboard' && (
        <>
          {userRole === 'admin' ? (
            <AdminDashboard onLogout={handleLogout} onNavigate={handleNavigate} />
          ) : (
            <ClientDashboard onLogout={handleLogout} onNavigate={handleNavigate} />
          )}
        </>
      )}

      {currentPage === 'feed' && (
        <FeedPage
          onBack={handleBackToDashboard}
          onNavigateToPost={(postId) => handleNavigate(postId)}
          isAdmin={userRole === 'admin'}
        />
      )}

      {currentPage.startsWith('post-') && (
        <PostDetailPage
          postId={currentPage}
          onBack={() => handleNavigate('feed')}
        />
      )}

      {currentPage === 'messages' && (
        <MessagesPage onBack={handleBackToDashboard} />
      )}

      {currentPage === 'reviews' && (
        <ReviewsPage onBack={handleBackToDashboard} />
      )}

      {currentPage === 'profile' && (
        <ProfilePage onBack={handleBackToDashboard} role={userRole} />
      )}

      <Toaster position="top-right" />
    </>
  );
}
