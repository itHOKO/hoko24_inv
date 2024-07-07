import { Amplify } from 'aws-amplify';
import PersonCreateForm from '../../ui-components/PersonCreateForm';
import outputs from '../../amplify_outputs.json';
import { useEffect, useState } from "react";
import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { Card, Collection, Flex, Grid, Heading, Image,  Badge } from '@aws-amplify/ui-react';
import { UserIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import  formatTimestamp  from '../utils/formatter.ts';


Amplify.configure(outputs);
const client = generateClient<Schema>();

export default function Persons_Page() {



  const [persons, setPersons] = useState<Array<Schema["Person"]["type"]>>([]);



  useEffect(() => {
    client.models.Person.observeQuery().subscribe({
      next: (data) => setPersons([...data.items]),
    });
  }, []);

  return (
    <Flex>


      <PersonCreateForm maxHeight="4rem" marginTop="3.5rem" overrides={{
        SubmitButton: {
          children: 'Erstellen',
        },
        ClearButton:{
          display: 'none',
        },
        role:{
          label: 'Rolle',
        }
      }} />
          <Flex
      marginTop="2rem"
      justifyContent="space-around"
      gap="2rem"
      direction="column">
      <Heading level={5}>Angelegte Mitarbeiter:</Heading>
      <Collection
        items={persons}
        type="list"
        direction="row"
        gap="rem"
        wrap="wrap"
      >
        {(person, index) => (

          <Card key={index} variation="elevated" borderRadius="1rem" minWidth="20%" >
            <Grid
              templateRows="2fr 1fr 1fr "
              rowGap="0.5rem"
            >
              <Flex direction="row" gap="4rem" justifyContent="space-between">
                <Badge variation='info' whiteSpace="nowrap" display="flex" style={{ alignItems: 'center' }} maxHeight="2rem" >{formatTimestamp(person.createdAt)}</Badge>
                <Image src={"https://barcodeapi.org/api/auto/" + person.id} alt={person.name} width="70px" />
              </Flex>
              <Flex alignItems="center" justifyContent="space-between" gap="1rem">
                <Badge><UserIcon height="1.5rem" /></Badge>
                <Heading level={6} >{person.name}</Heading>
              </Flex>
              <Flex alignItems="center" justifyContent="space-between" gap="1rem">
                <Badge><InformationCircleIcon height="1.5rem" /></Badge>
                <Heading level={6} >{person.role}</Heading>
              </Flex>


            </Grid>

          </Card>
        )}
      </Collection>
      </Flex>
    </Flex>
  );
}