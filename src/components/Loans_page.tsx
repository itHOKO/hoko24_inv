import { Amplify } from 'aws-amplify';
import outputs from '../../amplify_outputs.json';
import { useEffect, useState } from "react";
import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { Card, Collection, Flex, Grid, Heading, Badge, Divider } from '@aws-amplify/ui-react';
import { CheckBadgeIcon, UserGroupIcon, WrenchScrewdriverIcon, UserIcon } from "@heroicons/react/24/outline";
import  formatTimestamp  from '../utils/formatter.ts';

Amplify.configure(outputs);
const client = generateClient<Schema>();

export default function Loans_Page() {

  const [loanListDone, setLoanListDone] = useState<Array<{ id: string; createdAt: string; returned: boolean; tool: { name: string; }; person: { name: string; }; }>>([]);
  const [loanListOpen, setLoanListOpen] = useState<Array<{ id: string; createdAt: string; returned: boolean; tool: { name: string; }; person: { name: string; }; }>>([]);


  async function deleteOne(id: string) {
    await client.models.Loans.delete({id} );
  }

  useEffect(() => {
    async function getLoanListDone() {
      const { data: loans } = await client.models.Loans.list(
        {
          filter: { returned: { eq: true } },
          selectionSet: ["id", "returned", "createdAt", "tool.name", "person.name"]
        }
      );
      loans.sort((a, b) => a.createdAt > b.createdAt ? -1 : 1);
      setLoanListDone(loans);
    }
    async function getLoanListOpen() {
      const { data: loans } = await client.models.Loans.list(
        { 
          filter: { returned: { eq: false } },
          selectionSet: ["id", "returned", "createdAt", "tool.name", "person.name"] 
        }
      );
      loans.sort((a, b) => a.createdAt > b.createdAt ? -1 : 1);
      setLoanListOpen(loans);
    }
    client.models.Loans.observeQuery().subscribe({
      next: () => { getLoanListOpen(); getLoanListDone() },
    });
  }, []);

  function loanCollection (loanList: Array<{ id: string; createdAt: string; returned: boolean; tool: { name: string; }; person: { name: string; }; }>) {
    if (loanList.length == 0) {
      return (
        <Heading level={6}>Keine Ergebnisse</Heading>
      )
    }
    else{
      return (
        <Collection
          items={loanList}
          type="list"
          direction="row"
          gap="20px"
        >
          {(loan, index) => (
            <Card key={index} variation="elevated" borderRadius="1rem" onClick={() => deleteOne(loan.id)}>
              <Grid
                templateRows="1fr 1fr 1fr"
                rowGap="0.5rem"
              >
                <Flex direction="row" gap="4rem">
                  <Badge variation='info' whiteSpace="nowrap" display="flex" style={{ alignItems: 'center' }}  >{formatTimestamp(loan.createdAt)}</Badge>
  
                  <Badge variation={loan.returned ? "success" : "warning"}>{loan.returned ? <CheckBadgeIcon height="1.5rem" /> : <UserGroupIcon height="1.5rem" />}</Badge>
                </Flex>
                <Flex alignItems="center" justifyContent="space-between" gap="2rem">
                  <Badge><UserIcon height="1.5rem" /></Badge>
                  <Heading level={6} >{loan.person.name}</Heading>
                </Flex>
                <Flex alignItems="center" justifyContent="space-between" gap="2rem">
                  <Badge><WrenchScrewdriverIcon height="1.5rem" /></Badge>
                  <Heading level={6}>{loan.tool.name}</Heading>
                </Flex>
  
  
              </Grid>
  
            </Card>
          )}
        </Collection>
      )
    }
    
  }

  return (
    <Flex
      marginTop="2rem"
      justifyContent="space-around"
      direction="column">
      <Flex direction="column" gap="2rem">
      <Heading level={5}>Offene Transaktionen:</Heading>
      {loanCollection(loanListOpen)}
      </Flex>
      <Divider label="Abgeschlossene Transaktionen"  marginTop="2rem" />
      {loanCollection(loanListDone)}
    </Flex>
  );
}