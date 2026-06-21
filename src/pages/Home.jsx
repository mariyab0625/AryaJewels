import VideoHero from "../components/home/VideoHero";
import Hero from "../components/home/Hero";
import BrandPromise from "../components/home/BrandPromise";
import Collections from "../components/home/Collections";
import FeaturedProducts from "../components/home/FeaturedProducts";
import Testimonials from "../components/home/Testimonials";
import InstagramGallery from "../components/home/InstagramGallery";

export default function Home() {
  return (
    <main>
      {/* Pull VideoHero up to sit behind the fixed navbar */}
      <div style={{ marginTop: "-54px" }}>
        <VideoHero />
      </div>
      {/* Hero overlaps the empty scroll-space of VideoHero — no white gap */}
      <div style={{ position: "relative", zIndex: 2, marginTop: "-80vh", backgroundColor: "var(--color-bg-main)" }}>
        <Hero />
      </div>
      <BrandPromise />
      <Collections />
      <FeaturedProducts />
      <Testimonials />
      <InstagramGallery />
    </main>
  );
}
