import { NextApiRequest, NextApiResponse } from 'next';

import FolderRowData from '../../types/FolderRowData';

function createData(
    id: string,
    name: string,
): FolderRowData {
    return { id, name };
}

const rows = [
    createData('0001', 'Private'),
    createData('0002', 'Business'),
];

export default (_req: NextApiRequest, res: NextApiResponse) => {
    res.status(200).json(rows);
};
