import { DateTime } from 'luxon'
import { writable } from 'svelte/store'
import { gql } from 'apollo-boost'
import { client } from '../lib/data'
import { user } from './user'
const GET_PROPERTIES = gql`
	{properties {max_supply supply issuer name street city state symbol token_sale_start token_sale_end dollar_value sold_amount}}
`
const MINT = gql`
	mutation PropertyIssueTokens($symbol: String!, $amount: Int!) {
			propertyIssueTokens(symbol: $symbol, amount: $amount) {
					id block_num block_time error_code
			}
	}
`
const BUY = gql`
	mutation PropertyBuyTokens($symbol: String!, $amount: Int!) {
			propertyBuyTokens(symbol: $symbol, amount: $amount) {
					id block_num block_time error_code
			}
	}
`
const today = DateTime.local().startOf('day')
const { subscribe, set } = writable(null)
let value

class Property {
	constructor(p) {
		Object.assign(this, p)
		this.token_sale_start = DateTime.fromISO(p.token_sale_start)
		this.token_sale_end = DateTime.fromISO(p.token_sale_end)
	}
	async mint(amount) {
		const response = await client.mutate({
			mutation: MINT,
			variables: { amount, symbol: this.symbol },
			refetchQueries: GET_PROPERTIES,
		})
		if (response.data.propertyIssueTokens) {
			await refresh()
		} else {
			throw response.errors
		}
	}
	async buy(amount) {
		const response = await client.mutate({
			mutation: BUY,
			variables: { amount, symbol: this.symbol },
			refetchQueries: GET_PROPERTIES,
		})
		if (response.data.propertyBuyTokens) {
			await refresh()
		} else {
			throw response.errors
		}
	}
}

user.subscribe(u => {
	if (u && value) {
		own.set(value.filter(p => p.issuer === u.name))
	}
})

async function refresh() {
	const response = await client.query({ query: GET_PROPERTIES })
	value = response.data.properties.map(p => new Property(p))
	set(value)
	const propertiesWithSupply = value.filter(p => parseFloat(p.supply) > 0)
	upcomings.set(propertiesWithSupply.filter(p => p.token_sale_start > today))
	tokenSales.set(propertiesWithSupply.filter(p => p.token_sale_start <= today && p.token_sale_end >= today))
	const currentUser = await user.get()
	own.set(value.filter(p => p.issuer === currentUser.name))
}

export const upcomings = writable(null)
export const tokenSales = writable(null)
export const own = writable(null)
export const getProperty = (symbol) => {
	return new Promise((resolve, reject) => {
		subscribe(properties => {
			if (properties) {
				const property = properties.find(p => p.symbol === symbol)
				console.log(0, properties, property, symbol)
				if (property) {
					resolve(property)
				} else {
					reject(`No properties found for symbol ${symbol}`)
				}
			}
		})
	})
}
export const properties = {
	refresh,
	subscribe,
}
