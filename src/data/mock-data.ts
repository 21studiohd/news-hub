export type Category = "politike" | "teknologji" | "jete" | "biznes" | "opinion";
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
  { value: "politike", label: "Politikë" },
  { value: "teknologji", label: "Teknologji" },
  { value: "jete", label: "Jetë & Stil" },
  { value: "biznes", label: "Biznes" },
  { value: "opinion", label: "Opinion" },
];

export const mockUsers: User[] = [
  { id: "u1", name: "Arben Hoxha", email: "arben@tetova1.com", role: "superadmin", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" },
  { id: "u2", name: "Elona Berisha", email: "elona@tetova1.com", role: "editor", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face" },
  { id: "u3", name: "Driton Ahmeti", email: "driton@tetova1.com", role: "editor", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face" },
];

export const mockArticles: Article[] = [
  {
    id: "a1",
    title: "Samiti Global i Klimës arrin marrëveshje historike për emetimet e karbonit",
    slug: "samiti-klimes-marreveshje-historike",
    excerpt: "Liderët botërorë nënshkruan një pakt historik duke u zotuar për uljen 50% të emetimeve të karbonit deri në 2035.",
    body: `<p>Në një moment historik për aksionin klimatik, delegatët nga mbi 190 vende nënshkruan një marrëveshje historike në Samitin Global të Klimës.</p><h2>Rruga drejt marrëveshjes</h2><p>Negociatat zgjatën mbi dy javë, me debate të ashpra rreth mekanizmave të financimit për vendet në zhvillim.</p><ul><li>Ulje 50% e emetimeve të karbonit deri në 2035</li><li>Eliminimi i qymyrit deri në 2030 në vendet e zhvilluara</li><li>Fond vjetor prej 200 miliardë dollarësh</li></ul>`,
    category: "politike",
    author: mockUsers[0],
    image: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=1200&h=600&fit=crop",
    publishedAt: "2026-04-10T08:00:00Z",
    readTime: 6,
    isBreaking: true,
  },
  {
    id: "a2",
    title: "Apple zbulon çipin revolucionar AI që funksionon tërësisht në pajisje",
    slug: "apple-cipi-ai-ne-pajisje",
    excerpt: "Procesori i ri M5 Ultra mund të ekzekutojë modele me 70 miliardë parametra lokalisht.",
    body: `<p>Apple ka prezantuar çipin e gjeneratës së re M5 Ultra, i aftë të ekzekutojë modele gjuhësore me deri në 70 miliardë parametra tërësisht në pajisje.</p><h2>Specifikimet teknike</h2><p>Çipi përmban një Motor Neural me 40 bërthama dhe 128GB memorie të unifikuar.</p>`,
    category: "teknologji",
    author: mockUsers[1],
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1200&h=600&fit=crop",
    publishedAt: "2026-04-09T14:30:00Z",
    readTime: 4,
    isBreaking: true,
  },
  {
    id: "a3",
    title: "Rritja e 'Udhëtimit të Ngadalshëm': Pse po zgjidhen trenat në vend të avionëve",
    slug: "udhetimi-ngadalshem-trenat",
    excerpt: "Një lëvizje në rritje e udhëtarëve po zgjedh udhëtimet e gjata me tren në vend të fluturimeve.",
    body: `<p>Lëvizja e udhëtimit të ngadalshëm ka shpërthyer në popullaritet, me rezervimet e trenave në Evropë të rritura 340%.</p><h2>Ekonomia e udhëtimit të ngadalshëm</h2><p>Edhe pse udhëtimet individuale zgjasin më shumë, udhëtarët raportojnë se shpenzojnë më pak në total.</p>`,
    category: "jete",
    author: mockUsers[2],
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&h=600&fit=crop",
    publishedAt: "2026-04-09T10:00:00Z",
    readTime: 5,
  },
  {
    id: "a4",
    title: "Banka Qendrore mban normat e interesit të pandryshuara mes inflacionit në rënie",
    slug: "banka-qendrore-normat-interesit",
    excerpt: "Sinjalizohen ulje të mundshme të normave në tremujorin e tretë ndërsa inflacioni vazhdon trendin rënës.",
    body: `<p>Banka Qendrore ka mbajtur normat e interesit të pandryshuara, duke sinjalizuar se uljet mund të fillojnë në TM3 2026.</p>`,
    category: "biznes",
    author: mockUsers[0],
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=600&fit=crop",
    publishedAt: "2026-04-08T16:00:00Z",
    readTime: 3,
  },
  {
    id: "a5",
    title: "Pse duhet të rimendojmë rregullimin e rrjeteve sociale para se të jetë vonë",
    slug: "rimendimi-rregullimit-rrjetet-sociale",
    excerpt: "Kornizat aktuale rregullatore po dështojnë të adresojnë dëmet reale të rrjeteve sociale.",
    body: `<p>Mozaiku aktual i rregulloreve të rrjeteve sociale është krejtësisht i papërshtatshëm për sfidat me të cilat përballemi.</p><h2>Dështimi i vetë-rregullimit</h2><p>Kompanitë teknologjike kanë pasur dekada për vetë-rregullim dhe kanë zgjedhur vazhdimisht fitimet mbi sigurinë e përdoruesve.</p>`,
    category: "opinion",
    author: mockUsers[1],
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&h=600&fit=crop",
    publishedAt: "2026-04-08T09:00:00Z",
    readTime: 7,
  },
  {
    id: "a6",
    title: "Startup-i i kompjuterit kuantik arrin pikën kyçe të korrektimit të gabimeve",
    slug: "kompjuteri-kuantik-korrektimi-gabimeve",
    excerpt: "Një zbulim në korrektimin e gabimeve kuantike sjell kompjuterin praktik kuantik vite më afër.",
    body: `<p>Startup-i kuantik QubitLogic ka demonstruar një kubit logjik plotësisht të korrigjuar që funksionon në temperaturë dhome.</p>`,
    category: "teknologji",
    author: mockUsers[2],
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&h=600&fit=crop",
    publishedAt: "2026-04-07T12:00:00Z",
    readTime: 4,
  },
  {
    id: "a7",
    title: "Studim i ri lidh ushqimet ultra-të-përpunuara me rënie të përshpejtuar konjitive",
    slug: "ushqimet-ultra-perpunuara-renie-konjitive",
    excerpt: "Studiuesit gjejnë lidhje të fortë mes konsumit të lartë të ushqimeve ultra-të-përpunuara dhe humbjes më të shpejtë të kujtesës.",
    body: `<p>Një studim 10-vjeçar i botuar në The Lancet ka gjetur se të rriturit që konsumojnë mbi 30% të kalorive nga ushqimet ultra-të-përpunuara përjetojnë rënie konjitive pothuajse dy herë më shpejt.</p>`,
    category: "jete",
    author: mockUsers[0],
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=1200&h=600&fit=crop",
    publishedAt: "2026-04-07T08:00:00Z",
    readTime: 5,
  },
  {
    id: "a8",
    title: "Projektligji historik dypartiak i infrastrukturës kalon në Senat me shumicë të madhe",
    slug: "projektligji-dypartiak-infrastruktura",
    excerpt: "Projektligji prej 1.2 trilionë dollarësh fokusohet në ura, internet dhe infrastrukturë të energjisë së pastër.",
    body: `<p>Në një shfaqje të rrallë bashkëpunimi dypartiak, Senati ka miratuar një projektligj gjithëpërfshirës infrastrukture me votim 78-22.</p>`,
    category: "politike",
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
    { date: "Pri 4", views: 320000 },
    { date: "Pri 5", views: 280000 },
    { date: "Pri 6", views: 410000 },
    { date: "Pri 7", views: 350000 },
    { date: "Pri 8", views: 390000 },
    { date: "Pri 9", views: 420000 },
    { date: "Pri 10", views: 280000 },
  ],
  topArticles: mockArticles.slice(0, 5).map((a, i) => ({
    title: a.title,
    views: [850000, 620000, 410000, 380000, 290000][i],
  })),
  categoryBreakdown: [
    { category: "Politikë", percentage: 28 },
    { category: "Teknologji", percentage: 32 },
    { category: "Jetë & Stil", percentage: 18 },
    { category: "Biznes", percentage: 12 },
    { category: "Opinion", percentage: 10 },
  ],
};
