<template>
	<view class="wrap">
		<view class="top"></view>
    <u-top-tips ref="uTips"></u-top-tips>
		<view class="content">
			<view class="title">欢迎登录美团</view>
			<input class="u-border-bottom" type="text" v-model="username" placeholder="请输入账号" style="margin-top:10px;"/>
			<input class="u-border-bottom" type="password" v-model="password" placeholder="请输入密码" style="margin-top:20px;"/>
			<u-button @click="submit" data-name="3333" :style="[inputStyle]" class="getCaptcha" style="margin-top:20px;">登录</u-button>
			<view class="alternative">
				<view class="password">扫码登录</view>
				<view class="issue">遇到问题</view>
			</view>
		</view>
		<view class="buttom">
			<view class="loginType">
				<view class="wechat item">
					<view class="icon"><u-icon size="70" name="weixin-fill" color="rgb(83,194,64)"></u-icon></view>
					微信
				</view>
				<view class="QQ item">
					<view class="icon"><u-icon size="70" name="qq-fill" color="rgb(17,183,233)"></u-icon></view>
					QQ
				</view>
			</view>
			<view class="hint">
				登录代表同意
				<text class="link">美团点评用户协议、隐私政策，</text>
				并授权使用您的美团点评账号信息（如昵称、头像、收获地址）以便您统一管理
			</view>
		</view>
	</view>
</template>

<script>
import { validateLogin } from '../../api/login/login.js';
export default {
	data() {
		return {
			username: undefined,
      password:undefined,
		}
	},
	computed: {
		inputStyle() {
			let style = {};
			if(this.tel) {
				style.color = "#fff";
				style.backgroundColor = this.$u.color['warning'];
			}
			return style;
		}
	},
	methods: {
		submit() {
      const that=this
      validateLogin({username:this.username,password:this.password}).then(res => {
        console.log(res.data);
        if(res.data && res.data.length>0){
            if(this.password==res.data[0].password){
                this.$u.route({
                  type:'switchTab',
                  params: undefined,
				        	url: '/pages/index/index'
				        })
            }else{
              this.$refs.uTips.show({
				      	title: '账号或者密码错误',
				      	type: 'error'
				      });
            }
        }else{
           this.$refs.uTips.show({
				   	title: '账号或者密码错误',
				   	type: 'error'
				   });
        }
      })
		}
	}
};
</script>

<style lang="scss" scoped>
.wrap {
	font-size: 28rpx;
	.content {
		width: 600rpx;
		margin: 80rpx auto 0;

		.title {
			text-align: left;
			font-size: 60rpx;
			font-weight: 500;
			margin-bottom: 100rpx;
		}
		input {
			text-align: left;
			margin-bottom: 10rpx;
			padding-bottom: 6rpx;
		}
		.tips {
			color: $u-type-info;
			margin-bottom: 60rpx;
			margin-top: 8rpx;
		}
		.getCaptcha {
			background-color: rgb(253, 243, 208);
			color: $u-tips-color;
			border: none;
			font-size: 30rpx;
			padding: 12rpx 0;
			
			&::after {
				border: none;
			}
		}
		.alternative {
			color: $u-tips-color;
			display: flex;
			justify-content: space-between;
			margin-top: 30rpx;
		}
	}
	.buttom {
		.loginType {
			display: flex;
			padding: 350rpx 150rpx 150rpx 150rpx;
			justify-content:space-between;
			
			.item {
				display: flex;
				flex-direction: column;
				align-items: center;
				color: $u-content-color;
				font-size: 28rpx;
			}
		}
		
		.hint {
			padding: 20rpx 40rpx;
			font-size: 20rpx;
			color: $u-tips-color;
			
			.link {
				color: $u-type-warning;
			}
		}
	}
}
</style>
