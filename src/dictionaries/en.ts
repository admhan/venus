import type { Dictionary } from "@/lib/i18n";

export const dictEn: Dictionary = {
  meta: {
    title: "Starnote — Your customers love you. Get it on record.",
    description:
      "Starnote helps local businesses get more genuine Google reviews with an AI-guided questionnaire, completed in seconds right after each visit.",
  },
  nav: {
    howItWorks: "How it works",
    pricing: "Pricing",
    faq: "FAQ",
    start: "Get started",
    switchTo: "Français",
  },
  hero: {
    badge: "Built for local businesses",
    title: "Your customers love you. Get it on record.",
    description:
      "Your customers never spontaneously write a review, even when they're thrilled. Starnote asks them a few simple questions right after their visit, and an AI drafts a genuine review for them, ready to publish on your Google listing in one click.",
    ctaPrimary: "Create my business page",
    ctaSecondary: "See how it works",
    note: "No commitment. Your page goes live less than a minute after payment.",
    cardBusiness: "Finest Lash Studio",
    cardQuestion: "How was your visit?",
    cardOptions: ["Lash extensions", "Lash lift", "Eyebrows"],
    cardNext: "Next →",
    cardGeneratedLabel: "Review generated in",
    cardGeneratedTime: "8 sec",
  },
  howItWorks: {
    title: "How it works",
    description:
      "Four steps, zero friction for your customer, and a steady stream of Google reviews for your business.",
    steps: [
      {
        numero: "01",
        titre: "You create your questionnaire",
        description:
          "5 generic questions tailored to your industry come pre-filled. Edit them in minutes from your dashboard.",
      },
      {
        numero: "02",
        titre: "Your customers answer in 30 seconds",
        description:
          "QR code at the till, SMS link, or NFC tag on the counter: your customers answer right away, on their phone, no account needed.",
      },
      {
        numero: "03",
        titre: "AI drafts a review for them",
        description:
          "Based on their answers, Starnote generates a natural, genuine review, never the same twice. The customer can edit it before publishing.",
      },
      {
        numero: "04",
        titre: "One click to publish on Google",
        description:
          "The review is copied automatically and your Google Business listing opens directly. The customer just has to paste and confirm.",
      },
    ],
  },
  trust: {
    title: "Built to last, not to cheat",
    description:
      "Many similar tools push the limits of Google's rules. Starnote is built to stay compliant, for the long run.",
    points: [
      {
        titre: "Negative reviews never disappear",
        description:
          "An unhappy customer is directed to a private feedback form sent straight to your business, never blocked or hidden from Google. Compliant with Google's rules and online review regulations.",
      },
      {
        titre: "Reviews that don't sound alike",
        description:
          "Every generated review is unique, written from each customer's own answers. No copy-pasted text that would raise flags with Google.",
      },
      {
        titre: "QR code, NFC, or a simple link",
        description:
          "Share your questionnaire however you like: a QR code sign at the till, a contactless NFC tag, or a link sent by text after the appointment.",
      },
      {
        titre: "A dashboard to stay in control",
        description:
          "Customizable questions, completion rate, volume of reviews generated, centralized private feedback: everything visible at a glance.",
      },
    ],
  },
  pricing: {
    title: "One simple price, per business",
    description: "No hidden fees, no commitment.",
    included: [
      "Questionnaire page customized to your brand",
      "5 generic pre-filled questions, fully editable",
      "Unlimited AI-generated reviews",
      "QR code and share link ready to use",
      "Private feedback for unhappy customers",
      "Dashboard and statistics",
    ],
    monthly: { price: "€60", period: "/ month", note: "VAT included, per business" },
    yearly: { price: "€600", period: "/ year", note: "VAT included, per business — 2 months free" },
    cta: "Create my page now",
  },
  faq: {
    title: "Frequently asked questions",
    items: [
      {
        q: "Are the generated reviews fake?",
        r: "No. Every review is written from answers actually given by a customer who visited your business, and they can edit it before publishing. Starnote helps with the writing, not with fabricating reviews.",
      },
      {
        q: "What happens if a customer isn't satisfied?",
        r: "They're directed to a private feedback form sent straight to you, instead of to Google. They're never prevented from leaving a public review if they want to.",
      },
      {
        q: "Can I change the questions asked to my customers?",
        r: "Yes, entirely, from your dashboard. 5 generic questions tailored to your industry come pre-filled so you can get started quickly.",
      },
      {
        q: "How long until I'm live?",
        r: "Your page is created automatically as soon as payment is confirmed, usually in under a minute.",
      },
    ],
  },
  footer: {
    rights: "All rights reserved.",
  },
  inscription: {
    title: "Create your Starnote page",
    priceNote: "VAT included, no commitment.",
    priceMonthly: "€60",
    priceYearly: "€600",
    perMonth: "/month",
    perYear: "/year",
    monthlyLabel: "Monthly — €60/month",
    yearlyLabel: "Yearly — €600/year",
    nomLabel: "Business name",
    nomPlaceholder: "Finest Lash Studio",
    googleUrlLabel: "Direct link to your Google review listing",
    googleUrlPlaceholder: "https://g.page/r/.../review",
    googleUrlHelp:
      "On Google Maps: your listing → Share → Ask for reviews. This link opens the review form directly for your customers, with no extra step.",
    slugLabel: "Your page address",
    slugDomain: "getstarnote.com/",
    slugTaken: "This link is already taken.",
    slugAvailable: "Available",
    emailLabel: "Business email",
    emailPlaceholder: "you@business.com",
    emailHelp: "You'll receive a confirmation email at this address.",
    passwordLabel: "Password",
    passwordPlaceholder: "8 characters minimum",
    passwordHelp: "To log in to your dashboard after payment.",
    submit: "Continue to payment",
    submitLoading: "Redirecting to payment…",
    errorAccountExists: "An account already exists with this email. Log in instead from /connexion.",
    errorGenericAccount: "Couldn't create your account.",
    errorGeneric: "Something went wrong.",
    errorPaymentServer: "Couldn't reach the payment server.",
  },
  inscriptionSucces: {
    title: "Payment confirmed",
    description:
      "Your page is being created. Log in with the email and password you chose at signup to access your dashboard and set up your questions.",
    cta: "Log in",
  },
  connexion: {
    title: "Log in",
    subtitle: "Access your Starnote dashboard.",
    emailPlaceholder: "you@business.com",
    passwordPlaceholder: "Password",
    submit: "Log in",
    submitLoading: "Logging in…",
    forgotPassword: "Forgot your password?",
    errorInvalidCredentials: "Incorrect email or password.",
    errorEmailRequired: "Enter your email above to receive the reset link.",
    resetLinkSent: "A reset link was sent to",
    resetLinkSentSuffix: "Check your inbox.",
    notConfigured: "Supabase isn't configured yet. Add your environment variables to enable login (see README).",
  },
  resetPassword: {
    title: "New password",
    subtitle: "Choose a new password for your account.",
    passwordPlaceholder: "8 characters minimum",
    submit: "Save password",
    submitLoading: "Saving…",
    success: "Password updated. Redirecting to your dashboard…",
  },
  dashboardLayout: {
    overview: "Overview",
    questions: "Questions",
    feedback: "Private feedback",
    parametres: "Settings",
    notConfigured: "Supabase isn't configured yet. Add your environment variables to enable the dashboard (see README).",
    noEntrepriseTitle: "No active business",
    noEntrepriseDescription: "Your page will be created automatically as soon as payment is confirmed.",
    noEntrepriseCta: "See pricing",
  },
  dashboardOverview: {
    title: "Overview",
    googleUrlMissingTitle: "Google review link not set",
    googleUrlMissingDescription:
      "Until this link is set, your customers land on a generic Google search instead of your listing — add it in settings for a frictionless flow.",
    googleUrlMissingCta: "Configure",
    statSessions: "Questionnaires started",
    statPublished: "Reviews published on Google",
    statFeedback: "Unread private feedback",
    shareTitle: "Share the questionnaire",
    shareDescription: "Display the QR code at the till, or share the link by text after each visit.",
    qrCodeAlt: "Questionnaire QR code",
    downloadQrCode: "Download QR code",
    copy: "Copy",
    copied: "Copied!",
  },
  dashboardQuestions: {
    title: "Questions",
    description: "These questions are asked to your customers, in order, right after their visit.",
    typeLabels: {
      choix_unique: "Single choice",
      choix_multiple: "Multiple choice",
      texte_libre: "Free text",
      note: "Rating (1 to 5)",
    },
    textPlaceholder: "Question text",
    moveUp: "↑",
    moveDown: "↓",
    remove: "Remove",
    addOption: "+ Add an option",
    optionPrefix: "Option",
    addQuestion: "+ Add a question",
    save: "Save",
    saving: "Saving…",
    saved: "Saved ✓",
  },
  dashboardFeedback: {
    title: "Private feedback",
    description: "Feedback from unhappy customers, sent only to you, never posted on Google.",
    empty: "No feedback yet.",
    markAsRead: "Mark as read",
    dateLocale: "en-US",
  },
  dashboardParametres: {
    title: "Settings",
    description: "Branding and behavior of your page.",
    nomLabel: "Business name",
    colorLabel: "Brand color",
    googleUrlLabel: "Direct link to your Google review listing",
    googleUrlPlaceholder: "https://g.page/r/.../review",
    googleUrlHelp:
      "Without this link, your customers land on a generic Google search instead of your review page — best to avoid. To get it without friction: search for your business on Google Maps → Share button → Ask for reviews, or in your Google Business Profile → Get more reviews. The link looks like g.page/r/.../review and opens the review form directly, with no extra step.",
    emailLabel: "Contact email",
    thresholdLabelPrefix: "Minimum rating to route to Google",
    thresholdHelp: "Below this rating, the customer is routed to private feedback instead of Google.",
    save: "Save",
    saving: "Saving…",
    saved: "Saved ✓",
  },
};
