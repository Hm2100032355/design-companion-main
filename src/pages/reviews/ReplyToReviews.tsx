import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Star,
  Reply,
  Send,
  Clock,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

interface PendingReview {
  id: string;
  tenantName: string;
  tenantInitials: string;
  roomNumber: string;
  rating: number;
  date: string;
  title: string;
  review: string;
  daysPending: number;
}

export default function ReplyToReviews() {
  const [selectedReview, setSelectedReview] = useState<PendingReview | null>(null);
  const [replyText, setReplyText] = useState("");

  const pendingReviews: PendingReview[] = [
    {
      id: "1",
      tenantName: "Priya Sharma",
      tenantInitials: "PS",
      roomNumber: "203",
      rating: 4,
      date: "2024-01-18",
      title: "Good experience overall",
      review:
        "Nice place to stay. The location is great and near to metro. Only concern is the Wi-Fi speed during peak hours. Rest everything is fine.",
      daysPending: 3,
    },
    {
      id: "2",
      tenantName: "Sneha Reddy",
      tenantInitials: "SR",
      roomNumber: "105",
      rating: 3,
      date: "2024-01-12",
      title: "Average experience",
      review:
        "The room is okay but housekeeping could be more regular. The food menu doesn't have much variety. Location and staff are good though.",
      daysPending: 9,
    },
    {
      id: "3",
      tenantName: "Karthik Rao",
      tenantInitials: "KR",
      roomNumber: "304",
      rating: 4,
      date: "2024-01-20",
      title: "Satisfied with the stay",
      review:
        "Good PG overall. The AC works well and rooms are cleaned regularly. Would appreciate if the laundry service was faster.",
      daysPending: 1,
    },
    {
      id: "4",
      tenantName: "Anjali Gupta",
      tenantInitials: "AG",
      roomNumber: "102",
      rating: 2,
      date: "2024-01-08",
      title: "Needs improvement",
      review:
        "Hot water is not available regularly in the morning. The geyser timing should be extended. Also, the parking space is very limited.",
      daysPending: 13,
    },
  ];

  const suggestedReplies = [
    "Thank you for your valuable feedback! We're constantly working to improve our services.",
    "We appreciate your review and will address your concerns immediately.",
    "Thanks for sharing your experience. We'll look into the issues you mentioned.",
    "We're glad you enjoyed your stay! Thank you for the kind words.",
  ];

  const handleSendReply = () => {
    if (!replyText.trim()) {
      toast.error("Please enter a reply message");
      return;
    }
    toast.success("Reply sent successfully!", {
      description: `Your response to ${selectedReview?.tenantName}'s review has been posted.`,
    });
    setReplyText("");
    setSelectedReview(null);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  const getPriorityBadge = (days: number) => {
    if (days >= 7) {
      return (
        <Badge className="bg-red-100 text-red-800">
          <AlertCircle className="h-3 w-3 mr-1" />
          Urgent ({days} days)
        </Badge>
      );
    } else if (days >= 3) {
      return (
        <Badge className="bg-yellow-100 text-yellow-800">
          <Clock className="h-3 w-3 mr-1" />
          {days} days pending
        </Badge>
      );
    }
    return (
      <Badge variant="outline">
        <Clock className="h-3 w-3 mr-1" />
        {days} day{days > 1 ? "s" : ""} ago
      </Badge>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold flex items-center gap-2">
            <Reply className="h-6 w-6 text-primary" />
            Reply to Reviews
          </h1>
          <p className="text-muted-foreground mt-1">
            Respond to pending tenant reviews
          </p>
        </div>
        <Badge variant="outline" className="text-orange-600 border-orange-300">
          {pendingReviews.length} Pending Replies
        </Badge>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="border-0 shadow-card bg-gradient-to-r from-orange-50 to-yellow-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-orange-100">
                <Clock className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{pendingReviews.length}</p>
                <p className="text-sm text-muted-foreground">Awaiting Reply</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-red-100">
                <AlertCircle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {pendingReviews.filter((r) => r.daysPending >= 7).length}
                </p>
                <p className="text-sm text-muted-foreground">Urgent (7+ days)</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-yellow-100">
                <Star className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {pendingReviews.filter((r) => r.rating <= 3).length}
                </p>
                <p className="text-sm text-muted-foreground">Low Rating Reviews</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tips Card */}
      <Card className="border-0 shadow-card bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Sparkles className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <p className="font-medium text-blue-800">Quick Tips for Better Responses</p>
              <ul className="text-sm text-blue-700 mt-1 space-y-1">
                <li>• Respond within 24-48 hours for best engagement</li>
                <li>• Address specific concerns mentioned in the review</li>
                <li>• Thank tenants for their feedback, even if negative</li>
                <li>• Mention any actions you'll take to improve</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pending Reviews List */}
      <div className="space-y-4">
        {pendingReviews
          .sort((a, b) => b.daysPending - a.daysPending)
          .map((review) => (
            <Card key={review.id} className="border-0 shadow-card">
              <CardContent className="p-6">
                {/* Review Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary/10 text-primary font-medium">
                        {review.tenantInitials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{review.tenantName}</p>
                        <Badge variant="outline" className="text-xs">
                          Room {review.roomNumber}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        {renderStars(review.rating)}
                        <span className="text-sm text-muted-foreground">
                          {new Date(review.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  {getPriorityBadge(review.daysPending)}
                </div>

                {/* Review Content */}
                <div className="mb-4">
                  <h3 className="font-semibold mb-2">{review.title}</h3>
                  <p className="text-muted-foreground">{review.review}</p>
                </div>

                {/* Reply Action */}
                <div className="flex justify-end">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button onClick={() => setSelectedReview(review)}>
                        <Reply className="h-4 w-4 mr-2" />
                        Write Reply
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg">
                      <DialogHeader>
                        <DialogTitle>Reply to Review</DialogTitle>
                      </DialogHeader>

                      <div className="space-y-4 mt-4">
                        {/* Original Review Summary */}
                        <div className="bg-muted/50 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="text-xs">
                                {review.tenantInitials}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-sm">{review.tenantName}</p>
                              {renderStars(review.rating)}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {review.review}
                          </p>
                        </div>

                        {/* Reply Input */}
                        <div>
                          <Textarea
                            placeholder="Write your response..."
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            rows={4}
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            Your reply will be visible to all users
                          </p>
                        </div>

                        {/* Suggested Replies */}
                        <div>
                          <p className="text-sm font-medium mb-2">Quick Responses</p>
                          <div className="flex flex-wrap gap-2">
                            {suggestedReplies.map((suggestion, index) => (
                              <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                className="text-xs h-auto py-1.5"
                                onClick={() => setReplyText(suggestion)}
                              >
                                {suggestion.slice(0, 30)}...
                              </Button>
                            ))}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end gap-2">
                          <Button variant="outline">Cancel</Button>
                          <Button onClick={handleSendReply}>
                            <Send className="h-4 w-4 mr-2" />
                            Send Reply
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>

      {pendingReviews.length === 0 && (
        <Card className="border-0 shadow-card">
          <CardContent className="p-12 text-center">
            <CheckCircle className="h-12 w-12 mx-auto text-green-600 mb-4" />
            <h3 className="text-lg font-medium mb-2">All caught up!</h3>
            <p className="text-muted-foreground">
              You've replied to all tenant reviews
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
