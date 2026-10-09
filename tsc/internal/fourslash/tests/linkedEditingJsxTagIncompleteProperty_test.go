package fourslash_test

import (
	"fmt"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestLinkedEditingJsxTagIncompleteProperty(t *testing.T) {
	t.Parallel()
	for _, test := range []struct {
		name       string
		extension  string
		tagName    string
		closingTag string
		attributes string
	}{
		{"string attribute", "tsx", "A.", "A.", `foo="bar"`},
		{"JavaScript", "jsx", "A.", "A.", `foo="bar"`},
		{"expression attribute", "tsx", "A.", "A.", `foo={bar}`},
		{"hyphenated attribute", "tsx", "A.", "A.", `data-foo="bar"`},
		{"namespaced attribute", "tsx", "A.", "A.", `foo:bar="baz"`},
		{"keyword attribute", "tsx", "A.", "A.", `default="bar"`},
		{"nested property", "tsx", "A.B.", "A.B.", `foo="bar"`},
		{"multiline attribute", "tsx", "A.", "A.", "\nfoo=\"bar\""},
		{"spread attribute", "tsx", "A.", "A.", `{...props}`},
		{"complete property with whitespace", "tsx", "A. B", "A. B", `foo="bar"`},
		{"mismatched names", "tsx", "A.", "B.", `foo="bar"`},
	} {
		t.Run(test.name, func(t *testing.T) {
			t.Parallel()
			defer testutil.RecoverAndFail(t, "Panic on fourslash test")
			content := fmt.Sprintf(`// @allowJs: true
// @Filename: /incompleteProperty.%s
const a = () => </*openStart*/%s/*openEnd*/ /*attribute*/%s><//*closeStart*/%s/*closeEnd*/>;`, test.extension, test.tagName, test.attributes, test.closingTag)
			f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
			defer done()
			var ranges []lsproto.Range
			if test.tagName == test.closingTag {
				ranges = []lsproto.Range{
					{Start: f.MarkerByName(t, "openStart").LSPosition, End: f.MarkerByName(t, "openEnd").LSPosition},
					{Start: f.MarkerByName(t, "closeStart").LSPosition, End: f.MarkerByName(t, "closeEnd").LSPosition},
				}
			}
			f.VerifyLinkedEditing(t, map[string][]lsproto.Range{
				"openStart":  ranges,
				"openEnd":    ranges,
				"closeStart": ranges,
				"closeEnd":   ranges,
				"attribute":  nil,
			})
		})
	}
}
