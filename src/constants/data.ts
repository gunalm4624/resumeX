import { NavItem } from '@/types';

export type Product = {
  photo_url: string;
  name: string;
  description: string;
  created_at: string;
  price: number;
  id: number;
  category: string;
  updated_at: string;
};

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/dashboard/overview',
    icon: 'dashboard',
    isActive: false,
    shortcut: ['d', 'd'],
    items: [] 
  },
  {
    title: 'Create Resume',
    url: '/dashboard/create-resume',
    icon: 'page',
    shortcut: ['c', 'r'],
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Resume Rewriter',
    url: '/dashboard/resume-rewriter',
    icon: 'post',
    shortcut: ['r', 'r'],
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'ATS Checker',
    url: '/dashboard/ats-checker',
    icon: 'check',
    shortcut: ['a', 'c'],
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Saved Resumes',
    url: '/dashboard/saved-resumes',
    icon: 'page',
    shortcut: ['s', 'r'],
    isActive: false,
    items: [] // No child items
  },
  {
    title: 'Cover Letter Generator',
    url: '/dashboard/cover-letter',
    icon: 'post',
    shortcut: ['s', 'r'],
    isActive: false,
  },
  {
    title: 'Resume To Portfolio Builder',
    url: '/dashboard/portfolio-builder',
    icon: 'laptop',
    shortcut: ['s', 'r'],
    isActive: false,
  },
  {
    title: 'Job Alert Agent',
    url: '/dashboard/job-alert-agent',
    icon: 'bell',
    shortcut: ['s', 'r'],
    isActive: false,
  },
  {
    title: 'Interview Preparation',
    url: '/dashboard/interview-preparation',
    icon: 'help',
    shortcut: ['s', 'r'],
    isActive: false,
  },
  
];

