package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToDefinitionDecorator(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: b.ts
@[|/*decoratorUse*/decorator|]
class C {
    @[|decora/*decoratorFactoryUse*/torFactory|](a, "22", true)
    method() {}
}
// @Filename: a.ts
function /*decoratorDefinition*/decorator(target) {
    return target;
}
function /*decoratorFactoryDefinition*/decoratorFactory(...args) {
    return target => target;
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineGoToDefinition(t, "decoratorUse", "decoratorFactoryUse")
}
