import {
	Button,
	Checkbox,
	FormLabel,
	IconButton,
	InputAdornment,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { authApi } from "@/api/auth";
import { useLoginMutation } from "@/hooks/useAuthMutations";
import { toast } from "@/lib/toast";
import { parseApiError } from "@/lib/utils";
import type { LoginCredentials } from "@/types";
import { Link } from "react-router-dom";

const Form = () => {
	const [showPassword, setShowPassword] = useState(false);

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginCredentials>({
		defaultValues: { email: "", password: "" },
	});

	const { mutateAsync: mutateLogin, isPending: isLoggingIn } =
		useLoginMutation();

	const onSSOLogin = () => {
		window.location.href = authApi.getSSOLoginUrl();
	};

	const onSubmit = async (data: LoginCredentials) => {
		try {
			const { user } = await mutateLogin(data);
			toast.success(
				`${user?.username || user?.first_name} logged in successfully`,
			);
		} catch (error) {
			toast.error(parseApiError(error) || "Something went wrong!");
		}
	};

	return (
		<Stack
			component="form"
			onSubmit={handleSubmit(onSubmit)}
			sx={{
				mt: "40px",
				gap: "26px",
			}}
		>
			<Stack sx={{ gap: 1 }}>
				<FormLabel>Work Email</FormLabel>
				<Controller
					name="email"
					control={control}
					rules={{
						required: "Email is required",
						pattern: {
							value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
							message: "Enter a valid email",
						},
					}}
					render={({ field }) => (
						<TextField
							{...field}
							variant="standard"
							error={!!errors.email}
							helperText={errors.email?.message}
						/>
					)}
				/>
			</Stack>
			<Stack sx={{ gap: 1 }}>
				<FormLabel>Password</FormLabel>
				<Controller
					name="password"
					control={control}
					rules={{ required: "Password is required" }}
					render={({ field }) => (
						<TextField
							{...field}
							variant="standard"
							type={showPassword ? "text" : "password"}
							error={!!errors.password}
							helperText={errors.password?.message}
							slotProps={{
								input: {
									endAdornment: (
										<InputAdornment position="end">
											<IconButton
												size="small"
												onClick={() => setShowPassword((prev) => !prev)}
												edge="end"
											>
												{showPassword ? (
													<VisibilityOffRoundedIcon sx={{ fontSize: 16 }} />
												) : (
													<VisibilityRoundedIcon sx={{ fontSize: 16 }} />
												)}
											</IconButton>
										</InputAdornment>
									),
								},
							}}
						/>
					)}
				/>
			</Stack>

			<Stack
				direction="row"
				sx={{
					justifyContent: "space-between",
					mt: "-10px",
				}}
			>
				<Stack
					direction="row"
					sx={{
						alignItems: "center",
					}}
				>
					<Checkbox size="small" />
					<FormLabel
						className="form-label-small"
						sx={({ palette }) => ({ color: palette.grey[500] })}
					>
						REMEMBER PASSWORD
					</FormLabel>
				</Stack>
				<Stack direction="row" sx={{ alignItems: "center" }}>
					<Typography
						className="form-forgot-password"
						sx={({ palette }) => ({ color: palette.grey[500] })}
					>
						FORGOT PASSWORD
					</Typography>
				</Stack>
			</Stack>

			<Button
				type="submit"
				variant="contained"
				color="primary"
				className="form-btn"
				endIcon={<ArrowForwardRoundedIcon sx={{ fontSize: 18 }} />}
				loading={isLoggingIn}
				disabled={isLoggingIn}
			>
				SIGN IN
			</Button>

			<Button
				variant="outlined"
				color="secondary"
				className="form-btn"
				onClick={onSSOLogin}
			>
				SIGN IN WITH SSO
			</Button>

			<Stack sx={{ justifyContent: "center", alignItems: "center" }}>
				<Typography
					className="form-no-account"
					sx={({ palette }) => ({ color: palette.grey[600] })}
				>
					DON'T HAVE AN ACCOUNT ?{" "}
					<Typography component={Link} to={'/sign-up'} className="form-signup-link">
						Sign Up
					</Typography>
				</Typography>
			</Stack>
		</Stack>
	);
};

export default Form;
