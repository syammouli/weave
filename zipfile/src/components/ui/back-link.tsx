import { Link } from "react-router-dom";
import Chevron from "@/assets/Chevron.svg";

interface BackLinkProps {
	to: string;
	label: string;
	/** Pass a custom icon element; defaults to the chevron SVG asset */
	icon?: React.ReactNode;
}

export const BackLink = ({ to, label, icon }: BackLinkProps) => (
	<div className="w-full flex justify-center mb-6">
		<Link
			to={to}
			className="flex items-center gap-1 hover:opacity-80 transition-opacity"
		>
			{icon ?? (
				<img
					src={Chevron}
					alt=""
					aria-hidden="true"
					className="object-contain mt-1"
				/>
			)}
			<p className="text-black font-medium text-sm">{label}</p>
		</Link>
	</div>
);
