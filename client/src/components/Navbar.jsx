import {
	ClockIcon,
	FilmIcon,
	HomeModernIcon,
	MagnifyingGlassIcon,
	TicketIcon,
	UsersIcon,
	VideoCameraIcon
} from '@heroicons/react/24/outline'
import { Bars3Icon } from '@heroicons/react/24/solid'
import axios from 'axios'
import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AuthContext } from '../context/AuthContext'
import booknow from '../../../images/booknow.png'

const Navbar = () => {
	const { auth, setAuth } = useContext(AuthContext)
	const [menuOpen, setMenuOpen] = useState(false)
	const [isLoggingOut, SetLoggingOut] = useState(false)

	const toggleMenu = () => {
		setMenuOpen(!menuOpen)
	}

	const navigate = useNavigate()

	const onLogout = async () => {
		try {
			SetLoggingOut(true)
			const response = await axios.get('/auth/logout')
			// console.log(response)
			setAuth({ username: null, email: null, role: null, token: null })
			sessionStorage.clear()
			navigate('/')
			toast.success('Logout successful!', {
				position: 'top-center',
				autoClose: 2000,
				pauseOnHover: false
			})
		} catch (error) {
			console.error(error)
			toast.error('Error', {
				position: 'top-center',
				autoClose: 2000,
				pauseOnHover: false
			})
		} finally {
			SetLoggingOut(false)
		}
	}

	const menuLists = () => {
		return (
			<>
				<div className="flex flex-col gap-2 lg:flex-row">
					<Link
						to={'/cinema'}
						className={`flex items-center justify-center gap-2 rounded-md px-2 py-1 text-white hover:bg-[#5C8374] font-bold ${
							window.location.pathname === '/cinema'
								? 'bg-[#5C8374]'
								: 'bg-black'
						}`}
					>
						{/* <HomeModernIcon className="h-6 w-6" /> */}
						<p>Cinema</p>
					</Link>
					<Link
						to={'/schedule'}
						className={`flex items-center justify-center gap-2 rounded-md px-2 py-1 text-white hover:bg-[#5C8374]  font-bold ${
							window.location.pathname === '/schedule'
								? 'bg-[#5C8374]'
								: 'bg-black'
						}`}
					>
						{/* <ClockIcon className="h-6 w-6" /> */}
						<p>Schedule</p>
					</Link>
					{auth.role && (
						<Link
							to={'/ticket'}
							className={`flex items-center justify-center gap-2 rounded-md px-2 py-1 text-white hover:bg-[#5C8374] font-bold ${
								window.location.pathname === '/ticket'
									? 'bg-[#5C8374]'
								: 'bg-black'
							}`}
						>
							{/* <TicketIcon className="h-6 w-6" /> */}
							<p>Ticket</p>
						</Link>
					)}
					{auth.role === 'admin' && (
						<>
							<Link
								to={'/movie'}
								className={`flex items-center justify-center gap-2 rounded-md px-2 py-1 text-white hover:bg-[#5C8374]  font-bold ${
									window.location.pathname === '/movie'
										? 'bg-[#5C8374]'
								: 'bg-black'
								}`}
							>
								{/* <VideoCameraIcon className="h-6 w-6" /> */}
								<p>Movie</p>
							</Link>
							{/* <Link
								to={'/search'}
								className={`flex items-center justify-center gap-2 rounded-md px-2 py-1 text-white hover:bg-red-500   font-bold ${
									window.location.pathname === '/search'
										? 'bg-red-500'
								: 'bg-black'
								}`}
							>
								<MagnifyingGlassIcon className="h-6 w-6" />
								<p>Search</p>
							</Link> */}
							<Link
								to={'/user'}
								className={`flex items-center justify-center gap-2 rounded-md px-2 py-1 text-white hover:bg-[#5C8374]  font-bold ${
									window.location.pathname === '/user'
										? 'bg-[#5C8374]'
								: 'bg-black'
								}`}
							>
								{/* <UsersIcon className="h-6 w-6" /> */}
								<p>Users</p>
							</Link>
						</>
					)}
				</div>
				<div className="flex grow items-center justify-center gap-3 lg:justify-end">
					{auth.username && (
						<p className="text-md whitespace-nowrap leading-none text-white font-bold">Welcome {auth.username}!</p>
					)}
					{auth.token ? (
						<button
							className="rounded-lg bg-black px-2 py-1 text-white drop-shadow-md hover:bg-[#5C8374] disabled:from-slate-500 disabled:to-slate-400 font-bold"
							onClick={() => onLogout()}
							disabled={isLoggingOut}
						>
							{isLoggingOut ? 'Processing...' : 'Logout'}
						</button>
					) : (
						<button className="rounded-lg bg-black px-2 py-1 text-white drop-shadow-md hover:bg-[#5C8374]">
							<Link to={'/login'}>Login</Link>
						</button>
					)}
				</div>
			</>
		)
	}

	return (
		<nav className="flex flex-col items-center justify-between gap-2 bg-black px-4 py-3 drop-shadow-lg lg:flex-row lg:justify-start sm:px-8">
			<div className="flex w-full flex-row justify-between lg:w-fit">
				<button className="flex flex-row items-center gap-2" onClick={() => navigate('/')}>
					<div className="h-12 w-12  text-white font-bold " ><img className=' w-28' src={booknow} alt="" /></div>
					<h1 className="mr-2 text-xl text-white font-bold">BookNow</h1>
				</button>
				<button
					className="flex h-8 w-8 items-center justify-center rounded  lg:hidden"
					onClick={() => toggleMenu()}
				>
					<Bars3Icon className="h-6 w-6 mt-5 text-white" />
				</button>
			</div>
			<div className="hidden grow justify-between gap-2 lg:flex">{menuLists()}</div>
			{menuOpen && <div className="flex w-full grow flex-col gap-2 lg:hidden">{menuLists()}</div>}
		</nav>
	)
}

export default Navbar
