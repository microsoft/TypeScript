package projecttestutil

import (
	"context"
	"fmt"
	"io"
	"slices"
	"strings"
	"sync"

	"github.com/microsoft/typescript-go/internal/bundled"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/project"
	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/microsoft/typescript-go/internal/vfs"
	"github.com/microsoft/typescript-go/internal/vfs/vfstest"
)

//go:generate go tool github.com/matryer/moq -stub -fmt goimports -pkg projecttestutil -out clientmock_generated.go ../../project Client

type TestTypingsInstallerOptions struct {
	TypesRegistry []string
	PackageToFile map[string]string
}

type TestTypingsInstaller struct {
	project.TypingsInstallerOptions
	TestTypingsInstallerOptions
}

type ProjectServiceHost struct {
	fs                 vfs.FS
	mu                 sync.Mutex
	defaultLibraryPath string
	output             strings.Builder
	logger             *project.Logger
	ClientMock         *ClientMock
	testOptions        *TestTypingsInstallerOptions
	ServiceOptions     *project.ServiceOptions
}

const (
	TestTypingsLocation = "/home/src/Library/Caches/typescript"
	TestLibLocation     = "/home/src/tslibs/TS/Lib"
)

// DefaultLibraryPath implements project.ProjectServiceHost.
func (p *ProjectServiceHost) DefaultLibraryPath() string {
	return p.defaultLibraryPath
}

func (p *ProjectServiceHost) TypingsLocation() string {
	return TestTypingsLocation
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

// Client implements project.ProjectServiceHost.
func (p *ProjectServiceHost) Client() project.Client {
	return p.ClientMock
}

func (p *ProjectServiceHost) ReplaceFS(files map[string]any) {
	p.fs = bundled.WrapFS(vfstest.FromMap(files, false /*useCaseSensitiveFileNames*/))
}

var _ project.ServiceHost = (*ProjectServiceHost)(nil)

func Setup(files map[string]any, testOptions *TestTypingsInstaller) (*project.Service, *ProjectServiceHost) {
	host := newProjectServiceHost(files)
	if testOptions != nil {
		host.testOptions = &testOptions.TestTypingsInstallerOptions
	}
	var throttleLimit int
	if testOptions != nil && testOptions.ThrottleLimit != 0 {
		throttleLimit = testOptions.ThrottleLimit
	} else {
		throttleLimit = 5
	}
	host.ServiceOptions = &project.ServiceOptions{
		Logger:       host.logger,
		WatchEnabled: true,
		TypingsInstallerOptions: project.TypingsInstallerOptions{
			ThrottleLimit: throttleLimit,

			NpmInstall:    host.NpmInstall,
			InstallStatus: make(chan project.TypingsInstallerStatus),
		},
	}
	service := project.NewService(host, *host.ServiceOptions)
	return service, host
}

func (p *ProjectServiceHost) NpmInstall(cwd string, npmInstallArgs []string) ([]byte, error) {
	if p.testOptions == nil {
		return nil, nil
	}

	lenNpmInstallArgs := len(npmInstallArgs)
	if lenNpmInstallArgs < 3 {
		panic(fmt.Sprintf("Unexpected npm install: %s %v", cwd, npmInstallArgs))
	}

	if lenNpmInstallArgs == 3 && npmInstallArgs[2] == "types-registry@latest" {
		// Write typings file
		err := p.FS().WriteFile(tspath.CombinePaths(cwd, "node_modules/types-registry/index.json"), p.createTypesRegistryFileContent(), false)
		return nil, err
	}

	for _, atTypesPackageTs := range npmInstallArgs[2 : lenNpmInstallArgs-2] {
		// @types/packageName@TsVersionToUse
		packageName := atTypesPackageTs[7 : len(atTypesPackageTs)-len(project.TsVersionToUse)-1]
		content, ok := p.testOptions.PackageToFile[packageName]
		if !ok {
			return nil, fmt.Errorf("content not provided for %s", packageName)
		}
		err := p.FS().WriteFile(tspath.CombinePaths(cwd, "node_modules/@types/"+packageName+"/index.d.ts"), content, false)
		if err != nil {
			return nil, err
		}
	}
	return nil, nil
}

var (
	typesRegistryConfigTextOnce sync.Once
	typesRegistryConfigText     string
)

func TypesRegistryConfigText() string {
	typesRegistryConfigTextOnce.Do(func() {
		var result strings.Builder
		for key, value := range TypesRegistryConfig() {
			if result.Len() != 0 {
				result.WriteString(",")
			}
			result.WriteString(fmt.Sprintf("\n      \"%s\": \"%s\"", key, value))

		}
		typesRegistryConfigText = result.String()
	})
	return typesRegistryConfigText
}

var (
	typesRegistryConfigOnce sync.Once
	typesRegistryConfig     map[string]string
)

func TypesRegistryConfig() map[string]string {
	typesRegistryConfigOnce.Do(func() {
		typesRegistryConfig = map[string]string{
			"latest": "1.3.0",
			"ts2.0":  "1.0.0",
			"ts2.1":  "1.0.0",
			"ts2.2":  "1.2.0",
			"ts2.3":  "1.3.0",
			"ts2.4":  "1.3.0",
			"ts2.5":  "1.3.0",
			"ts2.6":  "1.3.0",
			"ts2.7":  "1.3.0",
		}
	})
	return typesRegistryConfig
}

func (p *ProjectServiceHost) createTypesRegistryFileContent() string {
	var builder strings.Builder
	builder.WriteString("{\n  \"entries\": {")
	for index, entry := range p.testOptions.TypesRegistry {
		appendTypesRegistryConfig(&builder, index, entry)
	}
	index := len(p.testOptions.TypesRegistry)
	for key := range p.testOptions.PackageToFile {
		if !slices.Contains(p.testOptions.TypesRegistry, key) {
			appendTypesRegistryConfig(&builder, index, key)
			index++
		}
	}
	builder.WriteString("\n  }\n}")
	return builder.String()
}

func appendTypesRegistryConfig(builder *strings.Builder, index int, entry string) {
	if index > 0 {
		builder.WriteString(",")
	}
	builder.WriteString(fmt.Sprintf("\n    \"%s\": {%s\n    }", entry, TypesRegistryConfigText()))
}

func newProjectServiceHost(files map[string]any) *ProjectServiceHost {
	fs := bundled.WrapFS(vfstest.FromMap(files, false /*useCaseSensitiveFileNames*/))
	host := &ProjectServiceHost{
		fs:                 fs,
		defaultLibraryPath: bundled.LibPath(),
		ClientMock:         &ClientMock{},
	}
	host.logger = project.NewLogger([]io.Writer{&host.output}, "", project.LogLevelVerbose)
	return host
}

func WithRequestID(ctx context.Context) context.Context {
	return core.WithRequestID(ctx, "0")
}
