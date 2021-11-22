import React, { Component } from 'react';
import Taro, { getCurrentInstance } from '@tarojs/taro';
import { View, Text, ScrollView } from "@tarojs/components";
import { connect } from "react-redux";
import { withPager, withBackToTop } from "@/hocs";
import { AtDrawer, AtTabs } from "taro-ui";
import {
  BackToTop,
  Loading,
  TagsBar,
  SpFilterBar,
  SearchBar,
  GoodsItem,
  SpGoodsItem,
  SpSearchBar,
  SpNote,
  SpNavBar,
  SpTagBar,
  TabBar
} from "@/components";
import api from "@/api";
import { Tracker } from "@/service";
import {
  pickBy,
  classNames,
  isWeixin,
  isWeb,
  getBrowserEnv,
  isNavbar,
  styleNames,
  getThemeStyle
} from "@/utils";
import entry from "../../utils/entry";

import "./list.scss";

@connect(({ member }) => ({
  favs: member.favs
}))
@withPager
@withBackToTop
export default class List extends Component {
  $instance = getCurrentInstance();
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      curFilterIdx: 0,
      curTagId: "",
      filterList: [
        { title: "综合" },
        { title: "销量" },
        { title: "价格", icon: "icon-shengxu-01" },
        { title: "价格", icon: "icon-jiangxu-01" }
      ],
      query: null,
      list: [],
      oddList: [],
      evenList: [],
      tagsList: [
        {
          tag_id: 0,
          tag_name: "全部"
        }
      ],
      paramsList: [],
      isShowSearch: false,
      showDrawer: false,
      selectParams: [],
      info: {},
      shareInfo: {},
      isOpenStore: null,
      couponTab: [
        { id: 1, title: "首页", val: `/pages/index` },
        { id: 2, title: "我的优惠券", val: `/marketing/pages/member/coupon` }
      ]
    };
  }

  async componentDidMount() {
    const { cat_id = null, main_cat_id = null } = this.$instance.router.params;
    this.firstStatus = true;
    const isOpenStore = await entry.getStoreStatus();
    const { store_id } = Taro.getStorageSync("curStore");
    this.setState({
      isOpenStore
    });

    this.setState(
      {
        query: {
          keywords: this.$instance.router.params.keywords,
          item_type: "normal",
          is_point: "false",
          distributor_id: isOpenStore ? store_id : this.$instance.router.params.dis_id,
          approve_status: "onsale,only_show",
          category: cat_id ? cat_id : "",
          main_category: main_cat_id ? main_cat_id : ""
        },
        curTagId: this.$instance.router.params.tag_id
      },
      () => {
        this.nextPage();
        api.wx.shareSetting({ shareindex: "itemlist" }).then(res => {
          this.setState({
            shareInfo: res
          });
        });
      }
    );
  }

  // componentWillReceiveProps(next) {
  //   if (Object.keys(this.props.favs).length !== Object.keys(next.favs).length) {
  //     setTimeout(() => {
  //       const list = this.state.list.map(item => {
  //         item.is_fav = Boolean(next.favs[item.item_id]);
  //         return item;
  //       });
  //       this.setState({
  //         list
  //       });
  //     });
  //   }
  // }

  async componentDidShow() {
    const { isNewGift = null } = this.$instance.router.params;
    if (!isNewGift) return;
    this.setStore();
    const { cat_id = null, main_cat_id = null } = this.$instance.router.params;
    this.firstStatus = true;
    const isOpenStore = await entry.getStoreStatus();
    const { store_id } = Taro.getStorageSync("curStore");
    this.setState({
      isOpenStore
    });

    this.setState(
      {
        query: {
          keywords: this.$instance.router.params.keywords,
          item_type: "normal",
          is_point: "false",
          distributor_id: isOpenStore ? store_id : this.$instance.router.params.dis_id,
          approve_status: "onsale,only_show",
          category: cat_id ? cat_id : "",
          main_category: main_cat_id ? main_cat_id : ""
        },
        curTagId: this.$instance.router.params.tag_id
      },
      () => {
        this.nextPage();
        api.wx.shareSetting({ shareindex: "itemlist" }).then(res => {
          this.setState({
            shareInfo: res
          });
        });
      }
    );
  }

  // 设置门店
  setStore = (isChange = false) => {
    const { card_id } = this.$instance.router.params;
    const store = Taro.getStorageSync("curStore");
    if (store && !isChange) {
      this.resetPage();
      this.setState({
        currentShop: {
          name: store.name || store.store_name,
          shop_id: store.shop_id,
          store_name: store.store_name,
          poiid: store.poiid
        },
        list: [],
        oddList: [],
        evenList: [],
        showDrawer: false
      });
    } else {
      Taro.navigateTo({ url: `/pages/store/list?card_id=${card_id}` });
    }
  };

  onShareAppMessage() {
    const res = this.state.shareInfo;
    const { cat_id = "", main_cat_id = "" } = this.$instance.router.params;
    const { userId } = Taro.getStorageSync("userinfo");
    const query = userId
      ? `?uid=${userId}&cat_id=${cat_id}&main_cat_id=${main_cat_id}`
      : `?cat_id=${cat_id}&main_cat_id=${main_cat_id}`;
    return {
      title: res.title,
      imageUrl: res.imageUrl,
      path: `/pages/item/list${query}`
    };
  }

  onShareTimeline() {
    const res = this.state.shareInfo;
    const { cat_id = null, main_cat_id = null } = this.$instance.router.params;
    const { userId } = Taro.getStorageSync("userinfo");
    const query = userId
      ? `uid=${userId}&cat_id=${cat_id}&main_cat_id=${main_cat_id}`
      : `cat_id=${cat_id}&main_cat_id=${main_cat_id}`;
    return {
      title: res.title,
      imageUrl: res.imageUrl,
      query: query
    };
  }

  async fetch(params) {
    const { page_no: page, page_size: pageSize } = params;
    const { card_id, isNewGift = null } = this.$instance.router.params;
    const { selectParams, tagsList, curTagId, isOpenStore } = this.state;
    const { distributor_id, store_id } = Taro.getStorageSync("curStore");
    const { cardId } = this.$instance.router.params;
    const query = {
      ...this.state.query,
      item_params: selectParams,
      tag_id: curTagId,
      page,
      pageSize,
      card_id
    };

    if (isNewGift) {
      query.distributor_id = distributor_id;
    } else {
      query.distributor_id = isOpenStore ? store_id : distributor_id;
    }

    if (cardId) {
      query.card_id = cardId;
    }

    const {
      list,
      total_count: total,
      item_params_list = [],
      select_tags_list = []
    } = await api.item.search(query);

    const nList = pickBy(list, {
      origincountry_img_url: {
        key: "origincountry_img_url",
        default: []
      },
      pics: "pics",
      itemId: "itemId",
      itemName: "itemName",
      brief: "brief",
      promotion_activity: "promotion_activity",
      distributor_id: "distributor_id",
      is_point: "is_point",
      price: ({ act_price, member_price, price }) => {
        if (act_price > 0) {
          return act_price;
        } else if (member_price > 0) {
          return member_price;
        } else {
          return price;
        }
      },
      market_price: "market_price"
    });

    this.setState(
      {
        list: [...this.state.list, ...nList],
        query,
        tagsList: [...this.state.tagsList, ...select_tags_list]
      },
      () => {
        if (isWeixin) {
          this.startTrack();
        }
      }
    );

    return {
      total
    };
  }

  startTrack() {
    this.endTrack();
    const observer = Taro.createIntersectionObserver(this.$scope, {
      observeAll: true
    });
    observer
      .relativeToViewport({ bottom: 0 })
      .observe(".goods-list__item", res => {
        // console.log("res.intersectionRatio:", res.intersectionRatio);
        if (res.intersectionRatio > 0) {
          const { id } = res.dataset;
          const { list } = this.state;
          const curGoods = list.find(item => item.item_id == id);
          const {
            item_id,
            title,
            market_price,
            price,
            img,
            member_price
          } = curGoods;
          Tracker.dispatch("EXPOSE_SKU_COMPONENT", {
            goodsId: item_id,
            title: title,
            market_price: market_price * 100,
            member_price: member_price * 100,
            price: price * 100,
            imgUrl: img
          });
        }
      });

    this.observe = observer;
  }

  endTrack() {
    if (this.observer) {
      this.observer.disconnect();
      this.observe = null;
    }
  }

  handleTagChange = data => {
    const { current } = data;
    this.resetPage();
    this.setState({
      list: [],
      oddList: [],
      evenList: []
    });

    this.setState(
      {
        curTagId: current
      },
      () => {
        this.nextPage();
      }
    );
  };

  handleFilterChange = data => {
    this.setState({
      showDrawer: false
    });
    const { current, sort } = data;

    const query = {
      ...this.state.query,
      goodsSort: current === 0 ? null : current === 1 ? 1 : sort > 0 ? 3 : 2
    };

    if (
      current !== this.state.curFilterIdx ||
      (current === this.state.curFilterIdx &&
        query.goodsSort !== this.state.query.goodsSort)
    ) {
      this.resetPage();
      this.setState({
        list: [],
        oddList: [],
        evenList: []
      });
    }

    this.setState(
      {
        curFilterIdx: current,
        query
      },
      () => {
        this.nextPage();
      }
    );
  };

  handleClickItem = item => {
    const {
      user_card_id,
      isNewGift = null,
      card_id,
      code
    } = this.$instance.router.params;
    if (isNewGift && item.store == 0) return;
    const { item_id, title, market_price, price, img, member_price } = item;
    Tracker.dispatch("TRIGGER_SKU_COMPONENT", {
      goodsId: item_id,
      title: title,
      market_price: market_price * 100,
      member_price: member_price * 100,
      price: price * 100,
      imgUrl: img
    });
    let url = `/pages/item/espier-detail?id=${item.item_id}&dtid=${item.distributor_id}`;
    if (isNewGift) {
      url = `/pages/item/espier-detail?id=${item.item_id}&dtid=${item.distributor_id}&isNewGift=true&user_card_id=${user_card_id}&card_id=${card_id}&code${code}`;
    }
    Taro.navigateTo({
      url
    });
  };

  handleClickStore = item => {
    const url = `/pages/store/index?id=${item.distributor_info.distributor_id}`;
    Taro.navigateTo({
      url
    });
  };

  handleClickSearchParams = type => {
    this.setState({
      showDrawer: false
    });
    if (type === "reset") {
      const { paramsList, selectParams } = this.state;
      this.state.paramsList.map(item => {
        item.attribute_values.map(v_item => {
          if (v_item.attribute_value_id === "all") {
            v_item.isChooseParams = true;
          } else {
            v_item.isChooseParams = false;
          }
        });
      });
      selectParams.map(item => {
        item.attribute_value_id = "all";
      });
      this.setState({
        paramsList,
        selectParams
      });
    }

    this.resetPage();
    this.setState(
      {
        list: [],
        oddList: [],
        evenList: []
      },
      () => {
        this.nextPage();
      }
    );
  };

  handleSearchOff = () => {
    this.setState({
      isShowSearch: false
    });
  };

  handleSearchChange = val => {
    this.setState({
      query: {
        ...this.state.query,
        keywords: val
      }
    });
  };

  handleSearchClear = () => {
    this.setState(
      {
        isShowSearch: false,
        query: {
          ...this.state.query,
          keywords: ""
        }
      },
      () => {
        this.resetPage();
        this.setState(
          {
            list: [],
            oddList: [],
            evenList: []
          },
          () => {
            this.nextPage();
          }
        );
      }
    );
  };

  handleConfirm = val => {
    Tracker.dispatch("SEARCH_RESULT", {
      keywords: val
    });
    this.setState(
      {
        isShowSearch: false,
        query: {
          ...this.state.query,
          keywords: val
        }
      },
      () => {
        this.resetPage();
        this.setState(
          {
            list: [],
            oddList: [],
            evenList: []
          },
          () => {
            this.nextPage();
          }
        );
      }
    );
  };

  onHandleClick = params => {
    Taro.navigateTo({
      url: params
    });
  };

  render() {
    const {
      list,
      curFilterIdx,
      filterList,
      showBackToTop,
      scrollTop,
      page,
      showDrawer,
      paramsList,
      selectParams,
      tagsList,
      curTagId,
      info,
      isShowSearch,
      query,
      currentShop,
      couponTab
    } = this.state;
    const { isTabBar = "guide", isNewGift } = this.$instance.router.params;
    const leftList = list.filter( ( item, index ) => {
      if ( index % 2 == 0 ) {
        return item
      }
    });
    const rightList = list.filter((item, index) => {
      if (index % 2 == 1) {
        return item;
      }
    });
    return (
      <View
        className={classNames("page-goods-list", {
          "has-navbar": isNavbar
        })}
        style={styleNames(getThemeStyle())}
      >
        <SpNavBar title="商品列表" leftIconType="chevron-left" fixed />

        <ScrollView
          className={classNames("scroll-view")}
          scrollY
          scrollTop={scrollTop}
          scrollWithAnimation
          onScroll={this.handleScroll}
          onScrollToLower={this.nextPage}
        >
          <View className="search-wrap">
            <View></View>
            <SpSearchBar />
          </View>

          <View className="tag-block">
            <View className="tag-container">
              <SpTagBar list={tagsList} />
            </View>
            <View className="filter-btn">
              <Text className="filter-text">刷选</Text>
              <Text className="iconfont icon-shaixuan-01"></Text>
            </View>
          </View>

          <SpFilterBar
            className="goods-tabs"
            custom
            current={curFilterIdx}
            list={filterList}
            onChange={this.handleFilterChange}
          />

          <View className="goods-list">
            <View className="left-container">
              {leftList.map(item => (
                <View className="goods-list-wrap" key={item.item_id}>
                  <SpGoodsItem info={item} />
                </View>
              ))}
            </View>
            <View className="right-container">
              {rightList.map(item => (
                <View className="goods-list-wrap" key={item.item_id}>
                  <SpGoodsItem info={item} />
                </View>
              ))}
            </View>
          </View>

          {/* {page.isLoading ? <Loading>正在加载...</Loading> : null}
          {!page.isLoading && !page.hasNext && !list.length && (
            <SpNote
              img={
                isNewGift
                  ? `${process.env.APP_IMAGE_CDN}/no_exist_product.png`
                  : `trades_empty.png`
              }
              isUrl={isNewGift}
            >{`${
              isNewGift ? "此店铺不参加此次活动，看看别的吧" : "暂无数据～"
            }`}</SpNote>
          )} */}

          {/* {isNewGift && !page.isLoading && !page.hasNext && !list.length && (
            <View className="coupon-tab">
              {couponTab.map((item, idx) => {
                let { title, val } = item;
                return (
                  <View
                    key={item.id}
                    onClick={this.onHandleClick.bind(this, val)}
                    className={`content ${idx != 0 ? "yellow" : "gray"}`}
                  >
                    {title}
                  </View>
                );
              })}
            </View>
          )} */}
        </ScrollView>

        <BackToTop
          show={showBackToTop}
          onClick={this.scrollBackToTop}
          bottom={30}
        />
      </View>
    );
  }
}
