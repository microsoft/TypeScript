//// [declarationAsyncAndGeneratorFunctions.ts] ////
export async function asyncFn() {
    return {} as Promise<void>
}

export async function asyncFn2() {
    return {} as number
}

export async function asyncFn3() {
    return (await 42) as number;
  }

export function* generatorFn() {
    return {} as number
}

export async function* asyncGeneratorFn() {
    return {} as number
}
//// [declarationAsyncAndGeneratorFunctions.js] ////
export async function asyncFn() {
    return {};
}
export async function asyncFn2() {
    return {};
}
export async function asyncFn3() {
    return (await 42);
}
export function* generatorFn() {
    return {};
}
export async function* asyncGeneratorFn() {
    return {};
}
