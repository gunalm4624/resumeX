"use client";

import React, { useState, useEffect } from "react";
import PageContainer from "@/components/layout/page-container";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ArrowRight, Download } from "lucide-react";
import Image from "next/image";
import { Switch } from '@/components/ui/switch';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { ScoreChart } from "@/components/ui/radial-charts";
import { ResumeGenerator, ResumeData } from "@/lib/resume-generator";

export default function CreateResumePage() {
  const templates = [
    {
      id: "classic",
      name: "Classic",
      description: "Clean, ATS friendly layout.",
      src: "/assets/resumes/ATS-Resume-Cover.png",
    },
    {
      id: "modern",
      name: "Modern",
      description: "A modern design with highlights.",
      src: "/assets/resumes/Modern-Resume-Cover.png",
    },
    {
      id: "ats",
      name: "ATS Friendly",
      description: "Optimized for applicant tracking systems.",
      src: "/assets/resumes/ATS-Resume-Cover.png",
    },
  ];

  const [selectedTemplate, setSelectedTemplate] = useState<string>(templates[0].id);
  const [activeTab, setActiveTab] = useState<string>("template"); // control active tab
  const [isExperienced, setIsExperienced] = useState<boolean>(true);
  const [hasInternship, setHasInternship] = useState<boolean>(true);
  const [hasProjects, setHasProjects] = useState<boolean>(true);

  const [workExperiences, setWorkExperiences] = useState<Array<any>>([
    { company: '', role: '', duration: '', responsibilities: '' },
  ]);
  const [internships, setInternships] = useState<Array<any>>([
    { organization: '', role: '', duration: '', details: '' },
  ]);

  // Form data state
  const [formData, setFormData] = useState({
    personal: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      summary: ''
    },
    education: {
      degree: '',
      institution: '',
      year: ''
    },
    skills: '',
    awards: ''
  });

  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [previewHTML, setPreviewHTML] = useState<string>('');
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [showValidation, setShowValidation] = useState<boolean>(false);

  // Form validation function
  const validateForm = () => {
    const errors: string[] = [];
    
    // Check personal details
    if (!formData.personal.fullName.trim()) errors.push('Full name is required');
    if (!formData.personal.email.trim()) errors.push('Email is required');
    if (!formData.personal.phone.trim()) errors.push('Phone is required');
    if (!formData.personal.location.trim()) errors.push('Location is required');
    if (!formData.personal.summary.trim()) errors.push('Summary/Objective is required');
    
    // Check education
    if (!formData.education.degree.trim()) errors.push('Degree is required');
    if (!formData.education.institution.trim()) errors.push('Institution is required');
    if (!formData.education.year.trim()) errors.push('Year is required');
    
    // Check skills and awards
    if (!formData.skills.trim()) errors.push('Skills are required');
    if (!formData.awards.trim()) errors.push('Awards/Achievements are required');
    
    // Check work experience if user is experienced
    if (isExperienced) {
      const validWorkExp = workExperiences.filter(exp => 
        exp.company.trim() && exp.role.trim() && exp.duration.trim() && exp.responsibilities.trim()
      );
      if (validWorkExp.length === 0) {
        errors.push('At least one work experience is required');
      }
    }
    
    // Check internships if user has internship experience
    if (hasInternship) {
      const validInternships = internships.filter(intern => 
        intern.organization.trim() && intern.role.trim() && intern.duration.trim() && intern.details.trim()
      );
      if (validInternships.length === 0) {
        errors.push('At least one internship experience is required');
      }
    }
    
    setValidationErrors(errors);
    setIsFormValid(errors.length === 0);
    return errors.length === 0;
  };

  // Generate preview HTML whenever form data changes
  const generatePreview = () => {
    if (!validateForm()) {
      setPreviewHTML('');
      return;
    }

    const resumeData: ResumeData = {
      personal: formData.personal,
      workExperience: isExperienced ? workExperiences.filter(exp => 
        exp.company && exp.role && exp.duration && exp.responsibilities
      ) : [],
      internships: hasInternship ? internships.filter(intern => 
        intern.organization && intern.role && intern.duration && intern.details
      ) : [],
      education: formData.education,
      skills: formData.skills,
      awards: formData.awards,
      template: selectedTemplate
    };
    
    const html = ResumeGenerator.generateHTML(resumeData);
    setPreviewHTML(html);
  };

  // Update preview when form data changes
  useEffect(() => {
    generatePreview();
  }, [formData, workExperiences, internships, isExperienced, hasInternship, selectedTemplate]);

  const handleDownloadResume = async () => {
    setIsDownloading(true);
    try {
      // Prepare resume data
      const resumeData: ResumeData = {
        personal: formData.personal,
        workExperience: isExperienced ? workExperiences.filter(exp => 
          exp.company && exp.role && exp.duration && exp.responsibilities
        ) : [],
        internships: hasInternship ? internships.filter(intern => 
          intern.organization && intern.role && intern.duration && intern.details
        ) : [],
        education: formData.education,
        skills: formData.skills,
        awards: formData.awards,
        template: selectedTemplate
      };

      const response = await fetch('/api/convert-resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resumeData),
      });

      if (!response.ok) {
        throw new Error('Failed to generate PDF');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = `resume-${formData.personal.fullName || selectedTemplate}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading resume:', error);
      alert('Failed to download resume. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <PageContainer>
      <div className="flex flex-1 flex-col space-y-6 py-1">
        {/* Heading Section */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight mb-0">Create Resume</h2>
        </div>

        {/* Tabs */}
        <Tabs 
          value={activeTab} 
          onValueChange={(value) => {
            // Prevent navigation to download tab if form is invalid
            if (value === 'download' && !isFormValid) {
              return;
            }
            setActiveTab(value);
          }} 
          className="space-y-4"
        >
          <TabsList>
            <TabsTrigger value="template">Choose Template</TabsTrigger>
            <TabsTrigger value="details">Fill Details</TabsTrigger>
            <div className="relative group">
              <TabsTrigger 
                value="download"
                className={!isFormValid && showValidation ? 'opacity-50 cursor-not-allowed' : ''}
              >
                Preview & Download
              </TabsTrigger>
              {!isFormValid && showValidation && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                  <div className="text-center">
                    <div className="font-semibold mb-1">Complete required fields first:</div>
                    <div className="text-xs">
                      {validationErrors.slice(0, 2).map((error, index) => (
                        <div key={index}>• {error}</div>
                      ))}
                      {validationErrors.length > 2 && (
                        <div>• And {validationErrors.length - 2} more...</div>
                      )}
                    </div>
                  </div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                </div>
              )}
            </div>
          </TabsList>

          {/* Tab 1: Template selection */}
          <TabsContent value="template" className="pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className={`bg-white rounded-2xl p-2 border cursor-pointer 
                    ${selectedTemplate === template.id ? "border-[#3B0189]" : "border"}`}
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <div className="p-0.2">
                    <div className="bg-gray-100 rounded-lg h-100 mb-3 flex items-center justify-center text-gray-500">
                      <div className="relative w-full h-90 rounded-lg overflow-hidden">
                        <Image
                          src={template.src}
                          alt={template.name}
                          fill
                          className="object-contain"
                          quality={100}
                          priority
                        />
                      </div>
                    </div>
                    <h3 className="text-base font-semibold mb-1 ps-2">{template.name}</h3>
                    <p className="text-gray-600 ps-2">{template.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="row flex justify-center mt-6">
              <Button
                className="primary-btn-6px px-6"
                disabled={!selectedTemplate}
                onClick={() => setActiveTab("details")} // move to next tab
              >
                Continue <ArrowRight strokeWidth={1.5} />
              </Button>
            </div>
          </TabsContent>

          {/* Tab 2: Fill details (Accordion) */}
          <TabsContent value="details" className="pt-2">
            <div className="bg-white rounded-2xl p-6 border">
              <h3 className="text-lg font-semibold mb-4">Enter your details</h3>

              {/* Toggle row: Experienced / Internship / Projects */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex-1 bg-gray-100 rounded-md py-3 px-4 flex items-center justify-between">
                  <div className="text-sm font-medium">Are you experienced?</div>
                  <Switch checked={isExperienced} onCheckedChange={(v) => setIsExperienced(Boolean(v))} />
                </div>

                <div className="flex-1 bg-gray-100 rounded-md py-3 px-4 flex items-center justify-between">
                  <div className="text-sm font-medium">Have internship experience?</div>
                  <Switch checked={hasInternship} onCheckedChange={(v) => setHasInternship(Boolean(v))} />
                </div>

                <div className="flex-1 bg-gray-100 rounded-md py-3 px-4 flex items-center justify-between">
                  <div className="text-sm font-medium">Other (projects)?</div>
                  <Switch checked={hasProjects} onCheckedChange={(v) => setHasProjects(Boolean(v))} />
                </div>
              </div>

              <Accordion type="single" defaultValue="personal" className="space-y-4">
                <AccordionItem value="personal">
                  <AccordionTrigger>Personal Details</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <label className="block">
                        <span className="text-sm font-medium">Full name <span className="text-red-500">*</span></span>
                        <input 
                          required 
                          placeholder="Full name" 
                          className={`mt-1 border-2 rounded-md p-2 w-full ${
                            !formData.personal.fullName.trim() && showValidation 
                              ? 'border-red-300 bg-red-50' 
                              : 'border-gray-200'
                          }`}
                          value={formData.personal.fullName}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            personal: { ...prev.personal, fullName: e.target.value }
                          }))}
                        />
                      </label>
                      <label className="block">
                        <span className="text-sm font-medium">Email <span className="text-red-500">*</span></span>
                        <input 
                          required 
                          type="email" 
                          placeholder="Email" 
                          className="mt-1 border-2 border-gray-200 rounded-md p-2 w-full"
                          value={formData.personal.email}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            personal: { ...prev.personal, email: e.target.value }
                          }))}
                        />
                      </label>
                      <label className="block">
                        <span className="text-sm font-medium">Phone <span className="text-red-500">*</span></span>
                        <input 
                          required 
                          placeholder="Phone" 
                          className="mt-1 border-2 border-gray-200 rounded-md p-2 w-full"
                          value={formData.personal.phone}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            personal: { ...prev.personal, phone: e.target.value }
                          }))}
                        />
                      </label>
                      <label className="block">
                        <span className="text-sm font-medium">Location <span className="text-red-500">*</span></span>
                        <input 
                          required 
                          placeholder="Location" 
                          className="mt-1 border-2 border-gray-200 rounded-md p-2 w-full"
                          value={formData.personal.location}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            personal: { ...prev.personal, location: e.target.value }
                          }))}
                        />
                      </label>
                    </div>
                    <div className="mt-3">
                      {isExperienced ? (
                        <label className="block">
                          <span className="text-sm font-medium">Summary / Objective <span className="text-red-500">*</span></span>
                          <textarea 
                            required 
                            placeholder="Summary / Objective" 
                            className="mt-1 w-full border-2 border-gray-200 rounded-md p-2 min-h-[100px]"
                            value={formData.personal.summary}
                            onChange={(e) => setFormData(prev => ({
                              ...prev,
                              personal: { ...prev.personal, summary: e.target.value }
                            }))}
                          />
                        </label>
                      ) : (
                        hasProjects && (
                          <label className="block">
                            <span className="text-sm font-medium">Projects (optional)</span>
                            <textarea 
                              placeholder="Briefly list projects" 
                              className="mt-1 w-full border-2 border-gray-200 rounded-md p-2 min-h-[80px]"
                              value={formData.personal.summary}
                              onChange={(e) => setFormData(prev => ({
                                ...prev,
                                personal: { ...prev.personal, summary: e.target.value }
                              }))}
                            />
                          </label>
                        )
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="work">
                  <AccordionTrigger disabled={!isExperienced}>Work Experience</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3">
                      {workExperiences.map((w, idx) => (
                        <div key={idx} className="space-y-2 border rounded-md p-3">
                          <div className="flex justify-between items-center">
                            <div className="text-sm font-medium">Experience #{idx + 1}</div>
                            <div className="flex items-center gap-2">
                              {workExperiences.length > 1 && (
                                <button
                                  type="button"
                                  className="text-sm text-red-600"
                                  onClick={() => setWorkExperiences((s) => s.filter((_, i) => i !== idx))}
                                >
                                  - Remove
                                </button>
                              )}
                              <button
                                type="button"
                                className="text-sm text-green-600"
                                onClick={() => setWorkExperiences((s) => {
                                  const next = [...s];
                                  next.splice(idx + 1, 0, { company: '', role: '', duration: '', responsibilities: '' });
                                  return next;
                                })}
                              >
                                + Add
                              </button>
                            </div>
                          </div>
                          <label className="block">
                            <span className="text-sm">Company</span>
                            <input value={w.company} onChange={(e) => setWorkExperiences((s) => s.map((it, i) => i === idx ? { ...it, company: e.target.value } : it))} className="mt-1 border-2 border-gray-200 rounded-md p-2 w-full" />
                          </label>
                          <label className="block">
                            <span className="text-sm">Role</span>
                            <input value={w.role} onChange={(e) => setWorkExperiences((s) => s.map((it, i) => i === idx ? { ...it, role: e.target.value } : it))} className="mt-1 border-2 border-gray-200 rounded-md p-2 w-full" />
                          </label>
                          <label className="block">
                            <span className="text-sm">Duration</span>
                            <input value={w.duration} onChange={(e) => setWorkExperiences((s) => s.map((it, i) => i === idx ? { ...it, duration: e.target.value } : it))} className="mt-1 border-2 border-gray-200 rounded-md p-2 w-full" />
                          </label>
                          <label className="block">
                            <span className="text-sm">Responsibilities</span>
                            <textarea value={w.responsibilities} onChange={(e) => setWorkExperiences((s) => s.map((it, i) => i === idx ? { ...it, responsibilities: e.target.value } : it))} className="mt-1 w-full border-2 border-gray-200 rounded-md p-2 min-h-[80px]" />
                          </label>
                        </div>
                      ))}
                      <div>
                        <button type="button" className="text-sm text-green-600" onClick={() => setWorkExperiences((s) => [...s, { company: '', role: '', duration: '', responsibilities: '' }])}>
                          + Add another work experience
                        </button>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="internship">
                  <AccordionTrigger disabled={!hasInternship}>Internship Experience</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3">
                      {internships.map((it, idx) => (
                        <div key={idx} className="space-y-2 border rounded-md p-3">
                          <div className="flex justify-between items-center">
                            <div className="text-sm font-medium">Internship #{idx + 1}</div>
                            <div className="flex items-center gap-2">
                              {internships.length > 1 && (
                                <button type="button" className="text-sm text-red-600" onClick={() => setInternships((s) => s.filter((_, i) => i !== idx))}>- Remove</button>
                              )}
                              <button type="button" className="text-sm text-green-600" onClick={() => setInternships((s) => {
                                const next = [...s];
                                next.splice(idx + 1, 0, { organization: '', role: '', duration: '', details: '' });
                                return next;
                              })}>+ Add</button>
                            </div>
                          </div>
                          <label className="block">
                            <span className="text-sm">Organization</span>
                            <input value={it.organization} onChange={(e) => setInternships((s) => s.map((x, i) => i === idx ? { ...x, organization: e.target.value } : x))} className="mt-1 border-2 border-gray-200 rounded-md p-2 w-full" />
                          </label>
                          <label className="block">
                            <span className="text-sm">Role</span>
                            <input value={it.role} onChange={(e) => setInternships((s) => s.map((x, i) => i === idx ? { ...x, role: e.target.value } : x))} className="mt-1 border-2 border-gray-200 rounded-md p-2 w-full" />
                          </label>
                          <label className="block">
                            <span className="text-sm">Duration</span>
                            <input value={it.duration} onChange={(e) => setInternships((s) => s.map((x, i) => i === idx ? { ...x, duration: e.target.value } : x))} className="mt-1 border-2 border-gray-200 rounded-md p-2 w-full" />
                          </label>
                          <label className="block">
                            <span className="text-sm">Details</span>
                            <textarea value={it.details} onChange={(e) => setInternships((s) => s.map((x, i) => i === idx ? { ...x, details: e.target.value } : x))} className="mt-1 w-full border-2 border-gray-200 rounded-md p-2 min-h-[80px]" />
                          </label>
                        </div>
                      ))}
                      <div>
                        <button type="button" className="text-sm text-green-600" onClick={() => setInternships((s) => [...s, { organization: '', role: '', duration: '', details: '' }])}>
                          + Add another internship
                        </button>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="education">
                  <AccordionTrigger>Education Details</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3">
                      <label className="block">
                        <span className="text-sm font-medium">Degree <span className="text-red-500">*</span></span>
                        <input 
                          required 
                          placeholder="Degree" 
                          className="mt-1 border-2 border-gray-200 rounded-md p-2 w-full"
                          value={formData.education.degree}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            education: { ...prev.education, degree: e.target.value }
                          }))}
                        />
                      </label>
                      <label className="block">
                        <span className="text-sm font-medium">Institution <span className="text-red-500">*</span></span>
                        <input 
                          required 
                          placeholder="Institution" 
                          className="mt-1 border-2 border-gray-200 rounded-md p-2 w-full"
                          value={formData.education.institution}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            education: { ...prev.education, institution: e.target.value }
                          }))}
                        />
                      </label>
                      <label className="block">
                        <span className="text-sm font-medium">Year <span className="text-red-500">*</span></span>
                        <input 
                          required 
                          placeholder="Year" 
                          className="mt-1 border-2 border-gray-200 rounded-md p-2 w-full"
                          value={formData.education.year}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            education: { ...prev.education, year: e.target.value }
                          }))}
                        />
                      </label>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="skills">
                  <AccordionTrigger>Skills</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3">
                      <label className="block">
                        <span className="text-sm font-medium">Skills <span className="text-red-500">*</span></span>
                        <input 
                          required 
                          placeholder="Add skill (comma separated)" 
                          className="mt-1 border-2 border-gray-200 rounded-md p-2 w-full"
                          value={formData.skills}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            skills: e.target.value
                          }))}
                        />
                      </label>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="awards">
                  <AccordionTrigger>Awards & Achievements</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3">
                      <label className="block">
                        <span className="text-sm font-medium">Awards / Achievements <span className="text-red-500">*</span></span>
                        <textarea 
                          required 
                          placeholder="List awards or achievements" 
                          className="mt-1 w-full border-2 border-gray-200 rounded-md p-2 min-h-[80px]"
                          value={formData.awards}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            awards: e.target.value
                          }))}
                        />
                      </label>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="mt-6 flex flex-col items-center gap-4 w-full">
                {!isFormValid && showValidation && validationErrors.length > 0 && (
                  <div className="bg-[#3B0189]/5 border border-[#3B0189]/20 rounded-lg p-4 w-full">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-[#3B0189] rounded-full"></div>
                      <span className="text-sm font-semibold text-[#3B0189]">
                        {validationErrors.length} field{validationErrors.length > 1 ? 's' : ''} required
                      </span>
                    </div>
                    <div className="text-xs text-[#3B0189]/80">
                      Complete all required fields to generate your resume
                    </div>
                  </div>
                )}
                <div className="relative group">
                  <button
                    type="button"
                    className="primary-btn-6px text-white px-6 rounded-md flex gap-2 py-2"
                    onClick={() => {
                      setShowValidation(true);
                      if (validateForm()) {
                        setActiveTab('download');
                      }
                    }}
                  >
                    Generate Resume <ArrowRight strokeWidth={1.5} />
                  </button>
                  {!isFormValid && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                      <div className="text-center">
                        <div className="font-semibold mb-1">Complete required fields first:</div>
                        <div className="text-xs">
                          {validationErrors.slice(0, 2).map((error, index) => (
                            <div key={index}>• {error}</div>
                          ))}
                          {validationErrors.length > 2 && (
                            <div>• And {validationErrors.length - 2} more...</div>
                          )}
                        </div>
                      </div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Tab 3: Download */}
          <TabsContent value="download" className="pt-2">
            <div className="grid grid-cols-12 gap-6">
              {/* Left: Preview (8) */}
              <div className="col-span-12 lg:col-span-8">
                  <div className="w-full h-[842px] bg-gray-50 rounded-lg flex items-center justify-center">
                    {previewHTML ? (
                      <iframe 
                        srcDoc={previewHTML}
                        title="Generated Resume HTML preview" 
                        className="w-full h-full border-0 rounded-lg" 
                      />
                    ) : (
                      <div className="text-center p-8">
                        <div className="text-lg font-semibold text-gray-700 mb-2">
                          {isFormValid ? 'Generating preview...' : 'Complete required fields to see preview'}
                        </div>
                        {!isFormValid && validationErrors.length > 0 && (
                          <div className="text-sm text-gray-500 max-w-md">
                            <div className="mb-2">Missing required information:</div>
                            <div className="text-left">
                              {validationErrors.slice(0, 5).map((error, index) => (
                                <div key={index} className="flex items-center gap-2 mb-1">
                                  <span className="text-red-500">•</span>
                                  <span>{error}</span>
                                </div>
                              ))}
                              {validationErrors.length > 5 && (
                                <div className="flex items-center gap-2 mt-2 text-gray-400">
                                  <span>•</span>
                                  <span>And {validationErrors.length - 5} more fields...</span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
              </div>

              {/* Right: ATS overview + actions (4) */}
              <div className="col-span-12 lg:col-span-4 flex flex-col gap-4">
                <div className="bg-gray-50 rounded-lg p-4 flex flex-col">
                  <h4 className="text-md font-semibold mb-2">ATS Overview</h4>
                  {/* Placeholder chart area */}
                  <div className="h-80 flex items-center justify-center">
                    <ScoreChart/>
                  </div>
                </div>

                <div className="bg-white">
                  <div className="grid grid-cols-1 gap-3">
                    <div className="relative group">
                      <button 
                        className={`w-full py-3 rounded flex items-center justify-center gap-2 ${
                          isFormValid && !isDownloading 
                            ? 'primary-btn-6px text-white' 
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                        onClick={handleDownloadResume}
                        disabled={!isFormValid || isDownloading}
                      >
                        <Download size={16} />
                        {isDownloading ? 'Generating PDF...' : 'Download Resume'}
                      </button>
                      {!isFormValid && (
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                          <div className="text-center">
                            <div className="font-semibold mb-1">Complete required fields:</div>
                            <div className="text-xs">
                              {validationErrors.slice(0, 3).map((error, index) => (
                                <div key={index}>• {error}</div>
                              ))}
                              {validationErrors.length > 3 && (
                                <div>• And {validationErrors.length - 3} more...</div>
                              )}
                            </div>
                          </div>
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                        </div>
                      )}
                    </div>
                    <button className="w-full bg-gray-100 py-3 rounded-[8px]">Modify Resume Using AI</button>
                    <button className="w-full bg-gray-100 py-3 rounded-[8px]">Generate Cover Letter</button>
                    <button className="w-full bg-gray-100 py-3 rounded-[8px]">Rewrite Resume with Job Description</button>
                    <button className="w-full bg-gray-100 py-3 rounded-[8px]">Share Resume</button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
}