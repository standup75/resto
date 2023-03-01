<script>
	import { Route } from 'svelte-router-spa'
	import Nav from "./components/Nav.svelte"
	import { NotificationDisplay } from '@beyonk/svelte-notifications'
	import { properties } from './stores/properties'
	export let currentRoute
	export let param
	properties.refresh()
</script>

<svelte:head>
	<title>Resto</title>
</svelte:head>
<Nav {currentRoute}/>

<section>
	<Route {currentRoute} ...preloaded />
</section>
<NotificationDisplay />

<style lang="scss">
	@import "style/theme.scss";
	section {
		padding-top: 53px;
	}
</style>
