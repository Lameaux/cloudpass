import { NextApiRequest, NextApiResponse } from 'next';

import PasswordRowData from '../../types/PasswordRowData';
import SecretNoteRowData from '../../types/SecretNoteRowData';
import FolderRowData from '../../types/FolderRowData';

function createFolder(id, name, description): FolderRowData {
    return { id, name, description };
};

function createSecretNote(id, name, content): SecretNoteRowData {
    return { id, name, content, folder: null };
};

function createPassword(id, resourceName, resourceLocation, userName, password): PasswordRowData {
    return {
        id,
        resourceName,
        resourceLocation,
        resourceDescription: null,
        userName,
        password,
        folder: null,
    };
};

const result: { folders: FolderRowData[], passwords: PasswordRowData[], secretNotes: SecretNoteRowData[] } = {
    folders: [
        createFolder('private', 'Private', 'Empty Folder'),
        createFolder('business', 'Business', 'Empty Folder'),
        createFolder('dev', 'Development', 'Empty Folder'),
        createFolder('family', 'Family', 'Empty Folder'),
        createFolder('dev1', 'Development 1', 'Empty Folder'),
        createFolder('family1', 'Family 1', 'Empty Folder'),
        createFolder('dev2', 'Development 2', 'Empty Folder'),
        createFolder('family2', 'Family 2', 'Empty Folder'),
    ],
    passwords: [
        createPassword('0001', 'Facebook', 'https://facebook.com', 'user@gmail.com', '1234'),
        createPassword('0002', 'LinkedIn', 'https://linkedin.com', 'user@gmail.com', '1234'),
        createPassword('0003', 'Twitter', 'https://twitter.com', 'user@gmail.com', '1234'),
        createPassword('0004', 'GMail', 'https://mail.google.com', 'user@gmail.com', '1234'),
    ],
    secretNotes: [
        createSecretNote('0001', 'Office Alarm', '1234'),
        createSecretNote('0002', 'Internet Banking', 'login: 1234'),
    ],
};

export default (_req: NextApiRequest, res: NextApiResponse) => {
    res.status(200).json(result);
};
