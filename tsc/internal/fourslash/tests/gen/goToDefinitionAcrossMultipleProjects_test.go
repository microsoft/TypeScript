package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToDefinitionAcrossMultipleProjects(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `//@Filename: a.ts
var /*def1*/x: number;
//@Filename: b.ts
var /*def2*/x: number;
//@Filename: c.ts
var /*def3*/x: number;
//@Filename: d.ts
var /*def4*/x: number;
//@Filename: e.ts
/// <reference path="a.ts" />
/// <reference path="b.ts" />
/// <reference path="c.ts" />
/// <reference path="d.ts" />
[|/*use*/x|]++;`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineGoToDefinition(t, "use")
}
