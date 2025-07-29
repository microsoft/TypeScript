package ls_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/bundled"
	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/ls"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil/projecttestutil"
	"gotest.tools/v3/assert"
)

type verifySignatureHelpOptions struct {
	docComment      string
	text            string
	parameterSpan   string
	parameterCount  int
	activeParameter *lsproto.UintegerOrNull
	// triggerReason             ls.SignatureHelpTriggerReason
	// tags?: ReadonlyArray<JSDocTagInfo>;
}

func TestSignatureHelp(t *testing.T) {
	t.Parallel()
	if !bundled.Embedded {
		// Without embedding, we'd need to read all of the lib files out from disk into the MapFS.
		// Just skip this for now.
		t.Skip("bundled files are not embedded")
	}

	testCases := []struct {
		title     string
		input     string
		expected  map[string]verifySignatureHelpOptions
		noContext bool
	}{
		{
			title: "SignatureHelpCallExpressions",
			input: `function fnTest(str: string, num: number) { }
fnTest(/*1*/'', /*2*/5);`,
			expected: map[string]verifySignatureHelpOptions{
				"1": {
					text:            `fnTest(str: string, num: number): void`,
					parameterCount:  2,
					activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(0))},
					parameterSpan:   "str: string",
				},
				"2": {
					text:            `fnTest(str: string, num: number): void`,
					parameterCount:  2,
					activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(1))},
					parameterSpan:   "num: number",
				},
			},
		},
		{
			title: "SignatureHelp_contextual",
			input: `interface I {
	m(n: number, s: string): void;
	m2: () => void;
}
declare function takesObj(i: I): void;
takesObj({ m: (/*takesObj0*/) });
takesObj({ m(/*takesObj1*/) });
takesObj({ m: function(/*takesObj2*/) });
takesObj({ m2: (/*takesObj3*/) })
declare function takesCb(cb: (n: number, s: string, b: boolean) => void): void;
takesCb((/*contextualParameter1*/));
takesCb((/*contextualParameter1b*/) => {});
takesCb((n, /*contextualParameter2*/));
takesCb((n, s, /*contextualParameter3*/));
takesCb((n,/*contextualParameter3_2*/ s, b));
takesCb((n, s, b, /*contextualParameter4*/))
type Cb = () => void;
const cb: Cb = (/*contextualTypeAlias*/
const cb2: () => void = (/*contextualFunctionType*/)`,
			expected: map[string]verifySignatureHelpOptions{
				"takesObj0": {
					text:            "m(n: number, s: string): void",
					parameterCount:  2,
					activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(0))},
					parameterSpan:   "n: number",
				},
				"takesObj1": {
					text:            "m(n: number, s: string): void",
					parameterCount:  2,
					activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(0))},
					parameterSpan:   "n: number",
				},
				"takesObj2": {
					text:            "m(n: number, s: string): void",
					parameterCount:  2,
					activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(0))},
					parameterSpan:   "n: number",
				},
				"takesObj3": {
					text:            "m2(): void",
					parameterCount:  0,
					activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(0))},
					parameterSpan:   "",
				},
				"contextualParameter1": {
					text:            "cb(n: number, s: string, b: boolean): void",
					parameterCount:  3,
					activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(0))},
					parameterSpan:   "n: number",
				},
				"contextualParameter1b": {
					text:            "cb(n: number, s: string, b: boolean): void",
					parameterCount:  3,
					activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(0))},
					parameterSpan:   "n: number",
				},
				"contextualParameter2": {
					text:            "cb(n: number, s: string, b: boolean): void",
					parameterCount:  3,
					activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(1))},
					parameterSpan:   "s: string",
				},
				"contextualParameter3": {
					text:            "cb(n: number, s: string, b: boolean): void",
					parameterCount:  3,
					activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(2))},
					parameterSpan:   "b: boolean",
				},
				"contextualParameter3_2": {
					text:            "cb(n: number, s: string, b: boolean): void",
					parameterCount:  3,
					activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(1))},
					parameterSpan:   "s: string",
				},
				"contextualParameter4": {
					text:            "cb(n: number, s: string, b: boolean): void",
					parameterCount:  3,
					activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(3))},
					parameterSpan:   "",
				},
				"contextualTypeAlias": {
					text:            "Cb(): void",
					parameterCount:  0,
					activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(0))},
					parameterSpan:   "",
				},
				"contextualFunctionType": {
					text:            "cb2(): void",
					parameterCount:  0,
					activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(0))},
					parameterSpan:   "",
				},
			},
		},
		{
			title: "signatureHelpAnonymousFunction",
			input: `var anonymousFunctionTest = function(n: number, s: string): (a: number, b: string) => string {
	return null;
}
anonymousFunctionTest(5, "")(/*anonymousFunction1*/1, /*anonymousFunction2*/"");`,
			expected: map[string]verifySignatureHelpOptions{
				"anonymousFunction1": {
					text:            `(a: number, b: string): string`,
					parameterCount:  2,
					activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(0))},
					parameterSpan:   "a: number",
				},
				"anonymousFunction2": {
					text:            `(a: number, b: string): string`,
					parameterCount:  2,
					activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(1))},
					parameterSpan:   "b: string",
				},
			},
		},
		{
			title: "signatureHelpAtEOFs",
			input: `function Foo(arg1: string, arg2: string) {
}

Foo(/**/`,
			expected: map[string]verifySignatureHelpOptions{
				"": {
					text:            "Foo(arg1: string, arg2: string): void",
					parameterCount:  2,
					activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(0))},
					parameterSpan:   "arg1: string",
				},
			},
		},
		{
			title: "signatureHelpBeforeSemicolon1",
			input: `function Foo(arg1: string, arg2: string) {
}

Foo(/**/;`,
			expected: map[string]verifySignatureHelpOptions{
				"": {
					text:            "Foo(arg1: string, arg2: string): void",
					parameterCount:  2,
					activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(0))},
					parameterSpan:   "arg1: string",
				},
			},
		},
		{
			title: "signatureHelpCallExpression",
			input: `function fnTest(str: string, num: number) { }
fnTest(/*1*/'', /*2*/5);`,
			expected: map[string]verifySignatureHelpOptions{
				"1": {
					text:            `fnTest(str: string, num: number): void`,
					parameterCount:  2,
					activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(0))},
					parameterSpan:   "str: string",
				},
				"2": {
					text:            `fnTest(str: string, num: number): void`,
					parameterCount:  2,
					activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(1))},
					parameterSpan:   "num: number",
				},
			},
		},
		{
			title: "signatureHelpConstructExpression",
			input: `class sampleCls { constructor(str: string, num: number) { } }
var x = new sampleCls(/*1*/"", /*2*/5);`,
			expected: map[string]verifySignatureHelpOptions{
				"1": {
					text:            "sampleCls(str: string, num: number): sampleCls",
					parameterCount:  2,
					activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(0))},
					parameterSpan:   "str: string",
				},
				"2": {
					text:            "sampleCls(str: string, num: number): sampleCls",
					parameterCount:  2,
					activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(1))},
					parameterSpan:   "num: number",
				},
			},
		},
		{
			title: "signatureHelpConstructorInheritance",
			input: `class base {
constructor(s: string);
constructor(n: number);
constructor(a: any) { }
}
class B1 extends base { }
class B2 extends B1 { }
class B3 extends B2 {
    constructor() {
        super(/*indirectSuperCall*/3);
    }
}`,
			expected: map[string]verifySignatureHelpOptions{
				"indirectSuperCall": {
					text:            "B2(n: number): B2",
					parameterCount:  1,
					activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(0))},
					parameterSpan:   "n: number",
				},
			},
		},
		{
			title: "signatureHelpConstructorOverload",
			input: `class clsOverload { constructor(); constructor(test: string); constructor(test?: string) { } }
var x = new clsOverload(/*1*/);
var y = new clsOverload(/*2*/'');`,
			expected: map[string]verifySignatureHelpOptions{
				"1": {
					text:            "clsOverload(): clsOverload",
					parameterCount:  0,
					activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(0))},
				},
				"2": {
					text:            "clsOverload(test: string): clsOverload",
					parameterCount:  1,
					activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(0))},
					parameterSpan:   "test: string",
				},
			},
		},
		{
			title: "signatureHelpEmptyLists",
			input: `function Foo(arg1: string, arg2: string) {
		}

		Foo(/*1*/);
		function Bar<T>(arg1: string, arg2: string) { }
		Bar</*2*/>();`,
			expected: map[string]verifySignatureHelpOptions{
				"1": {
					text:            "Foo(arg1: string, arg2: string): void",
					parameterCount:  2,
					activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(0))},
					parameterSpan:   "arg1: string",
				},
				"2": {
					text:            "Bar<T>(arg1: string, arg2: string): void",
					parameterCount:  1,
					activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(0))},
					parameterSpan:   "T",
				},
			},
		},
		{
			title: "signatureHelpExpandedRestTuples",
			input: `export function complex(item: string, another: string, ...rest: [] | [settings: object, errorHandler: (err: Error) => void] | [errorHandler: (err: Error) => void, ...mixins: object[]]) {

}

complex(/*1*/);
complex("ok", "ok", /*2*/);
complex("ok", "ok", e => void e, {}, /*3*/);`,

			expected: map[string]verifySignatureHelpOptions{
				"1": {
					text:            "complex(item: string, another: string): void",
					parameterCount:  2,
					activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(0))},
					parameterSpan:   "item: string",
				},
				"2": {
					text:            "complex(item: string, another: string, settings: object, errorHandler: (err: Error) => void): void",
					parameterCount:  4,
					activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(2))},
					parameterSpan:   "settings: object",
				},
				"3": {
					text:            "complex(item: string, another: string, errorHandler: (err: Error) => void, ...mixins: object[]): void",
					parameterCount:  4,
					activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(3))},
					parameterSpan:   "...mixins: object[]",
				},
			},
		},
		{
			title: "signatureHelpExpandedRestUnlabeledTuples",
			input: `export function complex(item: string, another: string, ...rest: [] | [object, (err: Error) => void] | [(err: Error) => void, ...object[]]) {

}

complex(/*1*/);
complex("ok", "ok", /*2*/);
complex("ok", "ok", e => void e, {}, /*3*/);`,
			expected: map[string]verifySignatureHelpOptions{
				"1": {
					text:            "complex(item: string, another: string): void",
					parameterCount:  2,
					activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(0))},
					parameterSpan:   "item: string",
				},
				"2": {
					text:            "complex(item: string, another: string, rest_0: object, rest_1: (err: Error) => void): void",
					parameterCount:  4,
					activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(2))},
					parameterSpan:   "rest_0: object",
				},
				"3": {
					text:            "complex(item: string, another: string, rest_0: (err: Error) => void, ...rest: object[]): void",
					parameterCount:  4,
					activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(3))},
					parameterSpan:   "...rest: object[]",
				},
			},
		},
		{
			title: "signatureHelpExpandedTuplesArgumentIndex",
			input: `function foo(...args: [string, string] | [number, string, string]
) {

}
foo(123/*1*/,)
foo(""/*2*/, ""/*3*/)
foo(123/*4*/, ""/*5*/, )
foo(123/*6*/, ""/*7*/, ""/*8*/)`,
			expected: map[string]verifySignatureHelpOptions{
				"1": {
					text:            "foo(args_0: string, args_1: string): void",
					parameterCount:  2,
					activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(0))},
					parameterSpan:   "args_0: string",
				},
				"2": {
					text:            "foo(args_0: string, args_1: string): void",
					parameterCount:  2,
					activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(0))},
					parameterSpan:   "args_0: string",
				},
				"3": {
					text:            "foo(args_0: string, args_1: string): void",
					parameterCount:  2,
					activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(1))},
					parameterSpan:   "args_1: string",
				},
				"4": {
					text:            "foo(args_0: number, args_1: string, args_2: string): void",
					parameterCount:  3,
					activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(0))},
					parameterSpan:   "args_0: number",
				},
				"5": {
					text:            "foo(args_0: number, args_1: string, args_2: string): void",
					parameterCount:  3,
					activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(1))},
					parameterSpan:   "args_1: string",
				},
				"6": {
					text:            "foo(args_0: number, args_1: string, args_2: string): void",
					parameterCount:  3,
					activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(0))},
					parameterSpan:   "args_0: number",
				},
				"7": {
					text:            "foo(args_0: number, args_1: string, args_2: string): void",
					parameterCount:  3,
					activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(1))},
					parameterSpan:   "args_1: string",
				},
				"8": {
					text:            "foo(args_0: number, args_1: string, args_2: string): void",
					parameterCount:  3,
					activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(2))},
					parameterSpan:   "args_2: string",
				},
			},
		},
		{
			title: "signatureHelpExplicitTypeArguments",
			input: `declare function f<T = boolean, U = string>(x: T, y: U): T;
f<number, string>(/*1*/);
f(/*2*/);
f<number>(/*3*/);
f<number, string, boolean>(/*4*/);

interface A { a: number }
interface B extends A { b: string }
declare function g<T, U, V extends A = B>(x: T, y: U, z: V): T;
declare function h<T, U, V extends A>(x: T, y: U, z: V): T;
declare function j<T, U, V = B>(x: T, y: U, z: V): T;
g(/*5*/);
h(/*6*/);
j(/*7*/);
g<number>(/*8*/);
h<number>(/*9*/);
j<number>(/*10*/);`,
			expected: map[string]verifySignatureHelpOptions{
				"1": {text: "f(x: number, y: string): number", parameterCount: 2, activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(0))}, parameterSpan: "x: number"},
				"2": {text: "f(x: boolean, y: string): boolean", parameterCount: 2, parameterSpan: "x: boolean", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(0))}},
				// too few -- fill in rest with default
				"3": {text: "f(x: number, y: string): number", parameterCount: 2, parameterSpan: "x: number", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(0))}},
				// too many -- ignore extra type arguments
				"4": {text: "f(x: number, y: string): number", parameterCount: 2, parameterSpan: "x: number", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(0))}},

				// not matched signature and no type arguments
				"5": {text: "g(x: unknown, y: unknown, z: B): unknown", parameterCount: 3, parameterSpan: "x: unknown", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(0))}},
				"6": {text: "h(x: unknown, y: unknown, z: A): unknown", parameterCount: 3, parameterSpan: "x: unknown", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(0))}},
				"7": {text: "j(x: unknown, y: unknown, z: B): unknown", parameterCount: 3, parameterSpan: "x: unknown", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(0))}},
				// not matched signature and too few type arguments
				"8":  {text: "g(x: number, y: unknown, z: B): number", parameterCount: 3, parameterSpan: "x: number", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(0))}},
				"9":  {text: "h(x: number, y: unknown, z: A): number", parameterCount: 3, parameterSpan: "x: number", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(0))}},
				"10": {text: "j(x: number, y: unknown, z: B): number", parameterCount: 3, parameterSpan: "x: number", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(0))}},
			},
		},
		{
			title: "signatureHelpForOptionalMethods",
			input: `interface Obj {
    optionalMethod?: (current: any) => any;
};

const o: Obj = {
  optionalMethod(/*1*/) {
    return {};
  }
};`,
			expected: map[string]verifySignatureHelpOptions{
				"1": {text: "optionalMethod(current: any): any", parameterCount: 1, parameterSpan: "current: any", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(0))}},
			},
		},
		{
			title: "signatureHelpForSuperCalls",
			input: `class A { }
class B extends A { }
class C extends B {
   constructor() {
       super(/*1*/ // sig help here?
   }
}
class A2 { }
class B2 extends A2 {
   constructor(x:number) {}
}
class C2 extends B2 {
   constructor() {
       super(/*2*/ // sig help here?
   }
}`,
			expected: map[string]verifySignatureHelpOptions{
				"1": {text: "B(): B", parameterCount: 0, parameterSpan: "", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(0))}},
				"2": {text: "B2(x: number): B2", parameterCount: 1, parameterSpan: "x: number", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(0))}},
			},
		},
		{
			title: "signatureHelpFunctionOverload",
			input: `function functionOverload();
function functionOverload(test: string);
function functionOverload(test?: string) { }
functionOverload(/*functionOverload1*/);
functionOverload(""/*functionOverload2*/);`,
			expected: map[string]verifySignatureHelpOptions{
				"functionOverload1": {text: "functionOverload(): any", parameterCount: 0, parameterSpan: "", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(0))}},
				"functionOverload2": {text: "functionOverload(test: string): any", parameterCount: 1, parameterSpan: "test: string", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(0))}},
			},
		},
		{
			title: "signatureHelpFunctionParameter",
			input: `function parameterFunction(callback: (a: number, b: string) => void) {
   callback(/*parameterFunction1*/5, /*parameterFunction2*/"");
}`,
			expected: map[string]verifySignatureHelpOptions{
				"parameterFunction1": {text: "callback(a: number, b: string): void", parameterCount: 2, parameterSpan: "a: number", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(0))}},
				"parameterFunction2": {text: "callback(a: number, b: string): void", parameterCount: 2, parameterSpan: "b: string", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(1))}},
			},
		},
		{
			title: "signatureHelpImplicitConstructor",
			input: `class ImplicitConstructor {
}
var implicitConstructor = new ImplicitConstructor(/*1*/);`,
			expected: map[string]verifySignatureHelpOptions{
				"1": {text: "ImplicitConstructor(): ImplicitConstructor", parameterCount: 0, parameterSpan: "", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(0))}},
			},
		},
		{
			title: "signatureHelpInCallback",
			input: `declare function forEach(f: () => void);
forEach(/*1*/() => {
});`,
			expected: map[string]verifySignatureHelpOptions{
				"1": {text: "forEach(f: () => void): any", parameterCount: 1, parameterSpan: "f: () => void", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(0))}},
			},
		},
		{
			title: "signatureHelpIncompleteCalls",
			input: `module IncompleteCalls {
   class Foo {
       public f1() { }
       public f2(n: number): number { return 0; }
       public f3(n: number, s: string) : string { return ""; }
   }
   var x = new Foo();
   x.f1();
   x.f2(5);
   x.f3(5, "");
   x.f1(/*incompleteCalls1*/
   x.f2(5,/*incompleteCalls2*/
   x.f3(5,/*incompleteCalls3*/
}`,
			expected: map[string]verifySignatureHelpOptions{
				"incompleteCalls1": {text: "f1(): void", parameterCount: 0, parameterSpan: "", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(0))}},
				"incompleteCalls2": {text: "f2(n: number): number", parameterCount: 1, parameterSpan: "", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(1))}},
				"incompleteCalls3": {text: "f3(n: number, s: string): string", parameterCount: 2, parameterSpan: "s: string", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(1))}},
			},
		},
		{
			title: "signatureHelpCompleteGenericsCall",
			input: `function foo<T>(x: number, callback: (x: T) => number) {
}
foo(/*1*/`,
			expected: map[string]verifySignatureHelpOptions{
				"1": {text: "foo(x: number, callback: (x: unknown) => number): void", parameterCount: 2, parameterSpan: "x: number", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(0))}},
			},
		},
		{
			title: "signatureHelpInference",
			input: `declare function f<T extends string>(a: T, b: T, c: T): void;
f("x", /**/);`,
			expected: map[string]verifySignatureHelpOptions{
				"": {text: `f(a: "x", b: "x", c: "x"): void`, parameterCount: 3, parameterSpan: `b: "x"`, activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(1))}},
			},
		},
		{
			title: "signatureHelpInParenthetical",
			input: `class base { constructor (public n: number, public y: string) { } }
(new base(/*1*/
(new base(0, /*2*/`,
			expected: map[string]verifySignatureHelpOptions{
				"1": {text: "base(n: number, y: string): base", parameterCount: 2, parameterSpan: "n: number", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(0))}},
				"2": {text: "base(n: number, y: string): base", parameterCount: 2, parameterSpan: "y: string", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(1))}},
			},
		},
		{
			title: "signatureHelpLeadingRestTuple",
			input: `export function leading(...args: [...names: string[], allCaps: boolean]): void {
}

leading(/*1*/);
leading("ok", /*2*/);
leading("ok", "ok", /*3*/);`,
			expected: map[string]verifySignatureHelpOptions{
				"1": {text: "leading(...names: string[], allCaps: boolean): void", parameterCount: 2, parameterSpan: "allCaps: boolean", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(1))}},
				"2": {text: "leading(...names: string[], allCaps: boolean): void", parameterCount: 2, parameterSpan: "allCaps: boolean", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(1))}},
				"3": {text: "leading(...names: string[], allCaps: boolean): void", parameterCount: 2, parameterSpan: "allCaps: boolean", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(1))}},
			},
		},
		{
			title: "signatureHelpNoArguments",
			input: `function foo(n: number): string {
}
foo(/**/`,
			expected: map[string]verifySignatureHelpOptions{
				"": {text: "foo(n: number): string", parameterCount: 1, parameterSpan: "n: number", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(0))}},
			},
		},
		{
			title: "signatureHelpObjectLiteral",
			input: `var objectLiteral = { n: 5, s: "", f: (a: number, b: string) => "" };
objectLiteral.f(/*objectLiteral1*/4, /*objectLiteral2*/"");`,
			expected: map[string]verifySignatureHelpOptions{
				"objectLiteral1": {text: "f(a: number, b: string): string", parameterCount: 2, parameterSpan: "a: number", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(0))}},
				"objectLiteral2": {text: "f(a: number, b: string): string", parameterCount: 2, parameterSpan: "b: string", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(1))}},
			},
		},
		{
			title: "signatureHelpOnNestedOverloads",
			input: `declare function fn(x: string);
declare function fn(x: string, y: number);
declare function fn2(x: string);
declare function fn2(x: string, y: number);
fn('', fn2(/*1*/
fn2('', fn2('',/*2*/`,
			expected: map[string]verifySignatureHelpOptions{
				"1": {text: "fn2(x: string): any", parameterCount: 1, parameterSpan: "x: string", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(0))}},
				"2": {text: "fn2(x: string, y: number): any", parameterCount: 2, parameterSpan: "y: number", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(1))}},
			},
		},
		{
			title: "signatureHelpOnOverloadOnConst",
			input: `function x1(x: 'hi');
function x1(y: 'bye');
function x1(z: string);
function x1(a: any) {
}

x1(''/*1*/);
x1('hi'/*2*/);
x1('bye'/*3*/);`,
			expected: map[string]verifySignatureHelpOptions{
				"1": {text: `x1(z: string): any`, parameterCount: 1, parameterSpan: "z: string", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(0))}},
				"2": {text: `x1(x: "hi"): any`, parameterCount: 1, parameterSpan: `x: "hi"`, activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(0))}},
				"3": {text: `x1(y: "bye"): any`, parameterCount: 1, parameterSpan: `y: "bye"`, activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(0))}},
			},
		},
		{
			title: "signatureHelpOnOverloads",
			input: `declare function fn(x: string);
declare function fn(x: string, y: number);
fn(/*1*/
fn('',/*2*/)`,
			expected: map[string]verifySignatureHelpOptions{
				"1": {text: "fn(x: string): any", parameterCount: 1, parameterSpan: "x: string", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(0))}},
				"2": {text: "fn(x: string, y: number): any", parameterCount: 2, parameterSpan: "y: number", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(1))}},
			},
		},
		{
			title: "signatureHelpOnOverloadsDifferentArity1",
			input: `declare function f(s: string);
declare function f(n: number);
declare function f(s: string, b: boolean);
declare function f(n: number, b: boolean)
f(1/*1*/`,
			expected: map[string]verifySignatureHelpOptions{
				"1": {text: "f(n: number): any", parameterCount: 1, parameterSpan: "n: number", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(0))}},
			},
		},
		{
			title: "signatureHelpOnOverloadsDifferentArity1_1",
			input: `declare function f(s: string);
declare function f(n: number);
declare function f(s: string, b: boolean);
declare function f(n: number, b: boolean)
f(1, /*1*/`,
			expected: map[string]verifySignatureHelpOptions{
				"1": {text: "f(n: number, b: boolean): any", parameterCount: 2, parameterSpan: "b: boolean", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(1))}},
			},
		},
		{
			title: "signatureHelpOnOverloadsDifferentArity2",
			input: `declare function f(s: string);
declare function f(n: number);
declare function f(s: string, b: boolean);
declare function f(n: number, b: boolean);

f(1/*1*/ var`,
			expected: map[string]verifySignatureHelpOptions{
				"1": {text: "f(n: number): any", parameterCount: 1, parameterSpan: "n: number", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(0))}},
			},
		},
		{
			title: "signatureHelpOnOverloadsDifferentArity2_2",
			input: `declare function f(s: string);
declare function f(n: number);
declare function f(s: string, b: boolean);
declare function f(n: number, b: boolean);

f(1, /*1*/var`,
			expected: map[string]verifySignatureHelpOptions{
				"1": {text: "f(n: number, b: boolean): any", parameterCount: 2, parameterSpan: "b: boolean", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(1))}},
			},
		},
		{
			title: "signatureHelpOnOverloadsDifferentArity3_1",
			input: `declare function f();
declare function f(s: string);
declare function f(s: string, b: boolean);
declare function f(n: number, b: boolean);

f(/*1*/`,
			expected: map[string]verifySignatureHelpOptions{
				"1": {text: "f(): any", parameterCount: 0, parameterSpan: "", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(0))}},
			},
		},
		{
			title: "signatureHelpOnOverloadsDifferentArity3_2",
			input: `declare function f();
declare function f(s: string);
declare function f(s: string, b: boolean);
declare function f(n: number, b: boolean);

f(x, /*1*/`,
			expected: map[string]verifySignatureHelpOptions{
				"1": {text: "f(s: string, b: boolean): any", parameterCount: 2, parameterSpan: "b: boolean", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(1))}},
			},
		},
		{
			title: "signatureHelpOnSuperWhenMembersAreNotResolved",
			input: `class A { }
class B extends A { constructor(public x: string) { } }
class C extends B {
   constructor() {
       super(/*1*/
    }
}`,
			expected: map[string]verifySignatureHelpOptions{
				"1": {text: "B(x: string): B", parameterCount: 1, parameterSpan: "x: string", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(0))}},
			},
		},
		{
			title: "signatureHelpOnTypePredicates",
			input: `function f1(a: any): a is number {}
function f2<T>(a: any): a is T {}
function f3(a: any, ...b): a is number {}
f1(/*1*/)
f2(/*2*/)
f3(/*3*/)`,
			expected: map[string]verifySignatureHelpOptions{
				"1": {text: "f1(a: any): a is number", parameterCount: 1, parameterSpan: "a: any", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(0))}},
				"2": {text: "f2(a: any): a is unknown", parameterCount: 1, parameterSpan: "a: any", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(0))}},
				"3": {text: "f3(a: any, ...b: any[]): a is number", parameterCount: 2, parameterSpan: "a: any", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(0))}},
			},
		},
		{
			title: "signatureHelpOptionalCall",
			input: `function fnTest(str: string, num: number) { }
fnTest?.(/*1*/);`,
			expected: map[string]verifySignatureHelpOptions{
				"1": {text: "fnTest(str: string, num: number): void", parameterCount: 2, parameterSpan: "str: string", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(0))}},
			},
		},
		{
			title: "signatureHepSimpleConstructorCall",
			input: `class ConstructorCall {
   constructor(str: string, num: number) {
   }
}
var x = new ConstructorCall(/*constructorCall1*/1,/*constructorCall2*/2);`,
			expected: map[string]verifySignatureHelpOptions{
				"constructorCall1": {text: "ConstructorCall(str: string, num: number): ConstructorCall", parameterCount: 2, parameterSpan: "str: string", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(0))}},
				"constructorCall2": {text: "ConstructorCall(str: string, num: number): ConstructorCall", parameterCount: 2, parameterSpan: "num: number", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(1))}},
			},
		},
		{
			title: "signatureHelpSimpleFunctionCall",
			input: `function functionCall(str: string, num: number) {
}
functionCall(/*functionCall1*/);
functionCall("", /*functionCall2*/1);`,
			expected: map[string]verifySignatureHelpOptions{
				"functionCall1": {text: "functionCall(str: string, num: number): void", parameterCount: 2, parameterSpan: "str: string", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(0))}},
				"functionCall2": {text: "functionCall(str: string, num: number): void", parameterCount: 2, parameterSpan: "num: number", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(1))}},
			},
		},
		{
			title: "signatureHelpSimpleSuperCall",
			input: `class SuperCallBase {
   constructor(b: boolean) {
   }
}
class SuperCall extends SuperCallBase {
   constructor() {
       super(/*superCall*/);
   }
}`,
			expected: map[string]verifySignatureHelpOptions{
				"superCall": {text: "SuperCallBase(b: boolean): SuperCallBase", parameterCount: 1, parameterSpan: "b: boolean", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(0))}},
			},
		},
		{
			title: "signatureHelpSuperConstructorOverload",
			input: `class SuperOverloadBase {
   constructor();
   constructor(test: string);
   constructor(test?: string) {
   }
}
class SuperOverLoad1 extends SuperOverloadBase {
   constructor() {
       super(/*superOverload1*/);
   }
}
class SuperOverLoad2 extends SuperOverloadBase {
   constructor() {
       super(""/*superOverload2*/);
   }
}`,
			expected: map[string]verifySignatureHelpOptions{
				"superOverload1": {text: "SuperOverloadBase(): SuperOverloadBase", parameterCount: 0, parameterSpan: "", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(0))}},
				"superOverload2": {text: "SuperOverloadBase(test: string): SuperOverloadBase", parameterCount: 1, parameterSpan: "test: string", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(0))}},
			},
		},
		{
			title: "signatureHelpTrailingRestTuple",
			input: `export function leading(allCaps: boolean, ...names: string[]): void {
}

leading(/*1*/);
leading(false, /*2*/);
leading(false, "ok", /*3*/);`,
			expected: map[string]verifySignatureHelpOptions{
				"1": {text: "leading(allCaps: boolean, ...names: string[]): void", parameterCount: 2, parameterSpan: "allCaps: boolean", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(0))}},
				"2": {text: "leading(allCaps: boolean, ...names: string[]): void", parameterCount: 2, parameterSpan: "...names: string[]", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(1))}},
				"3": {text: "leading(allCaps: boolean, ...names: string[]): void", parameterCount: 2, parameterSpan: "...names: string[]", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(1))}},
			},
		},
		{
			title: "signatureHelpWithInvalidArgumentList1",
			input: `function foo(a) { }
foo(hello my name /**/is`,
			expected: map[string]verifySignatureHelpOptions{
				"": {text: "foo(a: any): void", parameterCount: 1, parameterSpan: "", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(2))}},
			},
		},
		{
			title: "signatureHelpAfterParameter",
			input: `type Type = (a, b, c) => void
const a: Type = (a/*1*/, b/*2*/) => {}
const b: Type = function (a/*3*/, b/*4*/) {}
const c: Type = ({ /*5*/a: { b/*6*/ }}/*7*/ = { }/*8*/, [b/*9*/]/*10*/, .../*11*/c/*12*/) => {}`,
			expected: map[string]verifySignatureHelpOptions{
				"1":  {text: "Type(a: any, b: any, c: any): void", parameterCount: 3, parameterSpan: "a: any", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(0))}},
				"2":  {text: "Type(a: any, b: any, c: any): void", parameterCount: 3, parameterSpan: "b: any", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(1))}},
				"3":  {text: "Type(a: any, b: any, c: any): void", parameterCount: 3, parameterSpan: "a: any", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(0))}},
				"4":  {text: "Type(a: any, b: any, c: any): void", parameterCount: 3, parameterSpan: "b: any", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(1))}},
				"5":  {text: "Type(a: any, b: any, c: any): void", parameterCount: 3, parameterSpan: "a: any", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(0))}},
				"6":  {text: "Type(a: any, b: any, c: any): void", parameterCount: 3, parameterSpan: "a: any", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(0))}},
				"7":  {text: "Type(a: any, b: any, c: any): void", parameterCount: 3, parameterSpan: "a: any", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(0))}},
				"8":  {text: "Type(a: any, b: any, c: any): void", parameterCount: 3, parameterSpan: "a: any", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(0))}},
				"9":  {text: "Type(a: any, b: any, c: any): void", parameterCount: 3, parameterSpan: "b: any", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(1))}},
				"10": {text: "Type(a: any, b: any, c: any): void", parameterCount: 3, parameterSpan: "b: any", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(1))}},
				"11": {text: "Type(a: any, b: any, c: any): void", parameterCount: 3, parameterSpan: "c: any", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(2))}},
				"12": {text: "Type(a: any, b: any, c: any): void", parameterCount: 3, parameterSpan: "c: any", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(2))}},
			},
		},
		{
			title: "signaturehelpCallExpressionTuples",
			input: `function fnTest(str: string, num: number) { }
declare function wrap<A extends any[], R>(fn: (...a: A) => R) : (...a: A) => R;
var fnWrapped = wrap(fnTest);
fnWrapped(/*1*/'', /*2*/5);
function fnTestVariadic (str: string, ...num: number[]) { }
var fnVariadicWrapped = wrap(fnTestVariadic);
fnVariadicWrapped(/*3*/'', /*4*/5);
function fnNoParams () { }
var fnNoParamsWrapped = wrap(fnNoParams);
fnNoParamsWrapped(/*5*/);`,
			expected: map[string]verifySignatureHelpOptions{
				"1": {text: "fnWrapped(str: string, num: number): void", parameterCount: 2, parameterSpan: "str: string", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(0))}},
				"2": {text: "fnWrapped(str: string, num: number): void", parameterCount: 2, parameterSpan: "num: number", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(1))}},
				"3": {text: "fnVariadicWrapped(str: string, ...num: number[]): void", parameterCount: 2, parameterSpan: "str: string", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(0))}},
				"4": {text: "fnVariadicWrapped(str: string, ...num: number[]): void", parameterCount: 2, parameterSpan: "...num: number[]", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(1))}},
				"5": {text: "fnNoParamsWrapped(): void", parameterCount: 0, parameterSpan: "", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(0))}},
			},
		},
		{
			title: "signatureHelpConstructorCallParamProperties",
			input: `class Circle {
   constructor(private radius: number) {
   }
}
var a = new Circle(/**/`,
			expected: map[string]verifySignatureHelpOptions{
				"": {text: "Circle(radius: number): Circle", parameterCount: 1, parameterSpan: "radius: number", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(0))}},
			},
		},
		{
			title: "signatureHelpInRecursiveType",
			input: `type Tail<T extends any[]> =
	((...args: T) => any) extends ((head: any, ...tail: infer R) => any) ? R : never;

type Reverse<List extends any[]> = _Reverse<List, []>;

type _Reverse<Source extends any[], Result extends any[] = []> = {
	1: Result,
	0: _Reverse<Tail<Source>, 0>,
}[Source extends [] ? 1 : 0];

type Foo = Reverse<[0,/**/]>;`,
			expected: map[string]verifySignatureHelpOptions{
				"": {text: "Reverse<List extends any[]>", parameterCount: 1, parameterSpan: "List extends any[]", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(0))}},
			},
		},
		{
			title: "signatureHelpRestArgs1",
			input: `function fn(a: number, b: number, c: number) {}
const a = [1, 2] as const;
const b = [1] as const;

fn(...a, /*1*/);
fn(/*2*/, ...a);

fn(...b, /*3*/);
fn(/*4*/, ...b, /*5*/);`,
			expected: map[string]verifySignatureHelpOptions{
				"1": {text: "fn(a: number, b: number, c: number): void", parameterCount: 3, parameterSpan: "c: number", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(2))}},
				"2": {text: "fn(a: number, b: number, c: number): void", parameterCount: 3, parameterSpan: "a: number", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(0))}},
				"3": {text: "fn(a: number, b: number, c: number): void", parameterCount: 3, parameterSpan: "b: number", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(1))}},
				"4": {text: "fn(a: number, b: number, c: number): void", parameterCount: 3, parameterSpan: "a: number", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(0))}},
				"5": {text: "fn(a: number, b: number, c: number): void", parameterCount: 3, parameterSpan: "c: number", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(2))}},
			},
		},
		{
			title: "signatureHelpSkippedArgs1",
			input: `function fn(a: number, b: number, c: number) {}
fn(/*1*/, /*2*/, /*3*/, /*4*/, /*5*/);`,
			expected: map[string]verifySignatureHelpOptions{
				"1": {text: "fn(a: number, b: number, c: number): void", parameterCount: 3, parameterSpan: "a: number", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(0))}},
				"2": {text: "fn(a: number, b: number, c: number): void", parameterCount: 3, parameterSpan: "b: number", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(1))}},
				"3": {text: "fn(a: number, b: number, c: number): void", parameterCount: 3, parameterSpan: "c: number", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(2))}},
				"4": {text: "fn(a: number, b: number, c: number): void", parameterCount: 3, parameterSpan: "", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(3))}},
				"5": {text: "fn(a: number, b: number, c: number): void", parameterCount: 3, parameterSpan: "", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(4))}},
			},
		},
		{
			title: "signatureHelpTypeArguments",
			input: `declare function f(a: number, b: string, c: boolean): void; // ignored, not generic
declare function f<T extends number>(): void;
declare function f<T, U>(): void;
declare function f<T, U, V extends string>(): void;
f</*f0*/;
f<number, /*f1*/;
f<number, string, /*f2*/;

declare const C: {
   new<T extends number>(): void;
   new<T, U>(): void;
   new<T, U, V extends string>(): void;
};
new C</*C0*/;
new C<number, /*C1*/;
new C<number, string, /*C2*/;`,
			expected: map[string]verifySignatureHelpOptions{
				"f0": {text: "f<T extends number>(): void", parameterCount: 1, parameterSpan: "T extends number", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(0))}},
				"f1": {text: "f<T, U>(): void", parameterCount: 2, parameterSpan: "U", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(1))}},
				"f2": {text: "f<T, U, V extends string>(): void", parameterCount: 3, parameterSpan: "V extends string", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(2))}},
				"C0": {text: "C<T extends number>(): void", parameterCount: 1, parameterSpan: "T extends number", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(0))}},
				"C1": {text: "C<T, U>(): void", parameterCount: 2, parameterSpan: "U", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(1))}},
				"C2": {text: "C<T, U, V extends string>(): void", parameterCount: 3, parameterSpan: "V extends string", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(2))}},
			},
		},
		{
			title: "signatureHelpTypeArguments2",
			input: `function f<T, U, V, W>(a: number, b: string, c: boolean): void { }
f</*f0*/;
f<number, /*f1*/;
f<number, string, /*f2*/;
f<number, string, boolean, /*f3*/;`,
			expected: map[string]verifySignatureHelpOptions{
				"f0": {text: "f<T, U, V, W>(a: number, b: string, c: boolean): void", parameterCount: 4, parameterSpan: "T", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(0))}},
				"f1": {text: "f<T, U, V, W>(a: number, b: string, c: boolean): void", parameterCount: 4, parameterSpan: "U", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(1))}},
				"f2": {text: "f<T, U, V, W>(a: number, b: string, c: boolean): void", parameterCount: 4, parameterSpan: "V", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(2))}},
				"f3": {text: "f<T, U, V, W>(a: number, b: string, c: boolean): void", parameterCount: 4, parameterSpan: "W", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(3))}},
			},
		},
		{
			title: "signatureHelpTypeParametersNotVariadic",
			input: `declare function f(a: any, ...b: any[]): any;
f</*1*/>(1, 2);`,
			expected: map[string]verifySignatureHelpOptions{
				"1": {text: "f<>(a: any, ...b: any[]): any", parameterCount: 0, parameterSpan: "", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(0))}},
			},
		},
		{
			title: "signatureHelpWithUnknown",
			input: `eval(\/*1*/`,
			expected: map[string]verifySignatureHelpOptions{
				"1": {text: "eval(x: string): any", parameterCount: 1, parameterSpan: "x: string", activeParameter: &lsproto.UintegerOrNull{Uinteger: ptrTo(uint32(0))}},
			},
		},
		{
			title: "signatureHelpWithoutContext",
			input: `let x = /*1*/`,
			expected: map[string]verifySignatureHelpOptions{
				"1": {text: "", parameterCount: 0, parameterSpan: "", activeParameter: nil},
			},
			noContext: true,
		},
	}

	for _, testCase := range testCases {
		t.Run(testCase.title, func(t *testing.T) {
			t.Parallel()
			runSignatureHelpTest(t, testCase.input, testCase.expected, testCase.noContext)
		})
	}
}

func runSignatureHelpTest(t *testing.T, input string, expected map[string]verifySignatureHelpOptions, noContext bool) {
	testData := fourslash.ParseTestData(t, input, "/mainFile.ts")
	file := testData.Files[0].FileName()
	markerPositions := testData.MarkerPositions
	ctx := projecttestutil.WithRequestID(t.Context())
	languageService, done := createLanguageService(ctx, file, map[string]string{
		file: testData.Files[0].Content,
	})
	defer done()

	var context *lsproto.SignatureHelpContext
	if !noContext {
		context = &lsproto.SignatureHelpContext{
			TriggerKind:      lsproto.SignatureHelpTriggerKindInvoked,
			TriggerCharacter: nil,
		}
	}

	ptrTrue := ptrTo(true)
	capabilities := &lsproto.SignatureHelpClientCapabilities{
		SignatureInformation: &lsproto.ClientSignatureInformationOptions{
			ActiveParameterSupport:   ptrTrue,
			NoActiveParameterSupport: ptrTrue,
			ParameterInformation: &lsproto.ClientSignatureParameterInformationOptions{
				LabelOffsetSupport: ptrTrue,
			},
		},
	}
	preferences := &ls.UserPreferences{}
	for markerName, expectedResult := range expected {
		marker, ok := markerPositions[markerName]
		if !ok {
			t.Fatalf("No marker found for '%s'", markerName)
		}
		rawResult, err := languageService.ProvideSignatureHelp(ctx, ls.FileNameToDocumentURI(file), marker.LSPosition, context, capabilities, preferences)
		assert.NilError(t, err)
		result := rawResult.SignatureHelp
		if result == nil {
			assert.Equal(t, expectedResult.text, "")
			continue
		}
		assert.Equal(t, expectedResult.text, result.Signatures[*result.ActiveSignature].Label)
		assert.Equal(t, expectedResult.parameterCount, len(*result.Signatures[*result.ActiveSignature].Parameters))
		assert.DeepEqual(t, expectedResult.activeParameter, result.ActiveParameter)
		// Checking the parameter span that will be highlighted in the editor
		if expectedResult.activeParameter != nil && expectedResult.activeParameter.Uinteger != nil && int(*expectedResult.activeParameter.Uinteger) < expectedResult.parameterCount {
			assert.Equal(t, expectedResult.parameterSpan, *(*result.Signatures[*result.ActiveSignature].Parameters)[int(*result.ActiveParameter.Uinteger)].Label.String)
		}
	}
}
