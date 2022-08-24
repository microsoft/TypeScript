// @filename: file1.ts
// @ts-noImplicitReturns
export function f1(): string | undefined {
    if (!!f1) {
        return "";
    }
}

// @filename: file2.ts
// @ts-noImplicitReturns true
export function f1(): string | undefined {
    if (!!f1) {
        return "";
    }
}

// @filename: file3.ts
// @ts-noImplicitReturns false
export function f1(): string | undefined {
    if (!!f1) {
        return "";
    }
}

// @filename: file4.ts
export function f1(): string | undefined {
    if (!!f1) {
        return "";
    }
}