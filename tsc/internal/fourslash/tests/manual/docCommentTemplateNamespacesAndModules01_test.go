package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestDocCommentTemplateNamespacesAndModules01(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `/*namespaceN*/
namespace n {
}

/*namespaceM*/
namespace m {
}

/*ambientModule*/
module "ambientModule" {
}`
	capabilities := fourslash.GetDefaultCapabilities()
	capabilities.TextDocument.Completion.CompletionItem.SnippetSupport = new(false)
	f, done := fourslash.NewFourslash(t, capabilities, content)
	defer done()
	f.VerifyJSDocCompletion(t, "namespaceN", 3, `/** */`, nil)
	f.VerifyJSDocCompletion(t, "namespaceM", 3, `/** */`, nil)
	f.VerifyJSDocCompletion(t, "ambientModule", 3, `/** */`, nil)
}
