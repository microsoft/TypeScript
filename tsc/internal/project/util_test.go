package project_test

import (
	"testing"

	"github.com/microsoft/typescript-go/internal/project"
	"github.com/microsoft/typescript-go/internal/tspath"
	"gotest.tools/v3/assert"
)

func configFileExists(t *testing.T, service *project.Service, path tspath.Path, exists bool) {
	t.Helper()
	_, loaded := service.ConfigFileRegistry().ConfigFiles.Load(path)
	assert.Equal(t, loaded, exists, "config file %s should exist: %v", path, exists)
}

func serviceToPath(service *project.Service, fileName string) tspath.Path {
	return tspath.ToPath(fileName, service.GetCurrentDirectory(), service.FS().UseCaseSensitiveFileNames())
}
