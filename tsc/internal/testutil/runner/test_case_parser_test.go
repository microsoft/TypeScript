package runner

import (
	"testing"

	"github.com/google/go-cmp/cmp"
	"gotest.tools/v3/assert"
)

func TestMakeUnitsFromTest(t *testing.T) {
	t.Parallel()
	code := `// @strict: true
// @noEmit: true
// @filename: firstFile.ts
function foo() { return "a"; }
// normal comment
// @filename: secondFile.ts
// some other comment
function bar() { return "b"; }`
	testUnit1 := &testUnit{
		content: `function foo() { return "a"; }
// normal comment`,
		name: "firstFile.ts",
		fileOptions: map[string]string{
			"strict": "true",
			"noemit": "true",
		},
		originalFilePath: "simpleTest.ts",
	}
	testUnit2 := &testUnit{
		content: `// some other comment
function bar() { return "b"; }`,
		name:             "secondFile.ts",
		fileOptions:      map[string]string{},
		originalFilePath: "simpleTest.ts",
	}
	testContent := testCaseContent{
		settings: map[string]string{
			"strict":   "true",
			"noEmit":   "true",
			"filename": "secondFile.ts",
		},
		testUnitData:         []*testUnit{testUnit1, testUnit2},
		tsConfig:             nil,
		tsConfigFileUnitData: nil,
		symlinks:             nil,
	}
	assert.DeepEqual(
		t,
		makeUnitsFromTest(code, "simpleTest.ts", nil),
		testContent,
		cmp.AllowUnexported(testCaseContent{}, testUnit{}))
}
