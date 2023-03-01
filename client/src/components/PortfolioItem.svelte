<script>
	import { numberToString } from '../lib/utils'
	export let asset
	export let property
</script>
<div class="name">{property.name}</div>
<div class="supply">{property.supply}</div>
<div class="owned">{asset.amount} {asset.token}</div>
<style lang="scss">
  @import "style/theme.scss";
	.name {
		width: 50%;
		box-sizing: border-box;
		padding: 15px;
		border-left: 1px solid $grey;
		float: left;
	}
	.supply, .owned {
		padding: 15px;
		width: 25%;
		float: left;
		box-sizing: border-box;
		border-left: 1px solid $grey;
	}
	.owned {
		border-right: 1px solid $grey;
	}
</style>