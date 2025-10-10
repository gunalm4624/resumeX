export interface ResumeData {
  personal: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
  };
  workExperience: Array<{
    company: string;
    role: string;
    duration: string;
    responsibilities: string;
  }>;
  internships: Array<{
    organization: string;
    role: string;
    duration: string;
    details: string;
  }>;
  education: {
    degree: string;
    institution: string;
    year: string;
  };
  skills: string;
  awards: string;
  template: string;
}

export class ResumeGenerator {
  static generateHTML(data: ResumeData): string {
    const template = this.getTemplate(data.template);
    return this.populateTemplate(template, data);
  }

  private static getTemplate(templateId: string): string {
    // For now, we'll use the ATS template
    // Later we can extend this to support multiple templates
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{personal.fullName}} - Resume</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body {
            font-family: 'Inter', sans-serif;
            background-color: #ffffff;
            padding: 0;
            margin: 0;
            min-height: 100vh;
        }
        .resume-container {
            width: 210mm;
            height: 297mm;
            padding: 10mm;
            margin: 0;
            box-sizing: border-box;
            background: white;
            font-size: 8.5pt;
            line-height: 1.05;
            display: flex;
            flex-direction: column;
        }
        section {
            margin-bottom: 6pt;
        }
        h2 {
            margin-bottom: 3pt;
        }
        .section-divider {
            margin-top: 1pt;
            margin-bottom: 3pt;
            height: 1px;
            width: 100%;
            background-color: #d1d5db;
        }
        p, .skill-item {
            margin-bottom: 2pt;
        }
        .experience-list li {
            margin-bottom: 1pt;
        }
        .experience-list li {
            position: relative;
            padding-left: 1.5rem;
            margin-bottom: 0.5rem;
        }
        .experience-list li::before {
            content: '•';
            position: absolute;
            left: 0;
            color: #333;
            font-weight: bold;
        }
        .skill-item {
            display: flex;
            align-items: baseline;
            margin-bottom: 0.25rem;
        }
        .skill-item strong {
            flex-shrink: 0;
            margin-right: 0.5rem;
            min-width: 100px;
        }
        @media print {
            body {
                background: white !important;
                -webkit-print-color-adjust: exact;
                color-adjust: exact;
            }
            .resume-container {
                box-shadow: none !important;
                border: none !important;
            }
        }
    </style>
</head>
<body>
    <div class="resume-container">
        <!-- HEADER SECTION -->
        <header class="mb-4">
            <h1 class="text-3xl font-extrabold text-gray-900 mb-1 tracking-tight">{{personal.fullName}}</h1>
            <p class="text-base font-medium text-gray-600 mb-2">{{personal.summary}}</p>
            <div class="flex flex-wrap gap-x-4 text-sm text-gray-700">
                <a href="mailto:{{personal.email}}" class="text-blue-600 hover:text-blue-800 transition duration-150">{{personal.email}}</a>
                <span class="hidden sm:inline-block">|</span>
                <span>{{personal.phone}}</span>
                <span class="hidden sm:inline-block">|</span>
                <span>{{personal.location}}</span>
            </div>
        </header>

        {{#if workExperience.length}}
        <!-- WORK EXPERIENCE -->
        <section class="mb-4">
            <h2 class="text-lg font-bold uppercase tracking-wider mb-1 text-gray-900">Work Experience</h2>
            <div class="section-divider"></div>
            {{#each workExperience}}
            <div class="mb-3">
                <div class="flex justify-between items-start mb-1">
                    <h3 class="text-base font-bold text-gray-900">{{role}} | {{company}}</h3>
                    <span class="text-sm font-medium text-gray-600">{{duration}}</span>
                </div>
                <ul class="experience-list list-none pl-0 text-gray-700 text-sm">
                    <li>{{responsibilities}}</li>
                </ul>
            </div>
            {{/each}}
        </section>
        {{/if}}

        {{#if internships.length}}
        <!-- INTERNSHIP EXPERIENCE -->
        <section class="mb-4">
            <h2 class="text-lg font-bold uppercase tracking-wider mb-1 text-gray-900">Internship Experience</h2>
            <div class="section-divider"></div>
            {{#each internships}}
            <div class="mb-3">
                <div class="flex justify-between items-start mb-1">
                    <h3 class="text-base font-bold text-gray-900">{{role}} | {{organization}}</h3>
                    <span class="text-sm font-medium text-gray-600">{{duration}}</span>
                </div>
                <ul class="experience-list list-none pl-0 text-gray-700 text-sm">
                    <li>{{details}}</li>
                </ul>
            </div>
            {{/each}}
        </section>
        {{/if}}

        <!-- EDUCATION -->
        <section class="mb-4">
            <h2 class="text-lg font-bold uppercase tracking-wider mb-1 text-gray-900">Education</h2>
            <div class="section-divider"></div>
            <div class="flex justify-between items-start">
                <h3 class="text-base font-bold text-gray-900">{{education.degree}} | {{education.institution}}</h3>
                <span class="text-sm font-medium text-gray-600">{{education.year}}</span>
            </div>
        </section>

        <!-- SKILLS -->
        <section class="mb-4">
            <h2 class="text-lg font-bold uppercase tracking-wider mb-1 text-gray-900">Skills</h2>
            <div class="section-divider"></div>
            <div class="text-gray-700 text-sm">
                <p>{{skills}}</p>
            </div>
        </section>

        <!-- AWARDS -->
        <section>
            <h2 class="text-lg font-bold uppercase tracking-wider mb-1 text-gray-900">Awards & Achievements</h2>
            <div class="section-divider"></div>
            <ul class="experience-list list-none pl-0 text-gray-700 text-sm">
                <li>{{awards}}</li>
            </ul>
        </section>
    </div>
</body>
</html>`;
  }

  private static populateTemplate(template: string, data: ResumeData): string {
    let html = template;

    // Replace personal information
    html = html.replace(/\{\{personal\.(\w+)\}\}/g, (match, key) => {
      return data.personal[key as keyof typeof data.personal] || '';
    });

    // Replace education
    html = html.replace(/\{\{education\.(\w+)\}\}/g, (match, key) => {
      return data.education[key as keyof typeof data.education] || '';
    });

    // Replace skills and awards
    html = html.replace(/\{\{skills\}\}/g, data.skills || '');
    html = html.replace(/\{\{awards\}\}/g, data.awards || '');

    // Handle work experience
    if (data.workExperience && data.workExperience.length > 0) {
      const workExperienceHTML = data.workExperience.map(exp => `
        <div class="mb-3">
          <div class="flex justify-between items-start mb-1">
            <h3 class="text-base font-bold text-gray-900">${exp.role} | ${exp.company}</h3>
            <span class="text-sm font-medium text-gray-600">${exp.duration}</span>
          </div>
          <ul class="experience-list list-none pl-0 text-gray-700 text-sm">
            <li>${exp.responsibilities}</li>
          </ul>
        </div>
      `).join('');
      
      html = html.replace(/\{\{#if workExperience\.length\}\}[\s\S]*?\{\{\/if\}\}/g, 
        `<section class="mb-4">
          <h2 class="text-lg font-bold uppercase tracking-wider mb-1 text-gray-900">Work Experience</h2>
          <div class="section-divider"></div>
          ${workExperienceHTML}
        </section>`);
    } else {
      html = html.replace(/\{\{#if workExperience\.length\}\}[\s\S]*?\{\{\/if\}\}/g, '');
    }

    // Handle internships
    if (data.internships && data.internships.length > 0) {
      const internshipHTML = data.internships.map(intern => `
        <div class="mb-3">
          <div class="flex justify-between items-start mb-1">
            <h3 class="text-base font-bold text-gray-900">${intern.role} | ${intern.organization}</h3>
            <span class="text-sm font-medium text-gray-600">${intern.duration}</span>
          </div>
          <ul class="experience-list list-none pl-0 text-gray-700 text-sm">
            <li>${intern.details}</li>
          </ul>
        </div>
      `).join('');
      
      html = html.replace(/\{\{#if internships\.length\}\}[\s\S]*?\{\{\/if\}\}/g, 
        `<section class="mb-4">
          <h2 class="text-lg font-bold uppercase tracking-wider mb-1 text-gray-900">Internship Experience</h2>
          <div class="section-divider"></div>
          ${internshipHTML}
        </section>`);
    } else {
      html = html.replace(/\{\{#if internships\.length\}\}[\s\S]*?\{\{\/if\}\}/g, '');
    }

    return html;
  }
}
