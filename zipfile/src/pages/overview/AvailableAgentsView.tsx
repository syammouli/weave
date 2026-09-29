import { useMemo } from 'react'
import type { AgentData } from '@/types/agent'
import { Box, Grid, Stack, Typography } from '@mui/material';

const CARD_ICONS = [
  '/images/overview/icons/agent-card-icon-1.svg',
  '/images/overview/icons/agent-card-icon-2.svg',
  '/images/overview/icons/agent-card-icon-3.svg',
  '/images/overview/icons/agent-card-icon-4.svg',
  '/images/overview/icons/dashboard-agent-active.svg',
]

export function AvailableAgentsView({ data }: { data: AgentData | undefined }) {
  const cards = useMemo(() => {
    return (
      data?.agents?.map((a, i) => ({
        title: a.title,
        desc: a.points?.join(' ') ?? '',
        iconUrl: CARD_ICONS[i % CARD_ICONS.length],
      })) ?? []
    )
  }, [data])

  return (
    <>
      <Grid container spacing={2} sx={{ width: '100%', justifyContent: 'center' }}>
        {cards.map((c, index) => {
          return (
            <Box
              key={index.toString()}
              size={{ lg: 4 }}
              component={Grid}
              sx={{
                display: 'flex',
                p: '23px 25px',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '6.987px',
                borderRadius: '16px',
                border: '0.999px solid rgba(0, 0, 0, 0.10)',
                background: 'linear-gradient(144deg, #F8F5E0 8.95%, #FFF 59.92%)',
                maxWidth: '370px'
              }}
            >
              <Stack direction={'row'} sx={{ gap: 1.5, width: '100%', minWidth: 0, alignItems: 'center' }}>
                <img
                  src={c?.iconUrl}
                  width={20}
                  style={{ flexShrink: 0 }}
                  alt={c?.title}
                />
                <Typography
                  sx={{
                    color: '#161616',
                    fontFeatureSettings: "'liga' off, 'clig' off",
                    fontFamily: 'Inter',
                    fontSize: '15px',
                    fontWeight: 600,
                    lineHeight: '28.987px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    minWidth: 0,
                  }}
                  title={c?.title}
                  variant='h6'
                >
                  {c?.title}
                </Typography>
              </Stack>
              <Typography
                sx={{
                  color: '#767676',
                  fontFeatureSettings: "'liga' off, 'clig' off",
                  fontFamily: 'Inter',
                  fontSize: '13px',
                  fontWeight: 400,
                  lineHeight: '25px',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
                title={c?.desc}
              >
                {c?.desc}
              </Typography>
            </Box>
          )
        })}
      </Grid >
    </>
  )
}
