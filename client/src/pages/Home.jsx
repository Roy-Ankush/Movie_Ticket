import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from '../components/Navbar'
import NowShowing from '../components/NowShowing'
import TheaterListsByMovie from '../components/TheaterListsByMovie'
import { AuthContext } from '../context/AuthContext'
import movie from '../../../images/mov.avif'
// import News from '../components/News'

const Home = () => {
	const { auth } = useContext(AuthContext)
	const [selectedMovieIndex, setSelectedMovieIndex] = useState(parseInt(sessionStorage.getItem('selectedMovieIndex')))
	const [movies, setMovies] = useState([])
	const [isFetchingMoviesDone, setIsFetchingMoviesDone] = useState(false)

	const fetchMovies = async (data) => {
		try {
			setIsFetchingMoviesDone(false)
			let response
			if (auth.role === 'admin') {
				response = await axios.get('/movie/unreleased/showing', {
					headers: {
						Authorization: `Bearer ${auth.token}`
					}
				})
			} else {
				response = await axios.get('/movie/showing')
			}
			setMovies(response.data.data)
		} catch (error) {
			console.error(error)
		} finally {
			setIsFetchingMoviesDone(true)
		}
	}

	useEffect(() => {
		fetchMovies()
	}, [])

	const props = {
		movies,
		selectedMovieIndex,
		setSelectedMovieIndex,
		auth,
		isFetchingMoviesDone
	}
	return (
		<>
			<div className="flex min-h-screen flex-col gap-4 bg-black pb-8 sm:gap-8"
				style={{
					backgroundImage: `linear-gradient(rgba(0, 0, 10, 0.5), rgba(0, 0, 10, 0.5)), url(${movie})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					backgroundRepeat: 'no-repeat',
				}}>
				<Navbar />
				<div className='flex'>
					
						<NowShowing {...props} />
					
						{/* <News /> */}
					
				</div>

				{movies[selectedMovieIndex]?.name && <TheaterListsByMovie {...props} />}
			</div>
		</>
	)
}

export default Home
