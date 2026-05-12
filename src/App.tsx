import React, { useState } from 'react';
import { 
  Briefcase, 
  Plus, 
  Search, 
  Menu, 
  X,
  FileText,
  Github,
  Twitter,
  Heart,
  Clock,
  Award,
  Shield,
  ChevronRight,
  LogOut,
  Home,
  Users,
  Settings,
  MessageSquare,
  Share2,
  ExternalLink,
  Layers,
  ShieldCheck,
  Building2,
  Trophy,
  Filter
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Toaster, toast } from 'sonner';

// ============ CONSTANTS ============

const INDUSTRIES = [
  { name: 'Tech', icon: Briefcase, color: 'bg-blue-500' },
  { name: 'Design', icon: Award, color: 'bg-pink-500' },
  { name: 'Marketing', icon: Share2, color: 'bg-purple-500' },
  { name: 'Operations', icon: Settings, color: 'bg-amber-500' },
  { name: 'Other', icon: Home, color: 'bg-gray-500' },
];

const PROJECTS = [
  {
    id: 0,
    name: 'Open Validator Lab',
    logo: 'OV',
    description: 'A trustless protocol for validator tooling and consensus intelligence.',
    mission: 'Enable builders to onboard validators with transparent reputation metrics.',
    stack: ['Rust', 'Solidity', 'AI'],
    contributors: 24,
    trustScore: 94,
    funding: 'Seed',
    socials: {
      twitter: '@openvalidator',
      discord: 'open-validator',
      github: 'open-validator-lab',
      website: 'validator.example'
    }
  },
  {
    id: 1,
    name: 'Collective Studio',
    logo: 'CS',
    description: 'A builder-centric incubator for open-source Web3 infrastructure tooling.',
    mission: 'Create polished contributor experiences for projects and startups.',
    stack: ['Next.js', 'TypeScript', 'GraphQL'],
    contributors: 18,
    trustScore: 88,
    funding: 'Pre-seed',
    socials: {
      twitter: '@collectivestudio',
      discord: 'collective-studio',
      github: 'collective-studio',
      website: 'studio.example'
    }
  },
  {
    id: 2,
    name: 'Dapp Launchpad',
    logo: 'DL',
    description: 'A collaborative launch platform for contributor-led blockchain products.',
    mission: 'Help teams build transparent contributor communities with AI-driven coordination.',
    stack: ['Web3', 'React', 'IPFS'],
    contributors: 31,
    trustScore: 91,
    funding: 'Series A',
    socials: {
      twitter: '@dapplaunch',
      discord: 'dapp-launchpad',
      github: 'dapp-launchpad',
      website: 'launchpad.example'
    }
  }
];

const CONTRIBUTORS = [
  {
    id: 0,
    name: 'Aya Brooks',
    role: 'Full-stack Contributor',
    skills: ['React', 'Rust', 'AI'],
    reputation: '4.9',
    score: 91,
    github: 'aya-brooks',
    endorsements: 12
  },
  {
    id: 1,
    name: 'Noah Kim',
    role: 'Web3 Designer',
    skills: ['Figma', 'UX', 'Brand'],
    reputation: '4.8',
    score: 86,
    github: 'noahkim',
    endorsements: 9
  },
  {
    id: 2,
    name: 'Lina Patel',
    role: 'Protocol Researcher',
    skills: ['Solidity', 'ZK', 'DeFi'],
    reputation: '4.7',
    score: 88,
    github: 'linapatel',
    endorsements: 14
  }
];

// ============ REUSABLE COMPONENTS ============

function TrustBadge({ level }: { level: number }) {
  const getLevelColor = (score: number) => {
    if (score >= 90) return 'bg-emerald-100 text-emerald-700';
    if (score >= 75) return 'bg-blue-100 text-blue-700';
    if (score >= 60) return 'bg-amber-100 text-amber-700';
    return 'bg-gray-100 text-gray-700';
  };
  
  return (
    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getLevelColor(level)}`}>
      {level}% trust
    </span>
  );
}

function SocialLinks({ 
  twitter, 
  github, 
  telegram,
  website 
}: { 
  twitter?: string; 
  github?: string; 
  telegram?: string;
  website?: string;
}) {
  const buildUrl = (value: string, provider: 'github' | 'twitter' | 'telegram') => {
    if (value.startsWith('http')) return value;
    if (provider === 'github') return `https://github.com/${value}`;
    if (provider === 'twitter') return `https://x.com/${value.replace(/^@/, '')}`;
    if (provider === 'telegram') return `https://t.me/${value.replace(/^@/, '')}`;
    return value;
  };

  return (
    <div className="flex items-center gap-3">
      {github && (
        <a
          href={buildUrl(github, 'github')}
          target="_blank"
          rel="noopener noreferrer"
          title="GitHub"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-200 transition-shadow duration-200 shadow-sm hover:shadow-[0_10px_30px_-18px_rgba(109,94,245,0.6)] hover:bg-white/10"
        >
          <Github className="w-5 h-5" />
        </a>
      )}
      {telegram && (
        <a
          href={buildUrl(telegram, 'telegram')}
          target="_blank"
          rel="noopener noreferrer"
          title="Telegram"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-200 transition-shadow duration-200 shadow-sm hover:shadow-[0_10px_30px_-18px_rgba(109,94,245,0.6)] hover:bg-white/10"
        >
          <MessageSquare className="w-5 h-5" />
        </a>
      )}
      {twitter && (
        <a
          href={buildUrl(twitter, 'twitter')}
          target="_blank"
          rel="noopener noreferrer"
          title="X"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-200 transition-shadow duration-200 shadow-sm hover:shadow-[0_10px_30px_-18px_rgba(109,94,245,0.6)] hover:bg-white/10"
        >
          <Twitter className="w-5 h-5" />
        </a>
      )}
      {website && (
        <a
          href={website.startsWith('http') ? website : `https://${website}`}
          target="_blank"
          rel="noopener noreferrer"
          title="Website"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-200 transition-shadow duration-200 shadow-sm hover:shadow-[0_10px_30px_-18px_rgba(109,94,245,0.6)] hover:bg-white/10"
        >
          <ExternalLink className="w-5 h-5" />
        </a>
      )}
    </div>
  );
}

function FeaturedJobCard({ 
  job, 
  isSelected, 
  onClick 
}: { 
  job: any; 
  isSelected: boolean; 
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      className={`w-full text-left rounded-[1.75rem] border transition-all duration-200 ${
        isSelected
          ? 'border-[#6D5EF5] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 shadow-[0_24px_80px_-42px_rgba(109,94,245,0.55)] ring-1 ring-[#6D5EF5]/25'
          : 'border-white/15 bg-slate-950/70 hover:-translate-y-0.5 hover:border-white/25 hover:bg-slate-950/90 hover:shadow-[0_24px_80px_-50px_rgba(15,23,42,0.28)]'
      } p-6`}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="min-w-0">
          <h3 className="font-semibold text-lg text-slate-100 leading-snug line-clamp-2">{job.title}</h3>
          <p className="mt-2 text-base text-slate-300">{job.employer}</p>
        </div>
        {job.is_active && (
          <Badge className="rounded-full bg-emerald-500/12 text-emerald-200 border border-emerald-400/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]">
            Open
          </Badge>
        )}
      </div>
      <div className="flex items-center justify-between text-xs text-slate-300">
        <span className="rounded-full bg-slate-900/70 px-3 py-1 uppercase tracking-[0.24em] text-[10px] text-slate-200">
          {job.category || job.industry}
        </span>
        <ChevronRight className="w-4 h-4 text-[#A78BFA]" />
      </div>
    </motion.button>
  );
}

// ============ SIDEBAR COMPONENT ============

function Sidebar({ 
  jobs, 
  selectedJob, 
  onSelectJob,
  onCreateJob,
  onLogout,
  isOpen,
  onClose,
  searchQuery,
  onSearchChange
}: any) {
  const handleJobSelect = (job: any) => {
    onSelectJob(job);
    if (isOpen) {
      onClose();
    }
  };

  const sidebarContent = (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="shrink-0 p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold text-white">TalentChain</h1>
            <p className="text-xs text-gray-400 mt-1">Builders, projects & open-source</p>
          </div>
          <button onClick={onClose} className="md:hidden text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Search */}
        <div className="shrink-0 px-6 py-4 border-b border-white/10 bg-white/5">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search opportunities"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-11 h-12 rounded-2xl border border-white/10 bg-[#0B1220]/80 text-white placeholder:text-slate-500 focus:border-[#6D5EF5] focus:ring-2 focus:ring-[#6D5EF5]/15"
            />
          </div>
        </div>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
        <div className="p-6 space-y-5">
          <p className="text-xs uppercase font-semibold text-gray-400 tracking-wide">Featured Opportunities</p>
          {jobs.map((job: any) => (
            <FeaturedJobCard
              key={job.id}
              job={job}
              isSelected={selectedJob?.id === job.id}
              onClick={() => handleJobSelect(job)}
            />
          ))}
        </div>
      </div>

      {/* Create Job Button */}
      <div className="shrink-0 p-6 border-t border-gray-200 space-y-3">
        <Button
          onClick={onCreateJob}
          className="w-full bg-[#6D5EF5] hover:bg-[#5A4FD8] text-white rounded-lg h-11 font-semibold flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Post a Job
        </Button>
      </div>

      {/* Creator/Social Section */}
      <div className="shrink-0 p-6 border-t border-gray-200 space-y-3">
        <p className="text-xs uppercase font-semibold text-gray-400 tracking-wide mb-3">Platform Creator</p>
        <div className="space-y-2">
          <p className="text-sm font-semibold text-white">NIMI</p>
          <SocialLinks
            github="https://github.com/nimilol"
            telegram="@nime_101"
            twitter="https://x.com/nimi_101"
          />
        </div>
        <Button
          onClick={onLogout}
          variant="ghost"
          className="w-full text-gray-400 hover:text-white hover:bg-white/5 rounded-lg h-10 justify-start gap-2"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/50 md:hidden z-40"
            />
            <motion.div
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: 'spring', stiffness: 260, damping: 30 }}
              className="fixed inset-y-0 left-0 z-50 w-[min(92vw,20rem)] max-w-[20rem] bg-[#0F131B] border-r border-white/10 shadow-2xl shadow-black/30 flex flex-col h-screen md:hidden"
            >
              {sidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="hidden md:flex md:flex-col md:fixed md:inset-y-0 md:left-0 md:w-80 md:bg-[#0F131B] md:border-r md:border-white/10 md:h-screen">
        {sidebarContent}
      </div>
    </>
  );
}

// ============ JOB DETAIL COMPONENT ============

function JobDetail({ job, onApply, onVolunteer }: any) {
  const [activeTab, setActiveTab] = useState<'overview' | 'apply' | 'volunteer'>('overview');

  if (!job) {
    return (
      <div className="flex-1 overflow-y-auto bg-slate-950">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top_left,_rgba(109,94,245,0.18),_transparent_35%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-[radial-gradient(circle_at_bottom_right,_rgba(87,212,255,0.14),_transparent_30%)]" />
        <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-2xl flex-col items-center justify-center px-6 py-20 text-center">
          <div className="rounded-[2rem] border border-white/10 bg-slate-900/95 backdrop-blur-xl p-12 shadow-[0_30px_80px_-50px_rgba(0,0,0,0.45)]">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-[#1F2133] text-[#8B84FF] shadow-[0_20px_70px_-40px_rgba(109,94,245,0.35)]">
              <Briefcase className="w-10 h-10" />
            </div>
            <p className="text-sm uppercase tracking-[0.4em] text-slate-400 mb-4">TalentChain</p>
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">Select a role to explore details</h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-300">
              Discover premium Web3 opportunities, review role details, and apply with confidence. The sidebar keeps exploration fast and focused.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50">
      {/* Header */}
      <div className="border-b border-slate-200/60 bg-gradient-to-br from-slate-50 via-slate-50 to-[#6D5EF5]/3">
        <div className="mx-auto max-w-5xl px-8 py-10">
          <div className="mb-5 flex items-start justify-between gap-6">
            <div className="flex-1 min-w-0">
              <h1 className="text-5xl font-bold tracking-tight text-slate-900 mb-3">{job.title}</h1>
              <p className="text-lg text-slate-600 font-medium">{job.employer}</p>
            </div>
            {job.is_active && (
              <Badge className="rounded-full px-4 py-2 text-sm bg-emerald-100/90 text-emerald-700 border-0 font-semibold">
                Open
              </Badge>
            )}
          </div>
          <p className="text-lg leading-relaxed text-slate-700">{job.description}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200/60 bg-white sticky top-0 z-10">
        <div className="mx-auto max-w-5xl px-8">
          <div className="flex gap-10">
            {['overview', 'apply', 'volunteer'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`py-4 px-1 border-b-2 font-semibold text-sm uppercase tracking-wider transition-colors duration-200 ${
                  activeTab === tab
                    ? 'border-[#6D5EF5] text-[#6D5EF5]'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-5xl px-8 py-10">
        {activeTab === 'overview' && (
          <div className="space-y-12">
            <section>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">About This Role</h2>
              <p className="text-base leading-8 text-slate-700 whitespace-pre-wrap">{job.description}</p>
            </section>

            <section>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Requirements</h2>
              <p className="text-base leading-8 text-slate-700 whitespace-pre-wrap">{job.criteria}</p>
            </section>

            <div className="grid grid-cols-3 gap-6 rounded-2xl border border-slate-200/50 bg-gradient-to-br from-white to-slate-50/50 p-8">
              <div className="space-y-2">
                <p className="text-xs uppercase font-bold text-slate-500 tracking-wider">Category</p>
                <p className="text-2xl font-bold text-slate-900">{job.industry}</p>
              </div>
              <div className="space-y-2">
                <p className="text-xs uppercase font-bold text-slate-500 tracking-wider">Status</p>
                <p className="text-2xl font-bold text-emerald-600">Active</p>
              </div>
              <div className="space-y-2">
                <p className="text-xs uppercase font-bold text-slate-500 tracking-wider">Applications</p>
                <p className="text-2xl font-bold text-slate-900">{job.applicationsCount}</p>
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <Button
                onClick={() => onApply(job)}
                className="flex-1 bg-[#6D5EF5] hover:bg-[#5A4FD8] text-white rounded-xl h-14 font-bold text-base shadow-lg shadow-[#6D5EF5]/25 transition-all hover:shadow-xl hover:shadow-[#6D5EF5]/35"
              >
                Apply Now
              </Button>
              <Button
                onClick={() => onVolunteer(job)}
                className="flex-1 border-2 border-[#57D4FF] text-[#57D4FF] hover:bg-[#57D4FF]/10 rounded-xl h-14 font-bold text-base transition-all"
              >
                Volunteer Instead
              </Button>
            </div>
          </div>
        )}

        {activeTab === 'apply' && (
          <ApplicationForm job={job} onSubmit={onApply} />
        )}

        {activeTab === 'volunteer' && (
          <VolunteerForm job={job} onSubmit={onVolunteer} />
        )}
      </div>
    </div>
  );
}

// ============ APPLICATION FORM ============

function ApplicationForm({ job, onSubmit }: any) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: '',
    role: job.title,
    skills: '',
    experience: '',
    portfolio: '',
    github: '',
    twitter: '',
    motivation: '',
    availability: '',
    openSourceExp: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast.error('Please fill in required fields');
      return;
    }
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 2000)),
      {
        loading: 'Submitting your application...',
        success: 'Application submitted successfully!',
        error: 'Failed to submit application'
      }
    );
    onSubmit(job, formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-12 max-w-3xl pb-12">
      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-8">Basic Information</h2>
        <div className="space-y-6">
          <div>
            <Label className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3 block">Full Name *</Label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="h-12 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-[#6D5EF5] focus:ring-2 focus:ring-[#6D5EF5]/10"
              placeholder="Your full name"
            />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3 block">Email *</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="h-12 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-[#6D5EF5] focus:ring-2 focus:ring-[#6D5EF5]/10"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <Label className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3 block">Country/Timezone</Label>
              <Input
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className="h-12 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-[#6D5EF5] focus:ring-2 focus:ring-[#6D5EF5]/10"
                placeholder="e.g., UTC-8"
              />
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-8">Professional Background</h2>
        <div className="space-y-6">
          <div>
            <Label className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3 block">Skills</Label>
            <Textarea
              value={formData.skills}
              onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
              className="rounded-lg border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-[#6D5EF5] focus:ring-2 focus:ring-[#6D5EF5]/10"
              placeholder="List your skills, separated by commas"
              rows={3}
            />
          </div>
          <div>
            <Label className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3 block">Years of Experience</Label>
            <Input
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              className="h-12 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-[#6D5EF5] focus:ring-2 focus:ring-[#6D5EF5]/10"
              placeholder="e.g., 5 years"
            />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3 block">GitHub</Label>
              <Input
                value={formData.github}
                onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                className="h-12 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-[#6D5EF5] focus:ring-2 focus:ring-[#6D5EF5]/10"
                placeholder="github.com/username"
              />
            </div>
            <div>
              <Label className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3 block">X/Twitter</Label>
              <Input
                value={formData.twitter}
                onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                className="h-12 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-[#6D5EF5] focus:ring-2 focus:ring-[#6D5EF5]/10"
                placeholder="@username"
              />
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-8">Tell Us About You</h2>
        <div className="space-y-6">
          <div>
            <Label className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3 block">Why do you want to join this project?</Label>
            <Textarea
              value={formData.motivation}
              onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
              className="rounded-lg border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-[#6D5EF5] focus:ring-2 focus:ring-[#6D5EF5]/10"
              placeholder="Share your motivation and what excites you about this role..."
              rows={4}
            />
          </div>
          <div>
            <Label className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3 block">Availability</Label>
            <Input
              value={formData.availability}
              onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
              className="h-12 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-[#6D5EF5] focus:ring-2 focus:ring-[#6D5EF5]/10"
              placeholder="e.g., Full-time, Part-time, Contract"
            />
          </div>
          <div>
            <Label className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3 block">Open-source experience</Label>
            <Textarea
              value={formData.openSourceExp}
              onChange={(e) => setFormData({ ...formData, openSourceExp: e.target.value })}
              className="rounded-lg border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-[#6D5EF5] focus:ring-2 focus:ring-[#6D5EF5]/10"
              placeholder="Tell us about your open-source contributions..."
              rows={3}
            />
          </div>
        </div>
      </section>

      <div className="flex gap-4 pt-8 border-t border-slate-200">
        <Button
          type="submit"
          className="flex-1 bg-[#6D5EF5] hover:bg-[#5A4FD8] text-white rounded-xl h-14 font-bold text-base shadow-lg shadow-[#6D5EF5]/25 transition-all hover:shadow-xl hover:shadow-[#6D5EF5]/35"
        >
          Submit Application
        </Button>
      </div>
    </form>
  );
}

// ============ VOLUNTEER FORM ============

function VolunteerForm({ job, onSubmit }: any) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    duration: '',
    motivation: '',
    learningGoals: '',
    github: '',
    skills: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast.error('Please fill in required fields');
      return;
    }
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 2000)),
      {
        loading: 'Processing your volunteer request...',
        success: 'Volunteer request submitted!',
        error: 'Failed to submit request'
      }
    );
    onSubmit(job, formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-12 max-w-3xl pb-12">
      <section className="rounded-2xl border border-[#57D4FF]/20 bg-gradient-to-br from-[#57D4FF]/5 to-transparent p-8">
        <h3 className="text-lg font-bold text-[#57D4FF] mb-3 uppercase tracking-wide">Open-Source First</h3>
        <p className="text-base leading-7 text-slate-700">Contribute to this project as a volunteer without meeting all formal requirements. Perfect for building experience and learning while making a real impact.</p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-8">About You</h2>
        <div className="space-y-6">
          <div>
            <Label className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3 block">Full Name *</Label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="h-12 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-[#57D4FF] focus:ring-2 focus:ring-[#57D4FF]/10"
              placeholder="Your full name"
            />
          </div>
          <div>
            <Label className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3 block">Email *</Label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="h-12 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-[#57D4FF] focus:ring-2 focus:ring-[#57D4FF]/10"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <Label className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3 block">GitHub Username</Label>
            <Input
              value={formData.github}
              onChange={(e) => setFormData({ ...formData, github: e.target.value })}
              className="h-12 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-[#57D4FF] focus:ring-2 focus:ring-[#57D4FF]/10"
              placeholder="github.com/username"
            />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-slate-900 mb-8">Your Contribution</h2>
        <div className="space-y-6">
          <div>
            <Label className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3 block">Desired Duration</Label>
            <Input
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              className="h-12 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-[#57D4FF] focus:ring-2 focus:ring-[#57D4FF]/10"
              placeholder="e.g., 3 months, Part-time"
            />
          </div>
          <div>
            <Label className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3 block">Your Skills</Label>
            <Textarea
              value={formData.skills}
              onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
              className="rounded-lg border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-[#57D4FF] focus:ring-2 focus:ring-[#57D4FF]/10"
              placeholder="What skills do you have? (doesn't have to be complete)"
              rows={3}
            />
          </div>
          <div>
            <Label className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3 block">Why volunteer for this project?</Label>
            <Textarea
              value={formData.motivation}
              onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
              className="rounded-lg border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-[#57D4FF] focus:ring-2 focus:ring-[#57D4FF]/10"
              placeholder="Share why you're interested in contributing..."
              rows={4}
            />
          </div>
          <div>
            <Label className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3 block">What do you want to learn?</Label>
            <Textarea
              value={formData.learningGoals}
              onChange={(e) => setFormData({ ...formData, learningGoals: e.target.value })}
              className="rounded-lg border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-[#57D4FF] focus:ring-2 focus:ring-[#57D4FF]/10"
              placeholder="Describe your learning goals and what you hope to achieve..."
              rows={3}
            />
          </div>
        </div>
      </section>

      <div className="flex gap-4 pt-8 border-t border-slate-200">
        <Button
          type="submit"
          className="flex-1 bg-[#57D4FF] hover:bg-[#40B8DD] text-white rounded-xl h-14 font-bold text-base shadow-lg shadow-[#57D4FF]/25 transition-all hover:shadow-xl hover:shadow-[#57D4FF]/35"
        >
          Submit Volunteer Request
        </Button>
      </div>
    </form>
  );
}

// ============ CREATE JOB FORM ============

function CreateJobForm({ onSubmit }: any) {
  const [formData, setFormData] = useState({
    title: '',
    employer: '',
    category: 'Tech',
    description: '',
    requirements: '',
    compensation: '',
    compType: 'Salary',
    duration: '',
    orgName: '',
    orgEmail: '',
    twitter: '',
    discord: '',
    github: '',
    website: '',
    projectDesc: '',
    projectGoals: '',
    hiringType: 'Full-time'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.employer || !formData.description) {
      toast.error('Please fill in required fields');
      return;
    }
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 2000)),
      {
        loading: 'Creating job posting...',
        success: 'Job posted successfully!',
        error: 'Failed to create job posting'
      }
    );
    onSubmit(formData);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-white">
      <div className="max-w-4xl mx-auto px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Post a New Job</h1>
        <p className="text-gray-600 mb-8">Help the open-source community find opportunities to contribute.</p>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Organization Info */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Organization Information</h3>
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-semibold text-gray-700 mb-2 block">Organization Name *</Label>
                <Input
                  value={formData.orgName}
                  onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
                  className="border-gray-300"
                  placeholder="Your organization or project name"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-semibold text-gray-700 mb-2 block">Email *</Label>
                  <Input
                    type="email"
                    value={formData.orgEmail}
                    onChange={(e) => setFormData({ ...formData, orgEmail: e.target.value })}
                    className="border-gray-300"
                    placeholder="contact@organization.com"
                  />
                </div>
                <div>
                  <Label className="text-sm font-semibold text-gray-700 mb-2 block">Website</Label>
                  <Input
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="border-gray-300"
                    placeholder="yoursite.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700 mb-2 block">Social Links</Label>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    value={formData.twitter}
                    onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                    className="border-gray-300"
                    placeholder="Twitter handle"
                  />
                  <Input
                    value={formData.github}
                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                    className="border-gray-300"
                    placeholder="GitHub org/username"
                  />
                  <Input
                    value={formData.discord}
                    onChange={(e) => setFormData({ ...formData, discord: e.target.value })}
                    className="border-gray-300"
                    placeholder="Discord server"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Project Info */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Project Information</h3>
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-semibold text-gray-700 mb-2 block">Project Description *</Label>
                <Textarea
                  value={formData.projectDesc}
                  onChange={(e) => setFormData({ ...formData, projectDesc: e.target.value })}
                  className="border-gray-300"
                  placeholder="What is your project about?"
                  rows={4}
                />
              </div>
              <div>
                <Label className="text-sm font-semibold text-gray-700 mb-2 block">Project Goals</Label>
                <Textarea
                  value={formData.projectGoals}
                  onChange={(e) => setFormData({ ...formData, projectGoals: e.target.value })}
                  className="border-gray-300"
                  placeholder="What are your short and long-term goals?"
                  rows={3}
                />
              </div>
            </div>
          </div>

          {/* Job Details */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Job Details</h3>
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-semibold text-gray-700 mb-2 block">Job Title *</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="border-gray-300"
                  placeholder="e.g., Senior Frontend Engineer"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-semibold text-gray-700 mb-2 block">Category</Label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option>Tech</option>
                    <option>Design</option>
                    <option>Marketing</option>
                    <option>Operations</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <Label className="text-sm font-semibold text-gray-700 mb-2 block">Hiring Type</Label>
                  <select
                    value={formData.hiringType}
                    onChange={(e) => setFormData({ ...formData, hiringType: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Contract</option>
                    <option>Volunteer</option>
                  </select>
                </div>
              </div>
              <div>
                <Label className="text-sm font-semibold text-gray-700 mb-2 block">Job Description *</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="border-gray-300"
                  placeholder="Describe the role, responsibilities, and team..."
                  rows={5}
                />
              </div>
              <div>
                <Label className="text-sm font-semibold text-gray-700 mb-2 block">Requirements</Label>
                <Textarea
                  value={formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                  className="border-gray-300"
                  placeholder="Required skills, experience, qualifications..."
                  rows={4}
                />
              </div>
            </div>
          </div>

          {/* Compensation */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Compensation & Timeline</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-semibold text-gray-700 mb-2 block">Compensation Type</Label>
                  <select
                    value={formData.compType}
                    onChange={(e) => setFormData({ ...formData, compType: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option>Salary</option>
                    <option>Equity</option>
                    <option>Bounty</option>
                    <option>Volunteer</option>
                  </select>
                </div>
                <div>
                  <Label className="text-sm font-semibold text-gray-700 mb-2 block">Amount</Label>
                  <Input
                    value={formData.compensation}
                    onChange={(e) => setFormData({ ...formData, compensation: e.target.value })}
                    className="border-gray-300"
                    placeholder="e.g., $80k - $120k"
                  />
                </div>
              </div>
              <div>
                <Label className="text-sm font-semibold text-gray-700 mb-2 block">Expected Timeline</Label>
                <Input
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="border-gray-300"
                  placeholder="e.g., Immediate start, 3-month contract"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-6 border-t border-gray-200">
            <Button
              type="submit"
              className="flex-1 bg-[#6D5EF5] hover:bg-[#5A4FD8] text-white rounded-lg h-12 font-semibold"
            >
              Publish Job Posting
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ============ HELPER COMPONENTS ============

function StatCard({ title, value, label, icon: Icon }: { title: string; value: string; label: string; icon: React.ComponentType<any>; }) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-accent/30 p-6 shadow-[0_24px_80px_-64px_rgba(0,0,0,0.85)] backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-3">
          <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-semibold">{title}</p>
          <h3 className="text-3xl font-semibold tracking-tight text-white">{value}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{label}</p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-white/5 border border-white/10 text-primary">
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: any }) {
  return (
    <Card className="rounded-[2rem] border border-white/10 bg-[#0F131B] p-6 shadow-[0_24px_80px_-60px_rgba(0,0,0,0.8)] hover:border-[#6D5EF5]/30 hover:bg-[#121726] transition-all">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-[#6D5EF5]/15 text-[#6D5EF5] font-bold shadow-sm">{project.logo}</div>
          <div>
            <h3 className="text-lg font-semibold text-white">{project.name}</h3>
            <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
          </div>
        </div>
        <Badge className="rounded-full bg-white/5 border-white/10 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{project.funding}</Badge>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
        <div className="rounded-3xl bg-white/5 p-3">{project.contributors} contributors</div>
        <div className="rounded-3xl bg-white/5 p-3">Trust {project.trustScore}%</div>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {project.stack.map((tech: string) => (
          <span key={tech} className="rounded-full bg-white/5 px-3 py-1 text-[10px] text-muted-foreground">{tech}</span>
        ))}
      </div>
      <div className="mt-5 grid grid-cols-2 gap-2">
        <a className="rounded-2xl bg-white/5 px-4 py-3 text-[10px] uppercase tracking-[0.25em] text-[#57D4FF] hover:bg-[#57D4FF]/10 transition" href="#">GitHub</a>
        <a className="rounded-2xl bg-white/5 px-4 py-3 text-[10px] uppercase tracking-[0.25em] text-[#6D5EF5] hover:bg-[#6D5EF5]/10 transition" href="#">Discord</a>
      </div>
    </Card>
  );
}

function ContributorCard({ contributor }: { contributor: any }) {
  return (
    <Card className="rounded-[2rem] border border-white/10 bg-[#0F131B] p-6 shadow-[0_24px_80px_-60px_rgba(0,0,0,0.8)] hover:bg-[#121726] transition-all">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-primary">{contributor.role}</p>
          <h3 className="text-xl font-semibold text-white mt-2">{contributor.name}</h3>
        </div>
        <div className="rounded-3xl bg-white/5 px-3 py-2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Score {contributor.score}%</div>
      </div>
      <p className="text-sm text-muted-foreground mt-4 leading-6">Reputation {contributor.reputation} · {contributor.endorsements} endorsements</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {contributor.skills.map((skill: string) => (
          <span key={skill} className="rounded-full bg-white/5 px-3 py-1 text-[10px] text-muted-foreground">{skill}</span>
        ))}
      </div>
      <div className="mt-5 flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
        <span>GitHub</span>
        <span className="text-[#57D4FF]">{contributor.github}</span>
      </div>
    </Card>
  );
}

function JobCard({ job, onApply, onSelect }: { job: any; onApply: (job: any) => void; onSelect: (job: any) => void; }) {
  const Icon = INDUSTRIES.find((i: any) => i.name === job.industry)?.icon || Briefcase;
  const confidence = 76 + (job.id % 3) * 6;
  
  return (
    <motion.div whileHover={{ y: -3 }} className="group cursor-pointer" onClick={() => onSelect(job)}>
      <Card className="h-full rounded-[2rem] border border-white/10 bg-accent/20 hover:bg-accent/40 transition-all p-8 flex flex-col gap-6 shadow-[0_24px_60px_-40px_rgba(0,0,0,0.9)]">
        <div className="flex justify-between items-start gap-4">
           <div className="w-12 h-12 rounded-3xl bg-gradient-to-br from-primary/20 to-transparent flex items-center justify-center text-primary border border-primary/20 group-hover:scale-105 transition-all">
              <Icon className="w-6 h-6" />
           </div>
           <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">{job.industry}</span>
        </div>
        <div className="space-y-2">
          <CardTitle className="text-2xl font-semibold tracking-tight text-white group-hover:text-primary transition-colors">{job.title}</CardTitle>
          <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.28em] font-semibold text-muted-foreground">
            <Building2 className="w-3 h-3 text-primary/70" />
            {job.employer}
          </div>
        </div>
        <p className="text-sm text-secondary-foreground leading-relaxed line-clamp-3">{job.description}</p>
        <div className="mt-auto space-y-4 pt-4">
           <div className="grid grid-cols-2 gap-3 text-[10px] uppercase tracking-[0.24em] text-muted-foreground font-semibold border-t border-white/10 pt-4">
              <span className="flex items-center gap-2"><Users className="w-3 h-3" /> {job.applicationsCount} applicants</span>
              <span className="flex items-center gap-2 text-green-400"><ShieldCheck className="w-3 h-3" /> {confidence}% AI score</span>
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

// ============ MAIN APP ============

export default function App() {
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'jobs' | 'create'>('jobs');
  const [searchQuery, setSearchQuery] = useState('');
  const [jobs, setJobs] = useState<any[]>([
    {
      id: 0,
      title: 'Senior Blockchain Engineer',
      employer: 'Open Validator Lab',
      category: 'Tech',
      description: 'Looking for an expert in L2 scaling and AI-agents to help build trustless validator infrastructure.',
      criteria: 'Strong Rust/Solidity knowledge. ZK-proof experience preferred. 5+ years blockchain development.',
      is_active: true,
      applicationsCount: 12,
      compensation: '$150k - $200k',
      compType: 'Salary',
      hiringType: 'Full-time',
      trustScore: 94
    },
    {
      id: 1,
      title: 'Frontend Engineer (React)',
      employer: 'Collective Studio',
      category: 'Tech',
      description: 'Build beautiful, responsive interfaces for our Web3 builder platform using Next.js and React.',
      criteria: 'React, TypeScript, Tailwind CSS required. Web3.js or ethers.js experience helpful.',
      is_active: true,
      applicationsCount: 8,
      compensation: '$100k - $140k',
      compType: 'Salary',
      hiringType: 'Full-time',
      trustScore: 88
    },
    {
      id: 2,
      title: 'Product Designer',
      employer: 'Dapp Launchpad',
      category: 'Design',
      description: 'Design the core experience for a collaborative Web3 product launch platform. Shape how builders collaborate.',
      criteria: 'Figma expertise, Web3 UX understanding, portfolio required. Open-source experience a plus.',
      is_active: true,
      applicationsCount: 5,
      compensation: '$80k - $120k',
      compType: 'Salary',
      hiringType: 'Full-time',
      trustScore: 91
    },
    {
      id: 3,
      title: 'DevOps Engineer',
      employer: 'Open Validator Lab',
      category: 'Tech',
      description: 'Scale infrastructure for decentralized systems. Work with Kubernetes, Docker, and distributed systems.',
      criteria: 'Kubernetes, Docker, AWS/GCP expertise. Familiar with blockchain infrastructure.',
      is_active: true,
      applicationsCount: 3,
      compensation: '$120k - $160k',
      compType: 'Salary',
      hiringType: 'Full-time',
      trustScore: 94
    },
    {
      id: 4,
      title: 'Community Manager',
      employer: 'Collective Studio',
      category: 'Operations',
      description: 'Build and nurture our open-source contributor community. Shape our culture and engagement.',
      criteria: 'Community building experience, Discord moderation, strong communication skills.',
      is_active: true,
      applicationsCount: 6,
      compensation: '$60k - $90k',
      compType: 'Salary',
      hiringType: 'Full-time',
      trustScore: 88
    }
  ]);

  const handleApply = (job: any) => {
    setSelectedJob(job);
    toast.success('Application started! Fill out your details.');
  };

  const handleVolunteer = (job: any) => {
    setSelectedJob(job);
    toast.success('Volunteer form opened!');
  };

  const handleCreateJob = (formData: any) => {
    const newJob = {
      id: jobs.length,
      title: formData.title,
      employer: formData.orgName,
      category: formData.category,
      description: formData.description,
      criteria: formData.requirements,
      is_active: true,
      applicationsCount: 0,
      compensation: formData.compensation,
      compType: formData.compType,
      hiringType: formData.hiringType,
      trustScore: 85
    };
    setJobs([...jobs, newJob]);
    setCurrentView('jobs');
    setSelectedJob(newJob);
    toast.success('Job posted successfully!');
  };

  const handleLogout = () => {
    toast.success('Signed out successfully');
    setSelectedJob(null);
    setCurrentView('jobs');
  };

  return (
    <div className="h-screen bg-white flex overflow-hidden relative">
      <Toaster />

      {/* Mobile top bar */}
      <div className="fixed inset-x-0 top-0 z-30 md:hidden border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="inline-flex h-12 w-12 items-center justify-center rounded-3xl border border-slate-200/80 bg-slate-950 text-white shadow-[0_14px_30px_-20px_rgba(15,23,42,0.45)] transition hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6D5EF5]/40"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="text-center">
            <p className="text-sm font-semibold text-slate-900">TalentChain</p>
            <p className="text-[11px] text-slate-500">
              {currentView === 'create'
                ? 'Post a Job'
                : selectedJob?.title || 'Browse jobs'}
            </p>
          </div>
          <div className="w-12" />
        </div>
      </div>

      {/* Sidebar */}
      <Sidebar
        jobs={jobs.filter(j =>
          j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          j.employer.toLowerCase().includes(searchQuery.toLowerCase())
        )}
        selectedJob={selectedJob}
        onSelectJob={setSelectedJob}
        onCreateJob={() => {
          setCurrentView('create');
          setIsSidebarOpen(false);
        }}
        onLogout={handleLogout}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Content */}
      <div className="flex-1 min-h-0 overflow-y-auto md:pl-80 pt-16 md:pt-0 bg-slate-50">
        {currentView === 'jobs' ? (
          <JobDetail
            job={selectedJob}
            onApply={handleApply}
            onVolunteer={handleVolunteer}
          />
        ) : (
          <CreateJobForm onSubmit={handleCreateJob} />
        )}
      </div>
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
            className="text-6xl md:text-8xl font-semibold tracking-tight text-white leading-none px-4"
          >
            Decentralized talent coordination for <span className="text-[#6D5EF5] italic font-medium">builders</span> and Web3 teams.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed"
          >
            A collaborative ecosystem for open-source contributors, AI-native evaluation, and validator-backed reputation.
          </motion.p>
        </div>

        <motion.div 
           initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
           className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Button 
            size="lg" 
            className="w-full sm:w-[260px] rounded-[1.5rem] h-20 text-xl font-semibold tracking-tight shadow-2xl shadow-[#6D5EF5]/20 hover:scale-105 active:scale-95 transition-all"
            onClick={() => setRole('candidate')}
          >
            CONTRIBUTOR
          </Button>
          <Button 
            variant="outline"
            size="lg" 
            className="w-full sm:w-[260px] rounded-[1.5rem] h-20 text-xl border-white/10 text-white hover:bg-white/10 active:scale-95 transition-all"
            onClick={() => setRole('employer')}
          >
            PROJECT
          </Button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-10 pt-10 text-muted-foreground text-xs uppercase tracking-[0.3em] font-bold"
        >
          <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> BUILDER-FIRST NETWORK</div>
          <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> AI-SCORED CONTRIBUTIONS</div>
          <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> OPEN PROJECT INSIGHTS</div>
        </motion.div>
      </div>
    </div>
  );
}

function SidebarContent({
  searchQuery,
  jobs,
  selectedJobId,
  onSelectJob,
  jobSections,
  selectedSection,
  onSectionChange,
  newSection,
  onNewSectionChange,
  onAddSection,
}: {
  searchQuery: string;
  jobs: any[];
  selectedJobId?: number;
  onSelectJob?: (job: any) => void;
  jobSections?: string[];
  selectedSection?: string;
  onSectionChange?: (value: string | null) => void;
  newSection?: string;
  onNewSectionChange?: (value: string) => void;
  onAddSection?: (section: string) => void;
}) {
  const filteredJobs = searchQuery ? jobs.filter(j => j.title.toLowerCase().includes(searchQuery.toLowerCase()) || j.industry.toLowerCase().includes(searchQuery.toLowerCase())) : jobs.slice(0, 3);

  return (
    <>
      <section className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground font-semibold">Featured Jobs</p>
            <p className="text-[11px] text-secondary-foreground mt-2">Curated roles ranked by AI relevance and validator impact.</p>
          </div>
          <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-[9px] uppercase tracking-[0.35em] text-muted-foreground">Live</span>
        </div>

        <div className="space-y-3">
          {filteredJobs.map((job) => (
            <button
              key={job.id}
              onClick={() => onSelectJob?.(job)}
              className={`w-full text-left rounded-3xl border px-4 py-4 transition-all ${
                selectedJobId === job.id 
                  ? 'bg-primary/15 border-primary/30 text-primary' 
                  : 'border-white/5 bg-white/5/5 text-secondary-foreground hover:border-white/10 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-semibold text-sm leading-tight">{job.title}</p>
                  <p className="text-[10px] uppercase font-mono tracking-[0.3em] text-muted-foreground mt-1">{job.industry}</p>
                </div>
                <Badge variant="outline" className="rounded-full px-3 py-1 text-[9px] border-white/10 text-muted-foreground bg-white/5">
                  {job.applicationsCount}
                </Badge>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="mt-6 rounded-[2rem] border border-white/10 bg-accent/20 p-5 shadow-[0_20px_60px_-50px_rgba(0,0,0,0.8)]">
        <div className="mb-4">
          <p className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground font-semibold">Job Sections</p>
          <p className="text-[11px] text-secondary-foreground mt-2">Organize employer-facing opportunities.</p>
        </div>
        <div className="space-y-4">
          <Select value={selectedSection} onValueChange={(value) => onSectionChange?.(value)}>
            <SelectTrigger className="w-full bg-accent/40 border border-white/10 rounded-xl h-12">
              <SelectValue placeholder="Select a section" />
            </SelectTrigger>
            <SelectContent className="bg-background border-white/10">
              {jobSections?.map((section) => (
                <SelectItem key={section} value={section}>{section}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex gap-2">
            <Input
              value={newSection}
              onChange={(e) => onNewSectionChange?.(e.target.value)}
              placeholder="New section name"
              className="flex-1 rounded-xl bg-accent/40 border-white/10"
            />
            <Button
              className="rounded-xl px-4"
              onClick={() => {
                if (newSection?.trim()) {
                  onAddSection?.(newSection.trim());
                }
              }}
            >
              Add
            </Button>
          </div>
        </div>
      </section>

      <section className="mt-auto">
        <div className="p-4 rounded-[1.75rem] bg-gradient-to-br from-accent to-secondary border border-white/10 shadow-[0_20px_60px_-50px_rgba(0,0,0,0.9)]">
          <div className="flex items-center justify-between mb-3 gap-3">
            <p className="text-[10px] uppercase text-muted-foreground font-semibold tracking-[0.35em]">Validator Status</p>
            <ShieldCheck className="w-4 h-4 text-primary" />
          </div>
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
    </>
  );
}

