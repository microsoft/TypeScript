package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestGoToImplementationReexportedTypeOnlyNamespace2(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `
// @Filename: /node_modules/@typescript-eslint/types/index.d.ts
export type * as TSESTree from './generated/ast-spec';

// @Filename: /node_modules/@typescript-eslint/types/generated/ast-spec.d.ts
export interface BaseNode {}

// @Filename: /node_modules/@typescript-eslint/utils/index.d.ts
export { TSESTree } from '@typescript-eslint/types';

// @Filename: /src/check-license.ts
import type {TSE/*impl*/STree} from '@typescript-eslint/utils';

let node: TSESTree.Node | undefined;
export default node;
`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.VerifyBaselineGoToImplementation(t, "impl")
}
