package pprof

import (
	"bytes"
	"compress/gzip"
	"io"
	"os"
	"path/filepath"
	"strings"
	"sync"
	"testing"

	"gotest.tools/v3/assert"
)

func TestProfileSessionStop(t *testing.T) { //nolint:paralleltest // CPU profiling is process-global.
	var output bytes.Buffer
	profileDir := t.TempDir()
	session := BeginProfiling(profileDir, &output)
	t.Cleanup(session.Stop)

	var wg sync.WaitGroup
	for range 8 {
		wg.Go(session.Stop)
	}
	wg.Wait()
	session.Stop()

	assert.Equal(t, strings.Count(output.String(), "CPU profile:"), 1)
	assert.Equal(t, strings.Count(output.String(), "Memory profile:"), 1)
	profiles, err := filepath.Glob(filepath.Join(profileDir, "*.pb.gz"))
	assert.NilError(t, err)
	assert.Equal(t, len(profiles), 2)
	for _, profile := range profiles {
		data, err := os.ReadFile(profile)
		assert.NilError(t, err)
		reader, err := gzip.NewReader(bytes.NewReader(data))
		assert.NilError(t, err)
		content, err := io.ReadAll(reader)
		assert.NilError(t, err)
		assert.NilError(t, reader.Close())
		assert.Assert(t, len(content) > 0, "empty profile: %s", profile)
	}
}
