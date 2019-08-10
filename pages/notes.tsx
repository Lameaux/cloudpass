import React from 'react';
import { NextPage } from 'next';
import FloatingAddButton from '../components/FloatingAddButton';
import { Typography } from '@material-ui/core';

const handleAddButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log('Clicked');
};

const Notes: NextPage<{}> = () => (
    <div>
        <Typography variant="h4" component="h1" gutterBottom>
            Secret Notes
        </Typography>

        <FloatingAddButton title="Add Secret Note" onClick={handleAddButtonClick} />
    </div>
)

export default Notes;
