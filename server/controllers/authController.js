const User = require('../models/User')

//  Public Route
exports.register = async (req, res, next) => {
	try {
		const { username, email, password, role = 'user' } = req.body

		//Create user
		const user = await User.create({
			username,
			email,
			password,
			role
		})

		sendTokenResponse(user, 200, res)
	} catch (err) {
		res.status(400).json({ success: false, message: err })
	}
}

// Public Route
exports.login = async (req, res, next) => {
	try {
		const { username, password } = req.body

		//Validate email & password
		if (!username || !password) {
			return res.status(400).json('Please provide an username and password')
		}

		//Check for user and include the password field also in result. 
		const user = await User.findOne({ username }).select('+password')

		if (!user) {
			return res.status(400).json('Invalid credentials')
		}

		//Check if password matches or not matchpassword is define in models
		const isMatch = await user.matchPassword(password)

		if (!isMatch) {
			return res.status(401).json('Invalid credentials')
		}

		sendTokenResponse(user, 200, res)
	} catch (err) {
		res.status(400).json({ success: false, message: err })
	}
}

//Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
	//Create token and getSignedJwtToken() is defined in models
	const token = user.getSignedJwtToken()

	const options = {
		expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
		httpOnly: true
	}
// Types of environment production, test and development
	if (process.env.NODE_ENV === 'production') {
		options.secure = true
	}
	res.status(statusCode).cookie('token', token, options).json({
		success: true,
		token
	})
}

//	Get current Logged in user
//  Private route
exports.getMe = async (req, res, next) => {
	try {
		const user = await User.findById(req.user.id)
		res.status(200).json({
			success: true,
			data: user
		})
	} catch (err) {
		res.status(400).json({ success: false, message: err })
	}
}

//	Get user's tickets
//	Private Route
exports.getTickets = async (req, res, next) => {
	try {
		// with the help of userid return ticket_id only using project document
		const user = await User.findById(req.user.id, { tickets: 1 }).populate({
			//populate showtime property of each ticket with  corrosponding sowtime document
			path: 'tickets.showtime',
			// using nested populate option here to populate other info.
			populate: [
				'movie',
				{ path: 'theater', populate: { path: 'cinema', select: 'name' }, select: 'cinema number' }
			],
			select: 'theater movie showtime isRelease'// field that include in populate document
		})

		res.status(200).json({
			success: true,
			data: user
		})
	} catch (err) {
		res.status(400).json({ success: false, message: err })
	}
}

//	Log user out / clear cookie
//	Private
exports.logout = async (req, res, next) => {
	try {
		res.cookie('token', 'none', {
			expires: new Date(Date.now() + 10 * 1000),
			httpOnly: true
		})

		res.status(200).json({
			success: true
		})
	} catch (err) {
		res.status(400).json({ success: false, message: err })
	}
}

//	Get All user
//	Private Routr for Admin only
exports.getAll = async (req, res, next) => {
	try {
		const user = await User.find().populate({
			path: 'tickets.showtime',
			populate: [
				'movie',
				{ path: 'theater', populate: { path: 'cinema', select: 'name' }, select: 'cinema number' }
			],
			select: 'theater movie showtime isRelease'
		})

		res.status(200).json({
			success: true,
			data: user
		})
	} catch (err) {
		res.status(400).json({ success: false, message: err })
	}
}

//	Delete user
//	Private Admin
exports.deleteUser = async (req, res, next) => {
	try {
		const user = await User.findByIdAndDelete(req.params.id)

		if (!user) {
			return res.status(400).json({ success: false })
		}
		res.status(200).json({ success: true })
	} catch (err) {
		res.status(400).json({ success: false, message: err })
	}
}

//     Update user
//   Private
exports.updateUser = async (req, res, next) => {
	try {
		const user = await User.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true
		})

		if (!user) {
			return res.status(400).json({ success: false, message: `User not found with id of ${req.params.id}` })
		}
		res.status(200).json({ success: true, data: user })
	} catch (err) {
		res.status(400).json({ success: false, message: err })
	}
}
