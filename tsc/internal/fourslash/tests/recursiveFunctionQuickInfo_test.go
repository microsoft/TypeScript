package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestRecursiveFunctionQuickInfo(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `
const arrow/*arrow*/ = () => arrow;
const broad: unknown = function self/*self*/() { return self; };
arrow/*use*/()();
const object/*object*/ = { next: () => object };
const tuple/*tuple*/ = [() => tuple] as const;
arrow/*reference*/;
const alias = arrow;
alias/*aliasUse*/();
`
	f, done := fourslash.NewFourslash(t, nil, content)
	defer done()
	f.VerifyQuickInfoAt(t, "arrow", "const arrow: () => typeof arrow", "")
	f.VerifyQuickInfoAt(t, "use", "const arrow: () => () => typeof arrow", "")
	f.VerifyQuickInfoAt(t, "self", "function self(): () => typeof broad", "")
	f.VerifyQuickInfoAt(t, "object", "const object: {\n    next: () => ...;\n}", "")
	f.VerifyQuickInfoAt(t, "tuple", "const tuple: readonly [() => ...]", "")
	f.VerifyQuickInfoAt(t, "reference", "const arrow: () => typeof arrow", "")
	f.VerifyQuickInfoAt(t, "aliasUse", "const alias: () => () => typeof arrow", "")
	f.VerifyNoErrors(t)
}

func TestRecursiveFunctionCallQuickInfo(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @strict: true
const arrow/*declaration*/ = () => arrow;
arrow/*call*/();
const named = function self() { return self; };
named/*namedCall*/();
function recur() { return recur; }
recur/*functionCall*/();
const generic = <T>(value: T) => generic;
generic/*genericCall*/(1);
const specialized = generic<string>;
specialized/*specializedCall*/("text");
declare let narrowed: typeof arrow | undefined;
if (narrowed) narrowed/*narrowedCall*/();
declare const broad: () => unknown;
broad/*broadCall*/();
function overloaded(value: string): string;
function overloaded(value: number): typeof overloaded;
function overloaded(value: string | number): string | typeof overloaded {
    return typeof value === "string" ? value : overloaded;
}
overloaded/*stringCall*/("text");
overloaded/*numberCall*/(1);
const object = { recur() { return object.recur; } };
object.recur/*methodCall*/();
const first/*firstDeclaration*/ = () => second;
const second = () => first;
first/*firstCall*/();
function genericFunction<T>(value: T) { return genericFunction; }
genericFunction/*genericFunctionCall*/(1);
const callable = () => callable;
callable.property = 1;
callable/*callableCall*/();
const other = () => 1;
const producer/*producerDeclaration*/ = () => other;
producer/*producerCall*/();
function make<T>(value: T) {
    return { value, next: () => make("text") };
}
const different/*differentInstantiations*/ = make(1);
const scoped/*scopedDeclaration*/ = {
    first<T>(outer: T) {
        return {
            nested<T>(inner: T) { return { outer, inner, next: scoped }; },
            sibling<T>(inner: T) { return { outer, inner, next: scoped }; },
        };
    },
    second<T>(value: T) { return { value, next: scoped }; },
};
const numberScope = scoped.first/*scopedFirst*/(1);
numberScope.nested/*scopedNested*/("inner");
numberScope.sibling/*scopedSibling*/(true);
scoped.second/*scopedSecond*/("text");
const nestedOwner = {
    make<T>(outer: T) {
        return {
            nested<U>(inner: U) { return { outer, inner, owner: nestedOwner }; },
            constrained<U extends T = T>(inner: U) { return { outer, inner, owner: nestedOwner }; },
            copied<U>(inner: U): { outer: T; inner: U; owner: typeof nestedOwner } {
                return { outer, inner, owner: nestedOwner };
            },
            rest<U>(...values: [U]) { return { outer, inner: values[0], owner: nestedOwner }; },
        };
    },
};
const nestedNumber/*nestedNumber*/ = nestedOwner.make(1);
nestedNumber.nested/*nestedGeneric*/(true).owner.make/*nestedOwnerMake*/("text");
nestedNumber.constrained/*nestedConstrained*/(2);
nestedNumber.copied/*nestedCopied*/("inner");
nestedNumber.rest/*nestedRest*/(true);
declare const reused: {
    first<T>(...values: [T]): { value: T; next: typeof reused };
    second<T>(value: T): { value: T; next: typeof reused };
    shadowed<T>(reused: T): { value: T; next: typeof reused };
};
const copy/*reusedDeclaration*/ = reused;
copy.first/*reusedFirst*/(1);
copy.shadowed/*reusedShadowed*/(1);`
	f, done := fourslash.NewFourslash(t, nil, content)
	defer done()
	f.VerifyNoErrors(t)
	f.VerifyBaselineHoverWithVerbosity(t, map[string][]int{
		"declaration": {0, 1, 2}, "call": {0, 1, 2}, "namedCall": {0, 1, 2},
		"functionCall": {0, 1, 2}, "genericCall": {0}, "specializedCall": {0},
		"narrowedCall": {0, 1, 2}, "broadCall": {0, 1, 2},
		"stringCall": {0, 1, 2}, "numberCall": {0}, "methodCall": {0, 1, 2},
		"firstDeclaration": {0, 1, 2}, "firstCall": {0, 1, 2},
		"genericFunctionCall": {0}, "callableCall": {0, 1, 2},
		"producerDeclaration": {0, 1, 2}, "producerCall": {0, 1, 2},
		"differentInstantiations": {0},
		"scopedDeclaration":       {0}, "scopedFirst": {0}, "scopedNested": {0},
		"scopedSibling": {0}, "scopedSecond": {0}, "reusedDeclaration": {0},
		"reusedFirst": {0}, "reusedShadowed": {0},
		"nestedNumber": {0}, "nestedGeneric": {0}, "nestedOwnerMake": {0},
		"nestedConstrained": {0}, "nestedCopied": {0}, "nestedRest": {0},
	})
}
