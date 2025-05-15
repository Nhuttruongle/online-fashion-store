// UserRow.jsx
import React from 'react'
import IconButton from '@mui/material/IconButton'
import { TableRow, Stack } from '@mui/material'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { StyledTableCell, StyledTableRow } from './UserTableStyles'

const styles = {
  groupIcon: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  iconStyle: {
    cursor: 'pointer'
  }
}

export default React.memo(function UserRow({ user, index, handleOpenModal }) {
  return (
    <StyledTableRow>
      <StyledTableCell sx={{ textAlign: 'center' }}>{index}</StyledTableCell>
      <StyledTableCell title={user.name}>
        {user.name
          ?.toLowerCase()
          .split(' ')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ') || ''}
      </StyledTableCell>
      <StyledTableCell title={user.email}>{user.email}</StyledTableCell>
      <StyledTableCell>
        {user.role === 'admin' ? 'QUẢN TRỊ' : 'KHÁCH HÀNG'}
      </StyledTableCell>
      <StyledTableCell className='hide-on-mobile'>
        {new Date(user.createdAt).toLocaleDateString()}
      </StyledTableCell>
      <StyledTableCell className='hide-on-mobile'>
        {new Date(user.updatedAt).toLocaleDateString()}
      </StyledTableCell>
      <StyledTableCell>
        <Stack direction='row' spacing={1} sx={styles.groupIcon}>
          <IconButton
            onClick={() => handleOpenModal('view', user)}
            size='small'
          >
            <RemoveRedEyeIcon />
          </IconButton>
          <IconButton
            onClick={() => handleOpenModal('edit', user)}
            size='small'
          >
            <BorderColorIcon />
          </IconButton>
          <IconButton
            onClick={() => handleOpenModal('delete', user)}
            size='small'
          >
            <DeleteForeverIcon />
          </IconButton>
        </Stack>
      </StyledTableCell>
    </StyledTableRow>
  )
})
