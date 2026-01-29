import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Star, TrendingUp, TrendingDown, Users, MessageSquare, ThumbsUp, Award } from "lucide-react";

export default function PGRatings() {
  const overallRating = 4.5;
  const totalReviews = 128;

  const ratingBreakdown = [
    { stars: 5, count: 72, percentage: 56 },
    { stars: 4, count: 38, percentage: 30 },
    { stars: 3, count: 12, percentage: 9 },
    { stars: 2, count: 4, percentage: 3 },
    { stars: 1, count: 2, percentage: 2 },
  ];

  const categoryRatings = [
    { category: "Cleanliness", rating: 4.7, icon: "🧹" },
    { category: "Food Quality", rating: 4.3, icon: "🍽️" },
    { category: "Amenities", rating: 4.5, icon: "🛋️" },
    { category: "Staff Behavior", rating: 4.6, icon: "👥" },
    { category: "Value for Money", rating: 4.2, icon: "💰" },
    { category: "Location", rating: 4.8, icon: "📍" },
    { category: "Safety & Security", rating: 4.7, icon: "🔒" },
    { category: "Wi-Fi/Internet", rating: 4.0, icon: "📶" },
  ];

  const monthlyTrend = [
    { month: "Jan", rating: 4.3 },
    { month: "Feb", rating: 4.4 },
    { month: "Mar", rating: 4.5 },
    { month: "Apr", rating: 4.4 },
    { month: "May", rating: 4.6 },
    { month: "Jun", rating: 4.5 },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold flex items-center gap-2">
            <Star className="h-6 w-6 text-yellow-500 fill-yellow-500" />
            PG Ratings
          </h1>
          <p className="text-muted-foreground mt-1">
            Overall ratings and performance metrics for your PG
          </p>
        </div>
        <Badge className="bg-yellow-100 text-yellow-800">
          <Award className="h-4 w-4 mr-1" />
          Top Rated PG
        </Badge>
      </div>

      {/* Overall Rating Card */}
      <Card className="border-0 shadow-card bg-gradient-to-r from-yellow-50 to-orange-50">
        <CardContent className="p-6">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Main Rating */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-yellow-100 mb-4">
                <span className="text-4xl font-bold text-yellow-700">{overallRating}</span>
              </div>
              <div className="flex justify-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${
                      star <= Math.floor(overallRating)
                        ? "text-yellow-500 fill-yellow-500"
                        : star === Math.ceil(overallRating)
                        ? "text-yellow-500 fill-yellow-200"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-muted-foreground">Based on {totalReviews} reviews</p>
            </div>

            {/* Rating Breakdown */}
            <div className="space-y-2">
              {ratingBreakdown.map((item) => (
                <div key={item.stars} className="flex items-center gap-2">
                  <span className="text-sm w-8">{item.stars} ★</span>
                  <Progress value={item.percentage} className="flex-1 h-2" />
                  <span className="text-sm text-muted-foreground w-12">{item.count}</span>
                </div>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium">+0.2</p>
                  <p className="text-xs text-muted-foreground">vs last month</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                <MessageSquare className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">15 New</p>
                  <p className="text-xs text-muted-foreground">Reviews this month</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                <ThumbsUp className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">92%</p>
                  <p className="text-xs text-muted-foreground">Recommend Rate</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Ratings */}
      <Card className="border-0 shadow-card">
        <CardHeader>
          <CardTitle className="text-lg">Category-wise Ratings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categoryRatings.map((item) => (
              <div
                key={item.category}
                className="p-4 rounded-lg border bg-card hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{item.icon}</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-semibold">{item.rating}</span>
                  </div>
                </div>
                <p className="text-sm font-medium">{item.category}</p>
                <Progress value={item.rating * 20} className="h-1.5 mt-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Monthly Trend */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">Rating Trend (Last 6 Months)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {monthlyTrend.map((item, index) => (
                <div key={item.month} className="flex items-center gap-3">
                  <span className="w-10 text-sm text-muted-foreground">{item.month}</span>
                  <Progress value={item.rating * 20} className="flex-1 h-3" />
                  <div className="flex items-center gap-1 w-16">
                    <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-medium">{item.rating}</span>
                    {index > 0 && item.rating > monthlyTrend[index - 1].rating && (
                      <TrendingUp className="h-3 w-3 text-green-600" />
                    )}
                    {index > 0 && item.rating < monthlyTrend[index - 1].rating && (
                      <TrendingDown className="h-3 w-3 text-red-600" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle className="text-lg">Rating Highlights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-green-50 border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-800">Top Performing</span>
              </div>
              <p className="text-sm text-green-700">
                Location (4.8★) and Safety (4.7★) are your highest-rated categories
              </p>
            </div>
            <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200">
              <div className="flex items-center gap-2 mb-2">
                <Star className="h-5 w-5 text-yellow-600" />
                <span className="font-medium text-yellow-800">Improvement Area</span>
              </div>
              <p className="text-sm text-yellow-700">
                Wi-Fi/Internet (4.0★) has room for improvement based on tenant feedback
              </p>
            </div>
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-blue-800">Tenant Satisfaction</span>
              </div>
              <p className="text-sm text-blue-700">
                92% of tenants would recommend your PG to others
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
