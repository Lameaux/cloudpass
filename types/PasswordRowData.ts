export default interface PasswordRowData {
    id: string;
    resourceName: string;
    resourceLocation: string | null;
    resourceDescription: string | null;
    userName: string;
    password: string;
    folder: string | null;
}