//

export default function debounce() {
  let timeoutId: ReturnType<typeof setTimeout>;
  return {
    schedule: (fn: Function, ms = 300) => {
      return function (this: any, ...args: any[]) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), ms);
      };
    },
    clear: () => {
      clearTimeout(timeoutId);
    },
  };
}
