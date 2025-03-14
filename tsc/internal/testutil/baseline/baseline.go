package baseline

import (
	"fmt"
	"os"
	"path/filepath"
	"regexp"
	"strings"
	"testing"

	"github.com/microsoft/typescript-go/internal/repo"
	"github.com/pkg/diff"
)

type Options struct {
	Subfolder    string
	IsSubmodule  bool
	DiffFixupOld func(string) string
}

const (
	NoContent       = "<no content>"
	submoduleFolder = "submodule"
)

func Run(t *testing.T, fileName string, actual string, opts Options) {
	if opts.IsSubmodule {
		opts.Subfolder = filepath.Join(submoduleFolder, opts.Subfolder)
		diff := getBaselineDiff(t, actual, fileName, opts.DiffFixupOld)
		diffFileName := fileName + ".diff"
		writeComparison(t, diff, diffFileName, false, opts)
	}
	writeComparison(t, actual, fileName, false, opts)
}

func getBaselineDiff(t *testing.T, actual string, fileName string, fixupOld func(string) string) string {
	expected := NoContent
	refFileName := submoduleReferencePath(fileName, "" /*subfolder*/)
	if content, err := os.ReadFile(refFileName); err == nil {
		expected = string(content)
	}
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
	writeComparison(t, actual, fileName, true /*useSubmodule*/, opts)
}

func writeComparison(t *testing.T, actual string, relativeFileName string, useSubmodule bool, opts Options) {
	if actual == "" {
		panic("the generated content was \"\". Return 'baseline.NoContent' if no baselining is required.")
	}
	var (
		localFileName     string
		referenceFileName string
	)

	if useSubmodule {
		localFileName = submoduleLocalPath(relativeFileName, opts.Subfolder)
		referenceFileName = submoduleReferencePath(relativeFileName, opts.Subfolder)
	} else {
		localFileName = localPath(relativeFileName, opts.Subfolder)
		referenceFileName = referencePath(relativeFileName, opts.Subfolder)
	}

	if err := os.MkdirAll(filepath.Dir(localFileName), 0o755); err != nil {
		t.Error(fmt.Errorf("failed to create directories for the local baseline file %s: %w", localFileName, err))
		return
	}

	if _, err := os.Stat(localFileName); err == nil {
		if err := os.Remove(localFileName); err != nil {
			t.Error(fmt.Errorf("failed to remove the local baseline file %s: %w", localFileName, err))
			return
		}
	}

	expected := NoContent
	foundExpected := false
	if content, err := os.ReadFile(referenceFileName); err == nil {
		expected = string(content)
		foundExpected = true
	}

	if expected != actual || actual == NoContent && foundExpected {
		if actual == NoContent {
			if err := os.WriteFile(localFileName+".delete", []byte{}, 0o644); err != nil {
				t.Error(fmt.Errorf("failed to write the local baseline file %s: %w", localFileName+".delete", err))
				return
			}
		} else {
			if err := os.WriteFile(localFileName, []byte(actual), 0o644); err != nil {
				t.Error(fmt.Errorf("failed to write the local baseline file %s: %w", localFileName, err))
				return
			}
		}

		if _, err := os.Stat(referenceFileName); err != nil {
			if useSubmodule {
				t.Errorf("the baseline file %s does not exist in the TypeScript submodule", referenceFileName)
			} else {
				t.Errorf("new baseline created at %s.", localFileName)
			}
		} else if useSubmodule {
			t.Errorf("the baseline file %s does not match the reference in the TypeScript submodule", relativeFileName)
		} else {
			t.Errorf("the baseline file %s has changed. (Run `hereby baseline-accept` if the new baseline is correct.)", relativeFileName)
		}
	}
}

func localPath(fileName string, subfolder string) string {
	return filepath.Join(repo.TestDataPath, "baselines", "local", subfolder, fileName)
}

func submoduleLocalPath(fileName string, subfolder string) string {
	return filepath.Join(repo.TestDataPath, "baselines", "tmp", subfolder, fileName)
}

func referencePath(fileName string, subfolder string) string {
	return filepath.Join(repo.TestDataPath, "baselines", "reference", subfolder, fileName)
}

func submoduleReferencePath(fileName string, subfolder string) string {
	return filepath.Join(repo.TypeScriptSubmodulePath, "tests", "baselines", "reference", subfolder, fileName)
}
