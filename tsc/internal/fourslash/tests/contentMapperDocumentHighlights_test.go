package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/testutil"
	"github.com/microsoft/typescript-go/internal/testutil/contentmappertest"
)

func TestContentMapperDocumentHighlights(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	f, done := newContentMapperFourslash(t, `// @Filename: /ProfileCard.vue
<component name="ProfileCard">
<template>
  <h1>{{ [|ti/*template*/tle|] }}</h1>
  <p class="card/*markup*/">Profile</p>
</template>
<script lang="ts">
export const [|ti/*script*/tle|] = "Profile";
export const heading = [|title|].toUpperCase();
</script>
`, contentmappertest.ComponentMapper, ".vue")
	defer done()

	f.VerifyBaselineDocumentHighlights(t, nil /*preferences*/, "script", "template", "markup")
}
