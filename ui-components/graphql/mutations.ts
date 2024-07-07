/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createLoans = /* GraphQL */ `
  mutation CreateLoans(
    $condition: ModelLoansConditionInput
    $input: CreateLoansInput!
  ) {
    createLoans(condition: $condition, input: $input) {
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
export const createPerson = /* GraphQL */ `
  mutation CreatePerson(
    $condition: ModelPersonConditionInput
    $input: CreatePersonInput!
  ) {
    createPerson(condition: $condition, input: $input) {
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
export const createTools = /* GraphQL */ `
  mutation CreateTools(
    $condition: ModelToolsConditionInput
    $input: CreateToolsInput!
  ) {
    createTools(condition: $condition, input: $input) {
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
export const deleteLoans = /* GraphQL */ `
  mutation DeleteLoans(
    $condition: ModelLoansConditionInput
    $input: DeleteLoansInput!
  ) {
    deleteLoans(condition: $condition, input: $input) {
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
export const deletePerson = /* GraphQL */ `
  mutation DeletePerson(
    $condition: ModelPersonConditionInput
    $input: DeletePersonInput!
  ) {
    deletePerson(condition: $condition, input: $input) {
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
export const deleteTools = /* GraphQL */ `
  mutation DeleteTools(
    $condition: ModelToolsConditionInput
    $input: DeleteToolsInput!
  ) {
    deleteTools(condition: $condition, input: $input) {
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
export const updateLoans = /* GraphQL */ `
  mutation UpdateLoans(
    $condition: ModelLoansConditionInput
    $input: UpdateLoansInput!
  ) {
    updateLoans(condition: $condition, input: $input) {
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
export const updatePerson = /* GraphQL */ `
  mutation UpdatePerson(
    $condition: ModelPersonConditionInput
    $input: UpdatePersonInput!
  ) {
    updatePerson(condition: $condition, input: $input) {
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
export const updateTools = /* GraphQL */ `
  mutation UpdateTools(
    $condition: ModelToolsConditionInput
    $input: UpdateToolsInput!
  ) {
    updateTools(condition: $condition, input: $input) {
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
