import { Box, IconButton } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React from "react";
import { matchPath, useLocation, useNavigate } from "react-router-dom";

function BackBtn() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [disabled, setDisabled] = React.useState(false);

  React.useEffect(() => {
    setDisabled(matchPath(pathname, '/')?.pathname ? true : false);
  }, [pathname]);


  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        justifyContent: 'left',
        bgcolor: 'background.default',
        color: 'text.primary'
      }}
    >
      <IconButton disabled={disabled} sx={{ ml: 1 }} onClick={() => navigate(-1)} color="inherit">
        <ArrowBackIcon />
      </IconButton>
    </Box>
  );
}

export default BackBtn;