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
	"testing/fstest"

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
	"bundlerConditionsExcludesNode(module=esnext).ts",
	"bundlerConditionsExcludesNode(module=preserve).ts",
	"bundlerNodeModules1(module=esnext).ts",
	"bundlerNodeModules1(module=preserve).ts",
	"commonJsExportTypeDeclarationError.ts",
	"commonSourceDir5.ts",
	"commonSourceDirectory.ts",
	"computedEnumMemberSyntacticallyString2(isolatedmodules=false).ts",
	"computedEnumMemberSyntacticallyString2(isolatedmodules=true).ts",
	"conditionalExportsResolutionFallback(moduleresolution=bundler).ts",
	"conditionalExportsResolutionFallback(moduleresolution=node16).ts",
	"conditionalExportsResolutionFallback(moduleresolution=nodenext).ts",
	"customConditions(resolvepackagejsonexports=true).ts",
	"declarationEmitBundlerConditions.ts",
	"declarationEmitCommonSourceDirectoryDoesNotContainAllFiles.ts",
	"declarationEmitForGlobalishSpecifierSymlink.ts",
	"declarationEmitForGlobalishSpecifierSymlink2.ts",
	"declarationEmitReexportedSymlinkReference.ts",
	"declarationEmitReexportedSymlinkReference2.ts",
	"declarationEmitReexportedSymlinkReference3.ts",
	"declarationEmitSymlinkPaths.ts",
	"declarationEmitUsingAlternativeContainingModules1.ts",
	"declarationEmitUsingAlternativeContainingModules2.ts",
	"declarationEmitUsingTypeAlias1.ts",
	"declarationEmitUsingTypeAlias2.ts",
	"decoratorMetadataTypeOnlyExport.ts",
	"decoratorMetadataTypeOnlyImport.ts",
	"emit(jsx=preserve).ts",
	"emit(jsx=react).ts",
	"enumNoInitializerFollowsNonLiteralInitializer.ts",
	"enumWithNonLiteralStringInitializer.ts",
	"es6ImportWithJsDocTags.ts",
	"importAttributes9.ts",
	"importSpecifiers_js.ts",
	"importTag17.ts",
	"importTag21.ts",
	"isolatedModulesShadowGlobalTypeNotValue(isolatedmodules=false,verbatimmodulesyntax=false).ts",
	"isolatedModulesShadowGlobalTypeNotValue(isolatedmodules=false,verbatimmodulesyntax=true).ts",
	"isolatedModulesShadowGlobalTypeNotValue(isolatedmodules=true,verbatimmodulesyntax=false).ts",
	"isolatedModulesShadowGlobalTypeNotValue(isolatedmodules=true,verbatimmodulesyntax=true).ts",
	"jsDeclarationEmitExportedClassWithExtends.ts",
	"jsDocDeclarationEmitDoesNotUseNodeModulesPathWithoutError.ts",
	"jsxNamespaceGlobalReexport.tsx",
	"jsxNamespaceGlobalReexportMissingAliasTarget.tsx",
	"legacyNodeModulesExportsSpecifierGenerationConditions.ts",
	"mergeSymbolReexportedTypeAliasInstantiation.ts",
	"mergeSymbolReexportInterface.ts",
	"mergeSymbolRexportFunction.ts",
	"missingMemberErrorHasShortPath.ts",
	"modulePreserve2.ts",
	"moduleResolutionAsTypeReferenceDirective.ts",
	"moduleResolutionAsTypeReferenceDirectiveAmbient.ts",
	"moduleResolutionAsTypeReferenceDirectiveScoped.ts",
	"moduleResolutionWithModule(module=commonjs,moduleresolution=node16).ts",
	"moduleResolutionWithModule(module=commonjs,moduleresolution=nodenext).ts",
	"moduleResolutionWithModule(module=node16,moduleresolution=node16).ts",
	"moduleResolutionWithModule(module=node16,moduleresolution=nodenext).ts",
	"moduleResolutionWithModule(module=nodenext,moduleresolution=node16).ts",
	"moduleResolutionWithModule(module=nodenext,moduleresolution=nodenext).ts",
	"moduleResolutionWithSymlinks_notInNodeModules.ts",
	"moduleResolutionWithSymlinks_preserveSymlinks.ts",
	"moduleResolutionWithSymlinks_referenceTypes.ts",
	"moduleResolutionWithSymlinks_withOutDir.ts",
	"moduleResolutionWithSymlinks.ts",
	"node10AlternateResult_noResolution.ts",
	"node10Alternateresult_noTypes.ts",
	"node10IsNode_node.ts",
	"node10IsNode_node10.ts",
	"nodeAllowJsPackageSelfName(module=node16).ts",
	"nodeAllowJsPackageSelfName(module=nodenext).ts",
	"nodeAllowJsPackageSelfName2.ts",
	"nodeModulesAllowJsConditionalPackageExports(module=node16).ts",
	"nodeModulesAllowJsConditionalPackageExports(module=nodenext).ts",
	"nodeModulesAllowJsPackageExports(module=node16).ts",
	"nodeModulesAllowJsPackageExports(module=nodenext).ts",
	"nodeModulesAllowJsPackageImports(module=node16).ts",
	"nodeModulesAllowJsPackageImports(module=nodenext).ts",
	"nodeModulesAllowJsPackagePatternExports(module=node16).ts",
	"nodeModulesAllowJsPackagePatternExports(module=nodenext).ts",
	"nodeModulesAllowJsPackagePatternExportsTrailers(module=node16).ts",
	"nodeModulesAllowJsPackagePatternExportsTrailers(module=nodenext).ts",
	"nodeModulesConditionalPackageExports(module=node16).ts",
	"nodeModulesConditionalPackageExports(module=nodenext).ts",
	"nodeModulesDeclarationEmitDynamicImportWithPackageExports.ts",
	"nodeModulesDeclarationEmitWithPackageExports(module=node16).ts",
	"nodeModulesDeclarationEmitWithPackageExports(module=nodenext).ts",
	"nodeModulesExportsBlocksSpecifierResolution(module=node16).ts",
	"nodeModulesExportsBlocksSpecifierResolution(module=nodenext).ts",
	"nodeModulesExportsBlocksTypesVersions(module=node16).ts",
	"nodeModulesExportsBlocksTypesVersions(module=nodenext).ts",
	"nodeModulesExportsSourceTs(module=node16).ts",
	"nodeModulesExportsSourceTs(module=nodenext).ts",
	"nodeModulesExportsSpecifierGenerationConditions(module=node16).ts",
	"nodeModulesExportsSpecifierGenerationConditions(module=nodenext).ts",
	"nodeModulesExportsSpecifierGenerationDirectory(module=node16).ts",
	"nodeModulesExportsSpecifierGenerationDirectory(module=nodenext).ts",
	"nodeModulesExportsSpecifierGenerationPattern(module=node16).ts",
	"nodeModulesExportsSpecifierGenerationPattern(module=nodenext).ts",
	"nodeModulesImportAttributesModeDeclarationEmit1(module=node16).ts",
	"nodeModulesImportAttributesModeDeclarationEmit1(module=nodenext).ts",
	"nodeModulesImportAttributesModeDeclarationEmit2(module=node16).ts",
	"nodeModulesImportAttributesModeDeclarationEmit2(module=nodenext).ts",
	"nodeModulesImportAttributesModeDeclarationEmitErrors(module=node16).ts",
	"nodeModulesImportAttributesModeDeclarationEmitErrors(module=nodenext).ts",
	"nodeModulesImportAttributesTypeModeDeclarationEmit(module=node16).ts",
	"nodeModulesImportAttributesTypeModeDeclarationEmit(module=nodenext).ts",
	"nodeModulesImportAttributesTypeModeDeclarationEmitErrors(module=node16).ts",
	"nodeModulesImportAttributesTypeModeDeclarationEmitErrors(module=nodenext).ts",
	"nodeModulesImportModeDeclarationEmit1(module=node16).ts",
	"nodeModulesImportModeDeclarationEmit1(module=nodenext).ts",
	"nodeModulesImportModeDeclarationEmit2(module=node16).ts",
	"nodeModulesImportModeDeclarationEmit2(module=nodenext).ts",
	"nodeModulesImportModeDeclarationEmitErrors1(module=node16).ts",
	"nodeModulesImportModeDeclarationEmitErrors1(module=nodenext).ts",
	"nodeModulesImportResolutionIntoExport(module=node16).ts",
	"nodeModulesImportResolutionIntoExport(module=nodenext).ts",
	"nodeModulesImportResolutionNoCycle(module=node16).ts",
	"nodeModulesImportResolutionNoCycle(module=nodenext).ts",
	"nodeModulesImportTypeModeDeclarationEmit1(module=node16).ts",
	"nodeModulesImportTypeModeDeclarationEmit1(module=nodenext).ts",
	"nodeModulesImportTypeModeDeclarationEmitErrors1(module=node16).ts",
	"nodeModulesImportTypeModeDeclarationEmitErrors1(module=nodenext).ts",
	"nodeModulesJson.ts",
	"nodeModulesPackageExports(module=node16).ts",
	"nodeModulesPackageExports(module=nodenext).ts",
	"nodeModulesPackageImports(module=node16).ts",
	"nodeModulesPackageImports(module=nodenext).ts",
	"nodeModulesPackagePatternExports(module=node16).ts",
	"nodeModulesPackagePatternExports(module=nodenext).ts",
	"nodeModulesPackagePatternExportsExclude(module=node16).ts",
	"nodeModulesPackagePatternExportsExclude(module=nodenext).ts",
	"nodeModulesPackagePatternExportsTrailers(module=node16).ts",
	"nodeModulesPackagePatternExportsTrailers(module=nodenext).ts",
	"nodeModulesTripleSlashReferenceModeDeclarationEmit1(module=node16).ts",
	"nodeModulesTripleSlashReferenceModeDeclarationEmit1(module=nodenext).ts",
	"nodeModulesTripleSlashReferenceModeDeclarationEmit2(module=node16).ts",
	"nodeModulesTripleSlashReferenceModeDeclarationEmit2(module=nodenext).ts",
	"nodeModulesTripleSlashReferenceModeDeclarationEmit3(module=node16).ts",
	"nodeModulesTripleSlashReferenceModeDeclarationEmit3(module=nodenext).ts",
	"nodeModulesTripleSlashReferenceModeDeclarationEmit4(module=node16).ts",
	"nodeModulesTripleSlashReferenceModeDeclarationEmit4(module=nodenext).ts",
	"nodeModulesTripleSlashReferenceModeDeclarationEmit5(module=node16).ts",
	"nodeModulesTripleSlashReferenceModeDeclarationEmit5(module=nodenext).ts",
	"nodeModulesTripleSlashReferenceModeDeclarationEmit6(module=node16).ts",
	"nodeModulesTripleSlashReferenceModeDeclarationEmit6(module=nodenext).ts",
	"nodeModulesTripleSlashReferenceModeDeclarationEmit7(module=node16).ts",
	"nodeModulesTripleSlashReferenceModeDeclarationEmit7(module=nodenext).ts",
	"nodeModulesTripleSlashReferenceModeOverride1(module=node16).ts",
	"nodeModulesTripleSlashReferenceModeOverride1(module=nodenext).ts",
	"nodeModulesTripleSlashReferenceModeOverride2(module=node16).ts",
	"nodeModulesTripleSlashReferenceModeOverride2(module=nodenext).ts",
	"nodeModulesTripleSlashReferenceModeOverride3(module=node16).ts",
	"nodeModulesTripleSlashReferenceModeOverride3(module=nodenext).ts",
	"nodeModulesTripleSlashReferenceModeOverride4(module=node16).ts",
	"nodeModulesTripleSlashReferenceModeOverride4(module=nodenext).ts",
	"nodeModulesTripleSlashReferenceModeOverride5(module=node16).ts",
	"nodeModulesTripleSlashReferenceModeOverride5(module=nodenext).ts",
	"nodeModulesTripleSlashReferenceModeOverrideModeError(module=node16).ts",
	"nodeModulesTripleSlashReferenceModeOverrideModeError(module=nodenext).ts",
	"nodeModulesTripleSlashReferenceModeOverrideOldResolutionError.ts",
	"nodeModulesTypesVersionPackageExports(module=node16).ts",
	"nodeModulesTypesVersionPackageExports(module=nodenext).ts",
	"nodeNextImportModeImplicitIndexResolution.ts",
	"nodeNextImportModeImplicitIndexResolution2.ts",
	"nodeNextModuleResolution2.ts",
	"nodeNextPackageImportMapRootDir.ts",
	"nodeNextPackageSelfNameWithOutDir.ts",
	"nodeNextPackageSelfNameWithOutDirDeclDir.ts",
	"nodeNextPackageSelfNameWithOutDirDeclDirComposite.ts",
	"nodeNextPackageSelfNameWithOutDirDeclDirCompositeNestedDirs.ts",
	"nodeNextPackageSelfNameWithOutDirDeclDirNestedDirs.ts",
	"nodeNextPackageSelfNameWithOutDirDeclDirRootDir.ts",
	"nodeNextPackageSelfNameWithOutDirRootDir.ts",
	"nodePackageSelfName(module=node16).ts",
	"nodePackageSelfName(module=nodenext).ts",
	"nodePackageSelfNameScoped(module=node16).ts",
	"nodePackageSelfNameScoped(module=nodenext).ts",
	"packageJsonImportsErrors.ts",
	"parseAssertEntriesError.ts",
	"parseImportAttributesError.ts",
	"reactJsxReactResolvedNodeNextEsm.tsx",
	"resolutionModeImportType1(moduleresolution=bundler).ts",
	"resolutionModeImportType1(moduleresolution=node10).ts",
	"resolutionModeTripleSlash1.ts",
	"resolutionModeTripleSlash2.ts",
	"resolutionModeTripleSlash3.ts",
	"resolutionModeTypeOnlyImport1(moduleresolution=bundler).ts",
	"resolutionModeTypeOnlyImport1(moduleresolution=node10).ts",
	"resolvesWithoutExportsDiagnostic1(moduleresolution=bundler).ts",
	"resolvesWithoutExportsDiagnostic1(moduleresolution=node16).ts",
	"selfNameAndImportsEmitInclusion.ts",
	"selfNameModuleAugmentation.ts",
	"sideEffectImports4(nouncheckedsideeffectimports=false).ts",
	"sideEffectImports4(nouncheckedsideeffectimports=true).ts",
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
		return tspath.CombinePaths(".src", path)
	}
	if len(path) == rootLength {
		return "."
	}
	return path[rootLength:]
}

func newVFSModuleResolutionHost(files map[string]string, currentDirectory string) *vfsModuleResolutionHost {
	fs := fstest.MapFS{}
	for name, content := range files {
		fs[fixRoot(name)] = &fstest.MapFile{
			Data: []byte(content),
		}
	}
	if currentDirectory == "" {
		currentDirectory = "/.src"
	} else if currentDirectory[0] != '/' {
		currentDirectory = "/.src/" + currentDirectory
	}
	return &vfsModuleResolutionHost{
		fs:               vfstest.FromMapFS(fs, true /*useCaseSensitiveFileNames*/),
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
				SourceFile: (&ast.NodeFactory{}).NewSourceFile("", call.args.RedirectedRef.SourceFile.FileName, nil).AsSourceFile(),
				CommandLine: core.ParsedOptions{
					CompilerOptions: call.args.RedirectedRef.CommandLine.CompilerOptions,
				},
			}
		}

		var locations *module.LookupLocations
		if call.call == "resolveModuleName" {
			resolved := resolver.ResolveModuleName(call.args.Name, call.args.ContainingFile, core.ModuleKind(call.args.ResolutionMode), redirectedReference)
			assert.Check(t, resolved != nil, "ResolveModuleName should not return nil")
			locations = resolver.GetLookupLocationsForResolvedModule(resolved)
			if expectedResolvedModule, ok := call.returnValue["resolvedModule"].(map[string]any); ok {
				assert.Check(t, resolved.IsResolved())
				assert.Check(t, cmp.Equal(resolved.ResolvedFileName, expectedResolvedModule["resolvedFileName"].(string)))
				assert.Check(t, cmp.Equal(resolved.Extension, expectedResolvedModule["extension"].(string)))
				assert.Check(t, cmp.Equal(resolved.ResolvedUsingTsExtension, expectedResolvedModule["resolvedUsingTsExtension"].(bool)))
				assert.Check(t, cmp.Equal(resolved.IsExternalLibraryImport, expectedResolvedModule["isExternalLibraryImport"].(bool)))
			} else {
				assert.Check(t, !resolved.IsResolved())
			}
		} else {
			resolved := resolver.ResolveTypeReferenceDirective(call.args.Name, call.args.ContainingFile, core.ModuleKind(call.args.ResolutionMode), redirectedReference)
			assert.Check(t, resolved != nil, "ResolveTypeReferenceDirective should not return nil")
			locations = resolver.GetLookupLocationsForResolvedTypeReferenceDirective(resolved)
			if expectedResolvedTypeReferenceDirective, ok := call.returnValue["resolvedTypeReferenceDirective"].(map[string]any); ok {
				assert.Check(t, resolved.IsResolved())
				assert.Check(t, cmp.Equal(resolved.ResolvedFileName, expectedResolvedTypeReferenceDirective["resolvedFileName"].(string)))
				assert.Check(t, cmp.Equal(resolved.Primary, expectedResolvedTypeReferenceDirective["primary"].(bool)))
				assert.Check(t, cmp.Equal(resolved.IsExternalLibraryImport, expectedResolvedTypeReferenceDirective["isExternalLibraryImport"].(bool)))
			} else {
				assert.Check(t, !resolved.IsResolved())
			}
		}
		if skipLocations {
			break
		}
		if expectedFailedLookupLocations, ok := call.returnValue["failedLookupLocations"].([]interface{}); ok {
			assert.Check(t, cmp.DeepEqual(locations.FailedLookupLocations, core.Map(expectedFailedLookupLocations, func(i interface{}) string { return i.(string) })))
		} else {
			assert.Check(t, cmp.Equal(len(locations.FailedLookupLocations), 0))
		}
		if expectedAffectingLocations, ok := call.returnValue["affectingLocations"].([]interface{}); ok {
			assert.Check(t, cmp.DeepEqual(locations.AffectingLocations, core.Map(expectedAffectingLocations, func(i interface{}) string { return i.(string) })))
		} else {
			assert.Check(t, cmp.Equal(len(locations.AffectingLocations), 0))
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
			host := newVFSModuleResolutionHost(test.files, test.currentDirectory)
			resolver := module.NewResolver(host, test.compilerOptions)

			var wg sync.WaitGroup
			for _, call := range test.calls {
				wg.Add(1)
				go func() {
					defer wg.Done()
					doCall(t, resolver, call, true /*skipLocations*/)
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
