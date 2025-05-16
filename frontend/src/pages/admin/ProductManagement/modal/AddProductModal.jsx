import React, { useState, useRef, useEffect } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  IconButton,
  Divider
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useForm, Controller } from 'react-hook-form'

import { addProduct } from '~/services/productService'
import useCategories from '~/hook/useCategories'
import AddCategoryModal from '~/pages/admin/CategorieManagement/modal/AddCategoryModal.jsx'
import StyleAdmin from '~/components/StyleAdmin'
import styleAdmin from '~/components/StyleAdmin.jsx'

const URI = 'https://api.cloudinary.com/v1_1/dkwsy9sph/image/upload'
const CloudinaryProduct = 'product_upload'

const uploadToCloudinary = async (file) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', 'demo_unsigned')
  formData.append('folder', CloudinaryProduct)

  const res = await fetch(URI, {
    method: 'POST',
    body: formData
  })

  const data = await res.json()
  return data.secure_url
}

const AddProductModal = ({ open, onClose, onSuccess }) => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: {
      name: '',
      description: '',
      price: '',
      image: [],
      categoryId: '',
      quantity: '',
      origin: '',
      slug: '',
      sizes: [], // phải là mảng
      colors: [] // phải là mảng
    }
  })

  const [images, setImages] = useState([{ file: null, preview: '' }])
  const { categories, loading, fetchCategories } = useCategories()
  const [categoryOpen, setCategoryOpen] = useState(false)
  const fileInputRefs = useRef([])

  const handleImageChange = (index, file) => {
    const newImages = [...images]
    newImages[index] = { file, preview: URL.createObjectURL(file) }

    if (index === images.length - 1 && file && newImages.length < 9) {
      newImages.push({ file: null, preview: '' })
    }

    setImages(newImages)
  }

  const handleRemoveImage = (index) => {
    const newImages = [...images]
    newImages.splice(index, 1)
    if (newImages.length === 0 || newImages[newImages.length - 1].file) {
      newImages.push({ file: null, preview: '' })
    }
    setImages(newImages)
  }

  const onSubmit = async (data) => {
    try {
      const imageUrls = []
      for (const img of images) {
        if (img.file) {
          const url = await uploadToCloudinary(img.file)
          imageUrls.push(url)
        }
      }

      const result = await addProduct({
        name: data.name,
        description: data.description,
        price: Number(data.price),
        image: imageUrls,
        categoryId: data.categoryId,
        quantity: Number(data.quantity),
        origin: data.origin,
        sizes: data.sizes || [],
        colors: data.colors || []
      })

      if (result) {
        onSuccess()
        onClose()
        reset()
        setImages([{ file: null, preview: '' }])
      } else {
        alert('Thêm sản phẩm không thành công')
      }
    } catch (error) {
      console.error('Lỗi khi thêm sản phẩm:', error)
      alert('Có lỗi xảy ra, vui lòng thử lại')
    }
  }

  useEffect(() => {
    if (open) fetchCategories()
  }, [open])

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth='xl'
        PaperProps={{ sx: { mt: 8, maxHeight: '90vh', width: '90vw' } }}
        BackdropProps={{
          sx: styleAdmin.OverlayModal
        }}
      >
        <DialogTitle>Thêm Sản Phẩm</DialogTitle>
        <Divider />
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent sx={{ display: 'flex', gap: 2, overflowY: 'auto' }}>
            <Box sx={{ flex: 2 }}>
              <TextField
                label='Tên sản phẩm'
                fullWidth
                margin='normal'
                {...register('name', {
                  required: 'Tên sản phẩm không được bỏ trống'
                })}
                error={!!errors.name}
                helperText={errors.name?.message}
                sx={StyleAdmin.InputCustom}
              />
              <TextField
                label='Mô tả'
                fullWidth
                multiline
                rows={3}
                margin='normal'
                {...register('description', {
                  required: 'Mô tả không được bỏ trống'
                })}
                error={!!errors.description}
                helperText={errors.description?.message}
                sx={StyleAdmin.InputCustom}
              />
              <TextField
                label='Giá (VNĐ)'
                type='number'
                fullWidth
                margin='normal'
                {...register('price', {
                  required: 'Giá không được bỏ trống'
                })}
                error={!!errors.price}
                helperText={errors.price?.message}
                sx={StyleAdmin.InputCustom}
              />
              <TextField
                label='Số lượng'
                type='number'
                fullWidth
                margin='normal'
                {...register('quantity', {
                  required: 'Số lượng không được bỏ trống'
                })}
                error={!!errors.quantity}
                helperText={errors.quantity?.message}
                sx={StyleAdmin.InputCustom}
              />
              <TextField
                label='Xuất xứ'
                fullWidth
                margin='normal'
                {...register('origin', {
                  required: 'Xuất xứ không được bỏ trống'
                })}
                error={!!errors.origin}
                helperText={errors.origin?.message}
                sx={StyleAdmin.InputCustom}
              />
              <FormControl
                fullWidth
                margin='normal'
                error={!!errors.sizes}
                sx={StyleAdmin.FormSelect}
              >
                <InputLabel>Kích cỡ</InputLabel>
                <Controller
                  name='sizes'
                  control={control}
                  rules={{ required: 'Kích cỡ không được bỏ trống' }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      label='Kích cỡ'
                      multiple
                      MenuProps={{
                        PaperProps: { sx: StyleAdmin.FormSelect.SelectMenu }
                      }}
                    >
                      {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                        <MenuItem key={size} value={size}>
                          {size}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                <Typography variant='caption' color='error'>
                  {errors.sizes?.message}
                </Typography>
              </FormControl>
              <FormControl
                fullWidth
                margin='normal'
                error={!!errors.colors}
                sx={StyleAdmin.FormSelect}
              >
                <InputLabel>Màu sắc</InputLabel>
                <Controller
                  name='colors'
                  control={control}
                  rules={{ required: 'Màu sắc không được bỏ trống' }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      label='Màu sắc'
                      multiple
                      MenuProps={{
                        PaperProps: { sx: StyleAdmin.FormSelect.SelectMenu }
                      }}
                    >
                      {['Đỏ', 'Xanh dương', 'Đen', 'Trắng', 'Vàng'].map(
                        (color) => (
                          <MenuItem key={color} value={color}>
                            {color}
                          </MenuItem>
                        )
                      )}
                    </Select>
                  )}
                />
                <Typography variant='caption' color='error'>
                  {errors.colors?.message}
                </Typography>
              </FormControl>

              <FormControl
                fullWidth
                margin='normal'
                error={!!errors.categoryId}
                sx={StyleAdmin.FormSelect}
              >
                <InputLabel>Danh mục</InputLabel>
                <Controller
                  name='categoryId'
                  control={control}
                  rules={{ required: 'Danh mục không được bỏ trống' }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      label='Danh mục'
                      value={field.value}
                      disabled={loading}
                      MenuProps={{
                        PaperProps: { sx: StyleAdmin.FormSelect.SelectMenu }
                      }}
                    >
                      {categories
                        ?.filter((c) => !c.destroy)
                        .map((cat) => (
                          <MenuItem key={cat._id} value={cat._id}>
                            {cat.name}
                          </MenuItem>
                        ))}
                      <MenuItem onClick={() => setCategoryOpen(true)}>
                        Thêm danh mục mới
                      </MenuItem>
                    </Select>
                  )}
                />
                <Typography variant='caption' color='error'>
                  {errors.categoryId?.message}
                </Typography>
              </FormControl>
            </Box>

            <Box sx={{ flex: 1 }}>
              <Typography variant='subtitle1' sx={{ mb: 1 }}>
                Hình ảnh sản phẩm (tối đa 9 ảnh)
              </Typography>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                  gap: 2
                }}
              >
                {images.map((img, index) => (
                  <Box key={index} sx={{ position: 'relative' }}>
                    <input
                      type='file'
                      accept='image/*'
                      hidden
                      ref={(el) => (fileInputRefs.current[index] = el)}
                      onChange={(e) =>
                        handleImageChange(index, e.target.files[0])
                      }
                    />
                    <Box
                      sx={{
                        width: '100%',
                        height: '200px',
                        borderRadius: 1,
                        border: '1px solid #000',
                        overflow: 'hidden',
                        position: 'relative',
                        '&:hover .overlay, &:hover .overlay-bg': { opacity: 1 }
                      }}
                    >
                      {img.preview ? (
                        <>
                          <Box
                            component='img'
                            src={img.preview}
                            alt={`preview-${index}`}
                            sx={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover'
                            }}
                          />
                          <Box
                            className='overlay-bg'
                            sx={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              width: '100%',
                              height: '100%',
                              backgroundColor: 'rgba(0,0,0,0.3)',
                              opacity: 0,
                              transition: 'opacity 0.3s',
                              zIndex: 1
                            }}
                          />
                          <Box
                            sx={{
                              position: 'absolute',
                              top: 5,
                              left: 5,
                              zIndex: 2,
                              opacity: 0,
                              transition: 'opacity 0.3s'
                            }}
                            className='overlay'
                          >
                            <IconButton
                              size='small'
                              onClick={() =>
                                fileInputRefs.current[index]?.click()
                              }
                            >
                              <EditIcon
                                sx={{ fontSize: 18, color: '#2196f3' }}
                              />
                            </IconButton>
                          </Box>

                          {/* Icon xoá ở góc trên bên phải */}
                          <Box
                            sx={{
                              position: 'absolute',
                              top: 5,
                              right: 5,
                              zIndex: 2,
                              opacity: 0,
                              transition: 'opacity 0.3s'
                            }}
                            className='overlay'
                          >
                            <IconButton
                              size='small'
                              onClick={() => handleRemoveImage(index)}
                            >
                              <DeleteIcon
                                sx={{ fontSize: 18, color: '#f44336' }}
                              />
                            </IconButton>
                          </Box>
                        </>
                      ) : (
                        <Button
                          variant='outlined'
                          component='label'
                          sx={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderColor: '#000',
                            color: '#000',
                            fontSize: '12px'
                          }}
                        >
                          Thêm ảnh
                          <input
                            type='file'
                            accept='image/*'
                            hidden
                            onChange={(e) =>
                              handleImageChange(index, e.target.files[0])
                            }
                          />
                        </Button>
                      )}
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </DialogContent>
          <Divider />
          <DialogActions sx={{ padding: '16px 24px' }}>
            <Button onClick={onClose} color='inherit'>
              Hủy
            </Button>
            <Button
              type='submit'
              variant='contained'
              sx={{ backgroundColor: '#001f5d' }}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Đang thêm...' : 'Thêm'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Modal thêm danh mục */}
      <AddCategoryModal
        open={categoryOpen}
        onClose={() => setCategoryOpen(false)}
        onAdded={fetchCategories}
      />
    </>
  )
}

export default AddProductModal
