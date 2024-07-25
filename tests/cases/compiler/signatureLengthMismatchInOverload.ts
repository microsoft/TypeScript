function f(callback: (arg: string, arg2: string) => void): void;
function f(callback: (arg: number) => void): void;
function f(callback: unknown) { }

f((arg: number, arg2: number) => {});
