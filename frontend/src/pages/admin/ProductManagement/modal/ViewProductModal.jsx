import React, { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Grid,
  Typography,
  Divider
} from '@mui/material'

const ViewProductModal = ({ open, onClose, product }) => {
  const imageList = Array.isArray(product?.image) ? product.image : []
  const [selectedImage, setSelectedImage] = useState(imageList[0] || '')

  const handleImageClick = (img) => {
    setSelectedImage(img)
  }

  if (!product) return null

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='md'
      fullWidth
      PaperProps={{
        sx: {
          mt: 8,
          maxHeight: '85vh'
        }
      }}
    >
      <DialogTitle>Chi tiết sản phẩm</DialogTitle>
      <DialogContent
        dividers
        sx={{ maxHeight: 'calc(85vh - 64px)', overflowY: 'auto' }}
      >
        <Grid container spacing={2}>
          {/* Cột ảnh */}
          <Grid item xs={12} md={5}>
            {selectedImage && (
              <Box
                component='img'
                src={selectedImage}
                alt='Ảnh sản phẩm'
                sx={{
                  width: '500px',
                  height: 300,
                  objectFit: 'contain',
                  backgroundColor: '#f5f5f5',
                  borderRadius: 2,
                  border: '1px solid #ccc',
                  mb: 1,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              />
            )}

            {/* Thumbnail ảnh nhỏ */}
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {imageList.map((img, index) => (
                <Box
                  key={index}
                  component='img'
                  src={img}
                  alt={`Ảnh ${index + 1}`}
                  onClick={() => handleImageClick(img)}
                  sx={{
                    width: 64,
                    height: 64,
                    objectFit: 'cover',
                    borderRadius: 1,
                    border:
                      img === selectedImage
                        ? '2px solid #001f5d'
                        : '1px solid #ccc',
                    cursor: 'pointer'
                  }}
                />
              ))}
            </Box>
          </Grid>

          {/* Cột thông tin */}
          <Grid item xs={12} md={7} width='calc(98% - 500px)'>
            <Box sx={{ width: '100%' }}>
              <Typography
                variant='subtitle2'
                color='text.secondary'
                gutterBottom
              >
                Tên sản phẩm
              </Typography>
              <Typography variant='body1' gutterBottom>
                {product.name}
              </Typography>
              <Divider sx={{ my: 1 }} />

              <Typography
                variant='subtitle2'
                color='text.secondary'
                gutterBottom
              >
                Giá
              </Typography>
              <Typography variant='body1' gutterBottom>
                {product.price?.toLocaleString()} VNĐ
              </Typography>
              <Divider sx={{ my: 1 }} />

              <Typography
                variant='subtitle2'
                color='text.secondary'
                gutterBottom
              >
                Danh mục
              </Typography>
              <Typography variant='body1' gutterBottom>
                {product.categoryId.name}
              </Typography>
              <Divider sx={{ my: 1 }} />

              <Typography
                variant='subtitle2'
                color='text.secondary'
                gutterBottom
              >
                Số lượng
              </Typography>
              <Typography variant='body1' gutterBottom>
                {product.quantity}
              </Typography>
              <Divider sx={{ my: 1 }} />

              <Typography
                variant='subtitle2'
                color='text.secondary'
                gutterBottom
              >
                Trạng thái
              </Typography>
              <Typography variant='body1'>
                {product.destroy ? 'Ngừng bán' : 'Đang bán'}
              </Typography>
              <Divider sx={{ my: 1 }} />
            </Box>
          </Grid>
        </Grid>

        {/* Cột mô tả nằm ở dưới cùng */}
        <Box sx={{ width: '100%', mt: 2 }}>
          <Typography variant='subtitle2' color='text.secondary' gutterBottom>
            Mô tả
          </Typography>
          <Typography
            variant='body1'
            gutterBottom
            sx={{
              width: '100%',
              display: 'block',
              whiteSpace: 'normal',
              overflow: 'visible',
              wordWrap: 'break-word'
            }}
          >
            {product.description}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ padding: '16px 24px' }}>
        <Button color='error' variant='contained' onClick={onClose}>
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ViewProductModal
