<script>
	import { navigateTo } from 'svelte-router-spa'
	import braintree from 'braintree-web'
  import { notifier } from '@beyonk/svelte-notifications'
	import LoadButton from '../components/LoadButton.svelte'
	import Loader from '../components/Loader.svelte'
	import { numberToString } from '../lib/utils'
	import { get, post } from '../lib/rest'
	import { user } from '../stores/user'
	let braintreeInstance, currentUser, amount
	let visible = false
	let isLoading = false

	async function initBraintree() {
		currentUser = await user.get()
		const response = await get(`user/${currentUser.id}/payment/token`)
		if (response.error) {
			throw new Error(response.error)
		}
		const client = await braintree.client.create({ authorization: response.clientToken })
		braintreeInstance = await braintree.hostedFields.create({
			client,
			styles: {
				'input': {
					'font-size': '24px',
					'color': '#fff',
				},
				'input.invalid': {
					'color': '#ffeeee',
				},
				'input.valid': {
					'color': '#eeffee',
				}
			},
			fields: {
				number: {
					selector: '#card-number',
					placeholder: '4111 1111 1111 1111',
				},
				cvv: {
					selector: '#cvv',
					placeholder: '123',
				},
				expirationDate: {
					selector: '#expiration-date',
					placeholder: '10/2022',
				}
			}
		})
		visible = true
	}

	let init = initBraintree()
	async function submit() {
		try {
			isLoading = true
			const payload = await braintreeInstance.tokenize()
			const response = await post(`user/${currentUser.id}/payment`, { amount, nonce: payload.nonce })
			if (response.error) {
				notifier.danger(`Error submitting payment: ${response.error}`)
			} else {
				notifier.success(`Purchase completed`)
				currentUser.balance += amount
				user.set(currentUser)
				navigateTo('/account')
			}
			isLoading = false
		} catch (err) {
			notifier.danger(`Error submitting payment: ${err.message}`)
			isLoading = false
		}
	}
</script>
{#await init}
	<Loader label="Initializing payment gateway..." />
{:then}
	{#if $user}
	<p class="balance">Your current balance: ${numberToString($user.balance)}</p>
	{/if}
{:catch err}
	<Loader label="Error: {err.message}" />
{/await}
<div class="component" class:visible>
	<form on:submit|stopPropagation|preventDefault={submit}>
		<div class="field">
			<label for="card-number">Amount</label>
			<input type="number" bind:value={amount} placeholder="Enter USD to deposit on your account"/>
		</div>
		<div class="field">
			<label for="card-number">Card Number</label>
			<div class="hosted-field" id="card-number"></div>
		</div>
		<div class="field">
			<label for="cvv">CVV</label>
			<div class="hosted-field" id="cvv"></div>
		</div>
		<div class="field">
			<label for="expiration-date">Expiration Date</label>
			<div class="hosted-field" id="expiration-date"></div>
		</div>
		<LoadButton label="Pay" isLoading={isLoading}/>
	</form>
</div>
<style lang="scss">
  @import "style/theme.scss";
	.component {
		display: none;
    max-width: 500px;
    margin: 0 auto;
    color: $white;
		&.visible {
			display: block;
		}
	}
	.hosted-field {
		height: 24px;
		padding: 10px;
		background: $grey;
	}
	.balance {
		text-align: center;
	}
</style>