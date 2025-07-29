package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	. "github.com/microsoft/typescript-go/internal/fourslash/tests/util"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionsJSDocNoCrash1(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @strict: true
// @checkJs: true
// @allowJs: true
// @filename: index.js
/**
 * @example
  <file name="glyphicons.css">
    @import url(//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap-glyphicons.css);
  </file>
  <example module="ngAnimate" deps="angular-animate.js" animations="true">
    <file name="animations.css">
      .animate-show.ng-hide-add.ng-hide-add-active,
      .animate-show.ng-hide-remove.ng-hide-remove-active {
        transition:all linear 0./**/5s;
      }
    </file>
  </example>
 */
var ngShowDirective = ['$animate', function($animate) {}];`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, "", &fourslash.CompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &fourslash.CompletionsExpectedItemDefaults{
			CommitCharacters: &[]string{},
			EditRange:        Ignored,
		},
		Items: &fourslash.CompletionsExpectedItems{
			Includes: []fourslash.CompletionsExpectedItem{
				"url",
			},
		},
	})
}
