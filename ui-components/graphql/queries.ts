/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getLoans = /* GraphQL */ `
  query GetLoans($id: ID!) {
    getLoans(id: $id) {
      createdAt
      id
      owner
      person {
        createdAt
        id
        name
        owner
        role
        updatedAt
        __typename
      }
      person_id
      returned
      tool {
        createdAt
        description
        id
        name
        owner
        position
        updatedAt
        __typename
      }
      tool_id
      updatedAt
      __typename
    }
  }
`;
export const getPerson = /* GraphQL */ `
  query GetPerson($id: ID!) {
    getPerson(id: $id) {
      createdAt
      id
      loans {
        nextToken
        __typename
      }
      name
      owner
      role
      updatedAt
      __typename
    }
  }
`;
export const getTools = /* GraphQL */ `
  query GetTools($id: ID!) {
    getTools(id: $id) {
      createdAt
      description
      id
      loans {
        nextToken
        __typename
      }
      name
      owner
      position
      updatedAt
      __typename
    }
  }
`;
export const listLoans = /* GraphQL */ `
  query ListLoans(
    $filter: ModelLoansFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLoans(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        createdAt
        id
        owner
        person_id
        returned
        tool_id
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listPeople = /* GraphQL */ `
  query ListPeople(
    $filter: ModelPersonFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPeople(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        createdAt
        id
        name
        owner
        role
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const listTools = /* GraphQL */ `
  query ListTools(
    $filter: ModelToolsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTools(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        createdAt
        description
        id
        name
        owner
        position
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
