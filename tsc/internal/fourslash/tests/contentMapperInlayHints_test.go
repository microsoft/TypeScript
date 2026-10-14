package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsutil"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
	"github.com/microsoft/TypeScript/tsc/internal/testutil/contentmappertest"
)

func TestContentMapperInlayHintsReleaseEachRange(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	// The mapper emits the script verbatim followed by:
	//
	// function __render() {
	//   void (value);
	//   void (value);
	//   void (value);
	//   void (value);
	// }
	// export default {};
	//
	// The script and four template identifiers map to five disjoint virtual ranges.
	// Each range must release its checker before processing the next range.
	f, done := newContentMapperFourslash(t, `// @Filename: /app.vue
<script>
const value = () => 1;
</script>
{{value}}
{{value}}
{{value}}
{{value}}
`, contentmappertest.ComponentMapper, ".vue")
	defer done()

	f.GoToFile(t, "/app.vue")
	f.VerifyBaselineInlayHints(t, nil, &lsutil.UserPreferences{
		IncludeInlayVariableTypeHints: core.TSTrue,
	})
}
