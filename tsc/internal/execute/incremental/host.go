package incremental

import (
	"time"

	"github.com/microsoft/typescript-go/internal/compiler"
	"github.com/microsoft/typescript-go/internal/vfs"
)

type Host interface {
	FS() vfs.FS
	GetMTime(fileName string) time.Time
	SetMTime(fileName string, mTime time.Time) error
}

type host struct {
	host compiler.CompilerHost
}

var _ Host = (*host)(nil)

func (h *host) FS() vfs.FS {
	return h.host.FS()
}

func (h *host) GetMTime(fileName string) time.Time {
	return GetMTime(h.host, fileName)
}

func (h *host) SetMTime(fileName string, mTime time.Time) error {
	return h.host.FS().Chtimes(fileName, time.Time{}, mTime)
}

func CreateHost(compilerHost compiler.CompilerHost) Host {
	return &host{host: compilerHost}
}

func GetMTime(host compiler.CompilerHost, fileName string) time.Time {
	stat := host.FS().Stat(fileName)
	var mTime time.Time
	if stat != nil {
		mTime = stat.ModTime()
	}
	return mTime
}
