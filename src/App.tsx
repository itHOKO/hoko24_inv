import { Authenticator, } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import { Amplify } from "aws-amplify";
import outputs from '../amplify_outputs.json';
import { TabBar } from './components/TabBar.tsx';
import { useSymbologyScanner } from '@use-symbology-scanner/react';
import { Symbology } from '@use-symbology-scanner/core';
import { useState } from 'react';
import Snackbar from '@mui/joy/Snackbar';
import { ExclamationTriangleIcon, CheckCircleIcon } from "@heroicons/react/24/outline";





Amplify.configure(outputs);

//const userAttributes = await fetchUserAttributes();

function App() {

  //Scanner Settings and Symbologies for mathching the scanned barcode 
  const scannerOptions = {
    prefix: '',
    suffix: '\n',
    maxDelay: 120,
  }
  const toolSymbology = new Symbology({
    name: 'Correct Scan',
    allowedCharacters: '[\x00-\x7F]',
    minLength: 36,
    maxLength: 36
  })
  const errorSymbology = new Symbology({
    name: 'Error',
    allowedCharacters: '[\x00-\x7F]',
    minLength: 1,
    maxLength: 35
  })

  const [successShow, setSuccessShow] = useState<boolean>(false);
  const [errorShow, setErrorShow] = useState<boolean>(false);

  let barcodeScann = "";

function processScans (scannedData: string) {
  if (barcodeScann.localeCompare("") === 0) {
    console.log('Scan processed');
    barcodeScann = scannedData;
  }else{
    //console.log('First Code'+barcodeScan);
    //console.log('Second Code'+scannedData);
    console.log('Scan else');
  }
}

  function handleSymbol  (symbol: string, matchedSymbologies: string[])  {

    if (matchedSymbologies.includes('Error')) {
      setSuccessShow(false);
      setErrorShow(true);


    } else {
      setErrorShow(false);
      setSuccessShow(true);
      processScans(symbol);

    }

  }

  const successSnackBar = (
    <Snackbar
      autoHideDuration={1500}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      startDecorator={<CheckCircleIcon height="1.5rem" />}
      color="success"
      variant="solid"
      open={successShow}
      onClose={() => {
        setSuccessShow(false);
      }}
    >Scan correct. Scan next Code </Snackbar>
  );

  const errorSnackBar = (
    <Snackbar
      autoHideDuration={1500}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      color="warning"
      variant="solid"
      startDecorator={<ExclamationTriangleIcon height="1.5rem" />}
      open={errorShow}
      onClose={() => {
        setErrorShow(false);
      }}
    >
      Scan didn't work correctly. Please scan again</Snackbar>
  );


  useSymbologyScanner(handleSymbol, { ignoreRepeats: true, scannerOptions: scannerOptions, symbologies: [toolSymbology, errorSymbology] })

  return (
    <Authenticator signUpAttributes={['preferred_username']}>
      {({ }) => (
        <div>
          <TabBar />
          {successSnackBar}
          {errorSnackBar}


        </div>
      )
      }
    </Authenticator >
  );
}

export default App;