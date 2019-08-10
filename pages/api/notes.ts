import { NextApiRequest, NextApiResponse } from 'next';

import SecretNoteRowData from '../../types/SecretNoteRowData';

function createData(
    id: string,
    name: string,
    content: string,
): SecretNoteRowData {
    return { id, name, content };
}

const defaultRows = [
    createData('0001', 'Office Alarm', '1234'),
    createData('0002', 'Internet Banking', 'login: 1234'),
];

const privateRows = [
    createData('0002', 'Internet Banking', 'login: 1234'),
];

const result = [
    {
        name: 'Default',
        rows: defaultRows,
    },
    {
        name: 'Private',
        rows: privateRows,
    }
];

export default (_req: NextApiRequest, res: NextApiResponse) => {
    res.status(200).json(result);
};
