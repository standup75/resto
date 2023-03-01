import { gql } from 'apollo-boost'; 
import { get } from '../lib/rest'
import { writable } from 'svelte/store'
import { client } from '../lib/data'

const { subscribe, set } = writable(null)
let value
subscribe(u => {
  u && (value = u)
})
export const user = {
  subscribe,
  set,
  get: () => new Promise(resolve => {
		subscribe(u => {
			if (u) resolve(u)
		})
	}),
}

export function refresh() {
	get('user/current').then(response => {
		if (response.user) {
			user.set(response.user)
		} else {
			user.set(null)
		}
	})
}

export async function getPortfolio() {
	const currentUser = await user.get()
	if (!currentUser) {
		throw 'Not logged in'
	}
	return await client.query({
		query: gql`
			query ($id:String!) {
				user(id:$id){ id email name balance balances { token amount } }
			}
		`,
		variables: { id: currentUser.id }
	})
}