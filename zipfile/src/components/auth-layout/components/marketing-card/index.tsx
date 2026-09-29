import { Box } from "@mui/material";

interface MarketingCardProps {
	item: {
		key: string;
		src: string;
	};
}

const MarketingCard = ({ item }: MarketingCardProps) => {
	return (
		<Box
			className="marketing-card"
			component={'img'}
			src={item.src}
			alt={item.key}
			width={'100%'}
		/>
	);
};

export default MarketingCard;
