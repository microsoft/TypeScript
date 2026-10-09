package fourslash_test

import (
	"strconv"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/diagnostics"
	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/locale"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsutil"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCodeFixAddMissingProperties10(t *testing.T) {
	t.Parallel()
	for i, test := range []struct {
		content     string
		result      string
		filename    string
		fullFile    bool
		preferences *lsutil.UserPreferences
	}{
		{
			content: `// @strict: false
interface Foo {
    a: number;
    b: string;
    c: 1;
    d: "d";
    e: "e1" | "e2";
    f(x: number, y: number): void;
    g: (x: number, y: number) => void;
    h: number[];
    i: bigint;
    j: undefined | "special-string";
    k: ` + "`" + `--${string}` + "`" + `;
}
const foo: Foo = [|{}|];`,
			result: `{
    a: 0,
    b: "",
    c: 1,
    d: "d",
    e: "e1",
    f: function(x: number, y: number): void {
        throw new Error("Function not implemented.");
    },
    g: function(x: number, y: number): void {
        throw new Error("Function not implemented.");
    },
    h: [],
    i: 0n,
    j: "special-string",
    k: ""
}`,
		},
		{
			content: `interface Foo {
    a: number;
    b: string;
    c: any;
}
class C {
    public c: Foo = [|{}|];
}`,
			result: `{
        a: 0,
        b: "",
        c: undefined
    }`,
		},
		{
			content: `interface Foo {
    a: number;
    b: string;
}
function fn(foo: Foo = [|{}|]) {
}`,
			result: `{
    a: 0,
    b: ""
}`,
		},
		{
			content: `interface Foo {
    a: number;
    b: string;
}
const foo: Foo = [|{ a: 10 }|];`,
			result: `{
    a: 10,
    b: ""
}`,
		},
		{
			content: `type T = {
    a: null;
}

const foo: T = [|{}|];`,
			result: `{
    a: null
}`,
		},
		{
			content: `// @strict: false
interface I {
    x: number;
    y: number;
}
class C {
    public p: number;
    m(x: number, y: I) {}
}
const foo: C = [|{}|];`,
			result: `{
    p: 0,
    m: function(x: number, y: I): void {
        throw new Error("Function not implemented.");
    }
}`,
		},
		{
			content: `enum E1 {
    A, B
}
enum E2 {
    A
}
enum E3 {
}
interface I {
    x: E1;
    y: E2;
    z: E3;
}
const foo: I = [|{}|];`,
			result: `{
    x: E1.A,
    y: E2.A,
    z: 0
}`,
		},
		{
			content: `class A {
    constructor() {}
}

abstract class B {}

class C {
   constructor(a: string, b: number, c: A) {}
}

interface I {
    a: A;
    b: B;
    c: C;
}
const foo: I = [|{}|];`,
			result: `{
    a: new A,
    b: undefined,
    c: undefined
}`,
		},
		{
			content: `interface I {
    a: {
        x: number;
        y: { z: string; };
    }
}
const foo: I = [|{}|];`,
			result: `{
    a: {
        x: 0,
        y: {
            z: ""
        }
    }
}`,
		},
		{
			content: `type T = { x: number; };
interface I {
    a: T
}
const foo: I = [|{}|];`,
			result: `{
    a: {
        x: 0
    }
}`,
		},
		{
			content: `interface Foo {
    a: ` + "`" + `--${string}` + "`" + `;
    b: string;
    c: "a" | "b"
}
const foo: Foo = [|{}|];`,
			result: `{
    a: '',
    b: '',
    c: 'a'
}`,
			preferences: &lsutil.UserPreferences{QuotePreference: "single"},
		},
		{
			content: `interface Foo {
    a: number;
    b: number;
}
function f(foo: Foo) {}
f([|{}|]);`,
			result: `{
    a: 0,
    b: 0
}`,
		},
		{
			content: `interface Foo {
    a: number;
    b: number;
    c: () => void;
}
function f(foo: Foo) {}
f([|{ a: 10 }|]);`,
			result: `{
    a: 10,
    b: 0,
    c: function(): void {
        throw new Error("Function not implemented.");
    }
}`,
		},
		{
			content: `interface Foo {
    a: number;
    b: number;
}
function f(a: number, b: number, c: Foo) {}
f(1, 2, [|{}|]);`,
			result: `{
    a: 0,
    b: 0
}`,
		},
		{
			content: `interface Foo {
    1: number;
    2: number;
}
const foo: Foo = [|{}|]`,
			result: `{
    1: 0,
    2: 0
}`,
		},
		{
			content: `type A = 'a' | 'b' | 'c' | 'd' | 'e';
type B = 1 | 2 | 3;
type C = '@' | '!';
type D = ` + "`" + `${A}${Uppercase<A>}${B}${C}` + "`" + `;

const names: { [K in D]: K } = [|{}|];`,
			result: `{
    "aA1!": "aA1!",
    "aA1@": "aA1@",
    "aA2!": "aA2!",
    "aA2@": "aA2@",
    "aA3!": "aA3!",
    "aA3@": "aA3@",
    "aB1!": "aB1!",
    "aB1@": "aB1@",
    "aB2!": "aB2!",
    "aB2@": "aB2@",
    "aB3!": "aB3!",
    "aB3@": "aB3@",
    "aC1!": "aC1!",
    "aC1@": "aC1@",
    "aC2!": "aC2!",
    "aC2@": "aC2@",
    "aC3!": "aC3!",
    "aC3@": "aC3@",
    "aD1!": "aD1!",
    "aD1@": "aD1@",
    "aD2!": "aD2!",
    "aD2@": "aD2@",
    "aD3!": "aD3!",
    "aD3@": "aD3@",
    "aE1!": "aE1!",
    "aE1@": "aE1@",
    "aE2!": "aE2!",
    "aE2@": "aE2@",
    "aE3!": "aE3!",
    "aE3@": "aE3@",
    "bA1!": "bA1!",
    "bA1@": "bA1@",
    "bA2!": "bA2!",
    "bA2@": "bA2@",
    "bA3!": "bA3!",
    "bA3@": "bA3@",
    "bB1!": "bB1!",
    "bB1@": "bB1@",
    "bB2!": "bB2!",
    "bB2@": "bB2@",
    "bB3!": "bB3!",
    "bB3@": "bB3@",
    "bC1!": "bC1!",
    "bC1@": "bC1@",
    "bC2!": "bC2!",
    "bC2@": "bC2@",
    "bC3!": "bC3!",
    "bC3@": "bC3@",
    "bD1!": "bD1!",
    "bD1@": "bD1@",
    "bD2!": "bD2!",
    "bD2@": "bD2@",
    "bD3!": "bD3!",
    "bD3@": "bD3@",
    "bE1!": "bE1!",
    "bE1@": "bE1@",
    "bE2!": "bE2!",
    "bE2@": "bE2@",
    "bE3!": "bE3!",
    "bE3@": "bE3@",
    "cA1!": "cA1!",
    "cA1@": "cA1@",
    "cA2!": "cA2!",
    "cA2@": "cA2@",
    "cA3!": "cA3!",
    "cA3@": "cA3@",
    "cB1!": "cB1!",
    "cB1@": "cB1@",
    "cB2!": "cB2!",
    "cB2@": "cB2@",
    "cB3!": "cB3!",
    "cB3@": "cB3@",
    "cC1!": "cC1!",
    "cC1@": "cC1@",
    "cC2!": "cC2!",
    "cC2@": "cC2@",
    "cC3!": "cC3!",
    "cC3@": "cC3@",
    "cD1!": "cD1!",
    "cD1@": "cD1@",
    "cD2!": "cD2!",
    "cD2@": "cD2@",
    "cD3!": "cD3!",
    "cD3@": "cD3@",
    "cE1!": "cE1!",
    "cE1@": "cE1@",
    "cE2!": "cE2!",
    "cE2@": "cE2@",
    "cE3!": "cE3!",
    "cE3@": "cE3@",
    "dA1!": "dA1!",
    "dA1@": "dA1@",
    "dA2!": "dA2!",
    "dA2@": "dA2@",
    "dA3!": "dA3!",
    "dA3@": "dA3@",
    "dB1!": "dB1!",
    "dB1@": "dB1@",
    "dB2!": "dB2!",
    "dB2@": "dB2@",
    "dB3!": "dB3!",
    "dB3@": "dB3@",
    "dC1!": "dC1!",
    "dC1@": "dC1@",
    "dC2!": "dC2!",
    "dC2@": "dC2@",
    "dC3!": "dC3!",
    "dC3@": "dC3@",
    "dD1!": "dD1!",
    "dD1@": "dD1@",
    "dD2!": "dD2!",
    "dD2@": "dD2@",
    "dD3!": "dD3!",
    "dD3@": "dD3@",
    "dE1!": "dE1!",
    "dE1@": "dE1@",
    "dE2!": "dE2!",
    "dE2@": "dE2@",
    "dE3!": "dE3!",
    "dE3@": "dE3@",
    "eA1!": "eA1!",
    "eA1@": "eA1@",
    "eA2!": "eA2!",
    "eA2@": "eA2@",
    "eA3!": "eA3!",
    "eA3@": "eA3@",
    "eB1!": "eB1!",
    "eB1@": "eB1@",
    "eB2!": "eB2!",
    "eB2@": "eB2@",
    "eB3!": "eB3!",
    "eB3@": "eB3@",
    "eC1!": "eC1!",
    "eC1@": "eC1@",
    "eC2!": "eC2!",
    "eC2@": "eC2@",
    "eC3!": "eC3!",
    "eC3@": "eC3@",
    "eD1!": "eD1!",
    "eD1@": "eD1@",
    "eD2!": "eD2!",
    "eD2@": "eD2@",
    "eD3!": "eD3!",
    "eD3@": "eD3@",
    "eE1!": "eE1!",
    "eE1@": "eE1@",
    "eE2!": "eE2!",
    "eE2@": "eE2@",
    "eE3!": "eE3!",
    "eE3@": "eE3@"
}`,
		},
		{
			content: `interface Foo<T> {
    foo(): T;
}
const x: Foo<string> = [|{}|];`,
			result: `{
    foo: function(): string {
        throw new Error("Function not implemented.");
    }
}`,
		},
		{
			content: `interface Bar {
    a: number;
}

interface Foo<T, U> {
    foo(a: T): U;
}
const x: Foo<string, Bar> = [|{}|];`,
			result: `{
    foo: function(a: string): Bar {
        throw new Error("Function not implemented.");
    }
}`,
		},
		{
			content: `export interface Foo<T> {
    z(...args: T extends unknown[] ? T : [T]);
}
export interface Bar {
    a(foo: Foo<[number]>): void;
    b(foo: Foo<[]>): void;
    c(foo: Foo<number>): void;
}
const bar: Bar = [|{}|];`,
			result: `{
    a: function(foo: Foo<[number]>): void {
        throw new Error("Function not implemented.");
    },
    b: function(foo: Foo<[]>): void {
        throw new Error("Function not implemented.");
    },
    c: function(foo: Foo<number>): void {
        throw new Error("Function not implemented.");
    }
}`,
		},
		{
			content: `type T = { foo: number };
const foo: T[] = [];
foo.push([|{  }|])`,
			result: `{
    foo: 0
}`,
		},
		{
			content: `// @Filename: /a.ts
export type A = { x: string };
// @Filename: /b.ts
import { A } from "./a";
export type Foo = { x: string };
export interface B {
    b(a: A): Foo;
}
// @Filename: /c.ts
import { B } from "./b";
const b: B = {};`,
			result: `import { A } from "./a";
import { B, Foo } from "./b";
const b: B = {
    b: function(a: A): Foo {
        throw new Error("Function not implemented.");
    }
};`,
			filename: "/c.ts",
			fullFile: true,
		},
		{
			content: `// @lib: es2020
const x: Iterable<number> = {}`,
			result: `const x: Iterable<number> = {
    [Symbol.iterator]: function(): Iterator<number, any, any> {
        throw new Error("Function not implemented.");
    }
}`,
			fullFile: true,
		},
		{
			content: `enum E {
    A
}
let obj: Record<E, any> = {}`,
			result: `enum E {
    A
}
let obj: Record<E, any> = {
    [E.A]: undefined
}`,
			fullFile: true,
		},
		{
			content: `interface A {
    a: number;
    b: string;
}
interface B {
    c: boolean;
}
interface C {
    a: A;
    b: B;
}
function f<T extends keyof C>(type: T, obj: C[T]): string {
    return "";
}
f("a", [|{}|]);`,
			result: `{
    a: 0,
    b: ""
}`,
		},
		{
			content: `// @allowJs: true
// @checkJs: true
// @Filename: /a.js
/**
 * @type {{ f: (x: string) => number }}
 */
export const foo = [|{}|]`,
			result: `{
    f: function(x) {
        throw new Error("Function not implemented.");
    }
}`,
		},
		{
			content: `// @allowJs: true
// @checkJs: true
// @Filename: /a.js
/**
 * @type {{ f: (x?: string) => number }}
 */
export const foo = [|{}|]`,
			result: `{
    f: function(x) {
        throw new Error("Function not implemented.");
    }
}`,
		},
		{
			content: `interface Foo {
    a?: boolean;
    b: boolean;
}
type A = { [K in keyof Foo]-?: { name: K, value: ` + "`" + `Foo ${Uppercase<K>}` + "`" + ` }}
const a: A = [|{}|];`,
			result: `{
    a: {
        name: "a",
        value: "Foo A"
    },
    b: {
        name: "b",
        value: "Foo B"
    }
}`,
		},
		{
			content: `interface Foo {
    a: number;
    b: string;
}

interface Bar {
    value: Foo;
}

const bar: Bar = {
    value: [|{
        a: 10
    }|]
}`,
			result: `{
        a: 10,
        b: ""
    }`,
		},
		{
			content: `namespace Foo.Bar {
    export enum E {
        E1 = 0,
        E2 = 1,
    }
    export interface Baz {
        prop1: string;
        prop2: number;
        prop3: E.E1;
        prop4: Foo.Bar.E.E1;
    }
}
const foo: Foo.Bar.Baz = [|{}|]`,
			result: `{
    prop1: "",
    prop2: 0,
    prop3: Foo.Bar.E.E1,
    prop4: Foo.Bar.E.E1
}`,
		},
		{
			content: `interface A {
    a: number;
    b: string;
}
function f(_obj: A[]): string {
    return "";
}
f([[|{}|]])`,
			result: `{
    a: 0,
    b: ""
}`,
		},
		{
			content: `interface A {
    a: number;
    b: string;
}
interface B {
    c: A[];
}
const b: B[] = [{c: [[|{}|]]}]`,
			result: `{
    a: 0,
    b: ""
}`,
		},
		{
			content: `// @Filename: E.ts
export enum E {
    A,
    B,
}
// @Filename: foo.ts
import { E } from "./E"
type T = {
    e: E,
}
const t: T = [|{ }|]`,
			result: `{
    e: E.A
}`,
			filename: "foo.ts",
		},
		{
			content: `// @strict: false
interface Foo {
    a: number;
    b: string;
    c: 1;
    d: "d";
    e: "e1" | "e2";
    f(x: number, y: number): void;
    g: (x: number, y: number) => void;
    h: number[];
    i: bigint;
    j: undefined | "special-string";
    k: ` + "`" + `--${string}` + "`" + `;
}
const b = [|{}|] satisfies Foo;`,
			result: `{
    a: 0,
    b: "",
    c: 1,
    d: "d",
    e: "e1",
    f: function(x: number, y: number): void {
        throw new Error("Function not implemented.");
    },
    g: function(x: number, y: number): void {
        throw new Error("Function not implemented.");
    },
    h: [],
    i: 0n,
    j: "special-string",
    k: ""
}`,
		},
		{
			content: `interface Foo {
    a: number;
    b: string;
    c: any;
}
class C {
    public c = [|{}|] satisfies Foo;
}`,
			result: `{
        a: 0,
        b: "",
        c: undefined
    }`,
		},
		{
			content: `interface Foo {
    a: number;
    b: string;
}
const foo = [|{ a: 10 }|] satisfies Foo;`,
			result: `{
    a: 10,
    b: ""
}`,
		},
		{
			content: `type T = {
    a: null;
}

const foo = [|{}|] satisfies T;`,
			result: `{
    a: null
}`,
		},
		{
			content: `// @strict: false
interface I {
    x: number;
    y: number;
}
class C {
    public p: number;
    m(x: number, y: I) {}
}
const foo = [|{}|] satisfies C;`,
			result: `{
    p: 0,
    m: function(x: number, y: I): void {
        throw new Error("Function not implemented.");
    }
}`,
		},
		{
			content: `enum E1 {
    A, B
}
enum E2 {
    A
}
enum E3 {
}
interface I {
    x: E1;
    y: E2;
    z: E3;
}
const foo = [|{}|] satisfies I;`,
			result: `{
    x: E1.A,
    y: E2.A,
    z: 0
}`,
		},
		{
			content: `class A {
    constructor() {}
}

abstract class B {}

class C {
   constructor(a: string, b: number, c: A) {}
}

interface I {
    a: A;
    b: B;
    c: C;
}
const foo = [|{}|] satisfies I;`,
			result: `{
    a: new A,
    b: undefined,
    c: undefined
}`,
		},
		{
			content: `interface I {
    a: {
        x: number;
        y: { z: string; };
    }
}
const foo = [|{}|] satisfies I;`,
			result: `{
    a: {
        x: 0,
        y: {
            z: ""
        }
    }
}`,
		},
		{
			content: `interface Bar {
    a: number;
}

interface Foo<T, U> {
    foo(a: T): U;
}
const x = [|{}|] satisfies Foo<string, Bar>;`,
			result: `{
    foo: function(a: string): Bar {
        throw new Error("Function not implemented.");
    }
}`,
		},
		{
			content: `type A = { a: string };
type B = { b: string };

const c = [|{ }|] satisfies A satisfies B;`,
			result: `{
    a: ""
}`,
		},
		{
			content: `// @strict: false
interface Foo {
    a: number;
    b: string;
    c: 1;
    d: "d";
    e: "e1" | "e2";
    f(x: number, y: number): void;
    g: (x: number, y: number) => void;
    h: number[];
    i: bigint;
    j: undefined | "special-string";
    k: ` + "`" + `--${string}` + "`" + `;
}
const f = (): Foo => {
    return [|{ }|];
};`,
			result: `{
    a: 0,
    b: "",
    c: 1,
    d: "d",
    e: "e1",
    f: function(x: number, y: number): void {
        throw new Error("Function not implemented.");
    },
    g: function(x: number, y: number): void {
        throw new Error("Function not implemented.");
    },
    h: [],
    i: 0n,
    j: "special-string",
    k: ""
}`,
		},
		{
			content: `// @strict: false
// @lib: es2020
// @target: es2020
interface Foo {
    a: number;
    b: string;
    c: 1;
    d: "d";
    e: "e1" | "e2";
    f(x: number, y: number): void;
    g: (x: number, y: number) => void;
    h: number[];
    i: bigint;
    j: undefined | "special-string";
    k: ` + "`" + `--${string}` + "`" + `;
}
const f = function* (): Generator<Foo, void, any> {
    yield [|{}|];
};`,
			result: `{
    a: 0,
    b: "",
    c: 1,
    d: "d",
    e: "e1",
    f: function(x: number, y: number): void {
        throw new Error("Function not implemented.");
    },
    g: function(x: number, y: number): void {
        throw new Error("Function not implemented.");
    },
    h: [],
    i: 0n,
    j: "special-string",
    k: ""
}`,
		},
		{
			content: `// @strict: true
 type U = { u?: { v: string } };
 const u: U = { u: [|{}|] };`,
			result: `{
    v: ""
}`,
		},
		{
			content: `// @strict: true
 type T = { t: string };
 declare function f(arg?: T): void;
 f([|{}|]);`,
			result: `{
    t: ""
}`,
		},
		{
			content: `// @strict: true
 interface A {
   a: number;
   b: string;
 }
 function f(_obj: (A | undefined)[]): string {
   return "";
 }
 f([[|{}|]]);`,
			result: `{
    a: 0,
    b: ""
}`,
		},
		{
			content: `// @strict: true
 interface A {
   a: number;
   b: string;
 }
 interface B {
   c: (A | undefined)[];
 }
 const b: B[] = [{ c: [[|{}|]] }];`,
			result: `{
    a: 0,
    b: ""
}`,
		},
	} {
		t.Run(strconv.Itoa(i+1), func(t *testing.T) {
			t.Parallel()
			defer testutil.RecoverAndFail(t, "Panic on fourslash test")
			f, done := fourslash.NewFourslash(t, nil /*capabilities*/, test.content)
			defer done()
			if test.filename != "" {
				f.GoToFile(t, test.filename)
			}
			options := fourslash.VerifyCodeFixOptions{
				Description:     diagnostics.Add_missing_properties.Localize(locale.Default),
				ApplyChanges:    true,
				UserPreferences: test.preferences,
			}
			if test.fullFile {
				options.NewFileContent = test.result
			} else {
				options.NewRangeContent = test.result
			}
			f.VerifyCodeFix(t, options)
		})
	}
}
