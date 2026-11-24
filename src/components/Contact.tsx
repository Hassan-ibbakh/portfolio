// src/components/Contact.tsx
import { useState } from "react";
import { CalendarDays, Check, Copy, Github, Linkedin, Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { user } from "@/data/user";
import CalendlyWidget from "./CalendlyWidget";
import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";

const emptyForm = { name: "", email: "", subject: "", message: "" };

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState(emptyForm);
  const [honeypot, setHoneypot] = useState(""); // hidden field: bots fill it, humans don't
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const mailtoHref = (subject = "", body = "") =>
    `mailto:${user.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return;

    // Contact form not configured: open the visitor's mail app with the message pre-filled
    if (!supabase) {
      window.location.href = mailtoHref(
        formData.subject,
        `${formData.message}\n\n— ${formData.name} (${formData.email})`
      );
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("messages").insert([formData]);
      if (error) throw error;

      toast({
        title: "Message sent",
        description: "Thank you for reaching out — I'll get back to you soon.",
      });
      setFormData(emptyForm);
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Message not sent",
        description: `Something went wrong. You can email me directly at ${user.email}.`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(user.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = mailtoHref();
    }
  };

  const linkedinHandle = user.social.linkedin.replace(/\/$/, "").split("/").pop();
  const githubHandle = user.social.github.replace(/\/$/, "").split("/").pop();

  const socialLinks = [
    { icon: Linkedin, title: "LinkedIn", link: user.social.linkedin, handle: linkedinHandle },
    { icon: Github, title: "GitHub", link: user.social.github, handle: `@${githubHandle}` },
  ];

  const labelClass = "block text-sm font-medium text-secondary-custom mb-2";
  const fieldClass = "bg-background border-border focus-visible:ring-primary";

  return (
    <section id="contact" className="py-20 md:py-28 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            eyebrow="Contact"
            title={<>Let's <span className="text-gradient">work together</span></>}
            subtitle="Have an opportunity, a project or a question? Send me a message or book a call."
          />

          <div className="grid lg:grid-cols-[1.3fr_1fr] gap-8">
            {/* Contact form */}
            <Reveal>
              <div className="service-card rounded-xl p-6 md:p-8 h-full">
                <h3 className="text-xl font-semibold mb-6 text-foreground">Send me a message</h3>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className={labelClass}>Name</label>
                      <Input id="name" name="name" type="text" autoComplete="name" placeholder="Your name"
                        value={formData.name} onChange={handleInputChange} required
                        className={fieldClass} disabled={isSubmitting} />
                    </div>
                    <div>
                      <label htmlFor="email" className={labelClass}>Email</label>
                      <Input id="email" name="email" type="email" autoComplete="email" placeholder="you@company.com"
                        value={formData.email} onChange={handleInputChange} required
                        className={fieldClass} disabled={isSubmitting} />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className={labelClass}>Subject</label>
                    <Input id="subject" name="subject" type="text" placeholder="Internship opportunity, project…"
                      value={formData.subject} onChange={handleInputChange} required
                      className={fieldClass} disabled={isSubmitting} />
                  </div>

                  <div>
                    <label htmlFor="message" className={labelClass}>Message</label>
                    <Textarea id="message" name="message" rows={9} placeholder="Tell me a bit about it…"
                      value={formData.message} onChange={handleInputChange} required
                      className={`${fieldClass} resize-none`} disabled={isSubmitting} />
                  </div>

                  {/* Honeypot (hidden from people and screen readers) */}
                  <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true"
                    value={honeypot} onChange={(e) => setHoneypot(e.target.value)}
                    className="absolute left-[-9999px] w-px h-px opacity-0" />

                  <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isSubmitting}>
                    <Send />
                    {isSubmitting ? "Sending…" : "Send message"}
                  </Button>
                </form>
              </div>
            </Reveal>

            {/* Direct contact */}
            <Reveal delay={0.1} className="flex flex-col gap-6">
              <div className="service-card rounded-xl p-6 md:p-8">
                <h3 className="text-xl font-semibold mb-2 text-foreground">Prefer email?</h3>
                <p className="text-sm text-muted-custom mb-4">Write to me directly:</p>
                <div className="flex items-center gap-2 rounded-lg border border-border bg-background p-2 pl-3">
                  <Mail className="w-4 h-4 text-primary shrink-0" />
                  <a href={mailtoHref()} className="flex-1 min-w-0 truncate text-sm font-medium text-foreground hover:text-primary transition-smooth">
                    {user.email}
                  </a>
                  <Button type="button" variant="ghost" size="icon" onClick={copyEmail}
                    aria-label={copied ? "Email copied" : "Copy email address"} className="h-8 w-8 shrink-0">
                    {copied ? <Check className="text-github-success" /> : <Copy />}
                  </Button>
                </div>
                <span className="sr-only" aria-live="polite">{copied ? "Email copied to clipboard" : ""}</span>
              </div>

              <Dialog>
                <div className="service-card rounded-xl p-6 md:p-8">
                  <h3 className="text-xl font-semibold mb-2 text-foreground">Book a call</h3>
                  <p className="text-sm text-muted-custom mb-5">
                    Pick a 30-minute slot that suits you to talk about an opportunity or a project.
                  </p>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">
                      <CalendarDays />
                      Schedule a call
                    </Button>
                  </DialogTrigger>
                </div>
                <DialogContent className="h-[90vh] w-[95vw] max-w-4xl p-0 overflow-hidden">
                  <DialogTitle className="sr-only">Schedule a call with {user.name}</DialogTitle>
                  <DialogDescription className="sr-only">Calendly booking calendar</DialogDescription>
                  <CalendlyWidget />
                </DialogContent>
              </Dialog>

              <div className="service-card rounded-xl p-6 md:p-8">
                <h3 className="text-xl font-semibold mb-4 text-foreground">Find me online</h3>
                <div className="space-y-3">
                  {socialLinks.map((social) => {
                    const IconComponent = social.icon;
                    return (
                      <a key={social.title} href={social.link} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-4 p-3 rounded-lg border border-border transition-smooth hover:border-primary/60 hover:bg-primary/5">
                        <IconComponent className="w-5 h-5 text-primary" />
                        <div className="min-w-0">
                          <p className="font-medium text-foreground text-sm">{social.title}</p>
                          <p className="text-xs text-muted-custom truncate">{social.handle}</p>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
