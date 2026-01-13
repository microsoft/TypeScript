package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

// TestAutoImportReexportOfCrossPackageAugmentation verifies no crash when auto-importing
// from a package that re-exports from another package that is also augmented.
func TestAutoImportReexportOfCrossPackageAugmentation(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /node_modules/vitest/package.json
{ "name": "vitest", "version": "1.0.0", "types": "index.d.ts" }
// @Filename: /node_modules/vitest/index.d.ts
export { AugmentedInterface, uniqueFunction } from "@vitest/expect";
// @Filename: /node_modules/vitest/augmentation.d.ts
export {};
declare module "@vitest/expect" {
    interface AugmentedInterface {
        bar: string;
    }
		function uniqueFunction(): void;
}
// @Filename: /node_modules/@vitest/expect/package.json
{ "name": "@vitest/expect", "version": "1.0.0", "types": "index.d.ts" }
// @Filename: /node_modules/@vitest/expect/index.d.ts
export interface AugmentedInterface {
    baz: number;
}
// @Filename: /tsconfig.json
{ "compilerOptions": { "module": "commonjs", "strict": true } }
// @Filename: /package.json
{ "name": "test", "dependencies": { "vitest": "*" } }
// @Filename: /index.ts
uniqueFunction/**/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()

	f.GoToMarker(t, "")
	f.BaselineAutoImportsCompletions(t, []string{""})
}
