package incremental

import (
	"time"

	"github.com/microsoft/typescript-go/internal/compiler"
)

type Host interface {
	GetMTime(fileName string) time.Time
	SetMTime(fileName string, mTime time.Time) error
}

type host struct {
	host compiler.CompilerHost
}

var _ Host = (*host)(nil)

func (b *host) GetMTime(fileName string) time.Time {
	return GetMTime(b.host, fileName)
}

func (b *host) SetMTime(fileName string, mTime time.Time) error {
	return b.host.FS().Chtimes(fileName, time.Time{}, mTime)
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
