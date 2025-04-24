package projecttestutil

import (
	"fmt"
	"io"
	"strings"
	"sync"

	"github.com/microsoft/typescript-go/internal/bundled"
	"github.com/microsoft/typescript-go/internal/project"
	"github.com/microsoft/typescript-go/internal/vfs"
	"github.com/microsoft/typescript-go/internal/vfs/vfstest"
)

type ProjectServiceHost struct {
	fs                 vfs.FS
	mu                 sync.Mutex
	defaultLibraryPath string
	output             strings.Builder
	logger             *project.Logger
}

// DefaultLibraryPath implements project.ProjectServiceHost.
func (p *ProjectServiceHost) DefaultLibraryPath() string {
	return p.defaultLibraryPath
}

// FS implements project.ProjectServiceHost.
func (p *ProjectServiceHost) FS() vfs.FS {
	return p.fs
}

// GetCurrentDirectory implements project.ProjectServiceHost.
func (p *ProjectServiceHost) GetCurrentDirectory() string {
	return "/"
}

// Log implements project.ProjectServiceHost.
func (p *ProjectServiceHost) Log(msg ...any) {
	p.mu.Lock()
	defer p.mu.Unlock()
	fmt.Fprintln(&p.output, msg...)
}

// NewLine implements project.ProjectServiceHost.
func (p *ProjectServiceHost) NewLine() string {
	return "\n"
}

func (p *ProjectServiceHost) ReplaceFS(files map[string]string) {
	p.fs = bundled.WrapFS(vfstest.FromMap(files, false /*useCaseSensitiveFileNames*/))
}

var _ project.ServiceHost = (*ProjectServiceHost)(nil)

func Setup(files map[string]string) (*project.Service, *ProjectServiceHost) {
	host := newProjectServiceHost(files)
	service := project.NewService(host, project.ServiceOptions{
		Logger: host.logger,
	})
	return service, host
}

func newProjectServiceHost(files map[string]string) *ProjectServiceHost {
	fs := bundled.WrapFS(vfstest.FromMap(files, false /*useCaseSensitiveFileNames*/))
	host := &ProjectServiceHost{
		fs:                 fs,
		defaultLibraryPath: bundled.LibPath(),
	}
	host.logger = project.NewLogger([]io.Writer{&host.output}, "", project.LogLevelVerbose)
	return host
}
