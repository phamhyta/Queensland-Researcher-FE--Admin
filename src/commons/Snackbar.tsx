import React from "react";
import { Alert, IconButton, Snackbar, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

const SnackbarPopup = () => {
  const [{ snackbar }, dispatch] = useStateValue();
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={() => {
          dispatch({
            type: actionType.SET_SNACKBAR,
            payload: { open: false },
          });
        }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );
  if (snackbar?.text)
    return (
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar open={snackbar?.open} autoHideDuration={3000} action={action}>
          <Alert
            onClose={() => {
              dispatch({
                type: actionType.SET_SNACKBAR,
                payload: { open: false, text: undefined, type: undefined },
              });
            }}
            severity={snackbar?.type}
            sx={{ width: "100%" }}
          >
            {snackbar?.text}
          </Alert>
        </Snackbar>
      </Stack>
    );

  return <></>;
};

export default SnackbarPopup;
