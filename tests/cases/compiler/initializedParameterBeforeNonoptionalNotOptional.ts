// @strict: true
// @filename: index.d.ts
export declare function foo({a}?: {
    a?: string;
}): void;
export declare function foo2({a}: {
    a?: string | undefined;
} | undefined, b: string): void;
export declare function foo3({a, b: {c}}: {
    a?: string | undefined;
    b?: {c?: string | undefined;} | undefined;
} | undefined, b: string): void;