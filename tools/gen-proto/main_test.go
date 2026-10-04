package main

import (
	"os"
	"path/filepath"
	"strings"
	"testing"
)

func TestGenerate(t *testing.T) {
	t.Parallel()

	repoRoot := filepath.Clean(filepath.Join("..", ".."))
	input := filepath.Join(repoRoot, "tsc", "internal", "api", "proto.go")
	output := filepath.Join(t.TempDir(), "proto.generated.ts")

	err := generate(input, output)
	if err != nil {
		t.Fatal(err)
	}
	first, err := os.ReadFile(output)
	if err != nil {
		t.Fatal(err)
	}
	generated := strings.ReplaceAll(string(first), "\r\n", "\n")

	for _, expected := range []string{
		`release: APIMethod<ReleaseParams, void>;`,
		`updateSnapshot: APIMethod<UpdateSnapshotParams, CreateSnapshotResponse>;`,
		`initialize: APIMethod<null, InitializeResponse>;`,
		`export type DocumentIdentifier = string | { uri: string; };`,
		`export interface ReleaseParams`,
		`export interface UpdateSnapshotParams`,
		`export interface CreateSnapshotParams extends SnapshotRequestChangesParams`,
		`export interface LanguageServerSnapshotChanges extends SnapshotRequestChangesParams`,
		`import type { UserPreferences } from "./userPreferences.generated.ts";`,
		`userPreferences?: UserPreferences | undefined;`,
		`prepareAutoImports?: DocumentIdentifier | undefined;`,
		`openProjects?: readonly DocumentIdentifier[] | undefined;`,
		`export type EnsurePrograms = true | readonly ProjectId[];`,
		`export type InferredProjectId = string & { __inferredProjectIdBrand: any; };`,
		`export type ConfiguredProjectId = PathKey & { __configuredProjectIdBrand: any; };`,
		`export type SyntheticProjectId = string & { __syntheticProjectIdBrand: any; };`,
		`export type ProjectId = InferredProjectId | ConfiguredProjectId | SyntheticProjectId;`,
		`ensurePrograms?: EnsurePrograms | undefined;`,
		`reconfigurePrograms?: readonly ReconfigureSnapshotProgramParams[] | undefined;`,
		`snapshot: number;`,
		`file: DocumentIdentifier;`,
		`import type { CompilerOptions, PluginImport } from "./compilerOptions.generated.ts";`,
		`export type { CompilerOptions, PluginImport } from "./compilerOptions.generated.ts";`,
		`export * from "./compilerOptions.generated.ts";`,
		`export interface CreateBuildOrchestratorParams extends BuildOptions, CompilerOptions`,
		`jsx?: JsxEmit | undefined;`,
		`module?: ModuleKind | undefined;`,
		`moduleResolution?: ModuleResolutionKind | undefined;`,
		`moduleDetection?: ModuleDetectionKind | undefined;`,
		`newLine?: NewLineKind | undefined;`,
		`paths?: Record<string, string[]> | undefined;`,
		`changedProjects?: Record<ProjectId, ProjectFileChanges | null> | undefined;`,
		`target?: ScriptTarget | undefined;`,
		`scriptKind?: ScriptKind | undefined;`,
		`export interface SourceFileDescriptor {
    fileName: RootedFilePath;
    path: PathKey;`,
		`import { SymbolOwnerKind } from "#enums/symbolOwnerKind";`,
		`kind: SymbolOwnerKind;`,
		`/** InitializeResponse is returned by the initialize method. */
export interface InitializeResponse`,
		`/** CaseSensitivity determines how the host file system compares paths. */
    caseSensitivity: CaseSensitivity;`,
		`/**
 * RawCompilerOptions is the JSON/API representation of compiler options.
 * Filesystem paths remain strings until Finalize resolves them against a base
 * directory and constructs a CompilerOptions with typed path guarantees.
 */
export interface RawCompilerOptions`,
		`export interface CreateSnapshotProgramParams {
    rootFiles: readonly DocumentIdentifier[] | null;
    compilerOptions: RawCompilerOptions;`,
		`export interface RawCompilerOptions {
    allowJs?: boolean | undefined;`,
		`declarationDir?: string | undefined;`,
		`rootDirs?: string[] | undefined;`,
		`tsBuildInfoFile?: string | undefined;`,
		`projectReferences?: ProjectReference[] | undefined;`,
		`errors: DiagnosticResponse[];`,
		`getSymbolsAtPositions: APIMethod<GetSymbolsAtPositionsParams, SymbolResponse[]>;`,
		`getContextualType: APIMethod<GetContextualTypeParams, TypeResponse | null>;`,
		`getTypePredicateOfSignature: APIMethod<CheckerSignatureParams, TypePredicateResponse | null>;`,
		`getTypeParametersOfType: APIMethod<GetTypePropertyParams, TypeResponse[] | null>;`,
		`getTypeOfSymbol: APIMethod<GetTypeOfSymbolParams, TypeResponse>;`,
		`getSourceFile: APIMethod<GetSourceFileParams, SourceFileResponse | null>;`,
		`createSourceFile: APIMethod<CreateSourceFileParams, SourceFileResponse>;`,
		`createSourceFileFromFile: APIMethod<CreateSourceFileFromFileParams, SourceFileResponse>;`,
		`getConfigSourceFile: APIMethod<GetSourceFileParams, SourceFileResponse | null>;`,
		`typeToTypeNode: APIMethod<TypeToTypeNodeParams, SourceFileResponse | null>;`,
		`signatureToSignatureDeclaration: APIMethod<SignatureToSignatureDeclarationParams, SourceFileResponse | null>;`,
		`export interface SourceFileResponse {
    /** Data is the base64-encoded binary AST data in the encoder's format. */
    data: string;
}`,
		`projects: ProjectResponse[];`,
		`operation: SnapshotOperationResponse;`,
		`createdPrograms?: SyntheticProjectId[] | undefined;`,
		`openedFiles?: OpenedFileOperationResult[] | undefined;`,
		`dirty: boolean;`,
		`entries: CompletionEntryResponse[];`,
		`outputFiles: EmitOutputFile[];`,
		`/** Path is a normalized path on disk. */
    path: RootedPath;`,
		`kind: "importSymbol";`,
	} {
		if !strings.Contains(generated, expected) {
			t.Errorf("generated output does not contain %q", expected)
		}
	}
	if strings.Contains(generated, "snapshot: number | null;") {
		t.Error("required numeric fields must not be nullable")
	}
	if strings.Contains(generated, " | null)[]") {
		t.Error("list elements must not be nullable")
	}
	if strings.Contains(generated, "projects: readonly ProjectResponse[];") {
		t.Error("response array fields must remain mutable")
	}
	for _, name := range []string{"CompilerOptions", "PluginImport"} {
		if strings.Contains(generated, "export interface "+name+" {") {
			t.Errorf("%s must be imported, not regenerated from Go", name)
		}
	}
	languageServerChanges := generated[strings.Index(generated, "export interface LanguageServerSnapshotChanges"):strings.Index(generated, "export interface BuildOptions")]
	if strings.Contains(languageServerChanges, "userPreferences") || strings.Contains(languageServerChanges, "prepareAutoImports") {
		t.Error("language server snapshot changes must not configure independent snapshot state")
	}

	err = generate(input, output)
	if err != nil {
		t.Fatal(err)
	}
	second, err := os.ReadFile(output)
	if err != nil {
		t.Fatal(err)
	}
	if string(first) != string(second) {
		t.Error("generation is not deterministic")
	}
}
