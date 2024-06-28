import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import { fetchUserAttributes } from 'aws-amplify/auth';
import { Amplify } from "aws-amplify";
import outputs from '../amplify_outputs.json';


Amplify.configure(outputs);
const client = generateClient<Schema>();
const userAttributes = await fetchUserAttributes();

function AppCopy() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }

  function deleteTodo(id: string) {
    client.models.Todo.delete({ id });
  }

  function modifyEmail(email: string | undefined){
    if(email !== undefined){
       return email.substring(0, email.indexOf('@'));
    } 
    else{
      return email;
    }

  }

  return (

    <Authenticator signUpAttributes={['preferred_username']}>
      {({ signOut, user }) => (
        <main>
          <h1>My todos</h1>
          <h1>{modifyEmail(user?.signInDetails?.loginId)}'s</h1>
          <h1>{userAttributes.preferred_username}'s</h1>
          <button onClick={createTodo}>+ new</button>
          <ul>
            {todos.map((todo) => (
              <li
                onClick={() => deleteTodo(todo.id)}
                key={todo.id}>{todo.content}</li>
            ))}
          </ul>
          <div>
            🥳 App successfully hosted. Try creating a new todo.
            <br />
            <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
              Review next step of this tutorial.
            </a>
          </div>
          <button onClick={signOut}>Sign out</button>
        </main>

      )}
    </Authenticator>
  );
}

export default AppCopy;
