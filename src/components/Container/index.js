import { Box } from "@mui/material";
// import { blue, red } from "@mui/material/colors";

export const styles = {
  marginTop: "150px",
  width: "460px",
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  
};

export default function Container({ children }) {
  return <Box sx={styles}>{children}</Box>;
}
