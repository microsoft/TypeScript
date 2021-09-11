//// [inferenceOptionalProperties.ts]
declare function test<T>(x: { [key: string]: T }): T;

declare let x1: { a?: string, b?: number };
declare let x2: { a?: string, b?: number | undefined };

const y1 = test(x1);
const y2 = test(x2);

var v1: Required<{ a?: string, b?: number }>;
var v1: { a: string, b: number };

var v2: Required<{ a?: string, b?: number | undefined }>;
var v2: { a: string, b: number | undefined };

var v3: Partial<{ a: string, b: string }>;
var v3: { a?: string, b?: string };

var v4: Partial<{ a: string, b: string | undefined }>;
var v4: { a?: string, b?: string | undefined };

var v5: Required<Partial<{ a: string, b: string }>>;
var v5: { a: string, b: string };

var v6: Required<Partial<{ a: string, b: string | undefined }>>;
var v6: { a: string, b: string | undefined };


//// [inferenceOptionalProperties.js]
"use strict";
var y1 = test(x1);
var y2 = test(x2);
var v1;
var v1;
var v2;
var v2;
var v3;
var v3;
var v4;
var v4;
var v5;
var v5;
var v6;
var v6;


//// [inferenceOptionalProperties.d.ts]
declare function test<T>(x: {
    [key: string]: T;
}): T;
declare let x1: {
    a?: string;
    b?: number;
};
declare let x2: {
    a?: string;
    b?: number | undefined;
};
declare const y1: string | number;
declare const y2: string | number | undefined;
declare var v1: Required<{
    a?: string;
    b?: number;
}>;
declare var v1: {
    a: string;
    b: number;
};
declare var v2: Required<{
    a?: string;
    b?: number | undefined;
}>;
declare var v2: {
    a: string;
    b: number | undefined;
};
declare var v3: Partial<{
    a: string;
    b: string;
}>;
declare var v3: {
    a?: string;
    b?: string;
};
declare var v4: Partial<{
    a: string;
    b: string | undefined;
}>;
declare var v4: {
    a?: string;
    b?: string | undefined;
};
declare var v5: Required<Partial<{
    a: string;
    b: string;
}>>;
declare var v5: {
    a: string;
    b: string;
};
declare var v6: Required<Partial<{
    a: string;
    b: string | undefined;
}>>;
declare var v6: {
    a: string;
    b: string | undefined;
};
