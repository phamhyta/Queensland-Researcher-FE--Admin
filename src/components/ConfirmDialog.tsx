import { DialogTitle, Dialog, DialogContent, DialogActions, Button } from '@mui/material'
interface ConfirmationDialogRawProps
{
    id: string
    keepMounted: boolean
    value: string
    open: boolean
    title: string,
    content: string,
    onClose: ( value?: string ) => void
}

const ConfirmDialog = ( props: ConfirmationDialogRawProps ) =>
{
    const { onClose, value, open, title, content } = props
    const handleCancel = () =>
    {
        onClose()
    }

    const handleOk = () =>
    {
        onClose( value )
    }
    return 
    <>
        <Dialog
            sx={ { '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } } }
            maxWidth="xs"
            open={ open }
        >
            <DialogTitle>{ title }</DialogTitle>
            <DialogContent dividers>
                { content }
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={ handleCancel }>
                    Cancel
                </Button>
                <Button onClick={ handleOk }>Ok</Button>
            </DialogActions>
        </Dialog>

    </>
}

export default ConfirmDialog