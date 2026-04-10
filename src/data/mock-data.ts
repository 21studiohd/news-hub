export type Category = "politics" | "tech" | "lifestyle" | "business" | "opinion";
export type Role = "superadmin" | "editor";

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  category: Category;
  author: { id: string; name: string; avatar: string };
  image: string;
  publishedAt: string;
  readTime: number;
  isBreaking?: boolean;
  seoTitle?: string;
  seoDescription?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar: string;
}

export const categories: { value: Category; label: string }[] = [
  { value: "politics", label: "Politics" },
  { value: "tech", label: "Technology" },
  { value: "lifestyle", label: "Lifestyle" },
  { value: "business", label: "Business" },
  { value: "opinion", label: "Opinion" },
];

export const mockUsers: User[] = [
  { id: "u1", name: "Sarah Chen", email: "sarah@newsroom.com", role: "superadmin", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face" },
  { id: "u2", name: "James Rivera", email: "james@newsroom.com", role: "editor", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" },
  { id: "u3", name: "Amara Osei", email: "amara@newsroom.com", role: "editor", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" },
];

export const mockArticles: Article[] = [
  {
    id: "a1",
    title: "Global Climate Summit Reaches Landmark Agreement on Carbon Emissions",
    slug: "climate-summit-landmark-agreement",
    excerpt: "World leaders have signed a historic pact committing to a 50% reduction in carbon emissions by 2035, marking the most ambitious climate deal in history.",
    body: `<p>In a historic moment for climate action, delegates from over 190 countries have signed a landmark agreement at the Global Climate Summit, committing to a 50% reduction in carbon emissions by 2035.</p><h2>The Path to Agreement</h2><p>Negotiations lasted over two weeks, with contentious debates around financing mechanisms for developing nations. The final text includes provisions for a $200 billion annual climate fund.</p><p>"This is the moment future generations will look back on," said the UN Secretary-General. "We have chosen the path of survival over destruction."</p><h2>Key Provisions</h2><ul><li>50% reduction in carbon emissions by 2035</li><li>Phase-out of coal power by 2030 in developed nations</li><li>$200 billion annual climate adaptation fund</li><li>Mandatory carbon pricing mechanisms</li></ul><p>Environmental groups have cautiously welcomed the deal, though some argue the targets still fall short of what science demands.</p>`,
    category: "politics",
    author: mockUsers[0],
    image: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=1200&h=600&fit=crop",
    publishedAt: "2026-04-10T08:00:00Z",
    readTime: 6,
    isBreaking: true,
  },
  {
    id: "a2",
    title: "Apple Unveils Revolutionary AI Chip That Runs Models Entirely On-Device",
    slug: "apple-ai-chip-on-device",
    excerpt: "The new M5 Ultra processor can run 70-billion parameter models locally, eliminating the need for cloud processing in most AI tasks.",
    body: `<p>Apple has announced its next-generation M5 Ultra chip, capable of running large language models with up to 70 billion parameters entirely on-device.</p><p>The breakthrough eliminates privacy concerns around cloud-based AI processing and offers response times up to 10x faster than current solutions.</p><h2>Technical Specifications</h2><p>The chip features a 40-core Neural Engine with 128GB of unified memory, enabling real-time video analysis, natural language processing, and code generation without an internet connection.</p>`,
    category: "tech",
    author: mockUsers[1],
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1200&h=600&fit=crop",
    publishedAt: "2026-04-09T14:30:00Z",
    readTime: 4,
    isBreaking: true,
  },
  {
    id: "a3",
    title: "The Rise of 'Slow Travel': Why Millennials Are Trading Flights for Trains",
    slug: "slow-travel-millennials-trains",
    excerpt: "A growing movement of travelers is choosing extended rail journeys over quick flights, reshaping the tourism industry.",
    body: `<p>The slow travel movement has exploded in popularity, with train bookings across Europe up 340% compared to pre-pandemic levels.</p><p>Driven by climate consciousness and a desire for more meaningful travel experiences, millennials and Gen Z travelers are increasingly choosing rail over air.</p><h2>The Economics of Slow Travel</h2><p>While individual journeys may take longer, travelers report spending less overall by combining transit with accommodation and experiencing more destinations per trip.</p>`,
    category: "lifestyle",
    author: mockUsers[2],
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&h=600&fit=crop",
    publishedAt: "2026-04-09T10:00:00Z",
    readTime: 5,
  },
  {
    id: "a4",
    title: "Federal Reserve Holds Interest Rates Steady Amid Cooling Inflation",
    slug: "fed-holds-rates-steady",
    excerpt: "The central bank signals potential rate cuts in Q3 as inflation continues its downward trend toward the 2% target.",
    body: `<p>The Federal Reserve has kept interest rates unchanged at its latest meeting, signaling that rate cuts could begin as early as Q3 2026.</p><p>Inflation has fallen to 2.4%, nearing the Fed's 2% target, while the labor market remains resilient with unemployment at 3.8%.</p>`,
    category: "business",
    author: mockUsers[0],
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=600&fit=crop",
    publishedAt: "2026-04-08T16:00:00Z",
    readTime: 3,
  },
  {
    id: "a5",
    title: "Why We Need to Rethink Social Media Regulation Before It's Too Late",
    slug: "rethink-social-media-regulation",
    excerpt: "Current regulatory frameworks are failing to address the real harms of social media. Here's what a better approach looks like.",
    body: `<p>The current patchwork of social media regulations is woefully inadequate for the challenges we face. From algorithmic amplification of misinformation to the mental health crisis among teenagers, the evidence is clear: we need a fundamentally different approach.</p><h2>The Failure of Self-Regulation</h2><p>Tech companies have had decades to self-regulate and have consistently chosen profits over user safety. The time for voluntary measures has passed.</p>`,
    category: "opinion",
    author: mockUsers[1],
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&h=600&fit=crop",
    publishedAt: "2026-04-08T09:00:00Z",
    readTime: 7,
  },
  {
    id: "a6",
    title: "Quantum Computing Startup Achieves Error-Corrected Qubit Milestone",
    slug: "quantum-computing-error-correction",
    excerpt: "A breakthrough in quantum error correction brings practical quantum computing years closer than previously estimated.",
    body: `<p>Quantum startup QubitLogic has demonstrated a fully error-corrected logical qubit operating at room temperature, a feat many experts thought was at least a decade away.</p>`,
    category: "tech",
    author: mockUsers[2],
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&h=600&fit=crop",
    publishedAt: "2026-04-07T12:00:00Z",
    readTime: 4,
  },
  {
    id: "a7",
    title: "New Study Links Ultra-Processed Foods to Accelerated Cognitive Decline",
    slug: "ultra-processed-foods-cognitive-decline",
    excerpt: "Researchers find a strong correlation between high consumption of ultra-processed foods and faster rates of memory loss in adults over 50.",
    body: `<p>A landmark 10-year study published in The Lancet has found that adults who consume more than 30% of their calories from ultra-processed foods experience cognitive decline at nearly twice the rate of those who eat primarily whole foods.</p>`,
    category: "lifestyle",
    author: mockUsers[0],
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=1200&h=600&fit=crop",
    publishedAt: "2026-04-07T08:00:00Z",
    readTime: 5,
  },
  {
    id: "a8",
    title: "Historic Bipartisan Infrastructure Bill Passes Senate with Supermajority",
    slug: "bipartisan-infrastructure-bill",
    excerpt: "The $1.2 trillion bill focuses on bridges, broadband, and clean energy infrastructure across all 50 states.",
    body: `<p>In a rare show of bipartisan cooperation, the U.S. Senate has passed a sweeping infrastructure bill with a 78-22 vote.</p>`,
    category: "politics",
    author: mockUsers[1],
    image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=1200&h=600&fit=crop",
    publishedAt: "2026-04-06T15:00:00Z",
    readTime: 4,
  },
];

// Analytics mock data
export const mockAnalytics = {
  totalViews: 2_450_000,
  totalArticles: mockArticles.length,
  totalUsers: mockUsers.length,
  viewsByDay: [
    { date: "Apr 4", views: 320000 },
    { date: "Apr 5", views: 280000 },
    { date: "Apr 6", views: 410000 },
    { date: "Apr 7", views: 350000 },
    { date: "Apr 8", views: 390000 },
    { date: "Apr 9", views: 420000 },
    { date: "Apr 10", views: 280000 },
  ],
  topArticles: mockArticles.slice(0, 5).map((a, i) => ({
    title: a.title,
    views: [850000, 620000, 410000, 380000, 290000][i],
  })),
  categoryBreakdown: [
    { category: "Politics", percentage: 28 },
    { category: "Tech", percentage: 32 },
    { category: "Lifestyle", percentage: 18 },
    { category: "Business", percentage: 12 },
    { category: "Opinion", percentage: 10 },
  ],
};
