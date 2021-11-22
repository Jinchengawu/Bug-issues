import React, { Component, useState } from 'react';
import { View, ScrollView, Text, Image, Button } from "@tarojs/components";
import { connect } from "react-redux";
import {
  TabBar,
  SpCell,
  AccountOfficial,
  SpLogin,
  SpImage,
  SpPrice,
  SpFloatPrivacy,
  CouponModal
} from "@/components";
import api from "@/api";
import S from "@/spx";
import req from "@/api/req";
import { withLogin } from "@/hocs";
import {
  navigateTo,
  getThemeStyle,
  classNames,
  showToast,
  showModal,
  styleNames,
  isWeixin,
  getPointName
} from "@/utils";
import { transformPlatformUrl, platformTemplateName } from "@/utils/platform";
import qs from 'qs'
import userIcon from "@/assets/imgs/user-icon.png";
import "./index.scss";
import { useEffect } from "react";

// @connect(
//   ({ colors, member }) => ({
//     colors: colors.current,
//     memberData: member.member
//   }),
//   dispatch => ({
//     onFetchFavs: favs => dispatch({ type: "member/favs", payload: favs })
//   })
// )
//   @withLogin()

function MemberIndex( props ) {
  // const []
  const [menu, setMenu] = useState({
    activity: false,
    offline_order: false,
    boost_activity: false,
    boost_order: false,
    complaint: false,
    community_order: false,
    ext_info: false,
    group: false,
    member_code: false,
    recharge: false,
    ziti_order: false,
    score_menu: false,
    share_enable: false,
    memberinfo_enable: false
  });

  useEffect( async () => {
    await api.member.getSalesperson()
    await api.trade.getCount()
    await api.vip.getList()
    await api.member.memberAssets()
    // 大转盘
    await api.wheel.getTurntableconfig()
  }, [] )
  
  useEffect( async () => {
    // 菜单配置
    const res = await api.shop.getPageParamsConfig({
      page_name: "member_center_menu_setting"
    } )
    setMenu({
      ...menu,
      ...res.list[0].params.data
    });
  }, [])

  const KtVipComps = () => {
    return (
      <View className="kt-vip">
        <View className="lf-con">
          <View className='vip-title'>
            开通VIP会员<Text className="iconfont icon-qianwang-01"></Text>
          </View>
          <View className='vip-desc'>即刻享受最高1折会员优惠</View>
        </View>
        <View className="rg-con">
          <View className="vip-xf">
            续费<Text className="iconfont icon-qianwang-01"></Text>
          </View>
          <View className="xs-price">限时特价</View>
        </View>
      </View>
    );
  }

  const ServiceComps = () => {
    return (
      <View className="service-block">
        <View className="block-hd">我的服务</View>
        <View className="block-bd">
          {

          }
        </View>
      </View>
    );
  }

  return (
    <View className="pages-member-index" style={styleNames(getThemeStyle())}>
      <View
        className="header-block"
        // style={styleNames({
        //   "background-image": `url(${process.env.APP_IMAGE_CDN}/m_bg.png)`
        // })}
      >
        <View className="header-hd">
          <SpImage className="usericon" src="default_user.png" />
          <View>
            <View className="username-wrap">
              <Text className="username">获取昵称</Text>
              <Text className="iconfont icon-erweima-01"></Text>
            </View>
            <View className="join-us">
              <Text className="join-us-txt">加入我们?</Text>
            </View>
          </View>
        </View>
        <View className="header-bd">
          <View className="bd-item">
            <View className="bd-item-label">优惠券(张)</View>
            <View className="bd-item-value">0</View>
          </View>
          <View className="bd-item">
            <View className="bd-item-label">积分(分)</View>
            <View className="bd-item-value">0</View>
          </View>
          <View className="bd-item">
            <View className="bd-item-label">储值(¥)</View>
            <View className="bd-item-value">
              <SpPrice value={0} />
            </View>
          </View>
          <View className="bd-item">
            <View className="bd-item-label">收藏(个)</View>
            <View className="bd-item-value">0</View>
          </View>
        </View>
        <View className="header-ft"></View>
      </View>

      <KtVipComps />

      <View className="order-block">
        <View className="block-hd"></View>
        <View className="block-bd"></View>
      </View>

      <ServiceComps />

      <View className="help-block">
        <View className="block-hd">帮助中心</View>
        <View className="block-bd"></View>
      </View>

      <TabBar />
    </View>
  );
}

export default MemberIndex

// export default class MemberIndex extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       turntable_open: 0,
//       redirectInfo: {},
//       orderCount: null,
//       memberDiscount: null,
//       isOpenPopularize: false,
//       salespersonData: null,
//       memberAssets: null,
//       // 是否开启储值
//       rechargeStatus: true,
//       // banner配置
//       bannerSetting: {},
//       // 菜单配置
//       menuSetting: {
//         activity: false,
//         offline_order: false,
//         boost_activity: false,
//         boost_order: false,
//         complaint: false,
//         community_order: false,
//         ext_info: false,
//         group: false,
//         member_code: false,
//         recharge: false,
//         ziti_order: false,
//         //是否开启积分链接
//         score_menu: false,
//         share_enable: false,
//         memberinfo_enable: false
//       },
//       imgUrl: "",
//       // 积分商城菜单
//       score_menu_open: false,
//       // 是否显示隐私协议
//       showPrivacy: false,
//       showTimes: 0,
//       marketingMenus: []
//     };
//   }

//   config = {
//     navigationBarTitleText: "",
//     enablePullDownRefresh: true,
//     onReachBottomDistance: 50,
//     backgroundTextStyle: "dark",
//     navigationStyle: "custom"
//   };

//   componentWillMount() {
//     this.fetch();
//     this.getSetting();
//     // this.getWheel();
//     // this.fetchBanner();
//     // this.fetchRedirect();

//     // this.getSettingCenter();
//     // this.getConfigPointitem();
//   }

//   async onShareAppMessage() {
//     const {
//       share_title = "震惊！这店绝了！",
//       share_pic_wechatapp
//     } = await req.get(`/memberCenterShare/getInfo`);
//     const { logo } = await req.get(
//       `/distributor/getDistributorInfo?distributor_id=0`
//     );
//     return {
//       title: share_title,
//       imageUrl: share_pic_wechatapp || logo,
//       path: "/pages/index"
//     };
//   }

//   onPullDownRefresh() {
//     this.fetch();
//   }

//   onRefresh() {
//     Taro.showNavigationBarLoading();
//     //显示 loading 提示框。需主动调用 wx.hideLoading 才能关闭提示框
//     Taro.showLoading({
//       title: "刷新中..."
//     });
//   }

//   navigateTo = navigateTo;

//   async fetch() {
//     if (S.getAuthToken()) {
//       const [
//         salesPerson,
//         orderCount,
//         { list: memberDiscount },
//         assets,
//         wheelData
//       ] = await Promise.all([
//         api.member.getSalesperson(),
//         api.trade.getCount(),
//         api.vip.getList(),
//         api.member.memberAssets(),
//         // 大转盘
//         api.wheel.getTurntableconfig()
//       ]);
//       const { memberData } = this.props;
//       this.setState({
//         salespersonData: salesPerson,
//         orderCount,
//         memberDiscount:
//           memberDiscount.length > 0
//             ? memberDiscount[memberDiscount.length - 1].privileges.discount_desc
//             : "",
//         memberAssets: {
//           ...assets,
//           deposit: memberData.deposit
//         },
//         turntable_open: wheelData.turntable_open
//       });

//       await S.getMemberInfo();
//     }
//     Taro.stopPullDownRefresh();
//   }

//   async getSetting() {
//     const [bannerSetting, menuSetting, pointItemSetting] = await Promise.all([
//       // 会员中心banner
//       await api.shop.getPageParamsConfig({
//         page_name: "member_center_setting"
//       }),
//       // 菜单自定义
//       await api.shop.getPageParamsConfig({
//         page_name: "member_center_menu_setting"
//       }),
//       // 积分商城
//       await api.pointitem.getPointitemSetting()
//     ]);

//     this.setState({
//       bannerSetting: bannerSetting.list[0].params.data,
//       menuSetting: menuSetting.list[0].params.data,
//       score_menu_open: pointItemSetting.entrance.mobile_openstatus
//     });
//   }

//   onChangeLoginSuccess = () => {
//     this.fetch();
//   };

//   // 获取积分个人信息跳转
//   async fetchRedirect() {
//     const pathparams = qs.stringify({
//       template_name: platformTemplateName,
//       version: "v1.0.1",
//       page_name: "member_center_redirect_setting"
//     });
//     const url = transformPlatformUrl(
//       `/alipay/pageparams/setting?${pathparams}`
//     );
//     const { list = [] } = await req.get(url);
//     if (list[0].params) {
//       this.setState({
//         redirectInfo: list[0].params
//       });
//     }
//   }

//   handleClickRecommend = async () => {
//     const { info } = this.state;
//     if (!info.is_open_popularize) {
//       Taro.showToast({
//         title: "未开启推广",
//         icon: "none"
//       });
//       return;
//     }

//     if (info.is_open_popularize && !info.is_promoter) {
//       await api.member.promoter();
//     }

//     Taro.navigateTo({
//       url: "/pages/member/recommend"
//     });
//   };

//   beDistributor = async () => {
//     const { is_promoter } = this.props.memberData;
//     if (is_promoter) {
//       Taro.navigateTo({
//         url: "/marketing/pages/distribution/index"
//       });
//       return;
//     }
//     const { confirm } = await Taro.showModal({
//       title: "邀请推广",
//       content: "确定申请成为推广员？",
//       showCancel: true,
//       cancel: "取消",
//       confirmText: "确认",
//       confirmColor: "#0b4137"
//     });
//     if (!confirm) return;

//     const res = await api.distribution.become();
//     const { status } = res;
//     if (status) {
//       Taro.showModal({
//         title: "恭喜",
//         content: "已成为推广员",
//         showCancel: false,
//         confirmText: "好"
//       });
//     }
//   };

//   // 订单查看
//   async handleTradeClick(type) {
//     Taro.navigateTo({
//       url: `/subpage/pages/trade/list?status=${type}`
//     });
//   }

//   // 积分查看
//   handleClickPoint = () => {
//     const { redirectInfo } = this.state;
//     if (redirectInfo.data && redirectInfo.data.point_url_is_open) {
//       Taro.navigateToMiniProgram({
//         appId: redirectInfo.data.point_app_id,
//         path: redirectInfo.data.point_page
//       });
//     }
//   };

//   handleClickInfo = () => {
//     const { redirectInfo } = this.state;
//     if (redirectInfo.data && redirectInfo.data.info_url_is_open) {
//       Taro.navigateToMiniProgram({
//         appId: redirectInfo.data.info_app_id,
//         path: redirectInfo.data.info_page
//       });
//     } else {
//       Taro.navigateTo({
//         url: "/marketing/pages/member/userinfo"
//       });
//     }
//   };

//   handleClickWxOAuth(fn, need = true) {
//     if (!S.getAuthToken()) {
//       showToast("请登录后再操作");
//       return;
//     }
//     if (this.state.showTimes >= 1) {
//       if (need) {
//         fn && fn();
//       }
//     } else {
//       const { avatar, username } = this.props.memberData.memberInfo;
//       if (avatar && username) {
//         if (need) {
//           fn && fn();
//         }
//       } else {
//         this.setState({
//           showPrivacy: true
//         });
//       }
//     }
//   }

//   renderMarketingNavs() {
//     const { memberData } = this.props
//     const { score_menu_open, salespersonData, menuSetting } = this.state;
//     const { is_open_popularize, is_promoter } = memberData;
//     const {
//       group,
//       community_order,
//       boost_activity,
//       boost_order,
//       offline_order,
//       complaint,
//       activity
//     } = menuSetting;
//     let navs = [];
//     if (is_open_popularize && isWeixin) {
//       navs.push({
//         title: is_promoter ? "我要推广" : "推广管理",
//         icon: "../../assets/imgs/store.png",
//         action: this.beDistributor
//       });
//     }

//     if (group && isWeixin) {
//       navs.push({
//         title: "我的拼团",
//         icon: `${process.env.APP_IMAGE_CDN}/group.png`,
//         action: () => {
//           this.navigateTo("/marketing/pages/member/group-list");
//         }
//       });
//     }

//     if (community_order && isWeixin) {
//       navs.push({
//         title: "我的社区团购",
//         icon: `${process.env.APP_IMAGE_CDN}/group.png`,
//         action: () => {
//           this.navigateTo("/groupBy/pages/orderList/index");
//         }
//       });
//     }

//     if (boost_activity && isWeixin) {
//       navs.push({
//         title: "助力活动",
//         icon: `${process.env.APP_IMAGE_CDN}/group.png`,
//         action: () => {
//           this.navigateTo("/boost/pages/home/index");
//         }
//       });
//     }

//     if (boost_order && isWeixin) {
//       navs.push({
//         title: "助力订单",
//         icon: `${process.env.APP_IMAGE_CDN}/group.png`,
//         action: () => {
//           this.navigateTo("/boost/pages/order/index");
//         }
//       });
//     }

//     if (offline_order) {
//       navs.push({
//         title: "线下订单关联",
//         icon: `${process.env.APP_IMAGE_CDN}/group.png`,
//         action: () => {
//           this.navigateTo("/others/pages/bindOrder/index");
//         }
//       });
//     }

//     if (complaint && salespersonData && salespersonData.distributor) {
//       navs.push({
//         title: "投诉记录",
//         icon: `${process.env.APP_IMAGE_CDN}/group.png`,
//         action: () => {
//           this.navigateTo("/marketing/pages/member/complaint-record");
//         }
//       });
//     }

//     if (activity) {
//       navs.push({
//         title: "活动预约",
//         icon: "../../assets/imgs/buy.png",
//         action: () => {
//           this.navigateTo("/marketing/pages/member/item-activity");
//         }
//       });
//     }

//     if (score_menu_open) {
//       navs.push({
//         title: `${getPointName()}商城`,
//         icon: "../../assets/imgs/score.png",
//         action: () => {
//           this.navigateTo("/pointitem/pages/list");
//         }
//       });
//     }

//     return (
//       <View>
//         {navs.map((nav, index) => (
//           <SpCell
//             title={nav.title}
//             isLink
//             border
//             img={nav.icon}
//             onClick={() =>
//               this.handleClickWxOAuth(() => {
//                 nav.action();
//               })
//             }
//           ></SpCell>
//         ))}
//       </View>
//     );
//   }

//   renderNormalNavs() {
//     const { menuSetting } = this.state
//     const { memberinfo_enable } = menuSetting;
//     let navs = [];
//     navs.push({
//       title: "地址管理",
//       action: () => {
//         this.navigateTo("/marketing/pages/member/address");
//       }
//     });
//     if (memberinfo_enable) {
//       navs.push({
//         title: "个人信息",
//         action: this.handleClickInfo
//       });
//     }
//     if (Taro.getEnv() == "WEB") {
//       navs.push({
//         title: "设置",
//         action: () => {
//           this.navigateTo("/marketing/pages/member/setting");
//         }
//       });
//     }

//     return (
//       <View>
//         {navs.map((nav, index) => (
//           <SpCell
//             title={nav.title}
//             isLink
//             border
//             onClick={() => this.handleClickWxOAuth(nav.action)}
//           ></SpCell>
//         ))}
//       </View>
//     );
//   }

//   render() {
//     const { colors, memberData } = this.props;
//     const {
//       score_menu_open,
//       gradeInfo,
//       orderCount,
//       memberDiscount,
//       memberAssets,
//       isOpenPopularize,
//       salespersonData,
//       turntable_open,
//       bannerSetting,
//       menuSetting,
//       rechargeStatus,
//       showPrivacy,
//       showTimes
//     } = this.state;
//     let memberInfo = null,
//       vipgrade = null;
//     if (memberData) {
//       memberInfo = memberData.memberInfo;
//       vipgrade = memberData.vipgrade;
//     }

//     return (
//       <View className="page-member-index" style={styleNames(getThemeStyle())}>
//         <View className="page-member-header">
//           {S.getAuthToken() && (
//             <View className="header-con">
//               <View className="user-info">
//                 <View
//                   className="user-info__hd"
//                   onClick={() => {
//                     this.handleClickWxOAuth(this.handleClickInfo.bind(this));
//                   }}
//                 >
//                   <Image
//                     className="avatar-img"
//                     src={memberInfo.avatar || userIcon}
//                     mode="widthFix"
//                   />
//                   <View className="avatar-info">
//                     <View className="nickname">
//                       Hi, {memberInfo.username || memberInfo.mobile}
//                     </View>
//                     <View className="gradename">{`${
//                       !vipgrade.is_vip
//                         ? memberInfo.gradeInfo.grade_name
//                         : vipgrade.grade_name || "会员"
//                     }`}</View>
//                   </View>
//                 </View>

//                 <View className="user-info__ft">
//                   {menuSetting.member_code && (
//                     <Text
//                       className="iconfont icon-qrcode"
//                       onClick={() => {
//                         this.handleClickWxOAuth(
//                           this.navigateTo.bind(
//                             this,
//                             "/marketing/pages/member/member-code"
//                           )
//                         );
//                       }}
//                     ></Text>
//                   )}
//                 </View>
//               </View>

//               <View className="member-assets">
//                 <View
//                   className="member-assets-item"
//                   onClick={() => {
//                     this.handleClickWxOAuth(
//                       this.navigateTo.bind(
//                         this,
//                         "/marketing/pages/member/coupon"
//                       )
//                     );
//                   }}
//                 >
//                   <View className="member-assets__label">优惠券</View>
//                   <View className="member-assets__value">
//                     {(memberAssets && memberAssets.discount_total_count) || 0}
//                   </View>
//                 </View>

//                 <View
//                   className="member-assets-item"
//                   onClick={() => {
//                     this.handleClickWxOAuth(this.handleClickPoint.bind(this));
//                   }}
//                 >
//                   <View className="member-assets__label">
//                     {getPointName()}
//                   </View>
//                   <View className="member-assets__value">
//                     {(memberAssets && memberAssets.point_total_count) || 0}
//                   </View>
//                 </View>

//                 {rechargeStatus && (
//                   <View
//                     className="member-assets-item"
//                     onClick={() => {
//                       this.handleClickWxOAuth(
//                         this.navigateTo.bind(
//                           this,
//                           "/others/pages/recharge/index"
//                         )
//                       );
//                     }}
//                   >
//                     <View className="member-assets__label">储值</View>
//                     <View className="member-assets__value">
//                       {((memberAssets && memberAssets.deposit) || 0) / 100}
//                     </View>
//                   </View>
//                 )}

//                 <View
//                   className="member-assets-item"
//                   onClick={() => {
//                     this.handleClickWxOAuth(
//                       this.navigateTo.bind(this, "/pages/member/item-fav")
//                     );
//                   }}
//                 >
//                   <View className="member-assets__label">收藏</View>
//                   <View className="member-assets__value">
//                     {(memberAssets && memberAssets.fav_total_count) || 0}
//                   </View>
//                 </View>
//               </View>
//             </View>
//           )}

//           {!S.getAuthToken() && (
//             <View className="header-con">
//               <Image className="user-icon" src={userIcon} mode="widthFix" />
//               <SpLogin onChange={this.onChangeLoginSuccess.bind(this)}>
//                 <View className="unlogin">请登录</View>
//               </SpLogin>
//             </View>
//           )}
//         </View>

//         {vipgrade &&
//           (vipgrade.is_open || (!vipgrade.is_open && vipgrade.is_vip)) &&
//           memberDiscount !== "" && (
//             <View
//               className="member-card"
//               onClick={() => {
//                 this.handleClickWxOAuth(
//                   this.navigateTo.bind(this, "/subpage/pages/vip/vipgrades")
//                 );
//               }}
//             >
//               {vipgrade.is_open && !vipgrade.is_vip && (
//                 <View className="vip-btn">
//                   <View className="vip-btn__title">
//                     开通VIP会员 <Text className="icon-arrowRight"></Text>
//                   </View>
//                   {memberDiscount && (
//                     <View className="vip-btn__desc">
//                       即可享受最高{memberDiscount}折会员优惠
//                     </View>
//                   )}
//                 </View>
//               )}
//               {vipgrade.is_vip && (
//                 <View className="grade-info">
//                   <View className="member-card-title">
//                     <Text className="vip-sign">
//                       {vipgrade.vip_type === "svip" ? (
//                         <Text>SVIP</Text>
//                       ) : (
//                         <Text>VIP</Text>
//                       )}
//                     </Text>
//                     会员卡
//                   </View>
//                   <View className="member-card-no">
//                     NO. {memberInfo.user_card_code}
//                   </View>
//                   <View className="member-card-period">
//                     {vipgrade.end_time} 到期
//                   </View>
//                 </View>
//               )}
//               {vipgrade.is_vip && (
//                 <Image
//                   className="member-info-bg"
//                   src={vipgrade.background_pic_url}
//                   mode="widthFix"
//                 />
//               )}
//               {vipgrade.is_open && !vipgrade.is_vip && (
//                 <Image
//                   className="member-info-bg"
//                   src={memberInfo.gradeInfo.background_pic_url}
//                   mode="widthFix"
//                 />
//               )}
//             </View>
//           )}

//         {/* {is_open_official_account === 1 && (
//           <View className="page-member-section">
//             <AccountOfficial
//               onHandleError={this.handleOfficialError.bind(this)}
//               onClick={this.handleOfficialClose.bind(this)}
//               isClose={false}
//             />
//           </View>
//         )} */}

//         <View className="page-member-section order-box">
//           <SpCell
//             title="订单"
//             isLink
//             value="全部订单"
//             onClick={() =>
//               this.handleClickWxOAuth(this.handleTradeClick.bind(this))
//             }
//           ></SpCell>

//           {menuSetting.ziti_order && (
//             <View
//               className="member-trade__ziti"
//               onClick={() => {
//                 this.handleClickWxOAuth(
//                   this.navigateTo.bind(
//                     this,
//                     "/subpage/pages/trade/customer-pickup-list"
//                   )
//                 );
//               }}
//             >
//               <View className="view-flex-item">
//                 <View className="member-trade__ziti-title">自提订单</View>
//                 <View className="member-trade__ziti-desc">
//                   您有
//                   <Text className="mark">
//                     {(orderCount && orderCount.normal_payed_daiziti) || 0}
//                   </Text>
//                   个等待自提的订单
//                 </View>
//               </View>
//               <View className="icon-arrowRight item-icon-go"></View>
//             </View>
//           )}

//           <View className="member-trade">
//             <View
//               className="member-trade__item"
//               onClick={() =>
//                 this.handleClickWxOAuth(this.handleTradeClick.bind(this, 5))
//               }
//             >
//               <View className="icon-wallet">
//                 {orderCount && orderCount.normal_notpay_notdelivery > 0 && (
//                   <View className="trade-num">
//                     {orderCount.normal_notpay_notdelivery}
//                   </View>
//                 )}
//               </View>
//               <Text>待支付</Text>
//             </View>
//             <View
//               className="member-trade__item"
//               onClick={() => {
//                 this.handleClickWxOAuth(this.handleTradeClick.bind(this, 1));
//               }}
//             >
//               <View className="icon-delivery">
//                 {orderCount && orderCount.normal_payed_notdelivery > 0 && (
//                   <View className="trade-num">
//                     {orderCount.normal_payed_notdelivery}
//                   </View>
//                 )}
//               </View>
//               <Text>待收货</Text>
//             </View>
//             <View
//               className="member-trade__item"
//               onClick={() => {
//                 this.handleClickWxOAuth(this.handleTradeClick.bind(this, 3));
//               }}
//             >
//               <View className="icon-office-box">
//                 {orderCount && orderCount.normal_payed_delivered > 0 && (
//                   <View className="trade-num">
//                     {orderCount.normal_payed_delivered}
//                   </View>
//                 )}
//               </View>
//               <Text>已完成</Text>
//             </View>
//             {orderCount && orderCount.rate_status && (
//               <View
//                 className="member-trade__item"
//                 onClick={() => {
//                   this.handleClickWxOAuth(this.handleTradeClick.bind(this, 3));
//                 }}
//               >
//                 <View className="icon-message"></View>
//                 <Text className="trade-status">待评价</Text>
//               </View>
//             )}
//             <View
//               className="member-trade__item"
//               onClick={() =>
//                 this.handleClickWxOAuth(
//                   this.navigateTo.bind(this, "/subpage/pages/trade/after-sale")
//                 )
//               }
//             >
//               <View className="icon-repeat">
//                 {orderCount && orderCount.aftersales > 0 && (
//                   <View className="trade-num">{orderCount.aftersales}</View>
//                 )}
//               </View>
//               <Text>售后</Text>
//             </View>
//           </View>
//         </View>

//         {/* 菜单 */}
//         <View className="page-member-section">
//           {this.renderMarketingNavs()}
//         </View>

//         {/* 菜单 */}
//         <View className="page-member-section">
//           {Taro.getEnv() !== "WEB" && menuSetting.share_enable && (
//             <SpCell title="我要分享" isLink>
//               <Button className="btn-share" open-type="share"></Button>
//             </SpCell>
//           )}
//           {this.renderNormalNavs()}
//         </View>

//         {/* 大转盘 */}
//         {turntable_open === "1" && (
//           <View
//             className="wheel-to"
//             onClick={() =>
//               this.handleClickWxOAuth(
//                 this.navigateTo.bind(this, "/marketing/pages/wheel/index")
//               )
//             }
//           >
//             <Image src={`${process.env.APP_IMAGE_CDN}/wheel_modal_icon.png`} />
//           </View>
//         )}

//         <TabBar />

//         <SpFloatPrivacy
//           isOpened={showPrivacy}
//           onClose={() =>
//             this.setState({
//               showPrivacy: false,
//               showTimes: this.state.showTimes + 1
//             })
//           }
//         />
//       </View>
//     );
//   }
// }
