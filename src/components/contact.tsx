import { SectionReveal } from "./section-reveal";

export function Contact() {
  return (
    <SectionReveal>
      <section id="contact" className="py-20 px-6">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
          <p className="text-zinc-400 mb-8">
            Open to opportunities — feel free to reach out.
          </p>
          <a
            href="mailto:jonathangrossman716@gmail.com"
            className="text-lg text-zinc-300 hover:text-white transition-colors underline underline-offset-4"
          >
            jonathangrossman716@gmail.com
          </a>
          <div className="flex gap-6 justify-center mt-8">
            <a
              href="https://github.com/jgwentworth92"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 hover:text-white transition-colors text-sm"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/jonathan-grossman"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 hover:text-white transition-colors text-sm"
            >
              LinkedIn
            </a>
            <a
              href="mailto:jonathangrossman716@gmail.com"
              className="text-zinc-500 hover:text-white transition-colors text-sm"
            >
              Email
            </a>
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
