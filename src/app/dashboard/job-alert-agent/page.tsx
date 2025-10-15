import PageContainer from '@/components/layout/page-container';
import ComingSoon from '@/components/coming-soon';

export default function JobAlertAgentPage() {
  return (
    <PageContainer>
      <div className="flex flex-1 flex-col space-y-6 py-1">
        <ComingSoon description="Set up role, location, and frequency preferences to get curated job alerts." />
      </div>
    </PageContainer>
  );
}


