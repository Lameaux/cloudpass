import SecretNoteRowData from "./SecretNoteRowData";

export default interface SecretNoteFolderRowData {
    name: string;
    rows: SecretNoteRowData[];
}