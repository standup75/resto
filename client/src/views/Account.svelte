<script>
	import { navigateTo } from 'svelte-router-spa'
	import { notifier } from '@beyonk/svelte-notifications'
	import { numberToString } from '../lib/utils'
	import { user } from '../stores/user'
	import { del } from '../lib/rest'
	import LoadButton from '../components/LoadButton.svelte'

	let isLoading

	async function logout() {
		isLoading = true
		await del('session')
		isLoading = false
		navigateTo('/')
		user.set(null)
		notifier.info('Thank you! You are now logged out')
	}
</script>
<div class="container">
	{#if $user}
		<h2>Welcome {$user.name}!</h2>
		<p>Your email: {$user.email}</p>
		<p>Your current balance: ${numberToString($user.balance)}</p>
	{/if}
	<div>
		<a class="buy button" href="/loadWallet">Load USD Wallet</a>
	</div>
	<LoadButton css="main" label="Logout" isLoading={isLoading} on:click={logout}/>
</div>
<style lang="scss">
	@import "style/theme.scss";
	.container {
		padding: 20px;
		text-align: center;
	}
	p {
		color: $white;
	}
	.buy.button {
		display: inline-block;
		margin: 20px 0;
	}
</style>