import { useState } from 'react';
import { Send, Search, ArrowLeft, Phone, Video, MoreVertical } from 'lucide-react';
import { mockConversations, mockMessages, mockUsers } from '../data/mockData';
import { Conversation, Message } from '../types';
import { Card } from '../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Switch } from '../components/ui/switch';
import { Label } from '../components/ui/label';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

interface MessagesPageProps {
  onBack: () => void;
}

export function MessagesPage({ onBack }: MessagesPageProps) {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(
    mockConversations[0]
  );
  const [messageText, setMessageText] = useState('');
  const [sendAsSMS, setSendAsSMS] = useState(false);
  const [sendAsAlert, setSendAsAlert] = useState(false);

  const currentUserId = '1';

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    console.log('Sending message:', {
      text: messageText,
      sms: sendAsSMS,
      alert: sendAsAlert,
    });
    setMessageText('');
  };

  return (
    <div className="h-screen bg-muted/30 flex flex-col">
      {/* Header with Back Button - Always visible on desktop, conditional on mobile */}
      <div className={`bg-[#0055A4] text-white p-4 md:p-6 ${selectedConversation ? 'hidden md:block' : ''}`}>
        <div className="container mx-auto">
          <Button
            variant="ghost"
            className="text-white hover:bg-white/20"
            onClick={onBack}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour au tableau de bord
          </Button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Conversations List */}
        <div className={`w-full md:w-96 bg-white border-r flex flex-col ${selectedConversation ? 'hidden md:flex' : ''}`}>
          <div className="p-4 border-b">
            <h2 className="mb-4">Messages</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Rechercher une conversation..." className="pl-10" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {mockConversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation)}
                className={`w-full p-4 flex items-center gap-3 hover:bg-muted/50 transition-colors border-b ${
                  selectedConversation?.id === conversation.id ? 'bg-muted/50' : ''
                }`}
              >
                <div className="relative">
                  <Avatar>
                    <AvatarImage src={conversation.user.avatar} />
                    <AvatarFallback>
                      {conversation.user.firstName[0]}{conversation.user.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  {conversation.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#27AE60] border-2 border-white rounded-full" />
                  )}
                </div>
                <div className="flex-1 text-left">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium">
                      {conversation.user.firstName} {conversation.user.lastName}
                    </p>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(conversation.timestamp), {
                        addSuffix: true,
                        locale: fr,
                      })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground truncate">
                      {conversation.lastMessage}
                    </p>
                    {conversation.unread > 0 && (
                      <Badge className="ml-2 bg-[#EF4135]">
                        {conversation.unread}
                      </Badge>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        {selectedConversation && (
          <div className={`flex-1 flex flex-col bg-white ${!selectedConversation ? 'hidden md:flex' : ''}`}>
            {/* Mobile Header - with back to dashboard */}
            <div className="md:hidden bg-[#0055A4] text-white p-4 flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={onBack}
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <span>Retour au tableau de bord</span>
            </div>

            {/* Chat Header */}
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  onClick={() => setSelectedConversation(null)}
                >
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                <Avatar>
                  <AvatarImage src={selectedConversation.user.avatar} />
                  <AvatarFallback>
                    {selectedConversation.user.firstName[0]}{selectedConversation.user.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">
                    {selectedConversation.user.firstName} {selectedConversation.user.lastName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {selectedConversation.isOnline ? 'En ligne' : 'Hors ligne'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Phone className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Video className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {mockMessages
                .filter((msg) => msg.conversationId === selectedConversation.id)
                .map((message) => {
                  const isSent = message.senderId !== currentUserId;
                  return (
                    <div
                      key={message.id}
                      className={`flex ${isSent ? 'justify-start' : 'justify-end'}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg px-4 py-2 ${
                          isSent
                            ? 'bg-muted text-foreground'
                            : 'bg-[#0055A4] text-white'
                        }`}
                      >
                        <p>{message.content}</p>
                        <p
                          className={`text-xs mt-1 ${
                            isSent ? 'text-muted-foreground' : 'text-white/70'
                          }`}
                        >
                          {formatDistanceToNow(new Date(message.timestamp), {
                            addSuffix: true,
                            locale: fr,
                          })}
                        </p>
                      </div>
                    </div>
                  );
                })}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <Switch
                    id="sms"
                    checked={sendAsSMS}
                    onCheckedChange={setSendAsSMS}
                  />
                  <Label htmlFor="sms" className="text-sm">SMS</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    id="alert"
                    checked={sendAsAlert}
                    onCheckedChange={setSendAsAlert}
                  />
                  <Label htmlFor="alert" className="text-sm">Alerte</Label>
                </div>
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Écrivez votre message..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button
                  onClick={handleSendMessage}
                  className="bg-[#EF4135] hover:bg-[#d4183d]"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {!selectedConversation && (
          <div className="hidden md:flex flex-1 items-center justify-center bg-muted/30">
            <p className="text-muted-foreground">
              Sélectionnez une conversation pour commencer
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
