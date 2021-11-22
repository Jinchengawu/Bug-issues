import React, { Component } from 'react';
import Taro, { getCurrentInstance } from '@tarojs/taro';
import { View, Text, Image, ScrollView, Button } from '@tarojs/components'
import { connect } from "react-redux";
import { AtButton, AtActionSheet, AtActionSheetItem, AtNoticebar } from 'taro-ui'
import {
  SpCheckbox,
  SpNote,
  TabBar,
  Loading,
  Price,
  SpNavBar,
  GoodsItem,
  SpRecommend,
  SpLogin,
  SpDefault,
  SpTabs,
  SpTabsPane
} from "@/components";
import {
  log,
  navigateTo,
  pickBy,
  classNames,
  showLoading,
  hideLoading,
  getThemeStyle,
  styleNames,
  getBrowserEnv,
  isNavbar
} from "@/utils";
import debounce from 'lodash/debounce'
import api from '@/api'
import S from '@/spx'
import { Tracker } from "@/service";
import { withPager, withLogin } from '@/hocs'
import entry from '@/utils/entry'
import { setPageTitle } from '@/utils/platform'
import CartItem from './comps/cart-item'
import { getDistributorId } from "@/utils/helper";

import './espier-index.scss'

@connect(
  ({ cart, colors }) => ({
    list: cart.list,
    cartIds: cart.cartIds,
    showLikeList: cart.showLikeList,
    colors: colors.current
  }),
  dispatch => ({
    onUpdateCart: list => dispatch({ type: "cart/update", payload: list }),
    onUpdateCartCount: count =>
      dispatch({ type: "cart/updateCount", payload: count })
  })
)
@withLogin(()=>{},1)
@withPager
export default class CartIndex extends Component {
  $instance = getCurrentInstance();
  static defaultProps = {
    list: null
  };

  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      loading: true,
      cartMode: "default",
      curPromotions: null,
      groups: [],
      likeList: [],
      invalidList: [],
      error: null,
      isPathQrcode: false,
      cartType: "normal",
      crossborder_show: false,
      // 消息通知
      remindInfo: {}
    };

    this.updating = false;
    this.lastCartId = null;
  }

  autoLoginFail=()=>{
    console.log("---autoLoginFail---")
    this.setState({ 
      loading:false
    })
  }

  componentDidMount() {
    setPageTitle( '购物车' )
    
    if (this.$instance.router.params && this.$instance.router.params.path === "qrcode") {
      this.setState({
        isPathQrcode: true
      });
    }
    this.getRemind();
    this.nextPage(); 
    if (!S.getAuthToken()) return; 
    this.fetchCart(list => {
      const groups = this.resolveActivityGroup(list);
      // this.props.list 此时为空数组
      setTimeout(() => {
        this.setState({
          groups,
          loading: false
        });
      }, 40);
    });
  }

  componentWillReceiveProps(nextProps) {
    console.log(
      "componentWillReceiveProps",
      nextProps.list,
      this.props.list,
      nextProps.list !== this.props.list
    );

    // if (nextProps.list !== this.props.list) {
    // 	const groups = this.resolveActivityGroup(nextProps.list)
    // 		this.setState({
    // 			groups
    // 		})
    // }
    const groups = this.resolveActivityGroup(nextProps.list);
    this.setState({
      groups
    });
  }

  // componentDidShow() {
  //   if (!S.getAuthToken() || this.state.loading) return;
  //   this.updateCart();
  // }

  onChangeLoginSuccess = async () => {
    this.updateCart();
  };

  // handleLoginClick = () => {
  //   S.login(this, true)
  // }

  handleClickItem = (item) => {
    const { distributor_id } = item;
    const dtid = distributor_id ? distributor_id : getDistributorId();
    const url = `/pages/item/espier-detail?id=${item.item_id}&dtid=${dtid}`
    Taro.navigateTo({
      url
    });
  };

  async fetch(params) {
    const { page_no: page, page_size: pageSize } = params;
    const query = {
      page,
      pageSize
    };
    const { list, total_count: total } = await api.cart.likeList(query);
    this.setState({
      likeList: [...this.state.likeList, ...list]
    });

    if (!S.getAuthToken()) {
      this.setState({
        loading: false
      });
    }

    return {
      total
    };
  }

  // 活动分组
  resolveActivityGroup(cartList = []) {
    console.log(cartList);
    const groups = cartList.map(shopCart => {
   
      const { list, used_activity = [], plus_buy_activity = [] } = shopCart;
 
      const tDict = list.reduce((acc, val) => {
        acc[val.cart_id] = val;
        return acc;
      }, {});
      const activityGrouping = shopCart.activity_grouping;
      // 活动列表
      const group = used_activity.map(act => {
        const activity = activityGrouping.find(
          a => String(a.activity_id) === String(act.activity_id)
        );
        const itemList = activity.cart_ids.map(id => {
          const cartItem = tDict[id];
          delete tDict[id];
          return cartItem;
        });
        // return Object.assign({},shopCart,{list: itemList,activity})
        return { list: itemList, activity };
      });
      //加价购商品
      const plusBuyList = [];
      plus_buy_activity.map(pitem => {
        const { plus_item } = pitem;
        if (plus_item) {
          const items = pickBy(plus_item, {
            item_id: "item_id",
            activity_id: pitem.activity_id,
            title: "item_name",
            img: ({ pics }) => pics[0],
            price: ({ price }) => (+price / 100).toFixed(2),
            market_price: ({ market_price }) =>
              (+market_price / 100).toFixed(2),
            num: 1,
            is_plus_buy: true, //加价购
            desc: "item_spec_desc"
          });
          plusBuyList.push(items);
        }
      });
      // 无活动列表
      group.push({ activity: null, list: Object.values(tDict) });
      return { shopInfo: shopCart, plusBuyList: [...plusBuyList], group };
    });
    return groups;
  }

  processCart({
    valid_cart = [],
    invalid_cart = [],
    cartType,
    crossborder_show,
    item_count = 0
  }) {
    // const res = await api.cart.count({ shop_type: 'distributor' })
    let cartCount = 0;
    const list = valid_cart.map(shopCart => {
      cartCount += shopCart.cart_total_num;
      const tList = this.transformCartList(shopCart.list);
      return {
        ...shopCart,
        list: tList
      };
    });

    const invalidList = this.transformCartList(invalid_cart);
    this.setState({
      invalidList,
      cartType: !crossborder_show ? "normal" : cartType,
      crossborder_show
    });

    log.debug("[cart fetchCart]", list);
    this.props.onUpdateCart(list);
    this.props.onUpdateCartCount(item_count);

    return list;
  }

  async fetchCart(cb) {
    let valid_cart = [],
      invalid_cart = [],
      crossborder_show = false;
    const cartTypeLocal = Taro.getStorageSync("cartType");
    const { type = "distributor" } = this.$instance.router.params;
    const isOpenStore = await entry.getStoreStatus(); //非门店自提
    const params = {
      shop_type: type,
      isNostores: isOpenStore ? 1 : 0 //是否开启非门店自提流程
    };
    if (process.env.APP_PLATFORM === "platform") {
      delete params.isNostores;
    }
    if (cartTypeLocal === "cross") {
      params.iscrossborder = 1;
    } else {
      delete params.iscrossborder;
    }
    try {
      const res = await api.cart.get(params);
      if (!res.crossborder_show && cartTypeLocal !== "normal") {
        Taro.setStorageSync("cartType", "normal");
        this.fetchCart(list => {
          const groups = this.resolveActivityGroup(list);
          // this.props.list 此时为空数组
          setTimeout(() => {
            this.setState({
              groups,
              loading: false
            });
          }, 40);
        });
        return false;
      }
      valid_cart = res.valid_cart || valid_cart;
      invalid_cart = res.invalid_cart || invalid_cart;
      crossborder_show = !!res.crossborder_show;
    } catch (e) {
      this.setState({
        error: e.message
      });
    }
    const { item_count } = await api.cart.count({ shop_type: "distributor" });
    const list = this.processCart({
      valid_cart,
      invalid_cart,
      item_count,
      cartType: cartTypeLocal,
      crossborder_show
    });
    cb && cb(list);
  }

  updateCart = async () => {
    showLoading({
      mask: true
    });
    this.updating = true;
    try {
      await this.fetchCart();
    } catch (e) {
      console.log(e);
    }
    this.updating = false;
    hideLoading();
  };

  asyncUpdateCart = debounce(async () => {
    await this.updateCart();
  }, 300);

  toggleCartMode = () => {
    const cartMode = this.state.cartMode !== "edit" ? "edit" : "default";
    this.setState({
      cartMode
    });
  };

  // 获取购物车消息通知
  async getRemind() {
    const res = await api.cart.getCartRemind();
    this.setState({
      remindInfo: res
    });
  }

  async handleSelectionChange(shopIndex, cart_id, checked) {
    await api.cart.select({
      cart_id,
      is_checked: checked
    });
    this.updateCart();
  }

  handleDelect = async cart_id => {
    console.log("---handleDelect---",cart_id)
    const res = await Taro.showModal({
      title: "提示",
      content: "将当前商品移出购物车?",
      showCancel: true,
      cancel: "取消",
      cancelText: "取消",
      confirmText: "确认",
      confirmColor: "#0b4137"
    });
    if (!res.confirm) return;

    await api.cart.del({ cart_id });

    const cartIds = this.props.cartIds.filter(t => t !== cart_id);

    let skuInfo;
    this.props.list.forEach(item => {
      item.list.forEach(sitem => {
        if (sitem.cart_id == cart_id) {
          skuInfo = sitem;
        }
      });
    });
    // 从购物车彻底移除
    Tracker.dispatch("REMOVE_FROM_CART", {
      ...skuInfo
    });

    this.updateCart();
  };

  async changeCartNum(shop_id, cart_id, num) {
    const { type = "distributor" } = this.$instance.router.params;
    try {
      const res = await api.cart.updateNum(shop_id, cart_id, num, type);
      this.processCart(res);
    } catch (e) {
      Taro.showToast({
        icon: "none",
        title: e.message,
        duration: 5000
      });
    }
    this.updateCart();
  }

  handleQuantityChange = async (shop_id, item, num, e) => {
    const { type = "distributor" } = this.$instance.router.params;
    await api.cart.updateNum(shop_id, item.cart_id, num, type);
    this.updateCart();

    // 购物车追加
    if ( item.num < parseInt( num ) ) {
      Tracker.dispatch("APPEND_TO_CART_IN_CART", {
        ...item,
        goods_id: item.goods_id || item.item_id,
        num: parseInt( num ) - item.num,
        goods_num: num
      });
    } else {
      Tracker.dispatch("REMOVE_FROM_CART_NUM", {
        ...item,
        goods_id: item.goods_id || item.item_id,
        num: item.num - parseInt(num),
        goods_num: num
      });
    }
  };

  handleAllSelect = async (checked, shopIndex) => {
    const { cartIds } = this.props;

    showLoading();
    try {
      await api.cart.select({
        cart_id: cartIds[shopIndex],
        is_checked: checked
      });
    } catch (e) {
      console.log(e);
    }
    hideLoading();
    this.updateCart();
  };

  handleClickPromotion = (cart_id, e) => {
    return; // 活动不需要选择
  };

  handleClickToDetail = item => {
    if (this.isTodetail === 0) {
      return false;
    }
    this.isTodetail = 1;
    Taro.navigateTo({
      url: `/pages/item/espier-detail?id=${item.item_id}&dtid=${item.distributor_id}`
    });
  };

  handleSelectPromotion = async item => {
    const { marketing_id: activity_id, cart_id } = item;
    showLoading({
      mask: true
    });
    this.setState({
      curPromotions: null
    });
    await api.cart.updatePromotion({
      activity_id,
      cart_id
    });
    await this.fetchCart();
    hideLoading();
  };

  handleClosePromotions = () => {
    this.setState({
      curPromotions: null
    });
  };

  handleCheckout = shopCart => {
    const {
      shop_id,
      is_delivery,
      is_ziti,
      shop_name,
      address,
      lat,
      lng,
      hour,
      mobile
    } = shopCart.shopInfo;
    const { cartType } = this.state;
    const { type } = this.$instance.router.params;
    if (this.updating) {
      Taro.showToast({
        title: "正在计算价格，请稍后",
        icon: "none"
      });
      return;
    }
    Taro.navigateTo({
      url: `/pages/cart/espier-checkout?cart_type=cart&type=${type}&shop_id=${shop_id}&is_delivery=${is_delivery}&is_ziti=${is_ziti}&name=${shop_name}&store_address=${address}&lat=${lat}&lng=${lng}&hour=${hour}&phone=${mobile}&goodType=${cartType}`
    });
  };

  transformCartList(list) {
    return pickBy(list, {
      item_id: "item_id",
      cart_id: "cart_id",
      activity_id: "activity_id",
      title: "item_name",
      desc: "brief",
      is_checked: "is_checked",
      store: "store",
      curSymbol: "cur.symbol",
      distributor_id: "shop_id",
      type: "type",
      goods_id: "goods_id",
      origincountry_name: "origincountry_name",
      origincountry_img_url: "origincountry_img_url",
      promotions: ({ promotions = [], cart_id }) =>
        promotions.map(p => {
          p.cart_id = cart_id;
          return p;
        }),
      img: ({ pics }) => pics,
      price: ({ price }) => (+price / 100).toFixed(2),
      market_price: ({ market_price }) => (+market_price / 100).toFixed(2),
      member_price: "member_price",
      num: "num",
      packages: item =>
        item.packages &&
        item.packages.length &&
        this.transformCartList(item.packages),
      item_spec_desc: "item_spec_desc"
    });
  }

  navigateTo = (...args) => {
    navigateTo.apply(this, args);
  };

  handleToQrcode = () => {
    Taro.navigateBack();
  };

  // 切换购物车类型
  onChangeCartType = () => {
    let { cartType } = this.state;
    if (cartType === "cross") {
      cartType = "normal";
    } else {
      cartType = "cross";
    }
    Taro.setStorageSync("cartType", cartType);
    this.setState(
      {
        cartType
      },
      async () => {
        showLoading({ mask: true });
        await this.fetchCart();
        hideLoading();
        // console.log(111)
      }
    );
  };
  //加价购
  handleSelectPlusprice = marketing_id => {
    const url = `/marketing/pages/plusprice/cart-plusprice-list?marketing_id=${marketing_id}`;
    Taro.navigateTo({
      url: url
    });
  };

  handleLookPlusprice = marketing_id => {
    const url = `/marketing/pages/plusprice/detail-plusprice-list?marketing_id=${marketing_id}`;
    Taro.navigateTo({
      url: url
    });
  };

  render() {
    const {
      groups,
      invalidList,
      cartMode,
      loading,
      curPromotions,
      likeList,
      page,
      isPathQrcode,
      cartType,
      crossborder_show,
      remindInfo
    } = this.state;
    const { list, showLikeList, colors } = this.props;
    console.log("groups", groups);
    // if (loading) {
    //   return <Loading />;
    // }
    const { type = "distributor" } = this.$instance.router.params;
    const isDrug = type === "drug";
    const isEmpty = !list.length;
    return (
      <View
        className={classNames("page-cart-index", {
          "has-navbar": isNavbar,
          "has-loginbar": !S.getAuthToken()
        })}
        style={styleNames(getThemeStyle())}
      >
        <SpNavBar title="购物车" leftIconType="chevron-left" fixed />
        
        
        {!S.getAuthToken() && (
          <View className="login-header">
            <View>授权登录后同步购物车的商品</View>
            <SpLogin onChange={this.onChangeLoginSuccess.bind(this)}>
              <View
                className="btn-login"
                style={`background: ${colors.data[0].primary}`}
              >
                授权登录
              </View>
            </SpLogin>
          </View>
        )}

        <ScrollView
          className={classNames(`scroll-view`)}
          onScrollToLower={this.nextPage}
          scrollY
        >
          {crossborder_show && (
            <View className="changeCross">
              <View className="content">
                <View
                  className={`iconfont ${
                    cartType === "cross" ? "icon-flight" : "icon-shop-cart-1"
                  }`}
                ></View>
                <View
                  className="iconfont icon-repeat"
                  onClick={this.onChangeCartType.bind(this)}
                ></View>
              </View>
            </View>
          )}

          <View className="cart-list">
            {groups.map((shopCart, shopIndex) => {
              // console.log('shopCart---->',shopCart)
              const checked_all =
                shopCart.shopInfo.cart_total_count ==
                shopCart.shopInfo.list.length;
              return (
                <View className="cart-list__shop" key={`${shopIndex}1`}>
                  {shopCart.shopInfo.shop_name ? (
                    <View className="shop__name">
                      <Text className="icon-shop"></Text>
                      {shopCart.shopInfo.shop_name}
                    </View>
                  ) : null}
                  {shopCart.shopInfo.plus_buy_activity &&
                    shopCart.shopInfo.plus_buy_activity.map(plus_item => {
                      const { discount_desc } = plus_item;
                      return (
                        <View
                          className="cart-group__activity"
                          style="background:#ffffff;"
                        >
                          <View className="cart-group__activity-item">
                            <View
                              className="cart-group__activity-item-left"
                              onClick={this.handleLookPlusprice.bind(
                                this,
                                plus_item.activity_id
                              )}
                            >
                              <Text className="cart-group__activity-label">
                                换购
                              </Text>
                              <Text>{discount_desc.info}</Text>
                            </View>
                            <View
                              className="cart-group__activity-item-right"
                              onClick={this.handleSelectPlusprice.bind(
                                this,
                                plus_item.activity_id
                              )}
                            >
                              去选择
                              <Text className="at-icon at-icon-chevron-right"></Text>
                            </View>
                          </View>
                        </View>
                      );
                    })}
                  <View className="shop__wrap">
                    {shopCart.group.map(activityGroup => {
                      // console.log('activityGroup---->',activityGroup)
                      const { activity } = activityGroup;

                      return (
                        activityGroup.list.length > 0 && (
                          <View
                            className="cart-group"
                            key={shopCart.shopInfo.shop_id}
                          >
                            {activity && (
                              <View className="cart-group__activity">
                                <View className="cart-group__activity-item">
                                  <Text className="cart-group__activity-label">
                                    {activity.activity_tag}
                                  </Text>
                                  <Text>{activity.activity_name}</Text>
                                </View>
                              </View>
                            )}
                            {activityGroup.list.map(item => {
                              // console.log('item',item)
                              return (
                                <View
                                  className="cart-group__item-wrap"
                                  key={item.cart_id}
                                >
                                  <CartItem
                                    key={item.cart_id}
                                    info={item}
                                    onNumChange={this.handleQuantityChange.bind(
                                      this,
                                      shopCart.shopInfo.shop_id,
                                      item
                                    )}
                                    onClickPromotion={this.handleClickPromotion.bind(
                                      this,
                                      item.cart_id
                                    )}
                                    onClickImgAndTitle={this.handleClickToDetail.bind(
                                      this,
                                      item
                                    )}
                                  >
                                    <View className="cart-item__act">
                                      <SpCheckbox
                                        key={item.item_id}
                                        checked={item.is_checked}
                                        onChange={this.handleSelectionChange.bind(
                                          this,
                                          shopIndex,
                                          item.cart_id
                                        )}
                                      />
                                      <View
                                        className="icon-close"
                                        onClick={this.handleDelect.bind(
                                          this,
                                          item.cart_id,
                                          shopIndex
                                        )}
                                      />
                                    </View>
                                  </CartItem>
                                  {item.packages && item.packages.length && (
                                    <View class="cart-item__packages">
                                      {item.packages.map(pack => {
                                        return (
                                          <CartItem
                                            isDisabled
                                            num
                                            key={pack.package_id}
                                            info={pack}
                                          ></CartItem>
                                        );
                                      })}
                                    </View>
                                  )}
                                </View>
                              );
                            })}
                            {activity && activity.gifts && (
                              <View className="cart-group__gifts">
                                <View className="cart-group__gifts-hd">
                                  赠品
                                </View>
                                <View className="cart-group__gifts-bd">
                                  {activity.gifts.map(gift => {
                                    return (
                                      <View
                                        className="gift-item"
                                        key={gift.item_id}
                                      >
                                        <Image
                                          className="gift-item__img"
                                          src={gift.pics[0]}
                                          mode="aspectFill"
                                        />
                                        <View className="gift-item__title">
                                          {gift.item_name}
                                        </View>
                                        <Text className="gift-item__num">
                                          x{gift.gift_num}
                                        </Text>
                                      </View>
                                    );
                                  })}
                                </View>
                              </View>
                            )}
                          </View>
                        )
                      );
                    })}
                    {shopCart.plusBuyList &&
                      shopCart.plusBuyList.map(item => {
                        return (
                          <CartItem
                            isDisabled
                            num
                            key={item.item.item_id}
                            info={item}
                          ></CartItem>
                        );
                      })}

                    <View
                      className={`toolbar cart-toolbar ${isEmpty && "hidden"}`}
                    >
                      <View className="cart-toolbar__hd">
                        <SpCheckbox
                          // checked={this.isTotalChecked[shopIndex]}
                          checked={checked_all}
                          onChange={this.handleAllSelect.bind(
                            this,
                            !checked_all,
                            shopIndex
                          )}
                        >
                          全选
                        </SpCheckbox>
                      </View>
                      {cartMode !== "edit" ? (
                        <View className="cart-toolbar__bd">
                          <View className="cart-total">
                            {list.length && shopCart.shopInfo.discount_fee > 0 && (
                              <View className="cart-total__discount">
                                <Text className="cart-total__hint">优惠：</Text>
                                <Price
                                  primary
                                  value={
                                    -1 * Number(shopCart.shopInfo.discount_fee)
                                  }
                                  unit="cent"
                                />
                              </View>
                            )}
                            <View className="cart-total__total">
                              <Text className="cart-total__hint">总计：</Text>
                              <Price
                                primary
                                value={Number(shopCart.shopInfo.total_fee)}
                                unit="cent"
                              />
                            </View>
                          </View>
                          <Button
                            type="primary"
                            className="btn-checkout"
                            style={`background: ${colors.data[0].primary}`}
                            disabled={shopCart.shopInfo.cart_total_count <= 0}
                            onClick={this.handleCheckout.bind(this, shopCart)}
                          >
                            {isDrug ? "立即预约" : "结算"}
                          </Button>
                        </View>
                      ) : (
                        <View className="cart-toolbar__bd">
                          <AtButton
                            type="primary"
                            className="btn-checkout"
                            onClick={this.handleDelect}
                          >
                            删除
                          </AtButton>
                        </View>
                      )}
                    </View>
                  </View>
                </View>
              );
            })}

            <SpDefault icon message="快去给我挑点宝贝吧">
              <AtButton
                type="primary"
                onClick={this.navigateTo.bind(
                  this,
                  process.env.APP_HOME_PAGE,
                  true
                )}
              >
                随便逛逛
              </AtButton>
            </SpDefault>

            {/* {(!groups.length || this.state.error) && (
              <View style={{ textAlign: "center" }}>
                <View style="margin-bottom: 20px">
                  <SpNote img="cart_empty.png">快去给我挑点宝贝吧~</SpNote>
                </View>
                <View className="btn-go">
                  <AtButton
                    type="primary"
                    onClick={this.navigateTo.bind(
                      this,
                      process.env.APP_HOME_PAGE,
                      true
                    )}
                  >
                    随便逛逛
                  </AtButton>
                </View>
              </View>
            )} */}
          </View>

          {invalidList.length > 0 && (
            <View className="cart-list cart-list__disabled">
              <View className="cart-list__hd">
                <Text>已失效</Text>
              </View>
              <View className="cart-list__bd">
                {invalidList.map(item => {
                  return (
                    <CartItem isDisabled key={item.cart_id} info={item}>
                      <View className="cart-item__act">
                        <View></View>
                        <View
                          className="icon-close"
                          onClick={this.handleDelect.bind(this, item.cart_id)}
                        />
                      </View>
                    </CartItem>
                  );
                })}
              </View>
            </View>
          )}

          {/* 猜你喜欢 */}
          {likeList.length && showLikeList && <SpRecommend info={likeList} />}

          {page.isLoading ? <Loading>正在加载...</Loading> : null}
        </ScrollView>
        
        {isPathQrcode && (
          <View className="qrcode-bg" onClick={this.handleToQrcode.bind(this)}>
            <Image
              mode="widthFix"
              src="/assets/imgs/ic_scanning.png"
              className="qrcode-bg__img"
            ></Image>
            <Text>继续添加</Text>
          </View>
        )}
        <AtActionSheet
          title="请选择商品优惠"
          isOpened={Boolean(curPromotions)}
          onClose={this.handleClosePromotions}
        >
          {curPromotions &&
            curPromotions.map(item => {
              return (
                <AtActionSheetItem
                  key={item.marketing_id}
                  onClick={this.handleSelectPromotion.bind(this, item)}
                >
                  <Text className="cart-promotion__label">
                    {item.promotion_tag}
                  </Text>
                  <Text>{item.marketing_name}</Text>
                </AtActionSheetItem>
              );
            })}
        </AtActionSheet>
        {!isDrug && <TabBar />}
      </View>
    );
  }
}
