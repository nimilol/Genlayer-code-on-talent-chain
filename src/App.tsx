import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  Users, 
  Plus, 
  Search, 
  Sun, 
  Moon, 
  CheckCircle2, 
  MapPin, 
  Layers, 
  BarChart3,
  Brain,
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  Building2,
  Stethoscope,
  PieChart,
  HardHat,
  Terminal,
  Trophy,
  Filter
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Toaster, toast } from 'sonner';

// --- MOCK GENLAYER INTEGRATION ---
// In a real app, this would use genlayer-js to interact with the contract
const INDUSTRIES = [
  { name: 'Tech', icon: Terminal, color: 'bg-blue-500' },
  { name: 'Finance', icon: PieChart, color: 'bg-emerald-500' },
  { name: 'Healthcare', icon: Stethoscope, color: 'bg-rose-500' },
  { name: 'Engineering', icon: HardHat, color: 'bg-amber-500' },
  { name: 'Marketing', icon: TrendingUp, color: 'bg-purple-500' },
];

export default function App() {
  const [role, setRole] = useState<'candidate' | 'employer' | null>(null);
  const [jobs, setJobs] = useState<any[]>([
    {
      id: 0,
      title: 'Senior Blockchain Engineer',
      industry: 'Tech',
      employer: '0xRecruit...A1',
      description: 'Looking for an expert in L2 scaling and AI-agents.',
      criteria: 'Strong Python/Rust knowledge. Experience with ZK-proofs.',
      is_active: true,
      applicationsCount: 3
    },
    {
      id: 1,
      title: 'Global Health Consultant',
      industry: 'Healthcare',
      employer: '0xHealth...B2',
      description: 'Spearheading decentralized medicine initiatives.',
      criteria: 'Medical degree + 5 years public health experience.',
      is_active: true,
      applicationsCount: 0
    }
  ]);
  const [applications, setApplications] = useState<any[]>([]);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [isApplying, setIsApplying] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('browse');

  const handleApply = (jobId: number, resumeText: string) => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 3000)),
      {
        loading: 'GenLayer AI validators are screening your application...',
        success: (data: any) => {
          const score = Math.floor(Math.random() * 40) + 60; // Mock score
          const newApp = {
            job_id: jobId,
            candidate: '0x' + Math.random().toString(16).slice(2, 42),
            resume_text: resumeText,
            score: score,
            analysis: score > 80 ? 'Highly compatible skills detected. Strong match for core requirements.' : 'Reasonable match, though some criteria are partially met.',
            status: 'SCREENED',
            jobTitle: jobs.find(j => j.id === jobId)?.title,
            trustIndex: score > 90 ? 'High Precision' : 'Standard',
            validators: '128 / 128'
          };
          setApplications([newApp, ...applications]);
          setJobs(jobs.map(j => j.id === jobId ? { ...j, applicationsCount: j.applicationsCount + 1 } : j));
          return 'Application screened and ranked by AI validators!';
        },
        error: 'Screening failed'
      }
    );
  };

  const handlePostJob = (jobData: any) => {
    const newJob = {
      ...jobData,
      id: jobs.length,
      employer: '0xYou...Emp',
      is_active: true,
      applicationsCount: 0
    };
    setJobs([newJob, ...jobs]);
    toast.success('Job posted successfully! AI will now watch for applicants.');
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 font-sans selection:bg-primary/20 flex flex-col overflow-hidden">
      <Toaster position="top-right" theme="dark" />
      
      {/* Header */}
      <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-secondary shrink-0">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => { setRole(null); setActiveTab('browse'); }}>
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-white rotate-45" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">Talent<span className="text-primary italic">Chain</span></span>
          <div className="ml-6 px-3 py-1 bg-white/5 rounded-full border border-white/10 text-[10px] uppercase tracking-widest text-secondary-foreground hidden sm:block">
            Powered by GenLayer AI
          </div>
        </div>

        <div className="flex items-center gap-6">
          <nav className="hidden md:flex gap-8 text-sm font-medium text-secondary-foreground">
            <button onClick={() => setActiveTab('browse')} className={`${activeTab === 'browse' ? 'text-primary' : 'hover:text-white'}`}>Dashboard</button>
            <button className="hover:text-white">Jobs</button>
            <button className="hover:text-white">Validators</button>
            <button className="hover:text-white">Governance</button>
          </nav>
          
          <div className="flex items-center gap-3 ml-4 pl-4 border-l border-white/10">
            {role && (
              <Badge variant="outline" className="rounded-full bg-white/5 border-white/10 text-[10px] uppercase font-mono py-0.5">
                {role}
              </Badge>
            )}
            <Button 
              variant="outline" 
              size="sm"
              className="rounded-md border-white/10 bg-transparent text-xs hover:bg-white/5"
              onClick={() => setRole(role === 'employer' ? 'candidate' : 'employer')}
            >
              Switch Role
            </Button>
            <div className="w-8 h-8 rounded-full bg-accent border border-white/10" />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex overflow-hidden">
        {!role ? (
          <HeroSection setRole={setRole} />
        ) : (
          <>
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/5 bg-secondary/50 p-6 flex flex-col gap-6 shrink-0 overflow-y-auto">
              <section>
                <h3 className="text-[10px] uppercase tracking-widest text-muted-foreground mb-4 font-bold">Industries</h3>
                <div className="flex flex-col gap-2">
                  {INDUSTRIES.map((ind) => (
                    <button 
                      key={ind.name}
                      onClick={() => setSearchQuery(ind.name)}
                      className={`flex items-center justify-between w-full p-2 rounded-md text-sm transition-all ${searchQuery === ind.name ? 'bg-primary/10 border border-primary/20 text-primary' : 'hover:bg-white/5 border border-transparent text-secondary-foreground'}`}
                    >
                      <span className="flex items-center gap-2">
                        <ind.icon className="w-3.5 h-3.5" />
                        {ind.name}
                      </span>
                      <span className="text-[10px] opacity-60">
                        {jobs.filter(j => j.industry === ind.name).length}
                      </span>
                    </button>
                  ))}
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="mt-2 text-[10px] uppercase text-muted-foreground hover:text-white transition-colors"
                  >
                    Clear Filter
                  </button>
                </div>
              </section>

              <section className="mt-auto">
                <div className="p-4 rounded-xl bg-gradient-to-br from-accent to-secondary border border-white/10">
                  <p className="text-[10px] uppercase text-muted-foreground mb-2 flex items-center justify-between font-bold tracking-widest">
                    Validator Status <ShieldCheck className="w-3 h-3" />
                  </p>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs font-mono text-white">Active: 124/128</span>
                  </div>
                  <div className="w-full bg-black/40 h-1.5 rounded-full overflow-hidden">
                    <div className="w-3/4 h-full bg-primary" />
                  </div>
                  <p className="text-[9px] text-muted-foreground mt-2 font-mono">Current Bias Offset: 0.002%</p>
                </div>
              </section>
            </aside>

            {/* Dashboard Content */}
            <div className="flex-1 overflow-y-auto bg-background p-8 flex flex-col gap-8">
              {role === 'candidate' ? (
                <div className="max-w-6xl mx-auto w-full space-y-8">
                  <div className="flex justify-between items-end">
                    <div className="space-y-1">
                      <h1 className="text-4xl font-light text-white tracking-tight">Available Roles</h1>
                      <p className="text-muted-foreground text-sm">GenLayer AI consensus ensures fair evaluation for every applicant.</p>
                    </div>
                    <div className="hidden sm:flex gap-3">
                      <div className="text-right px-6 py-3 bg-accent border border-white/5 rounded-xl">
                        <div className="text-[10px] uppercase text-muted-foreground font-bold tracking-widest">Global Jobs</div>
                        <div className="text-2xl font-mono text-white">{jobs.length * 42}</div>
                      </div>
                      <div className="text-right px-6 py-3 bg-accent border border-white/5 rounded-xl">
                        <div className="text-[10px] uppercase text-muted-foreground font-bold tracking-widest">Avg Matches</div>
                        <div className="text-2xl font-mono text-primary">82.4%</div>
                      </div>
                    </div>
                  </div>

                  <div className="relative w-full max-w-xl">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search by keywords, tech stack, or location..." 
                      className="pl-11 rounded-xl h-14 bg-accent/50 border-white/10 text-base"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="bg-accent/50 border border-white/5 p-1 rounded-xl mb-8">
                      <TabsTrigger value="browse" className="rounded-lg px-8 py-2">Open Positions</TabsTrigger>
                      <TabsTrigger value="my-apps" className="rounded-lg px-8 py-2">My Applications ({applications.length})</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="browse" className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
                      {jobs.filter(j => 
                        j.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        j.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        j.description.toLowerCase().includes(searchQuery.toLowerCase())
                      ).map((job) => (
                        <JobCard 
                          key={job.id} 
                          job={job} 
                          onApply={(job) => {
                            setSelectedJob(job);
                            setIsApplying(true);
                          }} 
                        />
                      ))}
                    </TabsContent>
                    
                    <TabsContent value="my-apps" className="space-y-4 pb-20">
                      {applications.length > 0 ? (
                        applications.map((app, idx) => (
                          <ApplicationCard key={idx} application={app} />
                        ))
                      ) : (
                        <div className="py-32 text-center border border-white/5 bg-accent/20 rounded-[3rem] space-y-6">
                          <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto border border-white/10">
                            <Briefcase className="w-10 h-10 text-muted-foreground" />
                          </div>
                          <div className="space-y-2">
                             <h3 className="text-2xl font-bold">No active applications</h3>
                             <p className="text-muted-foreground max-w-sm mx-auto">Your applications will appear here once AI consensus is reached.</p>
                          </div>
                          <Button variant="outline" className="rounded-full px-8" onClick={() => setActiveTab('browse')}>Browse Roles</Button>
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </div>
              ) : (
                <div className="max-w-6xl mx-auto w-full space-y-8">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h1 className="text-4xl font-light text-white tracking-tight">Talent Pipeline</h1>
                      <p className="text-muted-foreground text-sm">Automated scoring powered by decentralized AI agents.</p>
                    </div>
                    <Button size="lg" className="rounded-xl h-14 px-8 font-bold shadow-2xl shadow-primary/20" onClick={() => setIsPosting(true)}>
                      <Plus className="w-5 h-5 mr-2" /> CREATE POSTING
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <Card className="lg:col-span-1 rounded-[2rem] bg-accent/30 border-white/10 overflow-hidden flex flex-col">
                      <div className="p-6 border-b border-white/5 bg-white/5">
                        <h3 className="text-xs uppercase font-bold tracking-widest text-muted-foreground flex items-center justify-between">
                          ACTIVE ROLES <Filter className="w-3 h-3" />
                        </h3>
                      </div>
                      <div className="flex-1 p-2 space-y-1">
                        {jobs.map(j => (
                          <button 
                            key={j.id} 
                            onClick={() => setSelectedJob(j)}
                            className={`w-full text-left p-4 rounded-2xl flex items-center justify-between transition-all ${selectedJob?.id === j.id ? 'bg-primary text-black' : 'hover:bg-white/5 text-foreground'}`}
                          >
                            <div>
                               <p className="font-bold text-sm">{j.title}</p>
                               <p className={`text-[10px] uppercase font-mono font-bold ${selectedJob?.id === j.id ? 'text-black/60' : 'text-muted-foreground'}`}>{j.industry}</p>
                            </div>
                            <Badge variant="outline" className={`rounded-full border-current ${selectedJob?.id === j.id ? 'bg-black/10' : ''}`}>
                               {j.applicationsCount}
                            </Badge>
                          </button>
                        ))}
                      </div>
                    </Card>

                    <div className="lg:col-span-2 space-y-6">
                      {selectedJob ? (
                        <div className="space-y-6">
                           <div className="bg-accent/40 rounded-[2rem] border border-white/5 p-8 flex justify-between items-center">
                              <div className="space-y-1">
                                <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-primary">Live Evaluation</span>
                                <h2 className="text-2xl font-bold">{selectedJob.title}</h2>
                                <p className="text-xs text-muted-foreground font-mono">ID: 0x{Math.random().toString(16).slice(2, 10)}...{Math.random().toString(16).slice(2, 6)}</p>
                              </div>
                              <div className="flex gap-4">
                                 <div className="text-center px-4">
                                    <p className="text-2xl font-mono text-white leading-none">{selectedJob.applicationsCount}</p>
                                    <p className="text-[9px] uppercase font-bold text-muted-foreground mt-1">Pool</p>
                                 </div>
                                 <div className="text-center px-4 border-l border-white/10">
                                    <p className="text-2xl font-mono text-primary leading-none">0.02%</p>
                                    <p className="text-[9px] uppercase font-bold text-muted-foreground mt-1">Bias</p>
                                 </div>
                              </div>
                            </div>

                            <div className="bg-muted/40 rounded-[2rem] border border-white/10 overflow-hidden">
                               <div className="grid grid-cols-6 p-4 border-b border-white/10 text-[9px] uppercase tracking-widest text-muted-foreground font-bold bg-white/5">
                                  <div className="pl-4">Rank</div>
                                  <div className="col-span-3">Candidate Intelligence</div>
                                  <div className="text-center">Score</div>
                                  <div className="text-right pr-4">Consensus</div>
                               </div>
                               <div className="divide-y divide-white/5">
                                  {applications.length > 0 ? (
                                    applications.map((app, idx) => (
                                      <CandidateRow key={idx} application={app} rank={idx + 1} />
                                    ))
                                  ) : (
                                    <div className="py-20 text-center space-y-4">
                                      <Users className="w-12 h-12 text-white/10 mx-auto" />
                                      <p className="text-sm text-muted-foreground">Waiting for on-chain candidate submissions...</p>
                                    </div>
                                  )}
                               </div>
                            </div>
                        </div>
                      ) : (
                        <div className="h-full min-h-[400px] flex flex-col items-center justify-center border border-white/5 rounded-[3rem] bg-accent/10">
                          <div className="w-16 h-16 bg-accent border border-white/10 rounded-3xl flex items-center justify-center mb-6">
                            <Layers className="w-8 h-8 text-primary" />
                          </div>
                          <h3 className="text-xl font-bold mb-2">Select an Evaluated Role</h3>
                          <p className="text-muted-foreground text-sm max-w-xs text-center">Your pipeline is automatically sorted by AI validator consensus scores.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="h-12 bg-secondary border-t border-white/5 px-8 flex items-center justify-between text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-mono shrink-0">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            Block Height: 12,482,901
          </span>
        </div>
        <div className="hidden sm:flex gap-8">
          <span>Active Jobs: {jobs.length + 1290}</span>
          <span>Validator Latency: 42ms</span>
          <span className="text-white">Gas: 0.12 Gwei</span>
        </div>
      </footer>

      {/* Dialogs - Kept but styled */}
      <Dialog open={isApplying} onOpenChange={setIsApplying}>
        <DialogContent className="sm:max-w-2xl bg-background border-white/10 rounded-[2rem] p-0 overflow-hidden">
          <div className="bg-primary/10 p-8 border-b border-white/5">
             <DialogTitle className="text-3xl font-light tracking-tight">Apply Position</DialogTitle>
             <DialogDescription className="text-muted-foreground mt-2">
               Your application is cryptographically sealed and sent to GenLayer AI validators for unbiased ranking.
             </DialogDescription>
          </div>
          <div className="p-8 space-y-6">
            <div className="space-y-3">
              <Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Candidate Profile / Resume Content</Label>
              <Textarea 
                id="resume" 
                placeholder="Paste your professional markdown profile or text resume here..." 
                className="min-h-[250px] bg-accent/30 border-white/5 rounded-2xl p-6 italic text-sm leading-relaxed scrollbar-hide focus-visible:ring-primary/20"
              />
            </div>
            <div className="bg-accent/50 p-6 rounded-2xl border border-white/5 flex items-center gap-6">
               <div className="flex-1 space-y-1">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5" /> AI Consent
                  </h4>
                  <p className="text-[10px] text-muted-foreground leading-normal">By submitting, you agree to decentralized AI-agent screening. Rankings are strictly based on requirements.</p>
               </div>
               <Button 
                  size="lg"
                  className="rounded-xl px-10 h-14 font-black tracking-tighter" 
                  onClick={() => {
                    const txt = (document.getElementById('resume') as HTMLTextAreaElement).value;
                    if (!txt) return toast.error('Please enter profile details');
                    handleApply(selectedJob.id, txt);
                    setIsApplying(false);
                  }}
                >
                  START AI SCREENING
                </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isPosting} onOpenChange={setIsPosting}>
        <DialogContent className="sm:max-w-2xl bg-background border-white/10 rounded-[2rem] p-0 overflow-hidden">
          <div className="bg-accent p-8 border-b border-white/10">
             <DialogTitle className="text-3xl font-light tracking-tight">New Job Posting</DialogTitle>
             <DialogDescription className="text-muted-foreground mt-2">
               Configure role parameters and AI ranking instructions.
             </DialogDescription>
          </div>
          <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-[10px] uppercase font-bold tracking-widest">POSITION TITLE</Label>
                <Input id="title" placeholder="e.g. Lead Designer" className="bg-accent/40 border-white/5 rounded-xl h-12" />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] uppercase font-bold tracking-widest">CORE INDUSTRY</Label>
                <Select defaultValue="Tech">
                  <SelectTrigger className="bg-accent/40 border-white/5 rounded-xl h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-white/10">
                    {INDUSTRIES.map(i => <SelectItem key={i.name} value={i.name}>{i.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] uppercase font-bold tracking-widest">JOB DESCRIPTION</Label>
              <Textarea id="desc" placeholder="Responsibilities, perks, and context..." className="bg-accent/20 border-white/5 rounded-xl min-h-[120px]" />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] uppercase font-bold tracking-widest text-primary">SCORING LOGIC & CRITERIA</Label>
              <Textarea 
                id="criteria" 
                placeholder="Give specific instructions to AI validators: 'Candidate must demonstrate high integrity in past projects...'" 
                className="bg-primary/5 border-primary/20 rounded-xl min-h-[100px] text-primary italic placeholder:text-primary/30"
              />
            </div>
          </div>
          <div className="p-6 bg-accent/20 border-t border-white/5 flex justify-end gap-3">
             <Button variant="ghost" onClick={() => setIsPosting(false)} className="rounded-full">Cancel</Button>
             <Button 
                className="rounded-full px-10 h-12 font-bold shadow-lg shadow-primary/10"
                onClick={() => {
                   const title = (document.getElementById('title') as HTMLInputElement).value;
                   const description = (document.getElementById('desc') as HTMLTextAreaElement).value;
                   const criteria = (document.getElementById('criteria') as HTMLTextAreaElement).value;
                   if (!title || !description || !criteria) return toast.error('Please fill all fields');
                   handlePostJob({ title, industry: 'Tech', description, criteria });
                   setIsPosting(false);
                }}
             >
                DEPLOY CONTRACT
             </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function HeroSection({ setRole }: { setRole: any }) {
  return (
    <div className="flex-1 w-full bg-[#0A0B0E] relative flex flex-col items-center justify-center p-8 text-center overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 blur-[150px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none translate-y-1/2 -translate-x-1/2" />
      
      <div className="relative max-w-4xl space-y-12 z-10">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           className="w-20 h-20 bg-primary rounded-3xl mx-auto flex items-center justify-center shadow-2xl shadow-primary/40 rotate-12"
        >
          <Layers className="w-10 h-10 text-black" />
        </motion.div>

        <div className="space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-light tracking-tight text-white leading-none px-4"
          >
            Decentralized <span className="text-primary italic font-medium">Recruitment</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-secondary-foreground font-light max-w-2xl mx-auto leading-relaxed"
          >
            A high-trust infrastructure for the AI age. Erase bias and discover elite talent through validator consensus.
          </motion.p>
        </div>

        <motion.div 
           initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
           className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Button 
            size="lg" 
            className="w-full sm:w-[240px] rounded-[1.5rem] h-20 text-xl font-bold tracking-tight shadow-2xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
            onClick={() => setRole('candidate')}
          >
            CANDIDATE
          </Button>
          <Button 
            variant="outline"
            size="lg" 
            className="w-full sm:w-[240px] rounded-[1.5rem] h-20 text-xl border-white/10 hover:bg-white/5 active:scale-95 transition-all"
            onClick={() => setRole('employer')}
          >
            EMPLOYER
          </Button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-10 pt-10 text-muted-foreground text-xs uppercase tracking-[0.3em] font-bold"
        >
           <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> TRUSTLESS SCREENING</div>
           <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> AI RANKED PIPELINE</div>
           <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> SYMMETRIC INFORMATION</div>
        </motion.div>
      </div>
    </div>
  );
}

function JobCard({ job, onApply }: { job: any, onApply: (job: any) => void }) {
  const Icon = INDUSTRIES.find(i => i.name === job.industry)?.icon || Briefcase;
  
  return (
    <motion.div whileHover={{ scale: 1.02 }} className="group">
      <Card className="h-full rounded-[2rem] border-white/5 bg-accent/40 hover:bg-accent/60 transition-all p-8 flex flex-col gap-6 cursor-pointer">
        <div className="flex justify-between items-start">
           <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 group-hover:rotate-6 transition-transform">
              <Icon className="w-6 h-6" />
           </div>
           <Badge variant="outline" className="rounded-full text-[10px] font-mono border-white/10 text-muted-foreground uppercase px-3">
              {job.industry}
           </Badge>
        </div>
        <div className="space-y-2">
          <CardTitle className="text-2xl font-bold tracking-tight text-white group-hover:text-primary transition-colors">{job.title}</CardTitle>
          <div className="flex items-center text-[10px] text-muted-foreground font-mono uppercase tracking-widest font-bold">
            <Building2 className="w-3 h-3 mr-1.5 text-primary/60" />
            {job.employer}
          </div>
        </div>
        <p className="text-sm text-secondary-foreground line-clamp-3 leading-relaxed font-light">
          {job.description}
        </p>
        <div className="mt-auto space-y-4 pt-4">
           <div className="flex items-center gap-4 text-[10px] uppercase font-bold text-muted-foreground tracking-widest border-t border-white/5 pt-4">
              <span className="flex items-center"><Users className="w-3 h-3 mr-1" /> {job.applicationsCount} applicants</span>
              <span className="flex items-center text-green-500/80"><ShieldCheck className="w-3 h-3 mr-1" /> AI Verified</span>
           </div>
           <Button 
            className="w-full rounded-xl h-14 bg-white text-black hover:bg-primary transition-all font-bold tracking-tight uppercase" 
            onClick={(e) => { e.stopPropagation(); onApply(job); }}
          >
            QUICK APPLY
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}

function ApplicationCard({ application }: { application: any }) {
  return (
    <Card className="rounded-[1.5rem] border-white/5 bg-accent/30 overflow-hidden transition-all hover:bg-accent/40">
      <div className="flex flex-col sm:flex-row">
        <div className="bg-primary/5 p-8 flex flex-col items-center justify-center border-r border-white/5 min-w-[160px]">
          <span className="text-5xl font-mono font-bold text-primary tabular-nums">{application.score}</span>
          <span className="text-[10px] uppercase font-black text-muted-foreground tracking-[0.2em] mt-2">AI MATCH</span>
        </div>
        <div className="p-8 flex-grow space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold tracking-tight">{application.jobTitle}</h3>
            <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5 rounded-full px-4 font-mono font-bold uppercase text-[10px]">
              {application.status}
            </Badge>
          </div>
          <div className="bg-black/20 p-4 rounded-xl border border-white/5">
            <p className="text-sm text-secondary-foreground italic leading-relaxed">&quot;{application.analysis}&quot;</p>
          </div>
          <div className="flex items-center gap-6 text-[9px] text-muted-foreground uppercase font-black tracking-widest">
             <span className="flex items-center gap-1.5"><Trophy className="w-3.5 h-3.5 text-primary" /> Top Tier Match</span>
             <span className="flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5" /> ID: 0x...{application.candidate.slice(-6)}</span>
             <span className="flex items-center gap-1.5 text-green-500"><ShieldCheck className="w-3.5 h-3.5" /> Consensus Locked</span>
          </div>
        </div>
      </div>
    </Card>
  );
}

function CandidateRow({ application, rank }: { application: any, rank: number }) {
  const isTop = rank === 1;
  
  return (
    <div className={`grid grid-cols-6 p-5 items-center transition-all hover:bg-white/5 ${isTop ? 'bg-primary/5' : ''}`}>
       <div className="flex items-center gap-3 pl-4">
          <span className={`font-mono text-lg font-bold ${isTop ? 'text-primary' : 'text-muted-foreground'}`}>{rank.toString().padStart(2, '0')}</span>
          {isTop && <Badge className="bg-primary text-black text-[10px] font-black h-4 px-1 leading-none rounded">TOP</Badge>}
       </div>
       <div className="col-span-3 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-accent border border-white/10 flex items-center justify-center">
             <Users className="w-4 h-4 text-muted-foreground" />
          </div>
          <div className="space-y-0.5">
             <div className="text-sm font-bold text-white uppercase tracking-tight">Candidate-{application.candidate.slice(2, 6)}-{application.candidate.slice(-4)}</div>
             <div className="text-[10px] text-muted-foreground font-mono uppercase bg-white/5 px-1.5 rounded-sm inline-block">ZK-Proof Validated</div>
          </div>
       </div>
       <div className="text-center">
          <span className={`text-xl font-mono font-bold ${isTop ? 'text-primary' : 'text-white'}`}>{application.score}</span>
       </div>
       <div className="text-right pr-4 font-mono text-[10px] text-muted-foreground">
          {application.validators} Nodes
       </div>
    </div>
  );
}
