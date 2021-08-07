import { gql } from '@apollo/client';

export const SAVE_BOOK = gql`
	mutation saveBook(
		$authors: [String!]
		$title: String!
		$description: String!
		$bookId: String!
		$image: String
		$link: String
	) {
		saveBook(
			authors: $authors
			title: $title
			description: $description
			bookId: $bookId
			image: $image
			link: $link
		) {
			authors
			title
			description
			bookId
			image
			link
		}
	}
`;

export const LOGIN_USER = gql`
	mutation login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
			user {
				_id
				username
			}
		}
	}
`;

export const CREATE_USER = gql`
	mutation addUser($username: String!, $email: String!, $password: String!) {
		addUser(username: $username, email: $email, password: $password) {
			token
			user {
				_id
				username
			}
		}
	}
`;

export const REMOVE_BOOK = gql`
	mutation removeBook($bookId: ID!) {
		removeBook(bookId: $bookId) {
			username
			savedBooks {
				_id
			}
		}
	}
`;
