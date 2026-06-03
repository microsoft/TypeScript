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

func SignatureHandle(id uint64) SignatureID {
	return SignatureID(id)
}

func parseProjectHandle(handle ProjectID) tspath.Path {
	return tspath.Path(handle)
}

const (
	MethodRelease Method = "release"

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
	MethodResolveName              Method = "resolveName"
	MethodGetParentOfSymbol        Method = "getParentOfSymbol"
	MethodGetMembersOfSymbol       Method = "getMembersOfSymbol"
	MethodGetExportsOfSymbol       Method = "getExportsOfSymbol"
	MethodGetExportSymbolOfSymbol  Method = "getExportSymbolOfSymbol"
	MethodGetSymbolOfType          Method = "getSymbolOfType"
	MethodGetSignaturesOfType      Method = "getSignaturesOfType"
	MethodGetResolvedSignature     Method = "getResolvedSignature"
	MethodGetTypeAtLocation        Method = "getTypeAtLocation"
	MethodGetTypeAtLocations       Method = "getTypeAtLocations"
	MethodGetTypeAtPosition        Method = "getTypeAtPosition"
	MethodGetTypesAtPositions      Method = "getTypesAtPositions"

	// Type sub-property methods
	MethodGetTargetOfType              Method = "getTargetOfType"
	MethodGetTypesOfType               Method = "getTypesOfType"
	MethodGetTypeParametersOfType      Method = "getTypeParametersOfType"
	MethodGetOuterTypeParametersOfType Method = "getOuterTypeParametersOfType"
	MethodGetLocalTypeParametersOfType Method = "getLocalTypeParametersOfType"
	MethodGetObjectTypeOfType          Method = "getObjectTypeOfType"
	MethodGetIndexTypeOfType           Method = "getIndexTypeOfType"
	MethodGetCheckTypeOfType           Method = "getCheckTypeOfType"
	MethodGetExtendsTypeOfType         Method = "getExtendsTypeOfType"
	MethodGetBaseTypeOfType            Method = "getBaseTypeOfType"
	MethodGetConstraintOfType          Method = "getConstraintOfType"

	// Checker methods
	MethodGetContextualType                 Method = "getContextualType"
	MethodGetBaseTypeOfLiteralType          Method = "getBaseTypeOfLiteralType"
	MethodGetNonNullableType                Method = "getNonNullableType"
	MethodGetTypeFromTypeNode               Method = "getTypeFromTypeNode"
	MethodGetWidenedType                    Method = "getWidenedType"
	MethodGetParameterType                  Method = "getParameterType"
	MethodIsArrayLikeType                   Method = "isArrayLikeType"
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
	MethodGetIndexInfosOfType               Method = "getIndexInfosOfType"
	MethodGetConstraintOfTypeParameter      Method = "getConstraintOfTypeParameter"
	MethodGetTypeArguments                  Method = "getTypeArguments"

	// Diagnostic methods
	MethodGetSyntacticDiagnostics         Method = "getSyntacticDiagnostics"
	MethodGetSemanticDiagnostics          Method = "getSemanticDiagnostics"
	MethodGetSuggestionDiagnostics        Method = "getSuggestionDiagnostics"
	MethodGetDeclarationDiagnostics       Method = "getDeclarationDiagnostics"
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

func (d DocumentIdentifier) ToURI() lsproto.DocumentUri {
	if d.URI != "" {
		return d.URI
	}
	return lsconv.FileNameToDocumentURI(d.FileName)
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
	// OpenProject is the path to a tsconfig.json file to open/load in the new snapshot.
	OpenProject string `json:"openProject,omitempty"`
	// FileChanges describes file system changes since the last snapshot.
	FileChanges *APIFileChanges `json:"fileChanges,omitempty"`
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
	MethodGetSymbolAtPosition:      unmarshallerFor[GetSymbolAtPositionParams],
	MethodGetSymbolsAtPositions:    unmarshallerFor[GetSymbolsAtPositionsParams],
	MethodGetSymbolAtLocation:      unmarshallerFor[GetSymbolAtLocationParams],
	MethodGetSymbolsAtLocations:    unmarshallerFor[GetSymbolsAtLocationsParams],
	MethodGetTypeOfSymbol:          unmarshallerFor[GetTypeOfSymbolParams],
	MethodGetTypesOfSymbols:        unmarshallerFor[GetTypesOfSymbolsParams],
	MethodGetDeclaredTypeOfSymbol:  unmarshallerFor[GetTypeOfSymbolParams],
	MethodResolveName:              unmarshallerFor[ResolveNameParams],
	MethodGetParentOfSymbol:        unmarshallerFor[GetParentOfSymbolParams],
	MethodGetMembersOfSymbol:       unmarshallerFor[GetMembersOfSymbolParams],
	MethodGetExportsOfSymbol:       unmarshallerFor[GetExportsOfSymbolParams],
	MethodGetExportSymbolOfSymbol:  unmarshallerFor[GetExportSymbolOfSymbolParams],
	MethodGetSymbolOfType:          unmarshallerFor[GetSymbolOfTypeParams],
	MethodGetSignaturesOfType:      unmarshallerFor[GetSignaturesOfTypeParams],
	MethodGetResolvedSignature:     unmarshallerFor[GetResolvedSignatureParams],
	MethodGetTypeAtLocation:        unmarshallerFor[GetTypeAtLocationParams],
	MethodGetTypeAtLocations:       unmarshallerFor[GetTypeAtLocationsParams],
	MethodGetTypeAtPosition:        unmarshallerFor[GetTypeAtPositionParams],
	MethodGetTypesAtPositions:      unmarshallerFor[GetTypesAtPositionsParams],

	MethodGetTargetOfType:                   unmarshallerFor[GetTypePropertyParams],
	MethodGetTypesOfType:                    unmarshallerFor[GetTypePropertyParams],
	MethodGetTypeParametersOfType:           unmarshallerFor[GetTypePropertyParams],
	MethodGetOuterTypeParametersOfType:      unmarshallerFor[GetTypePropertyParams],
	MethodGetLocalTypeParametersOfType:      unmarshallerFor[GetTypePropertyParams],
	MethodGetObjectTypeOfType:               unmarshallerFor[GetTypePropertyParams],
	MethodGetIndexTypeOfType:                unmarshallerFor[GetTypePropertyParams],
	MethodGetCheckTypeOfType:                unmarshallerFor[GetTypePropertyParams],
	MethodGetExtendsTypeOfType:              unmarshallerFor[GetTypePropertyParams],
	MethodGetBaseTypeOfType:                 unmarshallerFor[GetTypePropertyParams],
	MethodGetConstraintOfType:               unmarshallerFor[GetTypePropertyParams],
	MethodGetContextualType:                 unmarshallerFor[GetContextualTypeParams],
	MethodGetBaseTypeOfLiteralType:          unmarshallerFor[GetBaseTypeOfLiteralTypeParams],
	MethodGetNonNullableType:                unmarshallerFor[GetNonNullableTypeParams],
	MethodGetTypeFromTypeNode:               unmarshallerFor[GetTypeFromTypeNodeParams],
	MethodGetWidenedType:                    unmarshallerFor[GetWidenedTypeParams],
	MethodGetParameterType:                  unmarshallerFor[GetParameterTypeParams],
	MethodIsArrayLikeType:                   unmarshallerFor[IsArrayLikeTypeParams],
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
	MethodGetIndexInfosOfType:               unmarshallerFor[CheckerTypeParams],
	MethodGetConstraintOfTypeParameter:      unmarshallerFor[CheckerTypeParams],
	MethodGetTypeArguments:                  unmarshallerFor[CheckerTypeParams],
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
	MethodGetSyntacticDiagnostics:           unmarshallerFor[GetDiagnosticsParams],
	MethodGetSemanticDiagnostics:            unmarshallerFor[GetDiagnosticsParams],
	MethodGetSuggestionDiagnostics:          unmarshallerFor[GetDiagnosticsParams],
	MethodGetDeclarationDiagnostics:         unmarshallerFor[GetDiagnosticsParams],
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
	Name             string       `json:"name"`
	Flags            uint32       `json:"flags"`
	CheckFlags       uint32       `json:"checkFlags"`
	Declarations     []NodeHandle `json:"declarations,omitempty"`
	ValueDeclaration NodeHandle   `json:"valueDeclaration,omitempty"`
}

func NewSymbolResponse(symbol *ast.Symbol) *SymbolResponse {
	resp := &SymbolResponse{
		Id:         SymbolHandle(symbol),
		Name:       symbol.Name,
		Flags:      uint32(symbol.Flags),
		CheckFlags: uint32(symbol.CheckFlags),
	}

	// Allocate declaration slices; callers fill in the handles.
	if len(symbol.Declarations) > 0 {
		resp.Declarations = make([]NodeHandle, len(symbol.Declarations))
	}

	return resp
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
	Value any `json:"value,omitempty"`

	// ObjectType / TypeReference / StringMappingType / IndexType target
	Target TypeID `json:"target,omitempty"`

	// InterfaceType type parameters
	TypeParameters      []TypeID `json:"typeParameters,omitempty"`
	OuterTypeParameters []TypeID `json:"outerTypeParameters,omitempty"`
	LocalTypeParameters []TypeID `json:"localTypeParameters,omitempty"`

	// TupleType data
	ElementFlags  []checker.ElementFlags `json:"elementFlags,omitempty"`
	FixedLength   *int                   `json:"fixedLength,omitempty"`
	TupleReadonly *bool                  `json:"readonly,omitempty"`

	// IndexedAccessType data
	ObjectType TypeID `json:"objectType,omitempty"`
	IndexType  TypeID `json:"indexType,omitempty"`

	// ConditionalType data
	CheckType   TypeID `json:"checkType,omitempty"`
	ExtendsType TypeID `json:"extendsType,omitempty"`

	// SubstitutionType data
	BaseType        TypeID `json:"baseType,omitempty"`
	SubstConstraint TypeID `json:"substConstraint,omitempty"`

	// TemplateLiteralType text segments
	Texts []string `json:"texts,omitempty"`

	// Symbol associated with structured types
	Symbol SymbolID `json:"symbol,omitempty"`
}

func newTypeData(t *checker.Type) *TypeResponse {
	resp := &TypeResponse{
		Id:    TypeHandle(t),
		Flags: uint32(t.Flags()),
	}

	if t.Symbol() != nil {
		resp.Symbol = SymbolHandle(t.Symbol())
	}

	switch flags := t.Flags(); {
	case flags&checker.TypeFlagsLiteral != 0:
		resp.Value = literalValueToJSON(t.AsLiteralType().Value())
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
	ThisParameter  SymbolID    `json:"thisParameter,omitempty"`
	Target         SignatureID `json:"target,omitempty"`
}

type GetSourceFileParams struct {
	Snapshot SnapshotID         `json:"snapshot"`
	Project  ProjectID          `json:"project"`
	File     DocumentIdentifier `json:"file"`
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

type GetParentOfSymbolParams struct {
	Snapshot SnapshotID `json:"snapshot"`
	Symbol   SymbolID   `json:"symbol"`
}

type GetMembersOfSymbolParams struct {
	Snapshot SnapshotID `json:"snapshot"`
	Symbol   SymbolID   `json:"symbol"`
}

type GetExportsOfSymbolParams struct {
	Snapshot SnapshotID `json:"snapshot"`
	Symbol   SymbolID   `json:"symbol"`
}

type GetExportSymbolOfSymbolParams struct {
	Snapshot SnapshotID `json:"snapshot"`
	Symbol   SymbolID   `json:"symbol"`
}

type GetSymbolOfTypeParams struct {
	Snapshot SnapshotID `json:"snapshot"`
	Type     TypeID     `json:"type"`
}

// GetTypePropertyParams is used for all type sub-property endpoints.
type GetTypePropertyParams struct {
	Snapshot SnapshotID `json:"snapshot"`
	Type     TypeID     `json:"type"`
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

// GetIntrinsicTypeParams is used for intrinsic type getters (anyType, stringType, etc.).
type GetIntrinsicTypeParams struct {
	Snapshot SnapshotID `json:"snapshot"`
	Project  ProjectID  `json:"project"`
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
	KeyType    TypeResponse `json:"keyType"`
	ValueType  TypeResponse `json:"valueType"`
	IsReadonly bool         `json:"isReadonly,omitempty"`
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
	resp := &DiagnosticResponse{
		Pos:                d.Pos(),
		End:                d.End(),
		Code:               d.Code(),
		Category:           d.Category(),
		Text:               d.Localize(locale.Default),
		ReportsUnnecessary: d.ReportsUnnecessary(),
		ReportsDeprecated:  d.ReportsDeprecated(),
	}

	if d.File() != nil {
		resp.FileName = d.File().FileName()
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
