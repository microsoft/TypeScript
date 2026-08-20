// @target: es2015
declare const f: { (x: string): number, a: "" } & { a: number }
f()
