// @noEmit: true
// @target: esnext

function return1(x: boolean): 3 {
    return (x ? (1) : 2);
}

declare function getAny(): any;

function return2(x: string): string {
    return x.startsWith("a") ? getAny() : 1;
}

function return3(x: string): string {
    return x.startsWith("a") ? "a" : x;
}

function return4(x: string): string {
    return (x.startsWith("a") ? getAny() : 1) as string;
}

const return5 = (x: string): string => x.startsWith("a") ? getAny() : 1;

const return6 = (x: string): string => (x.startsWith("a") ? getAny() : 1) as string;