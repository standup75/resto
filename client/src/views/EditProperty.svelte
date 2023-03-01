<script>
	import { navigateTo } from 'svelte-router-spa'
	import { notifier } from '@beyonk/svelte-notifications'
	import { getProperty } from '../stores/properties'
	import { numberToString } from '../lib/utils'
	import { user } from '../stores/user'
	import Loader from '../components/Loader.svelte'
	import LoadButton from '../components/LoadButton.svelte'

	export let currentRoute
	if (!currentRoute.namedParams.symbol) {
		navigateTo('/')
	}
	let amount, isLoading, maxMint, property
	getProperty(currentRoute.namedParams.symbol)
	.then(p => {
		property = p
		maxMint = parseInt(property.max_supply) - parseInt(property.supply)
	})
	.catch(err => {
		console.error(err)
		notifier.danger(`No properties found with symbol ${currentRoute.namedParams.symbol}`)
		navigateTo('/')
	})

	async function submit() {
		isLoading = true
		if (amount <= 0) {
			notifier.danger(`Please enter a positive amount`)
		} else if (amount > maxMint) {
			notifier.danger(`Please enter an amount lesser than or equal to ${maxMint}`)
		} else {
			try {
				await property.mint(amount)
				notifier.success(`${amount} ${property.symbol} minted`)
				navigateTo('/myassets')
			} catch (err) {
				notifier.danger(`Minting ${property.symbol} failed`)
				console.error(err)
			}
		}
		isLoading = false
	}
</script>
{#if property && $user && $user.name === property.issuer}
	<div class="component">
		<h1>{property.name} ({property.symbol})</h1>
		<p class="note">You have currently minted {parseInt(property.supply)} {property.symbol} out of the {parseInt(property.max_supply)} {property.symbol} available for this property. You can mint up to {maxMint} {property.symbol}, representing ${numberToString(maxMint * property.dollar_value)}</p>
		<form on:submit|stopPropagation|preventDefault={submit}>
			<div class="field">
				<label>Enter an amount of {property.symbol} to be minted</label>
				<input
					required
					type="number"
					name="amount"
					placeholder="Enter an amount of {property.symbol} to be minted"
					bind:value={amount}
				/>
			</div>
			{#if amount}
				<p>You're about to mint {amount} {property.symbol} representing ${numberToString(amount * property.dollar_value)}</p>
			{:else}
				<p>&nbsp;</p>
			{/if}
			<div class="actions">
				<LoadButton css="main left" label="Mint!" isLoading={isLoading}/>
				<a href="/myassets" class="button right">Cancel</a>
			</div>
		</form>
	</div>
{:else if property && $user && $user.name !== property.issuer}
	<Loader label="This is not your property" />
{:else}
	<Loader label="Loading data..." />
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