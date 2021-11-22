export const STATUS_TYPES_MAP = {
  NOTPAY: "WAIT_BUYER_PAY",
  PAYED: "WAIT_SELLER_SEND_GOODS",
  WAIT_BUYER_CONFIRM: "WAIT_BUYER_CONFIRM_GOODS",
  DONE: "TRADE_SUCCESS",
  CANCEL: "TRADE_CLOSED"
};

export const AFTER_SALE_STATUS = {
  "0": "待处理",
  "1": "处理中",
  "2": "已处理",
  "3": "已驳回",
  "4": "已关闭"
};

export const REFUND_STATUS = {
  "0": "等待商家审核",
  "1": "商家接受申请，等回寄",
  "2": "消费者回寄，等待商家收货确认",
  "3": "申请已驳回",
  "4": "商家已发货",
  "5": "退款驳回",
  "6": "退款成功",
  "7": "售后关闭"
};

export const PROMOTION_TAG = {
  single_group: "团购",
  full_minus: "满减",
  full_discount: "满折",
  full_gift: "满赠",
  normal: "秒杀",
  limited_time_sale: "限时特惠",
  plus_price_buy: "换购",
  member_preference: "会员限购"
};

export const DEFAULT_POINT_NAME = "积分";

export const DEFAULT_THEME = {
  colorPrimary: "#d42f29",
  colorMarketing: "#fba629",
  colorAccent: "#2e3030"
};

export const WGTS_NAV_MAP = {
  luckdraw: "/pages/member/point-draw"
};

export const DEFAULT_TABS = {
  config: {
    backgroundColor: "#ffffff",
    color: "#333333",
    selectedColor: "#E33420"
  },
  data: [
    {
      name: "home",
      pagePath: "/pages/index",
      text: "首页"
    },
    {
      name: "category",
      pagePath: "/pages/category/index",
      text: "分类"
    },
    {
      name: "cart",
      pagePath: "/pages/cart/espier-index",
      text: "购物车"
    },
    {
      name: "member",
      pagePath: "/pages/member/index",
      text: "我"
    }
  ],
  name: "tabs"
};

export default {};
