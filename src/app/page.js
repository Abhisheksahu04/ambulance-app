import Chatbot from "../components/ChatBot";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Container from "../components/Container";
import HeroSection from "../components/HeroSection";
export default function Home() {
  return (
    <div className="">
        <Navbar />
        <div className="min-h-screen relative">
          <Chatbot />
          <HeroSection />
        </div>
        <Footer />
    </div>
  );
}
