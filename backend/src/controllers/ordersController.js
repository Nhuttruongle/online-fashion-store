import { StatusCodes } from 'http-status-codes'

import { ordersService } from '~/services/ordersService'

const createOrder = async (req, res, next) => {
  try {
    // Lấy Danh mục sản phẩm mới tạo từ tầng Service chuyển qua
    const result = await ordersService.createOrder(req.jwtDecoded._id, req.body)

    // Có kết quả thì trả về Client
    res.status(StatusCodes.CREATED).json(result)
  } catch (err) {
    next(err)
  }
}

const getOrderList = async (req, res, next) => {
  try {
    // Lấy danh sách Danh mục sản phẩm từ tầng Service chuyển qua
    const result = await ordersService.getOrderList()

    // Có kết quả thì trả về Client
    res.status(StatusCodes.OK).json(result)
  } catch (err) {
    next(err)
  }
}

const getOrder = async (req, res, next) => {
  try {
    const productId = req.params.productId

    const result = await ordersService.getOrder(productId)

    res.status(StatusCodes.OK).json(result)
  } catch (err) {
    next(err)
  }
}

const updateOrder = async (req, res, next) => {
  try {
    const productId = req.params.productId

    const result = await ordersService.updateOrder(productId, req.body)

    res.status(StatusCodes.OK).json(result)
  } catch (err) {
    next(err)
  }
}

const deleteOrder = async (req, res, next) => {
  try {
    const productId = req.params.productId

    const result = await ordersService.deleteOrder(productId)

    res.status(StatusCodes.OK).json(result)
  } catch (err) {
    next(err)
  }
}

export const ordersController = {
  createOrder,
  getOrderList,
  getOrder,
  updateOrder,
  deleteOrder
}
