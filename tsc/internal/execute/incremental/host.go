package incremental

import (
	"time"

	"github.com/microsoft/TypeScript/tsc/internal/compiler"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
)

type Host interface {
	GetMTime(fileName tspath.RootedFilePath) time.Time
	SetMTime(fileName tspath.RootedFilePath, mTime time.Time) error
}

type host struct {
	host compiler.CompilerHost
}

var _ Host = (*host)(nil)

func (h *host) GetMTime(fileName tspath.RootedFilePath) time.Time {
	return GetMTime(h.host, fileName)
}

func (h *host) SetMTime(fileName tspath.RootedFilePath, mTime time.Time) error {
	return h.host.FS().Chtimes(fileName.AsPath(), time.Time{}, mTime)
}

func CreateHost(compilerHost compiler.CompilerHost) Host {
	return &host{host: compilerHost}
}

func GetMTime(host compiler.CompilerHost, fileName tspath.RootedFilePath) time.Time {
	stat := host.FS().Stat(fileName.AsPath())
	var mTime time.Time
	if stat != nil {
		mTime = stat.ModTime()
	}
	return mTime
}
