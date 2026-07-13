package api

import (
	"errors"
	"fmt"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/checker"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/diagnostics"
	"github.com/microsoft/typescript-go/internal/jsnum"
	"github.com/microsoft/typescript-go/internal/json"
	"github.com/microsoft/typescript-go/internal/locale"
	"github.com/microsoft/typescript-go/internal/ls/lsconv"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/project"
	"github.com/microsoft/typescript-go/internal/tspath"
)

var (
	ErrInvalidRequest = errors.New("api: invalid request")
	ErrClientError    = errors.New("api: client error")
)

type Method string

type (
	SnapshotID  uint64
	ProjectID   string
	SymbolID    uint64
	TypeID      uint32
	SignatureID uint64
	NodeHandle  string
)

func ProjectHandle(p *project.Project) ProjectID {
	return ProjectID(p.ID())
}

func SymbolHandle(symbol *ast.Symbol) SymbolID {
	return SymbolID(ast.GetSymbolId(symbol))
}

func TypeHandle(t *checker.Type) TypeID {
	return TypeID(t.Id())
}

func SignatureHandle(sig *checker.Signature) SignatureID {
	return SignatureID(sig.Id())
}

func parseProjectHandle(handle ProjectID) tspath.Path {
	return tspath.Path(handle)
}

const (
	MethodRelease Method = "release"

	// MethodGetServerTiming retrieves the server's collected per-request
	// processing-time totals and recent-request ring buffer. It is handled by
	// the connection itself (not the session) and is not recorded in the timing
	// it reports.
	MethodGetServerTiming Method = "getServerTiming"

	// MethodResetServerTiming clears the server's collected timing totals and
	// recent-request ring buffer. Like MethodGetServerTiming, it is handled by
	// the connection itself and is not recorded.
	MethodResetServerTiming Method = "resetServerTiming"

	MethodInitialize               Method = "initialize"
	MethodUpdateSnapshot           Method = "updateSnapshot"
	MethodParseConfigFile          Method = "parseConfigFile"
	MethodGetDefaultProjectForFile Method = "getDefaultProjectForFile"
	MethodGetSymbolAtPosition      Method = "getSymbolAtPosition"
	MethodGetSymbolsAtPositions    Method = "getSymbolsAtPositions"
	MethodGetSymbolAtLocation      Method = "getSymbolAtLocation"
	MethodGetSymbolsAtLocations    Method = "getSymbolsAtLocations"
	MethodGetTypeOfSymbol          Method = "getTypeOfSymbol"
	MethodGetTypesOfSymbols        Method = "getTypesOfSymbols"
	MethodGetDeclaredTypeOfSymbol  Method = "getDeclaredTypeOfSymbol"
	MethodGetSourceFile            Method = "getSourceFile"
	MethodGetSourceFileNames       Method = "getSourceFileNames"
	MethodGetSourceFileMetadata    Method = "getSourceFileMetadata"
	MethodResolveName              Method = "resolveName"
	MethodGetSignaturesOfType      Method = "getSignaturesOfType"
	MethodGetResolvedSignature     Method = "getResolvedSignature"
	MethodGetTypeAtLocation        Method = "getTypeAtLocation"
	MethodGetTypeAtLocations       Method = "getTypeAtLocations"
	MethodGetTypeAtPosition        Method = "getTypeAtPosition"
	MethodGetTypesAtPositions      Method = "getTypesAtPositions"

	// Symbol sub-property methods
	MethodGetParentOfSymbol       Method = "getParentOfSymbol"
	MethodGetMembersOfSymbol      Method = "getMembersOfSymbol"
	MethodGetExportsOfSymbol      Method = "getExportsOfSymbol"
	MethodGetExportSymbolOfSymbol Method = "getExportSymbolOfSymbol"

	// Type sub-property methods
	MethodGetSymbolOfType              Method = "getSymbolOfType"
	MethodGetTargetOfType              Method = "getTargetOfType"
	MethodGetFreshTypeOfType           Method = "getFreshTypeOfType"
	MethodGetRegularTypeOfType         Method = "getRegularTypeOfType"
	MethodGetTypesOfType               Method = "getTypesOfType"
	MethodGetTypeParametersOfType      Method = "getTypeParametersOfType"
	MethodGetOuterTypeParametersOfType Method = "getOuterTypeParametersOfType"
	MethodGetLocalTypeParametersOfType Method = "getLocalTypeParametersOfType"
	MethodGetAliasTypeArgumentsOfType  Method = "getAliasTypeArgumentsOfType"
	MethodGetAliasSymbolOfType         Method = "getAliasSymbolOfType"
	MethodGetObjectTypeOfType          Method = "getObjectTypeOfType"
	MethodGetIndexTypeOfType           Method = "getIndexTypeOfType"
	MethodGetCheckTypeOfType           Method = "getCheckTypeOfType"
	MethodGetExtendsTypeOfType         Method = "getExtendsTypeOfType"
	MethodGetBaseTypeOfType            Method = "getBaseTypeOfType"
	MethodGetConstraintOfType          Method = "getConstraintOfType"

	// Signature sub-property methods
	MethodGetTypeParametersOfSignature Method = "getTypeParametersOfSignature"
	MethodGetParametersOfSignature     Method = "getParametersOfSignature"
	MethodGetThisParameterOfSignature  Method = "getThisParameterOfSignature"
	MethodGetTargetOfSignature         Method = "getTargetOfSignature"

	// Checker methods
	MethodGetContextualType                 Method = "getContextualType"
	MethodGetBaseTypeOfLiteralType          Method = "getBaseTypeOfLiteralType"
	MethodGetNonNullableType                Method = "getNonNullableType"
	MethodGetTypeFromTypeNode               Method = "getTypeFromTypeNode"
	MethodGetWidenedType                    Method = "getWidenedType"
	MethodGetParameterType                  Method = "getParameterType"
	MethodIsArrayLikeType                   Method = "isArrayLikeType"
	MethodIsTypeAssignableTo                Method = "isTypeAssignableTo"
	MethodGetShorthandAssignmentValueSymbol Method = "getShorthandAssignmentValueSymbol"
	MethodGetTypeOfSymbolAtLocation         Method = "getTypeOfSymbolAtLocation"
	MethodTypeToTypeNode                    Method = "typeToTypeNode"
	MethodSignatureToSignatureDeclaration   Method = "signatureToSignatureDeclaration"
	MethodTypeToString                      Method = "typeToString"
	MethodIsContextSensitive                Method = "isContextSensitive"
	MethodGetReturnTypeOfSignature          Method = "getReturnTypeOfSignature"
	MethodGetRestTypeOfSignature            Method = "getRestTypeOfSignature"
	MethodGetTypePredicateOfSignature       Method = "getTypePredicateOfSignature"
	MethodGetBaseTypes                      Method = "getBaseTypes"
	MethodGetPropertiesOfType               Method = "getPropertiesOfType"
	MethodGetApparentType                   Method = "getApparentType"
	MethodGetPropertyOfType                 Method = "getPropertyOfType"
	MethodGetIndexInfosOfType               Method = "getIndexInfosOfType"
	MethodGetConstraintOfTypeParameter      Method = "getConstraintOfTypeParameter"
	MethodGetBaseConstraintOfType           Method = "getBaseConstraintOfType"
	MethodGetTypeArguments                  Method = "getTypeArguments"
	MethodGetImportAdderEdits               Method = "getImportAdderEdits"
	MethodGetTrueTypeOfConditionalType      Method = "getTrueTypeOfConditionalType"
	MethodGetFalseTypeOfConditionalType     Method = "getFalseTypeOfConditionalType"
	MethodGetConstantValue                  Method = "getConstantValue"
	MethodGetSignatureFromDeclaration       Method = "getSignatureFromDeclaration"
	MethodGetExportSpecifierLocalTarget     Method = "getExportSpecifierLocalTargetSymbol"
	MethodGetAliasedSymbol                  Method = "getAliasedSymbol"
	MethodGetImmediateAliasedSymbol         Method = "getImmediateAliasedSymbol"
	MethodGetExportsOfModule                Method = "getExportsOfModule"
	MethodGetMemberInModuleExports          Method = "getMemberInModuleExports"
	MethodGetJSDocTags                      Method = "getJsDocTags"
	MethodGetDocumentationComment           Method = "getDocumentationComment"
	MethodIsArrayType                       Method = "isArrayType"
	MethodIsTupleType                       Method = "isTupleType"

	// Reference methods
	MethodGetReferencesToSymbolInFile Method = "getReferencesToSymbolInFile"
	MethodGetReferencedSymbolsForNode Method = "getReferencedSymbolsForNode"
	MethodGetSignatureUsages          Method = "getSignatureUsages"

	// Language service methods
	MethodGetCompletionsAtPosition Method = "getCompletionsAtPosition"

	// Diagnostic methods
	MethodGetSyntacticDiagnostics         Method = "getSyntacticDiagnostics"
	MethodGetBindDiagnostics              Method = "getBindDiagnostics"
	MethodGetSemanticDiagnostics          Method = "getSemanticDiagnostics"
	MethodGetSuggestionDiagnostics        Method = "getSuggestionDiagnostics"
	MethodGetDeclarationDiagnostics       Method = "getDeclarationDiagnostics"
	MethodGetProgramDiagnostics           Method = "getProgramDiagnostics"
	MethodGetGlobalDiagnostics            Method = "getGlobalDiagnostics"
	MethodGetConfigFileParsingDiagnostics Method = "getConfigFileParsingDiagnostics"

	// Emitter methods
	MethodPrintNode Method = "printNode"

	// Intrinsic type getters
	MethodGetAnyType       Method = "getAnyType"
	MethodGetStringType    Method = "getStringType"
	MethodGetNumberType    Method = "getNumberType"
	MethodGetBooleanType   Method = "getBooleanType"
	MethodGetVoidType      Method = "getVoidType"
	MethodGetUndefinedType Method = "getUndefinedType"
	MethodGetNullType      Method = "getNullType"
	MethodGetNeverType     Method = "getNeverType"
	MethodGetUnknownType   Method = "getUnknownType"
	MethodGetBigIntType    Method = "getBigIntType"
	MethodGetESSymbolType  Method = "getESSymbolType"

	// Well-known per-checker symbols
	MethodGetWellKnownSymbols Method = "getWellKnownSymbols"

	// Well-known per-checker signatures
	MethodGetWellKnownSignatures Method = "getWellKnownSignatures"

	// Profiling methods
	MethodStartCPUProfile Method = "startCPUProfile"
	MethodStopCPUProfile  Method = "stopCPUProfile"
	MethodSaveHeapProfile Method = "saveHeapProfile"
)

// InitializeResponse is returned by the initialize method.
type InitializeResponse struct {
	// UseCaseSensitiveFileNames indicates whether the host file system is case-sensitive.
	UseCaseSensitiveFileNames bool `json:"useCaseSensitiveFileNames"`
	// CurrentDirectory is the server's current working directory.
	CurrentDirectory string `json:"currentDirectory"`
}

// DocumentIdentifier identifies a document by either a file name (plain string) or a URI object.
// On the wire it is string | { uri: string }.
type DocumentIdentifier struct {
	FileName string              `json:"fileName,omitempty"`
	URI      lsproto.DocumentUri `json:"uri,omitempty"`
}

var _ json.UnmarshalerFrom = (*DocumentIdentifier)(nil)

func (d *DocumentIdentifier) UnmarshalJSONFrom(dec *json.Decoder) error {
	// Try reading as a plain string first
	tok, err := dec.ReadToken()
	if err != nil {
		return err
	}
	switch tok.Kind() {
	case '"':
		d.FileName = tok.String()
		return nil
	case '{':
		// Read the object fields
		for dec.PeekKind() != '}' {
			key, err := dec.ReadToken()
			if err != nil {
				return err
			}
			isURI := key.String() == "uri"
			val, err := dec.ReadToken()
			if err != nil {
				return err
			}
			if isURI {
				d.URI = lsproto.DocumentUri(val.String())
			}
		}
		// Consume the closing brace
		if _, err := dec.ReadToken(); err != nil {
			return err
		}
		return nil
	default:
		return fmt.Errorf("DocumentIdentifier: expected string or object, got %v", tok.Kind())
	}
}

func (d DocumentIdentifier) ToFileName() string {
	if d.URI != "" {
		return d.URI.FileName()
	}
	return d.FileName
}

// ToURI returns the document URI for this identifier. An explicitly provided URI
// is returned as-is; a file name is first normalized to an absolute path against
// cwd before being converted to a URI.
func (d DocumentIdentifier) ToURI(cwd string) lsproto.DocumentUri {
	if d.URI != "" {
		return d.URI
	}
	return lsconv.FileNameToDocumentURI(tspath.GetNormalizedAbsolutePath(d.FileName, cwd))
}

func (d DocumentIdentifier) ToAbsoluteFileName(cwd string) string {
	if d.URI != "" {
		return d.URI.FileName()
	}
	return tspath.GetNormalizedAbsolutePath(d.FileName, cwd)
}

func (d DocumentIdentifier) String() string {
	if d.URI != "" {
		return string(d.URI)
	}
	return d.FileName
}

// APIFileChangeSummary lists documents that have been changed, created, or deleted.
type APIFileChangeSummary struct {
	Changed []DocumentIdentifier `json:"changed,omitempty"`
	Created []DocumentIdentifier `json:"created,omitempty"`
	Deleted []DocumentIdentifier `json:"deleted,omitempty"`
}

// APIFileChanges describes file changes to apply when updating a snapshot.
// Either InvalidateAll is true (discard all caches) or Changed/Created/Deleted
// list individual documents.
type APIFileChanges struct {
	InvalidateAll bool                 `json:"invalidateAll,omitempty"`
	Changed       []DocumentIdentifier `json:"changed,omitempty"`
	Created       []DocumentIdentifier `json:"created,omitempty"`
	Deleted       []DocumentIdentifier `json:"deleted,omitempty"`
}

// UpdateSnapshotParams are the parameters for creating a new snapshot.
// All fields are optional. With no fields set, the server adopts the latest LSP state.
type UpdateSnapshotParams struct {
	// OpenProjects lists tsconfig.json files to open/load in the new snapshot.
	// Opens are ref-counted and persist across snapshots until closed.
	OpenProjects []DocumentIdentifier `json:"openProjects,omitempty"`
	// CloseProjects lists tsconfig.json files to release in the new snapshot.
	// A project is only unloaded once every API client that opened it closes it.
	CloseProjects []DocumentIdentifier `json:"closeProjects,omitempty"`
	// FileChanges describes file system changes since the last snapshot.
	FileChanges *APIFileChanges `json:"fileChanges,omitempty"`
	// OpenFiles lists files to keep open for the API client, mirroring LSP's
	// textDocument/didOpen. For each file, ancestor directories are searched for a
	// tsconfig that contains it; if found, that configured project is loaded and
	// becomes the file's default project. Otherwise the file is loaded into the
	// inferred project (e.g. a node_modules d.ts not in any project's import graph).
	// Opens persist across snapshots until the file is closed.
	OpenFiles []DocumentIdentifier `json:"openFiles,omitempty"`
	// CloseFiles lists files to release in the new snapshot. A file is only fully
	// closed once every API client that opened it closes it.
	CloseFiles []DocumentIdentifier `json:"closeFiles,omitempty"`
}

// ProjectFileChanges describes what source files changed within a single project.
type ProjectFileChanges struct {
	// ChangedFiles lists source file paths whose content differs.
	ChangedFiles []tspath.Path `json:"changedFiles,omitempty"`
	// DeletedFiles lists source file paths removed from the project's program.
	DeletedFiles []tspath.Path `json:"deletedFiles,omitempty"`
}

// SnapshotChanges describes what changed between the previous latest snapshot
// and the newly created snapshot. Changes are reported per-project so clients
// can track cache refs at the (snapshot, project) level.
type SnapshotChanges struct {
	// ChangedProjects maps project handles to the file changes within that project.
	// Projects not listed here (and not in RemovedProjects) are unchanged.
	ChangedProjects map[ProjectID]*ProjectFileChanges `json:"changedProjects,omitempty"`
	// RemovedProjects lists project handles that were present in the previous
	// snapshot but absent from the new one.
	RemovedProjects []ProjectID `json:"removedProjects,omitempty"`
}

// UpdateSnapshotResponse is returned by updateSnapshot.
type UpdateSnapshotResponse struct {
	// Snapshot is the handle for the newly created snapshot.
	Snapshot SnapshotID `json:"snapshot"`
	// Projects is the list of projects in the snapshot.
	Projects []*ProjectResponse `json:"projects"`
	// Changes describes source file differences from the previous snapshot.
	// Nil for the first snapshot in a session.
	Changes *SnapshotChanges `json:"changes,omitempty"`
}

var unmarshalers = map[Method]func([]byte) (any, error){
	MethodRelease:                  unmarshallerFor[ReleaseParams],
	MethodInitialize:               noParams,
	MethodUpdateSnapshot:           unmarshallerFor[UpdateSnapshotParams],
	MethodParseConfigFile:          unmarshallerFor[ParseConfigFileParams],
	MethodGetDefaultProjectForFile: unmarshallerFor[GetDefaultProjectForFileParams],
	MethodGetSourceFile:            unmarshallerFor[GetSourceFileParams],
	MethodGetSourceFileNames:       unmarshallerFor[GetSourceFileNamesParams],
	MethodGetSourceFileMetadata:    unmarshallerFor[GetSourceFileParams],
	MethodGetSymbolAtPosition:      unmarshallerFor[GetSymbolAtPositionParams],
	MethodGetSymbolsAtPositions:    unmarshallerFor[GetSymbolsAtPositionsParams],
	MethodGetSymbolAtLocation:      unmarshallerFor[GetSymbolAtLocationParams],
	MethodGetSymbolsAtLocations:    unmarshallerFor[GetSymbolsAtLocationsParams],
	MethodGetTypeOfSymbol:          unmarshallerFor[GetTypeOfSymbolParams],
	MethodGetTypesOfSymbols:        unmarshallerFor[GetTypesOfSymbolsParams],
	MethodGetDeclaredTypeOfSymbol:  unmarshallerFor[GetTypeOfSymbolParams],
	MethodResolveName:              unmarshallerFor[ResolveNameParams],
	MethodGetSignaturesOfType:      unmarshallerFor[GetSignaturesOfTypeParams],
	MethodGetResolvedSignature:     unmarshallerFor[GetResolvedSignatureParams],
	MethodGetTypeAtLocation:        unmarshallerFor[GetTypeAtLocationParams],
	MethodGetTypeAtLocations:       unmarshallerFor[GetTypeAtLocationsParams],
	MethodGetTypeAtPosition:        unmarshallerFor[GetTypeAtPositionParams],
	MethodGetTypesAtPositions:      unmarshallerFor[GetTypesAtPositionsParams],

	MethodGetParentOfSymbol:       unmarshallerFor[GetSymbolPropertyParams],
	MethodGetMembersOfSymbol:      unmarshallerFor[GetSymbolPropertyParams],
	MethodGetExportsOfSymbol:      unmarshallerFor[GetSymbolPropertyParams],
	MethodGetExportSymbolOfSymbol: unmarshallerFor[GetSymbolPropertyParams],

	MethodGetSymbolOfType:               unmarshallerFor[GetTypePropertyParams],
	MethodGetTargetOfType:               unmarshallerFor[GetTypePropertyParams],
	MethodGetFreshTypeOfType:            unmarshallerFor[GetTypePropertyParams],
	MethodGetRegularTypeOfType:          unmarshallerFor[GetTypePropertyParams],
	MethodGetTypesOfType:                unmarshallerFor[GetTypePropertyParams],
	MethodGetTypeParametersOfType:       unmarshallerFor[GetTypePropertyParams],
	MethodGetOuterTypeParametersOfType:  unmarshallerFor[GetTypePropertyParams],
	MethodGetLocalTypeParametersOfType:  unmarshallerFor[GetTypePropertyParams],
	MethodGetAliasTypeArgumentsOfType:   unmarshallerFor[GetTypePropertyParams],
	MethodGetAliasSymbolOfType:          unmarshallerFor[GetTypePropertyParams],
	MethodGetObjectTypeOfType:           unmarshallerFor[GetTypePropertyParams],
	MethodGetIndexTypeOfType:            unmarshallerFor[GetTypePropertyParams],
	MethodGetCheckTypeOfType:            unmarshallerFor[GetTypePropertyParams],
	MethodGetExtendsTypeOfType:          unmarshallerFor[GetTypePropertyParams],
	MethodGetBaseTypeOfType:             unmarshallerFor[GetTypePropertyParams],
	MethodGetConstraintOfType:           unmarshallerFor[GetTypePropertyParams],
	MethodGetTrueTypeOfConditionalType:  unmarshallerFor[GetTypePropertyParams],
	MethodGetFalseTypeOfConditionalType: unmarshallerFor[GetTypePropertyParams],

	MethodGetTypeParametersOfSignature: unmarshallerFor[GetSignaturePropertyParams],
	MethodGetParametersOfSignature:     unmarshallerFor[GetSignaturePropertyParams],
	MethodGetThisParameterOfSignature:  unmarshallerFor[GetSignaturePropertyParams],
	MethodGetTargetOfSignature:         unmarshallerFor[GetSignaturePropertyParams],

	MethodGetContextualType:                 unmarshallerFor[GetContextualTypeParams],
	MethodGetBaseTypeOfLiteralType:          unmarshallerFor[GetBaseTypeOfLiteralTypeParams],
	MethodGetNonNullableType:                unmarshallerFor[GetNonNullableTypeParams],
	MethodGetTypeFromTypeNode:               unmarshallerFor[GetTypeFromTypeNodeParams],
	MethodGetWidenedType:                    unmarshallerFor[GetWidenedTypeParams],
	MethodGetParameterType:                  unmarshallerFor[GetParameterTypeParams],
	MethodIsArrayLikeType:                   unmarshallerFor[IsArrayLikeTypeParams],
	MethodIsTypeAssignableTo:                unmarshallerFor[IsTypeAssignableToParams],
	MethodGetShorthandAssignmentValueSymbol: unmarshallerFor[GetTypeAtLocationParams],
	MethodGetTypeOfSymbolAtLocation:         unmarshallerFor[GetTypeOfSymbolAtLocationParams],
	MethodTypeToTypeNode:                    unmarshallerFor[TypeToTypeNodeParams],
	MethodSignatureToSignatureDeclaration:   unmarshallerFor[SignatureToSignatureDeclarationParams],
	MethodTypeToString:                      unmarshallerFor[TypeToTypeNodeParams],
	MethodIsContextSensitive:                unmarshallerFor[GetContextualTypeParams],
	MethodGetReturnTypeOfSignature:          unmarshallerFor[CheckerSignatureParams],
	MethodGetRestTypeOfSignature:            unmarshallerFor[CheckerSignatureParams],
	MethodGetTypePredicateOfSignature:       unmarshallerFor[CheckerSignatureParams],
	MethodGetBaseTypes:                      unmarshallerFor[CheckerTypeParams],
	MethodGetPropertiesOfType:               unmarshallerFor[CheckerTypeParams],
	MethodGetApparentType:                   unmarshallerFor[CheckerTypeParams],
	MethodGetPropertyOfType:                 unmarshallerFor[GetPropertyOfTypeParams],
	MethodGetIndexInfosOfType:               unmarshallerFor[CheckerTypeParams],
	MethodGetConstraintOfTypeParameter:      unmarshallerFor[CheckerTypeParams],
	MethodGetBaseConstraintOfType:           unmarshallerFor[CheckerTypeParams],
	MethodGetTypeArguments:                  unmarshallerFor[CheckerTypeParams],
	MethodGetImportAdderEdits:               unmarshallerFor[GetImportAdderEditsParams],
	MethodGetConstantValue:                  unmarshallerFor[CheckerNodeParams],
	MethodGetSignatureFromDeclaration:       unmarshallerFor[CheckerNodeParams],
	MethodGetExportSpecifierLocalTarget:     unmarshallerFor[CheckerNodeParams],
	MethodGetAliasedSymbol:                  unmarshallerFor[CheckerSymbolParams],
	MethodGetImmediateAliasedSymbol:         unmarshallerFor[CheckerSymbolParams],
	MethodGetExportsOfModule:                unmarshallerFor[CheckerSymbolParams],
	MethodGetMemberInModuleExports:          unmarshallerFor[GetMemberInModuleExportsParams],
	MethodGetJSDocTags:                      unmarshallerFor[CheckerSymbolParams],
	MethodGetDocumentationComment:           unmarshallerFor[CheckerSymbolParams],
	MethodIsArrayType:                       unmarshallerFor[CheckerTypeParams],
	MethodIsTupleType:                       unmarshallerFor[CheckerTypeParams],
	MethodGetReferencesToSymbolInFile:       unmarshallerFor[GetReferencesToSymbolInFileParams],
	MethodGetReferencedSymbolsForNode:       unmarshallerFor[GetReferencedSymbolsForNodeParams],
	MethodGetSignatureUsages:                unmarshallerFor[GetSignatureUsagesParams],
	MethodGetCompletionsAtPosition:          unmarshallerFor[GetCompletionsAtPositionParams],
	MethodPrintNode:                         unmarshallerFor[PrintNodeParams],
	MethodGetAnyType:                        unmarshallerFor[GetIntrinsicTypeParams],
	MethodGetStringType:                     unmarshallerFor[GetIntrinsicTypeParams],
	MethodGetNumberType:                     unmarshallerFor[GetIntrinsicTypeParams],
	MethodGetBooleanType:                    unmarshallerFor[GetIntrinsicTypeParams],
	MethodGetVoidType:                       unmarshallerFor[GetIntrinsicTypeParams],
	MethodGetUndefinedType:                  unmarshallerFor[GetIntrinsicTypeParams],
	MethodGetNullType:                       unmarshallerFor[GetIntrinsicTypeParams],
	MethodGetNeverType:                      unmarshallerFor[GetIntrinsicTypeParams],
	MethodGetUnknownType:                    unmarshallerFor[GetIntrinsicTypeParams],
	MethodGetBigIntType:                     unmarshallerFor[GetIntrinsicTypeParams],
	MethodGetESSymbolType:                   unmarshallerFor[GetIntrinsicTypeParams],
	MethodGetWellKnownSymbols:               unmarshallerFor[GetIntrinsicTypeParams],
	MethodGetWellKnownSignatures:            unmarshallerFor[GetIntrinsicTypeParams],
	MethodGetSyntacticDiagnostics:           unmarshallerFor[GetDiagnosticsParams],
	MethodGetBindDiagnostics:                unmarshallerFor[GetDiagnosticsParams],
	MethodGetSemanticDiagnostics:            unmarshallerFor[GetDiagnosticsParams],
	MethodGetSuggestionDiagnostics:          unmarshallerFor[GetDiagnosticsParams],
	MethodGetDeclarationDiagnostics:         unmarshallerFor[GetDiagnosticsParams],
	MethodGetProgramDiagnostics:             unmarshallerFor[GetProjectDiagnosticsParams],
	MethodGetGlobalDiagnostics:              unmarshallerFor[GetProjectDiagnosticsParams],
	MethodGetConfigFileParsingDiagnostics:   unmarshallerFor[GetProjectDiagnosticsParams],
	MethodStartCPUProfile:                   unmarshallerFor[ProfileParams],
	MethodStopCPUProfile:                    noParams,
	MethodSaveHeapProfile:                   unmarshallerFor[ProfileParams],
}

type ParseConfigFileParams struct {
	File DocumentIdentifier `json:"file"`
}

// ReleaseParams are the parameters for the release method.
type ReleaseParams struct {
	Snapshot SnapshotID `json:"snapshot"`
}

type ProfileParams struct {
	Dir string `json:"dir"`
}

type ProfileResult struct {
	File string `json:"file"`
}

type ConfigFileResponse struct {
	FileNames []string              `json:"fileNames"`
	Options   *core.CompilerOptions `json:"options"`
}

type GetDefaultProjectForFileParams struct {
	Snapshot SnapshotID         `json:"snapshot"`
	File     DocumentIdentifier `json:"file"`
}

type ProjectResponse struct {
	Id              ProjectID             `json:"id"`
	ConfigFileName  string                `json:"configFileName"`
	RootFiles       []string              `json:"rootFiles"`
	CompilerOptions *core.CompilerOptions `json:"compilerOptions"`
}

func NewProjectResponse(p *project.Project) *ProjectResponse {
	if p == nil || p.CommandLine == nil {
		panic("NewProjectResponse called with unloaded project")
	}
	return &ProjectResponse{
		Id:              ProjectHandle(p),
		ConfigFileName:  p.Name(),
		RootFiles:       p.CommandLine.FileNames(),
		CompilerOptions: p.CommandLine.CompilerOptions(),
	}
}

type GetSymbolAtPositionParams struct {
	Snapshot SnapshotID         `json:"snapshot"`
	Project  ProjectID          `json:"project"`
	File     DocumentIdentifier `json:"file"`
	Position uint32             `json:"position"`
}

type GetSymbolsAtPositionsParams struct {
	Snapshot  SnapshotID         `json:"snapshot"`
	Project   ProjectID          `json:"project"`
	File      DocumentIdentifier `json:"file"`
	Positions []uint32           `json:"positions"`
}

type GetSymbolAtLocationParams struct {
	Snapshot SnapshotID `json:"snapshot"`
	Project  ProjectID  `json:"project"`
	Location NodeHandle `json:"location"`
}

type GetSymbolsAtLocationsParams struct {
	Snapshot  SnapshotID   `json:"snapshot"`
	Project   ProjectID    `json:"project"`
	Locations []NodeHandle `json:"locations"`
}

type SymbolResponse struct {
	Id               SymbolID     `json:"id"`
	Project          ProjectID    `json:"project"`
	Name             string       `json:"name"`
	Flags            uint32       `json:"flags"`
	CheckFlags       uint32       `json:"checkFlags"`
	Declarations     []NodeHandle `json:"declarations,omitempty"`
	ValueDeclaration NodeHandle   `json:"valueDeclaration,omitempty"`
	Parent           SymbolID     `json:"parent,omitzero"`
	ExportSymbol     SymbolID     `json:"exportSymbol,omitzero"`
}

func symbolHandles(symbols []*ast.Symbol) []SymbolID {
	if len(symbols) == 0 {
		return nil
	}
	handles := make([]SymbolID, len(symbols))
	for i, t := range symbols {
		handles[i] = SymbolHandle(t)
	}
	return handles
}

type GetTypeOfSymbolParams struct {
	Snapshot SnapshotID `json:"snapshot"`
	Project  ProjectID  `json:"project"`
	Symbol   SymbolID   `json:"symbol"`
}

type GetTypesOfSymbolsParams struct {
	Snapshot SnapshotID `json:"snapshot"`
	Project  ProjectID  `json:"project"`
	Symbols  []SymbolID `json:"symbols"`
}

type TypeResponse struct {
	Id          TypeID `json:"id"`
	Flags       uint32 `json:"flags"`
	ObjectFlags uint32 `json:"objectFlags,omitempty"`

	// LiteralType data
	Value any `json:"value"`

	// ObjectType / TypeReference / StringMappingType / IndexType target
	Target TypeID `json:"target,omitzero"`

	// InterfaceType type parameters
	TypeParameters      []TypeID `json:"typeParameters,omitempty"`
	OuterTypeParameters []TypeID `json:"outerTypeParameters,omitempty"`
	LocalTypeParameters []TypeID `json:"localTypeParameters,omitempty"`

	// TupleType data
	ElementFlags  []checker.ElementFlags `json:"elementFlags,omitempty"`
	FixedLength   *int                   `json:"fixedLength,omitempty"`
	TupleReadonly *bool                  `json:"readonly,omitempty"`

	// IndexedAccessType data
	ObjectType TypeID `json:"objectType,omitzero"`
	IndexType  TypeID `json:"indexType,omitzero"`

	// ConditionalType data
	CheckType   TypeID `json:"checkType,omitzero"`
	ExtendsType TypeID `json:"extendsType,omitzero"`

	// SubstitutionType data
	BaseType        TypeID `json:"baseType,omitzero"`
	SubstConstraint TypeID `json:"substConstraint,omitzero"`

	// TemplateLiteralType text segments
	Texts []string `json:"texts,omitempty"`

	// FreshableType data (LiteralType and computed enum types)
	FreshType   TypeID `json:"freshType,omitzero"`
	RegularType TypeID `json:"regularType,omitzero"`

	// TypeParameter data
	IsThisType bool `json:"isThisType,omitempty"`

	// IntrinsicType data
	IntrinsicName string `json:"intrinsicName,omitempty"`

	// TypeAlias data
	AliasTypeArguments []TypeID `json:"aliasTypeArguments,omitempty"`
	AliasSymbol        SymbolID `json:"aliasSymbol,omitzero"`

	// Symbol associated with structured types
	Symbol SymbolID `json:"symbol,omitzero"`
}

func newTypeResponse(t *checker.Type, id TypeID) *TypeResponse {
	resp := &TypeResponse{
		Id:    id,
		Flags: uint32(t.Flags()),
	}

	if t.Symbol() != nil {
		resp.Symbol = SymbolHandle(t.Symbol())
	}

	if t.Alias() != nil {
		resp.AliasTypeArguments = typeHandles(t.Alias().TypeArguments())
		if t.Alias().Symbol() != nil {
			resp.AliasSymbol = SymbolHandle(t.Alias().Symbol())
		}
	}

	switch flags := t.Flags(); {
	case flags&checker.TypeFlagsFreshable != 0:
		lit := t.AsLiteralType()
		if flags&checker.TypeFlagsLiteral != 0 {
			resp.Value = literalValueToJSON(lit.Value())
		}
		if lit.FreshType() != nil {
			resp.FreshType = TypeHandle(lit.FreshType())
		}
		if lit.RegularType() != nil {
			resp.RegularType = TypeHandle(lit.RegularType())
		}
	case flags&checker.TypeFlagsObject != 0:
		resp.ObjectFlags = uint32(t.ObjectFlags())
		objectFlags := t.ObjectFlags()
		if objectFlags&checker.ObjectFlagsReference != 0 {
			var ref *checker.TypeReference
			if objectFlags&checker.ObjectFlagsTuple != 0 {
				tuple := t.AsTupleType()
				ref = tuple.AsTypeReference()
				resp.ElementFlags = tuple.ElementFlags()
				fixedLen := tuple.FixedLength()
				resp.FixedLength = &fixedLen
				isReadonly := tuple.IsReadonly()
				resp.TupleReadonly = &isReadonly
			} else {
				ref = t.AsTypeReference()
			}
			if ref.Target() != nil {
				resp.Target = TypeHandle(ref.Target())
			}
		}
		if objectFlags&checker.ObjectFlagsClassOrInterface != 0 {
			iface := t.AsInterfaceType()
			resp.TypeParameters = typeHandles(iface.TypeParameters())
			resp.OuterTypeParameters = typeHandles(iface.OuterTypeParameters())
			resp.LocalTypeParameters = typeHandles(iface.LocalTypeParameters())
		}
	case flags&checker.TypeFlagsUnionOrIntersection != 0:
		// types omitted; fetched via separate request
	case flags&checker.TypeFlagsIndex != 0:
		resp.Target = TypeHandle(t.AsIndexType().Target())
	case flags&checker.TypeFlagsIndexedAccess != 0:
		data := t.AsIndexedAccessType()
		resp.ObjectType = TypeHandle(data.ObjectType())
		resp.IndexType = TypeHandle(data.IndexType())
	case flags&checker.TypeFlagsConditional != 0:
		data := t.AsConditionalType()
		resp.CheckType = TypeHandle(data.CheckType())
		resp.ExtendsType = TypeHandle(data.ExtendsType())
	case flags&checker.TypeFlagsSubstitution != 0:
		data := t.AsSubstitutionType()
		resp.BaseType = TypeHandle(data.BaseType())
		resp.SubstConstraint = TypeHandle(data.SubstConstraint())
	case flags&checker.TypeFlagsTemplateLiteral != 0:
		tl := t.AsTemplateLiteralType()
		resp.Texts = tl.Texts()
		// types omitted; fetched via separate request
	case flags&checker.TypeFlagsStringMapping != 0:
		resp.Target = TypeHandle(t.AsStringMappingType().Target())
	case flags&checker.TypeFlagsTypeParameter != 0:
		resp.IsThisType = t.AsTypeParameter().IsThisType()
	case flags&checker.TypeFlagsIntrinsic != 0:
		resp.IntrinsicName = t.AsIntrinsicType().IntrinsicName()
	}

	return resp
}

func typeHandles(types []*checker.Type) []TypeID {
	if len(types) == 0 {
		return nil
	}
	handles := make([]TypeID, len(types))
	for i, t := range types {
		handles[i] = TypeHandle(t)
	}
	return handles
}

func literalValueToJSON(value any) any {
	switch v := value.(type) {
	case string:
		return v
	case jsnum.Number:
		return float64(v)
	case bool:
		return v
	case jsnum.PseudoBigInt:
		// Encode bigint literals as a signed decimal string (e.g. "-123"); the
		// API client decodes this back into a real bigint. JSON has no bigint.
		return v.String()
	default:
		return nil
	}
}

type SignatureResponse struct {
	Id             SignatureID `json:"id"`
	Flags          uint32      `json:"flags"`
	Declaration    NodeHandle  `json:"declaration,omitempty"`
	TypeParameters []TypeID    `json:"typeParameters,omitempty"`
	Parameters     []SymbolID  `json:"parameters,omitempty"`
	ThisParameter  SymbolID    `json:"thisParameter,omitzero"`
	Target         SignatureID `json:"target,omitzero"`
}

type GetSourceFileParams struct {
	Snapshot SnapshotID         `json:"snapshot"`
	Project  ProjectID          `json:"project"`
	File     DocumentIdentifier `json:"file"`
}

type GetSourceFileNamesParams struct {
	Snapshot SnapshotID `json:"snapshot"`
	Project  ProjectID  `json:"project"`
}

// SourceFileMetadata carries program-stored metadata about a single source file.
type SourceFileMetadata struct {
	IsDefaultLibrary      bool                `json:"isDefaultLibrary"`
	IsFromExternalLibrary bool                `json:"isFromExternalLibrary"`
	PackageJsonType       string              `json:"packageJsonType"`
	PackageJsonDirectory  string              `json:"packageJsonDirectory"`
	ImpliedNodeFormat     core.ResolutionMode `json:"impliedNodeFormat"`
}

type ResolveNameParams struct {
	Snapshot       SnapshotID          `json:"snapshot"`
	Project        ProjectID           `json:"project"`
	Name           string              `json:"name"`
	Location       NodeHandle          `json:"location,omitempty"`       // Optional: node handle for location context
	File           *DocumentIdentifier `json:"file,omitempty"`           // Optional: file for location context (alternative to Location)
	Position       *uint32             `json:"position,omitempty"`       // Optional: position in file for location context (with File)
	Meaning        uint32              `json:"meaning"`                  // SymbolFlags for what kind of symbol to find
	ExcludeGlobals bool                `json:"excludeGlobals,omitempty"` // Whether to exclude global symbols
}

// GetTypePropertyParams is used for all type sub-property endpoints.
type GetTypePropertyParams struct {
	Snapshot SnapshotID `json:"snapshot"`
	Project  ProjectID  `json:"project"`
	Type     TypeID     `json:"objectId"`
}

// GetSymbolPropertyParams is used for all symbol sub-property endpoints.
type GetSymbolPropertyParams struct {
	Snapshot SnapshotID `json:"snapshot"`
	Project  ProjectID  `json:"project"`
	Symbol   SymbolID   `json:"objectId"`
}

// GetSignaturePropertyParams is used for all signature sub-property endpoints.
type GetSignaturePropertyParams struct {
	Snapshot  SnapshotID  `json:"snapshot"`
	Project   ProjectID   `json:"project"`
	Signature SignatureID `json:"objectId"`
}

// GetContextualTypeParams returns the contextual type for a node.
type GetContextualTypeParams struct {
	Snapshot SnapshotID `json:"snapshot"`
	Project  ProjectID  `json:"project"`
	Location NodeHandle `json:"location"`
}

// GetTypeOfSymbolAtLocationParams returns the narrowed type of a symbol at a specific location.
type GetTypeOfSymbolAtLocationParams struct {
	Snapshot SnapshotID `json:"snapshot"`
	Project  ProjectID  `json:"project"`
	Symbol   SymbolID   `json:"symbol"`
	Location NodeHandle `json:"location"`
}

// GetReferencesToSymbolInFileParams are the parameters for the getReferencesToSymbolInFile method.
type GetReferencesToSymbolInFileParams struct {
	Snapshot SnapshotID         `json:"snapshot"`
	Project  ProjectID          `json:"project"`
	File     DocumentIdentifier `json:"file"`
	Symbol   SymbolID           `json:"symbol"`
}

// GetReferencedSymbolsForNodeParams are the parameters for the getReferencedSymbolsForNode method.
type GetReferencedSymbolsForNodeParams struct {
	Snapshot SnapshotID `json:"snapshot"`
	Project  ProjectID  `json:"project"`
	Node     NodeHandle `json:"node"`
	Position int        `json:"position"`
}

// ReferencedSymbolEntry represents a symbol definition and its references.
type ReferencedSymbolEntry struct {
	Definition NodeHandle      `json:"definition"`
	Symbol     *SymbolResponse `json:"symbol,omitempty"`
	References []NodeHandle    `json:"references"`
}

// GetSignatureUsagesParams are the parameters for the getSignatureUsages method.
type GetSignatureUsagesParams struct {
	Snapshot      SnapshotID `json:"snapshot"`
	Project       ProjectID  `json:"project"`
	SignatureDecl NodeHandle `json:"signatureDecl"`
}

// SignatureUsageResponse represents a single usage of a signature as a name-call pair.
type SignatureUsageResponse struct {
	Name NodeHandle `json:"name"`
	Call NodeHandle `json:"call,omitempty"`
}

// GetCompletionsAtPositionParams are the parameters for the getCompletionsAtPosition method.
type GetCompletionsAtPositionParams struct {
	Snapshot         SnapshotID         `json:"snapshot"`
	Project          ProjectID          `json:"project"`
	File             DocumentIdentifier `json:"file"`
	Position         uint32             `json:"position"`
	TriggerCharacter *string            `json:"triggerCharacter,omitempty"`
	IncludeSymbol    bool               `json:"includeSymbol,omitempty"`
}

// CompletionEntryLabelDetailsResponse holds additional label display text for a completion entry.
type CompletionEntryLabelDetailsResponse struct {
	Detail      *string `json:"detail,omitempty"`
	Description *string `json:"description,omitempty"`
}

// CompletionEntryResponse represents a single completion item.
type CompletionEntryResponse struct {
	Name         string                               `json:"name"`
	Kind         uint32                               `json:"kind,omitempty"`
	SortText     *string                              `json:"sortText,omitempty"`
	InsertText   *string                              `json:"insertText,omitempty"`
	FilterText   *string                              `json:"filterText,omitempty"`
	Detail       *string                              `json:"detail,omitempty"`
	LabelDetails *CompletionEntryLabelDetailsResponse `json:"labelDetails,omitempty"`
	Symbol       *SymbolResponse                      `json:"symbol,omitempty"`
}

// CompletionInfoResponse wraps a list of completion entries.
type CompletionInfoResponse struct {
	IsIncomplete bool                       `json:"isIncomplete"`
	Entries      []*CompletionEntryResponse `json:"entries"`
}

// GetIntrinsicTypeParams is used for intrinsic type getters (anyType, stringType, etc.).
type GetIntrinsicTypeParams struct {
	Snapshot SnapshotID `json:"snapshot"`
	Project  ProjectID  `json:"project"`
}

// WellKnownSymbolsResponse carries the handle ids of the per-checker singleton
// symbols (unknown, undefined, arguments) so the client can identify them by id
// without a round-trip on every check.
type WellKnownSymbolsResponse struct {
	Unknown   SymbolID `json:"unknown"`
	Undefined SymbolID `json:"undefined"`
	Arguments SymbolID `json:"arguments"`
}

// WellKnownSignaturesResponse carries the handle id of the per-checker singleton
// unknown signature (the signature the checker yields when a call cannot be
// resolved) so the client can identify it by id without a round-trip on every check.
type WellKnownSignaturesResponse struct {
	Unknown SignatureID `json:"unknown"`
}

// GetBaseTypeOfLiteralTypeParams returns the base type of a literal type.
type GetBaseTypeOfLiteralTypeParams struct {
	Snapshot SnapshotID `json:"snapshot"`
	Project  ProjectID  `json:"project"`
	Type     TypeID     `json:"type"`
}

// GetNonNullableTypeParams are the parameters for the getNonNullableType method.
type GetNonNullableTypeParams struct {
	Snapshot SnapshotID `json:"snapshot"`
	Project  ProjectID  `json:"project"`
	Type     TypeID     `json:"type"`
}

// GetTypeFromTypeNodeParams are the parameters for the getTypeFromTypeNode method.
type GetTypeFromTypeNodeParams struct {
	Snapshot SnapshotID `json:"snapshot"`
	Project  ProjectID  `json:"project"`
	Location NodeHandle `json:"location"`
}

// GetWidenedTypeParams are the parameters for the getWidenedType method.
type GetWidenedTypeParams struct {
	Snapshot SnapshotID `json:"snapshot"`
	Project  ProjectID  `json:"project"`
	Type     TypeID     `json:"type"`
}

// GetParameterTypeParams are the parameters for the getParameterType method.
type GetParameterTypeParams struct {
	Snapshot  SnapshotID  `json:"snapshot"`
	Project   ProjectID   `json:"project"`
	Signature SignatureID `json:"signature"`
	Index     int32       `json:"index"`
}

// IsArrayLikeTypeParams checks whether a type is array-like.
type IsArrayLikeTypeParams struct {
	Snapshot SnapshotID `json:"snapshot"`
	Project  ProjectID  `json:"project"`
	Type     TypeID     `json:"type"`
}

// IsTypeAssignableToParams checks assignability between two types.
type IsTypeAssignableToParams struct {
	Snapshot SnapshotID `json:"snapshot"`
	Project  ProjectID  `json:"project"`
	Source   TypeID     `json:"source"`
	Target   TypeID     `json:"target"`
}

type GetSignaturesOfTypeParams struct {
	Snapshot SnapshotID `json:"snapshot"`
	Project  ProjectID  `json:"project"`
	Type     TypeID     `json:"type"`
	Kind     int32      `json:"kind"`
}

type GetResolvedSignatureParams struct {
	Snapshot SnapshotID `json:"snapshot"`
	Project  ProjectID  `json:"project"`
	Location NodeHandle `json:"location"`
}

type GetTypeAtLocationParams struct {
	Snapshot SnapshotID `json:"snapshot"`
	Project  ProjectID  `json:"project"`
	Location NodeHandle `json:"location"`
}

type GetTypeAtLocationsParams struct {
	Snapshot  SnapshotID   `json:"snapshot"`
	Project   ProjectID    `json:"project"`
	Locations []NodeHandle `json:"locations"`
}

type GetTypeAtPositionParams struct {
	Snapshot SnapshotID         `json:"snapshot"`
	Project  ProjectID          `json:"project"`
	File     DocumentIdentifier `json:"file"`
	Position uint32             `json:"position"`
}

type GetTypesAtPositionsParams struct {
	Snapshot  SnapshotID         `json:"snapshot"`
	Project   ProjectID          `json:"project"`
	File      DocumentIdentifier `json:"file"`
	Positions []uint32           `json:"positions"`
}

type ImportAdderActionKind string

const (
	ImportAdderActionKindImportSymbol ImportAdderActionKind = "importSymbol"
)

type ImportAdderAction struct {
	Kind                   ImportAdderActionKind `json:"kind"`
	Symbol                 SymbolID              `json:"symbol,omitempty"`
	IsValidTypeOnlyUseSite *bool                 `json:"isValidTypeOnlyUseSite,omitempty"`
}

type GetImportAdderEditsParams struct {
	Snapshot SnapshotID          `json:"snapshot"`
	Project  ProjectID           `json:"project"`
	File     DocumentIdentifier  `json:"file"`
	Actions  []ImportAdderAction `json:"actions"`
}

type TextEdit struct {
	Pos     int    `json:"pos"`
	End     int    `json:"end"`
	NewText string `json:"newText"`
}

// TypeToTypeNodeParams are the parameters for the typeToTypeNode method.
type TypeToTypeNodeParams struct {
	Snapshot SnapshotID `json:"snapshot"`
	Project  ProjectID  `json:"project"`
	Type     TypeID     `json:"type"`
	Location NodeHandle `json:"location,omitempty"`
	Flags    int32      `json:"flags,omitempty"`
}

// SignatureToSignatureDeclarationParams are the parameters for the signatureToSignatureDeclaration method.
type SignatureToSignatureDeclarationParams struct {
	Snapshot  SnapshotID  `json:"snapshot"`
	Project   ProjectID   `json:"project"`
	Signature SignatureID `json:"signature"`
	Kind      int32       `json:"kind"`
	Location  NodeHandle  `json:"location,omitempty"`
	Flags     int32       `json:"flags,omitempty"`
}

// PrintNodeParams are the parameters for the printNode method.
type PrintNodeParams struct {
	Data                          string `json:"data"` // base64-encoded binary AST data
	PreserveSourceNewlines        bool   `json:"preserveSourceNewlines,omitempty"`
	NeverAsciiEscape              bool   `json:"neverAsciiEscape,omitempty"`
	TerminateUnterminatedLiterals bool   `json:"terminateUnterminatedLiterals,omitempty"`
}

// CheckerTypeParams are parameters for checker methods that operate on a type.
type CheckerTypeParams struct {
	Snapshot SnapshotID `json:"snapshot"`
	Project  ProjectID  `json:"project"`
	Type     TypeID     `json:"type"`
}

// GetPropertyOfTypeParams are parameters for getPropertyOfType (a named property of a type).
type GetPropertyOfTypeParams struct {
	Snapshot SnapshotID `json:"snapshot"`
	Project  ProjectID  `json:"project"`
	Type     TypeID     `json:"type"`
	Name     string     `json:"name"`
}

// GetMemberInModuleExportsParams are parameters for getMemberInModuleExports.
type GetMemberInModuleExportsParams struct {
	Snapshot SnapshotID `json:"snapshot"`
	Project  ProjectID  `json:"project"`
	Symbol   SymbolID   `json:"symbol"`
	Name     string     `json:"name"`
}

// CheckerNodeParams are parameters for checker methods that operate on a node location.
type CheckerNodeParams struct {
	Snapshot SnapshotID `json:"snapshot"`
	Project  ProjectID  `json:"project"`
	Location NodeHandle `json:"location"`
}

// CheckerSymbolParams are parameters for checker methods that operate on a symbol.
type CheckerSymbolParams struct {
	Snapshot SnapshotID `json:"snapshot"`
	Project  ProjectID  `json:"project"`
	Symbol   SymbolID   `json:"symbol"`
}

// JSDocTagInfo is a single JSDoc tag, mirroring Strada's JSDocTagInfo but with the tag text
// rendered as a plain string rather than SymbolDisplayPart[].
type JSDocTagInfo struct {
	Name string `json:"name"`
	Text string `json:"text,omitempty"`
}

// CheckerSignatureParams are parameters for checker methods that operate on a signature.
type CheckerSignatureParams struct {
	Snapshot  SnapshotID  `json:"snapshot"`
	Project   ProjectID   `json:"project"`
	Signature SignatureID `json:"signature"`
}

// TypePredicateResponse is the response for getTypePredicateOfSignature.
type TypePredicateResponse struct {
	Kind           int32         `json:"kind"`
	ParameterIndex int32         `json:"parameterIndex"`
	ParameterName  string        `json:"parameterName,omitempty"`
	Type           *TypeResponse `json:"type,omitempty"`
}

// IndexInfoResponse represents a single index signature.
type IndexInfoResponse struct {
	KeyType     TypeResponse `json:"keyType"`
	ValueType   TypeResponse `json:"valueType"`
	IsReadonly  bool         `json:"isReadonly,omitempty"`
	Declaration NodeHandle   `json:"declaration,omitempty"`
}

// SourceFileResponse contains the binary-encoded AST data for a source file.
// The Data field is base64-encoded binary data in the encoder's format.
type SourceFileResponse struct {
	Data string `json:"data"`
}

// GetDiagnosticsParams are parameters for per-file diagnostic methods.
type GetDiagnosticsParams struct {
	Snapshot SnapshotID          `json:"snapshot"`
	Project  ProjectID           `json:"project"`
	File     *DocumentIdentifier `json:"file,omitempty"`
}

// GetProjectDiagnosticsParams are parameters for project-wide diagnostic methods.
type GetProjectDiagnosticsParams struct {
	Snapshot SnapshotID `json:"snapshot"`
	Project  ProjectID  `json:"project"`
}

// DiagnosticResponse is the API response for a single diagnostic.
type DiagnosticResponse struct {
	// FileName is the path of the file this diagnostic belongs to, if any.
	FileName string `json:"fileName,omitempty"`
	// Pos is the start position of the diagnostic in the source file.
	Pos int `json:"pos"`
	// End is the end position of the diagnostic in the source file.
	End int `json:"end"`
	// Code is the diagnostic error code.
	Code int32 `json:"code"`
	// Category is the diagnostic category (error, warning, suggestion, message).
	Category diagnostics.Category `json:"category"`
	// Text is the localized diagnostic message text.
	Text string `json:"text"`
	// ReportsUnnecessary indicates this diagnostic highlights unnecessary code.
	ReportsUnnecessary bool `json:"reportsUnnecessary,omitzero"`
	// ReportsDeprecated indicates this diagnostic highlights deprecated code.
	ReportsDeprecated bool `json:"reportsDeprecated,omitzero"`
	// MessageChain contains chained diagnostic messages, if any.
	MessageChain []*DiagnosticResponse `json:"messageChain,omitempty"`
	// RelatedInformation contains related diagnostic information, if any.
	RelatedInformation []*DiagnosticResponse `json:"relatedInformation,omitempty"`
}

// NewDiagnosticResponse converts an ast.Diagnostic to a DiagnosticResponse.
func NewDiagnosticResponse(d *ast.Diagnostic) *DiagnosticResponse {
	pos := d.Pos()
	end := d.End()
	file := d.File()
	if file != nil {
		positionMap := file.GetPositionMap()
		pos = positionMap.UTF8ToUTF16(pos)
		end = positionMap.UTF8ToUTF16(end)
	}
	resp := &DiagnosticResponse{
		Pos:                pos,
		End:                end,
		Code:               d.Code(),
		Category:           d.Category(),
		Text:               d.Localize(locale.Default),
		ReportsUnnecessary: d.ReportsUnnecessary(),
		ReportsDeprecated:  d.ReportsDeprecated(),
	}

	if file != nil {
		resp.FileName = file.FileName()
	}

	if chain := d.MessageChain(); len(chain) > 0 {
		resp.MessageChain = make([]*DiagnosticResponse, len(chain))
		for i, c := range chain {
			resp.MessageChain[i] = NewDiagnosticResponse(c)
		}
	}

	if related := d.RelatedInformation(); len(related) > 0 {
		resp.RelatedInformation = make([]*DiagnosticResponse, len(related))
		for i, r := range related {
			resp.RelatedInformation[i] = NewDiagnosticResponse(r)
		}
	}

	return resp
}

// NewDiagnosticResponses converts a slice of ast.Diagnostics to DiagnosticResponses.
func NewDiagnosticResponses(diags []*ast.Diagnostic) []*DiagnosticResponse {
	if len(diags) == 0 {
		return nil
	}
	result := make([]*DiagnosticResponse, len(diags))
	for i, d := range diags {
		result[i] = NewDiagnosticResponse(d)
	}
	return result
}

func unmarshalPayload(method string, payload json.Value) (any, error) {
	unmarshaler, ok := unmarshalers[Method(method)]
	if !ok {
		return nil, fmt.Errorf("unknown API method %q", method)
	}
	return unmarshaler(payload)
}

func unmarshallerFor[T any](data []byte) (any, error) {
	var v T
	if err := json.Unmarshal(data, &v); err != nil {
		return nil, fmt.Errorf("failed to unmarshal %T: %w", (*T)(nil), err)
	}
	return &v, nil
}

func noParams(data []byte) (any, error) {
	return nil, nil
}
