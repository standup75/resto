<script>
  import { DateTime } from 'luxon'
  import { properties, upcomings, tokenSales } from '../stores/properties'
	import Loader from '../components/Loader.svelte'
	import Property from '../components/Property.svelte'
</script>
{#if $properties}
	{#if $tokenSales.length}
		<h2>Current Token Sales</h2>
		<div class="properties">
			{#each $tokenSales as property (property.symbol)}
				<Property {...property} />
			{/each}
		</div>
	{/if}
	{#if $upcomings.length}
		<h2>Upcoming Token Sales</h2>
		<div class="properties">
			{#each $upcomings as property (property.symbol)}
				<Property {...property} upcoming="true" />
			{/each}
		</div>
	{/if}
	{#if !$tokenSales.length && !$upcomings.length}
		<Loader label="No properties available"/>
	{/if}
{:else}
	<Loader />
{/if}
<style lang="scss">
	.properties {
		overflow: hidden;
	}
</style>
