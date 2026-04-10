import { mockAnalytics } from "@/data/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Eye, FileText, Users, TrendingUp } from "lucide-react";

const COLORS = ["hsl(220,70%,50%)", "hsl(262,60%,50%)", "hsl(340,65%,55%)", "hsl(145,55%,40%)", "hsl(30,80%,50%)"];

const AnalyticsPage = () => {
  const stats = [
    { label: "Shikimet Totale", value: (mockAnalytics.totalViews / 1_000_000).toFixed(1) + "M", icon: Eye },
    { label: "Artikuj", value: mockAnalytics.totalArticles, icon: FileText },
    { label: "Anëtarë Ekipi", value: mockAnalytics.totalUsers, icon: Users },
    { label: "Rritja Mesatare", value: "+12.5%", icon: TrendingUp },
  ];

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold mb-6">Pasqyra e Analitikës</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
                <s.icon className="h-4 w-4" />
                {s.label}
              </div>
              <div className="text-2xl font-bold">{s.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-serif text-lg">Shikimet Këtë Javë</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockAnalytics.viewsByDay}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(v: number) => `${(v / 1000).toFixed(0)}k shikime`} />
                <Bar dataKey="views" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-serif text-lg">Sipas Kategorisë</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={mockAnalytics.categoryBreakdown}
                  dataKey="percentage"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  strokeWidth={2}
                >
                  {mockAnalytics.categoryBreakdown.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v: number) => `${v}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1 mt-2">
              {mockAnalytics.categoryBreakdown.map((c, i) => (
                <div key={c.category} className="flex items-center gap-2 text-xs">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: COLORS[i] }} />
                  <span className="flex-1">{c.category}</span>
                  <span className="font-medium">{c.percentage}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="font-serif text-lg">Artikujt Më Të Lexuar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockAnalytics.topArticles.map((a, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-lg font-bold text-muted-foreground w-6">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium line-clamp-1">{a.title}</p>
                </div>
                <span className="text-sm text-muted-foreground shrink-0">{(a.views / 1000).toFixed(0)}k</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsPage;
