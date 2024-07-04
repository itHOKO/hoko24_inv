import {  Tabs, Image, Grid } from '@aws-amplify/ui-react';
import hokoLogo from '../assets/HOKO Logo Dunkelblau(0,97,147).png';
import MenuCustom from './MenuCustom';
import Tools_Page from './Tools_Page';
import Persons_Page from './Persons_page';
import Loans_Page from './Loans_page';


export const TabBar = () => (


    <Tabs.Container defaultValue="3" >
      <Grid
        columnGap="2rem"
        rowGap="0.5rem"
        templateColumns="0.5fr 5fr 0.5fr">
        <Image src={hokoLogo} alt="HOKO Logo" width="100px" />
        <Tabs.List spacing="equal">

          <Tabs.Item value="1">Overview</Tabs.Item>
          <Tabs.Item value="2">Ausagben</Tabs.Item>
          <Tabs.Item value="3">Werkzeuge</Tabs.Item>
          <Tabs.Item value="4">Helfer</Tabs.Item>
        </Tabs.List>
        <MenuCustom  />
      </Grid>
      <Tabs.Panel value="1">Content of the first tab</Tabs.Panel>
        <Tabs.Panel value="2"><Loans_Page/></Tabs.Panel>
        <Tabs.Panel value="3"><Tools_Page/></Tabs.Panel>
        <Tabs.Panel value="4"><Persons_Page/></Tabs.Panel>
    </Tabs.Container>


);