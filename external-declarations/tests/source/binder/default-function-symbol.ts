export default function foo(): typeof foo {
    return foo;
}

export const instance: typeof foo = foo;