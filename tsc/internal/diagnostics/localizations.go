package diagnostics

import (
	"fmt"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/json"
)

func loadLocaleData(localeName string) map[Key]string {
	return loadLocaleDataWorker(localeName, testing.Testing())
}

func loadLocaleDataWorker(localeName string, panicOnError bool) map[Key]string {
	data, err := readLocaleFile(localeName)
	if err != nil {
		return handleLocaleError(localeName, err, panicOnError)
	}
	var result map[Key]string
	if err := json.Unmarshal([]byte(data), &result); err != nil {
		return handleLocaleError(localeName, err, panicOnError)
	}
	return result
}

func handleLocaleError(localeName string, err error, panicOnError bool) map[Key]string {
	if panicOnError {
		panic(fmt.Sprintf("failed to load locale data for %s: %v", localeName, err))
	}
	return nil
}
