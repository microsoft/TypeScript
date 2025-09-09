package incremental

import (
	"github.com/go-json-experiment/json"
	"github.com/microsoft/typescript-go/internal/compiler"
	"github.com/microsoft/typescript-go/internal/tsoptions"
)

type BuildInfoReader interface {
	ReadBuildInfo(config *tsoptions.ParsedCommandLine) *BuildInfo
}

var _ BuildInfoReader = (*buildInfoReader)(nil)

type buildInfoReader struct {
	host compiler.CompilerHost
}

func (r *buildInfoReader) ReadBuildInfo(config *tsoptions.ParsedCommandLine) *BuildInfo {
	buildInfoFileName := config.GetBuildInfoFileName()
	if buildInfoFileName == "" {
		return nil
	}

	// Read build info file
	data, ok := r.host.FS().ReadFile(buildInfoFileName)
	if !ok {
		return nil
	}
	var buildInfo BuildInfo
	err := json.Unmarshal([]byte(data), &buildInfo)
	if err != nil {
		return nil
	}
	return &buildInfo
}

func NewBuildInfoReader(
	host compiler.CompilerHost,
) BuildInfoReader {
	return &buildInfoReader{host: host}
}

func ReadBuildInfoProgram(config *tsoptions.ParsedCommandLine, reader BuildInfoReader, host compiler.CompilerHost) *Program {
	// Read buildInfo file
	buildInfo := reader.ReadBuildInfo(config)
	if buildInfo == nil || !buildInfo.IsValidVersion() || !buildInfo.IsIncremental() {
		return nil
	}

	// Convert to information that can be used to create incremental program
	incrementalProgram := &Program{
		snapshot: buildInfoToSnapshot(buildInfo, config, host),
	}
	return incrementalProgram
}
