import { NextApiRequest, NextApiResponse } from 'next';

import PasswordData from '../../types/PasswordData';

function createData(
    id: string,
    resourceName: string,
    resourceLocation: string,
    userName: string,
    password: string
): PasswordData {
    return { id, resourceName, resourceLocation, userName, password };
}

const rows = [
    createData('0001', 'Facebook', 'https://facebook.com', 'user@gmail.com', '1234'),
    createData('0002', 'LinkedIn', 'https://linkedin.com', 'user@gmail.com', '1234'),
    createData('0003', 'Twitter', 'https://twitter.com', 'user@gmail.com', '1234'),
    createData('0004', 'GMail', 'https://mail.google.com', 'user@gmail.com', '1234'),
];

export default (_req: NextApiRequest, res: NextApiResponse) => {
    res.status(200).json(rows);
};
