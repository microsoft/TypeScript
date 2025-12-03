package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestAutoImportPackageJsonFilterExistingImport2(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @module: preserve
// @Filename: /home/src/workspaces/project/node_modules/@types/react/index.d.ts
export declare function useMemo(): void;
export declare function useState(): void;
// @Filename: /home/src/workspaces/project/package.json
{}
// @Filename: /home/src/workspaces/project/index.ts
useMemo/**/`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.MarkTestAsStradaServer()
	f.GoToMarker(t, "")
	f.VerifyImportFixAtPosition(t, []string{}, nil /*preferences*/)
	f.GoToBOF(t)
	f.InsertLine(t, "import { useState } from \"react\";")
	f.GoToMarker(t, "")
	f.VerifyImportFixAtPosition(t, []string{
		`import { useMemo, useState } from "react";
useMemo`,
	}, nil /*preferences*/)
}
