import Switch from "@mui/material/Switch";

interface ToggleProps {
	defaultChecked?: boolean;
}

export const Toggle = ({ defaultChecked = false }: ToggleProps) => (
	<Switch
		defaultChecked={defaultChecked}
		size="small"
		sx={{
			"& .MuiSwitch-switchBase.Mui-checked": {
				color: "rgb(249 115 22)",
			},
			"& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
				backgroundColor: "rgb(249 115 22)",
			},
		}}
	/>
);
