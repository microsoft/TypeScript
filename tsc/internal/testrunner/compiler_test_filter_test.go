package testrunner

import (
	"testing"

	"gotest.tools/v3/assert"
)

func TestCompilerTestFileFilter(t *testing.T) {
	t.Parallel()
	tests := []struct {
		name     string
		pattern  string
		filename string
		included bool
	}{
		{"unfiltered", "", "other.ts", true},
		{"parentOnly", "TestLocal", "other.ts", true},
		{"filenamePrefix", "TestLocal/flakyDiagnostic1038", "flakyDiagnostic1038.ts", true},
		{"differentFilename", "TestLocal/flakyDiagnostic1038", "other.ts", false},
		{"substring", "TestLocal/Diagnostic1038", "flakyDiagnostic1038.ts", true},
		{"anchoredPrefix", "TestLocal/^lowercase", "lowercase.ts", true},
		{"anchoredMismatch", "TestLocal/^lowercase", "other.ts", false},
		{"unanchoredLowercaseFallback", "TestLocal/target", "other.ts", true},
		{"configuration", `TestLocal/^Example\.ts_target=es2020$`, "Example.ts", true},
		{"configurationSubstring", `TestLocal/Example\.ts_target=es2020$`, "someExample.ts", true},
		{"differentConfigurationFile", `TestLocal/^Example\.ts_target=es2020$`, "other.ts", false},
		{"spaceConfigurationFallback", `TestLocal/Example\.ts target=es2020/error`, "Example.ts", true},
		{"anchoredSpaceConfigurationFallback", `TestLocal/^Example\.ts target=es2020$`, "Example.ts", true},
		{"tabConfigurationFallback", "TestLocal/Example\\.ts\ttarget=es2020/error", "Example.ts", true},
		{"unicodeSpaceFallback", "TestLocal/^Example\u00a0Name", "Example_Name.ts", true},
		{"nonPrintablePatternFallback", "TestLocal/^Example\x00Name", "other.ts", true},
		{"escapedWhitespacePrefixFallback", `TestLocal/^Example\x20Name`, "other.ts", true},
		{"whitespaceFilenameFallback", "TestLocal/^Example_Name", "Example Name.ts", true},
		{"nonPrintableFilenameFallback", `TestLocal/^Example\\x00Name`, "Example\x00Name.ts", true},
		{"nestedSubtest", "TestLocal/flakyDiagnostic1038/error", "flakyDiagnostic1038.ts", true},
		{"caseInsensitiveFallback", "TestLocal/(?i)Example", "other.ts", true},
		{"alternationFallback", "TestLocal/Example|TestLocal/Other", "Other.ts", true},
		{"groupFallback", "TestLocal/(Example|Other)", "Other.ts", true},
		{"groupedSlash", "TestLocal/(Example/Other)", "other.ts", false},
		{"classSlashFallback", "TestLocal/[A/B]", "other.ts", true},
		{"escapedSlash", `TestLocal/Example\/Other`, "other.ts", false},
		{"invalidExpressionFallback", "TestLocal/(", "other.ts", true},
		{"anchoredParent", "^TestLocal$/Example", "Example.ts", true},
	}
	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			t.Parallel()
			assert.Equal(t, compilerTestFileFilter(test.pattern)(test.filename), test.included)
		})
	}
}
