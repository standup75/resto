<script>
  import { navigateTo } from 'svelte-router-spa'
  import { notifier } from '@beyonk/svelte-notifications'
  import LoadButton from '../../components/LoadButton.svelte'
  import { post } from '../../lib/rest'
	import { user } from '../../stores/user'

  let username, password, isLoading

  async function submit(){
    isLoading = true
    const response = await post(`session`, { name: username, password })
    isLoading = false
    if (response.error) {
      notifier.danger(`Login failed: ${response.error}`)
    } else {
      navigateTo('/')
      user.set(response)
    }
  }
</script>
<div class="component" id="login">
  <h2>Login</h2>
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
    <div class="field">
      <label>password</label>
      <input
        required
        type="password"
        name="password"
        placeholder="Enter password"
        bind:value={password}
      />
    </div>
    <div class="actions">
      <LoadButton css="main left" label="Login" isLoading={isLoading}/>
      <a href="/signup" class="right signup-link">Not a member yet? Sign up now!</a>
    </div>
    <a href="/forgot">I forgot my password</a>
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
</style>
