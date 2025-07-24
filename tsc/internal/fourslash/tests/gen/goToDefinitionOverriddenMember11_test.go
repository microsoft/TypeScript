package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToDefinitionOverriddenMember11(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @allowJs: true
// @checkJs: true
// @noEmit: true
// @noImplicitOverride: true
// @filename: a.js
class Foo {
    /*Foo_m*/m() {}
}
class Bar extends Foo {
    /** @[|over{|"name": "1"|}ride|][| se{|"name": "2"|}e {@li{|"name": "3"|}nk https://test.c{|"name": "4"|}om} {|"name": "5"|}description |]*/
    m() {}
}`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineGoToDefinition(t, "1", "2", "3", "4", "5")
}
