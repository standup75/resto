<script>
	import { navigateTo } from 'svelte-router-spa'
	import { notifier } from '@beyonk/svelte-notifications'
	import LoadButton from '../../components/LoadButton.svelte'
	import { post } from '../../lib/rest'

	let username, isLoading

	async function submit(){
		isLoading = true
		const response = await post(`user/forgot`, { name: username })
		isLoading = false
		if (response.error) {
			notifier.danger(`Forgot password submission failed: ${response.error}`)
		} else {
			navigateTo('/')
			notifier.info('You should soon receive an email with a link to reset your password')
		}
	}
</script>
<div class="component" id="forgot">
	<h2>Password forgotten?</h2>
	<p class="subtitle">No problem, we got you</p>
	<form on:submit|stopPropagation|preventDefault={submit}>
		<div class="field">
			<label>username</label>
			<input
				required
				type="text"
				name="username"
				placeholder="Enter username or email"
				bind:value={username}
			/>
		</div>
		<div class="actions">
			<LoadButton css="main left" label="Send" isLoading={isLoading}/>
			<a href="/signup" class="right signup-link">What am I doing here? Sign up now!</a>
		</div>
	</form>
</div>
<style lang="scss">
	@import "style/theme.scss";
	.component {
		max-width: 300px;
		margin: 0 auto;
		color: $white;
		a {
			font-size: 11px;
			color: $color-1;
			letter-spacing: 1px;
			margin-bottom: 3px;
			&:hover {
				text-decoration: underline;
			}
		}
	}
	input {
		max-width: 300px;
	}
	.actions {
		overflow: hidden;
		position: relative;
		margin-bottom: 20px;
		.signup-link {
			padding: 7px 0;
			margin: 0;
			width: 140px;
			text-align: right;
		}
	}
	h2 {
		margin-bottom: 0;
	}
	.subtitle {
		margin-top: 0;
		margin-bottom: 30px;
		font-weight: 200;
		text-align: center;
		opacity: 0.5;
}
</style>
