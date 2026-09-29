import { Box, Grid, Stack, Typography } from "@mui/material";
import EnterpriseIcon from "@/assets/brain.svg";
import ProductivityIcon from "@/assets/productivity.png";
import IndustrialIcon from "@/assets/settingIndustrial.png";
import DataIcon from "@/assets/dataEngineering.svg";

import { AiChatIcon } from "@/components/icons/AiChatIcon";

import enterpriceBg from "@/assets/module/market-place/pillers/enterprise.svg";
import industrialBg from "@/assets/module/market-place/pillers/industrial.svg";
import data_engineeringBg from "@/assets/module/market-place/pillers/data_engineering.svg";
import productivityBg from "@/assets/module/market-place/pillers/productivity.svg";

import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMarketplaceCategoriesQueryOptions } from "@/hooks/useDashboard";

type CategoryName =
  | "Enterprise AI"
  | "Industrial AI"
  | "Data Engineering"
  | "Productivity";

const CATEGORY_ICONS: Record<CategoryName, string> = {
  "Enterprise AI": EnterpriseIcon,
  "Industrial AI": IndustrialIcon,
  "Data Engineering": DataIcon,
  "Productivity": ProductivityIcon,
};

const CATEGORY_BG: Record<CategoryName, string> = {
  "Enterprise AI": enterpriceBg,
  "Industrial AI": industrialBg,
  "Data Engineering": data_engineeringBg,
  "Productivity": productivityBg,
};

const IconFrame = ({ item }: { item: any }) => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "44px",
        height: "44px",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "12px",
        border: "1.2px solid #E6D48A",
        background: "#F6EDC9",
      }}
    >
      <img
        src={CATEGORY_ICONS[item.category_name as CategoryName]}
        width={20}
      />
    </Box>
  );
};

const Content = ({ item }: { item: any }) => {
  return (
    <Stack
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
      className="inner_card"
    >
      <Stack sx={{ gap: "24px", position: "relative", height: "100%" }}>
        {/* HEADER */}
        <Stack
          direction={"row"}
          sx={{
            justifyContent: "space-between",
            alignItems: "flex-start",
            p: "15px",
            pb: 0,
          }}
        >
          <IconFrame item={item} />

          <Box
            sx={{
              display: "flex",
              padding: "10px 14px",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: "10px",
              borderRadius: "8px",
              border: "1px solid #E6CE70",
              background:
                "linear-gradient(0deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.05) 100%), #E7D793",
              backgroundBlendMode: "plus-lighter, darken",
            }}
          >
            <AiChatIcon height={14} width={14} />
            <Typography
              sx={{
                color: "#000",
                fontFamily: "Inter",
                fontSize: "10px",
                fontStyle: "normal",
                fontWeight: 700,
                lineHeight: "11.578px",
                letterSpacing: "0.386px",
                textTransform: "uppercase",
              }}
            >
              {item.agent_count} AGENTS
            </Typography>
          </Box>
        </Stack>

        {/* CONTENT */}
        <Stack sx={{ gap: "12px", p: "15px", pt: 0 }}>
          <Typography
            sx={{
              color: "#000",
              fontFamily: "Inter",
              fontSize: "22px",
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "36px",
            }}
          >
            {item.category_name}
          </Typography>

          <Typography
            sx={{
              color: "rgba(0, 0, 0, 0.70)",
              fontSize: "12px",
              fontWeight: 400,
              lineHeight: "25px",
            }}
          >
            {item.description}
          </Typography>
        </Stack>

        {/* BG */}
        <Box
          component={"img"}
          src={CATEGORY_BG[item.category_name as CategoryName]}
          className="bottom_bg"
          alt="category background"
          sx={{
            position: "absolute",
            bottom: 0,
            backgroundBlendMode: "multiply",
            transform: "translateY(12px)",
            transition: "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />
      </Stack>
    </Stack>
  );
};

const MarketplaceCategory = () => {
  const { data: categories = [], isLoading } = useQuery(
    getMarketplaceCategoriesQueryOptions()
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Grid container spacing={2} sx={{ width: "100%" }}>
      {categories.map((item: any) => {
        return (
          <Grid
            size={3}
            key={item.category_id}
            component={Link}
            to={`/dashboard/${item.category_id}/agents`}
            sx={{
              height: "460px",
              borderRadius: "24px",
              border: "1.5px solid #FFF",
              background: "rgba(255, 255, 255, 0.34)",
              boxShadow: "0 0 3px 0 rgba(0, 0, 0, 0.10)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              p: 1,
              position: "relative",
              overflow: "hidden",
              isolation: "isolate",
              transformOrigin: "bottom center",
              transform: "scaleY(0.94)",
              ".outer_background": {
                transform: "translateY(16px) scaleY(calc(1 / 0.94))",
              },
              transition: "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
              "&:hover": {
                transform: "scaleY(1)",
                "& .outer_background": {
                  transform: "translateY(0)",
                  background: "linear-gradient(345deg, #FFF 43.92%, #F9F5E0 90.39%)",
                },
              },
            }}
          >
            <Box
              component="div"
              className="outer_background"
              sx={{
                position: "relative",
                width: "100%",
                height: "100%",
                borderRadius: "20px",
                background: "linear-gradient(341deg, #FFF 64.82%, #F6F4E8 89.05%)",
                overflow: "hidden",
                transition: "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              <Content item={item} />
            </Box>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default MarketplaceCategory;