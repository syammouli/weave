import { Box, Stack } from "@mui/material";
import "./partners.scss";

const frameworksModulesRow1 = import.meta.glob(
	"@/assets/module/market-place/frameworks/row1/*.svg",
	{ eager: true, query: "?url", import: "default" }
);

const frameworksModulesRow2 = import.meta.glob(
	"@/assets/module/market-place/frameworks/row2/*.svg",
	{ eager: true, query: "?url", import: "default" }
);

const row1 = Object.entries(frameworksModulesRow1).map(([path, src]) => ({
	name: path.split("/").pop()?.replace(".svg", "") ?? path,
	src: src as string,
}));

const row2 = Object.entries(frameworksModulesRow2).map(([path, src]) => ({
	name: path.split("/").pop()?.replace(".svg", "") ?? path,
	src: src as string,
}));

const Partners = () => {
	const row1Data = [
		...row1?.map((item) => ({ ...item, uid: `a-${item.name}` })),
		...row1?.map((item) => ({ ...item, uid: `a-${item.name}` })),
	];

	const row2Data = [
		...row2?.map((item) => ({ ...item, uid: `a-${item.name}` })),
		...row2?.map((item) => ({ ...item, uid: `a-${item.name}` })),
	];

	return (
		<Stack sx={{ gap: 2, mt: 2 }}>
			<Box className="partners-track-wrapper">
				<Stack
					direction={"row"}
					className="partners-track scroll-right"
					sx={{ gap: 1.5 }}
				>
					{row1Data?.map((item, index) => (
						<Box className="partner_item" component={"div"} key={item.uid}>
							<Box
								src={item.src}
								alt={`${index}_partner_image`}
								data-item={item.name}
								component={'img'}
								sx={{
									aspectRatio: '4/1.9'
								}}
							/>
						</Box>
					))}
				</Stack>
			</Box>
			<Box className="partners-track-wrapper">
				<Stack
					direction={"row"}
					className="partners-track scroll-left"
					sx={{ gap: 1.5 }}
				>
					{row2Data.map((item, index) => (
						<Box className="partner_item" component={"div"} key={item.uid}>
							<Box
								component={'img'}
								src={item.src}
								alt={`${index}_partner_image`}
								data-item={item.name}
								sx={{
									aspectRatio: '4/1.9'
								}}
							/>
						</Box>
					))}
				</Stack>
			</Box>
		</Stack>
	);
};

export default Partners;
