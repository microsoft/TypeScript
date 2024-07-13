// @declaration: true
// @target: esnext

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