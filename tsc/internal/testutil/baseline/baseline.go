package baseline

import (
	"fmt"
	"os"
	"path/filepath"
	"regexp"
	"strings"
	"sync"
	"testing"

	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/repo"
	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/pkg/diff"
	"gotest.tools/v3/assert"
)

type Options struct {
	Subfolder           string
	IsSubmodule         bool
	IsSubmoduleAccepted bool
	DiffFixupOld        func(string) string
}

const NoContent = "<no content>"

func Run(t *testing.T, fileName string, actual string, opts Options) {
	origSubfolder := opts.Subfolder

	{
		subfolder := opts.Subfolder
		if opts.IsSubmodule {
			subfolder = filepath.Join("submodule", subfolder)
		}

		localPath := filepath.Join(localRoot, subfolder, fileName)
		referencePath := filepath.Join(referenceRoot, subfolder, fileName)

		writeComparison(t, actual, localPath, referencePath, false)
	}

	if !opts.IsSubmodule {
		// Not a submodule, no diffs.
		return
	}

	submoduleReference := filepath.Join(submoduleReferenceRoot, fileName)
	submoduleExpected := readFileOrNoContent(submoduleReference)

	const (
		submoduleFolder         = "submodule"
		submoduleAcceptedFolder = "submoduleAccepted"
	)

	diffFileName := fileName + ".diff"
	isSubmoduleAccepted := opts.IsSubmoduleAccepted || submoduleAcceptedFileNames().Has(origSubfolder+"/"+diffFileName)

	outRoot := core.IfElse(isSubmoduleAccepted, submoduleAcceptedFolder, submoduleFolder)
	unusedOutRoot := core.IfElse(isSubmoduleAccepted, submoduleFolder, submoduleAcceptedFolder)

	{
		localPath := filepath.Join(localRoot, outRoot, origSubfolder, diffFileName)
		referencePath := filepath.Join(referenceRoot, outRoot, origSubfolder, diffFileName)

		diff := getBaselineDiff(t, actual, submoduleExpected, fileName, opts.DiffFixupOld)
		writeComparison(t, diff, localPath, referencePath, false)
	}

	// Delete the other diff file if it exists
	{
		localPath := filepath.Join(localRoot, unusedOutRoot, origSubfolder, diffFileName)
		referencePath := filepath.Join(referenceRoot, unusedOutRoot, origSubfolder, diffFileName)
		writeComparison(t, NoContent, localPath, referencePath, false)
	}
}

var submoduleAcceptedFileNames = sync.OnceValue(func() *core.Set[string] {
	var set core.Set[string]

	submoduleAccepted := filepath.Join(repo.TestDataPath, "submoduleAccepted.txt")
	if content, err := os.ReadFile(submoduleAccepted); err == nil {
		for line := range strings.SplitSeq(string(content), "\n") {
			line = strings.TrimSpace(line)
			if line == "" || line[0] == '#' {
				continue
			}
			set.Add(line)
		}
	} else {
		panic(fmt.Sprintf("failed to read submodule accepted file: %v", err))
	}

	return &set
})

func readFileOrNoContent(fileName string) string {
	content, err := os.ReadFile(fileName)
	if err != nil {
		return NoContent
	}
	return string(content)
}

func getBaselineDiff(t *testing.T, actual string, expected string, fileName string, fixupOld func(string) string) string {
	if fixupOld != nil {
		expected = fixupOld(expected)
	}
	if actual == expected {
		return NoContent
	}
	var b strings.Builder
	if err := diff.Text("old."+fileName, "new."+fileName, expected, actual, &b); err != nil {
		return fmt.Sprintf("failed to diff the actual and expected content: %v\n", err)
	}

	// Remove line numbers from unified diff headers; this avoids adding/deleting
	// lines in our baselines from causing knock-on header changes later in the diff.
	s := b.String()

	aCurLine := 1
	bCurLine := 1
	s = fixUnifiedDiff.ReplaceAllStringFunc(s, func(match string) string {
		var aLine, aLineCount, bLine, bLineCount int
		if _, err := fmt.Sscanf(match, "@@ -%d,%d +%d,%d @@", &aLine, &aLineCount, &bLine, &bLineCount); err != nil {
			panic(fmt.Sprintf("failed to parse unified diff header: %v", err))
		}
		aDiff := aLine - aCurLine
		bDiff := bLine - bCurLine
		aCurLine = aLine
		bCurLine = bLine

		// Keep surrounded by @@, to make GitHub's grammar happy.
		// https://github.com/textmate/diff.tmbundle/blob/0593bb775eab1824af97ef2172fd38822abd97d7/Syntaxes/Diff.plist#L68
		return fmt.Sprintf("@@= skipped -%d, +%d lines =@@", aDiff, bDiff)
	})

	return s
}

var fixUnifiedDiff = regexp.MustCompile(`@@ -\d+,\d+ \+\d+,\d+ @@`)

func RunAgainstSubmodule(t *testing.T, fileName string, actual string, opts Options) {
	local := filepath.Join(localRoot, opts.Subfolder, fileName)
	reference := filepath.Join(submoduleReferenceRoot, opts.Subfolder, fileName)
	writeComparison(t, actual, local, reference, true)
}

func writeComparison(t *testing.T, actualContent string, local, reference string, comparingAgainstSubmodule bool) {
	if actualContent == "" {
		panic("the generated content was \"\". Return 'baseline.NoContent' if no baselining is required.")
	}

	if err := os.MkdirAll(filepath.Dir(local), 0o755); err != nil {
		t.Error(fmt.Errorf("failed to create directories for the local baseline file %s: %w", local, err))
		return
	}

	if _, err := os.Stat(local); err == nil {
		if err := os.Remove(local); err != nil {
			t.Error(fmt.Errorf("failed to remove the local baseline file %s: %w", local, err))
			return
		}
	}

	expected := NoContent
	foundExpected := false
	if content, err := os.ReadFile(reference); err == nil {
		expected = string(content)
		foundExpected = true
	}

	if expected != actualContent || actualContent == NoContent && foundExpected {
		if actualContent == NoContent {
			if err := os.WriteFile(local+".delete", []byte{}, 0o644); err != nil {
				t.Error(fmt.Errorf("failed to write the local baseline file %s: %w", local+".delete", err))
				return
			}
		} else {
			if err := os.WriteFile(local, []byte(actualContent), 0o644); err != nil {
				t.Error(fmt.Errorf("failed to write the local baseline file %s: %w", local, err))
				return
			}
		}

		relReference, err := filepath.Rel(repo.RootPath, reference)
		assert.NilError(t, err)
		relReference = tspath.NormalizeSlashes(relReference)

		relLocal, err := filepath.Rel(repo.RootPath, local)
		assert.NilError(t, err)
		relLocal = tspath.NormalizeSlashes(relLocal)

		if _, err := os.Stat(reference); err != nil {
			if comparingAgainstSubmodule {
				t.Errorf("the baseline file %s does not exist in the TypeScript submodule", relReference)
			} else {
				t.Errorf("new baseline created at %s.", relLocal)
			}
		} else if comparingAgainstSubmodule {
			t.Errorf("the baseline file %s does not match the reference in the TypeScript submodule", relReference)
		} else {
			t.Errorf("the baseline file %s has changed. (Run `hereby baseline-accept` if the new baseline is correct.)", relReference)
		}
	}
}

var (
	localRoot              = filepath.Join(repo.TestDataPath, "baselines", "local")
	referenceRoot          = filepath.Join(repo.TestDataPath, "baselines", "reference")
	submoduleReferenceRoot = filepath.Join(repo.TypeScriptSubmodulePath, "tests", "baselines", "reference")
)
