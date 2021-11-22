import req from './req'
import { transformPlatformUrl } from '@/utils/platform'

// 获取助力列表
export const getList = (param = {}) => req.get('/promotion/bargains', param)

// 获取助力配置
export const getDetail = (param = {}) => req.get(transformPlatformUrl('/alipay/pageparams/setting'), param)

// 获取助力详情
export const getUserBargain = (param = {}) => req.get('/promotion/userbargain', param)

// 发起助力
export const postUserBargain = (param = {}) => req.post('/promotion/userbargain', param)

// 支付
export const pay = (param = {}) => req.post('/order', param)

// 获取支付配置
export const getPayConfig = (param = {}) => req.get('/payment/config', param)

// 砍价
export const postDiscount = (param = {}) => req.post('/promotion/bargainlog', param)

// 小程序码
export const getCodeUrl = (param = {}) => req.get('/promotion/bargainfriendwxappcode', param)

// 获取订单列表
export const getOrderList = (param = {}) => req.get('/orders', param)

// 获取订单详情
export const getOrderDetail = (param = {}) => req.get(`/order/${param.order_id}`, param)