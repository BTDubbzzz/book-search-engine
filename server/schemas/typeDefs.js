const { gql } = require('apollo-server-express');

const typeDefs = gql`
	type User {
		_id: ID!
		username: String!
		email: String!
		password: String!
		savedBooks: [Book]
	}

	type Auth {
		token: ID!
		user: User
	}

	type Book {
		_id: ID!
		authors: [String!]
		description: String!
		bookId: String!
		image: String
		link: String
		title: String!
	}

	type Query {
		users: [User]
		user(userID: ID!): User
	}

	type Mutation {
		addUser(username: String!, email: String!, password: String!): Auth
		login(email: String!, password: String!): Auth
		saveBook(
			title: String!
			authors: [String!]
			description: String!
			bookId: String!
			image: String
			link: String
		): Book
	}
`;

module.exports = typeDefs;
