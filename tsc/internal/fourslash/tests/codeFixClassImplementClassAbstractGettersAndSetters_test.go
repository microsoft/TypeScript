package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCodeFixClassImplementClassAbstractGettersAndSetters(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `abstract class A {
    abstract get a(): string;
    abstract set a(newName: string);

    abstract get b(): number;

    abstract set c(arg: number | string);

    abstract accessor d: string;
}

class C implements A {}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCodeFix(t, fourslash.VerifyCodeFixOptions{
		Description: "Implement interface 'A'",
		NewFileContent: `abstract class A {
    abstract get a(): string;
    abstract set a(newName: string);

    abstract get b(): number;

    abstract set c(arg: number | string);

    abstract accessor d: string;
}

class C implements A {
    get a(): string {
        throw new Error("Method not implemented.");
    }
    set a(newName: string) {
        throw new Error("Method not implemented.");
    }
    get b(): number {
        throw new Error("Method not implemented.");
    }
    set c(arg: string | number) {
        throw new Error("Method not implemented.");
    }
    accessor d: string;
}`,
		Index: 0,
	})
}
