<script>
	import { getPortfolio } from '../stores/user'
	import { properties } from '../stores/properties'
	import Loader from '../components/Loader.svelte'
	import PortfolioItem from '../components/PortfolioItem.svelte'

	let portfolio
	getPortfolio().then(response => { portfolio = response.data.user.balances})
</script>
<div class="container">
	{#if $properties && portfolio}
		<ul>
			<li>
				<div class="name">Name</div>
				<div class="supply">Supply</div>
				<div class="owned">You own</div>
			</li>
			{#each portfolio as asset}
				<li><PortfolioItem property={$properties.find(p => p.symbol)} asset={asset} /></li>
			{/each}
		</ul>
	{:else}
		<Loader label="Loading your portfolio..." />
	{/if}
</div>
<style lang="scss">
	@import "style/theme.scss";
	.container {
		padding: 20px;
	}
	li {
		border-top: 1px solid $grey;
		overflow: hidden;
		&:last-child {
			border-bottom: 1px solid $grey;
		}
	}
	.name {
		width: 50%;
	}
	.supply, .owned {
		width: 25%;
	}
	.name, .supply, .owned {
		border-left: 1px solid $grey;
		padding: 15px;
		float: left;
		box-sizing: border-box;
		text-transform: uppercase;
		color: $white;
		font-size: 13px;
		letter-spacing: 1px;
	}
	.owned {
		border-right: 1px solid $grey;
	}
</style>