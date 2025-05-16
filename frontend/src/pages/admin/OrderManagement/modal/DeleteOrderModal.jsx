import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  Typography
} from '@mui/material'
import styleAdmin from '~/components/StyleAdmin.jsx'

const DeleteOrderModal = ({ open, onClose, onConfirm, order }) => {
  const [isDeleting, setIsDeleting] = React.useState(false)

  const handleDelete = async () => {
    if (!order?._id) return
    setIsDeleting(true)
    try {
      await onConfirm(order._id)
      onClose()
    } catch (error) {
      console.error('Xoá đơn hàng thất bại:', error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth='sm'
      BackdropProps={{
        sx: styleAdmin.OverlayModal
      }}
    >
      <DialogTitle>Xác nhận xoá đơn hàng</DialogTitle>
      <DialogContent dividers>
        <Typography>
          Bạn có chắc chắn muốn xoá đơn hàng <strong>{order?._id || ''}</strong>{' '}
          không? Hành động này không thể hoàn tác.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ padding: '16px 24px' }}>
        <Button color='inherit' onClick={onClose} disabled={isDeleting}>
          Huỷ
        </Button>
        <Button
          variant='contained'
          color='error'
          onClick={handleDelete}
          disabled={isDeleting}
          startIcon={isDeleting ? <CircularProgress size={20} /> : null}
          sx={{ textTransform: 'none' }}
        >
          {isDeleting ? 'Đang xoá' : 'Xoá'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteOrderModal
