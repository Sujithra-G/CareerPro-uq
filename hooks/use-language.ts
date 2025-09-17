"use client"

import { useState, useEffect } from "react"
import { type Language, getCurrentLanguage, getTranslation } from "@/lib/language"

export function useLanguage() {
  const [language, setLanguage] = useState<Language>("english")

  useEffect(() => {
    // Set initial language from localStorage
    setLanguage(getCurrentLanguage())

    // Listen for language changes
    const handleLanguageChange = (event: CustomEvent) => {
      setLanguage(event.detail as Language)
    }

    window.addEventListener("languageChange", handleLanguageChange as EventListener)

    return () => {
      window.removeEventListener("languageChange", handleLanguageChange as EventListener)
    }
  }, [])

  const t = (key: string) => getTranslation(key, language)

  return { language, t }
}
