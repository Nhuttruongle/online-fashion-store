// ProductInfoSection.jsx
import React from 'react'
import {
  Box,
  Typography,
  Button,
  IconButton,
  TextField,
  Chip,
  CircularProgress
} from '@mui/material'
import { styled } from '@mui/system'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'

const PriceTypography = styled(Typography)({
  color: '#d32f2f',
  fontWeight: 700
})

const VoucherChip = styled(Chip)({
  margin: '4px',
  backgroundColor: '#fff',
  border: '1px solid #ccc',
  cursor: 'pointer'
})

const VariantBox = styled(Box)(({ selected }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '8px 12px',
  backgroundColor: selected ? '#e3f2fd' : '#f9f9f9',
  border: selected ? '2px solid #1A3C7B' : '1px solid #e0e0e0',
  borderRadius: '8px',
  cursor: 'pointer',
  gap: 10,
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: selected ? '#e3f2fd' : '#f0f0f0',
    borderColor: selected ? '#1A3C7B' : '#bdbdbd'
  }
}))

const VariantImage = styled('img')({
  width: 40,
  height: 40,
  objectFit: 'cover',
  borderRadius: '6px'
})

const ProductInfoSection = ({
  product,
  quantity,
  setQuantity,
  coupons,
  isAdding,
  handleAddToCart,
  handleBuyNow,
  setOpenVoucherDrawer,
  // Variants props
  variants,
  selectedVariant,
  availableColors,
  availableSizes,
  selectedColor,
  selectedSize,
  handleColorChange,
  handleSizeChange,
  getCurrentPrice,
  getCurrentImages
}) => {
  const currentPrice = getCurrentPrice()
  const currentImages = getCurrentImages()

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 670 }}
    >
      <Typography
        variant='h5'
        fontWeight={700}
        sx={{ wordBreak: 'break-word', whiteSpace: 'pre-wrap' }}
      >
        {product?.name}
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {currentPrice?.discountPrice ? (
          <>
            <Typography
              variant='h5'
              sx={{ color: 'text.secondary', textDecoration: 'line-through' }}
            >
              {currentPrice.price.toLocaleString('vi-VN')}đ
            </Typography>
            <PriceTypography variant='h5'>
              {currentPrice.discountPrice.toLocaleString('vi-VN')}đ
            </PriceTypography>
          </>
        ) : (
          <PriceTypography variant='h5'>
            {typeof currentPrice?.price === 'number'
              ? currentPrice.price.toLocaleString('vi-VN') + 'đ'
              : 'Liên hệ'}
          </PriceTypography>
        )}
      </Box>

      <Box sx={{ border: '1px dashed #d32f2f', p: 1.5, borderRadius: 1 }}>
        <Typography variant='body2' color='error' fontWeight={700}>
          <LocalOfferIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
          KHUYẾN MÃI - ƯU ĐÃI
        </Typography>
        {coupons?.length > 0 ? (
          <Box sx={{ mt: 1 }}>
            {coupons.slice(0, 3).map((coupon) => (
              <Typography key={coupon.code} variant='body2'>
                👉 Nhập mã <b>{coupon.code}</b> GIẢM{' '}
                {coupon.type === 'percent'
                  ? `${coupon.amount}%${coupon.maxDiscount ? ` tối đa ${coupon.maxDiscount.toLocaleString()}đ` : ''}`
                  : `${coupon.amount.toLocaleString()}đ`}
              </Typography>
            ))}
          </Box>
        ) : (
          <Typography variant='body2' sx={{ mt: 1 }}>
            👉 Đang cập nhật khuyến mãi mới!
          </Typography>
        )}
      </Box>

      {coupons?.length > 0 && (
        <Box>
          <Typography variant='body2' fontWeight={700} sx={{ mb: 0.5 }}>
            Mã giảm giá
          </Typography>
          {coupons.slice(0, 3).map((coupon) => (
            <VoucherChip
              key={coupon.code}
              label={`VOUCHER ${coupon.type === 'percent' ? `${coupon.amount}%` : `${coupon.amount.toLocaleString()}đ`}`}
              onClick={() => setOpenVoucherDrawer(true)}
            />
          ))}
        </Box>
      )}

      {variants?.length > 0 && (
        <Box>
          <Typography variant='body2' fontWeight={700} sx={{ mb: 1 }}>
            Chọn phiên bản
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {availableColors?.map((color) => (
              <Box key={color.name}>
                <Typography
                  variant='body2'
                  fontWeight={600}
                  sx={{ mb: 1, color: '#666' }}
                >
                  Màu: {color.name}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                  {availableSizes
                    ?.filter((size) =>
                      variants.some(
                        (v) =>
                          v.color.name === color.name &&
                          v.size.name === size.name
                      )
                    )
                    ?.map((size) => {
                      const variant = variants.find(
                        (v) =>
                          v.color.name === color.name &&
                          v.size.name === size.name
                      )
                      const isSelected =
                        selectedColor === color.name &&
                        selectedSize === size.name

                      return (
                        <VariantBox
                          key={`${color.name}-${size.name}`}
                          selected={isSelected}
                          onClick={() => {
                            if (isSelected) {
                              handleColorChange(null)
                              handleSizeChange(null)
                            } else {
                              handleColorChange(color.name)
                              handleSizeChange(size.name)
                            }
                          }}
                        >
                          <VariantImage
                            src={color.image || '/default.jpg'}
                            alt={color.name}
                            onError={(e) => (e.target.src = '/default.jpg')}
                          />
                          <Box>
                            <Typography variant='body2' fontWeight={600}>
                              Size {size.name}
                            </Typography>
                            <Typography
                              variant='caption'
                              color='text.secondary'
                            >
                              {variant?.exportPrice?.toLocaleString('vi-VN')}đ
                            </Typography>
                          </Box>
                        </VariantBox>
                      )
                    })}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      )}

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography variant='body2' fontWeight={700}>
          Số lượng
        </Typography>
        <IconButton
          onClick={() => setQuantity((q) => Math.max(1, Number(q) - 1))}
        >
          <RemoveIcon />
        </IconButton>
        <TextField
          value={quantity === '' ? '' : quantity}
          size='small'
          sx={{ width: 50 }}
          inputProps={{ style: { textAlign: 'center' }, readOnly: true }}
        />
        <IconButton
          onClick={() =>
            setQuantity((q) => {
              const maxQuantity =
                selectedVariant?.quantity || product?.quantity || 0
              return q < maxQuantity ? Number(q) + 1 : q
            })
          }
        >
          <AddIcon />
        </IconButton>
        <Typography color='text.secondary'>
          Kho: {selectedVariant?.quantity || product?.quantity || 0}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          variant='contained'
          disabled={isAdding}
          onClick={handleAddToCart}
          sx={{ backgroundColor: '#1A3C7B', color: 'white', flex: 1, py: 1.5 }}
          startIcon={
            isAdding ? <CircularProgress size={20} color='inherit' /> : null
          }
        >
          {isAdding ? 'Đang thêm...' : 'Thêm vào giỏ'}
        </Button>
        <Button
          variant='outlined'
          onClick={handleBuyNow}
          sx={{ borderColor: '#1A3C7B', color: '#1A3C7B', flex: 1, py: 1.5 }}
        >
          Mua ngay
        </Button>
      </Box>
    </Box>
  )
}

export default ProductInfoSection
