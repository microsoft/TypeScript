package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestTsxGoToDefinitionClasses(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `//@Filename: file.tsx
declare module JSX {
    interface Element { }
    interface IntrinsicElements { }
    interface ElementAttributesProperty { props; }
}
class /*ct*/MyClass {
    props: {
        /*pt*/foo: string;
    }
}
var x = <[|My/*c*/Class|] />;
var y = <MyClass [|f/*p*/oo|]= 'hello' />;
var z = <[|MyCl/*w*/ass|] wrong= 'hello' />;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineGoToDefinition(t, "c", "p", "w")
}
