<script>
  import { navigateTo } from 'svelte-router-spa'
  import { notifier } from '@beyonk/svelte-notifications'
  import LoadButton from '../../components/LoadButton.svelte'
  import { post } from '../../lib/rest'
  
  export let currentRoute
  export let params // Just here to prevent svelte warning in the console

  let password, passwordConfirm, form, passwordInput, passwordConfirmInput, isLoading
  async function submit(){
    if (checkValidity()) {
      isLoading = true
      const response = await post(`user/resetPassword`, { code: currentRoute.queryParams.code, password })
      isLoading = false
      if (response.error) {
        notifier.danger(`Reset password failed: ${response.error}`)
      } else {
        navigateTo('/login')
        notifier.info('Password updated. You can login now')
      }
    }
  }
  function checkValidity() {
    let isError = false
    if (password.length < 8) {
      passwordInput.setCustomValidity(`Password must be at least 8 characters`)
      isError = true
    } else if (!(/[a-z]/.test(password) && /[A-Z]/.test(password) && /[0-9]/.test(password))) {
      passwordInput.setCustomValidity(`Password must contain at least 1 number, 1 lowercase letter and 1 uppercase letter`)
      isError = true
    }
    if (password !== passwordConfirm) {
      console.log(password, passwordConfirm)
      passwordConfirmInput.setCustomValidity(`This does not match the password you entered`)
      isError = true
    }
    return !isError
  }
  function resetPasswordValidity() {
    passwordInput.setCustomValidity(``)
  }
  function resetPasswordConfirmValidity() {
    passwordConfirmInput.setCustomValidity(``)
  }
</script>
<div class="component" id="reset-password">
  <h2>Password reset</h2>
  <form on:submit|stopPropagation|preventDefault={submit} bind:this={form}>
    <div class="field">
      <label>new password</label>
      <input
        required
        type="password"
        name="password"
        placeholder="Enter a new password"
        bind:value={password}
        bind:this={passwordInput}
        on:change={resetPasswordValidity}
      />
    </div>
    <div class="field">
      <label>confirm new password</label>
      <input
        required
        type="password"
        name="password-confirm"
        placeholder="Enter password again"
        bind:value={passwordConfirm}
        bind:this={passwordConfirmInput}
        on:change={resetPasswordConfirmValidity}
      />
    </div>
    <div class="actions">
      <LoadButton css="main left" label="Update" isLoading={isLoading}/>
      <a href="/login" class="right login-link">Already a member? Log in now!</a>
    </div>
    <p>Password must be at least 8 characters long with at least 1 number, 1 lowercase letter and 1 uppercase letter</p>
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
  p {
    font-weight: 300;
    font-size: 11px;
    opacity: 0.5;
    text-align: justify;
  }
  .actions {
    overflow: hidden;
    position: relative;
    margin-bottom: 20px;
    .login-link {
      padding: 7px 0;
      margin: 0;
      width: 140px;
      text-align: right;
    }
  }
</style>
