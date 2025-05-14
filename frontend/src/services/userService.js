// gọi API
import AuthorizedAxiosInstance from '~/utils/authorizedAxios.js'
import { API_ROOT } from '~/utils/constants.js'

export const getUsers = async (page = 1, limit = 10) => {
  try {
    const response = await AuthorizedAxiosInstance.get(
      `${API_ROOT}/v1/users?page=${page}&limit=${limit}`
    )
    return { users: response.data, total: response.data.length }
  } catch (error) {
    console.error('Lỗi khi lấy danh sách người dùng:', error)
    return { users: [], total: 0 }
  }
}

export const deleteUser = async (id) => {
  try {
    await AuthorizedAxiosInstance.delete(`${API_ROOT}/v1/users/${id}`)
    return true
  } catch (error) {
    console.error('Lỗi khi xoá người dùng:', error)
    return false
  }
}
