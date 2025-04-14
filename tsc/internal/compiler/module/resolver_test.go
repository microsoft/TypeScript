package module_test

import (
	"bytes"
	"encoding/json"
	"os"
	"path/filepath"
	"regexp"
	"slices"
	"sync"
	"testing"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/compiler/module"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/repo"
	"github.com/microsoft/typescript-go/internal/testutil/baseline"
	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/microsoft/typescript-go/internal/vfs"
	"github.com/microsoft/typescript-go/internal/vfs/vfstest"
	"gotest.tools/v3/assert"
	"gotest.tools/v3/assert/cmp"
)

var skip = []string{
	"allowJsCrossMonorepoPackage.ts",
	"APILibCheck.ts",
	"APISample_compile.ts",
	"APISample_jsdoc.ts",
	"APISample_linter.ts",
	"APISample_parseConfig.ts",
	"APISample_transform.ts",
	"APISample_Watch.ts",
	"APISample_watcher.ts",
	"APISample_WatchWithDefaults.ts",
	"APISample_WatchWithOwnWatchHost.ts",
	"bundlerNodeModules1(module=esnext).ts",
	"bundlerNodeModules1(module=preserve).ts",
	"commonJsExportTypeDeclarationError.ts",
	"commonSourceDir5.ts",
	"commonSourceDirectory.ts",
	"computedEnumMemberSyntacticallyString2(isolatedmodules=false).ts",
	"computedEnumMemberSyntacticallyString2(isolatedmodules=true).ts",
	"declarationEmitCommonSourceDirectoryDoesNotContainAllFiles.ts",
	"declarationEmitForGlobalishSpecifierSymlink.ts",
	"declarationEmitForGlobalishSpecifierSymlink2.ts",
	"declarationEmitReexportedSymlinkReference.ts",
	"declarationEmitReexportedSymlinkReference2.ts",
	"declarationEmitReexportedSymlinkReference3.ts",
	"declarationEmitSymlinkPaths.ts",
	"decoratorMetadataTypeOnlyExport.ts",
	"decoratorMetadataTypeOnlyImport.ts",
	"enumNoInitializerFollowsNonLiteralInitializer.ts",
	"enumWithNonLiteralStringInitializer.ts",
	"es6ImportWithJsDocTags.ts",
	"importAttributes9.ts",
	"importSpecifiers_js.ts",
	"importTag17.ts",
	"isolatedModulesShadowGlobalTypeNotValue(isolatedmodules=false,verbatimmodulesyntax=false).ts",
	"isolatedModulesShadowGlobalTypeNotValue(isolatedmodules=false,verbatimmodulesyntax=true).ts",
	"isolatedModulesShadowGlobalTypeNotValue(isolatedmodules=true,verbatimmodulesyntax=false).ts",
	"isolatedModulesShadowGlobalTypeNotValue(isolatedmodules=true,verbatimmodulesyntax=true).ts",
	"jsDeclarationEmitExportedClassWithExtends.ts",
	"jsxNamespaceGlobalReexport.tsx",
	"jsxNamespaceGlobalReexportMissingAliasTarget.tsx",
	"mergeSymbolReexportedTypeAliasInstantiation.ts",
	"mergeSymbolReexportInterface.ts",
	"mergeSymbolRexportFunction.ts",
	"missingMemberErrorHasShortPath.ts",
	"moduleResolutionAsTypeReferenceDirective.ts",
	"moduleResolutionAsTypeReferenceDirectiveAmbient.ts",
	"moduleResolutionAsTypeReferenceDirectiveScoped.ts",
	"moduleResolutionWithSymlinks_notInNodeModules.ts",
	"moduleResolutionWithSymlinks_preserveSymlinks.ts",
	"moduleResolutionWithSymlinks_referenceTypes.ts",
	"moduleResolutionWithSymlinks_withOutDir.ts",
	"moduleResolutionWithSymlinks.ts",
	"nodeAllowJsPackageSelfName2.ts",
	"nodeModulesAllowJsConditionalPackageExports(module=node16).ts",
	"nodeModulesAllowJsConditionalPackageExports(module=nodenext).ts",
	"nodeModulesAllowJsPackageExports(module=node16).ts",
	"nodeModulesAllowJsPackageExports(module=nodenext).ts",
	"nodeModulesAllowJsPackagePatternExports(module=node16).ts",
	"nodeModulesAllowJsPackagePatternExports(module=nodenext).ts",
	"nodeModulesAllowJsPackagePatternExportsTrailers(module=node16).ts",
	"nodeModulesAllowJsPackagePatternExportsTrailers(module=nodenext).ts",
	"nodeModulesDeclarationEmitWithPackageExports(module=node16).ts",
	"nodeModulesDeclarationEmitWithPackageExports(module=nodenext).ts",
	"nodeModulesExportsBlocksTypesVersions(module=node16).ts",
	"nodeModulesExportsBlocksTypesVersions(module=nodenext).ts",
	"nodeModulesImportResolutionIntoExport(module=node16).ts",
	"nodeModulesImportResolutionIntoExport(module=nodenext).ts",
	"nodeModulesImportResolutionNoCycle(module=node16).ts",
	"nodeModulesImportResolutionNoCycle(module=nodenext).ts",
	"nodeModulesPackageExports(module=node16).ts",
	"nodeModulesPackageExports(module=nodenext).ts",
	"nodeModulesPackagePatternExports(module=node16).ts",
	"nodeModulesPackagePatternExports(module=nodenext).ts",
	"nodeModulesPackagePatternExportsExclude(module=node16).ts",
	"nodeModulesPackagePatternExportsExclude(module=nodenext).ts",
	"nodeModulesPackagePatternExportsTrailers(module=node16).ts",
	"nodeModulesPackagePatternExportsTrailers(module=nodenext).ts",
	"nodeNextImportModeImplicitIndexResolution.ts",
	"nodeNextImportModeImplicitIndexResolution2.ts",
	"nodeNextPackageImportMapRootDir.ts",
	"nodeNextPackageSelfNameWithOutDir.ts",
	"nodeNextPackageSelfNameWithOutDirDeclDir.ts",
	"nodeNextPackageSelfNameWithOutDirDeclDirComposite.ts",
	"nodeNextPackageSelfNameWithOutDirDeclDirCompositeNestedDirs.ts",
	"nodeNextPackageSelfNameWithOutDirDeclDirNestedDirs.ts",
	"nodeNextPackageSelfNameWithOutDirDeclDirRootDir.ts",
	"nodeNextPackageSelfNameWithOutDirRootDir.ts",
	"resolutionModeImportType1(moduleresolution=bundler).ts",
	"resolutionModeImportType1(moduleresolution=node10).ts",
	"resolutionModeTypeOnlyImport1(moduleresolution=bundler).ts",
	"resolutionModeTypeOnlyImport1(moduleresolution=node10).ts",
	"selfNameAndImportsEmitInclusion.ts",
	"selfNameModuleAugmentation.ts",
	"symbolLinkDeclarationEmitModuleNames.ts",
	"symbolLinkDeclarationEmitModuleNamesImportRef.ts",
	"symbolLinkDeclarationEmitModuleNamesRootDir.ts",
	"symlinkedWorkspaceDependenciesNoDirectLinkGeneratesDeepNonrelativeName.ts",
	"symlinkedWorkspaceDependenciesNoDirectLinkGeneratesNonrelativeName.ts",
	"symlinkedWorkspaceDependenciesNoDirectLinkOptionalGeneratesNonrelativeName.ts",
	"symlinkedWorkspaceDependenciesNoDirectLinkPeerGeneratesNonrelativeName.ts",
	"typeGuardNarrowsIndexedAccessOfKnownProperty8.ts",
	"typesVersions.ambientModules.ts",
	"typesVersions.multiFile.ts",
	"typesVersionsDeclarationEmit.ambient.ts",
	"typesVersionsDeclarationEmit.multiFile.ts",
	"typesVersionsDeclarationEmit.multiFileBackReferenceToSelf.ts",
	"typesVersionsDeclarationEmit.multiFileBackReferenceToUnmapped.ts",
}

type vfsModuleResolutionHost struct {
	mu               sync.Mutex
	fs               vfs.FS
	currentDirectory string
	traces           []string
}

func fixRoot(path string) string {
	rootLength := tspath.GetRootLength(path)
	if rootLength == 0 {
		return tspath.CombinePaths("/.src", path)
	}
	return path
}

func newVFSModuleResolutionHost(files map[string]string, currentDirectory string) *vfsModuleResolutionHost {
	fs := make(map[string]string, len(files))
	for name, content := range files {
		fs[fixRoot(name)] = content
	}
	if currentDirectory == "" {
		currentDirectory = "/.src"
	} else if currentDirectory[0] != '/' {
		currentDirectory = "/.src/" + currentDirectory
	}
	return &vfsModuleResolutionHost{
		fs:               vfstest.FromMap(fs, true /*useCaseSensitiveFileNames*/),
		currentDirectory: currentDirectory,
	}
}

func (v *vfsModuleResolutionHost) FS() vfs.FS {
	return v.fs
}

// GetCurrentDirectory implements ModuleResolutionHost.
func (v *vfsModuleResolutionHost) GetCurrentDirectory() string {
	return v.currentDirectory
}

// Trace implements ModuleResolutionHost.
func (v *vfsModuleResolutionHost) Trace(msg string) {
	v.mu.Lock()
	defer v.mu.Unlock()
	v.traces = append(v.traces, msg)
}

type functionCall struct {
	call        string
	args        rawArgs
	returnValue map[string]any
}
type traceTestCase struct {
	name             string
	currentDirectory string
	trace            bool
	compilerOptions  *core.CompilerOptions
	files            map[string]string
	calls            []functionCall
}
type rawFile struct {
	Name    string `json:"name"`
	Content string `json:"content"`
}
type rawArgs struct {
	// getPackageScopeForPath
	Directory string `json:"directory"`

	// resolveModuleName, resolveTypeReferenceDirective
	Name            string                `json:"name"`
	ContainingFile  string                `json:"containingFile"`
	CompilerOptions *core.CompilerOptions `json:"compilerOptions"`
	ResolutionMode  int                   `json:"resolutionMode"`
	RedirectedRef   *struct {
		SourceFile struct {
			FileName string `json:"fileName"`
		} `json:"sourceFile"`
		CommandLine struct {
			CompilerOptions *core.CompilerOptions `json:"options"`
		} `json:"commandLine"`
	} `json:"redirectedReference"`
}
type rawTest struct {
	Test             string         `json:"test"`
	CurrentDirectory string         `json:"currentDirectory"`
	Trace            bool           `json:"trace"`
	Files            []rawFile      `json:"files"`
	Call             string         `json:"call"`
	Args             rawArgs        `json:"args"`
	Return           map[string]any `json:"return"`
}

var typesVersionsMessageRegex = regexp.MustCompile(`that matches compiler version '[^']+'`)

func sanitizeTraceOutput(trace string) string {
	return typesVersionsMessageRegex.ReplaceAllString(trace, "that matches compiler version '3.1.0-dev'")
}

func doCall(t *testing.T, resolver *module.Resolver, call functionCall, skipLocations bool) {
	switch call.call {
	case "resolveModuleName", "resolveTypeReferenceDirective":
		var redirectedReference *module.ResolvedProjectReference
		if call.args.RedirectedRef != nil {
			redirectedReference = &module.ResolvedProjectReference{
				SourceFile: (&ast.NodeFactory{}).NewSourceFile("", call.args.RedirectedRef.SourceFile.FileName, tspath.Path(call.args.RedirectedRef.SourceFile.FileName), nil).AsSourceFile(),
				CommandLine: core.ParsedOptions{
					CompilerOptions: call.args.RedirectedRef.CommandLine.CompilerOptions,
				},
			}
		}

		errorMessageArgs := []any{call.args.Name, call.args.ContainingFile}
		if call.call == "resolveModuleName" {
			resolved := resolver.ResolveModuleName(call.args.Name, call.args.ContainingFile, core.ModuleKind(call.args.ResolutionMode), redirectedReference)
			assert.Check(t, resolved != nil, "ResolveModuleName should not return nil", errorMessageArgs)
			if expectedResolvedModule, ok := call.returnValue["resolvedModule"].(map[string]any); ok {
				assert.Check(t, resolved.IsResolved(), errorMessageArgs)
				assert.Check(t, cmp.Equal(resolved.ResolvedFileName, expectedResolvedModule["resolvedFileName"].(string)), errorMessageArgs)
				assert.Check(t, cmp.Equal(resolved.Extension, expectedResolvedModule["extension"].(string)), errorMessageArgs)
				assert.Check(t, cmp.Equal(resolved.ResolvedUsingTsExtension, expectedResolvedModule["resolvedUsingTsExtension"].(bool)), errorMessageArgs)
				assert.Check(t, cmp.Equal(resolved.IsExternalLibraryImport, expectedResolvedModule["isExternalLibraryImport"].(bool)), errorMessageArgs)
			} else {
				assert.Check(t, !resolved.IsResolved(), errorMessageArgs)
			}
		} else {
			resolved := resolver.ResolveTypeReferenceDirective(call.args.Name, call.args.ContainingFile, core.ModuleKind(call.args.ResolutionMode), redirectedReference)
			assert.Check(t, resolved != nil, "ResolveTypeReferenceDirective should not return nil", errorMessageArgs)
			if expectedResolvedTypeReferenceDirective, ok := call.returnValue["resolvedTypeReferenceDirective"].(map[string]any); ok {
				assert.Check(t, resolved.IsResolved(), errorMessageArgs)
				assert.Check(t, cmp.Equal(resolved.ResolvedFileName, expectedResolvedTypeReferenceDirective["resolvedFileName"].(string)), errorMessageArgs)
				assert.Check(t, cmp.Equal(resolved.Primary, expectedResolvedTypeReferenceDirective["primary"].(bool)), errorMessageArgs)
				assert.Check(t, cmp.Equal(resolved.IsExternalLibraryImport, expectedResolvedTypeReferenceDirective["isExternalLibraryImport"].(bool)), errorMessageArgs)
			} else {
				assert.Check(t, !resolved.IsResolved(), errorMessageArgs)
			}
		}
	case "getPackageScopeForPath":
		resolver.GetPackageScopeForPath(call.args.Directory)
	default:
		t.Errorf("Unexpected call: %s", call.call)
	}
}

func runTraceBaseline(t *testing.T, test traceTestCase) {
	t.Run(test.name, func(t *testing.T) {
		t.Parallel()

		host := newVFSModuleResolutionHost(test.files, test.currentDirectory)
		resolver := module.NewResolver(host, test.compilerOptions)

		for _, call := range test.calls {
			doCall(t, resolver, call, false /*skipLocations*/)
			if t.Failed() {
				t.FailNow()
			}
		}

		t.Run("concurrent", func(t *testing.T) {
			concurrentHost := newVFSModuleResolutionHost(test.files, test.currentDirectory)
			concurrentResolver := module.NewResolver(concurrentHost, test.compilerOptions)

			var wg sync.WaitGroup
			for _, call := range test.calls {
				wg.Add(1)
				go func() {
					defer wg.Done()
					doCall(t, concurrentResolver, call, true /*skipLocations*/)
				}()
			}

			wg.Wait()
		})

		if test.trace {
			t.Run("trace", func(t *testing.T) {
				var buf bytes.Buffer
				encoder := json.NewEncoder(&buf)
				encoder.SetIndent("", "    ")
				encoder.SetEscapeHTML(false)
				if err := encoder.Encode(host.traces); err != nil {
					t.Fatal(err)
				}
				baseline.Run(
					t,
					tspath.RemoveFileExtension(test.name)+".trace.json",
					sanitizeTraceOutput(buf.String()),
					baseline.Options{Subfolder: "module/resolver"},
				)
			})
		}
	})
}

func TestModuleResolver(t *testing.T) {
	t.Parallel()
	testsFilePath := filepath.Join(repo.TestDataPath, "fixtures", "module", "resolvertests.json")
	// Read file one line at a time
	file, err := os.Open(testsFilePath)
	if err != nil {
		t.Fatal(err)
	}
	t.Cleanup(func() {
		file.Close()
	})
	decoder := json.NewDecoder(file)
	var currentTestCase traceTestCase
	for {
		var json rawTest
		if err := decoder.Decode(&json); err != nil {
			if err.Error() == "EOF" {
				break
			}
			t.Fatal(err)
		}
		if json.Files != nil {
			if currentTestCase.name != "" && !slices.Contains(skip, currentTestCase.name) {
				runTraceBaseline(t, currentTestCase)
			}
			currentTestCase = traceTestCase{
				name:             json.Test,
				currentDirectory: json.CurrentDirectory,
				// !!! no traces are passing yet because of missing cache implementation
				trace: false,
				files: make(map[string]string, len(json.Files)),
			}
			for _, file := range json.Files {
				currentTestCase.files[file.Name] = file.Content
			}
		} else if json.Call != "" {
			currentTestCase.calls = append(currentTestCase.calls, functionCall{
				call:        json.Call,
				args:        json.Args,
				returnValue: json.Return,
			})
			if currentTestCase.compilerOptions == nil && json.Args.CompilerOptions != nil {
				currentTestCase.compilerOptions = json.Args.CompilerOptions
			}
		} else {
			t.Fatalf("Unexpected JSON: %v", json)
		}
	}
}
