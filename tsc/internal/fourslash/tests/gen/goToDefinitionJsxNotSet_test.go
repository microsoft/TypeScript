package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToDefinitionJsxNotSet(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @allowJs: true
// @Filename: /foo.jsx
const /*def*/Foo = () => (
    <div>foo</div>
);
export default Foo;
// @Filename: /bar.jsx
import Foo from './foo';
const a = <[|/*use*/Foo|] />`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.VerifyBaselineGoToDefinition(t, "use")
}
