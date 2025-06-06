package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestCompletionsImport_umdDefaultNoCrash2(t *testing.T) {
	t.Parallel()
	t.Skip()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @moduleResolution: node
// @allowJs: true
// @checkJs: true
// @Filename: /node_modules/dottie/package.json
{
  "name": "dottie",
  "main": "dottie.js"
}
// @Filename: /node_modules/dottie/dottie.js
(function (undefined) {
  var root = this;

  var Dottie = function () {};

  Dottie["default"] = function (object, path, value) {};

  if (typeof module !== "undefined" && module.exports) {
    exports = module.exports = Dottie;
  } else {
    root["Dottie"] = Dottie;
    root["Dot"] = Dottie;

    if (typeof define === "function") {
      define([], function () {
        return Dottie;
      });
    }
  }
})();
// @Filename: /src/index.js
import Dottie from 'dottie';
/**/`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyCompletions(t, "", &fourslash.VerifyCompletionsExpectedList{
		IsIncomplete: false,
		ItemDefaults: &lsproto.CompletionItemDefaults{
			CommitCharacters: &defaultCommitCharacters,
		},
		Items: &fourslash.VerifyCompletionsExpectedItems{
			Includes: []fourslash.ExpectedCompletionItem{&lsproto.CompletionItem{Label: "Dottie"}},
		},
	})
}
