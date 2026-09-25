package main

import (
	"go/ast"
	"go/parser"
	"go/token"
	"go/types"
	"os"
	"path/filepath"
	"reflect"
	"strings"
	"testing"
)

func TestBatchFields(t *testing.T) {
	t.Parallel()

	for _, test := range []struct {
		name     string
		source   string
		fields   map[string]string
		pointers map[string]string
	}{
		{
			name:   "nested promotion and default names",
			source: "type Inner struct { Value string `json:\"value\"`; Default int; Ignored int `json:\"-\"`; hidden int }; type Outer struct { Inner }; type Params struct { Outer; Own bool `json:\"own\"` }",
			fields: map[string]string{"value": "Outer.Inner.Value", "Default": "Outer.Inner.Default", "own": "Own"},
		},
		{
			name:     "pointer promotion",
			source:   "type Inner struct { Value string `json:\"value\"` }; type Outer struct { *Inner }; type Params struct { *Outer }",
			fields:   map[string]string{"value": "Outer.Inner.Value"},
			pointers: map[string]string{"Outer": "Outer", "Outer.Inner": "Inner"},
		},
		{
			name:   "named embedding is not promoted",
			source: "type Inner struct { Value string `json:\"value\"` }; type Params struct { *Inner `json:\"inner\"` }",
			fields: map[string]string{"inner": "Inner"},
		},
		{
			name:   "ignored embedding",
			source: "type Inner struct { Value string }; type Params struct { Inner `json:\"-\"`; Own bool }",
			fields: map[string]string{"Own": "Own"},
		},
		{
			name:   "explicit JSON embedding",
			source: "type Inner struct { Value string }; type Params struct { Fields Inner `json:\",embed\"` }",
			fields: map[string]string{"Value": "Fields.Value"},
		},
		{
			name:   "shallower field wins",
			source: "type Inner struct { Value string `json:\"Value\"` }; type Params struct { Inner; Value int }",
			fields: map[string]string{"Value": "Value"},
		},
		{
			name:   "tagged field wins at equal depth",
			source: "type Left struct { Value string }; type Right struct { Renamed int `json:\"Value\"` }; type Params struct { Left; Right }",
			fields: map[string]string{"Value": "Right.Renamed"},
		},
		{
			name:   "ambiguous names are not promoted",
			source: "type Left struct { Value string }; type Right struct { Value int }; type Params struct { Left; Right; Own bool }",
			fields: map[string]string{"Own": "Own"},
		},
		{
			name:   "duplicate Go names with distinct JSON names",
			source: "type Left struct { Value string `json:\"left\"` }; type Right struct { Value int `json:\"right\"` }; type Params struct { Left; Right }",
			fields: map[string]string{"left": "Left.Value", "right": "Right.Value"},
		},
		{
			name:   "recursive embedding",
			source: "type Params struct { *Params; Value string }",
			fields: map[string]string{"Value": "Value"},
		},
	} {
		t.Run(test.name, func(t *testing.T) {
			t.Parallel()

			fileSet := token.NewFileSet()
			file, err := parser.ParseFile(fileSet, "params.go", "package api\n"+test.source, 0)
			if err != nil {
				t.Fatal(err)
			}
			var config types.Config
			pkg, err := config.Check("api", fileSet, []*ast.File{file}, nil)
			if err != nil {
				t.Fatal(err)
			}
			fields := batchFields(pkg.Scope().Lookup("Params").Type().Underlying().(*types.Struct), func(*types.Package) string { return "" })
			gotFields := make(map[string]string)
			gotPointers := make(map[string]string)
			columnNames := make(map[string]bool)
			for _, field := range fields {
				gotFields[field.jsonName] = field.selector
				if columnNames[field.goName] {
					t.Errorf("duplicate generated column name %s", field.goName)
				}
				columnNames[field.goName] = true
				for _, pointer := range field.pointers {
					gotPointers[pointer.selector] = pointer.typeName
				}
			}
			if !reflect.DeepEqual(gotFields, test.fields) {
				t.Errorf("fields = %v, want %v", gotFields, test.fields)
			}
			if len(gotPointers) != len(test.pointers) || len(gotPointers) > 0 && !reflect.DeepEqual(gotPointers, test.pointers) {
				t.Errorf("pointers = %v, want %v", gotPointers, test.pointers)
			}
		})
	}
}

func TestGenerate(t *testing.T) {
	t.Parallel()

	repoRoot := filepath.Clean(filepath.Join("..", ".."))
	input := filepath.Join(repoRoot, "tsc", "internal", "api", "proto.go")
	output := filepath.Join(t.TempDir(), "proto.generated.ts")
	batchOutput := filepath.Join(t.TempDir(), "batch_decoder_generated.go")

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
		`openProjects?: readonly DocumentIdentifier[] | undefined;`,
		`export type EnsurePrograms = true | readonly ProjectId[];`,
		`export type InferredProjectId = string & { __inferredProjectIdBrand: any; };`,
		`export type ConfiguredProjectId = Path & { __configuredProjectIdBrand: any; };`,
		`export type SyntheticProjectId = string & { __syntheticProjectIdBrand: any; };`,
		`export type ProjectId = InferredProjectId | ConfiguredProjectId | SyntheticProjectId;`,
		`ensurePrograms?: EnsurePrograms | undefined;`,
		`reconfigurePrograms?: readonly ReconfigureSnapshotProgramParams[] | undefined;`,
		`snapshot: number;`,
		`file: DocumentIdentifier;`,
		`jsx?: JsxEmit | undefined;`,
		`module?: ModuleKind | undefined;`,
		`moduleResolution?: ModuleResolutionKind | undefined;`,
		`moduleDetection?: ModuleDetectionKind | undefined;`,
		`newLine?: NewLineKind | undefined;`,
		`paths?: Record<string, string[]> | undefined;`,
		`target?: ScriptTarget | undefined;`,
		`scriptKind?: ScriptKind | undefined;`,
		`/** InitializeResponse is returned by the initialize method. */
export interface InitializeResponse`,
		`/** UseCaseSensitiveFileNames indicates whether the host file system is case-sensitive. */
    useCaseSensitiveFileNames: boolean;`,
		`/** CompilerOptions contains the compiler options exposed by the API. */
export interface CompilerOptions`,
		`projectReferences?: ProjectReference[] | undefined;`,
		`errors: DiagnosticResponse[];`,
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
    path: string;`,
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

	err = generateBatchDecoders(input, batchOutput)
	if err != nil {
		t.Fatal(err)
	}
	batchFirst, err := os.ReadFile(batchOutput)
	if err != nil {
		t.Fatal(err)
	}
	if strings.Contains(string(batchFirst), "reflect") {
		t.Error("generated batch decoders must not use reflection")
	}
	if !strings.Contains(string(batchFirst), "newBatchDecoderGetSymbolAtPositionParams") {
		t.Error("generated batch decoders do not include getSymbolAtPosition params")
	}
	err = generateBatchDecoders(input, batchOutput)
	if err != nil {
		t.Fatal(err)
	}
	batchSecond, err := os.ReadFile(batchOutput)
	if err != nil {
		t.Fatal(err)
	}
	if string(batchFirst) != string(batchSecond) {
		t.Error("batch decoder generation is not deterministic")
	}
}
