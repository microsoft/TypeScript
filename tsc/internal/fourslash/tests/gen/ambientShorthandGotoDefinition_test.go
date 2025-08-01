package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestAmbientShorthandGotoDefinition(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: declarations.d.ts
declare module /*module*/"jquery"
// @Filename: user.ts
///<reference path="declarations.d.ts"/>
import [|/*importFoo*/foo|], {bar} from "jquery";
import * as [|/*importBaz*/baz|] from "jquery";
import [|/*importBang*/bang|] = require("jquery");
[|foo/*useFoo*/|]([|bar/*useBar*/|], [|baz/*useBaz*/|], [|bang/*useBang*/|]);`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyQuickInfoAt(t, "useFoo", "(alias) module \"jquery\"\nimport foo", "")
	f.VerifyQuickInfoAt(t, "useBar", "(alias) module \"jquery\"\nimport bar", "")
	f.VerifyQuickInfoAt(t, "useBaz", "(alias) module \"jquery\"\nimport baz", "")
	f.VerifyQuickInfoAt(t, "useBang", "(alias) module \"jquery\"\nimport bang = require(\"jquery\")", "")
	f.VerifyBaselineGoToDefinition(t, "useFoo", "importFoo", "useBar", "useBaz", "importBaz", "useBang", "importBang")
}
