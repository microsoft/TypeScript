package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToDefinitionModifiers(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /a.ts
/*export*/export class A/*A*/ {

    /*private*/private z/*z*/: string;

    /*readonly*/readonly x/*x*/: string;

    /*async*/async a/*a*/() {  }

    /*override*/override b/*b*/() {}

    /*public1*/public/*public2*/ as/*multipleModifiers*/ync c/*c*/() { }
}

exp/*exportFunction*/ort function foo/*foo*/() { }`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineGoToDefinition(t, "export", "A", "private", "z", "readonly", "x", "async", "a", "override", "b", "public1", "public2", "multipleModifiers", "c", "exportFunction", "foo")
}
