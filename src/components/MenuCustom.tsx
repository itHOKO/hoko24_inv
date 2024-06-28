import {   fetchUserAttributes, signOut } from "aws-amplify/auth";
import {  Divider, MenuItem, Menu, Flex } from '@aws-amplify/ui-react';
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import outputs from '../../amplify_outputs.json';
import { Amplify } from "aws-amplify";
import { useState, useEffect } from 'react';

Amplify.configure(outputs);




function MenuCustom() {

    const [username, setUsername] = useState("User is not logged in.");

    useEffect(() => {
        async function fetchAttributes(){
            try{
                const userAttributes =  await fetchUserAttributes();
                if(userAttributes.preferred_username !== undefined)
                setUsername(userAttributes.preferred_username);
            }catch(e){
                console.log(e);
            }
        }
        fetchAttributes();
    },[])


    
    return (
        <Menu menuAlign="end">
        <MenuItem  onClick={() => signOut()} title="Logout" ><Flex alignItems="center" justifyContent="flex-end"><ArrowRightStartOnRectangleIcon height="2rem"/>{username} </Flex></MenuItem>
        <Divider />
        <MenuItem>Option 2</MenuItem>
        <MenuItem>Option 3</MenuItem>

      </Menu>

    )
}

export default MenuCustom;