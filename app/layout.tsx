import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://autorepairdirectories.com"),
  title: {
    default: "AutoRepairDirectories.com | Auto Repair Directory",
    template: "%s | AutoRepairDirectories.com",
  },
  description:
    "AutoRepairDirectories.com is a professional, easy-to-use Auto Repair directory helping drivers find local auto repair shops and services across the United States and Canada.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "AutoRepairDirectories.com | Auto Repair Directory",
    description:
      "Trusted resource to explore and compare auto repair shops and services across North America.",
    url: "/",
    siteName: "AutoRepairDirectories.com",
    type: "website",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "AutoRepairDirectories.com logo preview",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8586688641645596" crossOrigin="anonymous"></script>
        {/* Google tag (gtag.js) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-SKPCRMR8W9"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-SKPCRMR8W9');
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex min-h-screen flex-col bg-background text-foreground">
          <header className="w-full border-b-[3px] border-gold bg-cyan-700 text-white">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
              <div className="flex items-center gap-6">
                <Link
                  href="/"
                  className="text-[11px] font-bold tracking-[0.28em] sm:text-xs text-white hover:text-gold-soft transition-colors"
                  aria-label="AutoRepairDirectories.com – go to homepage"
                >
                  AutoRepairDirectories.com
                </Link>
                <nav className="flex items-center gap-4" aria-label="Main navigation">
                  <Link
                    href="/"
                    className="text-xs font-medium text-white/90 hover:text-gold-soft transition-colors"
                  >
                    USA
                  </Link>
                  <Link
                    href="/canada"
                    className="text-xs font-medium text-white/90 hover:text-gold-soft transition-colors"
                  >
                    Canada
                  </Link>
                  <Link
                    href="/contact"
                    className="text-xs font-medium text-white/90 hover:text-gold-soft transition-colors"
                  >
                    Contact
                  </Link>
                  <Link
                    href="/blog"
                    className="text-xs font-medium text-white/90 hover:text-gold-soft transition-colors"
                  >
                    Blog
                  </Link>
                  <Link
                    href="/advertise"
                    className="inline-flex items-center rounded-full bg-teal px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-teal-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    Advertise
                  </Link>
                </nav>
              </div>
              <p className="ml-4 hidden max-w-xs text-right text-xs text-gold-soft sm:block">
                Trusted Auto Repair directory for drivers.
              </p>
            </div>
          </header>

          <main className="flex-1">{children}</main>


          <footer className="w-full border-t border-navy/10 bg-background">
            <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 text-xs text-foreground/80 sm:px-6 lg:px-8">
              <p>
                © {new Date().getFullYear()} AutoRepairDirectories.com. For
                informational purposes only – always verify licensing,
                certifications, and safety requirements with your local authority.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/about" className="hover:text-gold">
                  About this directory
                </Link>
                <Link href="/contact" className="hover:text-gold">
                  Contact
                </Link>
                <Link href="/directory" className="hover:text-gold">
                  Full Directory
                </Link>
                <Link href="/privacy" className="hover:text-gold">
                  Privacy &amp; terms
                </Link>
                <Link href="/advertise" className="hover:text-gold">
                  Advertise
                </Link>
                <Link href="/advertise" className="hover:text-gold">
                  For auto repair shops
                </Link>
                <Link href="/advertise" className="hover:text-gold">
                  Featured Listing
                </Link>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
