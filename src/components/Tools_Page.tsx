import { Amplify } from 'aws-amplify';
import ToolsCreateForm from '../../ui-components/ToolsCreateForm';
import outputs from '../../amplify_outputs.json';
import { useEffect, useState } from "react";
import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { Card, Collection, Flex, Grid, Heading, Image, Text } from '@aws-amplify/ui-react';
import { useTheme } from '@aws-amplify/ui-react';

Amplify.configure(outputs);
const client = generateClient<Schema>();

export default function Tools_Page() {

  const {tokens} = useTheme();
  const [tools, setTools] = useState<Array<Schema["Tools"]["type"]>>([]);

  useEffect(() => {
    client.models.Tools.observeQuery().subscribe({
      next: (data) => setTools([...data.items]),
    });
  }, []);

  return (
    <Grid
      templateColumns="1fr 4fr">
      <ToolsCreateForm />
      <Collection
        items={tools}
        type="list"
        direction="column"
        gap="20px"
        wrap="nowrap"
      >
        {(tool, index) => (
          <Card key={index} backgroundColor={tokens.colors.secondary[10]} variation="elevated">
            <Flex direction="column" alignItems="center" gap="1rem">
              <Heading level={5}>{tool.name}</Heading>
              <Image src={"https://barcodeapi.org/api/auto/"+tool.id} alt={tool.name} width="70px" />
              <Text>{tool.id}</Text>
              </Flex>

          </Card>
        )}
      </Collection>
    </Grid>
  );
}