<script>
	import { navigateTo } from 'svelte-router-spa'
	import { notifier } from '@beyonk/svelte-notifications'
	import { numberToString } from '../lib/utils'
	import LoadButton from '../components/LoadButton.svelte'
	import Loader from '../components/Loader.svelte'
	import { post } from '../lib/rest'
	import { getPortfolio } from '../stores/user'
	import { getProperty } from '../stores/properties'
	export let currentRoute, property, balance, amount, isLoading, usd, maxBuy
	if (!currentRoute.namedParams.symbol) {
		navigateTo('/')
	}
	Promise.all([getProperty(currentRoute.namedParams.symbol), getPortfolio()])
		.then(result => {
			property = result[0]
			maxBuy = parseInt(property.supply) - property.sold_amount
			usd = result[1].data.user.balance
			if (maxBuy * property.dollar_value > usd) {
				maxBuy = usd / property.dollar_value
			}
			const tokenBalance = result[1].data.user.balances.find(b => b.token === currentRoute.namedParams.symbol)
			balance = tokenBalance ? tokenBalance.amount : 0
		})
		.catch(err => {
			notifier.danger(`Loading data failed: ${err}`)
		})
	async function submit() {
		if (!property) {
			notifier.danger('Data not loaded yet')
		} else if (!amount) {
			notifier.info(`Please enter and amount of ${property.symbol} to buy`)
		} else if (amount > maxBuy) {
			notifier.danger('Not enough funds')
		} else {
			isLoading = true
			try {
				await property.buy(amount)
				notifier.success(`You just bought ${amount} ${property.symbol}`)
				navigateTo('/offerings')
			} catch (err) {
				notifier.danger(`${property.symbol} purchase failed`)
				console.error(err)
			}
			isLoading = false
		}
	}
</script>
{#if property}
	<div class="component">
		<h1>{property.name} ({property.symbol})</h1>
		<p class="note">You currently own {balance} {property.symbol}. And your wallet has ${numberToString(usd)}. You can buy up to {numberToString(maxBuy)} {property.symbol}</p>
		<form on:submit|stopPropagation|preventDefault={submit}>
			<div class="field">
				<label>Enter an amount of {property.symbol} to buy</label>
				<input
					required
					type="number"
					name="amount"
					placeholder="Enter an amount of {property.symbol} to buy"
					bind:value={amount}
				/>
			</div>
			{#if amount}
				<p>You're about to buy {amount} {property.symbol} representing ${numberToString(amount * property.dollar_value)}</p>
			{:else}
				<p>&nbsp;</p>
			{/if}
			<div class="actions">
				<LoadButton css="main left" label="Buy!" isLoading={isLoading}/>
				<a href="/offerings" class="button right">Cancel</a>
			</div>
		</form>
	</div>
{:else}
	<Loader label="Loading property data...." />
{/if}
<style lang="scss">
	@import "style/theme.scss";
	.component {
		max-width: 500px;
		margin: 0 auto;
		color: $white;
	}
	.note {
		opacity: 0.5;
	}
</style>