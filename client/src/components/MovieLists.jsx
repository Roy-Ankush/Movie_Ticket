import { TrashIcon } from '@heroicons/react/24/solid'

const MovieLists = ({ movies, search, handleDelete }) => {
	const moviesList = movies?.filter((movie) => movie.name.toLowerCase().includes(search?.toLowerCase() || ''));

	return !!moviesList.length ? (
		<div className="grid grid-cols-1 gap-4 rounded-md bg-black border-solid border-2 border-green-900 p-4 drop-shadow-md sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 min-[1920px]:grid-cols-5">
			{moviesList.map((movie, index) => {
				return (
					<div key={index} className="flex min-w-full flex-col sm:flex-row border-solid border-2 border-green-900 rounded-md bg-[#5C8374] drop-shadow-md p-2">
						<img
							src={movie.img}
							className="h-40 w-full rounded-md object-cover drop-shadow-md sm:h-48 sm:w-auto sm:min-w-[120px] lg:min-w-[150px]"
						/>
						<div className="flex flex-grow flex-col justify-between p-2">
							<div>
								<p className="text-lg font-semibold text-white sm:text-xl">{movie.name}</p>
								<p className="text-white">Length: {movie.length || '-'} min.</p>
							</div>
							<button
								className="flex w-fit items-center gap-1 self-end rounded-md bg-gradient-to-br from-red-800 to-rose-600 py-1 pl-2 pr-1.5 text-sm font-medium text-white hover:from-red-600 hover:to-rose-500"
								onClick={() => handleDelete(movie)}
							>
								DELETE
								<TrashIcon className="h-5 w-5" />
							</button>
						</div>
					</div>
				);
			})}
		</div>
	) : (
		<div className="text-white text-center mt-4">No movies found</div>
	);
};

export default MovieLists;
