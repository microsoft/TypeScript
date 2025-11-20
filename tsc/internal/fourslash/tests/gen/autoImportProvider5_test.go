package fourslash_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

func TestAutoImportProvider5(t *testing.T) {
	t.Parallel()

	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @Filename: /home/src/workspaces/project/package.json
{ "dependencies": { "react-hook-form": "*" } }
// @Filename: /home/src/workspaces/project/node_modules/react-hook-form/package.json
{ "types": "dist/index.d.ts" }
// @Filename: /home/src/workspaces/project/node_modules/react-hook-form/dist/index.d.ts
export * from "./useForm";
// @Filename: /home/src/workspaces/project/node_modules/react-hook-form/dist/useForm.d.ts
export declare function useForm(): void;
// @Filename: /home/src/workspaces/project/index.ts
useForm/**/`
	f := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	f.MarkTestAsStradaServer()
	f.GoToMarker(t, "")
	f.VerifyImportFixAtPosition(t, []string{
		`import { useForm } from "react-hook-form";

useForm`,
		`import { useForm } from "react-hook-form/dist/useForm";

useForm`,
	}, nil /*preferences*/)
}
