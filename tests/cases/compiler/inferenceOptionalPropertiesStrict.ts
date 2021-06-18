// @strict: true
// @exactOptionalPropertyTypes: true
// @declaration: true

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
