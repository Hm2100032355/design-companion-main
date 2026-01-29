import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Star,
  Search,
  Filter,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  Calendar,
  Reply,
  Flag,
  CheckCircle,
  Clock,
} from "lucide-react";

interface Review {
  id: string;
  tenantName: string;
  tenantInitials: string;
  roomNumber: string;
  rating: number;
  date: string;
  title: string;
  review: string;
  categories: { name: string; rating: number }[];
  helpful: number;
  replied: boolean;
  replyText?: string;
  replyDate?: string;
  status: "active" | "resolved";
}

export default function TenantReviews() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRating, setFilterRating] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const reviews: Review[] = [
    {
      id: "1",
      tenantName: "Rahul Kumar",
      tenantInitials: "RK",
      roomNumber: "101",
      rating: 5,
      date: "2024-01-20",
      title: "Excellent PG with great facilities",
      review:
        "I've been staying here for 6 months and it's been a wonderful experience. The rooms are clean, food is good, and the staff is very helpful. Highly recommended for working professionals!",
      categories: [
        { name: "Cleanliness", rating: 5 },
        { name: "Food", rating: 4 },
        { name: "Staff", rating: 5 },
      ],
      helpful: 12,
      replied: true,
      replyText: "Thank you for your kind words, Rahul! We're glad you're enjoying your stay.",
      replyDate: "2024-01-21",
      status: "resolved",
    },
    {
      id: "2",
      tenantName: "Priya Sharma",
      tenantInitials: "PS",
      roomNumber: "203",
      rating: 4,
      date: "2024-01-18",
      title: "Good experience overall",
      review:
        "Nice place to stay. The location is great and near to metro. Only concern is the Wi-Fi speed during peak hours. Rest everything is fine.",
      categories: [
        { name: "Location", rating: 5 },
        { name: "Amenities", rating: 4 },
        { name: "Wi-Fi", rating: 3 },
      ],
      helpful: 8,
      replied: false,
      status: "active",
    },
    {
      id: "3",
      tenantName: "Amit Patel",
      tenantInitials: "AP",
      roomNumber: "302",
      rating: 5,
      date: "2024-01-15",
      title: "Best PG in the area",
      review:
        "Clean rooms, tasty food, and very cooperative management. The security is excellent and I feel completely safe here. Definitely worth the rent!",
      categories: [
        { name: "Security", rating: 5 },
        { name: "Food", rating: 5 },
        { name: "Value", rating: 5 },
      ],
      helpful: 15,
      replied: true,
      replyText: "Thank you Amit! Your safety and comfort are our top priorities.",
      replyDate: "2024-01-16",
      status: "resolved",
    },
    {
      id: "4",
      tenantName: "Sneha Reddy",
      tenantInitials: "SR",
      roomNumber: "105",
      rating: 3,
      date: "2024-01-12",
      title: "Average experience",
      review:
        "The room is okay but housekeeping could be more regular. The food menu doesn't have much variety. Location and staff are good though.",
      categories: [
        { name: "Cleanliness", rating: 3 },
        { name: "Food", rating: 2 },
        { name: "Staff", rating: 4 },
      ],
      helpful: 5,
      replied: false,
      status: "active",
    },
    {
      id: "5",
      tenantName: "Vikram Singh",
      tenantInitials: "VS",
      roomNumber: "201",
      rating: 4,
      date: "2024-01-10",
      title: "Value for money",
      review:
        "Considering the rent, this PG offers great value. The amenities are good, rooms are spacious, and the food is decent. Minor improvements in maintenance response time would be great.",
      categories: [
        { name: "Value", rating: 5 },
        { name: "Amenities", rating: 4 },
        { name: "Maintenance", rating: 3 },
      ],
      helpful: 10,
      replied: true,
      replyText: "Thanks for the feedback, Vikram! We're working on improving our maintenance response time.",
      replyDate: "2024-01-11",
      status: "resolved",
    },
  ];

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.tenantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.review.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRating = filterRating === "all" || review.rating === Number(filterRating);
    const matchesStatus = filterStatus === "all" || (filterStatus === "replied" ? review.replied : !review.replied);
    return matchesSearch && matchesRating && matchesStatus;
  });

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

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-primary" />
            Tenant Reviews
          </h1>
          <p className="text-muted-foreground mt-1">
            View and manage reviews from your tenants
          </p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline">{reviews.length} Total Reviews</Badge>
          <Badge className="bg-green-100 text-green-800">
            {reviews.filter((r) => r.replied).length} Replied
          </Badge>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-0 shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-yellow-100">
                <Star className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">4.5</p>
                <p className="text-sm text-muted-foreground">Average Rating</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100">
                <MessageSquare className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{reviews.length}</p>
                <p className="text-sm text-muted-foreground">Total Reviews</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-100">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{reviews.filter((r) => r.replied).length}</p>
                <p className="text-sm text-muted-foreground">Replied</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-card">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-orange-100">
                <Clock className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{reviews.filter((r) => !r.replied).length}</p>
                <p className="text-sm text-muted-foreground">Pending Reply</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-card">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search reviews..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={filterRating} onValueChange={setFilterRating}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Filter by rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ratings</SelectItem>
                <SelectItem value="5">5 Stars</SelectItem>
                <SelectItem value="4">4 Stars</SelectItem>
                <SelectItem value="3">3 Stars</SelectItem>
                <SelectItem value="2">2 Stars</SelectItem>
                <SelectItem value="1">1 Star</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Reviews</SelectItem>
                <SelectItem value="replied">Replied</SelectItem>
                <SelectItem value="pending">Pending Reply</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.map((review) => (
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
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {review.replied ? (
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Replied
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-orange-600 border-orange-300">
                      <Clock className="h-3 w-3 mr-1" />
                      Pending
                    </Badge>
                  )}
                </div>
              </div>

              {/* Review Content */}
              <div className="mb-4">
                <h3 className="font-semibold mb-2">{review.title}</h3>
                <p className="text-muted-foreground">{review.review}</p>
              </div>

              {/* Category Ratings */}
              <div className="flex flex-wrap gap-3 mb-4">
                {review.categories.map((cat) => (
                  <div
                    key={cat.name}
                    className="flex items-center gap-1 px-2 py-1 rounded-full bg-muted text-sm"
                  >
                    <span>{cat.name}</span>
                    <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                    <span className="font-medium">{cat.rating}</span>
                  </div>
                ))}
              </div>

              {/* Reply Section */}
              {review.replied && review.replyText && (
                <div className="bg-primary/5 rounded-lg p-4 mb-4 border-l-4 border-primary">
                  <div className="flex items-center gap-2 mb-2">
                    <Reply className="h-4 w-4 text-primary" />
                    <span className="font-medium text-sm">Owner's Response</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(review.replyDate!).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm">{review.replyText}</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <ThumbsUp className="h-4 w-4" />
                    {review.helpful} found helpful
                  </span>
                </div>
                <div className="flex gap-2">
                  {!review.replied && (
                    <Button size="sm">
                      <Reply className="h-4 w-4 mr-1" />
                      Reply
                    </Button>
                  )}
                  <Button variant="ghost" size="sm">
                    <Flag className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredReviews.length === 0 && (
        <Card className="border-0 shadow-card">
          <CardContent className="p-12 text-center">
            <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No reviews found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
