/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateLoans = /* GraphQL */ `
  subscription OnCreateLoans(
    $filter: ModelSubscriptionLoansFilterInput
    $owner: String
  ) {
    onCreateLoans(filter: $filter, owner: $owner) {
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
        updatedAt
        __typename
      }
      tool_id
      updatedAt
      __typename
    }
  }
`;
export const onCreatePerson = /* GraphQL */ `
  subscription OnCreatePerson(
    $filter: ModelSubscriptionPersonFilterInput
    $owner: String
  ) {
    onCreatePerson(filter: $filter, owner: $owner) {
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
export const onCreateTools = /* GraphQL */ `
  subscription OnCreateTools(
    $filter: ModelSubscriptionToolsFilterInput
    $owner: String
  ) {
    onCreateTools(filter: $filter, owner: $owner) {
      createdAt
      description
      id
      loans {
        nextToken
        __typename
      }
      name
      owner
      updatedAt
      __typename
    }
  }
`;
export const onDeleteLoans = /* GraphQL */ `
  subscription OnDeleteLoans(
    $filter: ModelSubscriptionLoansFilterInput
    $owner: String
  ) {
    onDeleteLoans(filter: $filter, owner: $owner) {
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
        updatedAt
        __typename
      }
      tool_id
      updatedAt
      __typename
    }
  }
`;
export const onDeletePerson = /* GraphQL */ `
  subscription OnDeletePerson(
    $filter: ModelSubscriptionPersonFilterInput
    $owner: String
  ) {
    onDeletePerson(filter: $filter, owner: $owner) {
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
export const onDeleteTools = /* GraphQL */ `
  subscription OnDeleteTools(
    $filter: ModelSubscriptionToolsFilterInput
    $owner: String
  ) {
    onDeleteTools(filter: $filter, owner: $owner) {
      createdAt
      description
      id
      loans {
        nextToken
        __typename
      }
      name
      owner
      updatedAt
      __typename
    }
  }
`;
export const onUpdateLoans = /* GraphQL */ `
  subscription OnUpdateLoans(
    $filter: ModelSubscriptionLoansFilterInput
    $owner: String
  ) {
    onUpdateLoans(filter: $filter, owner: $owner) {
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
        updatedAt
        __typename
      }
      tool_id
      updatedAt
      __typename
    }
  }
`;
export const onUpdatePerson = /* GraphQL */ `
  subscription OnUpdatePerson(
    $filter: ModelSubscriptionPersonFilterInput
    $owner: String
  ) {
    onUpdatePerson(filter: $filter, owner: $owner) {
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
export const onUpdateTools = /* GraphQL */ `
  subscription OnUpdateTools(
    $filter: ModelSubscriptionToolsFilterInput
    $owner: String
  ) {
    onUpdateTools(filter: $filter, owner: $owner) {
      createdAt
      description
      id
      loans {
        nextToken
        __typename
      }
      name
      owner
      updatedAt
      __typename
    }
  }
`;
