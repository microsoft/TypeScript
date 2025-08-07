// @strict: true
// @lib: dom,esnext
// @noEmit: true

interface Console {
  log(message?: any, ...optionalParams: any[]): void;
}

let logs: string[] = [];
let originalLog: typeof console.log;
console.log = (...args) => {
  logs.push(...args);
};
