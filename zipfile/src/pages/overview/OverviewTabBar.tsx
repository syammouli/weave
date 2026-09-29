import { useMemo } from 'react'
import type { OverviewTabId } from './constants'
import type { AgentData } from '@/types/agent'
import { Box, Stack } from '@mui/material';

const TAB_CONFIG: { id: OverviewTabId; label: string; iconPath: string }[] = [
  { id: 'available-agents', label: 'Available Agents', iconPath: '/images/overview/icons/Brain.svg' },
  { id: 'integrated-tools', label: 'Integrated Tools', iconPath: '/images/overview/icons/SecondTab.svg' },
  { id: 'agent-architecture', label: 'Agent Architecture', iconPath: '/images/overview/icons/ThirdTab.svg' },
  { id: 'agent-in-action', label: 'Agent in Action', iconPath: '/images/overview/icons/FourthTab.svg' },
  { id: 'business-wins', label: 'Business Wins', iconPath: '/images/overview/icons/Frame.svg' },
]

interface OverviewTabBarProps {
  activeTab: OverviewTabId
  onTabChange: (id: OverviewTabId) => void
  data: AgentData | undefined
}

const SELECTED_TAB_STYLE_S = {
  border: '1.5px solid #FFF',
  background: 'linear-gradient(71deg, #3C3C2A 25.55%, #5C5946 116.22%)',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.10)',
}

export function OverviewTabBar({ activeTab, onTabChange, data }: OverviewTabBarProps) {
  const tabs = useMemo(() => {
    if (!data?.agents?.length) {
      return TAB_CONFIG.filter(t => t.id !== 'available-agents')
    }
    return TAB_CONFIG
  }, [data])

  return (
    <Stack sx={{ width: '100%', gap: '16px' }} direction={'row'}>
      {tabs.map(({ id, label, iconPath }) => {
        const isActive = activeTab === id
        return (
          <Box
            component={'button'}
            key={id}
            type="button"
            onClick={() => onTabChange(id)}
            aria-current={isActive ? 'page' : undefined}
            sx={{
              display: 'flex',
              p: '8px',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '14px',
              flexShrink: 0,
              borderRadius: '10px',
              flex: 1,
              border: '1.999px solid transparent',
              cursor: 'pointer',
              fontSize: '14px',
              color: '#808080',
              ...(isActive && SELECTED_TAB_STYLE_S)
            }}
          >
            <span
              aria-hidden="true"
              className="h-4 w-4 shrink-0 transition-colors duration-150"
              style={{
                backgroundColor: isActive ? 'rgba(252, 207, 12, 1)' : 'rgba(0, 0, 0, 1)',
                maskImage: `url("${iconPath}")`,
                maskRepeat: 'no-repeat',
                maskPosition: 'center',
                maskSize: 'contain',
                WebkitMaskImage: `url("${iconPath}")`,
                WebkitMaskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                WebkitMaskSize: 'contain'
              }}
            />
            <span className={`uppercase ${isActive ? 'text-[#FFF]' : 'text-[#000]'}`}>{label}</span>
          </Box>
        )
      })}
    </Stack>
  )

  return (
    <div className="flex min-h-12.5 items-stretch gap-2 overflow-x-auto sm:gap-1">
      {tabs.map(({ id, label, iconPath }) => {
        const isActive = activeTab === id
        return (
          <button
            key={id}
            type="button"
            onClick={() => onTabChange(id)}
            aria-current={isActive ? 'page' : undefined}
            className={[
              'group inline-flex flex-1 cursor-pointer items-center justify-center gap-2 px-4 text-xs font-semibold uppercase tracking-wider transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30 whitespace-nowrap',
              isActive ? 'text-[#1A1A1A]' : 'text-[#6B7280] hover:text-[#1A1A1A]',
            ].join(' ')}
            style={isActive ? {
              borderRadius: '10.5px',
              border: '1.5px solid #FFFFFF',
              background: 'rgba(122, 126, 114, 0.2)',
              boxShadow: '0 0 7.5px 0 rgba(0,0,0,0.12)',
              backdropFilter: 'blur(1.5px)',
              WebkitBackdropFilter: 'blur(1.5px)',
            } : { borderRadius: '10.5px' }}
          >
            <span
              aria-hidden="true"
              className="h-4 w-4 shrink-0 transition-colors duration-150"
              style={{
                backgroundColor: isActive ? '#1A1A1A' : '#9CA3AF',
                maskImage: `url("${iconPath}")`,
                maskRepeat: 'no-repeat',
                maskPosition: 'center',
                maskSize: 'contain',
                WebkitMaskImage: `url("${iconPath}")`,
                WebkitMaskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                WebkitMaskSize: 'contain'
              }}
            />
            <span className={isActive ? 'text-[#1A1A1A]' : 'group-hover:text-[#1A1A1A]'}>{label}</span>
          </button>
        )
      })}
    </div>
  )
}
