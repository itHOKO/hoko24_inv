import {  Tabs, Image, Grid } from '@aws-amplify/ui-react';
import hokoLogo from '../assets/HOKO Logo Dunkelblau(0,97,147).png';
import MenuCustom from './MenuCustom';
import Inv_Form from './Tools_Page';



export const TabBar = () => (


    <Tabs.Container defaultValue="2" >
      <Grid
        columnGap="2rem"
        rowGap="0.5rem"
        templateColumns="0.5fr 5fr 0.5fr">
        <Image src={hokoLogo} alt="HOKO Logo" width="100px" />
        <Tabs.List spacing="equal">

          <Tabs.Item value="1">Overview</Tabs.Item>
          <Tabs.Item value="2">Ausagben</Tabs.Item>
          <Tabs.Item value="3">Inventar</Tabs.Item>
          <Tabs.Item value="4">Helfer</Tabs.Item>
        </Tabs.List>
        <MenuCustom  />

        <Tabs.Panel value="1">Content of the first tab</Tabs.Panel>
        <Tabs.Panel value="2">Content of the second tab</Tabs.Panel>
        <Tabs.Panel value="3"><Inv_Form/></Tabs.Panel>
        <Tabs.Panel value="4">Content of the fourth tab</Tabs.Panel>
      </Grid>
    </Tabs.Container>


);