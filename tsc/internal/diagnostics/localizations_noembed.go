//go:build noembed

package diagnostics

import (
	"errors"
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
			return "", errors.New("could not get current filename")
		}
		return filepath.Join(filepath.Dir(filepath.FromSlash(filename)), "loc"), nil //nolint:forbidigo // This is an OS path, not a TypeScript path.
	}
	executable, err := osutil.Executable()
	if err != nil {
		return "", fmt.Errorf("failed to get executable path: %w", err)
	}
	executable, err = nativepath.Realpath(executable)
	if err != nil {
		return "", fmt.Errorf("failed to resolve executable path: %w", err)
	}
	return filepath.Join(filepath.Dir(executable), "loc"), nil //nolint:forbidigo // This is an OS path, not a TypeScript path.
})

func readLocaleFile(localeName string) (string, error) {
	dir, err := localeDir()
	if err != nil {
		return "", err
	}
	filename := filepath.Join(dir, localeName+".generated.json") //nolint:forbidigo // This is an OS path, not a TypeScript path.
	data, err := os.ReadFile(filename)                           //nolint:forbidigo // Locale files are loaded directly from the installation.
	if err != nil {
		return "", err
	}
	return string(data), nil
}
