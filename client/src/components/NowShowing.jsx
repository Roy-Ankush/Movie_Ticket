import 'react-toastify/dist/ReactToastify.css';
import Loading from './Loading';

const NowShowing = ({ movies, selectedMovieIndex, setSelectedMovieIndex, auth, isFetchingMoviesDone }) => {
	return (
		<div className="border-solid border-2 flex-1 mx-2 flex flex-col rounded-md bg-[#000000] p-3 text-gray-900 drop-shadow-md sm:mx-4 sm:p-6">
			<h2 className="text-2xl font-bold text-center text-white sm:text-3xl">Now Showing</h2>
			{isFetchingMoviesDone ? (
				movies.length ? (
					<div className="mt-2 flex flex-wrap justify-center gap-3 sm:mt-4 sm:gap-4">
						{movies?.map((movie, index) => {
							return movies[selectedMovieIndex]?._id === movie._id ? (
								<div
									key={index}
									title={movie.name}
									className="flex w-[100px] sm:w-[144px] flex-col rounded-md bg-[#FFA27F] p-2 text-white drop-shadow-md"
									onClick={() => {
										setSelectedMovieIndex(null);
										sessionStorage.setItem('selectedMovieIndex', null);
									}}
								>
									<img
										src={movie.img}
										className="h-32 rounded-md object-cover drop-shadow-md sm:h-48"
									/>
									<p className="truncate pt-1 text-center text-sm font-semibold leading-4 sm:text-base">
										{movie.name}
									</p>
								</div>
							) : (
								<div
									key={index}
									className="flex w-[100px] sm:w-[144px] flex-col rounded-md bg-white p-1 drop-shadow-md hover:bg-gradient-to-br hover:from-indigo-500 hover:to-red-600 hover:text-white"
									onClick={() => {
										setSelectedMovieIndex(index);
										sessionStorage.setItem('selectedMovieIndex', index);
									}}
								>
									<img
										src={movie.img}
										className="h-32 rounded-md object-cover drop-shadow-md sm:h-48"
									/>
									<p className="truncate pt-1 text-center text-sm font-semibold leading-4 sm:text-base">
										{movie.name}
									</p>
								</div>
							);
						})}
					</div>
				) : (
					<p className="mt-4 text-center text-white">There are no movies available</p>
				)
			) : (
				<Loading />
			)}
		</div>
	);
};

export default NowShowing;
