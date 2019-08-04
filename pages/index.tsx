import React from 'react';
import { NextPage } from 'next';
import FloatingAddButton from '../components/FloatingAddButton';
import { Typography } from '@material-ui/core';
import PasswordTable from '../components/PasswordTable';

const handleAddButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log('Clicked');
};

const Home: NextPage<{ userAgent: string }> = () => (
    <div>
        <Typography variant="h4" component="h1" gutterBottom>
            Passwords
        </Typography>
        
        <PasswordTable />

        <FloatingAddButton title="Add Password" onClick={handleAddButtonClick} />
    </div>
)

export default Home;
