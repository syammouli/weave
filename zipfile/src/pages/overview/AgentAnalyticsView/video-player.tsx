import { Box, IconButton, Slider } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import { useRef, useState, useCallback, useEffect } from "react";

const GOLD = "#C9A227";
const TRACK_BG = "rgba(255,255,255,0.30)";
const ICON_COLOR = "#ffffff";

const iconBtnSx = {
    color: ICON_COLOR,
    // padding: "4px",
    mt: '-5px',
    "&:hover": { color: GOLD },
    "& svg": { fontSize: 20 },
};

const VedeoPlayer = ({ videoUrl }: { videoUrl: string }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [playing, setPlaying] = useState(false);
    const [muted, setMuted] = useState(false);
    const [progress, setProgress] = useState(0);
    const [fullscreen, setFullscreen] = useState(false);

    const togglePlay = useCallback(() => {
        const v = videoRef.current;
        if (!v) return;
        if (v.paused) { v.play(); setPlaying(true); }
        else { v.pause(); setPlaying(false); }
    }, []);

    const toggleMute = useCallback(() => {
        const v = videoRef.current;
        if (!v) return;
        v.muted = !v.muted;
        setMuted(v.muted);
    }, []);

    const handleSeek = useCallback((_: Event, value: number | number[]) => {
        const v = videoRef.current;
        if (!v || !v.duration) return;
        const pct = Array.isArray(value) ? value[0] : value;
        v.currentTime = (pct / 100) * v.duration;
        setProgress(pct);
    }, []);

    const toggleFullscreen = useCallback(() => {
        const el = containerRef.current;
        if (!el) return;
        if (!document.fullscreenElement) {
            el.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }, []);

    useEffect(() => {
        const v = videoRef.current;
        if (!v) return;
        const onTimeUpdate = () => {
            if (v.duration) setProgress((v.currentTime / v.duration) * 100);
        };
        const onPlay = () => setPlaying(true);
        const onPause = () => setPlaying(false);
        v.addEventListener("timeupdate", onTimeUpdate);
        v.addEventListener("play", onPlay);
        v.addEventListener("pause", onPause);
        return () => {
            v.removeEventListener("timeupdate", onTimeUpdate);
            v.removeEventListener("play", onPlay);
            v.removeEventListener("pause", onPause);
        };
    }, []);

    useEffect(() => {
        const onFsChange = () => setFullscreen(!!document.fullscreenElement);
        document.addEventListener("fullscreenchange", onFsChange);
        return () => document.removeEventListener("fullscreenchange", onFsChange);
    }, []);

    return (
        <Box
            ref={containerRef}
            component={'div'}
            className="vedeo_player"
            sx={{
                transition: 'transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
                borderRadius: "15.831px",
                backgroundColor: "#1c1c1c",
                boxShadow: "0 3.958px 14.842px rgba(0, 0, 0, 0.25)",
                overflow: "hidden",
                height: "100%",
                width: "100%",
                position: "relative",
                cursor: "pointer",
            }}
            onClick={togglePlay}
        >
            {/* Video fills entire container */}
            <video
                ref={videoRef}
                src={videoUrl}
                style={{
                    width: "100%", height: "100%", objectFit: "cover", display: "block",
                }}
                autoPlay
                loop
                playsInline
            />

            {/* Toolbar — overlaid at bottom */}
            <Box
                onClick={(e) => e.stopPropagation()}
                sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    display: "flex",
                    alignItems: "center",
                    gap: "2px",
                    px: "10px",
                    py: "4px",
                    background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)",
                }}
            >
                <IconButton sx={iconBtnSx} onClick={togglePlay}>
                    {playing ? <PauseIcon /> : <PlayArrowIcon />}
                </IconButton>
                <IconButton sx={iconBtnSx}>
                    <SkipNextIcon />
                </IconButton>
                <IconButton sx={iconBtnSx} onClick={toggleMute}>
                    {muted ? <VolumeOffIcon /> : <VolumeUpIcon />}
                </IconButton>

                {/* Seek bar */}
                <Box sx={{ flex: 1, mx: "8px" }}>
                    <Slider
                        value={progress}
                        onChange={handleSeek}
                        size="small"
                        sx={{
                            color: GOLD,
                            padding: "8px 0",
                            "& .MuiSlider-track": {
                                background: `linear-gradient(90deg, ${GOLD}, #e8bb2e)`,
                                border: "none",
                                height: 4,
                            },
                            "& .MuiSlider-rail": {
                                background: TRACK_BG,
                                height: 4,
                                opacity: 1,
                            },
                            "& .MuiSlider-thumb": {
                                width: 12,
                                height: 12,
                                background: GOLD,
                                border: "2px solid #fff",
                                boxShadow: "0 0 0 2px rgba(0,0,0,0.3)",
                                "&:hover, &.Mui-focusVisible": {
                                    boxShadow: `0 0 0 6px rgba(201,162,39,0.2)`,
                                },
                                "&:before": { display: "none" },
                            },
                        }}
                    />
                </Box>

                <IconButton sx={iconBtnSx} onClick={toggleFullscreen}>
                    {fullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
                </IconButton>
            </Box>
        </Box>
    );
};

export default VedeoPlayer;
