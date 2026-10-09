package ast

import (
	"bytes"
	"errors"
	"strings"
	"sync/atomic"
	"unicode/utf8"
	"unique"

	"github.com/microsoft/TypeScript/tsc/internal/debug"
	"github.com/microsoft/TypeScript/tsc/internal/json"
)

// Symbol stores flags, checkFlags, and id uniquely for every symbol instance, but may share
// symbolData with other symbols. This is done so that instantiated symbols in the checker can
// all share the same underlying symbolData. Every Symbol needs its data field initialized either
// through SymbolWithData.Initialize or by explicitly setting it with Symbol.SetSymbolData.
type Symbol struct {
	flags      SymbolFlags
	checkFlags CheckFlags // Non-zero only in transient symbols created by Checker
	id         atomic.Uint64
	data       *symbolData
}

// Every symbol references a symbolData structure that may be shared with other symbols.
type symbolData struct {
	name             SymbolName
	declarations     []*Node
	valueDeclaration *Node
	members          SymbolTable
	exports          SymbolTable
	parent           *Symbol
	exportSymbol     *Symbol
}

func (s *Symbol) Flags() SymbolFlags      { return s.flags }
func (s *Symbol) CheckFlags() CheckFlags  { return s.checkFlags }
func (s *Symbol) Name() SymbolName        { return s.data.name }
func (s *Symbol) Declarations() []*Node   { return s.data.declarations }
func (s *Symbol) ValueDeclaration() *Node { return s.data.valueDeclaration }
func (s *Symbol) Members() SymbolTable    { return s.data.members }
func (s *Symbol) Exports() SymbolTable    { return s.data.exports }
func (s *Symbol) Parent() *Symbol         { return s.data.parent }
func (s *Symbol) ExportSymbol() *Symbol   { return s.data.exportSymbol }

func (s *Symbol) SetFlags(value SymbolFlags)      { s.flags = value }
func (s *Symbol) SetCheckFlags(value CheckFlags)  { s.checkFlags = value }
func (s *Symbol) SetName(value SymbolName)        { s.data.name = value }
func (s *Symbol) SetDeclarations(value []*Node)   { s.data.declarations = value }
func (s *Symbol) SetValueDeclaration(value *Node) { s.data.valueDeclaration = value }
func (s *Symbol) SetMembers(value SymbolTable)    { s.data.members = value }
func (s *Symbol) SetExports(value SymbolTable)    { s.data.exports = value }
func (s *Symbol) SetParent(value *Symbol)         { s.data.parent = value }
func (s *Symbol) SetExportSymbol(value *Symbol)   { s.data.exportSymbol = value }

// SymbolWithData is a helper structure that contains both a Symbol and its associated symbolData.
type SymbolWithData struct {
	s Symbol
	d symbolData
}

// Initializes a SymbolWithData instance and returns the embedded Symbol.
func (sd *SymbolWithData) Initialize() *Symbol {
	sd.s.data = &sd.d
	sd.d.name = EmptySymbolName
	return &sd.s
}

func NewSymbol() *Symbol {
	return (&SymbolWithData{}).Initialize()
}

// Initializes a Symbol's data field with the data from another Symbol. This allows multiple
// symbols to share the same underlying symbolData.
func (s *Symbol) SetSymbolData(other *Symbol) {
	s.data = other.data
}

// GetSourceFileOfSymbol returns the owning file of a published binder symbol, or
// nil for a non-file-owned symbol, even if it borrows declarations from a file.
// Ownership recovery walks only the first declaration's AST parents.
func GetSourceFileOfSymbol(symbol *Symbol) *SourceFile {
	debug.Assert(symbol != nil, "Expected a symbol")
	if symbol.Flags()&SymbolFlagsTransient != 0 {
		return nil
	}
	if len(symbol.Declarations()) == 0 {
		// A class's implicit prototype has no declaration of its own.
		debug.Assert(symbol.Flags()&SymbolFlagsPrototype != 0, "File-bound symbol has no declarations")
		debug.Assert(symbol.Parent() != nil && symbol.Parent().Flags()&SymbolFlagsClass != 0, "Prototype has no declaring class")
		symbol = symbol.Parent()
		debug.Assert(symbol.Flags()&SymbolFlagsTransient == 0, "Prototype parent is not file-bound")
		debug.Assert(len(symbol.Declarations()) != 0, "Prototype parent has no declarations")
	}
	file := GetSourceFileOfNode(symbol.Declarations()[0])
	debug.Assert(file != nil, "File-bound declaration has no source file")
	return file
}

func (s *Symbol) IsExternalModule() bool {
	return s.Flags()&SymbolFlagsModule != 0 && IsAmbientModuleSymbolName(s.Name())
}

func (s *Symbol) IsStatic() bool {
	if s.ValueDeclaration() == nil {
		return false
	}
	modifierFlags := s.ValueDeclaration().ModifierFlags()
	return modifierFlags&ModifierFlagsStatic != 0
}

// See comment on `declareModuleMember` in `binder.go`.
func (s *Symbol) CombinedLocalAndExportSymbolFlags() SymbolFlags {
	if s.ExportSymbol() != nil {
		return s.Flags() | s.ExportSymbol().Flags()
	}
	return s.Flags()
}

// SymbolName is an interned name used for symbol identity and lookup.
// Its zero value denotes an unset name and must not be passed to Value.
type SymbolName unique.Handle[string]

func MakeSymbolName(text string) SymbolName {
	return SymbolName(unique.Make(text))
}

func (name SymbolName) Value() string {
	return unique.Handle[string](name).Value()
}

func (name SymbolName) IsZero() bool {
	return name == SymbolName{}
}

func (name SymbolName) String() string {
	if name.IsZero() {
		return "<unset>"
	}
	return name.Value()
}

// MarshalText uses the escaped spelling so internal names remain valid UTF-8.
func (name SymbolName) MarshalText() ([]byte, error) {
	if name.IsZero() {
		return nil, errors.New("cannot marshal an unset symbol name as text")
	}
	text := EscapeSymbolName(name)
	if !utf8.ValidString(text) {
		return nil, errors.New("symbol name contains invalid UTF-8")
	}
	return []byte(text), nil
}

func (name *SymbolName) UnmarshalText(text []byte) error {
	if !utf8.Valid(text) {
		return errors.New("symbol name contains invalid UTF-8")
	}
	*name = UnescapeSymbolName(string(text))
	return nil
}

// MarshalJSON preserves the distinction between unset and empty names.
func (name SymbolName) MarshalJSON() ([]byte, error) {
	if name.IsZero() {
		return []byte("null"), nil
	}
	text, err := name.MarshalText()
	if err != nil {
		return nil, err
	}
	return json.Marshal(string(text))
}

func (name *SymbolName) UnmarshalJSON(data []byte) error {
	if bytes.Equal(bytes.TrimSpace(data), []byte("null")) {
		*name = SymbolName{}
		return nil
	}
	if !utf8.Valid(data) {
		return errors.New("symbol name contains invalid UTF-8")
	}
	var text string
	if err := json.Unmarshal(data, &text); err != nil {
		return err
	}
	return name.UnmarshalText([]byte(text))
}

// EmptySymbolName is a valid empty name, distinct from an unset zero handle.
var EmptySymbolName = MakeSymbolName("")

type SymbolTable map[SymbolName]*Symbol

// Fixed symbol names are interned once and shared by compiler consumers.
var (
	SymbolNameZero                          = MakeSymbolName("0")
	SymbolNameUnresolved                    = MakeSymbolName("<<unresolved>>")
	SymbolNameAbstractModuleSource          = MakeSymbolName("AbstractModuleSource")
	SymbolNameArray                         = MakeSymbolName("Array")
	SymbolNameArrayBuffer                   = MakeSymbolName("ArrayBuffer")
	SymbolNameArrayConstructor              = MakeSymbolName("ArrayConstructor")
	SymbolNameArrayLike                     = MakeSymbolName("ArrayLike")
	SymbolNameAsyncDisposable               = MakeSymbolName("AsyncDisposable")
	SymbolNameAsyncDisposableStack          = MakeSymbolName("AsyncDisposableStack")
	SymbolNameAsyncGenerator                = MakeSymbolName("AsyncGenerator")
	SymbolNameAsyncGeneratorFunction        = MakeSymbolName("AsyncGeneratorFunction")
	SymbolNameAsyncIterable                 = MakeSymbolName("AsyncIterable")
	SymbolNameAsyncIterableIterator         = MakeSymbolName("AsyncIterableIterator")
	SymbolNameAsyncIterator                 = MakeSymbolName("AsyncIterator")
	SymbolNameAsyncIteratorObject           = MakeSymbolName("AsyncIteratorObject")
	SymbolNameAtomics                       = MakeSymbolName("Atomics")
	SymbolNameAwaited                       = MakeSymbolName("Awaited")
	SymbolNameBigInt                        = MakeSymbolName("BigInt")
	SymbolNameBigInt64Array                 = MakeSymbolName("BigInt64Array")
	SymbolNameBigUint64Array                = MakeSymbolName("BigUint64Array")
	SymbolNameBoolean                       = MakeSymbolName("Boolean")
	SymbolNameBuiltinIteratorReturn         = MakeSymbolName("BuiltinIteratorReturn")
	SymbolNameCallableFunction              = MakeSymbolName("CallableFunction")
	SymbolNameCapitalize                    = MakeSymbolName("Capitalize")
	SymbolNameClassAccessorDecoratorContext = MakeSymbolName("ClassAccessorDecoratorContext")
	SymbolNameClassAccessorDecoratorResult  = MakeSymbolName("ClassAccessorDecoratorResult")
	SymbolNameClassAccessorDecoratorTarget  = MakeSymbolName("ClassAccessorDecoratorTarget")
	SymbolNameClassDecoratorContext         = MakeSymbolName("ClassDecoratorContext")
	SymbolNameClassFieldDecoratorContext    = MakeSymbolName("ClassFieldDecoratorContext")
	SymbolNameClassGetterDecoratorContext   = MakeSymbolName("ClassGetterDecoratorContext")
	SymbolNameClassMethodDecoratorContext   = MakeSymbolName("ClassMethodDecoratorContext")
	SymbolNameClassSetterDecoratorContext   = MakeSymbolName("ClassSetterDecoratorContext")
	SymbolNameDataView                      = MakeSymbolName("DataView")
	SymbolNameDate                          = MakeSymbolName("Date")
	SymbolNameDateTimeFormat                = MakeSymbolName("DateTimeFormat")
	SymbolNameDisposable                    = MakeSymbolName("Disposable")
	SymbolNameDisposableStack               = MakeSymbolName("DisposableStack")
	SymbolNameElement                       = MakeSymbolName("Element")
	SymbolNameElementAttributesProperty     = MakeSymbolName("ElementAttributesProperty")
	SymbolNameElementChildrenAttribute      = MakeSymbolName("ElementChildrenAttribute")
	SymbolNameElementClass                  = MakeSymbolName("ElementClass")
	SymbolNameElementType                   = MakeSymbolName("ElementType")
	SymbolNameError                         = MakeSymbolName("Error")
	SymbolNameErrorConstructor              = MakeSymbolName("ErrorConstructor")
	SymbolNameEventTarget                   = MakeSymbolName("EventTarget")
	SymbolNameExtract                       = MakeSymbolName("Extract")
	SymbolNameFloat16Array                  = MakeSymbolName("Float16Array")
	SymbolNameFloat32Array                  = MakeSymbolName("Float32Array")
	SymbolNameFloat64Array                  = MakeSymbolName("Float64Array")
	SymbolNameFunction                      = MakeSymbolName("Function")
	SymbolNameGenerator                     = MakeSymbolName("Generator")
	SymbolNameIArguments                    = MakeSymbolName("IArguments")
	SymbolNameImportAttributes              = MakeSymbolName("ImportAttributes")
	SymbolNameImportCallOptions             = MakeSymbolName("ImportCallOptions")
	SymbolNameImportMeta                    = MakeSymbolName("ImportMeta")
	SymbolNameImportMetaExpression          = MakeSymbolName("ImportMetaExpression")
	SymbolNameInt16Array                    = MakeSymbolName("Int16Array")
	SymbolNameInt32Array                    = MakeSymbolName("Int32Array")
	SymbolNameInt8Array                     = MakeSymbolName("Int8Array")
	SymbolNameIntl                          = MakeSymbolName("Intl")
	SymbolNameIntrinsicAttributes           = MakeSymbolName("IntrinsicAttributes")
	SymbolNameIntrinsicClassAttributes      = MakeSymbolName("IntrinsicClassAttributes")
	SymbolNameIntrinsicElements             = MakeSymbolName("IntrinsicElements")
	SymbolNameIterable                      = MakeSymbolName("Iterable")
	SymbolNameIterableIterator              = MakeSymbolName("IterableIterator")
	SymbolNameIterator                      = MakeSymbolName("Iterator")
	SymbolNameIteratorConstructor           = MakeSymbolName("IteratorConstructor")
	SymbolNameIteratorObject                = MakeSymbolName("IteratorObject")
	SymbolNameIteratorReturnResult          = MakeSymbolName("IteratorReturnResult")
	SymbolNameIteratorYieldResult           = MakeSymbolName("IteratorYieldResult")
	SymbolNameJSON                          = MakeSymbolName("JSON")
	SymbolNameJSX                           = MakeSymbolName("JSX")
	SymbolNameK                             = MakeSymbolName("K")
	SymbolNameLibraryManagedAttributes      = MakeSymbolName("LibraryManagedAttributes")
	SymbolNameLowercase                     = MakeSymbolName("Lowercase")
	SymbolNameMap                           = MakeSymbolName("Map")
	SymbolNameMapConstructor                = MakeSymbolName("MapConstructor")
	SymbolNameMath                          = MakeSymbolName("Math")
	SymbolNameNaN                           = MakeSymbolName("NaN")
	SymbolNameNewableFunction               = MakeSymbolName("NewableFunction")
	SymbolNameNoInfer                       = MakeSymbolName("NoInfer")
	SymbolNameNode                          = MakeSymbolName("Node")
	SymbolNameNodeList                      = MakeSymbolName("NodeList")
	SymbolNameNonNullable                   = MakeSymbolName("NonNullable")
	SymbolNameNumber                        = MakeSymbolName("Number")
	SymbolNameNumberConstructor             = MakeSymbolName("NumberConstructor")
	SymbolNameNumberFormat                  = MakeSymbolName("NumberFormat")
	SymbolNameObject                        = MakeSymbolName("Object")
	SymbolNameObjectConstructor             = MakeSymbolName("ObjectConstructor")
	SymbolNameOmit                          = MakeSymbolName("Omit")
	SymbolNamePartial                       = MakeSymbolName("Partial")
	SymbolNamePick                          = MakeSymbolName("Pick")
	SymbolNamePromise                       = MakeSymbolName("Promise")
	SymbolNamePromiseConstructor            = MakeSymbolName("PromiseConstructor")
	SymbolNamePromiseLike                   = MakeSymbolName("PromiseLike")
	SymbolNameRawJSON                       = MakeSymbolName("RawJSON")
	SymbolNameReadonly                      = MakeSymbolName("Readonly")
	SymbolNameReadonlyArray                 = MakeSymbolName("ReadonlyArray")
	SymbolNameReadonlyMap                   = MakeSymbolName("ReadonlyMap")
	SymbolNameReadonlySet                   = MakeSymbolName("ReadonlySet")
	SymbolNameRecord                        = MakeSymbolName("Record")
	SymbolNameReflect                       = MakeSymbolName("Reflect")
	SymbolNameRegExp                        = MakeSymbolName("RegExp")
	SymbolNameRegExpConstructor             = MakeSymbolName("RegExpConstructor")
	SymbolNameRegExpExecArray               = MakeSymbolName("RegExpExecArray")
	SymbolNameRegExpMatchArray              = MakeSymbolName("RegExpMatchArray")
	SymbolNameRelativeTimeFormat            = MakeSymbolName("RelativeTimeFormat")
	SymbolNameRequired                      = MakeSymbolName("Required")
	SymbolNameSet                           = MakeSymbolName("Set")
	SymbolNameSharedArrayBuffer             = MakeSymbolName("SharedArrayBuffer")
	SymbolNameString                        = MakeSymbolName("String")
	SymbolNameStringConstructor             = MakeSymbolName("StringConstructor")
	SymbolNameSymbol                        = MakeSymbolName("Symbol")
	SymbolNameSymbolConstructor             = MakeSymbolName("SymbolConstructor")
	SymbolNameT                             = MakeSymbolName("T")
	SymbolNameTemplateStringsArray          = MakeSymbolName("TemplateStringsArray")
	SymbolNameThisType                      = MakeSymbolName("ThisType")
	SymbolNameTypedPropertyDescriptor       = MakeSymbolName("TypedPropertyDescriptor")
	SymbolNameUint16Array                   = MakeSymbolName("Uint16Array")
	SymbolNameUint32Array                   = MakeSymbolName("Uint32Array")
	SymbolNameUint8Array                    = MakeSymbolName("Uint8Array")
	SymbolNameUint8ArrayConstructor         = MakeSymbolName("Uint8ArrayConstructor")
	SymbolNameUint8ClampedArray             = MakeSymbolName("Uint8ClampedArray")
	SymbolNameUncapitalize                  = MakeSymbolName("Uncapitalize")
	SymbolNameUppercase                     = MakeSymbolName("Uppercase")
	SymbolNameWeakMap                       = MakeSymbolName("WeakMap")
	SymbolNameWeakSet                       = MakeSymbolName("WeakSet")
	SymbolNameESModule                      = MakeSymbolName("__esModule")
	SymbolNameUnderscoreDefault             = MakeSymbolName("_default")
	SymbolNameAny                           = MakeSymbolName("any")
	SymbolNameArg                           = MakeSymbolName("arg")
	SymbolNameArgs                          = MakeSymbolName("args")
	SymbolNameArguments                     = MakeSymbolName("arguments")
	SymbolNameAsyncIteratorProperty         = MakeSymbolName("asyncIterator")
	SymbolNameBind                          = MakeSymbolName("bind")
	SymbolNameBooleanKeyword                = MakeSymbolName("boolean")
	SymbolNameCaller                        = MakeSymbolName("caller")
	SymbolNameChildren                      = MakeSymbolName("children")
	SymbolNameClass                         = MakeSymbolName("class")
	SymbolNameClassName                     = MakeSymbolName("className")
	SymbolNameConst                         = MakeSymbolName("const")
	SymbolNameContext                       = MakeSymbolName("context")
	SymbolNameDescriptor                    = MakeSymbolName("descriptor")
	SymbolNameDone                          = MakeSymbolName("done")
	SymbolNameExports                       = MakeSymbolName("exports")
	SymbolNameFor                           = MakeSymbolName("for")
	SymbolNameGetProperty                   = MakeSymbolName("get")
	SymbolNameGlobal                        = MakeSymbolName("global")
	SymbolNameGlobalThis                    = MakeSymbolName("globalThis")
	SymbolNameHasInstance                   = MakeSymbolName("hasInstance")
	SymbolNameHtmlFor                       = MakeSymbolName("htmlFor")
	SymbolNameIteratorProperty              = MakeSymbolName("iterator")
	SymbolNameLength                        = MakeSymbolName("length")
	SymbolNameMeta                          = MakeSymbolName("meta")
	SymbolNameModule                        = MakeSymbolName("module")
	SymbolNameName                          = MakeSymbolName("name")
	SymbolNameNever                         = MakeSymbolName("never")
	SymbolNameNext                          = MakeSymbolName("next")
	SymbolNameNumberKeyword                 = MakeSymbolName("number")
	SymbolNameParameterIndex                = MakeSymbolName("parameterIndex")
	SymbolNamePrivate                       = MakeSymbolName("private")
	SymbolNamePropertyKey                   = MakeSymbolName("propertyKey")
	SymbolNameProps                         = MakeSymbolName("props")
	SymbolNamePrototype                     = MakeSymbolName("prototype")
	SymbolNameRequire                       = MakeSymbolName("require")
	SymbolNameReturn                        = MakeSymbolName("return")
	SymbolNameSelf                          = MakeSymbolName("self")
	SymbolNameSetProperty                   = MakeSymbolName("set")
	SymbolNameStatic                        = MakeSymbolName("static")
	SymbolNameStringKeyword                 = MakeSymbolName("string")
	SymbolNameTarget                        = MakeSymbolName("target")
	SymbolNameThen                          = MakeSymbolName("then")
	SymbolNameThrow                         = MakeSymbolName("throw")
	SymbolNameUndefined                     = MakeSymbolName("undefined")
	SymbolNameUnknown                       = MakeSymbolName("unknown")
	SymbolNameValue                         = MakeSymbolName("value")
	SymbolNameWith                          = MakeSymbolName("with")
	SymbolNameWritable                      = MakeSymbolName("writable")
)

const InternalSymbolNamePrefix = "\xFE" // Invalid UTF8 sequence, will never occur as IdentifierName

var (
	InternalSymbolNameCall                    = MakeSymbolName(InternalSymbolNamePrefix + "call")                    // Call signatures
	InternalSymbolNameConstructor             = MakeSymbolName(InternalSymbolNamePrefix + "constructor")             // Constructor implementations
	InternalSymbolNameNew                     = MakeSymbolName(InternalSymbolNamePrefix + "new")                     // Constructor signatures
	InternalSymbolNameIndex                   = MakeSymbolName(InternalSymbolNamePrefix + "index")                   // Index signatures
	InternalSymbolNameExportStar              = MakeSymbolName(InternalSymbolNamePrefix + "export")                  // Module export * declarations
	InternalSymbolNameGlobal                  = MakeSymbolName(InternalSymbolNamePrefix + "global")                  // Global self-reference
	InternalSymbolNameMissing                 = MakeSymbolName(InternalSymbolNamePrefix + "missing")                 // Indicates missing symbol
	InternalSymbolNameType                    = MakeSymbolName(InternalSymbolNamePrefix + "type")                    // Anonymous type literal symbol
	InternalSymbolNameObject                  = MakeSymbolName(InternalSymbolNamePrefix + "object")                  // Anonymous object literal declaration
	InternalSymbolNameJSXAttributes           = MakeSymbolName(InternalSymbolNamePrefix + "jsxAttributes")           // Anonymous JSX attributes object literal declaration
	InternalSymbolNameClass                   = MakeSymbolName(InternalSymbolNamePrefix + "class")                   // Unnamed class expression
	InternalSymbolNameFunction                = MakeSymbolName(InternalSymbolNamePrefix + "function")                // Unnamed function expression
	InternalSymbolNameComputed                = MakeSymbolName(InternalSymbolNamePrefix + "computed")                // Computed property name declaration with dynamic name
	InternalSymbolNameAssignmentDeclaration   = MakeSymbolName(InternalSymbolNamePrefix + "assignment")              // Assignment declarations
	InternalSymbolNameInstantiationExpression = MakeSymbolName(InternalSymbolNamePrefix + "instantiationExpression") // Instantiation expressions
	InternalSymbolNameImportAttributes        = MakeSymbolName(InternalSymbolNamePrefix + "importAttributes")
	InternalSymbolNameExportEquals            = MakeSymbolName("export=") // Export assignment symbol
	InternalSymbolNameDefault                 = MakeSymbolName("default") // Default export symbol (technically not wholly internal, but included here for usability)
	InternalSymbolNameThis                    = MakeSymbolName("this")
	InternalSymbolNameModuleExports           = MakeSymbolName("module.exports")
)

// SymbolNameText returns a display name, preserving private identifier spelling.
func SymbolNameText(symbol *Symbol) string {
	if symbol.ValueDeclaration() != nil && IsPrivateIdentifierClassElementDeclaration(symbol.ValueDeclaration()) {
		return symbol.ValueDeclaration().Name().Text()
	}
	return symbol.Name().Value()
}

// EscapeAllInternalSymbolNames replaces internal symbol name markers ("\xFE") with "__".
func EscapeAllInternalSymbolNames(name string) string {
	return strings.ReplaceAll(name, InternalSymbolNamePrefix, "__")
}

func EscapeInternalSymbolName(symbolName SymbolName) string {
	name := symbolName.Value()
	if rest, ok := strings.CutPrefix(name, InternalSymbolNamePrefix); ok {
		return "__" + rest
	}
	return name
}

// EscapeSymbolName converts a binder symbol name into its escaped "__String"
// form. Internal names (prefixed with the "\xFE" sentinel) become "__"-prefixed,
// and user names that already begin with "__" gain an extra leading underscore
// so they can be distinguished from internal names.
func EscapeSymbolName(symbolName SymbolName) string {
	name := symbolName.Value()
	if rest, ok := strings.CutPrefix(name, InternalSymbolNamePrefix); ok {
		return "__" + rest
	}
	if len(name) >= 2 && name[0] == '_' && name[1] == '_' {
		return "_" + name
	}
	return name
}

// UnescapeSymbolName reverses EscapeSymbolName and interns the decoded name.
func UnescapeSymbolName(name string) SymbolName {
	if strings.HasPrefix(name, "___") {
		name = name[1:]
	} else if rest, ok := strings.CutPrefix(name, "__"); ok {
		name = InternalSymbolNamePrefix + rest
	}
	return MakeSymbolName(name)
}
