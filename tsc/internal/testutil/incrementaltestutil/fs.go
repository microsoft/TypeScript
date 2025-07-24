package incrementaltestutil

import (
	"encoding/json"
	"fmt"

	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/incremental"
	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/microsoft/typescript-go/internal/vfs"
)

var fakeTsVersion = "FakeTSVersion"

type FsHandlingBuildInfo struct {
	vfs.FS
}

// ReadFile reads the file specified by path and returns the content.
// If the file fails to be read, ok will be false.
func (f *FsHandlingBuildInfo) ReadFile(path string) (contents string, ok bool) {
	contents, ok = f.FS.ReadFile(path)
	if ok && tspath.FileExtensionIs(path, tspath.ExtensionTsBuildInfo) {
		// read buildinfo and modify version
		var buildInfo incremental.BuildInfo
		err := json.Unmarshal([]byte(contents), &buildInfo)
		if err == nil && buildInfo.Version == fakeTsVersion {
			buildInfo.Version = core.Version()
			newContents, err := json.Marshal(&buildInfo)
			if err != nil {
				panic("testFs.ReadFile: failed to marshal build info after fixing version: " + err.Error())
			}
			contents = string(newContents)
		}
	}
	return contents, ok
}

func (f *FsHandlingBuildInfo) WriteFile(path string, data string, writeByteOrderMark bool) error {
	if tspath.FileExtensionIs(path, tspath.ExtensionTsBuildInfo) {
		var buildInfo incremental.BuildInfo
		if err := json.Unmarshal([]byte(data), &buildInfo); err == nil {
			if buildInfo.Version == core.Version() {
				// Change it to fakeTsVersion
				buildInfo.Version = fakeTsVersion
				newData, err := json.Marshal(&buildInfo)
				if err != nil {
					return fmt.Errorf("testFs.WriteFile: failed to marshal build info after fixing version: %w", err)
				}
				data = string(newData)
			}
			// Write readable build info version
			if err := f.FS.WriteFile(path+".readable.baseline.txt", toReadableBuildInfo(&buildInfo, data), false); err != nil {
				return fmt.Errorf("testFs.WriteFile: failed to write readable build info: %w", err)
			}
		}
	}
	return f.FS.WriteFile(path, data, writeByteOrderMark)
}
