import Image from "next/image";
import { Button } from "../components/ui/button";
import Hero from "@/components/homepage/hero";
import Highlighted from "@/components/homepage/highlighted";
import Newsletter from "@/components/homepage/newsletter";
import Footer from "@/components/homepage/footer";


export default function Home() {
  return (
    <div>
      <Hero/>
      <Highlighted/>
      <Newsletter/>
      <Footer/>
      
    </div>
  );
}
