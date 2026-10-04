package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestContentMapperDeclarationMapNavigation(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `
// @Filename: /node_modules/component/package.json
{
    "name": "component",
    "version": "1.0.0",
    "types": "component.d.vue.ts"
}

// @Filename: /node_modules/component/component.vue
export interface ComponentProps { emoji: "😀"; label: string; }
export declare const /*source*/component: ComponentProps;

// @Filename: /node_modules/component/component.d.vue.ts
export interface ComponentProps {
    emoji: "😀";
    label: string;
}
export declare const component: ComponentProps;
//# sourceMappingURL=component.d.vue.ts.map

// @Filename: /node_modules/component/component.d.vue.ts.map
{"version":3,"file":"component.d.vue.ts","sourceRoot":"","sources":["component.vue"],"names":[],"mappings":"AAAA,MAAM,WAAW,cAAc;IAAG,KAAK,EAAE,IAAI,CAAC;IAAC,KAAK,EAAE,MAAM,CAAC;CAAE;AAC/D,MAAM,CAAC,OAAO,CAAC,MAAM,SAAS,EAAE,cAAc,CAAC"}

// @Filename: /main.ts
import { component } from "component";
/*use*/component.label;
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.MarkTestAsStradaServer()
	f.VerifyBaselineGoToDefinition(t, true, "use")
	f.VerifyBaselineFindAllReferences(t, "use")
}
