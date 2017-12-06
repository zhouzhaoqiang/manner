import React,{Component} from 'react';
import App from './containers/App';


import Home from './containers/Home' // Home商城首页
import Login from './containers/Login' //Login
import LoginSms from './containers/LoginSms';
import Reg from './containers/Reg'
import Goods from './containers/Goods' //商品列表
import GoodsDetail from './containers/GoodsDetail'//商品详情
import FirmOrder from './containers/FirmOrder'//确认订单
import ExtraPrice from './containers/ExtraPrice'//补差价
import Account from './containers/Account'//我的
import UserInfo from './containers/UserInfo'//用户资料
import Address from './containers/Address'//用户地址管理
import EditAddress from './containers/EditAddress'//新增编辑地址
import Orders from './containers/Orders'//我的订单
import CancelOrder from './containers/CancelOrder' //取消订单
import Coupons from './containers/Coupons'//卡券 优惠券
import TouBao from './containers/TouBao';//投保介绍
import PointsLogs from './containers/PointsLogs';//积分记录
import policies from './containers/Policies';
import xiugaimima from './containers/xiugaimima';
import wangjimima from './containers/wangjimima';
import OrdersId from './containers/OrdersId';
import Activity from './containers/Activity';
import Cates from './containers/cates';
//import CardList from './containers/CardList';
import Vip from './containers/Vip';

export const RouterConfig = [
	{
		path: '/',
		component: App,
		indexRoute:{ component: Home },
		childRoutes: [
			{path: 'home', component: Home },
			{path: 'activity', component: Activity },
			{path: 'login', component: Login },
			{path: 'loginsms', component: LoginSms },
			{path: 'cates',component: Cates},
			{path: 'goods/:id',component: Goods},
			{path: 'goods/detail/:id',component:GoodsDetail},
			{path: 'firmorder/:id',component:FirmOrder},
			{path: 'extraprice/:id',component:ExtraPrice},
			{path: 'account',component:Account},
			{path: 'account/userinfo',component:UserInfo},
			{path: 'account/address',component:Address},
			{path: 'account/address/:id',component:EditAddress},
			{path: 'account/orders', component:Orders},
			{path: 'account/orders/:id', component:OrdersId},
			{path: 'account/orders/cancel/:id',component:CancelOrder},
			{path: 'account/coupons',component:Coupons},
			{path: 'account/pointslogs', component:PointsLogs},
			{path: 'account/policies', component:policies},
			{path: 'account/coupons/invalid',component:Coupons},
			{path: 'reg', component:Reg},
			{path: 'toubao', component:TouBao},
			{path: 'xiugaimima', component:xiugaimima},
			{path: 'wangjimima', component:wangjimima},
			//{path: 'cardlist/:id', component:CardList},
			{path: 'vip', component:Vip},
			{path: '*', component:Home},
		]
	}
];
