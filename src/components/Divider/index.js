import { Box, Typography, Divider as MUIDivider } from "@mui/material";
const styles = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  marginTop: "16px",
  marginBottom: "26px",
};
export default function Divider() {
  return (
    <Box sx={styles}>
      <MUIDivider sx={{ flex: "1" }} />
      <Typography variant="caption" component="span">
        OR
      </Typography>
      <MUIDivider sx={{ flex: "1" }} />
    </Box>
  );
}
