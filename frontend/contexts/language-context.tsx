"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "fr"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Navigation
    "nav.dashboard": "Dashboard",
    "nav.events": "Events",
    "nav.jobs": "Job Board",
    "nav.groups": "Groups",
    "nav.directory": "Alumni Directory",
    "nav.profile": "Profile",
    "nav.settings": "Settings",

    // Profile
    "profile.title": "My Profile",
    "profile.subtitle": "Manage your personal information and preferences",
    "profile.personalInfo": "Personal Information",
    "profile.contactInfo": "Contact Information",
    "profile.professionalInfo": "Professional Information",
    "profile.preferences": "Preferences",
    "profile.security": "Security",
    "profile.notifications": "Notifications",

    // Form fields
    "form.fullName": "Full Name",
    "form.email": "Email Address",
    "form.phone": "Phone Number",
    "form.location": "Location",
    "form.bio": "Bio",
    "form.company": "Company",
    "form.position": "Position",
    "form.graduationYear": "Graduation Year",
    "form.degree": "Degree",
    "form.currentPassword": "Current Password",
    "form.newPassword": "New Password",
    "form.confirmPassword": "Confirm New Password",
    "form.language": "Language",
    "form.timezone": "Timezone",
    "form.visibility": "Profile Visibility",

    // Buttons
    "btn.save": "Save Changes",
    "btn.cancel": "Cancel",
    "btn.edit": "Edit",
    "btn.update": "Update",
    "btn.changePassword": "Change Password",

    // Settings
    "settings.title": "Settings",
    "settings.subtitle": "Customize your experience",
    "settings.emailNotifications": "Email Notifications",
    "settings.systemNotifications": "System Notifications",
    "settings.eventReminders": "Event Reminders",
    "settings.jobAlerts": "Job Alerts",
    "settings.groupMessages": "Group Messages",
    "settings.privacy": "Privacy Settings",
    "settings.publicProfile": "Public Profile",
    "settings.showEmail": "Show Email",
    "settings.showPhone": "Show Phone Number",
    "settings.showLocation": "Show Location",

    // Messages
    "msg.profileUpdated": "Profile updated successfully",
    "msg.passwordChanged": "Password changed successfully",
    "msg.settingsSaved": "Settings saved successfully",
    "msg.error": "An error occurred. Please try again.",
    "msg.passwordMismatch": "Passwords do not match",

    // Common
    "common.loading": "Loading...",
    "common.saving": "Saving...",
    "common.updating": "Updating...",
    "common.yes": "Yes",
    "common.no": "No",
    "common.enabled": "Enabled",
    "common.disabled": "Disabled",
    "common.public": "Public",
    "common.private": "Private",
    "common.alumni": "Alumni",
    "common.admin": "Administrator",
  },
  fr: {
    // Navigation
    "nav.dashboard": "Tableau de bord",
    "nav.events": "Événements",
    "nav.jobs": "Offres d'emploi",
    "nav.groups": "Groupes",
    "nav.directory": "Annuaire des anciens",
    "nav.profile": "Profil",
    "nav.settings": "Paramètres",

    // Profile
    "profile.title": "Mon Profil",
    "profile.subtitle": "Gérez vos informations personnelles et préférences",
    "profile.personalInfo": "Informations personnelles",
    "profile.contactInfo": "Informations de contact",
    "profile.professionalInfo": "Informations professionnelles",
    "profile.preferences": "Préférences",
    "profile.security": "Sécurité",
    "profile.notifications": "Notifications",

    // Form fields
    "form.fullName": "Nom complet",
    "form.email": "Adresse e-mail",
    "form.phone": "Numéro de téléphone",
    "form.location": "Localisation",
    "form.bio": "Biographie",
    "form.company": "Entreprise",
    "form.position": "Poste",
    "form.graduationYear": "Année de diplôme",
    "form.degree": "Diplôme",
    "form.currentPassword": "Mot de passe actuel",
    "form.newPassword": "Nouveau mot de passe",
    "form.confirmPassword": "Confirmer le nouveau mot de passe",
    "form.language": "Langue",
    "form.timezone": "Fuseau horaire",
    "form.visibility": "Visibilité du profil",

    // Buttons
    "btn.save": "Enregistrer",
    "btn.cancel": "Annuler",
    "btn.edit": "Modifier",
    "btn.update": "Mettre à jour",
    "btn.changePassword": "Changer le mot de passe",

    // Settings
    "settings.title": "Paramètres",
    "settings.subtitle": "Personnalisez votre expérience",
    "settings.emailNotifications": "Notifications par e-mail",
    "settings.systemNotifications": "Notifications système",
    "settings.eventReminders": "Rappels d'événements",
    "settings.jobAlerts": "Alertes d'emploi",
    "settings.groupMessages": "Messages de groupe",
    "settings.privacy": "Paramètres de confidentialité",
    "settings.publicProfile": "Profil public",
    "settings.showEmail": "Afficher l'e-mail",
    "settings.showPhone": "Afficher le numéro de téléphone",
    "settings.showLocation": "Afficher la localisation",

    // Messages
    "msg.profileUpdated": "Profil mis à jour avec succès",
    "msg.passwordChanged": "Mot de passe modifié avec succès",
    "msg.settingsSaved": "Paramètres enregistrés avec succès",
    "msg.error": "Une erreur s'est produite. Veuillez réessayer.",
    "msg.passwordMismatch": "Les mots de passe ne correspondent pas",

    // Common
    "common.loading": "Chargement...",
    "common.saving": "Enregistrement...",
    "common.updating": "Mise à jour...",
    "common.yes": "Oui",
    "common.no": "Non",
    "common.enabled": "Activé",
    "common.disabled": "Désactivé",
    "common.public": "Public",
    "common.private": "Privé",
    "common.alumni": "Ancien élève",
    "common.admin": "Administrateur",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "fr")) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
