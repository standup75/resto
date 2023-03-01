<script>
	import { user } from '../stores/user'
  import { notifier } from '@beyonk/svelte-notifications'
  export let href
  export let faClass
  let cssClass=`fas ${faClass || 'fa-plus'}`
  function loginRequired() {
    notifier.danger(`You need to be logged in`)
  }

</script>
{#if $user}
<a class="container" href={href}>
  <i class={cssClass}></i>
</a>
{:else}
<div class="container" on:click={loginRequired}>
  <i class={cssClass}></i>
</div>
{/if}
<style lang="scss">
  @import "style/theme.scss";
  .container {
    position: fixed;
    z-index: 10;
    bottom: 10px;
    right: 10px;
    background: $green;
    color: $black;
    font-size: 30px;
    padding: 10px 15px;
    border-radius: 30px;
  }
</style>