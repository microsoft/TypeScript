//// [destructureOptionalParameter.ts]

declare function f1({ a, b }?: { a: number, b: string }): void;

function f2({ a, b }: { a: number, b: number } = { a: 0, b: 0 }) {
    a;
    b;
}

// Repro from #8681

interface Type { t: void }
interface QueryMetadata { q: void }

interface QueryMetadataFactory {
    (selector: Type | string, {descendants, read}?: {
        descendants?: boolean;
        read?: any;
    }): ParameterDecorator;
    new (selector: Type | string, {descendants, read}?: {
        descendants?: boolean;
        read?: any;
    }): QueryMetadata;
}


//// [destructureOptionalParameter.js]
function f2(_a) {
    var _b = _a === void 0 ? { a: 0, b: 0 } : _a, a = _b.a, b = _b.b;
    a;
    b;
}


//// [destructureOptionalParameter.d.ts]
declare function f1({a, b}?: {
    a: number;
    b: string;
} | undefined): void;
declare function f2({a, b}?: {
    a: number;
    b: number;
} | undefined): void;
interface Type {
    t: void;
}
interface QueryMetadata {
    q: void;
}
interface QueryMetadataFactory {
    (selector: Type | string, {descendants, read}?: {
        descendants?: boolean | undefined;
        read?: any;
    } | undefined): ParameterDecorator;
    new (selector: Type | string, {descendants, read}?: {
        descendants?: boolean | undefined;
        read?: any;
    } | undefined): QueryMetadata;
}
