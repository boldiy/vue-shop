<template>
	<div id="header">
		<div class="nav-global">
			<div class="container">
				<h1 class="nav-logo">
					<a href="javascript:;"></a>
				</h1>
				<ul class="nav-aside">
					<li class="nav-user">
						<router-link to="/account">个人中心</router-link>
						<!--active-->
						<div class="nav-user-wrapper">
							<div class="nav-user-list">
								<dl class="nav-user-avatar">
									<dd><span class="ng-scope"></span></dd>
									<dt class="ng-binding">{{ usercode }}</dt>
								</dl>
								<ul>
									<li class="order"><router-link to="/account" exact>我的订单</router-link></li>
									<li class="address"><router-link to="/address">收货地址</router-link></li>
									<li class="logout"><a href="/loginForm">退出</a></li>
								</ul>
							</div>
						</div>
					</li>
					<!--active-->
					<!-- <car-panel class="nav-cart"></car-panel> -->
				</ul>
				<ul class="nav-list">
					<router-link to="/phone?a=" exact tag="li" activeClass="active"><a>首页</a></router-link>
					<router-link to="/phone?a=SJ" exact tag="li"><a>手机</a></router-link>
					<router-link to="/phone?a=DN" exact tag="li"><a>电脑</a></router-link>
					<router-link to="/phone?a=FZ" exact tag="li"><a>服装</a></router-link>
					<router-link to="/phone?a=XZ" exact tag="li"><a>鞋子</a></router-link> 
					<router-link to="/phone?a=SP" exact tag="li"><a>食品</a></router-link> 
				</ul>
			</div>
		</div>
		<div class="nav-sub" style="height:20px;"></div>
	</div>
</template>
<script>
export default {
  data() {
	return{
		usercode:localStorage.getItem('usercode')
	}
  }
}
</script>
