package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestOrganizeImports_dtsUnusedImportWithAugmentation(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /styled-patch.d.ts
import * as styledComponents from 'styled-components';

declare module 'styled-components' {
    interface ThemedStyledComponentsModule {
        keyframes(): Keyframes;
    }
}
// @Filename: /node_modules/styled-components/index.d.ts
export interface Keyframes {}
export interface ThemedStyledComponentsModule {}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyOrganizeImports(
		t,
		`import 'styled-components';

declare module 'styled-components' {
    interface ThemedStyledComponentsModule {
        keyframes(): Keyframes;
    }
}`,
		lsproto.CodeActionKindSourceOrganizeImportsTs,
		nil,
	)
}
