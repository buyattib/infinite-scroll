import { useEffect, useState, useRef } from 'react'

export function useNearScreen<ObserverType extends HTMLElement>({ distance = '50px', once = false } = {}) {
	const [isNearScreen, setShow] = useState(false)
	const observerTargetRef = useRef<ObserverType>(null)

	useEffect(() => {
		const element = observerTargetRef.current

		const onChange = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
			const elementObs = entries[0]
			if (elementObs.isIntersecting) {
				setShow(true)
				once && observer.disconnect()
			} else {
				!once && setShow(false)
			}
		}

		const observer = new IntersectionObserver(onChange, {
			rootMargin: distance,
		})

		if (element != null) observer.observe(element)

		return () => observer && observer.disconnect()
	}, [])

	return { isNearScreen, observerTargetRef }
}
