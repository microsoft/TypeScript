package nativepath

import (
	"os"
	"path/filepath"
	"testing"

	"gotest.tools/v3/assert"
)

func TestRealpathHardlinkedFile(t *testing.T) {
	t.Parallel()

	tmp := t.TempDir()
	realPath := filepath.Join(tmp, "real.d.ts")
	alias := filepath.Join(tmp, "alias.d.ts")
	assert.NilError(t, os.WriteFile(realPath, []byte("export * from './lib';\n"), 0o666))
	assert.NilError(t, os.Link(realPath, alias))

	want, err := filepath.EvalSymlinks(alias)
	assert.NilError(t, err)

	stop := make(chan struct{})
	done := make(chan struct{})
	workerErr := make(chan error, 1)
	go func() {
		defer close(done)
		defer close(workerErr)
		for {
			select {
			case <-stop:
				return
			default:
				f, openErr := os.Open(realPath)
				if openErr == nil {
					openErr = f.Close()
				}
				if openErr != nil {
					workerErr <- openErr
					return
				}
			}
		}
	}()

	stopped := false
	stopWorker := func() {
		if !stopped {
			close(stop)
			<-done
			stopped = true
		}
	}
	defer stopWorker()

	for range 200 {
		got, err := Realpath(alias)
		assert.NilError(t, err)
		assert.Equal(t, got, want)
	}

	stopWorker()
	for err := range workerErr {
		assert.NilError(t, err)
	}
}
