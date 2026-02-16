import { useState } from 'react';
import { Star, ArrowLeft } from 'lucide-react';
import { ReviewCard } from '../components/ReviewCard';
import { mockReviews } from '../data/mockData';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

interface ReviewsPageProps {
  onBack: () => void;
}

export function ReviewsPage({ onBack }: ReviewsPageProps) {
  const [createReviewOpen, setCreateReviewOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewData, setReviewData] = useState({
    service: '',
    comment: '',
  });

  const averageRating = 4.6;
  const totalReviews = mockReviews.length;

  const ratingDistribution = [
    { stars: 5, count: 42, percentage: 65 },
    { stars: 4, count: 18, percentage: 28 },
    { stars: 3, count: 3, percentage: 5 },
    { stars: 2, count: 1, percentage: 1 },
    { stars: 1, count: 1, percentage: 1 },
  ];

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('New review:', { rating, ...reviewData });
    setCreateReviewOpen(false);
    setRating(0);
    setReviewData({ service: '', comment: '' });
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-[#0055A4] text-white p-6">
        <div className="container mx-auto">
          <Button
            variant="ghost"
            className="text-white hover:bg-white/20 mb-4"
            onClick={onBack}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour au tableau de bord
          </Button>
          <h1 className="text-2xl font-bold">Avis et évaluations</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Average Rating */}
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-5xl font-bold mb-2">{averageRating}</div>
              <div className="flex items-center justify-center gap-1 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 ${
                      i < Math.floor(averageRating)
                        ? 'fill-[#F39C12] text-[#F39C12]'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Basé sur {totalReviews} avis
              </p>
            </CardContent>
          </Card>

          {/* Rating Distribution */}
          <Card className="lg:col-span-2">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Distribution des notes</h3>
              <div className="space-y-3">
                {ratingDistribution.map((item) => (
                  <div key={item.stars} className="flex items-center gap-3">
                    <div className="flex items-center gap-1 w-20">
                      <span className="text-sm">{item.stars}</span>
                      <Star className="w-4 h-4 fill-[#F39C12] text-[#F39C12]" />
                    </div>
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#F39C12]"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground w-12 text-right">
                      {item.count}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Tous les avis</h2>
          <Button
            onClick={() => setCreateReviewOpen(true)}
            className="bg-[#EF4135] hover:bg-[#d4183d] text-white"
          >
            Laisser un avis
          </Button>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {mockReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>

      {/* Create Review Modal */}
      <Dialog open={createReviewOpen} onOpenChange={setCreateReviewOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Laisser un avis</DialogTitle>
            <DialogDescription>
              Partagez votre expérience avec la communauté
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitReview}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Note</Label>
                <div className="flex items-center gap-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      aria-label={`Noter ${i + 1} sur 5 étoiles`}
                      className="focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm"
                      onClick={() => setRating(i + 1)}
                      onMouseEnter={() => setHoverRating(i + 1)}
                      onMouseLeave={() => setHoverRating(0)}
                    >
                      <Star
                        className={`w-8 h-8 cursor-pointer transition-colors ${
                          i < (hoverRating || rating)
                            ? 'fill-[#F39C12] text-[#F39C12]'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="service">Service évalué</Label>
                <Select
                  value={reviewData.service}
                  onValueChange={(value) => setReviewData({ ...reviewData, service: value })}
                >
                  <SelectTrigger id="service">
                    <SelectValue placeholder="Sélectionnez un service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="platform">Plateforme générale</SelectItem>
                    <SelectItem value="messaging">Messagerie</SelectItem>
                    <SelectItem value="support">Support</SelectItem>
                    <SelectItem value="publications">Publications</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="comment">Votre avis</Label>
                <Textarea
                  id="comment"
                  placeholder="Partagez votre expérience..."
                  rows={5}
                  value={reviewData.comment}
                  onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setCreateReviewOpen(false)}>
                Annuler
              </Button>
              <Button
                type="submit"
                className="bg-[#EF4135] hover:bg-[#d4183d] text-white"
                disabled={rating === 0}
              >
                Publier l'avis
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}