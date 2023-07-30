import { useState, useEffect, useRef } from 'react'

import { useNearScreen } from '@/hooks/useNearScreen'
import { Pokemon } from '@/models/pokemons.type'
import { fetchPokemons } from '@/services/pokemons'

export function usePokemons() {
	const [loading, setLoading] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')
	const [pokemons, setPokemons] = useState<Pokemon[]>([])
	const currentPage = useRef(1)

	const { isNearScreen, observerTargetRef } = useNearScreen<HTMLDivElement>()

	useEffect(() => {
		const controller = new AbortController()
		const signal = controller.signal

		setLoading(true)
		fetchPokemons({ signal })
			.then(response => {
				setPokemons(response.results)
			})
			.catch(error => {
				if (error.message !== 'The user aborted a request.') {
					setErrorMessage(error.message)
				}
			})
			.finally(() => {
				setLoading(false)
			})

		return () => {
			controller.abort()
		}
	}, [])

	const fetchMore = (signal: AbortSignal) => {
		const nextPage = currentPage.current + 1
		currentPage.current = nextPage

		fetchPokemons({ page: nextPage, signal })
			.then(response => {
				setPokemons(prevPokemons => [...prevPokemons, ...response.results])
			})
			.catch(error => {
				if (error.message !== 'The user aborted a request.') {
					setErrorMessage(error.message)
				}
			})
	}

	useEffect(() => {
		const controller = new AbortController()
		const signal = controller.signal

		if (isNearScreen) {
			fetchMore(signal)
		}

		return () => {
			controller.abort()
		}
	}, [isNearScreen])

	return { loading, errorMessage, pokemons, observerTargetRef, fetchMore }
}
