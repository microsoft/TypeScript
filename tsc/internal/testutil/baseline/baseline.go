package baseline

import (
	"fmt"
	"os"
	"path/filepath"

	"github.com/microsoft/typescript-go/internal/repo"
)

type Options struct {
	Subfolder string
}

const NoContent = "<no content>"

func Run(fileName string, actual string, opts Options) error {
	if actual == "" {
		panic("The generated content was \"\". Return 'baseline.NoContent' if no baselining is required.")
	}

	return writeComparison(actual, fileName, opts)
}

func writeComparison(actual string, relativeFileName string, opts Options) error {
	localFileName := localPath(relativeFileName, opts.Subfolder)
	referenceFileName := referencePath(relativeFileName, opts.Subfolder)
	expected := getExpectedContent(relativeFileName, opts)
	if _, err := os.Stat(localFileName); err == nil {
		if err := os.Remove(localFileName); err != nil {
			return fmt.Errorf("Failed to remove the local baseline file %s: %w", localFileName, err)
		}
	}
	if actual != expected {
		if err := os.MkdirAll(filepath.Dir(localFileName), 0755); err != nil {
			return fmt.Errorf("Failed to create directories for the local baseline file %s: %w", localFileName, err)
		}
		if actual == NoContent {
			if err := os.WriteFile(localFileName+".delete", []byte{}, 0644); err != nil {
				return fmt.Errorf("Failed to write the local baseline file %s: %w", localFileName+".delete", err)
			}
		} else {
			if err := os.WriteFile(localFileName, []byte(actual), 0644); err != nil {
				return fmt.Errorf("Failed to write the local baseline file %s: %w", localFileName, err)
			}
		}

		if _, err := os.Stat(referenceFileName); err != nil {
			return fmt.Errorf("The baseline file %s has changed. (Run `hereby baseline-accept` if the new baseline is correct.)", relativeFileName)
		}
		return fmt.Errorf("New baseline created at %s.", localFileName)
	}
	return nil
}

func getExpectedContent(relativeFileName string, opts Options) string {
	refFileName := referencePath(relativeFileName, opts.Subfolder)
	expected := NoContent
	content, err := os.ReadFile(refFileName)
	if err == nil {
		expected = string(content)
	}
	return expected
}

func localPath(fileName string, subfolder string) string {
	return filepath.Join(repo.TestDataPath, "baselines", "local", subfolder, fileName)
}

func referencePath(fileName string, subfolder string) string {
	return filepath.Join(repo.TestDataPath, "baselines", "reference", subfolder, fileName)
}
