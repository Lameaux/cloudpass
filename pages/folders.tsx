import React from 'react';
import { NextPage } from 'next';
import FloatingAddButton from '../components/FloatingAddButton';
import { Typography } from '@material-ui/core';

const handleAddButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log('Clicked');
};

const Folders: NextPage<{}> = () => (
    <div>
        <Typography variant="h4" component="h1" gutterBottom>
            Folders
        </Typography>

        <FloatingAddButton title="Add Folder" onClick={handleAddButtonClick} />
    </div>
)

export default Folders;
