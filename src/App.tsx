import { Authenticator, Flex, Heading, Image, Text } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import { Amplify } from "aws-amplify";
import outputs from '../amplify_outputs.json';
import { TabBar } from './components/TabBar.tsx';
import { useSymbologyScanner } from '@use-symbology-scanner/react';
import { Symbology } from '@use-symbology-scanner/core';
import { useState } from 'react';
import Snackbar from '@mui/joy/Snackbar';
import { ExclamationTriangleIcon, CheckCircleIcon, HeartIcon } from "@heroicons/react/24/outline";
import { generateClient } from 'aws-amplify/data';
import type { Schema } from "../amplify/data/resource";
import evewmlogo from './assets/Logo_evewm.svg';
import { I18n } from 'aws-amplify/utils';
import { translations } from '@aws-amplify/ui-react';
I18n.putVocabularies(translations);
I18n.setLanguage('de');

Amplify.configure(outputs);
const client = generateClient<Schema>();

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
  const [loanCreateShow, setLoanCreateShow] = useState<boolean>(false);
  const [loanUpdateShow, setLoanUpdateShow] = useState<boolean>(false);


  let barcodeScan = "";

  function processScans(scannedData: string) {
    if (barcodeScan.localeCompare("") === 0) {
      //console.log('Scan processed');
      barcodeScan = scannedData;
    } else {
      //console.log('First Code'+barcodeScan);
      //console.log('Second Code'+scannedData);
      //console.log('Scan else');
      insertScan(scannedData, barcodeScan);
      // Clean UP so that two barcodes can be scanned again
      barcodeScan = "";
    }
  }

  async function checkScan(barcode: string, barcode2: string) {
    try {
      const { data: tools } = await client.models.Tools.get(
        { id: barcode }
      );
      console.log(tools);
      const { data: person } = await client.models.Person.get(
        { id: barcode2 }
      );
      console.log(person);
      return {
        person: person,
        tool: tools
      }
    } catch (error) {
      console.log("Not a tool");
      try {
        const { data: person } = await client.models.Person.get(
          { id: barcode }
        );
        console.log(person);
        const { data: tools } = await client.models.Tools.get(
          { id: barcode2 }
        );
        console.log(tools);
        return {
          person: person,
          tool: tools
        }
      } catch (error) {
        console.log("Not a person");
        return {
          person: null,
          tool: null
        }
      }
    }
  }

  async function checkIfLoanExists(person: string, tool: string) {
    const { data: loans } = await client.models.Loans.list(
      { filter: { person_id: { eq: person }, and: { tool_id: { eq: tool }, and: { returned: { eq: false } } } } }
    );
    console.log(loans);
    return { loans: loans };
  }

  async function insertScan(barcode: string, barcode2: string) {
    const result = await checkScan(barcode, barcode2);
    if (result.person && result.tool) {
      let loans = (await checkIfLoanExists(result.person.id, result.tool.id)).loans
      if (loans.length > 0) {
        //console.log("Loan already exists");
        await client.models.Loans.update({
          id: loans[0].id,
          returned: true,
        });
        setLoanUpdateShow(true);
      } else {
        //console.log("Loan doesn't exist yet");
        await client.models.Loans.create({
          returned: false,
          tool_id: result.tool.id,
          person_id: result.person.id
        });
        setLoanCreateShow(true);
      }
    } else {
      //console.log("Not a valid scan");
    }
  }


  function handleSymbol(symbol: string, matchedSymbologies: string[]) {

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

  const loanUpdateSnackBar = (
    <Snackbar
      autoHideDuration={1500}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      color="success"
      variant="solid"
      startDecorator={<CheckCircleIcon height="1.5rem" />}
      open={loanUpdateShow}
      onClose={() => {
        setLoanUpdateShow(false);
      }}
    >
      Werkzeug wurde erfolgreich zurückgegeben</Snackbar>
  );

  const loanCreateSnackBar = (
    <Snackbar
      autoHideDuration={1500}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      color="success"
      variant="solid"
      startDecorator={<CheckCircleIcon height="1.5rem" />}
      open={loanCreateShow}
      onClose={() => {
        setLoanCreateShow(false);
      }}
    >
      Ausleihe wurde erfolgreich erfasst</Snackbar>
  );


  useSymbologyScanner(handleSymbol, { ignoreRepeats: true, scannerOptions: scannerOptions, symbologies: [toolSymbology, errorSymbology]})


  //Make Authenticator look nicer
  const components = {
    Header() {

      return (
        <Flex direction="row" justifyContent="center" alignItems="center" marginBottom="2rem">
          <Image
            alt="EVE WM Logo logo"
            src={evewmlogo}
            width="150px"
          />
          <Heading textAlign="center" level={4}>Herzlich Wilkommen bei EVE WM</Heading>
        </Flex>
      );
    },
    Footer() {
      return (
        <Flex textAlign="center" justifyContent="center" alignItems="center" marginTop="0.5rem" gap="0.2rem">
          <Text fontSize="12px" >Made in Munich with love</Text><HeartIcon height="1rem" color='red' />
        </Flex>
      )
    }
  }
  

  return (
    <Authenticator signUpAttributes={['preferred_username']} components={components} >
      {({ }) => (
        <div>
          <TabBar />
          {successSnackBar}
          {errorSnackBar}
          {loanCreateSnackBar}
          {loanUpdateSnackBar}

        </div>
      )
      }
    </Authenticator>
  );
}

export default App;