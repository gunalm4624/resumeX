import PageContainer from '@/components/layout/page-container';

export default function SavedResumesPage() {
  return (
    <PageContainer>
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <h1 className="text-3xl font-bold text-foreground">Saved Resumes</h1>
        <p className="text-muted-foreground text-center max-w-md">
          View and manage all your saved resumes. Access, edit, or download 
          your previously created resumes anytime.
        </p>
        <div className="mt-8">
          <div className="bg-muted rounded-lg p-8 text-center">
            <p className="text-sm text-muted-foreground">
              Saved resumes interface will be implemented here
            </p>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
