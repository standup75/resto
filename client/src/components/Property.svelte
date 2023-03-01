<script>
	import { user } from '../stores/user'
	import { numberToString } from '../lib/utils'
	export let name
	export let supply
	export let max_supply
	export let issuer
	export let street
	export let city
	export let state
	export let symbol
	export let token_sale_start
	export let token_sale_end
	export let dollar_value
	export let sold_amount
	export let upcoming
	const tokenSaleStart = token_sale_start.toFormat('yyyy LLL dd')
	const tokenSaleEnd = token_sale_end.toFormat('yyyy LLL dd')
</script>
<div class="container" class:upcoming>
	<header>
		<h1>{name}</h1>
		<div class="issuer">
			<div>Issued by</div>
			<div>{issuer}</div>
		</div>
	</header>
	<div class="col">
		<div class="field">
			<label>Address</label>
			<div class="value street">{street}</div>
			<div class="value">{city}, {state}</div>
		</div>
		<div class="field">
			<label>Token issued</label>
			<div class="value">{parseFloat(supply)} {symbol}</div>
			<div class="value">({numberToString(100 * parseFloat(supply)/parseFloat(max_supply))}% of the asset)</div>
		</div>
		<div class="field">
			<label>Token Sale Start</label>
			<div class="value">{tokenSaleStart}</div>
		</div>
	</div>
	<div class="col">
		<div class="field">
			<label>Token Price</label>
			<div class="value">{numberToString(dollar_value)} USD</div>
		</div>
		<div class="field">
			<label>Token Sold</label>
			<div class="value">{sold_amount} {symbol}</div>
			<div class="value">({numberToString(100 * sold_amount/parseFloat(supply))}% of the supply)</div>
		</div>
		<div class="field">
			<label>Token Sale End</label>
			<div class="value">{tokenSaleEnd}</div>
		</div>
	</div>
	{#if $user && $user.name === issuer}
		<a class="action edit" href={`editProperty/${symbol}`}>
			<i class='fas fa-edit'></i>
		</a>
	{:else}
		<a class="action buy" href={`buy/${symbol}`}>
			<i class='fas fa-plus'></i>
		</a>
	{/if}
</div>
<style lang="scss">
	@import "style/theme.scss";
	header {
		overflow: hidden;
		h1 {
			color: $white;
			float: left;
			margin-bottom: 10px;
		}
		.issuer {
			float: right;
			text-align: right;
			font-size: 12px;
			opacity: 0.5;
		}
	}
	.upcoming {
		opacity: 0.6;
		label {
			color: $white;
		}
		.action.buy {
			display: none;
		}
	}
	.street {
		height: 20px;
		overflow: auto;
	}
	.container {
		position: relative;
		overflow: hidden;
		box-sizing: border-box;
		background: $grey;
		color: $grey-light;
		margin: 15px;
		padding: 15px;
	}
	.action {
		position: absolute;
		bottom: 10px;
		right: 10px;
		color: $grey-lighter;
		font-size: 20px;
		padding: 10px;
	}
	.field {
		height: 50px;
	}
	.col {
		width: 50%;
		box-sizing: border-box;
		float: left;
	}
	@media (min-width: 600px) {
		.container {
			width: calc(50% - 30px);
			float: left;
		}
	}

</style>