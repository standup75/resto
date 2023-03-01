<script>
  export let label
  export let css
  export let isLoading
</script>
<div class="container">
  <button class={css} ref="submit" type="submit" on:click>{label}</button>
  {#if isLoading }
    <i class="fas fa-circle-notch fa-spin" />
  {/if}
</div>
<style lang="scss">
  .container {
    position: relative;
  }
  i {
    position: absolute;
    top: 15px;
    left: 9px;
    opacity: 0.5;
  }
</style>