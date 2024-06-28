import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import { Amplify } from "aws-amplify";
import outputs from '../amplify_outputs.json';
import { TabBar } from './components/TabBar.tsx';


Amplify.configure(outputs);

//const userAttributes = await fetchUserAttributes();

function App() {

  return (

    <Authenticator signUpAttributes={['preferred_username']}>
      {({ }) => (
        <main>
          <TabBar />

        </main>

      )}
    </Authenticator>
  );
}

export default App;
