import { gql } from '@apollo/client';

export const SAVE_BOOK = gql`
	mutation saveBook($authors: [String!], $title: String!) {
		saveBook(authors: $authors, title: $title) {
			authors
			title
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
