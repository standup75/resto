<script>
  import { gql } from 'apollo-boost'; 
  import { client } from '../lib/data'; 
  const users = client.query({ query: gql`
    {users {email name}}
  ` });
</script>

{#await $users}
  Loading...
{:then result}
  {#each result.data.users as user}
    {user.email}
  {/each}
{:catch error}
  Error: {error}
{/await}