import PageContainer from '@/components/layout/page-container';
import ComingSoon from '@/components/coming-soon';

export default function InterviewPreparationPage() {
  return (
    <PageContainer>
      <div className="flex flex-1 flex-col space-y-6 py-1">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight mb-0">Interview Preparation</h2>
        </div>
        <ComingSoon description="Practice behavioral and technical questions with AI feedback. Launching shortly." />
      </div>
    </PageContainer>
  );
}


