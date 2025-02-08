import Chatbot from "../components/ChatBot";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Container from "../components/Container";
export default function Home() {
  return (
    <div className="">
      <Container>
        <Navbar />
        <div className="min-h-screen relative">
          <Chatbot />
        </div>
        <Footer />
      </Container>
    </div>
  );
}
