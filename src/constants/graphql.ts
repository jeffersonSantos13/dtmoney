//export const GRAPHQL_API = "http://localhost:9320/graphql";
export const GRAPHQL_API =  "https://api-graphql-transaction.herokuapp.com/graphql";

export let LIST_ALL_TRANSACTIONS = `
  query Transactions($page: Int){
    listAllTransactions(page: $page) {
      pageInfo {
          page
          totalCount
          hasNextPage
          hasPreviousPage
      },
      transactionResponse {
          id
          title
          type
          amount
          category
      }
    }
  }
`;

export const MUTATION_CREATE_TRANSACTION = `
  mutation($input: TransactionInput) {
    createTransaction(input: $input) {
      id
      title
      type
      amount
      category
    }
  }
`;

export const MUTATION_UPDATE_TRANSACTION = `
  mutation($input: TransactionInput) {
    updateTransaction(input: $input) {
      id
      title
      type
      amount
      category
    }
  }
`;

export const MUTATION_DELETE_TRANSACTION = `
  mutation($id: ID!) {
    deleteTransaction(id: $id)
  }
`;



