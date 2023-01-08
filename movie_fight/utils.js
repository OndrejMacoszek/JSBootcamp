/* DEBOUNCING of the input,prevents spam of API request when typing into search field, it will wait until timeout is reached and the call the API, if meanwhile user change the input it will cancel timeout and start over */

const debounce = (func, delay = 1000) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};
