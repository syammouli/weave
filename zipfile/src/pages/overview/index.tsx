import { useEffect, useState } from 'react'
import type { OverviewTabId } from './constants'
import { OverviewHero } from './OverviewHero'
import { OverviewTabBar } from './OverviewTabBar'
import { AvailableAgentsView } from './AvailableAgentsView'
import { BusinessWinsView } from './BusinessWinsView'
import { IntegratedToolsView } from './IntegratedToolsView'
import { SystemArchitectureView } from './SystemArchitectureView'
import { AgentAnalyticsView } from './AgentAnalyticsView'
import { useQuery } from '@tanstack/react-query'
import { getAgentListQueryOptions } from '@/hooks/useOverviewQueries'
import type { AgentData } from '@/types/agent'
import { PageLoader } from '@/components/ui/spinner'
import { useParams } from 'react-router-dom'
import { Box } from '@mui/material'
// import { BackButton } from '@/components/ui/back-button'

function OverviewTabContent({
  tab,
  data,
}: {
  tab: OverviewTabId;
  data: AgentData | undefined;
}) {
  switch (tab) {
    case 'available-agents':
      if (!data?.agents?.length) return null;
      return <AvailableAgentsView data={data} />;

    case 'business-wins':
      return <BusinessWinsView data={data} />;

    case 'integrated-tools':
      return <IntegratedToolsView data={data} />;

    case 'agent-architecture':
      return <SystemArchitectureView data={data} />;

    case 'agent-in-action':
      return <AgentAnalyticsView data={data} />;

    default:
      return null;
  }
}

// ─── Main Page ───────────────────────────────────────────────────────

export default function OverviewPage() {
  const params = useParams<{ id: string; categoryId: string }>();

  const id = params.id as string;
  const categoryId = params.categoryId as string;

  // API Call
  const { data, isLoading } = useQuery({
    ...getAgentListQueryOptions({ id }),
    enabled: !!id,
  });

  // Active tab state
  const [activeTab, setActiveTab] =
    useState<OverviewTabId>('integrated-tools');

  useEffect(() => {
    setActiveTab(
      data?.agents?.length ? 'available-agents' : 'integrated-tools'
    );
  }, [data?.agents]);

  // Loading state
  if (isLoading) {
    return <PageLoader title="Fetching agent details..." />;
  }

  return (
    <div className="h-[calc(100vh-60px)] overflow-hidden flex flex-col px-4 sm:px-8 py-8 2xl:px-20">
      <div className="mx-auto flex flex-col items-center gap-8 w-full 2xl:max-w-9xl h-full min-h-0">
        {/* Back button — kept for future use
        <div className="grid w-full shrink-0" style={{ gridTemplateColumns: '1fr auto 1fr' }}>
          <div className="flex items-start">
            <BackButton onClick={() => navigate(`/dashboard/${params?.category}/agents`)} />
          </div>
          <OverviewHero data={data} />
          <div />
        </div>
        */}
        <div className="shrink-0 w-full flex justify-center">
          <OverviewHero data={data} />
        </div>
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            flex: 1,
            minHeight: 0,
            p: '18px',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '20px',
            borderRadius: '16px',
            background: 'rgba(255, 255, 255, 0.34)',
            boxShadow: '0 0.999px 4px rgba(0, 0, 0, 0.20)',
            border: '1.999px solid #FFF',
          }}
        >
          <div className="w-full shrink-0">
            <OverviewTabBar
              activeTab={activeTab}
              onTabChange={setActiveTab}
              data={data}
            />
          </div>
          <Box
            sx={{
              flex: 1,
              minHeight: 0,
              width: '100%',
              overflowY: 'auto',
              display: 'flex',
              alignItems: 'flex-start',
            }}
          >
            <OverviewTabContent
              data={data}
              tab={activeTab}
            />
          </Box>
        </Box>
      </div>
    </div>
  )
}