import { usePokemons } from './hooks/usePokemons'
import './App.css'

function App() {
	const {
		loading,
		errorMessage,
		pokemons,
		observerTargetRef,
		// fetchMore
	} = usePokemons()

	return (
		<>
			{/* a min-height of 100vh to push the observer target outside the viewport when initially there are no elements in the list */}
			<main style={{ minHeight: '100vh' }}>
				<h1>Explore the pokemons!</h1>
				{loading ? (
					'Loading pokemons...'
				) : (
					<>
						{errorMessage ? (
							<p style={{ color: 'red' }}>{errorMessage}</p>
						) : (
							<>
								<h2>Pokemons:</h2>
								<ul
									style={{
										listStyle: 'none',
										padding: 0,
									}}
								>
									{pokemons.map(p => (
										<li
											key={p.name}
											style={{
												width: '50%',
												padding: '0.5em',
												margin: '1em auto',
												borderRadius: '3px',
												background: '#005d90',
												color: 'white',
											}}
										>
											{p.name}
										</li>
									))}
								</ul>
								{/* if instead of infinite scroll want to use a button */}
								{/* <button onClick={fetchMore}>Get more!</button> */}
							</>
						)}
					</>
				)}
			</main>
			<div ref={observerTargetRef}></div>
		</>
	)
}

export default App
