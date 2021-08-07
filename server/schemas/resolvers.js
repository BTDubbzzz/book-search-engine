const { User, Book } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const bookSchema = require('../models/Book');

const resolvers = {
	Query: {
		users: async () => {
			return User.find().populate('savedBooks');
		},
		user: async (parent, { userID }) => {
			return User.findOne({ _id: userID }).populate('savedBooks');
		},
		me: async (parent, args, context) => {
			// console.log('context :>> ', context);
			if (context.user) {
				// console.log(User.findOne({ _id: context.user._id }).populate('savedBooks'));
				return User.findOne({ _id: context.user._id }).populate('savedBooks');
			}
			throw new AuthenticationError('You need to be logged in');
		},
	},

	Mutation: {
		addUser: async (parent, { username, email, password }) => {
			const user = await User.create({ username, email, password });
			const token = signToken(user);

			return { token, user };
		},
		login: async (parent, { email, password }) => {
			const user = await User.findOne({ email });

			if (!user) {
				throw new AuthenticationError('Error signing in');
			}

			const correctPw = await user.isCorrectPassword(password);

			if (!correctPw) {
				throw new AuthenticationError('Error signing in');
			}

			const token = signToken(user);
			return { token, user };
		},
		saveBook: async (
			parent,
			{ title, authors, description, bookId, image, link },
			context
		) => {
			if (context.user) {
				const book = await Book.create({
					title,
					authors,
					description,
					bookId,
					image,
					link,
				});
				console.log('book :>> ', book);
				const updatedUser = await User.findOneAndUpdate(
					{ _id: context.user._id },
					{
						$addToSet: {
							savedBooks: book,
						},
					}
				);
				console.log('updatedUser :>> ', updatedUser);
				return book;
			}
		},
	},
};

module.exports = resolvers;
