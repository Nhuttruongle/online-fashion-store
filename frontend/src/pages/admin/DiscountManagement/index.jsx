import React from 'react'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'

import useDiscounts from '~/hook/useDiscount'
import { updateDiscount, deleteDiscount } from '~/services/discountService'

// Lazy load modals
const AddDiscountModal = React.lazy(() => import('./modal/AddDiscountModal'))
const ViewDiscountModal = React.lazy(() => import('./modal/ViewDiscountModal'))
const EditDiscountModal = React.lazy(() => import('./modal/EditDiscountModal'))
const DeleteDiscountModal = React.lazy(
  () => import('./modal/DeleteDiscountModal')
)

const DiscountTable = React.lazy(() => import('./DiscountTable'))
const DiscountPagination = React.lazy(() => import('./DiscountPagination'))

function DiscountManagement() {
  const [page, setPage] = React.useState(1)
  const [selectedDiscount, setSelectedDiscount] = React.useState(null)
  const [modalType, setModalType] = React.useState(null)

  const { discounts, totalPages, loading, fetchDiscounts } = useDiscounts()

  React.useEffect(() => {
    fetchDiscounts(page)
  }, [page])

  const handleOpenModal = (type, discount) => {
    setSelectedDiscount(discount)
    setModalType(type)
  }

  const handleCloseModal = () => {
    setSelectedDiscount(null)
    setModalType(null)
  }

  const handleChangePage = (event, value) => setPage(value)

  const handleSaveDiscount = async (discountId, updatedData) => {
    const updated = await updateDiscount(discountId, updatedData)
    if (updated) await fetchDiscounts(page)
  }

  const handleDeleteDiscount = async (discountId) => {
    const deleted = await deleteDiscount(discountId)
    if (deleted) await fetchDiscounts(page)
  }
  // console.log('discounts', discounts)
  return (
    <>
      <Typography variant='h5' sx={{ mb: 2 }}>
        Quản lý mã giảm giá
      </Typography>
      <Button
        variant='contained'
        startIcon={<AddIcon />}
        onClick={() => setModalType('add')}
        sx={{ mb: 2, backgroundColor: '#001f5d' }}
      >
        Thêm mã giảm
      </Button>

      <React.Suspense fallback={<div>Loading...</div>}>
        <DiscountTable
          discounts={discounts}
          loading={loading}
          onAction={handleOpenModal}
        />

        {modalType === 'add' && (
          <AddDiscountModal
            open
            onClose={handleCloseModal}
            onAdded={() => fetchDiscounts(page)}
          />
        )}

        {modalType === 'view' && selectedDiscount && (
          <ViewDiscountModal
            open
            onClose={handleCloseModal}
            discount={selectedDiscount}
          />
        )}

        {modalType === 'edit' && selectedDiscount && (
          <EditDiscountModal
            open
            onClose={handleCloseModal}
            discount={selectedDiscount}
            onSave={handleSaveDiscount}
          />
        )}

        {modalType === 'delete' && selectedDiscount && (
          <DeleteDiscountModal
            open
            onClose={handleCloseModal}
            discount={selectedDiscount}
            onDelete={handleDeleteDiscount}
          />
        )}

        <DiscountPagination
          page={page}
          totalPages={totalPages}
          onPageChange={handleChangePage}
        />
      </React.Suspense>
    </>
  )
}

export default DiscountManagement
