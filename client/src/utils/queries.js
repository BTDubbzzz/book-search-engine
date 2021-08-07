import { gql } from '@apollo/client';

export const QUERY_SAVED_BOOKS = gql`
	query savedBooks($title: String!) {
		savedBooks(title: $title)
	}
`;

export const QUERY_ME = gql`
	query me {
		me {
			_id
			username
			email
			savedBooks {
				_id
				authors
				title
				description
				link
				image
				bookId
			}
		}
	}
`;
