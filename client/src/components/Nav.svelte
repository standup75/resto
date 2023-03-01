<script>
	import { user } from '../stores/user'
	export let currentRoute
</script>

<nav>
	<ul class="main">
		<li><a class:selected='{currentRoute.name === "/"}' href='/'>home</a></li>
		<li><a class:selected='{currentRoute.name === "/offerings"}' href='/offerings'>offerings</a></li>
		<li><a class:selected='{currentRoute.name === "/trade"}' href='/trade'>trade</a></li>
	</ul>
	<ul class="session">
		{#if $user}
			<li><a class:selected='{currentRoute.name === "/myassets"}' href='/myassets'><i class="fas fa-city"></i></a></li>
			<li><a class:selected='{currentRoute.name === "/portfolio"}' href='/portfolio'><i class="fas fa-wallet"></i></a></li>
			<li><a class:selected='{currentRoute.name === "/account"}' href='/account'><i class="fas fa-user"></i></a></li>
		{:else}
			<li><a class:selected='{currentRoute.name === "/login"}' href='/login'><i class="fas fa-lock"></i></a></li>
		{/if}
	</ul>
</nav>

<style lang="scss">
  @import "style/theme.scss";
	nav {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		border-bottom: 1px solid rgba(255,62,0,0.1);
		font-weight: 300;
		padding: 0 1em;
		overflow: hidden;
		background: $black;
		z-index: 1000;
	}

	ul {
		margin: 0;
		padding: 0;
	}

	.main {
		float: left;
		li {
			line-height: 53px;
			margin-right: 15px;
		}
		a {
			text-transform: uppercase;
			letter-spacing: 1px;
			font-size: 12px;
		}
	}

	.session {
		float: right;
		li {
			padding: 10px;
			font-size: 25px;
		}
	}

	/* clearfix */
	ul::after {
		content: '';
		display: block;
		clear: both;
	}

	li {
		position: relative;
		display: block;
		float: left;
	}

	.selected::after {
		position: absolute;
		content: '';
		height: 2px;
		background-color: #A7864A;
		display: block;
		left: 0;
		right: 0;
		bottom: -1px;
	}

</style>
