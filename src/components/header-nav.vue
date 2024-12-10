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
									<dt class="ng-binding">+86 138****9453</dt>
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
					<router-link to="/phone?" exact tag="li" activeClass="active"><a>首页</a></router-link>
					<router-link to="/phone?a=1" exact tag="li" activeClass="active"><a>首页2</a></router-link>
					<router-link to="/phone?a=5" exact tag="li" activeClass="active"><a>服饰</a></router-link>
					<li><a href="javascript:;">鞋类</a></li>
					<li><a href="javascript:;">箱包</a></li>
					<li><a href="javascript:;">化妆品</a></li>
				</ul>
			</div>
		</div>
		<div class="nav-sub" style="height:20px;"></div>
	</div>
</template>