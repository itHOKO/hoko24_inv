import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { LegendPosition } from "aws-cdk-lib/aws-cloudwatch";

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any user authenticated via an API key can "create", "read",
"update", and "delete" any "Todo" records.
=========================================================================*/
const schema = a.schema({
  Tools: a
    .model({
      name: a.string().required(),
      description: a.string(),
      loans: a.hasMany("Loans",'tool_id'),
    })
    .authorization((allow) => [allow.owner()]),
    Loans: a
    .model({
      returned: a.boolean().default(false).required(),
      person_id: a.id(),
      tool_id: a.id(),
      tool: a.belongsTo("Tools",'tool_id'),
      person: a.belongsTo("Person",'person_id'),
    })
    .authorization((allow) => [allow.owner()]),
    Person: a
    .model({
      name: a.string().required(),
      role: a.string(),
      loans: a.hasMany("Loans",'person_id'),
    })
    .authorization((allow) => [allow.owner()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
