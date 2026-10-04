package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCodeFixClassImplementInterfaceCallback(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `interface IFoo1 {
    parse(reviver: () => any): void;
}

class Foo1 implements IFoo1 {
}

interface IFoo2 {
    parse(reviver: { (): any }): void;
}

class Foo2 implements IFoo2 {
}

interface IFoo3 {
    parse(reviver: new () => any): void;
}

class Foo3 implements IFoo3 {
}

interface IFoo4 {
    parse(reviver: { new (): any }): void;
}

class Foo4 implements IFoo4 {
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCodeFixAll(t, fourslash.VerifyCodeFixAllOptions{
		FixID: "fixClassIncorrectlyImplementsInterface",
		NewFileContent: `interface IFoo1 {
    parse(reviver: () => any): void;
}

class Foo1 implements IFoo1 {
    parse(reviver: () => any): void {
        throw new Error("Method not implemented.");
    }
}

interface IFoo2 {
    parse(reviver: { (): any }): void;
}

class Foo2 implements IFoo2 {
    parse(reviver: { (): any; }): void {
        throw new Error("Method not implemented.");
    }
}

interface IFoo3 {
    parse(reviver: new () => any): void;
}

class Foo3 implements IFoo3 {
    parse(reviver: new () => any): void {
        throw new Error("Method not implemented.");
    }
}

interface IFoo4 {
    parse(reviver: { new (): any }): void;
}

class Foo4 implements IFoo4 {
    parse(reviver: { new(): any; }): void {
        throw new Error("Method not implemented.");
    }
}`,
	})
}
