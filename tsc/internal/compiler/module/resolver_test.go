package module_test

import (
	"bytes"
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"regexp"
	"slices"
	"testing"
	"testing/fstest"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/compiler/module"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/repo"
	"github.com/microsoft/typescript-go/internal/testutil/baseline"
	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/microsoft/typescript-go/internal/vfs"
	"gotest.tools/v3/assert"
)

var skip = []string{
	"nodeModulesAllowJsConditionalPackageExports(module=node16).ts",
	"nodeModulesAllowJsConditionalPackageExports(module=nodenext).ts",
	"nodeModulesImportAttributesTypeModeDeclarationEmitErrors(module=node16).ts",
	"nodeModulesImportAttributesTypeModeDeclarationEmitErrors(module=nodenext).ts",
	"nodeModulesAllowJsPackageExports(module=node16).ts",
	"nodeModulesAllowJsPackageExports(module=nodenext).ts",
	"nodeModulesExportsSpecifierGenerationDirectory(module=node16).ts",
	"nodeModulesExportsSpecifierGenerationDirectory(module=nodenext).ts",
	"typesVersions.multiFile.ts",
	"APISample_jsdoc.ts",
	"APISample_transform.ts",
	"declarationFileForTsJsImport.ts",
	"decoratorMetadataTypeOnlyImport.ts",
	"bundlerNodeModules1(module=esnext).ts",
	"bundlerNodeModules1(module=preserve).ts",
	"nodeNextPackageImportMapRootDir.ts",
	"declarationEmitReexportedSymlinkReference2.ts",
	"library-reference-8.ts",
	"moduleResolutionWithExtensions_unexpected.ts",
	"moduleLocalImportNotIncorrectlyRedirected.ts",
	"duplicatePackage_relativeImportWithinPackage_scoped.ts",
	"nodeNextPackageSelfNameWithOutDirRootDir.ts",
	"enumNoInitializerFollowsNonLiteralInitializer.ts",
	"typeReferenceDirectives6.ts",
	"commonSourceDirectory.ts",
	"nestedPackageJsonRedirect(moduleresolution=node16).ts",
	"nestedPackageJsonRedirect(moduleresolution=nodenext).ts",
	"nestedPackageJsonRedirect(moduleresolution=bundler).ts",
	"resolutionModeImportType1(moduleresolution=bundler).ts",
	"resolutionModeImportType1(moduleresolution=node10).ts",
	"jsDeclarationEmitExportedClassWithExtends.ts",
	"typeReferenceDirectives12.ts",
	"nodeNextPackageSelfNameWithOutDirDeclDirRootDir.ts",
	"moduleResolutionWithSymlinks_withOutDir.ts",
	"symlinkedWorkspaceDependenciesNoDirectLinkOptionalGeneratesNonrelativeName.ts",
	"moduleResolutionWithExtensions_notSupported3.ts",
	"nodeColonModuleResolution.ts",
	"library-reference-5.ts",
	"typeReferenceDirectives4.ts",
	"libTypeScriptSubfileResolvingConfig.ts",
	"library-reference-10.ts",
	"typeReferenceDirectives13.ts",
	"library-reference-1.ts",
	"nodeNextModuleResolution2.ts",
	"pathMappingWithoutBaseUrl2.ts",
	"mergeSymbolReexportInterface.ts",
	"decoratorMetadataTypeOnlyExport.ts",
	"nodeModulesPackagePatternExportsTrailers(module=node16).ts",
	"nodeModulesPackagePatternExportsTrailers(module=nodenext).ts",
	"jsDocDeclarationEmitDoesNotUseNodeModulesPathWithoutError.ts",
	"nodeModulesImportAttributesModeDeclarationEmit2(module=node16).ts",
	"nodeModulesImportAttributesModeDeclarationEmit2(module=nodenext).ts",
	"declarationEmitUsingTypeAlias1.ts",
	"legacyNodeModulesExportsSpecifierGenerationConditions.ts",
	"importTag17.ts",
	"modulePreserve2.ts",
	"APISample_WatchWithOwnWatchHost.ts",
	"nodeModulesPackageImports(module=node16).ts",
	"nodeModulesPackageImports(module=nodenext).ts",
	"nodeModulesAllowJsPackageImports(module=node16).ts",
	"nodeModulesAllowJsPackageImports(module=nodenext).ts",
	"isolatedModulesShadowGlobalTypeNotValue(isolatedmodules=false,verbatimmodulesyntax=false).ts",
	"isolatedModulesShadowGlobalTypeNotValue(isolatedmodules=true,verbatimmodulesyntax=false).ts",
	"isolatedModulesShadowGlobalTypeNotValue(isolatedmodules=false,verbatimmodulesyntax=true).ts",
	"isolatedModulesShadowGlobalTypeNotValue(isolatedmodules=true,verbatimmodulesyntax=true).ts",
	"checkObjectDefineProperty.ts",
	"moduleResolutionWithSymlinks_referenceTypes.ts",
	"untypedModuleImport_noImplicitAny_typesForPackageExist.ts",
	"declarationEmitForGlobalishSpecifierSymlink2.ts",
	"moduleResolutionWithSuffixes_one_externalModulePath.ts",
	"selfNameModuleAugmentation.ts",
	"typeReferenceDirectives8.ts",
	"moduleResolutionWithSymlinks_notInNodeModules.ts",
	"moduleResolutionWithRequire.ts",
	"nodeNextModuleResolution1.ts",
	"declarationEmitWithInvalidPackageJsonTypings.ts",
	"moduleResolutionWithSuffixes_threeLastIsBlank3.ts",
	"enumWithNonLiteralStringInitializer.ts",
	"libTypeScriptSubfileResolving.ts",
	"typeReferenceDirectives10.ts",
	"resolutionCandidateFromPackageJsonField1.ts",
	"moduleResolutionWithSuffixes_threeLastIsBlank1.ts",
	"moduleResolutionWithSuffixes_oneBlank.ts",
	"moduleResolutionWithExtensions_notSupported2.ts",
	"moduleResolutionWithSuffixes_one.ts",
	"nodeModulesDeclarationEmitWithPackageExports(module=node16).ts",
	"nodeModulesDeclarationEmitWithPackageExports(module=nodenext).ts",
	"nodeModulesImportTypeModeDeclarationEmit1(module=node16).ts",
	"nodeModulesImportTypeModeDeclarationEmit1(module=nodenext).ts",
	"nodeNextImportModeImplicitIndexResolution.ts",
	"nodeModulesAllowJsPackagePatternExportsTrailers(module=node16).ts",
	"nodeModulesAllowJsPackagePatternExportsTrailers(module=nodenext).ts",
	"nodeModulesImportModeDeclarationEmitErrors1(module=node16).ts",
	"nodeModulesImportModeDeclarationEmitErrors1(module=nodenext).ts",
	"typesVersionsDeclarationEmit.multiFileBackReferenceToUnmapped.ts",
	"reactJsxReactResolvedNodeNextEsm.tsx",
	"nodeNextImportModeImplicitIndexResolution2.ts",
	"APISample_WatchWithDefaults.ts",
	"nodeNextPackageSelfNameWithOutDir.ts",
	"duplicatePackage_relativeImportWithinPackage.ts",
	"resolutionModeTypeOnlyImport1(moduleresolution=bundler).ts",
	"resolutionModeTypeOnlyImport1(moduleresolution=node10).ts",
	"symbolLinkDeclarationEmitModuleNames.ts",
	"moduleResolutionWithSymlinks_preserveSymlinks.ts",
	"importWithTrailingSlash.ts",
	"node10Alternateresult_noTypes.ts",
	"mergeSymbolRexportFunction.ts",
	"declarationEmitCommonSourceDirectoryDoesNotContainAllFiles.ts",
	"library-reference-11.ts",
	"library-reference-12.ts",
	"typeReferenceDirectives1.ts",
	"importNonExportedMember12.ts",
	"es6ImportWithJsDocTags.ts",
	"library-reference-7.ts",
	"importFromDot.ts",
	"nodeModulesExportsSpecifierGenerationPattern(module=node16).ts",
	"nodeModulesExportsSpecifierGenerationPattern(module=nodenext).ts",
	"declarationEmitUsingAlternativeContainingModules2.ts",
	"jsxClassAttributeResolution.tsx",
	"declarationEmitUsingTypeAlias2.ts",
	"nodeModulesPackagePatternExports(module=node16).ts",
	"nodeModulesPackagePatternExports(module=nodenext).ts",
	"nodeNextEsmImportsOfPackagesWithExtensionlessMains.ts",
	"typesVersionsDeclarationEmit.multiFileBackReferenceToSelf.ts",
	"APISample_compile.ts",
	"APISample_watcher.ts",
	"declarationEmitSymlinkPaths.ts",
	"bundlerImportTsExtensions(allowimportingtsextensions=true,noemit=true).ts",
	"bundlerImportTsExtensions(allowimportingtsextensions=true,noemit=false).ts",
	"bundlerImportTsExtensions(allowimportingtsextensions=false,noemit=true).ts",
	"bundlerImportTsExtensions(allowimportingtsextensions=false,noemit=false).ts",
	"declarationEmitBundlerConditions.ts",
	"moduleResolutionWithSuffixes_one_externalTSModule.ts",
	"library-reference-4.ts",
	"cachedModuleResolution2.ts",
	"packageJsonImportsErrors.ts",
	"typingsLookup1.ts",
	"moduleResolutionAsTypeReferenceDirective.ts",
	"declarationEmitForGlobalishSpecifierSymlink.ts",
	"moduleResolution_packageJson_scopedPackage.ts",
	"typingsLookupAmd.ts",
	"node10AlternateResult_noResolution.ts",
	"library-reference-3.ts",
	"library-reference-scoped-packages.ts",
	"moduleResolutionWithModule(module=commonjs,moduleresolution=node16).ts",
	"moduleResolutionWithModule(module=commonjs,moduleresolution=nodenext).ts",
	"moduleResolutionWithModule(module=node16,moduleresolution=node16).ts",
	"moduleResolutionWithModule(module=node16,moduleresolution=nodenext).ts",
	"moduleResolutionWithModule(module=nodenext,moduleresolution=node16).ts",
	"moduleResolutionWithModule(module=nodenext,moduleresolution=nodenext).ts",
	"nodeModulesExportsBlocksTypesVersions(module=node16).ts",
	"nodeModulesExportsBlocksTypesVersions(module=nodenext).ts",
	"nodeModulesPackageExports(module=node16).ts",
	"nodeModulesPackageExports(module=nodenext).ts",
	"nodeModulesPackagePatternExportsExclude(module=node16).ts",
	"nodeModulesPackagePatternExportsExclude(module=nodenext).ts",
	"typesVersions.ambientModules.ts",
	"parseAssertEntriesError.ts",
	"APISample_linter.ts",
	"nodeAllowJsPackageSelfName(module=node16).ts",
	"nodeAllowJsPackageSelfName(module=nodenext).ts",
	"declarationEmitReexportedSymlinkReference3.ts",
	"nodeNextPackageSelfNameWithOutDirDeclDirComposite.ts",
	"checkExportsObjectAssignProperty.ts",
	"typingsLookup4.ts",
	"nodeAllowJsPackageSelfName2.ts",
	"nodeNextPackageSelfNameWithOutDirDeclDir.ts",
	"typeGuardNarrowsIndexedAccessOfKnownProperty8.ts",
	"moduleResolutionWithRequireAndImport.ts",
	"nodeColonModuleResolution2.ts",
	"symlinkedWorkspaceDependenciesNoDirectLinkPeerGeneratesNonrelativeName.ts",
	"moduleResolutionWithExtensions_notSupported.ts",
	"moduleResolutionWithSuffixes_notSpecified.ts",
	"moduleResolutionWithSuffixes_threeLastIsBlank2.ts",
	"allowJsCrossMonorepoPackage.ts",
	"cachedModuleResolution6.ts",
	"cachedModuleResolution1.ts",
	"APILibCheck.ts",
	"nodeModulesAllowJsPackagePatternExports(module=node16).ts",
	"nodeModulesAllowJsPackagePatternExports(module=nodenext).ts",
	"nodeModules1(module=node16).ts",
	"nodeModules1(module=nodenext).ts",
	"nodeModulesJson.ts",
	"nodeModulesAtTypesPriority.ts",
	"nodePackageSelfName(module=node16).ts",
	"nodePackageSelfName(module=nodenext).ts",
	"nodeNextPackageSelfNameWithOutDirDeclDirNestedDirs.ts",
	"library-reference-6.ts",
	"moduleResolution_packageJson_notAtPackageRoot.ts",
	"resolvesWithoutExportsDiagnostic1(moduleresolution=bundler).ts",
	"resolvesWithoutExportsDiagnostic1(moduleresolution=node16).ts",
	"symbolLinkDeclarationEmitModuleNamesRootDir.ts",
	"exportStarNotElided.ts",
	"moduleResolutionWithSuffixes_one_externalModule.ts",
	"resolutionCandidateFromPackageJsonField2(moduleresolution=node10).ts",
	"resolutionCandidateFromPackageJsonField2(moduleresolution=bundler).ts",
	"moduleResolution_packageJson_yesAtPackageRoot_fakeScopedPackage.ts",
	"scopedPackages.ts",
	"mergeSymbolReexportedTypeAliasInstantiation.ts",
	"typeReferenceDirectives5.ts",
	"importTag21.ts",
	"nodeModulesTypesVersionPackageExports(module=node16).ts",
	"nodeModulesTypesVersionPackageExports(module=nodenext).ts",
	"nodeModulesExportsBlocksSpecifierResolution(module=node16).ts",
	"nodeModulesExportsBlocksSpecifierResolution(module=nodenext).ts",
	"nodeModulesAllowJs1(module=node16).ts",
	"nodeModulesAllowJs1(module=nodenext).ts",
	"typesVersionsDeclarationEmit.ambient.ts",
	"computedEnumMemberSyntacticallyString2(isolatedmodules=true).ts",
	"computedEnumMemberSyntacticallyString2(isolatedmodules=false).ts",
	"jsxNamespaceImplicitImportJSXNamespace.tsx",
	"customConditions(resolvepackagejsonexports=true).ts",
	"customConditions(resolvepackagejsonexports=false).ts",
	"typeRootsFromMultipleNodeModulesDirectories.ts",
	"typingsLookup3.ts",
	"declarationEmitUnnessesaryTypeReferenceNotAdded.ts",
	"cachedModuleResolution7.ts",
	"cachedModuleResolution5.ts",
	"moduleResolutionWithSuffixes_empty.ts",
	"libTypeScriptOverrideSimple.ts",
	"packageJsonMain_isNonRecursive.ts",
	"libTypeScriptOverrideSimpleConfig.ts",
	"nodeModulesImportAttributesModeDeclarationEmitErrors(module=node16).ts",
	"nodeModulesImportAttributesModeDeclarationEmitErrors(module=nodenext).ts",
	"nodeModulesImportAttributesTypeModeDeclarationEmit(module=node16).ts",
	"nodeModulesImportAttributesTypeModeDeclarationEmit(module=nodenext).ts",
	"nodeModulesExportsSpecifierGenerationConditions(module=node16).ts",
	"nodeModulesExportsSpecifierGenerationConditions(module=nodenext).ts",
	"typesVersionsDeclarationEmit.multiFile.ts",
	"nodeModulesExportsSourceTs(module=node16).ts",
	"nodeModulesExportsSourceTs(module=nodenext).ts",
	"reactJsxReactResolvedNodeNext.tsx",
	"nodeModulesImportModeDeclarationEmit2(module=node16).ts",
	"nodeModulesImportModeDeclarationEmit2(module=nodenext).ts",
	"parseImportAttributesError.ts",
	"bundlerConditionsExcludesNode(module=esnext).ts",
	"bundlerConditionsExcludesNode(module=preserve).ts",
	"bundlerRelative1(module=esnext).ts",
	"bundlerRelative1(module=preserve).ts",
	"bundlerDirectoryModule(moduleresolution=nodenext).ts",
	"bundlerDirectoryModule(moduleresolution=bundler).ts",
	"declarationEmitReexportedSymlinkReference.ts",
	"nodePackageSelfNameScoped(module=node16).ts",
	"nodePackageSelfNameScoped(module=nodenext).ts",
	"APISample_Watch.ts",
	"selfNameAndImportsEmitInclusion.ts",
	"jsxNamespaceGlobalReexport.tsx",
	"typeReferenceDirectives9.ts",
	"nodeNextPackageSelfNameWithOutDirDeclDirCompositeNestedDirs.ts",
	"APISample_parseConfig.ts",
	"typeRootsFromNodeModulesInParentDirectory.ts",
	"importAttributes9.ts",
	"moduleResolution_packageJson_notAtPackageRoot_fakeScopedPackage.ts",
	"moduleResolutionWithExtensions.ts",
	"sideEffectImports4(nouncheckedsideeffectimports=true).ts",
	"sideEffectImports4(nouncheckedsideeffectimports=false).ts",
	"conditionalExportsResolutionFallback(moduleresolution=node16).ts",
	"conditionalExportsResolutionFallback(moduleresolution=nodenext).ts",
	"conditionalExportsResolutionFallback(moduleresolution=bundler).ts",
	"typeReferenceDirectives3.ts",
	"pathMappingWithoutBaseUrl1.ts",
	"moduleResolution_packageJson_yesAtPackageRoot.ts",
	"typeReferenceDirectives11.ts",
	"moduleResolutionWithSymlinks.ts",
	"moduleResolution_packageJson_yesAtPackageRoot_mainFieldInSubDirectory.ts",
	"moduleResolutionWithSuffixes_one_jsonModule.ts",
	"typeReferenceDirectives7.ts",
	"moduleResolutionWithSuffixes_one_dirModuleWithIndex.ts",
	"node10IsNode_node10.ts",
	"importSpecifiers_js.ts",
	"nodeModulesImportTypeModeDeclarationEmitErrors1(module=node16).ts",
	"nodeModulesImportTypeModeDeclarationEmitErrors1(module=nodenext).ts",
	"nodeModulesImportAttributesModeDeclarationEmit1(module=node16).ts",
	"nodeModulesImportAttributesModeDeclarationEmit1(module=nodenext).ts",
	"declarationEmitUsingAlternativeContainingModules1.ts",
	"nodeModulesDeclarationEmitDynamicImportWithPackageExports.ts",
	"nodeModulesImportModeDeclarationEmit1(module=node16).ts",
	"nodeModulesImportModeDeclarationEmit1(module=nodenext).ts",
	"nodeModulesConditionalPackageExports(module=node16).ts",
	"nodeModulesConditionalPackageExports(module=nodenext).ts",
	"nodeModulesImportResolutionIntoExport(module=node16).ts",
	"nodeModulesImportResolutionIntoExport(module=nodenext).ts",
	"jsxNamespaceGlobalReexportMissingAliasTarget.tsx",
	"symlinkedWorkspaceDependenciesNoDirectLinkGeneratesDeepNonrelativeName.ts",
	"moduleResolutionWithExtensions_withAmbientPresent.ts",
	"packageJsonMain.ts",
	"symlinkedWorkspaceDependenciesNoDirectLinkGeneratesNonrelativeName.ts",
	"library-reference-2.ts",
	"symbolLinkDeclarationEmitModuleNamesImportRef.ts",
	"node10IsNode_node.ts",
	"commonJsExportTypeDeclarationError.ts",
	"maxNodeModuleJsDepthDefaultsToZero.ts",
	"moduleResolutionWithExtensions_unexpected2.ts",
	"moduleResolutionAsTypeReferenceDirectiveScoped.ts",
	"moduleResolutionAsTypeReferenceDirectiveAmbient.ts",
	"moduleResolutionWithSuffixes_one_jsModule.ts",
	"moduleResolutionWithSuffixes_oneNotFound.ts",
}

type vfsModuleResolutionHost struct {
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

func newVFSModuleResolutionHost(files map[string]string) *vfsModuleResolutionHost {
	fs := fstest.MapFS{}
	for name, content := range files {
		fs[fixRoot(name)] = &fstest.MapFile{
			Data: []byte(content),
		}
	}
	return &vfsModuleResolutionHost{
		fs:     vfs.FromIOFS(false, fs),
		traces: nil,
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
	v.traces = append(v.traces, msg)
}

// UseCaseSensitiveFileNames implements ModuleResolutionHost.
func (v *vfsModuleResolutionHost) UseCaseSensitiveFileNames() bool {
	return false
}

type functionCall struct {
	call        string
	args        rawArgs
	returnValue map[string]any
}
type traceTestCase struct {
	name            string
	trace           bool
	compilerOptions *core.CompilerOptions
	files           map[string]string
	calls           []functionCall
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
			Options *core.CompilerOptions `json:"options"`
		} `json:"commandLine"`
	} `json:"redirectedReference"`
}
type rawTest struct {
	Test   string         `json:"test"`
	Trace  bool           `json:"trace"`
	Files  []rawFile      `json:"files"`
	Call   string         `json:"call"`
	Args   rawArgs        `json:"args"`
	Return map[string]any `json:"return"`
}

var typesVersionsMessageRegex = regexp.MustCompile(`that matches compiler version '[^']+'`)

func sanitizeTraceOutput(trace string) string {
	return typesVersionsMessageRegex.ReplaceAllString(trace, "that matches compiler version '3.1.0-dev'")
}

func runTraceBaseline(t *testing.T, test traceTestCase) {
	host := newVFSModuleResolutionHost(test.files)
	resolver := module.NewResolver(
		host,
		nil,
		test.compilerOptions,
	)

	for i, call := range test.calls {
		switch call.call {
		case "resolveModuleName", "resolveTypeReferenceDirective":
			var redirectedReference *module.ResolvedProjectReference
			if call.args.RedirectedRef != nil {
				redirectedReference = &module.ResolvedProjectReference{
					SourceFile: (&ast.NodeFactory{}).NewSourceFile("", call.args.RedirectedRef.SourceFile.FileName, nil).AsSourceFile(),
					CommandLine: module.ParsedCommandLine{
						Options: call.args.RedirectedRef.CommandLine.Options,
					},
				}
			}

			if call.call == "resolveModuleName" {
				resolved := resolver.ResolveModuleName(call.args.Name, call.args.ContainingFile, core.ModuleKind(call.args.ResolutionMode), redirectedReference)
				t.Run(fmt.Sprintf("resolveModuleName %d", i), func(t *testing.T) {
					assert.Assert(t, resolved != nil, "ResolveModuleName should not return nil")
					if expectedResolvedModule, ok := call.returnValue["resolvedModule"].(map[string]any); ok {
						assert.Assert(t, resolved.IsResolved)
						assert.Equal(t, resolved.ResolvedModule.ResolvedFileName, expectedResolvedModule["resolvedFileName"].(string))
						assert.Equal(t, resolved.ResolvedModule.Extension, expectedResolvedModule["extension"].(string))
						assert.Equal(t, resolved.ResolvedModule.ResolvedUsingTsExtension, expectedResolvedModule["resolvedUsingTsExtension"].(bool))
						assert.Equal(t, resolved.ResolvedModule.IsExternalLibraryImport, expectedResolvedModule["isExternalLibraryImport"].(bool))
					} else {
						assert.Assert(t, !resolved.IsResolved())
					}
				})
			} else {
				resolver.ResolveTypeReferenceDirective(call.args.Name, call.args.ContainingFile, core.ModuleKind(call.args.ResolutionMode), redirectedReference)
			}
		case "getPackageScopeForPath":
			resolver.GetPackageScopeForPath(call.args.Directory)
		default:
			t.Fatalf("Unexpected call: %s", call.call)
		}
	}

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
			if currentTestCase.name != "" {
				t.Run(currentTestCase.name, func(t *testing.T) {
					t.Parallel()
					if slices.Contains(skip, currentTestCase.name) {
						t.Skip("Test skipped")
					} else {
						runTraceBaseline(t, currentTestCase)
					}
				})
			}
			currentTestCase = traceTestCase{
				name:  json.Test,
				trace: json.Trace,
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
