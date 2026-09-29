import type { AgentData } from '@/types/agent'
import { Box, Stack } from '@mui/material'
import VideoPlayer from './video-player'

export function AgentAnalyticsView({ data }: { data: AgentData | undefined }) {
  const videoUrl = data?.videoUrl?.[0]

  if (!videoUrl) {
    return (
      <div className="flex min-h-[200px] items-center justify-center w-full">
        <p className="text-sm text-[#9CA3AF]">No video available.</p>
      </div>
    )
  }

  return (
    <Stack sx={{ justifyContent: 'center', alignItems: 'center', width: '100%', my: 9, mb: 12 }}>
      <Box
        sx={{
          width: '785.748px',
          height: '301.821px',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            borderRadius: 2,
            backgroundColor: 'rgba(174, 165, 143, 0.10)',
            width: '100%',
            height: '100%',
            position: 'absolute'
          }}
        >
          <Box
            sx={{
              borderRadius: '15.835px',
              backgroundColor: 'rgba(174, 165, 143, 0.10)',
              width: '100%',
              height: '100%',
              transform: 'scaleY(1.2) scaleX(.9)',
              '& .vedeo_player': {
                transform: 'scaleY(calc(1 / 1.2))',
              },
            }}
          >
            <Box
              sx={{
                height: '100%',
                width: '100%',
                transform: 'scaleX(.9)',
                position: 'absolute',
                top: -70,
                minHeight: '440px'
              }}
            >
              <VideoPlayer videoUrl={videoUrl} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Stack>
  )
}
