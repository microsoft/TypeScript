package baseline

import (
	"fmt"
	"os"
	"path/filepath"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/repo"
	"github.com/microsoft/TypeScript/tsc/internal/stringutil"
	"github.com/peter-evans/patience"
)

type Options struct {
	Subfolder       string
	DiffFixupOld    func(string) string
	DiffFixupNew    func(string) string
	SkipDiffWithOld bool
}

const NoContent = "<no content>"

func Run(t *testing.T, fileName string, actual string, opts Options) {
	subfolder := opts.Subfolder
	localPath := filepath.Join(localRoot, subfolder, fileName)
	referencePath := filepath.Join(referenceRoot, subfolder, fileName)
	recordBaseline(t, filepath.Join(subfolder, fileName))
	writeComparison(t, actual, localPath, referencePath)
}

func DiffText(oldName string, newName string, expected string, actual string) string {
	lines := patience.Diff(stringutil.SplitLines(expected), stringutil.SplitLines(actual))
	return patience.UnifiedDiffTextWithOptions(lines, patience.UnifiedDiffOptions{
		Precontext:  3,
		Postcontext: 3,
		SrcHeader:   oldName,
		DstHeader:   newName,
	})
}

func writeComparison(t *testing.T, actualContent string, local, reference string) {
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
	if expected == actualContent && !(actualContent == NoContent && foundExpected) {
		return
	}
	if actualContent == NoContent {
		if err := os.WriteFile(local+".delete", []byte{}, 0o644); err != nil {
			t.Error(fmt.Errorf("failed to write the local baseline file %s: %w", local+".delete", err))
		}
		return
	}
	if err := os.WriteFile(local, []byte(actualContent), 0o644); err != nil {
		t.Error(fmt.Errorf("failed to write the local baseline file %s: %w", local, err))
		return
	}
	if !foundExpected {
		t.Errorf("new baseline created at %s.", local)
		return
	}
	t.Errorf("the baseline file %s has changed. (Run `hereby baseline-accept` if the new baseline is correct.)", reference)
}

var (
	localRoot     = filepath.Join(repo.TestDataPath(), "baselines", "local")
	referenceRoot = filepath.Join(repo.TestDataPath(), "baselines", "reference")
)
