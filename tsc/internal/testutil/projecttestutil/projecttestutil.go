package projecttestutil

import (
	"context"
	"fmt"
	"slices"
	"strings"
	"sync"
	"testing"

	"github.com/microsoft/typescript-go/internal/bundled"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/project"
	"github.com/microsoft/typescript-go/internal/project/logging"
	"github.com/microsoft/typescript-go/internal/testutil/baseline"
	"github.com/microsoft/typescript-go/internal/vfs"
	"github.com/microsoft/typescript-go/internal/vfs/vfstest"
)

//go:generate go tool github.com/matryer/moq -stub -fmt goimports -pkg projecttestutil -out clientmock_generated.go ../../project Client
//go:generate go tool mvdan.cc/gofumpt -lang=go1.25 -w clientmock_generated.go

//go:generate go tool github.com/matryer/moq -stub -fmt goimports -pkg projecttestutil -out npmexecutormock_generated.go ../../project/ata NpmExecutor
//go:generate go tool mvdan.cc/gofumpt -lang=go1.24 -w npmexecutormock_generated.go

const (
	TestTypingsLocation = "/home/src/Library/Caches/typescript"
)

type TypingsInstallerOptions struct {
	TypesRegistry []string
	PackageToFile map[string]string
}

type SessionUtils struct {
	fs          vfs.FS
	client      *ClientMock
	npmExecutor *NpmExecutorMock
	tiOptions   *TypingsInstallerOptions
	logger      logging.LogCollector
}

func (h *SessionUtils) Client() *ClientMock {
	return h.client
}

func (h *SessionUtils) NpmExecutor() *NpmExecutorMock {
	return h.npmExecutor
}

func (h *SessionUtils) SetupNpmExecutorForTypingsInstaller() {
	if h.tiOptions == nil {
		return
	}

	h.npmExecutor.NpmInstallFunc = func(cwd string, packageNames []string) ([]byte, error) {
		// packageNames is actually npmInstallArgs due to interface misnaming
		npmInstallArgs := packageNames
		lenNpmInstallArgs := len(npmInstallArgs)
		if lenNpmInstallArgs < 3 {
			return nil, fmt.Errorf("unexpected npm install: %s %v", cwd, npmInstallArgs)
		}

		if lenNpmInstallArgs == 3 && npmInstallArgs[2] == "types-registry@latest" {
			// Write typings file
			err := h.fs.WriteFile(cwd+"/node_modules/types-registry/index.json", h.createTypesRegistryFileContent(), false)
			return nil, err
		}

		// Find the packages: they start at index 2 and continue until we hit a flag starting with --
		packageEnd := lenNpmInstallArgs
		for i := 2; i < lenNpmInstallArgs; i++ {
			if strings.HasPrefix(npmInstallArgs[i], "--") {
				packageEnd = i
				break
			}
		}

		for _, atTypesPackageTs := range npmInstallArgs[2:packageEnd] {
			// @types/packageName@TsVersionToUse
			atTypesPackage := atTypesPackageTs
			// Remove version suffix
			if versionIndex := strings.LastIndex(atTypesPackage, "@"); versionIndex > 6 { // "@types/".length is 7, so version @ must be after
				atTypesPackage = atTypesPackage[:versionIndex]
			}
			// Extract package name from @types/packageName
			packageBaseName := atTypesPackage[7:] // Remove "@types/" prefix
			content, ok := h.tiOptions.PackageToFile[packageBaseName]
			if !ok {
				return nil, fmt.Errorf("content not provided for %s", packageBaseName)
			}
			err := h.fs.WriteFile(cwd+"/node_modules/@types/"+packageBaseName+"/index.d.ts", content, false)
			if err != nil {
				return nil, err
			}
		}
		return nil, nil
	}
}

func (h *SessionUtils) FS() vfs.FS {
	return h.fs
}

func (h *SessionUtils) Logs() string {
	return h.logger.String()
}

func (h *SessionUtils) BaselineLogs(t *testing.T) {
	baseline.Run(t, t.Name()+".log", h.Logs(), baseline.Options{
		Subfolder: "project",
	})
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

func (h *SessionUtils) createTypesRegistryFileContent() string {
	var builder strings.Builder
	builder.WriteString("{\n  \"entries\": {")
	for index, entry := range h.tiOptions.TypesRegistry {
		h.appendTypesRegistryConfig(&builder, index, entry)
	}
	index := len(h.tiOptions.TypesRegistry)
	for key := range h.tiOptions.PackageToFile {
		if !slices.Contains(h.tiOptions.TypesRegistry, key) {
			h.appendTypesRegistryConfig(&builder, index, key)
			index++
		}
	}
	builder.WriteString("\n  }\n}")
	return builder.String()
}

func (h *SessionUtils) appendTypesRegistryConfig(builder *strings.Builder, index int, entry string) {
	if index > 0 {
		builder.WriteString(",")
	}
	builder.WriteString(fmt.Sprintf("\n    \"%s\": {%s\n    }", entry, TypesRegistryConfigText()))
}

func Setup(files map[string]any) (*project.Session, *SessionUtils) {
	return SetupWithTypingsInstaller(files, &TypingsInstallerOptions{})
}

func SetupWithOptions(files map[string]any, options *project.SessionOptions) (*project.Session, *SessionUtils) {
	return SetupWithOptionsAndTypingsInstaller(files, options, &TypingsInstallerOptions{})
}

func SetupWithTypingsInstaller(files map[string]any, tiOptions *TypingsInstallerOptions) (*project.Session, *SessionUtils) {
	return SetupWithOptionsAndTypingsInstaller(files, nil, tiOptions)
}

func SetupWithOptionsAndTypingsInstaller(files map[string]any, options *project.SessionOptions, tiOptions *TypingsInstallerOptions) (*project.Session, *SessionUtils) {
	fs := bundled.WrapFS(vfstest.FromMap(files, false /*useCaseSensitiveFileNames*/))
	clientMock := &ClientMock{}
	npmExecutorMock := &NpmExecutorMock{}
	sessionUtils := &SessionUtils{
		fs:          fs,
		client:      clientMock,
		npmExecutor: npmExecutorMock,
		tiOptions:   tiOptions,
		logger:      logging.NewTestLogger(),
	}

	// Configure the npm executor mock to handle typings installation
	sessionUtils.SetupNpmExecutorForTypingsInstaller()

	// Use provided options or create default ones
	if options == nil {
		options = &project.SessionOptions{
			CurrentDirectory:   "/",
			DefaultLibraryPath: bundled.LibPath(),
			TypingsLocation:    TestTypingsLocation,
			PositionEncoding:   lsproto.PositionEncodingKindUTF8,
			WatchEnabled:       true,
			LoggingEnabled:     true,
		}
	}

	session := project.NewSession(&project.SessionInit{
		Options:     options,
		FS:          fs,
		Client:      clientMock,
		NpmExecutor: npmExecutorMock,
		Logger:      sessionUtils.logger,
	})

	return session, sessionUtils
}

func WithRequestID(ctx context.Context) context.Context {
	return core.WithRequestID(ctx, "0")
}
