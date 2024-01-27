import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { FaRegQuestionCircle } from "react-icons/fa";

export default function AlertDialog() {
    const [{ dialog }, dispatch] = useStateValue();

    const handleClose = () => {
        dispatch({
            type: actionType.SET_DIALOG,
            payload: {
                open: false,
                title: undefined,
                type: undefined,
                text: undefined,
                handleOkClick: undefined,
            },
        });
    };
    if (dialog?.title)
        return (
            <React.Fragment>
                <Dialog
                    open={dialog?.open || false}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    sx={{
                        ".MuiPaper-root": {
                            maxWidth: "450px",
                        },
                    }}
                >
                    <DialogTitle
                        id="alert-dialog-title"
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyItems: "center",
                            ".MuiDialogTitle-root": {
                                fontSize: "14px",
                                fontWeight: "bold",
                            },
                        }}
                    >
                        <FaRegQuestionCircle color={dialog.type === "warning" ? "red" : "blue"}></FaRegQuestionCircle>
                        <p className="ml-2 mt-1 text-[16px] font-medium text-neutral-600">{dialog?.title}</p>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <div className="text-sm"> {dialog?.text}</div>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            disableFocusRipple
                            onClick={() => {
                                dialog?.handleOkClick?.();
                                handleClose();
                            }}
                            color={dialog.type}
                        >
                            OK
                        </Button>
                        <Button
                            // variant="contained"
                            onClick={handleClose}
                            disableFocusRipple
                        >
                            CANCEL
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        );
    return <></>;
}
