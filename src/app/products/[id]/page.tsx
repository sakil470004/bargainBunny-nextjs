
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Heart, Share2, MessageCircle } from "lucide-react"

// This would come from your database based on the ID
const product = {
  id: 1,
  title: "iPhone 13 Pro",
  price: 899,
  condition: "Like New",
  location: "New York, NY",
  description: "iPhone 13 Pro in excellent condition. Comes with original box and accessories. Battery health at 92%. No scratches or dents.",
  features: [
    "128GB Storage",
    "Graphite Color",
    "Unlocked",
    "iOS 16",
    "Face ID Working Perfectly"
  ],
  images: [
    "/api/placeholder/600/400",
    "/api/placeholder/600/400",
    "/api/placeholder/600/400"
  ],
  seller: {
    name: "John Doe",
    rating: 4.8,
    memberSince: "2023",
    responseTime: "Usually responds in 1 hour",
    image: "/api/placeholder/100/100"
  }
}

export default function ProductDetails() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-[4/3] relative rounded-lg overflow-hidden">
            <img 
              src={product.images[0]} 
              alt={product.title}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {product.images.slice(1).map((image, index) => (
              <div key={index} className="aspect-[4/3] relative rounded-lg overflow-hidden">
                <img 
                  src={image} 
                  alt={`${product.title} ${index + 2}`}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <Badge>{product.condition}</Badge>
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
            <div className="flex items-center text-muted-foreground mb-4">
              <MapPin className="h-4 w-4 mr-2" />
              {product.location}
            </div>
            <div className="text-3xl font-bold mb-6">${product.price}</div>
          </div>

          <div className="flex gap-4">
            <Button className="flex-1">
              <MessageCircle className="mr-2 h-4 w-4" /> Contact Seller
            </Button>
            <Button className="flex-1">Buy Now</Button>
          </div>

          <Separator />

          {/* Seller Info */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <img
                  src={product.seller.image}
                  alt={product.seller.name}
                  className="h-12 w-12 rounded-full"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{product.seller.name}</h3>
                  <div className="text-sm text-muted-foreground">
                    ⭐️ {product.seller.rating} · Member since {product.seller.memberSince}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {product.seller.responseTime}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Product Details Tabs */}
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-4">
              <p className="text-muted-foreground">{product.description}</p>
            </TabsContent>
            <TabsContent value="features" className="mt-4">
              <ul className="list-disc pl-4 space-y-2 text-muted-foreground">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Similar Items Section */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Similar Items</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <Card key={index}>
              <div className="aspect-[4/3] relative">
                <img
                  src="/api/placeholder/400/300"
                  alt="Similar item"
                  className="object-cover w-full h-full rounded-t-lg"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">Similar iPhone</h3>
                <div className="text-lg font-bold">$849</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}