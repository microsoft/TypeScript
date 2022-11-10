function callee(n: number | undefined, m: string) { }

function caller(arg: (n?: number) => void) { }

caller(callee);
