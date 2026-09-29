import { useMemo, useState } from 'react'
import type { OverviewTabId } from './constants'
import type { AgentData } from '@/types/agent';

const TAB_CONFIG: { id: OverviewTabId; label: string; iconPath: string }[] = [
  { id: 'available-agents', label: 'Available Agents', iconPath: '/images/overview/icons/Brain.svg' },
  { id: 'integrated-tools', label: 'Integrated Tools', iconPath: '/images/overview/icons/SecondTab.svg' },
  { id: 'agent-architecture', label: 'Agent Architecture', iconPath: '/images/overview/icons/ThirdTab.svg' },
  { id: 'agent-in-action', label: 'Agent in Action', iconPath: '/images/overview/icons/FourthTab.svg' },
]
const EXPAND_ICON = '/images/overview/icons/Expand.svg'
const COLLAPSE_ICON = '/images/overview/icons/Collpase.svg'

interface OverviewSidePanelProps {
  activeTab: OverviewTabId
  onTabChange: (id: OverviewTabId) => void
  data: AgentData | undefined
}

/**
 * Dark persistent side panel — Tailwind layout + Figma-aligned tokens:
 * bg gradient #191919 → #080808, border #232323, active chip #2F3028 / text #E4E0C7, accent glow rgba(239,177,72,0.08)
 */
export function OverviewSidePanel({ activeTab, onTabChange, data }: OverviewSidePanelProps) {
  const [collapsed, setCollapsed] = useState(false)

  const tabConfig = useMemo(() => {
    let tab = TAB_CONFIG;
    if (!data?.agents?.length) {
      tab = tab.filter(t => t.id !== 'available-agents')
    }
    return tab;
  }, [data])

  return (
    <aside
      className={`flex h-full w-full flex-col rounded-2xl border-2 border-white/70 bg-gradient-to-b from-[#4D4E43] to-[#000000] p-3 text-white shadow-[inset_0_0_80px_rgba(239,177,72,0.08),0px_1px_4px_rgba(0,0,0,0.2)] ${
        collapsed ? 'lg:w-[96px]' : 'lg:w-[272px]'
      } ${collapsed ? 'min-h-[400px]' : 'min-h-[480px]'} lg:shrink-0`}
      aria-label="Agent overview sections"
    >
      <nav className={`flex flex-1 flex-col gap-4 ${collapsed ? 'items-center' : ''}`}>
        {tabConfig.map(({ id, label, iconPath }) => {
          const isActive = activeTab === id
          return (
            <button
              key={id}
              type="button"
              onClick={() => onTabChange(id)}
              aria-current={isActive ? 'page' : undefined}
              aria-label={collapsed ? label : undefined}
              title={collapsed ? label : undefined}
              className={[
                'group flex cursor-pointer rounded-[10px] text-sm font-medium transition-colors duration-150',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EFB148] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A]',
                collapsed
                  ? 'h-[60px] w-[60px] min-h-[60px] min-w-[60px] max-h-[60px] max-w-[60px] items-center justify-center px-3 py-2'
                  : 'w-full items-center gap-2.5 px-3 py-2 text-left',
                isActive
                  ? 'bg-black/25 text-white shadow-[0px_1px_2px_rgba(16,24,40,0.05)]'
                  : 'text-[#A9A9A9] hover:bg-black/25 hover:text-white',
              ].join(' ')}
            >
              <span
                aria-hidden="true"
                className={`h-7 w-7 shrink-0 transition-colors duration-150 ${
                  isActive ? 'bg-[#FCCF0C]' : 'bg-[#A9A9A9] group-hover:bg-[#FFFFFFCC] group-focus-visible:bg-[#FFFFFFCC]'
                }`}
                style={{
                  maskImage: `url("${iconPath}")`,
                  maskRepeat: 'no-repeat',
                  maskPosition: 'center',
                  maskSize: 'contain',
                  WebkitMaskImage: `url("${iconPath}")`,
                  WebkitMaskRepeat: 'no-repeat',
                  WebkitMaskPosition: 'center',
                  WebkitMaskSize: 'contain',
                }}
              />
              {!collapsed && (
                <span
                  className="cursor-pointer leading-none"
                  style={{
                    color: '#FFF',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: 500,
                    lineHeight: '16px',
                  }}
                >
                  {label}
                </span>
              )}
            </button>
          )
        })}
      </nav>

      <button
        type="button"
        onClick={() => setCollapsed((v) => !v)}
        aria-label={collapsed ? 'Expand side tabs' : 'Collapse side tabs'}
        className="mb-3 mt-2 flex h-10 w-10 cursor-pointer items-center justify-center self-center rounded-[10px] text-[#BEBEBE] transition-colors hover:bg-black/25 hover:text-white"
      >
        <img
          src={collapsed ? EXPAND_ICON : COLLAPSE_ICON}
          alt=""
          className="object-contain"
        />
      </button>
    </aside>
  )
}