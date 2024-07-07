import { Amplify } from 'aws-amplify';
import ToolsCreateForm from '../../ui-components/ToolsCreateForm';
import outputs from '../../amplify_outputs.json';
import { useEffect, useState } from "react";
import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { Card, Collection, Flex, Grid, Heading, Image, Badge } from '@aws-amplify/ui-react';
import { WrenchScrewdriverIcon, InformationCircleIcon, MapPinIcon } from "@heroicons/react/24/outline";
import  formatTimestamp  from '../utils/formatter.ts';

Amplify.configure(outputs);
const client = generateClient<Schema>();

export default function Tools_Page() {

  const [tools, setTools] = useState<Array<Schema["Tools"]["type"]>>([]);

  useEffect(() => {
    client.models.Tools.observeQuery().subscribe({
      next: (data) => setTools([...data.items]),
    });
  }, []);




  return (
    <Flex>
      <ToolsCreateForm maxHeight="4rem" marginTop="3.5rem" overrides={{
        SubmitButton: {
          children: 'Erstellen',
        },
        ClearButton:{
          display: 'none',
        },
        description:{
          label: 'Beschreibung',
        }
      }} />
                <Flex
      marginTop="2rem"
      justifyContent="space-around"
      gap="2rem"
      direction="column">
      <Heading level={5}>Angelegte Werkzeuge:</Heading>
      <Collection
        items={tools}
        type="list"
        direction="row"
        gap="rem"
        wrap="wrap"
      >
        {(tool, index) => (

          <Card key={index} variation="elevated" borderRadius="1rem" minWidth="20%" >
            <Grid
              templateRows="2fr 1fr 1fr 1fr "
              rowGap="0.5rem"
            >
              <Flex direction="row" gap="4rem" justifyContent="space-between">
                <Badge variation='info' whiteSpace="nowrap" display="flex" style={{ alignItems: 'center' }} maxHeight="2rem" >{formatTimestamp(tool.createdAt)}</Badge>
                <Image src={"https://barcodeapi.org/api/auto/" + tool.id} alt={tool.name} width="70px" />
              </Flex>

              <Flex alignItems="center" justifyContent="space-between" gap="2rem">
                <Badge><WrenchScrewdriverIcon height="1.5rem" /></Badge>
                <Heading level={6} >{tool.name}</Heading>
              </Flex>
              <Flex alignItems="center" justifyContent="space-between" gap="2rem">
                <Badge><InformationCircleIcon height="1.5rem" /></Badge>
                <Heading level={6} >{tool.description}</Heading>
              </Flex>
              <Flex alignItems="center" justifyContent="space-between" gap="2rem">
                <Badge><MapPinIcon height="1.5rem" /></Badge>
                <Heading level={6} >{tool.position}</Heading>
              </Flex>


            </Grid>

          </Card>
        )}
      </Collection>
      </Flex>
    </Flex>
  );
}