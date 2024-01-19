export interface IAppState {
  snackbar?: ISnackBarState;
  dialog?: IDialogState;
}

interface ISnackBarState {
  text?: string;
  type?: "error" | "success" | "warning" | "info";
  open?: boolean;
}

interface IDialogState {
  title?: string;
  text?: string;
  type?: "warning" | "info";
  open?: boolean;
  handleOkClick?: () => void;
}

export const initialState: IAppState = {
  snackbar: {},
  dialog: {},
};
