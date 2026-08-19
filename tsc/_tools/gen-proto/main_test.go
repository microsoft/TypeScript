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
	input := filepath.Join(repoRoot, "internal", "api", "proto.go")
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
		`updateSnapshot: APIMethod<UpdateSnapshotParams, UpdateSnapshotResponse>;`,
		`initialize: APIMethod<null, InitializeResponse>;`,
		`export type DocumentIdentifier = string | { uri: string; };`,
		`export interface ReleaseParams`,
		`export interface UpdateSnapshotParams`,
		`openProjects?: readonly DocumentIdentifier[];`,
		`snapshot: number;`,
		`file: DocumentIdentifier;`,
		`import type { JsxEmit } from "#enums/jsxEmit";`,
		`import type { ModuleDetectionKind } from "#enums/moduleDetectionKind";`,
		`import type { ModuleKind } from "#enums/moduleKind";`,
		`import type { ModuleResolutionKind } from "#enums/moduleResolutionKind";`,
		`import type { NewLineKind } from "#enums/newLineKind";`,
		`import type { ScriptTarget } from "#enums/scriptTarget";`,
		`jsx?: JsxEmit;`,
		`module?: ModuleKind;`,
		`moduleResolution?: ModuleResolutionKind;`,
		`moduleDetection?: ModuleDetectionKind;`,
		`newLine?: NewLineKind;`,
		`paths?: Record<string, string[]>;`,
		`target?: ScriptTarget;`,
		`/** InitializeResponse is returned by the initialize method. */
export interface InitializeResponse`,
		`/** UseCaseSensitiveFileNames indicates whether the host file system is case-sensitive. */
    useCaseSensitiveFileNames: boolean;`,
		`/** CompilerOptions contains the compiler options exposed by the API. */
export interface CompilerOptions`,
		`projectReferences?: ProjectReference[];`,
		`errors: DiagnosticResponse[];`,
		`getSymbolsAtPositions: APIMethod<GetSymbolsAtPositionsParams, SymbolResponse[]>;`,
		`getContextualType: APIMethod<GetContextualTypeParams, TypeResponse | null>;`,
		`getTypePredicateOfSignature: APIMethod<CheckerSignatureParams, TypePredicateResponse | null>;`,
		`getTypeParametersOfType: APIMethod<GetTypePropertyParams, TypeResponse[] | null>;`,
		`getTypeOfSymbol: APIMethod<GetTypeOfSymbolParams, TypeResponse>;`,
		`getSourceFile: APIMethod<GetSourceFileParams, SourceFileResponse | null>;`,
		`getConfigSourceFile: APIMethod<GetSourceFileParams, SourceFileResponse | null>;`,
		`typeToTypeNode: APIMethod<TypeToTypeNodeParams, SourceFileResponse | null>;`,
		`signatureToSignatureDeclaration: APIMethod<SignatureToSignatureDeclarationParams, SourceFileResponse | null>;`,
		`export interface SourceFileResponse {
    /** Data is the base64-encoded binary AST data in the encoder's format. */
    data: string;
}`,
		`projects: ProjectResponse[];`,
		`entries: CompletionEntryResponse[];`,
		`outputFiles: EmitOutputFile[];`,
		`/** Path is a normalized path on disk. */
    path: string;`,
		`/** Snapshot is the current client snapshot on which to layer the temporary update. */
    snapshot: number;`,
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
