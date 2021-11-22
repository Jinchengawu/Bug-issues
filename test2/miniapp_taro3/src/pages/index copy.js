import Taro from "@tarojs/taro";
import { Component } from 'react'
import { View, Image } from "@tarojs/components";
import {

  AccountOfficial,
  SpStorePicker,
  SpScancode,
  SpRecommend,
  SpSearch,
} from "@/components";
import req from "@/api/req";
import api from "@/api";
import {
  pickBy,
  classNames,
  isArray,
  isAlipay,
  payTypeField,
  styleNames,
  getThemeStyle,
  entryLaunch
} from "@/utils";
import S from "@/spx";
import { Tracker } from "@/service";
import { setPageTitle, platformTemplateName } from "@/utils/platform";
import HomeWgts from "./home/comps/home-wgts";

import "./home/index.scss";



export default class index extends Component {
  constructor(props) {
    super(props);
    this.autoCloseTipId = null;
    this.currentLoadIndex = -1;
    this.state = {
      ...this.state,
      wgts: [],
      wgtsList: [],
      searchWgt: null,
      likeList: [],
      isShowAddTip: false,
      curStore: {
        distributor_id: 0
      },
      positionStatus: false,
      automatic: null,
      showAuto: true,
      // top: 0,
      isShop: null,
      salesperson_id: "",
      // 店铺精选id
      featuredshop: "",
      // 分享配置
      shareInfo: {},
      is_open_recommend: null,
      is_open_scan_qrcode: null,
      is_open_official_account: null,
      is_open_store_status: null,
      show_official: true,
      showCloseBtn: false,
      // 是否有跳转至店铺页
      isGoStore: false,
      show_tabBar: true,
      advertList: [],
      currentShowAdvert: 0,
      recommendList: null,
      all_card_list: [],
      visible: false
    };
  }

  // 配置信息
  config = {
    enablePullDownRefresh: true,
    backgroundTextStyle: "dark",
    onReachBottomDistance: 50
  };

  componentDidMount() {
    // this.getWgts()
    const { is_open_recommend } = Taro.getStorageSync("settingInfo");
    this.getHomeSetting();
    // 开启猜你喜欢
    is_open_recommend == 1 && this.getLikeList();

  }



  componentDidShow() {

    // 检测白名单
    this.checkWhite();
    // 购物车数量
    this.fetchCartCount();
    this.getPointSetting();
    if (S.getAuthToken()) {
      this.getCurrentGrad();
    }
  }

  // 配置信息
  config = {
    enablePullDownRefresh: true,
    backgroundTextStyle: "dark",
    onReachBottomDistance: 50
  };

  getCurrentGrad = () => {
    api.vip.getCurrentGradList().then(res => {
      this.fetchCouponCardList(res.type);
    });
  };

  // 下拉刷新
  onPullDownRefresh = () => {
    Tracker.dispatch("PAGE_PULL_DOWN_REFRESH");
    this.resetPage();
    this.setState(
      {
        likeList: [],
        wgts: [],
        wgtsList: []
      },
      () => {
        let { curStore } = this.state;
        const curStoreLocal = Taro.getStorageSync("curStore");
        if (curStore) {
          this.getWgts();
          this.getAutoMatic();
        } else if (!isArray(curStoreLocal)) {
          this.setState(
            {
              curStore: curStoreLocal
            },
            () => {
              this.getWgts();
              this.getAutoMatic();
            }
          );
        }
      }
    );
  };

  // 触底事件
  onReachBottom = () => {
    this.nextPage();
  };

  // 分享
  onShareAppMessage(params) {
    const shareInfo = this.shareInfo();

    console.log("--onShareAppMessage--", shareInfo);

    return {
      ...shareInfo
    };
  }

  // 分享朋友圈
  onShareTimeline(params) {
    const shareInfo = this.shareInfo("time");

    return {
      ...shareInfo
    };
  }

  // 分享信息
  shareInfo = (type = "") => {
    const res = this.state.shareInfo;
    const { userId } = Taro.getStorageSync("userinfo");
    let query = userId ? `/pages/index?uid=${userId}` : "/pages/index";
    if (type) {
      query = userId ? `uid=${userId}` : "";
    }
    const path = type ? "query" : "path";
    const params = {
      title: res.title,
      imageUrl: res.imageUrl,
      [path]: query,
      share_title: res.title
    };
    return params;
  };

  // 注册享大礼品
  handleGift = async () => {
    if (!S.getAuthToken()) {
      setTimeout(() => {
        S.login(this);
      }, 1000);
    }
  };

  // 关闭tips
  handleClickCloseAddTip = () => {
    if (this.autoCloseTipId) clearTimeout(this.autoCloseTipId);
    Taro.setStorageSync("addTipIsShow", false);
    this.setState({
      isShowAddTip: false
    });
  };

  // 跳转店铺页面
  handleClickShop = () => {
    const { featuredshop } = this.state;
    Taro.navigateTo({
      url: `/marketing/pages/distribution/shop-home?featuredshop=${featuredshop}`
    });
  };

  handleClickShop2 = () => {
    const { featuredshop } = this.state;
    Taro.navigateTo({
      url: `/pages/pointitem/list`
    });
  };

  // 显示浮窗广告
  handleAutoClick = () => {
    const { showAuto } = this.state;
    this.setState({
      showAuto: !showAuto
    });
  };

  handleSwitchAdvert = showIdx => {
    this.setState({
      currentShowAdvert: ++showIdx
    });
  };

  handleLoadMore = async (
    currentIndex,
    compType,
    currentTabIndex,
    currentLength
  ) => {
    if (isAlipay) return;
    const { id } =
      this.state.wgtsList.find((_, index) => currentIndex === index) || {};
    this.currentLoadIndex = currentIndex;

    let params = {
      template_name: platformTemplateName,
      weapp_pages: "index",
      page: 1,
      page_size: currentLength + 50,
      weapp_setting_id: id,
      ...this.getDistributionId()
    };
    if (isAlipay) {
      delete params.weapp_setting_id;
    }
    let loadData;
    if (compType === "good-grid" || compType === "good-scroll") {
      loadData = await api.wx.loadMoreGoods(params);
      this.state.wgts.splice(this.currentLoadIndex, 1, loadData.config[0]);
    } else if (compType === "good-grid-tab") {
      params.goods_grid_tab_id = currentTabIndex;
      loadData = await api.wx.loadMoreGoods(params);
      let allGridGoods = this.state.wgts[currentIndex].list;
      let changeGoods = loadData.config[0].list[0];
      allGridGoods.splice(currentTabIndex, 1, changeGoods);
      this.state.wgts.splice(this.currentLoadIndex, 1, {
        ...loadData.config[0],
        list: allGridGoods
      });
    }

    this.setState({
      wgts: [...this.state.wgts]
    });
  };

  fetchCouponCardList(receive_type) {
    api.vip.getShowCardPackage({ receive_type }).then(({ all_card_list }) => {
      if (all_card_list && all_card_list.length > 0) {
        this.setState({ visible: true });
      }
      this.setState({ all_card_list });
    });
  }

  handleCouponChange = (visible, type) => {
    if (type === "jump") {
      Taro.navigateTo({
        url: `/marketing/pages/member/coupon`
      });
    }
    this.setState({ visible });
  };

  render() {
    const {
      
      wgts,
      searchWgt,
      positionStatus,
      
      is_open_official_account,
      is_open_store_status,
      show_official,
      recommendList,
     
    } = this.state;

    const pages = Taro.getCurrentPages();
    // 广告屏
    const { showAdv } = this.props;
    // 是否是标准版
    const isStandard =
      process.env.APP_PLATFORM === "standard" && !is_open_store_status;
    // 否是fixed
    const isFixed = positionStatus;

    const { is_open_scan_qrcode } = Taro.getStorageSync("settingInfo");
    console.log(Taro.getStorageSync("settingInfo"));
    const { openStore } = Taro.getStorageSync("otherSetting");
    return (
      <View className="page-index" style={styleNames(getThemeStyle())}>
        {/* 公众号关注组件 */}
        {process.env.TARO_ENV == "weapp" &&
          is_open_official_account === 1 &&
          show_official && (
            <AccountOfficial
              isClose
              onHandleError={this.handleOfficialError.bind(this)}
              onClick={this.handleOfficialClose.bind(this)}
            ></AccountOfficial>
          )}

        <View className="header-block">
          {openStore && (
            <View className="block-hd">
              <SpStorePicker />
            </View>
          )}
          <View className="block-bd">
            <SpSearch info={searchWgt} />
          </View>
          {is_open_scan_qrcode}
          {is_open_scan_qrcode == 1 && (
            <View className="block-fd">
              <SpScancode />
            </View>
          )}
        </View>

        <View
          className={classNames("wgts-wrap", {
            "has-header-block": openStore || is_open_scan_qrcode
          })}
        >
          <View className="wgts-wrap__cont">
            {/* 挂件内容 */}
            <HomeWgts wgts={wgts} loadMore={this.handleLoadMore} />

            {/* 猜你喜欢 */}
            {recommendList && <SpRecommend info={recommendList} />}

            
          </View>
        </View>


      </View>
    );
  }
}
