<script>
	export let label
	let content = label || 'Loading available properties...'
</script>

<img alt='Resto' src='/logo.svg'>
<h1>Resto</h1>
<h2>Fractional Ownership</h2>
<div class="label">{content}</div>

<style lang="scss">
	@import "style/theme.scss";
	.label {
		text-align: center;
		color: $white;
		margin-top: 40px;
	}

	img {
		text-align: center;
		display: block;
		width: 100%;
		max-width: 200px;
		margin: 50px auto;
	}
</style>