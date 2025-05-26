"use client"

import { motion, useMotionValue, useSpring } from "framer-motion"
import {
  ArrowRight,
  Zap,
  Code,
  Users,
  BookOpen,
  MessageSquare,
  Video,
  Award,
  Laptop,
  Lightbulb,
  Facebook,
  Instagram,
  DiscIcon as Discord,
  ChevronRight,
  Star,
  FileCode,
  Terminal,
  Database,
  Server,
  Globe,
} from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Footer } from "@/components/footer"
import { Preloader } from "@/components/preloader"
import { CustomCursor } from "@/components/custom-cursor"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useCountUp } from "@/hooks/useCountUp"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const blink = {
  "0%, 100%": { opacity: 1 },
  "50%": { opacity: 0 },
}

export default function Home() {
  const router = useRouter()
  const targetRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const [theme, setTheme] = useState<"light" | "dark">("dark")

  const gridX = useSpring(mouseX, {
    stiffness: 50,
    damping: 20,
    mass: 0.5,
  })
  const gridY = useSpring(mouseY, {
    stiffness: 50,
    damping: 20,
    mass: 0.5,
  })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      mouseX.set(((e.clientX - centerX) / centerX) * 20)
      mouseY.set(((e.clientY - centerY) / centerY) * 20)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  const membersCount = useCountUp(169000)
  const tutorialsCount = useCountUp(500)
  const activeMembers = useCountUp(10000)
  const monthlyEvents = useCountUp(50)
  const mentors = useCountUp(100)
  const weeklyDiscussions = useCountUp(5000)

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
    document.documentElement.classList.toggle("dark")
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  }

  return (
    <div
      ref={targetRef}
      className={cn(
        "min-h-screen bg-transparent text-white overflow-hidden select-none",
        theme === "light" && "text-black",
      )}
    >
      <CustomCursor />
      <Preloader />
      <motion.div className="fixed inset-0 z-0">
        <div className={cn("absolute inset-0", theme === "dark" ? "bg-black" : "bg-white")} />
        <motion.div
          className="absolute inset-0"
          style={{
            "@keyframes blink": blink,
            backgroundImage: `
              linear-gradient(to right, ${
                theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
              } 1px, transparent 1px),
              linear-gradient(to bottom, ${
                theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
              } 1px, transparent 1px)
            `,
            backgroundSize: "clamp(20px, 4vw, 40px) clamp(20px, 4vw, 40px)",
            x: gridX,
            y: gridY,
          }}
        />
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-t",
            theme === "dark"
              ? "from-black via-transparent to-transparent"
              : "from-white via-transparent to-transparent",
          )}
        />
      </motion.div>

      <div className="relative z-10">
        {/* Navbar */}
        <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-gray-800/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2"
                >
                  <span
                    className={cn(
                      "text-xl font-semibold flex items-center gap-1",
                      theme === "dark" ? "text-white" : "text-black",
                    )}
                  >
                    <span className={cn("px-2", theme === "dark" ? "bg-white text-black" : "bg-black text-white")}>
                      IMPHNEN
                    </span>
                  </span>
                </motion.div>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <a
                    href="#features"
                    className={cn(
                      "px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700/20",
                      theme === "dark" ? "text-white" : "text-black",
                    )}
                  >
                    <span className="flex items-center gap-1">
                      <Lightbulb className="w-4 h-4" />
                      Fitur
                    </span>
                  </a>
                  <a
                    href="#community"
                    className={cn(
                      "px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700/20",
                      theme === "dark" ? "text-white" : "text-black",
                    )}
                  >
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      Komunitas
                    </span>
                  </a>
                  <a
                    href="#resources"
                    className={cn(
                      "px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700/20",
                      theme === "dark" ? "text-white" : "text-black",
                    )}
                  >
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      Sumber Belajar
                    </span>
                  </a>
                  <a
                    href="#testimonials"
                    className={cn(
                      "px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700/20",
                      theme === "dark" ? "text-white" : "text-black",
                    )}
                  >
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-4 h-4" />
                      Testimoni
                    </span>
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    "hidden sm:flex items-center gap-1 border-2",
                    theme === "dark"
                      ? "border-white text-white hover:bg-white hover:text-black"
                      : "border-black text-black hover:bg-black hover:text-white",
                  )}
                >
                  <Discord className="w-4 h-4 mr-1" />
                  Gabung Discord
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <motion.section className="min-h-[100vh] flex flex-col items-center justify-center px-4 py-12 sm:py-16 lg:py-20 pt-24">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center max-w-[90%] sm:max-w-4xl mx-auto space-y-6 sm:space-y-8"
          >
            <motion.div variants={itemVariants} className="flex justify-center">
              <Badge
                variant="outline"
                className={cn(
                  "px-4 py-1 text-sm rounded-full mb-4 border-2 flex items-center gap-2",
                  theme === "dark" ? "border-white/30 text-white/80" : "border-black/30 text-black/80",
                )}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Komunitas Programmer Indonesia
              </Badge>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight"
            >
              <span className={cn("block", theme === "dark" ? "text-white" : "text-black")}>Ngoding Boleh,</span>
              <span
                className={cn(
                  "block mt-2 bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text",
                  theme === "dark" ? "via-white" : "via-black",
                )}
              >
                Stress Jangan.
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className={cn(
                "text-base sm:text-xl lg:text-2xl max-w-2xl mx-auto px-4 italic",
                theme === "dark" ? "text-gray-400" : "text-gray-600",
              )}
            >
              Di IMPHNEN, kamu gak perlu jadi jenius buat mulai belajar. Yang penting niat (dan koneksi internet).
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 mt-8">
              <div
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg",
                  theme === "dark" ? "bg-white/10" : "bg-black/10",
                )}
              >
                <Users className="w-5 h-5 text-blue-500" />
                <span className="font-bold">{membersCount.toLocaleString()}+</span>
                <span className={theme === "dark" ? "text-gray-300" : "text-gray-700"}>Member</span>
              </div>
              <div
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg",
                  theme === "dark" ? "bg-white/10" : "bg-black/10",
                )}
              >
                <Video className="w-5 h-5 text-red-500" />
                <span className="font-bold">{tutorialsCount.toLocaleString()}+</span>
                <span className={theme === "dark" ? "text-gray-300" : "text-gray-700"}>Tutorial</span>
              </div>
              <div
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg",
                  theme === "dark" ? "bg-white/10" : "bg-black/10",
                )}
              >
                <MessageSquare className="w-5 h-5 text-green-500" />
                <span className="font-bold">24/7</span>
                <span className={theme === "dark" ? "text-gray-300" : "text-gray-700"}>Yapping</span>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center px-4 mt-8">
              <Button
                size="lg"
                className={cn(
                  "w-full sm:w-auto mt-4 sm:mt-8 border-2 text-base px-6 py-6 h-auto group relative overflow-hidden",
                  theme === "dark"
                    ? "border-white text-white hover:bg-white hover:text-black bg-transparent"
                    : "border-black text-black hover:bg-black hover:text-white bg-transparent",
                )}
             onClick={() => window.open("https://www.facebook.com/groups/programmerhandal", "_blank")}

              >
                <span className="relative z-10 flex items-center">
                  Mulai Belajar Sekarang
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
                <span
                  className={cn(
                    "absolute inset-0 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300",
                    theme === "dark" ? "bg-white" : "bg-black",
                  )}
                />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className={cn(
                  "w-full sm:w-auto mt-4 sm:mt-8 border-2 text-base px-6 py-6 h-auto group relative overflow-hidden",
                  theme === "dark"
                    ? "border-white/80 text-white hover:text-black bg-transparent"
                    : "border-black/80 text-black hover:text-white bg-transparent",
                )}
                onClick={() => window.open("https://discord.gg/example", "_blank")}
              >
                <span className="relative z-10 flex items-center">
                  <Discord className="mr-2 h-5 w-5" />
                  Gabung Discord
                </span>
                <span
                  className={cn(
                    "absolute inset-0 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300",
                    theme === "dark" ? "bg-white" : "bg-black",
                  )}
                />
              </Button>
            </motion.div>
          </motion.div>

          {/* Floating elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div animate={floatingAnimation} className="absolute top-[20%] left-[10%]" style={{ zIndex: -1 }}>
              <Code className={cn("w-12 h-12 opacity-20", theme === "dark" ? "text-purple-500" : "text-purple-700")} />
            </motion.div>
            <motion.div
              animate={{
                ...floatingAnimation,
                transition: { ...floatingAnimation.transition, delay: 0.5 },
              }}
              className="absolute top-[30%] right-[15%]"
              style={{ zIndex: -1 }}
            >
              <Terminal className={cn("w-10 h-10 opacity-20", theme === "dark" ? "text-blue-500" : "text-blue-700")} />
            </motion.div>
            <motion.div
              animate={{
                ...floatingAnimation,
                transition: { ...floatingAnimation.transition, delay: 1 },
              }}
              className="absolute bottom-[25%] left-[20%]"
              style={{ zIndex: -1 }}
            >
              <Database className={cn("w-8 h-8 opacity-20", theme === "dark" ? "text-green-500" : "text-green-700")} />
            </motion.div>
            <motion.div
              animate={{
                ...floatingAnimation,
                transition: { ...floatingAnimation.transition, delay: 1.5 },
              }}
              className="absolute bottom-[15%] right-[10%]"
              style={{ zIndex: -1 }}
            >
              <Globe className={cn("w-14 h-14 opacity-20", theme === "dark" ? "text-pink-500" : "text-pink-700")} />
            </motion.div>
          </div>
        </motion.section>

        {/* Features Section */}
        <motion.section
          id="features"
          className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className={cn(
                  "inline-block px-4 py-1 rounded-full text-sm font-medium mb-4",
                  theme === "dark" ? "bg-white/10 text-white" : "bg-black/10 text-black",
                )}
              >
                ⚙️ Fitur Unggulan
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className={cn(
                  "text-3xl sm:text-4xl lg:text-5xl font-bold mb-4",
                  theme === "dark" ? "text-white" : "text-black",
                )}
              >
                Belajar Programming, Sekocak Ini Gak Pernah Ada!
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto my-6"
              ></motion.div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <Card
                    className={cn(
                      "h-full overflow-hidden group relative border-2",
                      theme === "dark"
                        ? "bg-black/50 backdrop-blur-xl border-gray-800 hover:border-white/50 text-white"
                        : "bg-white/50 backdrop-blur-xl border-gray-200 hover:border-black/50 text-black",
                    )}
                  >
                    <div
                      className={cn(
                        "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500",
                        theme === "dark" ? "from-purple-500 to-pink-500" : "from-purple-700 to-pink-700",
                      )}
                    ></div>
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className={cn("p-3 rounded-lg", theme === "dark" ? "bg-white/10" : "bg-black/10")}>
                          <feature.icon className={cn("w-6 h-6", theme === "dark" ? "text-white" : "text-black")} />
                        </div>
                        <CardTitle className="text-xl">{feature.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className={cn("text-base", theme === "dark" ? "text-gray-400" : "text-gray-600")}>
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Community Section */}
        <motion.section
          id="community"
          className="py-20 px-4 sm:px-6 lg:px-8 relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div
            className={cn(
              "absolute inset-0 opacity-30",
              theme === "dark"
                ? "bg-gradient-to-br from-purple-900/20 to-black"
                : "bg-gradient-to-br from-purple-100 to-white",
            )}
          ></div>
          <div className="max-w-7xl mx-auto relative">
            <div className="text-center mb-16">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className={cn(
                  "inline-block px-4 py-1 rounded-full text-sm font-medium mb-4",
                  theme === "dark" ? "bg-white/10 text-white" : "bg-black/10 text-black",
                )}
              >
                👨‍👩‍👧‍👦 Komunitas Kami
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className={cn(
                  "text-3xl sm:text-4xl lg:text-5xl font-bold mb-4",
                  theme === "dark" ? "text-white" : "text-black",
                )}
              >
                Tempat Para Programmer (dan Calon Programmer) Berlabuh
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto my-6"
              ></motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="space-y-6">
                  <div
                    className={cn(
                      "p-6 rounded-xl border-2",
                      theme === "dark"
                        ? "bg-black/50 backdrop-blur-xl border-gray-800 text-white"
                        : "bg-white/50 backdrop-blur-xl border-gray-200 text-black",
                    )}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className={cn("p-3 rounded-lg", theme === "dark" ? "bg-blue-500/20" : "bg-blue-500/10")}>
                        <Facebook className="w-6 h-6 text-blue-500" />
                      </div>
                      <h3 className="text-xl font-bold">Facebook Group</h3>
                    </div>
                    <p className={cn("text-base", theme === "dark" ? "text-gray-400" : "text-gray-600")}>
                      Diskusi chill, share meme, dan tempat nanya{" "}
                      <em>"Kenapa code aku error padahal udah aku doain?"</em>
                    </p>
                  </div>

                  <div
                    className={cn(
                      "p-6 rounded-xl border-2",
                      theme === "dark"
                        ? "bg-black/50 backdrop-blur-xl border-gray-800 text-white"
                        : "bg-white/50 backdrop-blur-xl border-gray-200 text-black",
                    )}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className={cn("p-3 rounded-lg", theme === "dark" ? "bg-pink-500/20" : "bg-pink-500/10")}>
                        <Instagram className="w-6 h-6 text-pink-500" />
                      </div>
                      <h3 className="text-xl font-bold">Instagram</h3>
                    </div>
                    <p className={cn("text-base", theme === "dark" ? "text-gray-400" : "text-gray-600")}>
                      Tips-tips coding yang bisa kamu repost biar keliatan produktif padahal scroll Reels.
                    </p>
                  </div>

                  <div
                    className={cn(
                      "p-6 rounded-xl border-2",
                      theme === "dark"
                        ? "bg-black/50 backdrop-blur-xl border-gray-800 text-white"
                        : "bg-white/50 backdrop-blur-xl border-gray-200 text-black",
                    )}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className={cn("p-3 rounded-lg", theme === "dark" ? "bg-indigo-500/20" : "bg-indigo-500/10")}>
                        <Discord className="w-6 h-6 text-indigo-500" />
                      </div>
                      <h3 className="text-xl font-bold">Discord Server</h3>
                    </div>
                    <p className={cn("text-base", theme === "dark" ? "text-gray-400" : "text-gray-600")}>
                      Ngoding sambil karaoke. Tanya error sambil main game. Diskusi serius tapi santai.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={cn(
                  "p-8 rounded-xl border-2",
                  theme === "dark"
                    ? "bg-black/50 backdrop-blur-xl border-gray-800 text-white"
                    : "bg-white/50 backdrop-blur-xl border-gray-200 text-black",
                )}
              >
                <h3 className="text-2xl font-bold mb-6">Statistik Random Tapi Nyata:</h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-blue-500" />
                        Member Aktif
                      </span>
                      <span className="font-bold">{activeMembers.toLocaleString()}+</span>
                    </div>
                    <div className="w-full bg-gray-700/20 rounded-full h-2.5">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "85%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="bg-blue-500 h-2.5 rounded-full"
                      ></motion.div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-green-500" />
                        Event Bulanan
                      </span>
                      <span className="font-bold">{monthlyEvents}+</span>
                    </div>
                    <div className="w-full bg-gray-700/20 rounded-full h-2.5">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "70%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="bg-green-500 h-2.5 rounded-full"
                      ></motion.div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-yellow-500" />
                        Mentor
                      </span>
                      <span className="font-bold">{mentors}+</span>
                    </div>
                    <div className="w-full bg-gray-700/20 rounded-full h-2.5">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "60%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.6 }}
                        className="bg-yellow-500 h-2.5 rounded-full"
                      ></motion.div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 text-pink-500" />
                        Diskusi Mingguan
                      </span>
                      <span className="font-bold">{weeklyDiscussions.toLocaleString()}+</span>
                    </div>
                    <div className="w-full bg-gray-700/20 rounded-full h-2.5">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "95%" }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="bg-pink-500 h-2.5 rounded-full"
                      ></motion.div>
                    </div>
                  </div>

                  <div className="pt-4 text-sm italic text-center">
                    <span className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
                      (mayoritas diawali dengan "help kak 😭")
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Learning Resources Section */}
        <motion.section
          id="resources"
          className="py-20 px-4 sm:px-6 lg:px-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className={cn(
                  "inline-block px-4 py-1 rounded-full text-sm font-medium mb-4",
                  theme === "dark" ? "bg-white/10 text-white" : "bg-black/10 text-black",
                )}
              >
                🎓 Sumber Belajar
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className={cn(
                  "text-3xl sm:text-4xl lg:text-5xl font-bold mb-4",
                  theme === "dark" ? "text-white" : "text-black",
                )}
              >
                Belajar Programming Seru Kayak Scroll Meme Jam 3 Pagi
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto my-6"
              ></motion.div>
            </div>

            <Tabs defaultValue="videos" className="w-full">
              <TabsList
                className={cn("grid w-full grid-cols-4 mb-12", theme === "dark" ? "bg-black/50" : "bg-white/50")}
              >
                <TabsTrigger
                  value="videos"
                  className={cn(
                    theme === "dark" ? "data-[state=active]:bg-white/10" : "data-[state=active]:bg-black/10",
                  )}
                >
                  <Video className="w-4 h-4 mr-2" />
                  Video
                </TabsTrigger>
                <TabsTrigger
                  value="articles"
                  className={cn(
                    theme === "dark" ? "data-[state=active]:bg-white/10" : "data-[state=active]:bg-black/10",
                  )}
                >
                  <FileCode className="w-4 h-4 mr-2" />
                  Artikel
                </TabsTrigger>
                <TabsTrigger
                  value="challenges"
                  className={cn(
                    theme === "dark" ? "data-[state=active]:bg-white/10" : "data-[state=active]:bg-black/10",
                  )}
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Tantangan
                </TabsTrigger>
                <TabsTrigger
                  value="sessions"
                  className={cn(
                    theme === "dark" ? "data-[state=active]:bg-white/10" : "data-[state=active]:bg-black/10",
                  )}
                >
                  <Users className="w-4 h-4 mr-2" />
                  Sharing
                </TabsTrigger>
              </TabsList>
              <TabsContent value="videos" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {videoResources.map((resource, index) => (
                    <motion.div
                      key={resource.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                    >
                      <Card
                        className={cn(
                          "h-full overflow-hidden group",
                          theme === "dark"
                            ? "bg-black/50 backdrop-blur-xl border-gray-800 hover:border-white/50 text-white"
                            : "bg-white/50 backdrop-blur-xl border-gray-200 hover:border-black/50 text-black",
                        )}
                      >
                        <div className="relative aspect-video overflow-hidden">
                          <img
                            src={resource.thumbnail || "/placeholder.svg"}
                            alt={resource.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Play className="w-12 h-12 text-white" />
                          </div>
                          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                            {resource.duration}
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-bold text-lg mb-2">{resource.title}</h3>
                          <p className={cn("text-sm", theme === "dark" ? "text-gray-400" : "text-gray-600")}>
                            {resource.description}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="articles" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {articleResources.map((resource, index) => (
                    <motion.div
                      key={resource.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                    >
                      <Card
                        className={cn(
                          "h-full overflow-hidden group",
                          theme === "dark"
                            ? "bg-black/50 backdrop-blur-xl border-gray-800 hover:border-white/50 text-white"
                            : "bg-white/50 backdrop-blur-xl border-gray-200 hover:border-black/50 text-black",
                        )}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-center gap-4 mb-4">
                            <div className={cn("p-3 rounded-lg", theme === "dark" ? "bg-white/10" : "bg-black/10")}>
                              <resource.icon
                                className={cn("w-6 h-6", theme === "dark" ? "text-white" : "text-black")}
                              />
                            </div>
                            <div>
                              <h3 className="font-bold text-lg">{resource.title}</h3>
                              <p className={cn("text-xs", theme === "dark" ? "text-gray-400" : "text-gray-600")}>
                                {resource.author} • {resource.date}
                              </p>
                            </div>
                          </div>
                          <p className={cn("text-sm mb-4", theme === "dark" ? "text-gray-400" : "text-gray-600")}>
                            {resource.description}
                          </p>
                          <div className="flex gap-2">
                            {resource.tags.map((tag) => (
                              <Badge
                                key={tag}
                                variant="outline"
                                className={cn("text-xs", theme === "dark" ? "border-gray-700" : "border-gray-300")}
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="challenges" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {challengeResources.map((resource, index) => (
                    <motion.div
                      key={resource.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                    >
                      <Card
                        className={cn(
                          "h-full overflow-hidden group",
                          theme === "dark"
                            ? "bg-black/50 backdrop-blur-xl border-gray-800 hover:border-white/50 text-white"
                            : "bg-white/50 backdrop-blur-xl border-gray-200 hover:border-black/50 text-black",
                        )}
                      >
                        <CardContent className="p-6">
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-lg">{resource.title}</h3>
                            <Badge
                              className={cn(
                                resource.level === "Pemula"
                                  ? "bg-green-500"
                                  : resource.level === "Menengah"
                                    ? "bg-yellow-500"
                                    : "bg-red-500",
                                "text-white",
                              )}
                            >
                              {resource.level}
                            </Badge>
                          </div>
                          <p className={cn("text-sm mb-4", theme === "dark" ? "text-gray-400" : "text-gray-600")}>
                            {resource.description}
                          </p>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              <span className="text-xs">{resource.timeEstimate}</span>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className={cn(
                                "text-xs",
                                theme === "dark"
                                  ? "border-white/50 hover:bg-white hover:text-black"
                                  : "border-black/50 hover:bg-black hover:text-white",
                              )}
                            >
                              Mulai Tantangan
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="sessions" className="space-y-4">
                <div className="grid grid-cols-1 gap-6">
                  {sessionResources.map((resource, index) => (
                    <motion.div
                      key={resource.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                    >
                      <Card
                        className={cn(
                          "overflow-hidden group",
                          theme === "dark"
                            ? "bg-black/50 backdrop-blur-xl border-gray-800 hover:border-white/50 text-white"
                            : "bg-white/50 backdrop-blur-xl border-gray-200 hover:border-black/50 text-black",
                        )}
                      >
                        <CardContent className="p-6">
                          <div className="flex flex-col md:flex-row gap-6">
                            <div className="md:w-1/4">
                              <div className="aspect-square rounded-lg overflow-hidden">
                                <img
                                  src={resource.speakerImage || "/placeholder.svg"}
                                  alt={resource.speaker}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            </div>
                            <div className="md:w-3/4">
                              <h3 className="font-bold text-xl mb-2">{resource.title}</h3>
                              <div className="flex items-center gap-2 mb-4">
                                <Badge
                                  variant="outline"
                                  className={cn("text-xs", theme === "dark" ? "border-gray-700" : "border-gray-300")}
                                >
                                  {resource.date}
                                </Badge>
                                <Badge
                                  variant="outline"
                                  className={cn("text-xs", theme === "dark" ? "border-gray-700" : "border-gray-300")}
                                >
                                  {resource.time}
                                </Badge>
                              </div>
                              <p className={cn("text-sm mb-4", theme === "dark" ? "text-gray-400" : "text-gray-600")}>
                                {resource.description}
                              </p>
                              <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                  <Avatar className="w-6 h-6">
                                    <AvatarImage src={resource.speakerImage} alt={resource.speaker} />
                                    <AvatarFallback>{resource.speaker.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <span className="text-sm font-medium">{resource.speaker}</span>
                                </div>
                                <span className={cn("text-xs", theme === "dark" ? "text-gray-400" : "text-gray-600")}>
                                  {resource.role}
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </motion.section>

        {/* Web Dev Course Section */}
        <motion.section
          className="py-20 px-4 sm:px-6 lg:px-8 relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div
            className={cn(
              "absolute inset-0 opacity-30",
              theme === "dark"
                ? "bg-gradient-to-br from-blue-900/20 to-black"
                : "bg-gradient-to-br from-blue-100 to-white",
            )}
          ></div>
          <div className="max-w-7xl mx-auto relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className={cn(
                    "inline-block px-4 py-1 rounded-full text-sm font-medium",
                    theme === "dark" ? "bg-white/10 text-white" : "bg-black/10 text-black",
                  )}
                >
                  🚀 Kursus Web Dev Lengkap
                </motion.span>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className={cn(
                    "text-3xl sm:text-4xl lg:text-5xl font-bold",
                    theme === "dark" ? "text-white" : "text-black",
                  )}
                >
                  Bikin Web Sendiri, Gak Harus Tunggu Kuliah Selesai
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className={cn("text-lg", theme === "dark" ? "text-gray-400" : "text-gray-600")}
                >
                  Cocok buat yang baru mulai, atau yang udah mulai tapi belum jadi-jadi.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex flex-wrap gap-3"
                >
                  {["HTML", "CSS", "JavaScript", "React", "Node.js"].map((tech) => (
                    <Badge
                      key={tech}
                      className={cn(
                        "px-3 py-1 text-sm",
                        theme === "dark" ? "bg-white/10 hover:bg-white/20" : "bg-black/10 hover:bg-black/20",
                      )}
                    >
                      {tech}
                    </Badge>
                  ))}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="flex flex-col sm:flex-row gap-4 pt-4"
                >
                  <Button
                    className={cn(
                      "group relative overflow-hidden",
                      theme === "dark"
                        ? "bg-white text-black hover:text-white"
                        : "bg-black text-white hover:text-black",
                    )}
                  >
                    <span className="relative z-10 flex items-center">
                      Mulai Kursus Sekarang
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                    <span
                      className={cn(
                        "absolute inset-0 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300",
                        theme === "dark" ? "bg-black" : "bg-white",
                      )}
                    />
                  </Button>
                  <Button
                    variant="outline"
                    className={cn(
                      "group relative overflow-hidden",
                      theme === "dark"
                        ? "border-white text-white hover:text-black"
                        : "border-black text-black hover:text-white",
                    )}
                  >
                    <span className="relative z-10 flex items-center">
                      Lihat Silabus
                      <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                    <span
                      className={cn(
                        "absolute inset-0 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300",
                        theme === "dark" ? "bg-white" : "bg-black",
                      )}
                    />
                  </Button>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={cn(
                  "p-1 rounded-xl border-2",
                  theme === "dark"
                    ? "bg-black/50 backdrop-blur-xl border-gray-800"
                    : "bg-white/50 backdrop-blur-xl border-gray-200",
                )}
              >
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="Web Development Course"
                  className="w-full h-auto rounded-lg"
                />
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Testimonials Section */}
        <motion.section
          id="testimonials"
          className="py-20 px-4 sm:px-6 lg:px-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className={cn(
                  "inline-block px-4 py-1 rounded-full text-sm font-medium mb-4",
                  theme === "dark" ? "bg-white/10 text-white" : "bg-black/10 text-black",
                )}
              >
                😍 Testimoni Member
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className={cn(
                  "text-3xl sm:text-4xl lg:text-5xl font-bold mb-4",
                  theme === "dark" ? "text-white" : "text-black",
                )}
              >
                Apa Kata Mereka?
              </motion.h2>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto my-6"
              ></motion.div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className={cn("text-lg italic max-w-2xl mx-auto", theme === "dark" ? "text-gray-400" : "text-gray-600")}
              >
                "Gak nyangka bisa paham coding tanpa nyari cheat sheet tiap 5 menit."
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <Card
                    className={cn(
                      "h-full",
                      theme === "dark"
                        ? "bg-black/50 backdrop-blur-xl border-gray-800 text-white"
                        : "bg-white/50 backdrop-blur-xl border-gray-200 text-black",
                    )}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                          <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-bold">{testimonial.name}</h3>
                          <p className={cn("text-sm", theme === "dark" ? "text-gray-400" : "text-gray-600")}>
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                      <div className="flex mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "w-4 h-4",
                              i < testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-400",
                            )}
                          />
                        ))}
                      </div>
                      <p className={cn("text-sm italic", theme === "dark" ? "text-gray-300" : "text-gray-700")}>
                        {testimonial.text}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Call to Action Section */}
        <motion.section
          className="py-20 px-4 sm:px-6 lg:px-8 relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div
            className={cn(
              "absolute inset-0",
              theme === "dark"
                ? "bg-gradient-to-r from-purple-900/30 to-pink-900/30"
                : "bg-gradient-to-r from-purple-100 to-pink-100",
            )}
          ></div>
          <div className="max-w-7xl mx-auto relative">
            <div
              className={cn(
                "p-8 sm:p-12 rounded-2xl border-2 text-center",
                theme === "dark"
                  ? "bg-black/50 backdrop-blur-xl border-gray-800 text-white"
                  : "bg-white/50 backdrop-blur-xl border-gray-200 text-black",
              )}
            >
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-3xl sm:text-4xl font-bold mb-4"
              >
                Ayo Gabung Sebelum Jadi Satu-Satunya Orang yang Belum Tau Apa Itu Git
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-6 my-10"
              >
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">98%</div>
                  <p className={cn("text-sm", theme === "dark" ? "text-gray-400" : "text-gray-600")}>
                    Tingkat Kemalasan
                  </p>
                  <p className="text-xs italic">(ngoding sambil skroll fesnuk)</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">4.9/5</div>
                  <p className={cn("text-sm", theme === "dark" ? "text-gray-400" : "text-gray-600")}>Rating Drama</p>
                  <p className="text-xs italic">(gorengannya anget-anget sef)</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">85%</div>
                  <p className={cn("text-sm", theme === "dark" ? "text-gray-400" : "text-gray-600")}>Bug Berkurang</p>
                  <p className="text-xs italic">(atau malah tambah banyak)</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">24/7</div>
                  <p className={cn("text-sm", theme === "dark" ? "text-gray-400" : "text-gray-600")}>Yapping</p>
                  <p className="text-xs italic">(obrolan gak pernah mati)</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button
                  size="lg"
                  className={cn(
                    "group relative overflow-hidden",
                    theme === "dark" ? "bg-white text-black hover:text-white" : "bg-black text-white hover:text-black",
                  )}
                  onClick={() => window.open("https://discord.gg/example", "_blank")}
                >
                  <span className="relative z-10 flex items-center">
                    <Discord className="mr-2 h-5 w-5" />
                    Gabung Discord Sekarang
                  </span>
                  <span
                    className={cn(
                      "absolute inset-0 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300",
                      theme === "dark" ? "bg-black" : "bg-white",
                    )}
                  />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className={cn(
                    "group relative overflow-hidden",
                    theme === "dark"
                      ? "border-white text-white hover:text-black"
                      : "border-black text-black hover:text-white",
                  )}
                  onClick={() => window.open("https://www.facebook.com/groups/programmerhandal", "_blank")}
                >
                  <span className="relative z-10 flex items-center">
                    <Facebook className="mr-2 h-5 w-5" />
                    Join Facebook Group
                  </span>
                  <span
                    className={cn(
                      "absolute inset-0 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300",
                      theme === "dark" ? "bg-white" : "bg-black",
                    )}
                  />
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.section>

        <Footer theme={theme} />
      </div>
    </div>
  )
}

const features = [
  {
    title: "Belajar Tanpa Koding",
    description: "Masih takut buka VS Code? Tenang, kita mulai dari skrol fesnuk. Baru nanti ngetik pelan-pelan 😌",
    icon: Code,
  },
  {
    title: "Komunitas Supportif",
    description: 'Tanya "apa itu API?" gak akan diketawain. Justru ditambahin meme biar makin paham.',
    icon: Users,
  },
  {
    title: "Tutorial Interaktif",
    description: 'Interaktif banget sampai kamu bakal ngomong sendiri, "Loh, kok aku ngerti ya?"',
    icon: BookOpen,
  },
  {
    title: "Proyek Praktis",
    description: 'Kamu bakal bikin project beneran. Gak cuma "hello world" doang, bro.',
    icon: Laptop,
  },
  {
    title: "Webinar Mingguan",
    description: "Ikuti sesi live dengan para profesional industri yang berbagi tips dan trik terbaru.",
    icon: Video,
  },
  {
    title: "Solusi No-Code",
    description: "Pelajari cara membuat aplikasi kompleks menggunakan platform no-code dan low-code terbaik.",
    icon: Lightbulb,
  },
]

const videoResources = [
  {
    title: "Belajar HTML & CSS dari Nol",
    description: "Panduan lengkap untuk pemula yang ingin memulai perjalanan web development.",
    thumbnail: "/placeholder.svg?height=200&width=350",
    duration: "45:12",
  },
  {
    title: "JavaScript Dasar untuk Pemula",
    description: "Pelajari konsep dasar JavaScript dengan cara yang menyenangkan dan mudah dipahami.",
    thumbnail: "/placeholder.svg?height=200&width=350",
    duration: "1:12:34",
  },
  {
    title: "Membuat Website Pertamamu",
    description: "Tutorial step-by-step membuat website portfolio sederhana dengan HTML, CSS, dan JavaScript.",
    thumbnail: "/placeholder.svg?height=200&width=350",
    duration: "32:45",
  },
]

const articleResources = [
  {
    title: "Cara Belajar Programming Tanpa Stress",
    description: "Panduan lengkap untuk memulai perjalanan programming dengan mindset yang benar.",
    author: "Budi Santoso",
    date: "2 hari yang lalu",
    tags: ["Pemula", "Tips", "Mindset"],
    icon: Lightbulb,
  },
  {
    title: "5 Alasan Kenapa Kamu Harus Belajar React",
    description:
      "Mengapa React menjadi salah satu framework JavaScript paling populer dan kenapa kamu harus mempelajarinya.",
    author: "Anita Ratna",
    date: "1 minggu yang lalu",
    tags: ["React", "JavaScript", "Frontend"],
    icon: Code,
  },
  {
    title: "Debugging 101: Cara Menemukan dan Memperbaiki Error",
    description: "Panduan praktis untuk menemukan dan memperbaiki error dalam kode kamu.",
    author: "Dedi Permana",
    date: "2 minggu yang lalu",
    tags: ["Debugging", "Tips", "Produktivitas"],
    icon: Terminal,
  },
  {
    title: "Mengenal API untuk Pemula",
    description: "Penjelasan sederhana tentang apa itu API dan bagaimana cara menggunakannya dalam project kamu.",
    author: "Siti Nurhaliza",
    date: "3 minggu yang lalu",
    tags: ["API", "Backend", "Pemula"],
    icon: Server,
  },
]

const challengeResources = [
  {
    title: "Membuat Landing Page Sederhana",
    description: "Tantangan untuk membuat landing page sederhana dengan HTML dan CSS.",
    level: "Pemula",
    timeEstimate: "2-3 jam",
  },
  {
    title: "Todo List App dengan JavaScript",
    description: "Buat aplikasi todo list sederhana dengan JavaScript murni.",
    level: "Menengah",
    timeEstimate: "4-6 jam",
  },
  {
    title: "Weather App dengan API",
    description: "Buat aplikasi cuaca yang mengambil data dari API publik.",
    level: "Menengah",
    timeEstimate: "5-8 jam",
  },
  {
    title: "E-commerce Sederhana dengan React",
    description: "Buat toko online sederhana dengan React dan fake API.",
    level: "Lanjutan",
    timeEstimate: "10-15 jam",
  },
]

const sessionResources = [
  {
    title: "Dari Pemula Jadi Full-Stack Developer dalam 6 Bulan",
    description:
      "Sharing session dari seorang self-taught developer yang berhasil mendapatkan pekerjaan sebagai full-stack developer hanya dalam 6 bulan belajar.",
    speaker: "Budi Santoso",
    role: "Full-Stack Developer di Tokopedia",
    date: "Sabtu, 15 Juni 2025",
    time: "19:00 - 21:00 WIB",
    speakerImage: "/placeholder.svg?height=100&width=100",
  },
  {
    title: "Tips Lolos Technical Interview di Perusahaan Teknologi",
    description: "Berbagi pengalaman dan tips untuk menghadapi technical interview di perusahaan teknologi ternama.",
    speaker: "Anita Ratna",
    role: "Senior Frontend Developer di Gojek",
    date: "Minggu, 23 Juni 2025",
    time: "15:00 - 17:00 WIB",
    speakerImage: "/placeholder.svg?height=100&width=100",
  },
]

const testimonials = [
  {
    name: "Udin Petir",
    role: "Frontend Dev",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 5,
    text: "Dulu kerjaanku cuma buka fesnuk. Sekarang... ya, skroll fesnuk sambil bikin web.",
  },
  {
    name: "Samsul Ngoding",
    role: "Web Developer",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 5,
    text: "Pertama kali ngerti cara kerja API tuh rasanya kayak ngerti gebetan—susah tapi worth it.",
  },
  {
    name: "Jono Jontor",
    role: "AI Engineer",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 4,
    text: "Server Discord IMPHNEN vibes-nya kayak tongkrongan anak IT—tapi yang lucu-lucu",
  },
]

function Calendar(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  )
}

function Clock(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

function Play(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  )
}
