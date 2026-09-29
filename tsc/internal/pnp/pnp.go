package pnp

import (
	"strings"

	"github.com/microsoft/TypeScript/tsc/internal/vfs"
)

func InitPnpApi(fs vfs.FS, filePath string) *PnpApi {
	pnpApi := &PnpApi{fs: fs, url: filePath}

	manifestData, err := pnpApi.findClosestPnpManifest()
	if err == nil {
		pnpApi.manifest = manifestData
		return pnpApi
	}

	return nil
}

func IsPnpLoaderFile(path string) bool {
	return strings.HasSuffix(path, ".pnp.cjs")
}
