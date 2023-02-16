import toast from 'react-hot-toast';

const DEFAULT_POSITION = "bottom-center";

export const notifySuccess = (successMess, POSITION = DEFAULT_POSITION) => toast.success(successMess, {position: POSITION});
export const notifyError = (errorMess, POSITION = DEFAULT_POSITION) => toast.error(errorMess, {position: POSITION});
