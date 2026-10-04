package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCodeFixClassImplementClassPropertyModifiers(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @strict: false
abstract class A {
    abstract x: number;
    private y: number;
    protected z: number;
    public w: number;
    public useY() { this.y; }
}

class C implements A {[| |]}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyCodeFix(t, fourslash.VerifyCodeFixOptions{
		Description: "Implement interface 'A'",
		NewFileContent: `abstract class A {
    abstract x: number;
    private y: number;
    protected z: number;
    public w: number;
    public useY() { this.y; }
}

class C implements A {
    x: number;
    protected z: number;
    public w: number;
    public useY(): void {
        throw new Error("Method not implemented.");
    }
}`,
		Index: 0,
	})
}
