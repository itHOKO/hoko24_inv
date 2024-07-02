import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import { Amplify } from "aws-amplify";
import outputs from '../amplify_outputs.json';
import { TabBar } from './components/TabBar.tsx';
import { useSymbologyScanner } from '@use-symbology-scanner/react';
import { useRef } from 'react';




Amplify.configure(outputs);

//const userAttributes = await fetchUserAttributes();

function App() {

  const scannerOptions = {
    prefix: '',
    suffix: '\n',
    maxDelay: 20
}

  const handleSymbol = (symbol: string | void) => {
    console.log(symbol);
    
  }

  useSymbologyScanner(handleSymbol, {  ignoreRepeats: false, scannerOptions: scannerOptions})

  return (
    <Authenticator signUpAttributes={['preferred_username']}>
      {({ }) => (
          <TabBar />


      )}
    </Authenticator>
  );
}

export default App;
