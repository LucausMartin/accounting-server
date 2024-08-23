import { v4 as uuidv4 } from 'uuid';

export const formatResponse = (
  code: number,
  message: string,
  data: { [key: string]: unknown } | string,
) => {
  return {
    code,
    message,
    data,
  };
};

function generateUUID() {
  return uuidv4();
}

export default generateUUID;
