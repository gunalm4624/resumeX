import PageContainer from '@/components/layout/page-container';
import { ResumeHistoryTable } from '@/features/overview/components/resume-history';

export default function SavedResumesPage() {
  return (
    <PageContainer>
      <div className="flex flex-1 flex-col space-y-6 py-1">
        {/* Heading Section */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight mb-0">Saved Resumes</h2>
        </div>
            <ResumeHistoryTable />
        </div>
    </PageContainer>
  );
}
