import { AppShell } from "@/components/layout/AppShell";

export default function Home() {
  return (
    <AppShell>
      <div id="top" />
      <section id="work" className="min-h-screen px-6 pt-24">
        <h2 className="font-display text-4xl">Work</h2>
      </section>
      <section id="services" className="min-h-screen px-6 pt-24">
        <h2 className="font-display text-4xl">Services</h2>
      </section>
      <section id="about" className="min-h-screen px-6 pt-24">
        <h2 className="font-display text-4xl">About</h2>
      </section>
      <section id="contact" className="min-h-screen px-6 pt-24">
        <h2 className="font-display text-4xl">Contact</h2>
      </section>
    </AppShell>
  );
}
