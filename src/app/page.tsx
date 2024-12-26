import { Button } from "@/components/ui/button"
import { SearchBar } from "@/components/search-bar"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

// This would come from your database
const featuredProducts = [
  {
    id: 1,
    title: "iPhone 13 Pro",
    price: 899,
    condition: "Like New",
    location: "New York, NY",
    image: "/api/placeholder/400/300",
    category: "Electronics"
  },
  {
    id: 2,
    title: "Mountain Bike",
    price: 299,
    condition: "Good",
    location: "Brooklyn, NY",
    image: "/api/placeholder/400/300",
    category: "Sports"
  },
  // Add more products...
]

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary/5 py-12 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Find Amazing Deals Nearby
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Your local marketplace for buying, selling, and borrowing items
          </p>
          <div className="max-w-3xl mx-auto mb-8">
            <SearchBar />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="outline" asChild>
              <Link href="/search">Browse All</Link>
            </Button>
            <Button size="lg" asChild>
              <Link href="/sell">Start Selling</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Popular Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {["Electronics", "Furniture", "Fashion", "Sports"].map((category) => (
            <Link 
              key={category} 
              href={`/categories/${category.toLowerCase()}`}
              className="group relative aspect-square overflow-hidden rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-medium">{category}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-secondary/10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Featured Items</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="group">
                <CardHeader className="p-0">
                  <div className="aspect-[4/3] relative overflow-hidden rounded-t-lg">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge>{product.category}</Badge>
                    <span className="text-sm text-muted-foreground">{product.location}</span>
                  </div>
                  <CardTitle className="mb-2">{product.title}</CardTitle>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">${product.price}</span>
                    <Badge variant="outline">{product.condition}</Badge>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button className="w-full" asChild>
                    <Link href={`/products/${product.id}`}>View Details</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" size="lg" asChild>
              <Link href="/search">View All Items</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Why Choose BargainBunny?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Local & Convenient",
              description: "Find items near you and arrange easy pickups"
            },
            {
              title: "Secure Payments",
              description: "Protected transactions and secure messaging"
            },
            {
              title: "Verified Users",
              description: "Trusted community with verified user profiles"
            }
          ].map((feature) => (
            <div key={feature.title} className="text-center">
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}