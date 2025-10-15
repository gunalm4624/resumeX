import PageContainer from '@/components/layout/page-container';
import ComingSoon from '@/components/coming-soon';

export default function PortfolioBuilderPage() {
  return (
    <PageContainer>
      <div className="flex flex-1 flex-col space-y-6 py-1">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight mb-0">Resume → Portfolio Builder</h2>
        </div>
        <ComingSoon description="Turn your resume into a beautiful, shareable portfolio site. We’re putting the final touches on this experience." />
      </div>
    </PageContainer>
  );
}


