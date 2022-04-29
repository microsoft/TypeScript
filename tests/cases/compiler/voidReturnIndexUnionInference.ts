// @strict: true
// repro from https://github.com/Microsoft/TypeScript/issues/25274
export function safeInvoke<A1, R>(
    func: ((arg1: A1) => R) | null | undefined,
    arg1: A1
): R | undefined {
    if (func) {
        return func(arg1);
    } else {
        return undefined;
    }
}

interface Props {
    onFoo?(value: string): boolean;
    onBar?(value: string): void;
}

function bad<P extends Props>(props: Readonly<P>) {
    safeInvoke(props.onFoo, "blah");
    // ERROR HERE!!!
    // Type R in signature of safeInvoke incorrectly inferred as {} instead of void!
    safeInvoke(props.onBar, "blah");
}
