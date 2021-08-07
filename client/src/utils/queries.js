import { gql } from '@apollo/client';

export const QUERY_SAVED_BOOKS = gql`
	query savedBooks($title: String!) {
		savedBooks(title: $title)
	}
`;
