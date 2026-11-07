import { AppShell } from "@/components/layout/AppShell";
import { Hero } from "@/components/hero/Hero";
import { Intro } from "@/components/sections/Intro";
import { Work } from "@/components/sections/Work";
import { Services } from "@/components/sections/Services";
import { Stack } from "@/components/sections/Stack";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <AppShell>
      <div id="top" />
      <Hero />
      <Intro />
      <Work />
      <Services />
      <Stack />
      <About />
      <Contact />
      <Footer />
    </AppShell>
  );
}
