export type ThisParams = {
  flag: string | undefined;
};

export type UserRoutesErrors = {
  INVALID_DATA: string;
  USER_NOT_EXISTS: string;
  USER_ALREADY_EXISTS: string;
  INCORRECT_PASSWORD: string;
  INVALID_AUTHORIZATION: string;
};

export default (params: ThisParams): UserRoutesErrors => {
  const { flag } = params;
  return {
    INVALID_DATA: `cannot-perform-operation-due-invalid-parameters -> ${flag}`,
    USER_NOT_EXISTS: `user-with-email-(${flag})-cannot-be-found`,
    USER_ALREADY_EXISTS: `user-with-email-(${flag})-already-exist`,
    INCORRECT_PASSWORD: `error-trying-to-login-(${flag})-due-invalid-password`,
    INVALID_AUTHORIZATION: `error-trying-to-login-(${flag})-invalid-request-token-authorization`,
  };
};
