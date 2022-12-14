import {gql} from '@apollo/client';

export const GET_REPOSITORIES = gql`
    query GetRepositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String) {
        repositories (orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword) {
            edges {
                node {
                	id
                    fullName
                    reviewCount
                    ratingAverage
                    stargazersCount
                    forksCount
                    ownerAvatarUrl
                    description
                    language
                    url
                }
            }
        }
    }
`;

export const GET_USER = gql`
	query GetAuthorizedUser {
		me {
			id
			username
		}
	}
`;

export const GET_SINGLE_REPOSITORY = gql`
	query GetSingleRepository($id: ID!, $first: Int, $after: String) {
		repository(id: $id) {
			fullName
			reviewCount
			ratingAverage
			stargazersCount
			forksCount
			ownerAvatarUrl
			description
			language
			url
			reviews (first: $first, after: $after) {
				totalCount
      			edges {
        			node {
        				id
						text
						rating
						createdAt
						user {
            				username
            				id
          				}
        			}
					cursor
      			}
				pageInfo {
					endCursor
					startCursor
					hasNextPage
				}
    		}
		}
	}
`;