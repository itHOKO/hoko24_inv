import {  signOut } from "aws-amplify/auth";
import {  Divider, MenuItem, Menu, Flex } from '@aws-amplify/ui-react';
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import outputs from '../../amplify_outputs.json';
import { Amplify } from "aws-amplify";

Amplify.configure(outputs);



function MenuCustom() {
    return (
        <Menu menuAlign="end">
        <MenuItem  onClick={() => signOut()} title="Logout" ><Flex alignItems="center" justifyContent="flex-end"><ArrowRightStartOnRectangleIcon height="2rem"/> </Flex></MenuItem>
        <Divider />
        <MenuItem>Option 2</MenuItem>
        <MenuItem>Option 3</MenuItem>

      </Menu>

    )
}

export default MenuCustom;