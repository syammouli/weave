import { useState } from 'react'
import { Box, Typography } from '@mui/material'
import type { AgentData } from '@/types/agent';
import line from '@/assets/module/overview/dotted_line.svg'

const SYSTEM_ARCHITECTURE_IMAGE = '/images/overview/icons/figma-system-architecture-diagram.svg'

export function SystemArchitectureView({ data }: { data: AgentData | undefined }) {
  const [imgFailed, setImgFailed] = useState(false)

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        width: '100%',
        background: `url(${line}) repeat`,
        backgroundSize: 'contain',
      }}
    >
      {!imgFailed ? (
        <div className="flex h-full w-full items-center justify-center">
          {data?.architectureImage?.map((i, key) => {
            return (
              <Box
                key={key}
                component="img"
                src={i ?? ''}
                alt="System architecture diagram"
                onError={() => setImgFailed(true)}
                sx={{
                  width: '1020px',
                  // mixBlendMode: 'multiply',
                  // filter: 'contrast(1)',
                  aspectRatio: '107 / 54',
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                  objectPosition: 'center',
                  display: 'block',
                }}
              />
            )
          })}

        </div>
      ) : (
        <div className="flex h-full min-h-0 items-center justify-center p-6 text-center">
          <Typography sx={{ color: '#6b7280', fontSize: '0.95rem' }}>
            Add architecture asset at
            {' '}
            <Box component="code" sx={{ bgcolor: '#f3f4f6', px: 0.75, py: 0.2, borderRadius: 0.75 }}>
              {SYSTEM_ARCHITECTURE_IMAGE}
            </Box>
          </Typography>
        </div>
      )}
    </Box>
  )
}