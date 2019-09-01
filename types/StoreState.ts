import FolderRowData from './FolderRowData';
import PasswordRowData from './PasswordRowData';
import SecretNoteRowData from './SecretNoteRowData';

export interface StoreState {
    email: string | null,
    jwt: string | null,
    folders: Array<FolderRowData>,
    passwords: Array<PasswordRowData>,
    secretNotes: Array<SecretNoteRowData>,
}
