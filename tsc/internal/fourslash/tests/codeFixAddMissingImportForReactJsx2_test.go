package fourslash_test

import (
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/fourslash"
	"github.com/microsoft/TypeScript/tsc/internal/testutil"
)

func TestCodeFixAddMissingImportForReactJsx2(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")
	const content = `// @jsx: react-jsxdev
// @Filename: node_modules/react/index.d.ts
export declare var React: any;
// @Filename: node_modules/react/package.json
{
  "name": "react",
  "types": "./index.d.ts"
}
// @Filename: foo.tsx
 export default function Foo(){
     return <></>;
 }
// @Filename: bar.tsx
 export default function Bar(){
     return <Foo></Foo>;
 }
// @Filename: package.json
{
  "dependencies": {
    "react": "*"
  }
}`
	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content)
	defer done()
	f.GoToFile(t, "bar.tsx")
	f.VerifyCodeFixAll(t, fourslash.VerifyCodeFixAllOptions{
		FixID: "fixMissingImport",
		NewFileContent: `import Foo from "./foo";

export default function Bar(){
    return <Foo></Foo>;
}`,
	})
}
