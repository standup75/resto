<script>
  import { DateTime } from 'luxon'
  import { properties, own } from '../stores/properties'
	import Loader from '../components/Loader.svelte'
	import Property from '../components/Property.svelte'
	import AddButton from '../components/AddButton.svelte'
	properties.refresh()
</script>
<AddButton href="addProperty"/>
{#if $properties}
	{#if $own}
		<h2>Your properties</h2>
		<div class="properties">
			{#each $own as property (property.symbol)}
				<Property {...property} />
			{/each}
		</div>
  {:else}
    <Loader label="You don't have any properties yet" />
	{/if}
{:else}
	<Loader />
{/if}
<style lang="scss">
	.properties {
		overflow: hidden;
	}
</style>
