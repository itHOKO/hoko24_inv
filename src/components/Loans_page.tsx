import { Amplify } from 'aws-amplify';
import outputs from '../../amplify_outputs.json';
import { useEffect, useState } from "react";
import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { Card, Collection, Flex, Grid, Heading, Image } from '@aws-amplify/ui-react';
import { useTheme } from '@aws-amplify/ui-react';

Amplify.configure(outputs);
const client = generateClient<Schema>();

export default function Loans_Page() {

  const {tokens} = useTheme();
  const [loans, setLoans] = useState<Array<Schema["Loans"]["type"]>>([]);

  useEffect(() => {
    client.models.Loans.observeQuery().subscribe({
      next: (data) => setLoans([...data.items]),
    });
  }, []);

  return (
    <Grid
      templateColumns="1fr 4fr">
      <Collection
        items={loans}
        type="list"
        direction="row"
        gap="20px"
        wrap="nowrap"
      >
        {(loans, index) => (
          <Card key={index} backgroundColor={tokens.colors.primary[10]} variation="elevated">
            <Flex direction="column" alignItems="center" gap="1rem">
              <Heading level={5}>{loans.person_id}</Heading>
              <Heading level={5}>{loans.tool_id}</Heading>
              <Image src={"https://barcodeapi.org/api/auto/"+loans.id} alt={loans.id} width="70px" />
              </Flex>

          </Card>
        )}
      </Collection>
    </Grid>
  );
}