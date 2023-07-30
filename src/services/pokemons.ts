import { PokemonApiResponse } from '@/models/pokemons.type'
import { API_ENDPOINT } from '@/endpoints/pokemons.d'

export const fetchPokemons = async ({
	number = 15,
	page = 1,
	signal,
}: {
	number?: number
	page?: number
	signal?: AbortSignal
} = {}): Promise<PokemonApiResponse> => {
	return fetch(`${API_ENDPOINT}?limit=${number}&offset=${(page - 1) * number}`, { signal }).then(
		response => {
			if (!response.ok) {
				throw new Error('There was an error fetching the pokemons')
			}
			return response.json()
		}
	)
}
