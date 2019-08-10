import React from 'react';
import { NextPage } from 'next';
import FloatingAddButton from '../components/FloatingAddButton';
import { Typography } from '@material-ui/core';
import PasswordTable from '../components/PasswordTable';
import fetch from 'isomorphic-unfetch';
import { SERVER } from "../config";

import PasswordData from '../types/PasswordData';

const handleAddButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log('Clicked');
};

const Passwords: NextPage<{ passwords: PasswordData[] }> = ({ passwords }) => (
    <div>
        <Typography variant="h4" component="h1" gutterBottom>
            Passwords
        </Typography>

        <PasswordTable rows={passwords} />

        <FloatingAddButton title="Add Password" onClick={handleAddButtonClick} />
    </div>
)

Passwords.getInitialProps = async function () {
    //const passwords: PasswordData[] = [];

    const res = await fetch(`${SERVER}/api/passwords`);
    const passwords = await res.json();

    return { passwords };
}

export default Passwords;
