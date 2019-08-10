import { NextApiRequest, NextApiResponse } from 'next';

import PasswordRowData from '../../types/PasswordRowData';

function createData(
    id: string,
    resourceName: string,
    resourceLocation: string,
    userName: string,
    password: string
): PasswordRowData {
    return { id, resourceName, resourceLocation, userName, password };
}

const defaultRows = [
    createData('0001', 'Facebook', 'https://facebook.com', 'user@gmail.com', '1234'),
    createData('0002', 'LinkedIn', 'https://linkedin.com', 'user@gmail.com', '1234'),
    createData('0003', 'Twitter', 'https://twitter.com', 'user@gmail.com', '1234'),
    createData('0004', 'GMail', 'https://mail.google.com', 'user@gmail.com', '1234'),
];

const privateRows = [
    createData('0001', 'Facebook', 'https://facebook.com', 'user@gmail.com', '1234'),
];

const businessRows = [
    createData('0003', 'Twitter', 'https://twitter.com', 'user@gmail.com', '1234'),
    createData('0004', 'GMail', 'https://mail.google.com', 'user@gmail.com', '1234'),
];

const result = [
    {
        name: 'Default',
        rows: defaultRows,
    },
    {
        name: 'Private',
        rows: privateRows,
    },
    {
        name: 'Business',
        rows: businessRows,
    }

];

export default (_req: NextApiRequest, res: NextApiResponse) => {
    res.status(200).json(result);
};
