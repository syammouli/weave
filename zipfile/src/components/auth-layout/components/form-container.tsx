import {
    Box,
    Typography,
    useTheme,
} from "@mui/material";
import { type ReactNode } from "react";
import BrandLogo from "@/components/logo/brand-logo";
import { brandLogoStyle, formContainerInnerStyles } from "@/pages/login/form/styles";

const FormContainer = ({ formContainer }: { formContainer: ReactNode }) => {
    const { palette } = useTheme();

    return (
        <Box className="form-container-wrapper" sx={{ py: 4 }}>
            <Box className="form-container-inner" sx={formContainerInnerStyles}>
                <BrandLogo style={brandLogoStyle()} />

                <Typography
                    className="form-welcome-title"
                    sx={{ color: palette.common.black, mt: "20px" }}
                >
                    Welcome to Weave Agent Marketplace
                </Typography>
                {formContainer && formContainer}
            </Box>
        </Box>
    );
};

export default FormContainer;
