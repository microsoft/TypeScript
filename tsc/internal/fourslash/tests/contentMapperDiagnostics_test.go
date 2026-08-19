package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/testutil"
	"github.com/microsoft/typescript-go/internal/testutil/contentmappertest"
)

func TestContentMapperDiagnostics(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	f, done := newContentMapperFourslash(t, `// @Filename: /ProfileCard.vue
<component name="ProfileCard">
<template>
  <h1>{{ [|missingTitle|] }}</h1>
  <p>{{ takesNumber([|title + suffix|]) }}</p>
</template>
<script lang="ts">
export const [|bad|]: number = "wrong";
const title = "Profile";
const suffix = "!";
function takesNumber(value: number) { return value; }
</script>
`, contentmappertest.ComponentMapper, ".vue")
	defer done()

	f.VerifyBaselineNonSuggestionDiagnostics(t)
}

func TestContentMapperSynthesizedDiagnostics(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	f, done := newContentMapperFourslash(t, `// @Filename: /ProfileCard.vue
<template><h1>Profile</h1></template>
`, contentmappertest.SynthesizingMapper, ".vue")
	defer done()

	f.VerifyBaselineNonSuggestionDiagnostics(t)
}

func TestContentMapperTransformFailureDiagnostics(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	f, done := newContentMapperFourslash(t, `// @Filename: /app.vue
[||]<template>hi</template>
`, contentmappertest.FailingMapper, ".vue")
	defer done()
	f.GoToFile(t, "/app.vue")

	f.VerifyNonSuggestionDiagnostics(t, []*lsproto.Diagnostic{
		{
			Code: &lsproto.IntegerOrString{Integer: new(int32(100025))},
			Message: lsproto.StringOrMarkupContent{String: new(
				"The content mapper 'mapper' failed to transform this file.\n  The content mapper process failed while handling the transform request.",
			)},
			Range: f.Ranges()[0].LSRange,
		},
	})
}
