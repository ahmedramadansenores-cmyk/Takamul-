import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import FeaturedCategories from '@/components/home/FeaturedCategories';
import TrendingProducts from '@/components/home/TrendingProducts';
import BrandsSection from '@/components/home/BrandsSection';

export default function HomePage() {
  return (
    <>
      <Navbar />
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Featured Categories */}
        <FeaturedCategories />
        
        {/* Trending Products */}
        <TrendingProducts />
        
        {/* Brands Section */}
        <BrandsSection />
        
        {/* Newsletter Section */}
        <section className="py-16 bg-dark-100">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4 text-white">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-gray-400 mb-8">
              Get the latest updates on new products and upcoming sales.
            </p>
            <form className="max-w-md mx-auto flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-dark-200 text-white border border-dark-300 focus:outline-none focus:border-accent"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-opacity-90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}
