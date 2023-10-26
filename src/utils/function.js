
import { eventBus } from './eventBus';

export const showErrorMessage = (type,error) => {
  eventBus.emit("toast", {
    type: type,
    message: error,
  });
};
