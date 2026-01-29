import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Camera, Upload, Trash2, Star, Image } from "lucide-react";

const PhotosMedia = () => {
  const photos = [
    { id: 1, category: "Exterior", isCover: true },
    { id: 2, category: "Room", isCover: false },
    { id: 3, category: "Room", isCover: false },
    { id: 4, category: "Bathroom", isCover: false },
    { id: 5, category: "Dining", isCover: false },
    { id: 6, category: "Common Area", isCover: false },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Photos & Media</h1>
          <p className="text-muted-foreground mt-1">Manage property photos and media</p>
        </div>
        <Button className="bg-accent hover:bg-accent/90">
          <Upload className="w-4 h-4 mr-2" />
          Upload Photos
        </Button>
      </div>

      <Card className="border-0 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-accent" />
            Property Photos ({photos.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.map((photo) => (
              <div key={photo.id} className="relative group">
                <div className="aspect-square rounded-lg bg-muted flex items-center justify-center overflow-hidden">
                  <Image className="w-12 h-12 text-muted-foreground/50" />
                </div>
                <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                  <Button size="icon" variant="secondary" className="h-8 w-8">
                    <Star className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="destructive" className="h-8 w-8">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="absolute top-2 left-2 flex gap-1">
                  <Badge variant="secondary" className="text-xs">{photo.category}</Badge>
                  {photo.isCover && (
                    <Badge className="bg-accent text-accent-foreground text-xs">Cover</Badge>
                  )}
                </div>
              </div>
            ))}
            
            {/* Upload placeholder */}
            <div className="aspect-square rounded-lg border-2 border-dashed border-muted-foreground/30 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-accent hover:bg-accent/5 transition-colors">
              <Upload className="w-8 h-8 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Add Photo</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PhotosMedia;
