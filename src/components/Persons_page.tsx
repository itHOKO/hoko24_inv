import { Amplify } from 'aws-amplify';
import PersonCreateForm from '../../ui-components/PersonCreateForm';
import outputs from '../../amplify_outputs.json';
import { useEffect, useState } from "react";
import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { Card, Collection, Flex, Grid, Heading, Image, Text } from '@aws-amplify/ui-react';
import { useTheme } from '@aws-amplify/ui-react';

Amplify.configure(outputs);
const client = generateClient<Schema>();

export default function Persons_Page() {

  const {tokens} = useTheme();
  const [persons, setPersons] = useState<Array<Schema["Person"]["type"]>>([]);

  useEffect(() => {
    client.models.Person.observeQuery().subscribe({
      next: (data) => setPersons([...data.items]),
    });
  }, []);

  return (
    <Grid
      templateColumns="1fr 4fr">
      <PersonCreateForm />
      <Collection
        items={persons}
        type="list"
        direction="row"
        gap="20px"
        wrap="nowrap"
      >
        {(persons, index) => (
          <Card key={index} backgroundColor={tokens.colors.primary[10]} variation="elevated">
            <Flex direction="column" alignItems="center" gap="1rem">
              <Heading level={5}>{persons.name}</Heading>
              <Image src={"https://barcode.tec-it.com/barcode.ashx?data="+persons.id+"&code=DataMatrix&translate-esc=on&dmsize=Default'"} alt={persons.name} width="70px" />
              <Text>{persons.role}</Text>
              </Flex>

          </Card>
        )}
      </Collection>
    </Grid>
  );
}