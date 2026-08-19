package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/testutil"
	"github.com/microsoft/typescript-go/internal/testutil/contentmappertest"
)

func TestContentMapperImplementation(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	f, done := newContentMapperFourslash(t, `// @Filename: /models.ts
export class ExternalShape { area = 2 }

// @Filename: /ProfileCard.vue
<component name="ProfileCard">
<template>
  <p>{{ local/*template*/Shape.area }}</p>
  <span class="shape/*markup*/">Shape</span>
</template>
<script lang="ts">
import * as models from "./models";
export interface Local/*within*/Shape { area: number }
export class [|LocalSquare|] implements LocalShape { area = 1 }
export class [|ExternalSquare|] extends models.ExternalShape {}
const localShape: LocalShape = new LocalSquare();
models.External/*outgoing*/Shape;
</script>

// @Filename: /main.ts
import { LocalShape } from "./ProfileCard.vue";
let shape: Local/*incoming*/Shape;
`, contentmappertest.ComponentMapper, ".vue")
	defer done()

	f.VerifyBaselineGoToImplementation(t, "within", "template", "incoming", "outgoing", "markup")
}
