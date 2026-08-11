package nativepath

import (
	"os"
	"path/filepath"
	"testing"

	"gotest.tools/v3/assert"
)

func TestRealpathHardlinkedFile(t *testing.T) {
	tmp := t.TempDir()
	real := filepath.Join(tmp, "real.d.ts")
	alias := filepath.Join(tmp, "alias.d.ts")
	assert.NilError(t, os.WriteFile(real, []byte("export * from './lib';\n"), 0o666))
	assert.NilError(t, os.Link(real, alias))

	want, err := filepath.EvalSymlinks(alias)
	assert.NilError(t, err)

	stop := make(chan struct{})
	done := make(chan struct{})
	workerErr := make(chan error, 1)
	go func() {
		defer close(done)
		for {
			select {
			case <-stop:
				return
			default:
			}

			f, err := os.Open(real)
			if err == nil {
				err = f.Close()
			}
			if err != nil {
				workerErr <- err
				return
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
	select {
	case err := <-workerErr:
		assert.NilError(t, err)
	default:
	}
}
