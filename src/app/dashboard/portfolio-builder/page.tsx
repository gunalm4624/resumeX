import PageContainer from '@/components/layout/page-container';
import ComingSoon from '@/components/coming-soon';

export default function PortfolioBuilderPage() {
  return (
    <PageContainer>
      <div className="flex flex-1 flex-col space-y-6 py-1">
        <ComingSoon description="Turn your resume into a beautiful, shareable portfolio site. We’re putting the final touches on this experience." />
      </div>
    </PageContainer>
  );
}


