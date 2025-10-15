import PageContainer from '@/components/layout/page-container';
import ComingSoon from '@/components/coming-soon';

export default function JobAlertAgentPage() {
  return (
    <PageContainer>
      <div className="flex flex-1 flex-col space-y-6 py-1">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight mb-0">Job Alert Agent</h2>
        </div>
        <ComingSoon description="Set up role, location, and frequency preferences to get curated job alerts." />
      </div>
    </PageContainer>
  );
}


