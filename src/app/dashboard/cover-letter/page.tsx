"use client";

import { useState } from 'react';
import PageContainer from '@/components/layout/page-container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function CoverLetterGeneratorPage() {
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [resumeSummary, setResumeSummary] = useState('');
  const [output, setOutput] = useState('');

  function handleGenerate() {
    // Placeholder generation to scaffold the UI. Replace with API integration later.
    const basic = `Dear Hiring Manager,\n\nI am excited to apply for the ${jobTitle || 'Role'} at ${company || 'your company'}. ${resumeSummary || 'I bring relevant experience and passion for the domain.'}\n\nSincerely,\n[Your Name]`;
    setOutput(basic);
  }

  return (
    <PageContainer>
      <div className="flex flex-1 flex-col space-y-6 py-1">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight mb-0">Cover Letter Generator</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input placeholder="Job title" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />
              <Input placeholder="Company" value={company} onChange={(e) => setCompany(e.target.value)} />
              <Textarea placeholder="Paste your resume summary or highlights" value={resumeSummary} onChange={(e) => setResumeSummary(e.target.value)} />
              <Button type="button" onClick={handleGenerate} className="w-full">Generate</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea value={output} onChange={(e) => setOutput(e.target.value)} className="min-h-[300px]" />
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}


