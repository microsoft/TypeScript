package fourslash_test

import (
	"strings"
	"testing"

	"github.com/microsoft/typescript-go/internal/fourslash"
	"github.com/microsoft/typescript-go/internal/testutil"
)

// A single file that imports the same *unresolvable* module many times used to force
// file-rename to rescan every file in the program once per import, producing
// O(imports * files) work and multi-second renames on large codebases
// (microsoft/typescript-go#4610). The rename must still complete and update the
// resolvable relative import to the renamed file, leaving the unresolvable imports alone.
func TestGetEditsForFileRename_duplicateUnresolvedImports(t *testing.T) {
	t.Parallel()
	defer testutil.RecoverAndFail(t, "Panic on fourslash test")

	const numFiles = 60   // simulates a large program
	const numImports = 60 // simulates the pathological repeated-import file

	var content strings.Builder
	content.WriteString("// @Filename: /tsconfig.json\n{ \"compilerOptions\": { \"allowJs\": true } }\n")

	for i := range numFiles {
		fi := itoaSmall(i)
		content.WriteString("// @Filename: /src/file" + fi + ".ts\nexport const v" + fi + " = " + fi + ";\n")
	}

	// The pathological file: imports the same unresolvable module many times,
	// plus one resolvable relative import that should be updated by the rename.
	content.WriteString("// @Filename: /pkg/ugly.ts\n")
	for range numImports {
		content.WriteString("import \"@some/unresolved-module\";\n")
	}
	content.WriteString("import { v0 } from \"../src/file0\";\n")

	f, done := fourslash.NewFourslash(t, nil /*capabilities*/, content.String())
	defer done()

	var expected strings.Builder
	for range numImports {
		expected.WriteString("import \"@some/unresolved-module\";\n")
	}
	expected.WriteString("import { v0 } from \"../src/file0-renamed\";\n")

	f.VerifyWillRenameFilesEdits(t, "/src/file0.ts", "/src/file0-renamed.ts", map[string]string{
		"/pkg/ugly.ts": expected.String(),
	}, nil /*preferences*/)
}

func itoaSmall(n int) string {
	if n == 0 {
		return "0"
	}
	var b []byte
	for n > 0 {
		b = append([]byte{byte('0' + n%10)}, b...)
		n /= 10
	}
	return string(b)
}
