import ApiError from './ApiError';

export default interface RegisterApiError extends ApiError {
  email?: string;
  password?: string;
  confirmPassword?: string;
}
