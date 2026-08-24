//go:build noembed

package diagnostics

import (
	"fmt"
	"os"
	"path/filepath"
	"runtime"
	"sync"
	"testing"

	"github.com/microsoft/TypeScript/tsc/internal/nativepath"
	"github.com/microsoft/TypeScript/tsc/internal/osutil"
)

var localeDir = sync.OnceValues(func() (string, error) {
	if testing.Testing() {
		_, filename, _, ok := runtime.Caller(0)
		if !ok {
			return "", fmt.Errorf("could not get current filename")
		}
		return filepath.Join(filepath.Dir(filepath.FromSlash(filename)), "loc"), nil
	}
	executable, err := osutil.Executable()
	if err != nil {
		return "", fmt.Errorf("failed to get executable path: %w", err)
	}
	executable, err = nativepath.Realpath(executable)
	if err != nil {
		return "", fmt.Errorf("failed to resolve executable path: %w", err)
	}
	return filepath.Join(filepath.Dir(executable), "loc"), nil
})

func readLocaleFile(localeName string) (string, error) {
	dir, err := localeDir()
	if err != nil {
		return "", err
	}
	filename := filepath.Join(dir, localeName+".generated.json")
	data, err := os.ReadFile(filename)
	if err != nil {
		return "", err
	}
	return string(data), nil
}
