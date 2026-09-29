import businessWinsBg from '@/assets/businessWinsBg.svg'
import businessWinsLogo from '@/assets/businessWinsLogo.svg'
import type { AgentData } from '@/types/agent'
import { Box, Grid, Stack, Typography } from '@mui/material';

type Win = { value: string; label: string }

export function BusinessWinsView({ data }: { data: AgentData | undefined }) {
  const wins: Win[] = (data?.businessWins ?? []) as Win[]

  if (!wins.length) {
    return (
      <div className="flex min-h-[200px] items-center justify-center w-full">
        <p className="text-sm text-[#9CA3AF]">No business wins data available.</p>
      </div>
    )
  }

  return (
    <Box
      sx={{
        background: `url(${businessWinsBg}) no-repeat`,
        backgroundSize: 'contain 40%',
        minHeight: '400px',
        backgroundPosition: 'center',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
      component={Grid}
      container
    >
      <Stack sx={{ gap: '14px' }} component={Grid} size={{ lg: 8 }}>
        {wins.map((win, index) => {
          return (
            <Stack sx={{ p: '8px', gap: '1px' }} key={index.toString()}>
              <Typography
                sx={{
                  color: '#161616',
                  fontFeatureSettings: "'liga' off, 'clig' off",
                  fontFamily: 'Inter',
                  fontSize: '15px',
                  fontWeight: 600,
                  lineHeight: '28.987px',
                }}
                noWrap
                variant='h6'
              >
                {win.value}
              </Typography>
              <Typography
                sx={{
                  color: '#525252',
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
              >
                {win.label}
              </Typography>
            </Stack>
          )
        })}
      </Stack>

      <Stack
        component={Grid}
        size={{ lg: 4 }}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '17.918px',
          borderRadius: '10px',
          backgroundColor: 'rgba(255, 255, 255, 0.50)',
          backdropFilter: 'blur(4px)',
          p: 5,
        }}
      >

        <Box
          sx={{
            width: '57.682px',
            height: '57.682px',
            borderRadius: '14.099px',
            border: '0.776px solid rgba(255, 255, 255, 0.05)',
            display: 'flex',
            alignItems:'center',
            justifyContent: 'center',
            background: `radial-gradient(173.14% 144.49% at 100.12% 106.37%, #334351 0%, #000 100%),#343419`,
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 58 53" fill="none" className='-mr-[5px]'>
            <g filter="url(#filter0_d_2901_11222)">
              <path d="M18.2245 35.9525C18.9721 37.2978 20.4173 38.1033 21.9547 38.0316L29.0405 37.7014L12.7505 8.39031C12.0028 7.0451 10.5576 6.23959 9.02031 6.31123L1.93451 6.64142L18.2245 35.9525Z" fill="url(#paint0_linear_2901_11222)" />
            </g>
            <g filter="url(#filter1_d_2901_11222)">
              <path d="M37.9667 45.0541C38.7143 46.3993 40.1595 47.2048 41.6969 47.1332L48.7827 46.803L32.4926 17.4919C31.745 16.1467 30.2998 15.3411 28.7625 15.4128L21.6767 15.743L37.9667 45.0541Z" fill="url(#paint1_linear_2901_11222)" />
            </g>
            <g filter="url(#filter2_d_2901_11222)">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M6.01295 18.7699L5.90214 19.0884C5.13497 21.2924 4.71769 23.6613 4.71764 26.1292C4.71764 37.9543 14.304 47.5404 26.1292 47.5407C29.1451 47.5407 32.0131 46.916 34.6143 45.7919L35.3186 45.4875L35.9045 46.6771C36.2542 47.3871 36.7291 48.0117 37.2928 48.5328L38.178 49.3505L37.0839 49.8562C33.7514 51.3972 30.0399 52.2596 26.1292 52.2596C11.6982 52.2593 0 40.5602 0 26.1292C6.95468e-05 22.0598 0.9308 18.2051 2.5919 14.7694L3.31152 13.2817L6.01295 18.7699ZM34.934 46.5332C33.285 47.2457 31.5326 47.7641 29.7056 48.0603C31.532 47.7641 33.2841 47.2468 34.9327 46.5345L35.1798 47.035C35.5743 47.8359 36.1093 48.538 36.7426 49.1238H36.7451C36.1905 48.6111 35.7119 48.0087 35.3364 47.3292L35.1811 47.0337L34.934 46.5332ZM19.771 47.4235C21.7852 48.024 23.9185 48.3494 26.1279 48.3494C27.2732 48.3494 28.3982 48.2608 29.4967 48.0934C28.3985 48.2607 27.274 48.3482 26.1292 48.3482L25.556 48.3405C23.5502 48.2897 21.6108 47.972 19.771 47.4235ZM4.69217 31.9905C4.23087 30.2996 3.964 28.5283 3.91778 26.7023L3.91141 26.1292C3.91146 23.5698 4.3441 21.1115 5.14049 18.8234L3.31789 15.1209L3.31661 15.1222L5.13922 18.8247C4.34283 21.1128 3.91019 23.571 3.91014 26.1304C3.91014 28.1588 4.18297 30.1236 4.69217 31.9905Z" fill="url(#paint2_linear_2901_11222)" />
              <path fill-rule="evenodd" clip-rule="evenodd" d="M26.1292 0C40.5602 0 52.2593 11.6982 52.2596 26.1292C52.2596 31.0566 50.8936 35.6674 48.5214 39.6019L47.7585 40.8654L45.4264 36.1312L45.2519 35.7784L45.4238 35.4243C46.7803 32.6139 47.5407 29.4613 47.5407 26.1292C47.5404 14.304 37.9543 4.71764 26.1292 4.71764C22.4613 4.71772 19.0109 5.63978 15.9946 7.26369L15.2585 7.66107L14.8216 6.77205C14.4188 5.95457 13.8534 5.25065 13.176 4.68962L12.273 3.94198L13.2932 3.36629C17.0851 1.22355 21.4653 7.97253e-05 26.1292 0ZM26.1292 0.806227C21.608 0.806307 17.3634 1.99191 13.6893 4.06807C17.3632 1.99229 21.6072 0.807581 26.1279 0.807501C40.1134 0.807501 51.4506 12.1449 51.4508 26.1304C51.4508 26.8963 51.4143 27.6541 51.3476 28.4026C51.4143 27.6536 51.4521 26.8955 51.4521 26.1292C51.4518 12.1436 40.1147 0.806227 26.1292 0.806227Z" fill="url(#paint3_linear_2901_11222)" />
            </g>
            <path d="M46.7764 5.73535C47.5733 5.73535 48.6918 6.16393 49.04 7.36426H49.041C49.3395 8.36257 50.0781 10.1968 51.8135 11.5723C52.615 12.201 53.5491 12.661 54.584 12.957H54.583C55.612 13.2466 56.3094 14.1876 56.3096 15.2344C56.3096 16.2859 55.6058 17.2305 54.5693 17.5156L54.5586 17.5186C53.5421 17.79 52.6294 18.2574 51.8135 18.8975L51.8076 18.9023C50.0597 20.2585 49.3255 22.087 49.0488 23.0791L49.0469 23.085C48.7607 24.0948 47.827 24.8018 46.7764 24.8018C45.7325 24.8017 44.8044 24.1039 44.5117 23.1045V23.1055C44.2132 22.1072 43.4745 20.273 41.7393 18.8975L41.4326 18.6689C40.7028 18.1556 39.8743 17.7707 38.9688 17.5117V17.5107C37.9404 17.2207 37.2432 16.2809 37.2432 15.2344C37.2433 14.183 37.9471 13.2382 38.9834 12.9531L38.9941 12.9502C40.0106 12.6788 40.9234 12.2123 41.7393 11.5723L41.7451 11.5674C43.493 10.2112 44.2273 8.38275 44.5039 7.39062C44.8432 6.16993 45.9735 5.73536 46.7764 5.73535Z" fill="white" stroke="#171E24" stroke-width="2.936" />
            <defs>
              <filter id="filter0_d_2901_11222" x="1.9375" y="6.30664" width="27.1016" height="31.8589" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dy="0.130423" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.6 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2901_11222" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2901_11222" result="shape" />
              </filter>
              <filter id="filter1_d_2901_11222" x="21.6797" y="15.4082" width="27.1016" height="31.8589" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dy="0.130423" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.6 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2901_11222" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2901_11222" result="shape" />
              </filter>
              <filter id="filter2_d_2901_11222" x="0" y="0" width="52.2578" height="52.3902" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dy="0.130423" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.6 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2901_11222" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2901_11222" result="shape" />
              </filter>
              <linearGradient id="paint0_linear_2901_11222" x1="7.32981" y1="9.52391" x2="26.9491" y2="56.364" gradientUnits="userSpaceOnUse">
                <stop offset="0.456731" stop-color="#FCCF0C" />
                <stop offset="1" stop-color="#846C00" />
              </linearGradient>
              <linearGradient id="paint1_linear_2901_11222" x1="27.072" y1="18.6255" x2="46.6913" y2="65.4656" gradientUnits="userSpaceOnUse">
                <stop offset="0.456731" stop-color="#FCCF0C" />
                <stop offset="1" stop-color="#846C00" />
              </linearGradient>
              <linearGradient id="paint2_linear_2901_11222" x1="2.36715" y1="-2.0552" x2="67.8953" y2="50.9106" gradientUnits="userSpaceOnUse">
                <stop offset="0.456731" stop-color="#FCCF0C" />
                <stop offset="1" stop-color="#846C00" />
              </linearGradient>
              <linearGradient id="paint3_linear_2901_11222" x1="2.36715" y1="-2.0552" x2="67.8953" y2="50.9106" gradientUnits="userSpaceOnUse">
                <stop offset="0.456731" stop-color="#FCCF0C" />
                <stop offset="1" stop-color="#846C00" />
              </linearGradient>
            </defs>
          </svg>
        </Box>

        <Typography
          sx={{
            color: '#161616',
            fontFeatureSettings: "'liga' off, 'clig' off",
            fontFamily: 'Inter',
            fontSize: '20px',
            fontWeight: 500,
            lineHeight: '18.993px',
          }}
        >
          Business Impacts
        </Typography>
        <Typography
          sx={{
            color: '#000',
            textAlign: 'center',
            fontFeatureSettings: "'liga' off, 'clig' off",
            fontFamily: 'Inter',
            fontSize: '14px',
            fontWeight: 400,
            lineHeight: '24px',
          }}
        >
          <b>Weave Agents</b> redefine how industries operate by turning disconnected processes into a cohesive, intelligent system. Through advanced AI capabilities spanning vision, automation, and analytics businesses gain real time visibility, proactive insights, and operational control.
        </Typography>
      </Stack>
    </Box>
  )

  return (
    <div className="relative grid min-h-[400px] grid-cols-1 gap-8 overflow-hidden py-6 lg:grid-cols-[1fr_auto_320px]">
      {/* Left — metrics list */}
      <div className="flex flex-col divide-y divide-black/[0.06]">
        {wins.map((win, i) => (
          <div key={i} className="py-6 first:pt-0 last:pb-0">
            <p className="mb-1 text-[15px] font-bold leading-none tracking-tight text-[#111111]">
              {win.value}
            </p>
            <p className="text-[14px] leading-snug text-[#525252]">{win.label}</p>
          </div>
        ))}
      </div>

      {/* Center — decorative watermark */}
      <div className="pointer-events-none hidden select-none items-center justify-center lg:flex">
        <img
          src={businessWinsBg}
          alt=""
          aria-hidden="true"
          className="h-[340px] w-[340px] object-contain opacity-20"
        />
      </div>

      {/* Right — Business Impacts panel */}
      <div className="flex flex-col items-center rounded-2xl border border-black/[0.06] bg-white/70 p-8 text-center shadow-sm backdrop-blur-sm">
        <div className="mb-4 flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-[#171E24] shadow-md">
          <img src={businessWinsLogo} alt="Weave" className="h-10 w-10 object-contain" />
        </div>
        <h3 className="mb-4 text-[22px] font-semibold text-[#111111]">Business Impacts</h3>
        <p className="text-[13px] leading-relaxed text-[#525252]">
          <strong className="font-semibold text-[#111111]">Weave Agents</strong> redefine how
          industries operate by turning disconnected processes into a cohesive, intelligent system.
          Through advanced AI capabilities spanning vision, automation, and analytics businesses gain
          real time visibility, proactive insights, and operational control.
        </p>
      </div>
    </div>
  )
}
