"use client";

import React, { useEffect, useState } from 'react';
import PageContainer from '@/components/layout/page-container';
import { ScoreChart } from '@/components/ui/radial-charts';
import Image from 'next/image';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import CheckBullet from '/public/assets/Check-Bullet.svg';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, MoveRight, WandSparkles } from 'lucide-react';

export default function AtsCheckerPage() {
  const [openSection, setOpenSection] = useState<string | null>('keywords');
  const [highlighted, setHighlighted] = useState<string | null>(null);

  useEffect(() => {
    if (!openSection) return;
    const id = `detail-${openSection}`;
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setHighlighted(openSection);
      const t = setTimeout(() => setHighlighted(null), 2800);
      return () => clearTimeout(t);
    }
  }, [openSection]);

  const details: Record<string, any> = {
    keywords: {
      title: 'Keyword Match',
      status: 'needs-improvement',
      summary:
        "Having an error-free, keyword-rich resume is key to making a strong first impression on both the ATS and the hiring manager.",
      subSections: [
        {
          title: "JD Keywords Found",
          goingWell: [
            "Resume includes several key JD keywords."
          ],
          needsImprovement: [
            "Some important JD keywords are missing."
          ],
        },
        {
          title: "Missing Keywords",
          goingWell: [],
          needsImprovement: [
            "Two critical keywords from the job description are missing.",
            "Consider reviewing the JD for additional relevant terms."
          ],
        },
        {
          title: "Keyword Frequency",
          goingWell: [
            "Relevant keywords appear with appropriate frequency."
          ],
          needsImprovement: [
            "Some keywords could be included more frequently."
          ],
        },
      ],
    },
    structure: {
      title: 'Resume Structure & Formatting',
      status: 'going-well',
      summary:
        'A well-structured resume with consistent formatting enhances both ATS readability and recruiter experience.',
      subSections: [
        {
          title: 'Section Order',
          goingWell: [
            'Sections are in logical order.',
            'Major sections are clearly separated.'
          ],
          needsImprovement: [
            'Consider reordering sections for better emphasis.'
          ],
        },
        {
          title: 'Consistent Formatting',
          goingWell: [
            'Formatting is consistent throughout.'
          ],
          needsImprovement: [
            'Minor inconsistencies in bullet alignment or spacing.'
          ],
        },
      ],
    },
    skills: {
      title: 'Skills & Experience Alignment',
      status: 'needs-improvement',
      summary:
        'Skills should directly align with job requirements and be backed by measurable outcomes.',
      subSections: [
        {
          title: 'Skill Match',
          goingWell: [
            'Key required skills are present.'
          ],
          needsImprovement: [
            'Some relevant skills from the job description are missing.'
          ],
        },
        {
          title: 'Experience Impact',
          goingWell: [
            'Experience highlights relevant achievements.'
          ],
          needsImprovement: [
            'Achievements could be described with stronger impact.'
          ],
        },
      ],
    },
    language: {
      title: 'Language & Readability',
      status: 'going-well',
      summary:
        'Concise, action-driven language helps recruiters quickly assess your impact and fit.',
      subSections: [
        {
          title: 'Readability Score',
          goingWell: [
            'Resume is easy to read and scan.'
          ],
          needsImprovement: [
            'Some sentences could be simplified.'
          ],
        },
        {
          title: 'Tone & Clarity',
          goingWell: [
            'Professional and clear tone throughout.'
          ],
          needsImprovement: [
            'Clarity could be improved in some descriptions.'
          ],
        },
      ],
    },
  };

  return (
    <PageContainer>
      <div className="flex flex-1 flex-col space-y-6 py-1">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight mb-0">ATS Checker</h2>
        </div>

        <div className="w-full flex-1 min-h-0">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-x-6 gap-y-0 h-full min-h-0">
            <div className="col-span-5 lg:col-span-2 flex flex-col gap-4">
              <div className="bg-gray-50 rounded-lg p-6 h-fit space-y-4">
                <div className="text-lg font-medium mb-2">ATS Overview</div>
                <ScoreChart/>
                <div className="bg-white rounded-lg p-2 border border-gray-300 flex items-center space-x-4">
                  <div className='w-20 h-20 bg-gray-100 flex items-center justify-center rounded-lg'>
                    <Image src="/assets/ATS-Cup.png" alt="Description" width={60} height={60} />
                  </div>
                  <div className='flex flex-col space-y-1'>
                     <h1 className="text-lg font-medium">ATS Overview</h1>
                     <p className="text-sm text-gray-600">Your resume is optimized for maximum visibility</p>
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="primary-btn-6px text-white px-6 rounded-md flex gap-2 py-3 w-100 flex justify-center items-center"
                
              >
                Fix Using AI <WandSparkles size={16} color="#ffffff" strokeWidth={1.5} />
              </button>
            </div>
            <div className="col-span-5 lg:col-span-3 border rounded-lg p-2 h-full overflow-y-auto">
              <Accordion
                type="single"
                value={openSection ?? undefined}
                onValueChange={(v) => setOpenSection(v)}
                collapsible
              >
                {Object.entries(details).map(([key, d]) => (
                  <AccordionItem value={key} key={key} className="mb-3">
                    <AccordionTrigger className="w-full flex items-center justify-between bg-gray-50 rounded-md p-3 border border-gray-200">
                      <span className="font-medium flex-1 text-left text-base">{d.title}</span>
                      <Badge className="primary-btn text-xs px-2 py-0.5 border-transparent">
                        {key === "keywords" ? "-10%" : key === "structure" ? "-8%" : key === "skills" ? "-12%" : key === "language" ? "-5%" : ""}
                      </Badge>
                    </AccordionTrigger>
                    <AccordionContent className="p-4">
                      <p className="mb-4">{d.summary}</p>
                      {d.subSections.map((sub: any) => (
                        <div key={sub.title} className="bg-gray-50 p-4 rounded-md shadow-sm mb-4 space-y-4">
                          <div className="font-semibold text-lg mb-3">{sub.title}</div>
                          <div className="font-semibold text-indigo-700 mb-2">Going Well ({sub.goingWell.length})</div>
                          <ul className="list-disc list-inside mb-3">
                            {sub.goingWell.length === 0 ? (
                              <li className="text-gray-500 italic">No items</li>
                            ) : (
                              sub.goingWell.map((item: string, idx: number) => (
                                <li key={idx} className="text-gray-700">{item}</li>
                              ))
                            )}
                          </ul>
                          <div className="font-semibold text-yellow-700 mb-2">Needs Improvement ({sub.needsImprovement.length})</div>
                          <ul className="list-disc list-inside mb-3">
                            {sub.needsImprovement.length === 0 ? (
                              <li className="text-gray-500 italic">No items</li>
                            ) : (
                              sub.needsImprovement.map((item: string, idx: number) => (
                                <li key={idx} className="text-gray-700">{item}</li>
                              ))
                            )}
                          </ul>
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

          </div>
        </div>
      </div>
    </PageContainer>
  );
}
