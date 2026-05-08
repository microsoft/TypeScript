package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

// Test that auto-imports for JSX tags don't crash when React is type-imported.
// When both the JSX namespace (React) and the component need to be imported,
// getSymbolNamesToImport returns multiple names and the type-only promotion
// path should handle this gracefully instead of panicking.
func TestCodeFixPromoteTypeOnlyImportJsxTag(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @module: preserve
// @verbatimModuleSyntax: true
// @jsx: react
// @Filename: /react.ts
const React: any = {};
export default React;
// @Filename: /bar.tsx
import type React from "./react";

<Foo/**/ />;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "")
	// The fix should promote the type-only import of React to a regular import.
	// The "Cannot find name 'Foo'" error does not produce an auto-import for
	// React since it's already imported (as type-only, handled by promotion).
	f.VerifyImportFixAtPosition(t, []string{
		`import React from "./react";

<Foo />;`,
	}, nil /*preferences*/)
}

// Test edge case where both the component name (Foo) and the JSX namespace (React)
// are type-only imported. Each diagnostic is matched to its symbol via the error
// message, so each produces only its own promotion fix (no duplicates).
func TestCodeFixPromoteTypeOnlyImportJsxTagBothTypeOnly(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @module: preserve
// @verbatimModuleSyntax: true
// @jsx: react
// @Filename: /react.ts
const React: any = {};
export default React;
// @Filename: /foo.ts
export function Foo() { return null; }
// @Filename: /bar.tsx
import type React from "./react";
import type { Foo } from "./foo";

<Foo/**/ />;`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToMarker(t, "")
	// Both Foo and React are type-only imported. The error message string
	// matching disambiguates which diagnostic is about which symbol, so each
	// diagnostic produces only its own promotion fix (no duplicates).
	f.VerifyImportFixAtPosition(t, []string{
		`import type React from "./react";
import { Foo } from "./foo";

<Foo />;`,
		`import React from "./react";
import type { Foo } from "./foo";

<Foo />;`,
	}, nil /*preferences*/)
}
