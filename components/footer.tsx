import Link from "next/link"
import { Facebook, Instagram, Twitter, Github, Send } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface FooterProps {
  theme: "light" | "dark"
}

export function Footer({ theme }: FooterProps) {
  return (
    <footer
      className={cn(
        "py-12 px-4 sm:px-6 lg:px-8 border-t",
        theme === "dark" ? "border-gray-800 text-white" : "border-gray-200 text-black",
      )}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-1">
              <span className={cn("text-xl font-semibold", theme === "dark" ? "text-white" : "text-black")}>
                <span className={cn("px-2", theme === "dark" ? "bg-white text-black" : "bg-black text-white")}>
                  IMPHNEN
                </span>
              </span>
            </div>
            <p className={cn("text-sm", theme === "dark" ? "text-gray-400" : "text-gray-600")}>
              Karena Jadi Programmer Gak Harus Serius Melulu
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className={cn(
                  "hover:text-purple-500 transition-colors",
                  theme === "dark" ? "text-gray-400" : "text-gray-600",
                )}
              >
                <Facebook className="w-5 h-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className={cn(
                  "hover:text-purple-500 transition-colors",
                  theme === "dark" ? "text-gray-400" : "text-gray-600",
                )}
              >
                <Instagram className="w-5 h-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="#"
                className={cn(
                  "hover:text-purple-500 transition-colors",
                  theme === "dark" ? "text-gray-400" : "text-gray-600",
                )}
              >
                <Twitter className="w-5 h-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="#"
                className={cn(
                  "hover:text-purple-500 transition-colors",
                  theme === "dark" ? "text-gray-400" : "text-gray-600",
                )}
              >
                <Github className="w-5 h-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Navigasi Cepat</h3>
            <ul className={cn("space-y-2 text-sm", theme === "dark" ? "text-gray-400" : "text-gray-600")}>
              <li>
                <Link href="#features" className="hover:text-purple-500 transition-colors">
                  Fitur
                </Link>
              </li>
              <li>
                <Link href="#community" className="hover:text-purple-500 transition-colors">
                  Komunitas
                </Link>
              </li>
              <li>
                <Link href="#resources" className="hover:text-purple-500 transition-colors">
                  Belajar
                </Link>
              </li>
              <li>
                <Link href="#testimonials" className="hover:text-purple-500 transition-colors">
                  Testimoni
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Bahasa yang Bisa Kamu Kuasai</h3>
            <ul className={cn("space-y-2 text-sm", theme === "dark" ? "text-gray-400" : "text-gray-600")}>
              <li>HTML, JavaScript, PHP</li>
              <li>Python, Java, C#</li>
              <li>Go, Rust</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Newsletter</h3>
            <p className={cn("text-sm mb-4", theme === "dark" ? "text-gray-400" : "text-gray-600")}>
              Masukkan email kamu buat update dan konten kocak setiap minggu. Janji gak cuma kirim spam template "Hi
              kak, kami dari..."
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Email kamu"
                className={cn(
                  "bg-transparent",
                  theme === "dark" ? "border-gray-700 text-white" : "border-gray-300 text-black",
                )}
              />
              <Button
                size="sm"
                className={cn(
                  theme === "dark" ? "bg-white text-black hover:bg-white/90" : "bg-black text-white hover:bg-black/90",
                )}
              >
                <Send className="w-4 h-4" />
                <span className="sr-only">Daftar</span>
              </Button>
            </div>
          </div>
        </div>

        <div
          className={cn(
            "mt-10 pt-6 border-t text-center text-sm",
            theme === "dark" ? "border-gray-800 text-gray-400" : "border-gray-200 text-gray-600",
          )}
        >
          <p>
            © 2025 IMPHNEN – Ingin Menjadi Programmer Handal Namun Enggan Ngoding. All Rights Reserved, kecuali meme—itu
            buat dibagikan ke teman.
          </p>
        </div>
      </div>
    </footer>
  )
}
