<script>
	import { Router } from 'svelte-router-spa'
	import { refresh } from './stores/user'

	refresh()
</script>

<Router />

<style lang="scss" global>
	@import "style/global.scss";
</style>
