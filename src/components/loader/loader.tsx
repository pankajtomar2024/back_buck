import { Backdrop, Box } from "@mui/material";

const RotatingImage = () =>
  //@ts-ignore

  {
    return (
      <Box
        component="img"
        src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExMWJlNTI3MTQydzVvZjRnYno0Z2drM2IzdjFkOTZ5dWZqaWEwODMweSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/13vSD7ajIJwgb6/giphy.webp"
        alt="Logo"
        sx={{
          width: "100px", // Adjust size as needed
          height: "100px", // Adjust size as needed
          animation: "spin 2s linear infinite",
          "@keyframes spin": {
            "0%": {
              transform: "rotate(0deg)",
            },
            "100%": {
              transform: "rotate(360deg)",
            },
          },
        }}
      />
    );
  };

const LoaderBackdrop = ({
  //@ts-ignore
  openloader,
  //@ts-ignore
}) => (
  <Backdrop
    sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
    open={openloader}
  >
    <RotatingImage />
  </Backdrop>
);

export default LoaderBackdrop;
