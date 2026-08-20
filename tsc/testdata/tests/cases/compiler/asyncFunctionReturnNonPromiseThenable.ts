// @strict: true
// @target: esnext

export interface MyThenable {
    then(): void;
}

export async function foo(): MyThenable {
    return {
        then() {
        }
    };
}
