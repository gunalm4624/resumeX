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
import { MoveRight } from 'lucide-react';

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
      goingWell: [
        'Your resume successfully includes 18 out of 25 important JD keywords.',
        'Strong alignment with Python, React, Agile, AWS, SQL.',
        'Multiple appearances of the role title "Software Engineer" improve ATS ranking.',
      ],
      needsImprovement: [
        'Consider adding keywords: Kubernetes, Docker, CI/CD.',
        'Use variations of key skills (e.g., ReactJS, React) to increase matches.',
      ],
    },
    structure: {
      title: 'Resume Structure & Formatting',
      status: 'going-well',
      summary:
        'Clear section order and consistent formatting improves ATS parsing and human readability.',
      goingWell: [
        'Consistent font and spacing across sections.',
        'Logical section order: Summary → Experience → Education → Skills.',
      ],
      needsImprovement: [
        'Some dates are missing in minor roles — add month/year where possible.',
      ],
    },
    skills: {
      title: 'Skills & Experience Alignment',
      status: 'needs-improvement',
      summary:
        'Skills should closely map to the job description and be evidenced by achievements.',
      goingWell: ['Key skills like Python and AWS are prominently listed.'],
      needsImprovement: [
        'Add measurable achievements for Senior-level skills (e.g., improved performance by X%).',
      ],
    },
    language: {
      title: 'Language & Readability',
      status: 'going-well',
      summary:
        'Clear, concise sentences with action verbs improve readability for recruiters and ATS.',
      goingWell: ['Good use of active language and short paragraphs.'],
      needsImprovement: ['Reduce passive voice in two bullet points.'],
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
            <div className="col-span-5 lg:col-span-2 bg-gray-50 rounded-lg p-6 h-fit">
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

            <div className="col-span-5 lg:col-span-3 border rounded-lg p-2 h-full">
              <div className="space-y-6">
                {/* Detail panels for each accordion item */}
                {Object.entries(details).map(([key, d]) => {
                  const isHighlighted = highlighted === key;
                  return (
                    <div
                      id={`detail-${key}`}
                      key={key}
                      className={
                        `p-4 rounded-md transition-all ${
                          isHighlighted ? 'ring-2 ring-indigo-200 bg-indigo-50' : 'bg-white'
                        }`
                      }
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold">{d.title}</h3>
                          <p className="text-base text-gray-700 mt-1">{d.summary}</p>
                        </div>
                        {/* arrow moved to left accordion content */}
                        <div className="ml-4 flex items-start gap-2" />
                      </div>
                      <div className="mt-4">
                        <div className="flex items-center gap-3">
                          <div className="px-2 py-1 rounded-md bg-green-50 text-green-700 text-sm">
                            Going well: {d.goingWell.length}
                          </div>
                          <div className="px-2 py-1 rounded-md bg-yellow-50 text-yellow-700 text-sm">
                            Needs improvement: {d.needsImprovement.length}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Accordion moved below grid, aligned under left column */}
            <div className="col-span-5 lg:col-span-2 mb-3">
              <div className="space-y-2">
                <Accordion
                  type="single"
                  value={openSection ?? undefined}
                  onValueChange={(v) => setOpenSection(v)}
                  collapsible
                >
                  <AccordionItem value="keywords" className="mb-3">
                    <AccordionTrigger className="w-full flex items-center justify-between bg-gray-50 rounded-md p-3 border border-gray-200">
                      <span className="font-medium flex-1 text-left text-base">Keyword Match</span>
                      <div className="flex items-center gap-2">
                        <Badge className="primary-btn text-xs px-2 py-0.5 border-transparent">-10%</Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3">
                            <Image src="/assets/Check-Bullet.svg" alt="bullet" width={20} height={20} />
                            <div>
                              <div className="font-medium text-base">JD Keywords Found</div>
                              <div className="text-sm text-gray-500">Your resume successfully includes 18 of 25 JD keywords.</div>
                            </div>
                          </div>
                          <MoveRight strokeWidth={1.5} className="size-5 text-muted-foreground" />
                        </div>

                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3">
                            <Image src="/assets/Check-Bullet.svg" alt="bullet" width={20} height={20} />
                            <div>
                              <div className="font-medium text-base">Missing Keywords</div>
                              <div className="text-sm text-gray-500">Consider adding Kubernetes, Docker, CI/CD.</div>
                            </div>
                          </div>
                          <MoveRight strokeWidth={1.5} className="size-5 text-muted-foreground" />
                        </div>

                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3">
                            <Image src="/assets/Check-Bullet.svg" alt="bullet" width={20} height={20} />
                            <div>
                              <div className="font-medium text-base">Keyword Frequency</div>
                              <div className="text-sm text-gray-500">Multiple role-title hits (Software Engineer) help ranking.</div>
                            </div>
                          </div>
                          <MoveRight strokeWidth={1.5} className="size-5 text-muted-foreground" />
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="structure" className="mb-3">
                    <AccordionTrigger className="w-full flex items-center justify-between bg-gray-50 rounded-md p-3 border border-gray-200">
                      <span className="font-medium flex-1 text-left text-base">Resume Structure & Formatting</span>
                      <div className="flex items-center gap-2">
                        <Badge className="primary-btn text-xs px-2 py-0.5 border-transparent">-8%</Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3">
                            <Image src="/assets/Check-Bullet.svg" alt="bullet" width={20} height={20} />
                            <div>
                              <div className="font-medium text-base">Section Order</div>
                              <div className="text-sm text-gray-500">Logical order; only minor re-ordering suggested.</div>
                            </div>
                          </div>
                          <MoveRight strokeWidth={1.5} className="size-5 text-muted-foreground" />
                        </div>

                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3">
                            <Image src="/assets/Check-Bullet.svg" alt="bullet" width={20} height={20} />
                            <div>
                              <div className="font-medium text-base">Consistent Formatting</div>
                              <div className="text-sm text-gray-500">Font and spacing are consistent.</div>
                            </div>
                          </div>
                          <MoveRight strokeWidth={1.5} className="size-5 text-muted-foreground" />
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="skills" className="mb-3">
                    <AccordionTrigger className="w-full flex items-center justify-between bg-gray-50 rounded-md p-3 border border-gray-200">
                      <span className="font-medium flex-1 text-left text-base">Skills & Experience Alignment</span>
                      <div className="flex items-center gap-2">
                        <Badge className="primary-btn text-xs px-2 py-0.5 border-transparent">-12%</Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3">
                            <Image src="/assets/Check-Bullet.svg" alt="bullet" width={20} height={20} />
                            <div>
                              <div className="font-medium text-base">Skill Match</div>
                              <div className="text-sm text-gray-500">Key skills like Python & AWS are present.</div>
                            </div>
                          </div>
                          <MoveRight strokeWidth={1.5} className="size-5 text-muted-foreground" />
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="language" className="mb-3">
                    <AccordionTrigger className="w-full flex items-center justify-between bg-gray-50 rounded-md p-3 border border-gray-200">
                      <span className="font-medium flex-1 text-left text-base">Language & Readability</span>
                      <div className="flex items-center gap-2">
                        <Badge className="primary-btn text-xs px-2 py-0.5 border-transparent">-5%</Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3">
                            <Image src="/assets/Check-Bullet.svg" alt="bullet" width={20} height={20} />
                            <div>
                              <div className="font-medium text-base">Readability Score</div>
                              <div className="text-sm text-gray-500">Clear sentences and active verbs used.</div>
                            </div>
                          </div>
                          <MoveRight strokeWidth={1.5} className="size-5 text-muted-foreground" />
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
