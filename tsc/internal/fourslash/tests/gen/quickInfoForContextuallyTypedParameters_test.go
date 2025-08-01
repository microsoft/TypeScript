package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestQuickInfoForContextuallyTypedParameters(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `declare function foo1<T>(obj: T, settings: (row: T) => { value: string, func?: Function }): void;

foo1(new Error(),
    o/*1*/ => ({
        value: o.name,
        func: x => 'foo'
    })
);

declare function foo2<T>(settings: (row: T) => { value: string, func?: Function }, obj: T): void;

foo2(o/*2*/ => ({
        value: o.name,
        func: x => 'foo'
    }),
    new Error(),
);

declare function foof<T extends { name: string }, U extends keyof T>(settings: (row: T) => { value: T[U], func?: Function }, obj: T, key: U): U;

function q<T extends { name: string }>(x: T): T["name"] {
    return foof/*3*/(o => ({ value: o.name, func: x => 'foo' }), x, "name");
}

foof/*4*/(o => ({ value: o.name, func: x => 'foo' }), new Error(), "name");`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "1", "(parameter) o: Error", "")
	f.VerifyQuickInfoAt(t, "2", "(parameter) o: Error", "")
	f.VerifyQuickInfoAt(t, "3", "function foof<T, \"name\">(settings: (row: T) => {\n    value: T[\"name\"];\n    func?: Function;\n}, obj: T, key: \"name\"): \"name\"", "")
	f.VerifyQuickInfoAt(t, "4", "function foof<Error, \"name\">(settings: (row: Error) => {\n    value: string;\n    func?: Function;\n}, obj: Error, key: \"name\"): \"name\"", "")
}
