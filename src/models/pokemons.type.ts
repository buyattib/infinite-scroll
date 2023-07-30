export type Pokemon = {
	name: string
	url: string
}

export type PokemonApiResponse = {
	count: number
	next: null | number
	previous: null | number
	results: Pokemon[]
}
