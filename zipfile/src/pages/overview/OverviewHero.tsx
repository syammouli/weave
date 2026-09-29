import type { AgentData } from '@/types/agent'
import { alpha, Box, Button } from '@mui/material'
import { AiChatIcon } from '@/components/icons/AiChatIcon'
import { DeployIcon } from '@/components/icons/DeployIcon'

const USE_AGENT_ICON = '/images/overview/icons/Agent.svg'

export function OverviewHero({ data }: { data: AgentData | undefined }) {

  return (
    <div
      className="relative w-full xl:max-w-4xl 2xl:max-w-full"
    >
      <div className="flex flex-col items-center text-center gap-3 sm:gap-4">
        {/* Icon + Title */}
        <div className="flex items-start gap-[18px]">
          <div className="shrink-0 mt-1">
            <AgentBadge />
          </div>
          <h1 className="text-2xl font-[AvgarDD] sm:text-[34px] font-semibold leading-normal text-black tracking-wide text-center">
            {data?.title ?? ''}
          </h1>
        </div>
        {/* Description */}
        <p className="text-[#525252] text-center text-[14px] font-normal leading-[180%] [font-feature-settings:'liga'_off,'clig'_off]">
          {data?.description ?? ''}
        </p>

        {/* CTA buttons */}
        <div className="flex flex-wrap justify-center gap-3 mt-1">
          <Button
            variant='contained'
            startIcon={<img src={USE_AGENT_ICON} alt="" className="h-[18px] w-[18px] object-contain" />}
            size='large'
          >
            Use Agent
          </Button>
          <Button
            variant='contained'
            startIcon={<DeployIcon width={18} height={18} className="opacity-40" />}
            size='large'
            disabled
          >
            Deploy Agent
          </Button>
        </div>
      </div>
    </div>
  )
}


const AgentBadge = () => {
  return (
    <Box
      sx={{
        width: '48px',
        height: '48px',
        aspectRatio: '1/1',
        borderRadius: '9.355px',
        border: `1.403px solid #FFF`,
        background: 'rgba(149, 149, 149, 0.20)',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          borderRadius: '5.613px',
          display: 'flex',
          width: '22.452px',
          padding: '7.484px 0',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '11.226px',
          position: 'absolute',
          top: -12,
          right: -8
        }}
      >
        <Box
          sx={{
            backgroundColor: alpha('#198900', 0.25),
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '50%',
          }}
        >
          <Box
            sx={{
              borderRadius: '50%', // or '9999px'
              border: '4px solid rgba(33, 180, 0, 0.25)',
              opacity: 1,
              backgroundColor: '#198900',
              width: "7.484px",
              height: "7.484px",
              flexShrink: 0,
              aspectRatio: "1 / 1",
              m: .5
            }}
          />
        </Box>
      </Box>
      <AiChatIcon height={24} width={24} />
    </Box>
  )
}