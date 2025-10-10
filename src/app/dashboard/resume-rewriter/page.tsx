"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import PageContainer from "@/components/layout/page-container";

export default function ResumeRewriterPage() {
  const [jobSource, setJobSource] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [jobLink, setJobLink] = useState("");
  const [rewriteOption, setRewriteOption] = useState("same");
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewHTML, setPreviewHTML] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [isDownloading, setIsDownloading] = useState(false);

  const validateForm = () => {
    const errors: string[] = [];
    // Validation temporarily disabled for testing
    // if (!companyName) errors.push('Company name is required');
    // if (!jobLink) errors.push('Job link is required');
    // if (!jobSource) errors.push('Job source is required');

    setValidationErrors(errors);
    return true;
  };

  const handleDownloadResume = () => {
    if (!isFormValid) return;
    setIsDownloading(true);
    setTimeout(() => setIsDownloading(false), 2000);
  };

  return (
    <PageContainer scrollable={true}>
      <div className="flex flex-1 flex-col space-y-6 py-1">
        {/* Heading Section */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight mb-0">
            Resume Rewriter
          </h2>
        </div>

        <div
          className={`grid grid-cols-1 ${
            showPreview ? "lg:grid-cols-1" : "sm:grid-cols-2 lg:grid-cols-2"
          } gap-6`}
        >
          {!showPreview ? (
            <>
              {/* Left Side - Upload */}
              <div className="bg-gray-50 min-h-[600px] py-12 px-16 rounded-lg flex flex-col text-center">
                <h1 className="text-3xl mb-3 tracking-tighter text-center font-medium">
                  AI Powered Resume Rewriter
                </h1>
                <p className="text-gray-600 leading-7 text-center text-sm">
                  Upload your resume PDF and instantly get an AI-optimized
                  version tailored to the job description—boosting your chances
                  of getting shortlisted.
                </p>

                <div className="bg-white rounded-lg border-2 border-dashed border-gray-300 h-[350px] mt-12 flex flex-col items-center justify-center px-6 py-8 transition-all hover:border-[#3B0189]/50">
                  <div className="flex flex-col items-center gap-4">
                    <img
                      src="/assets/drag-drop.svg"
                      alt="Drag and drop"
                      width="81"
                      height="81"
                    />
                    <div className="text-center">
                      <h3 className="text-lg font-semibold mb-1">
                        Drag & Drop Your Resume
                      </h3>
                      <p className="text-sm text-gray-500 mb-4">
                        Simply drag and drop your resume PDF here or browse to
                        upload
                      </p>
                      <button className="primary-btn-6px text-white px-6 rounded-md flex gap-2 py-2 mx-auto">
                        Browse from Device
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="17 8 12 3 7 8" />
                          <line x1="12" y1="3" x2="12" y2="15" />
                        </svg>
                      </button>
                      <p className="mt-4 text-xs text-gray-400">
                        File should be in PDF format
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Form */}
              <div className="h-full border rounded-lg p-6 flex flex-col gap-6">
                <form className="flex flex-col gap-4">
                  {/* Company Name + Job Source */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Company Name
                      </label>
                      <input
                        type="text"
                        className="border-2 border-gray-200 rounded px-3 py-2 w-full focus:outline-none focus:border-[#3B0189]/20"
                        placeholder="Enter company name"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Job Source
                      </label>
                      <input
                        type="text"
                        className="border-2 border-gray-200 rounded px-3 py-2 w-full focus:outline-none focus:border-[#3B0189]/20"
                        placeholder="e.g. LinkedIn, Indeed"
                        value={jobSource}
                        onChange={(e) => setJobSource(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Job Link */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Job Link
                    </label>
                    <input
                      type="url"
                      className="border-2 border-gray-200 rounded px-3 py-2 w-full focus:outline-none focus:border-[#3B0189]/20"
                      placeholder="Paste job link"
                      value={jobLink}
                      onChange={(e) => {
                        setJobLink(e.target.value);
                        const url = e.target.value.toLowerCase();
                        if (url.includes("linkedin.com")) setJobSource("LinkedIn");
                        else if (url.includes("indeed.com")) setJobSource("Indeed");
                        else if (url.includes("glassdoor.com"))
                          setJobSource("Glassdoor");
                        else if (url.includes("monster.com"))
                          setJobSource("Monster");
                        else if (url.includes("dice.com")) setJobSource("Dice");
                      }}
                    />
                  </div>

                  {/* Job Description */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Job Description
                    </label>
                    <textarea
                      className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-[#3B0189]/20"
                      rows={3}
                      placeholder="Paste job description"
                    />
                  </div>

                  {/* Preferred Qualification */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Preferred Qualification
                    </label>
                    <textarea
                      className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-[#3B0189]/20"
                      rows={2}
                      placeholder="Enter preferred qualifications"
                    />
                  </div>

                  {/* Rewrite Options */}
                  <div className="flex gap-6 mt-2">
                    <div
                      className={`flex items-center border rounded-lg px-4 py-3 gap-3 w-1/2 hover:border-[#3B0189]/20 transition-colors ${
                        rewriteOption === "same"
                          ? "border-[#3B0189]/50"
                          : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="rewriteOption"
                        id="sameResume"
                        className="w-5 h-5 text-[#3B0189] cursor-pointer accent-[#3B0189] rounded-full"
                        checked={rewriteOption === "same"}
                        onChange={() => setRewriteOption("same")}
                      />
                      <label
                        htmlFor="sameResume"
                        className="font-medium cursor-pointer flex-1"
                      >
                        Rewrite in Same Resume
                      </label>
                    </div>

                    <div
                      className={`flex items-center border rounded-lg px-4 py-3 gap-3 w-1/2 hover:border-[#3B0189]/20 transition-colors ${
                        rewriteOption === "new" ? "border-[#3B0189]/50" : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="rewriteOption"
                        id="newTemplate"
                        className="w-5 h-5 text-[#3B0189] cursor-pointer accent-[#3B0189] rounded-full"
                        checked={rewriteOption === "new"}
                        onChange={() => {
                          setRewriteOption("new");
                          setShowTemplateModal(true);
                        }}
                      />
                      <label
                        htmlFor="newTemplate"
                        className="font-medium cursor-pointer flex-1"
                      >
                        Rewrite in New Template
                      </label>
                    </div>
                  </div>

                  {/* Template Modal */}
                  {rewriteOption === "new" && showTemplateModal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-8">
                      <div className="bg-white rounded-lg p-8 max-w-5xl w-full">
                        <div className="flex justify-between items-center mb-6">
                          <h3 className="text-2xl font-semibold">
                            Choose Template
                          </h3>
                          <button
                            onClick={() => setShowTemplateModal(false)}
                            className="text-gray-500 hover:text-gray-700 text-xl"
                          >
                            ✕
                          </button>
                        </div>
                        <div className="grid grid-cols-2 gap-8">
                          {[
                            {
                              id: "classic",
                              name: "Classic",
                              description: "Clean, ATS friendly layout",
                              image:
                                "/assets/resumes/ATS-Resume-Cover.png",
                            },
                            {
                              id: "modern",
                              name: "Modern",
                              description: "A modern design with highlights",
                              image:
                                "/assets/resumes/Modern-Resume-Cover.png",
                            },
                          ].map((template) => (
                            <div
                              key={template.id}
                              className="border rounded-lg p-6 cursor-pointer hover:border-[#3B0189]/50 transition-colors hover:shadow-lg"
                              onClick={() => setShowTemplateModal(false)}
                            >
                              <img
                                src={template.image}
                                alt={template.name}
                                className="w-full h-80 object-contain rounded mb-4"
                              />
                              <h4 className="text-lg font-semibold mb-2">
                                {template.name}
                              </h4>
                              <p className="text-gray-600">
                                {template.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="button"
                    className="primary-btn-6px text-white px-6 py-3 rounded-md w-full flex items-center justify-center gap-2 mt-4"
                    onClick={() => {
                      const isValid = validateForm();
                      if (isValid) {
                        setIsFormValid(true);
                        setShowPreview(true);
                        setTimeout(() => {
                          setPreviewHTML(
                            `<div class="text-center"><h2 class="text-2xl font-bold mb-4">Generated Resume Preview</h2><p>Your optimized resume content will appear here.</p></div>`
                          );
                        }, 2000);
                      }
                    }}
                  >
                    Rewrite with AI
                  </button>
                </form>
              </div>
            </>
          ) : (
            /* Preview Section */
            <div className="col-span-full grid grid-cols-12 gap-6">
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
                        {isFormValid
                          ? "Generating preview..."
                          : "Complete required fields to see preview"}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right: Actions */}
              <div className="col-span-12 lg:col-span-4 flex flex-col gap-4">
                <div className="bg-gray-50 rounded-lg p-4 flex flex-col">
                  <h4 className="text-md font-semibold mb-2">ATS Overview</h4>
                  <div className="h-80 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      ATS Score Chart will appear here
                    </div>
                  </div>
                </div>

                <div className="bg-white">
                  <div className="grid grid-cols-1 gap-3">
                    <div className="relative group">
                      <button
                        className={`w-full py-3 rounded flex items-center justify-center gap-2 ${
                          isFormValid && !isDownloading
                            ? "primary-btn-6px text-white"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                        onClick={handleDownloadResume}
                        disabled={!isFormValid || isDownloading}
                      >
                        <Download size={16} />
                        {isDownloading
                          ? "Generating PDF..."
                          : "Download Resume"}
                      </button>
                    </div>
                    <button className="w-full bg-gray-100 py-3 rounded-[8px] hover:bg-gray-200 transition-colors">
                      Modify Resume Using AI
                    </button>
                    <button className="w-full bg-gray-100 py-3 rounded-[8px] hover:bg-gray-200 transition-colors">
                      Generate Cover Letter
                    </button>
                    <button className="w-full bg-gray-100 py-3 rounded-[8px] hover:bg-gray-200 transition-colors">
                      Rewrite Resume with Job Description
                    </button>
                    <button className="w-full bg-gray-100 py-3 rounded-[8px] hover:bg-gray-200 transition-colors">
                      Share Resume
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageContainer>
  );
}