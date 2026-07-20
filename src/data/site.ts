import {
  GraduationCap, Target, Users, ClipboardList, Building2, Sparkles,
  Phone, Award, Globe2, Clock,
} from "lucide-react";

export const CONTACT = {
  email: "expertneet121@gmail.com",
  phone: "+91 8882611683",
  phoneTel: "+918882611683",
  whatsapp: "https://wa.me/918882611683?text=Hi%20NEET%20Expert%2C%20I%27d%20like%20a%20free%20counselling%20consultation.",
  whatsappLabel: "+91 8882611683",
  instagram: "https://www.instagram.com/neetexpert.121?igsh=ZWE2aDM2aXh5bXln&utm_source=qr",
  instagramHandle: "@neetexpert.121",
  tagline: "Right Path Changes Everything",
};

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/process", label: "Process" },
  { href: "/colleges", label: "Colleges" },
  { href: "/success", label: "Success" },
  { href: "/blog", label: "Insights" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export const STATS = [
  { value: 12000, suffix: "+", label: "Students Guided" },
  { value: 850, suffix: "+", label: "Top-500 Ranks" },
  { value: 340, suffix: "+", label: "Colleges Covered" },
  { value: 9, suffix: " yrs", label: "Counselling Experience" },
];

export const SERVICES = [
  { icon: Target, title: "All India Quota Counselling", desc: "End-to-end AIQ round guidance from registration to reporting, with real-time cutoff intelligence." },
  { icon: Building2, title: "State Quota Counselling", desc: "Personalised state-wise strategy for 85% state quota seats across all Indian states." },
  { icon: GraduationCap, title: "MBBS / BDS Choice Filling", desc: "Data-driven choice-filling that maximises your seat probability without compromising on college quality." },
  { icon: Sparkles, title: "Deemed & Private Colleges", desc: "Transparent fee/quality analysis of every deemed and private medical college in India." },
  { icon: Award, title: "AYUSH & Nursing Admission", desc: "BAMS, BHMS, BUMS and top nursing programs mapped to your rank, budget and location." },
  { icon: Globe2, title: "MBBS Abroad Advisory", desc: "Vetted university options in Russia, Georgia, Uzbekistan, Kazakhstan with fee & FMGE analysis." },
  { icon: ClipboardList, title: "Document Verification Prep", desc: "Complete documentation checklist, mock verification and reporting readiness support." },
  { icon: Users, title: "1-on-1 Mentorship", desc: "Dedicated mentor from result day to college reporting — WhatsApp + call access, no queues." },
  { icon: Clock, title: "Round-wise Strategy", desc: "Live strategy for Round 1, Round 2, Mop-up and Stray Vacancy — never miss a window." },
  { icon: Phone, title: "Parent Consultation", desc: "Dedicated parent briefings so the whole family is aligned on the plan and finances." },
];

export const PROCESS = [
  { step: "01", title: "Free Discovery Call", desc: "30-minute call to understand your rank, category, budget and dream colleges." },
  { step: "02", title: "Personalised Roadmap", desc: "We build a written roadmap covering AIQ + state + private options with realistic seat probability." },
  { step: "03", title: "Registration Support", desc: "We handle MCC, state and deemed registrations with document review at every step." },
  { step: "04", title: "Choice Filling Session", desc: "Live 2–3 hour session — screen-share choice filling with our proprietary rank-mapping tool." },
  { step: "05", title: "Round 1 Allotment", desc: "Result analysis, upgrade decision guidance, freeze vs float clarity." },
  { step: "06", title: "Round 2 & Mop-up", desc: "Dynamic re-strategy for round 2, mop-up and stray vacancy rounds based on live cutoffs." },
  { step: "07", title: "Reporting Assistance", desc: "College-specific document checklist, fee guidance and reporting-day handholding." },
  { step: "08", title: "Post-Admission Support", desc: "Hostel, migration, bond queries — mentor stays with you through the first semester." },
];

export type College = {
  name: string; state: string; type: "Government" | "Private" | "Deemed";
  fees: string; cutoff: string;
};

export const COLLEGES: College[] = [
  { name: "AIIMS Delhi", state: "Delhi", type: "Government", fees: "₹1,600/yr", cutoff: "AIR 60" },
  { name: "Maulana Azad Medical College", state: "Delhi", type: "Government", fees: "₹8,600/yr", cutoff: "AIR 120" },
  { name: "Grant Medical College", state: "Maharashtra", type: "Government", fees: "₹85,000/yr", cutoff: "AIR 900" },
  { name: "Seth GS Medical College", state: "Maharashtra", type: "Government", fees: "₹75,000/yr", cutoff: "AIR 700" },
  { name: "JIPMER Puducherry", state: "Puducherry", type: "Government", fees: "₹6,800/yr", cutoff: "AIR 200" },
  { name: "Madras Medical College", state: "Tamil Nadu", type: "Government", fees: "₹14,600/yr", cutoff: "AIR 850" },
  { name: "Christian Medical College", state: "Tamil Nadu", type: "Private", fees: "₹49,000/yr", cutoff: "AIR 1,200" },
  { name: "Kasturba Medical College Manipal", state: "Karnataka", type: "Deemed", fees: "₹15.6 L/yr", cutoff: "AIR 20,000" },
  { name: "St. John's Medical College", state: "Karnataka", type: "Private", fees: "₹5.5 L/yr", cutoff: "AIR 8,000" },
  { name: "Bangalore Medical College", state: "Karnataka", type: "Government", fees: "₹1.05 L/yr", cutoff: "AIR 2,300" },
  { name: "King George's Medical Univ.", state: "Uttar Pradesh", type: "Government", fees: "₹54,000/yr", cutoff: "AIR 1,800" },
  { name: "Institute of Medical Sciences BHU", state: "Uttar Pradesh", type: "Government", fees: "₹6,000/yr", cutoff: "AIR 900" },
  { name: "AIIMS Bhubaneswar", state: "Odisha", type: "Government", fees: "₹1,600/yr", cutoff: "AIR 1,500" },
  { name: "AIIMS Jodhpur", state: "Rajasthan", type: "Government", fees: "₹1,600/yr", cutoff: "AIR 1,700" },
  { name: "SMS Medical College", state: "Rajasthan", type: "Government", fees: "₹35,000/yr", cutoff: "AIR 2,900" },
  { name: "GMC Nagpur", state: "Maharashtra", type: "Government", fees: "₹80,000/yr", cutoff: "AIR 3,500" },
  { name: "Kalinga Institute of Medical Sci.", state: "Odisha", type: "Deemed", fees: "₹18 L/yr", cutoff: "AIR 55,000" },
  { name: "SRM Medical College", state: "Tamil Nadu", type: "Deemed", fees: "₹24.5 L/yr", cutoff: "AIR 90,000" },
  { name: "Amrita Institute of Medical Sci.", state: "Kerala", type: "Deemed", fees: "₹19 L/yr", cutoff: "AIR 45,000" },
  { name: "DY Patil Medical College", state: "Maharashtra", type: "Deemed", fees: "₹25 L/yr", cutoff: "AIR 1,10,000" },
  { name: "Hamdard Institute of Medical Sci.", state: "Delhi", type: "Private", fees: "₹11 L/yr", cutoff: "AIR 35,000" },
  { name: "Vardhman Mahavir Medical College", state: "Delhi", type: "Government", fees: "₹6,000/yr", cutoff: "AIR 500" },
  { name: "Osmania Medical College", state: "Telangana", type: "Government", fees: "₹22,000/yr", cutoff: "AIR 3,100" },
  { name: "Kempegowda Institute of Medical", state: "Karnataka", type: "Private", fees: "₹9.5 L/yr", cutoff: "AIR 30,000" },
];

export const STORIES = [
  { name: "Ananya Sharma", rank: "AIR 342", college: "Maulana Azad Medical College", quote: "The choice-filling session literally saved my seat — they mapped my rank against 40+ colleges in one call." },
  { name: "Rohan Verma", rank: "AIR 1,824", college: "Grant Medical College, Mumbai", quote: "I nearly wasted my Round 1 on a wrong upgrade. My mentor called me at 11 PM to re-strategise. Priceless." },
  { name: "Priya Iyer", rank: "AIR 4,910", college: "Bangalore Medical College", quote: "Coming from a Tier-3 city, we had zero idea about state quota nuances. NEET Expert walked us through everything." },
  { name: "Aditya Patel", rank: "AIR 12,540", college: "GMC Surat", quote: "Their private vs deemed fee analysis alone saved us ₹40 lakhs over the course. Transparent, honest guidance." },
  { name: "Kavya Nair", rank: "AIR 6,220", college: "Amrita Institute of Medical Sciences", quote: "Every single doubt was answered within minutes. It felt like having a doctor cousin in the family." },
];

export const BLOG_POSTS = [
  { tag: "Strategy", title: "NEET UG 2026 Choice Filling: The 5-Layer Framework", date: "July 12, 2026", excerpt: "How top-scorers structure their preference list to maximise seat probability without gambling." },
  { tag: "Colleges", title: "AIIMS vs Top Government Medical Colleges: A 2026 Comparison", date: "July 04, 2026", excerpt: "Beyond the brand — fees, clinical exposure, PG conversion and hostel life compared." },
  { tag: "State Quota", title: "State Quota 85%: Who Qualifies as a Bonafide Domicile?", date: "June 28, 2026", excerpt: "State-by-state domicile rules that decide whether you get the 85% advantage or not." },
  { tag: "Deemed", title: "Deemed Medical Colleges 2026: Fee Bands, ROI & Hidden Costs", date: "June 20, 2026", excerpt: "Complete fee analysis of every deemed medical college with real hostel + mess numbers." },
  { tag: "MBBS Abroad", title: "MBBS Abroad After NEET: Only If You Do These 6 Things", date: "June 12, 2026", excerpt: "A no-nonsense checklist for parents considering Russia, Georgia or Uzbekistan medical universities." },
  { tag: "Category", title: "OBC/SC/ST/EWS: Category Certificate Traps to Avoid", date: "June 04, 2026", excerpt: "Common mistakes in category certificates that cause seat cancellation post-allotment." },
];

export const FAQS = [
  { q: "When should I start NEET counselling preparation?", a: "The day your NEET UG result is out — ideally within the first week. Registration windows for MCC and state counselling open quickly." },
  { q: "Do you handle both AIQ and state counselling?", a: "Yes. We handle All India Quota (15%), all state quotas (85%), and every deemed / private / AYUSH counselling round." },
  { q: "What is your fee structure?", a: "We have transparent, one-time plans covering the entire counselling season. The first 30-minute discovery call is completely free — no obligations." },
  { q: "Will I get a dedicated mentor?", a: "Yes. Every student is assigned a single mentor from result day to college reporting, with WhatsApp and call access." },
  { q: "How is your choice-filling different?", a: "We use a proprietary rank-mapping tool, live cutoff intelligence, and a 5-layer preference framework. You see the math behind every choice." },
  { q: "Do you guarantee a seat?", a: "No honest counsellor can guarantee a seat — outcomes depend on your rank, category and cutoffs. We guarantee our process, transparency, and full effort." },
  { q: "What if I don't get a seat in Round 1?", a: "That's where we shine. Our Round 2, Mop-up and Stray Vacancy strategies are among the strongest in India." },
  { q: "Do you help with MBBS abroad?", a: "Yes — but only with vetted, MCI/NMC-recognised universities. We show you real FMGE pass rates and total costs before you decide." },
  { q: "Can parents attend consultations?", a: "Absolutely. We actively encourage parent involvement and offer dedicated parent briefings." },
  { q: "How do I get started?", a: "Book a free consultation from this page. We'll call you within 24 hours to understand your rank and next steps." },
];

export const WHY_US = [
  { title: "Personal mentor, not a call-centre", desc: "Same mentor from day 1 to reporting day. No ticket queues, no juniors." },
  { title: "Data-driven choice-filling", desc: "Live cutoffs, proprietary rank-mapping, mathematically optimised choice list." },
  { title: "Transparent fee analysis", desc: "Real numbers on tuition, hostel, mess, bond, PG conversion — no marketing spin." },
  { title: "Round-wise strategy", desc: "Fresh strategy for Round 1, Round 2, Mop-up, Stray — every window covered." },
];

export const COMPARISON = [
  { feature: "Dedicated 1-on-1 mentor", us: true, them: false },
  { feature: "Live proprietary rank-mapping tool", us: true, them: false },
  { feature: "AIQ + State + Deemed + Private, all rounds", us: true, them: false },
  { feature: "Transparent fee breakdown (hostel + bond)", us: true, them: false },
  { feature: "Parent briefing sessions", us: true, them: false },
  { feature: "Post-admission support till Sem 1", us: true, them: false },
];