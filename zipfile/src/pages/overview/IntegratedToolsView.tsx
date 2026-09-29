import { useMemo, useState } from 'react'
import type { AgentData } from '@/types/agent'
import { Box, Typography } from '@mui/material';

const CLASSNAME_ICON_MAP: Record<string, string> = {
  s3Icon: '/images/overview/icons/S3.svg',
  microsoftIcon: '/images/overview/icons/Outlook.svg',
  pdfIcon: '/images/overview/icons/PDF.svg',
  mongoIcon: '/images/overview/icons/MongoDb.svg',
  sapIcon: '/images/overview/icons/SAP.svg',
  gptIcon: '/images/overview/icons/ChatGPT.svg',
  weaviateIcon: '/images/overview/icons/Weaviate.svg',
}

function ToolChip({ name, iconUrl }: { name: string; iconUrl: string }) {
  const [broken, setBroken] = useState(false)

  return (
    <Box
      sx={{
        display: 'flex',
        p: '12.987px',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: '16px',
        gap: 1,
        border: '0.999px solid rgba(0, 0, 0, 0.10)',
        backgroundColor: '#FFF',
      }}
    >
      {!broken ? (
        <img
          src={iconUrl}
          alt=""
          className="h-8 w-8 shrink-0 object-contain"
          onError={() => setBroken(true)}
        />
      ) : (
        <Typography
          sx={{
            color: '#161616',
            fontFeatureSettings: "'liga' off, 'clig' off",
            fontFamily: 'Inter',
            fontSize: '18px',
            fontWeight: 600,
            lineHeight: '24px',
          }}
        >
          {name.slice(0, 2).toUpperCase()}
        </Typography>
      )}
      <span className="whitespace-nowrap text-[15px] font-semibold text-[#161616]">{name}</span>
    </Box>
  )
}

export function IntegratedToolsView({ data }: { data: AgentData | undefined }) {
  const tools = useMemo(() => {
    return (
      data?.tools?.map(t => ({
        name: t?.name || '',
        iconUrl: t?.imageIconSrc || CLASSNAME_ICON_MAP[t?.className?.trim() || ''] || '/images/overview/icons/ChatGPT.svg',
      })) ?? []
    )
  }, [data])

  if (!tools.length) {
    return (
      <div className="flex min-h-[200px] items-center justify-center">
        <p className="text-sm text-[#9CA3AF]">No integrated tools available.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-wrap gap-3 py-6 justify-center w-full">
      {tools.map((tool, i) => (
        <ToolChip key={`${tool.name}-${i}`} name={tool.name} iconUrl={tool.iconUrl} />
      ))}
    </div>
  )
}
