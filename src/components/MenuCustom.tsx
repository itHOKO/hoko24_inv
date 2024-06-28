import {  FetchUserAttributesOutput, fetchUserAttributes, signOut } from "aws-amplify/auth";
import {  Divider, MenuItem, Menu, Flex } from '@aws-amplify/ui-react';
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import outputs from '../../amplify_outputs.json';
import { Amplify } from "aws-amplify";

Amplify.configure(outputs);
let userAttributes : FetchUserAttributesOutput;
try{
    userAttributes = await fetchUserAttributes();

}catch(e){
    //console.log(e);
}



function MenuCustom() {

    function getUsername(){
        if(userAttributes.preferred_username !== undefined){
            return userAttributes.preferred_username;
        }
        else{
            return "User is not logged in";
        }
    }
    
    return (
        <Menu menuAlign="end">
        <MenuItem  onClick={() => signOut()} title="Logout" ><Flex alignItems="center" justifyContent="flex-end"><ArrowRightStartOnRectangleIcon height="2rem"/>{getUsername()} </Flex></MenuItem>
        <Divider />
        <MenuItem>Option 2</MenuItem>
        <MenuItem>Option 3</MenuItem>

      </Menu>

    )
}

export default MenuCustom;