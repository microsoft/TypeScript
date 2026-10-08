package ast

import (
	"strings"
	"sync/atomic"
	"unique"

	"github.com/microsoft/TypeScript/tsc/internal/debug"
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
type SymbolName = unique.Handle[string]

// EmptySymbolName is a valid empty name, distinct from an unset zero handle.
var EmptySymbolName = unique.Make("")

type SymbolTable map[SymbolName]*Symbol

// Fixed symbol names are interned once and shared by compiler consumers.
var (
	SymbolNameZero                          = unique.Make("0")
	SymbolNameUnresolved                    = unique.Make("<<unresolved>>")
	SymbolNameAbstractModuleSource          = unique.Make("AbstractModuleSource")
	SymbolNameArray                         = unique.Make("Array")
	SymbolNameArrayBuffer                   = unique.Make("ArrayBuffer")
	SymbolNameArrayConstructor              = unique.Make("ArrayConstructor")
	SymbolNameArrayLike                     = unique.Make("ArrayLike")
	SymbolNameAsyncDisposable               = unique.Make("AsyncDisposable")
	SymbolNameAsyncDisposableStack          = unique.Make("AsyncDisposableStack")
	SymbolNameAsyncGenerator                = unique.Make("AsyncGenerator")
	SymbolNameAsyncGeneratorFunction        = unique.Make("AsyncGeneratorFunction")
	SymbolNameAsyncIterable                 = unique.Make("AsyncIterable")
	SymbolNameAsyncIterableIterator         = unique.Make("AsyncIterableIterator")
	SymbolNameAsyncIterator                 = unique.Make("AsyncIterator")
	SymbolNameAsyncIteratorObject           = unique.Make("AsyncIteratorObject")
	SymbolNameAtomics                       = unique.Make("Atomics")
	SymbolNameAwaited                       = unique.Make("Awaited")
	SymbolNameBigInt                        = unique.Make("BigInt")
	SymbolNameBigInt64Array                 = unique.Make("BigInt64Array")
	SymbolNameBigUint64Array                = unique.Make("BigUint64Array")
	SymbolNameBoolean                       = unique.Make("Boolean")
	SymbolNameBuiltinIteratorReturn         = unique.Make("BuiltinIteratorReturn")
	SymbolNameCallableFunction              = unique.Make("CallableFunction")
	SymbolNameCapitalize                    = unique.Make("Capitalize")
	SymbolNameClassAccessorDecoratorContext = unique.Make("ClassAccessorDecoratorContext")
	SymbolNameClassAccessorDecoratorResult  = unique.Make("ClassAccessorDecoratorResult")
	SymbolNameClassAccessorDecoratorTarget  = unique.Make("ClassAccessorDecoratorTarget")
	SymbolNameClassDecoratorContext         = unique.Make("ClassDecoratorContext")
	SymbolNameClassFieldDecoratorContext    = unique.Make("ClassFieldDecoratorContext")
	SymbolNameClassGetterDecoratorContext   = unique.Make("ClassGetterDecoratorContext")
	SymbolNameClassMethodDecoratorContext   = unique.Make("ClassMethodDecoratorContext")
	SymbolNameClassSetterDecoratorContext   = unique.Make("ClassSetterDecoratorContext")
	SymbolNameDataView                      = unique.Make("DataView")
	SymbolNameDate                          = unique.Make("Date")
	SymbolNameDateTimeFormat                = unique.Make("DateTimeFormat")
	SymbolNameDisposable                    = unique.Make("Disposable")
	SymbolNameDisposableStack               = unique.Make("DisposableStack")
	SymbolNameElement                       = unique.Make("Element")
	SymbolNameElementAttributesProperty     = unique.Make("ElementAttributesProperty")
	SymbolNameElementChildrenAttribute      = unique.Make("ElementChildrenAttribute")
	SymbolNameElementClass                  = unique.Make("ElementClass")
	SymbolNameElementType                   = unique.Make("ElementType")
	SymbolNameError                         = unique.Make("Error")
	SymbolNameErrorConstructor              = unique.Make("ErrorConstructor")
	SymbolNameEventTarget                   = unique.Make("EventTarget")
	SymbolNameExtract                       = unique.Make("Extract")
	SymbolNameFloat16Array                  = unique.Make("Float16Array")
	SymbolNameFloat32Array                  = unique.Make("Float32Array")
	SymbolNameFloat64Array                  = unique.Make("Float64Array")
	SymbolNameFunction                      = unique.Make("Function")
	SymbolNameGenerator                     = unique.Make("Generator")
	SymbolNameIArguments                    = unique.Make("IArguments")
	SymbolNameImportAttributes              = unique.Make("ImportAttributes")
	SymbolNameImportCallOptions             = unique.Make("ImportCallOptions")
	SymbolNameImportMeta                    = unique.Make("ImportMeta")
	SymbolNameImportMetaExpression          = unique.Make("ImportMetaExpression")
	SymbolNameInt16Array                    = unique.Make("Int16Array")
	SymbolNameInt32Array                    = unique.Make("Int32Array")
	SymbolNameInt8Array                     = unique.Make("Int8Array")
	SymbolNameIntl                          = unique.Make("Intl")
	SymbolNameIntrinsicAttributes           = unique.Make("IntrinsicAttributes")
	SymbolNameIntrinsicClassAttributes      = unique.Make("IntrinsicClassAttributes")
	SymbolNameIntrinsicElements             = unique.Make("IntrinsicElements")
	SymbolNameIterable                      = unique.Make("Iterable")
	SymbolNameIterableIterator              = unique.Make("IterableIterator")
	SymbolNameIterator                      = unique.Make("Iterator")
	SymbolNameIteratorConstructor           = unique.Make("IteratorConstructor")
	SymbolNameIteratorObject                = unique.Make("IteratorObject")
	SymbolNameIteratorReturnResult          = unique.Make("IteratorReturnResult")
	SymbolNameIteratorYieldResult           = unique.Make("IteratorYieldResult")
	SymbolNameJSON                          = unique.Make("JSON")
	SymbolNameJSX                           = unique.Make("JSX")
	SymbolNameK                             = unique.Make("K")
	SymbolNameLibraryManagedAttributes      = unique.Make("LibraryManagedAttributes")
	SymbolNameLowercase                     = unique.Make("Lowercase")
	SymbolNameMap                           = unique.Make("Map")
	SymbolNameMapConstructor                = unique.Make("MapConstructor")
	SymbolNameMath                          = unique.Make("Math")
	SymbolNameNaN                           = unique.Make("NaN")
	SymbolNameNewableFunction               = unique.Make("NewableFunction")
	SymbolNameNoInfer                       = unique.Make("NoInfer")
	SymbolNameNode                          = unique.Make("Node")
	SymbolNameNodeList                      = unique.Make("NodeList")
	SymbolNameNonNullable                   = unique.Make("NonNullable")
	SymbolNameNumber                        = unique.Make("Number")
	SymbolNameNumberConstructor             = unique.Make("NumberConstructor")
	SymbolNameNumberFormat                  = unique.Make("NumberFormat")
	SymbolNameObject                        = unique.Make("Object")
	SymbolNameObjectConstructor             = unique.Make("ObjectConstructor")
	SymbolNameOmit                          = unique.Make("Omit")
	SymbolNamePartial                       = unique.Make("Partial")
	SymbolNamePick                          = unique.Make("Pick")
	SymbolNamePromise                       = unique.Make("Promise")
	SymbolNamePromiseConstructor            = unique.Make("PromiseConstructor")
	SymbolNamePromiseLike                   = unique.Make("PromiseLike")
	SymbolNameRawJSON                       = unique.Make("RawJSON")
	SymbolNameReadonly                      = unique.Make("Readonly")
	SymbolNameReadonlyArray                 = unique.Make("ReadonlyArray")
	SymbolNameReadonlyMap                   = unique.Make("ReadonlyMap")
	SymbolNameReadonlySet                   = unique.Make("ReadonlySet")
	SymbolNameRecord                        = unique.Make("Record")
	SymbolNameReflect                       = unique.Make("Reflect")
	SymbolNameRegExp                        = unique.Make("RegExp")
	SymbolNameRegExpConstructor             = unique.Make("RegExpConstructor")
	SymbolNameRegExpExecArray               = unique.Make("RegExpExecArray")
	SymbolNameRegExpMatchArray              = unique.Make("RegExpMatchArray")
	SymbolNameRelativeTimeFormat            = unique.Make("RelativeTimeFormat")
	SymbolNameRequired                      = unique.Make("Required")
	SymbolNameSet                           = unique.Make("Set")
	SymbolNameSharedArrayBuffer             = unique.Make("SharedArrayBuffer")
	SymbolNameString                        = unique.Make("String")
	SymbolNameStringConstructor             = unique.Make("StringConstructor")
	SymbolNameSymbol                        = unique.Make("Symbol")
	SymbolNameSymbolConstructor             = unique.Make("SymbolConstructor")
	SymbolNameT                             = unique.Make("T")
	SymbolNameTemplateStringsArray          = unique.Make("TemplateStringsArray")
	SymbolNameThisType                      = unique.Make("ThisType")
	SymbolNameTypedPropertyDescriptor       = unique.Make("TypedPropertyDescriptor")
	SymbolNameUint16Array                   = unique.Make("Uint16Array")
	SymbolNameUint32Array                   = unique.Make("Uint32Array")
	SymbolNameUint8Array                    = unique.Make("Uint8Array")
	SymbolNameUint8ArrayConstructor         = unique.Make("Uint8ArrayConstructor")
	SymbolNameUint8ClampedArray             = unique.Make("Uint8ClampedArray")
	SymbolNameUncapitalize                  = unique.Make("Uncapitalize")
	SymbolNameUppercase                     = unique.Make("Uppercase")
	SymbolNameWeakMap                       = unique.Make("WeakMap")
	SymbolNameWeakSet                       = unique.Make("WeakSet")
	SymbolNameESModule                      = unique.Make("__esModule")
	SymbolNameUnderscoreDefault             = unique.Make("_default")
	SymbolNameAny                           = unique.Make("any")
	SymbolNameArg                           = unique.Make("arg")
	SymbolNameArgs                          = unique.Make("args")
	SymbolNameArguments                     = unique.Make("arguments")
	SymbolNameAsyncIteratorProperty         = unique.Make("asyncIterator")
	SymbolNameBind                          = unique.Make("bind")
	SymbolNameBooleanKeyword                = unique.Make("boolean")
	SymbolNameCaller                        = unique.Make("caller")
	SymbolNameChildren                      = unique.Make("children")
	SymbolNameClass                         = unique.Make("class")
	SymbolNameClassName                     = unique.Make("className")
	SymbolNameConst                         = unique.Make("const")
	SymbolNameContext                       = unique.Make("context")
	SymbolNameDescriptor                    = unique.Make("descriptor")
	SymbolNameDone                          = unique.Make("done")
	SymbolNameExports                       = unique.Make("exports")
	SymbolNameFor                           = unique.Make("for")
	SymbolNameGetProperty                   = unique.Make("get")
	SymbolNameGlobal                        = unique.Make("global")
	SymbolNameGlobalThis                    = unique.Make("globalThis")
	SymbolNameHasInstance                   = unique.Make("hasInstance")
	SymbolNameHtmlFor                       = unique.Make("htmlFor")
	SymbolNameIteratorProperty              = unique.Make("iterator")
	SymbolNameLength                        = unique.Make("length")
	SymbolNameMeta                          = unique.Make("meta")
	SymbolNameModule                        = unique.Make("module")
	SymbolNameName                          = unique.Make("name")
	SymbolNameNever                         = unique.Make("never")
	SymbolNameNext                          = unique.Make("next")
	SymbolNameNumberKeyword                 = unique.Make("number")
	SymbolNameParameterIndex                = unique.Make("parameterIndex")
	SymbolNamePrivate                       = unique.Make("private")
	SymbolNamePropertyKey                   = unique.Make("propertyKey")
	SymbolNameProps                         = unique.Make("props")
	SymbolNamePrototype                     = unique.Make("prototype")
	SymbolNameRequire                       = unique.Make("require")
	SymbolNameReturn                        = unique.Make("return")
	SymbolNameSelf                          = unique.Make("self")
	SymbolNameSetProperty                   = unique.Make("set")
	SymbolNameStatic                        = unique.Make("static")
	SymbolNameStringKeyword                 = unique.Make("string")
	SymbolNameTarget                        = unique.Make("target")
	SymbolNameThen                          = unique.Make("then")
	SymbolNameThrow                         = unique.Make("throw")
	SymbolNameUndefined                     = unique.Make("undefined")
	SymbolNameUnknown                       = unique.Make("unknown")
	SymbolNameValue                         = unique.Make("value")
	SymbolNameWith                          = unique.Make("with")
	SymbolNameWritable                      = unique.Make("writable")
)

const InternalSymbolNamePrefix = "\xFE" // Invalid UTF8 sequence, will never occur as IdentifierName

var (
	InternalSymbolNameCall                    = unique.Make(InternalSymbolNamePrefix + "call")                    // Call signatures
	InternalSymbolNameConstructor             = unique.Make(InternalSymbolNamePrefix + "constructor")             // Constructor implementations
	InternalSymbolNameNew                     = unique.Make(InternalSymbolNamePrefix + "new")                     // Constructor signatures
	InternalSymbolNameIndex                   = unique.Make(InternalSymbolNamePrefix + "index")                   // Index signatures
	InternalSymbolNameExportStar              = unique.Make(InternalSymbolNamePrefix + "export")                  // Module export * declarations
	InternalSymbolNameGlobal                  = unique.Make(InternalSymbolNamePrefix + "global")                  // Global self-reference
	InternalSymbolNameMissing                 = unique.Make(InternalSymbolNamePrefix + "missing")                 // Indicates missing symbol
	InternalSymbolNameType                    = unique.Make(InternalSymbolNamePrefix + "type")                    // Anonymous type literal symbol
	InternalSymbolNameObject                  = unique.Make(InternalSymbolNamePrefix + "object")                  // Anonymous object literal declaration
	InternalSymbolNameJSXAttributes           = unique.Make(InternalSymbolNamePrefix + "jsxAttributes")           // Anonymous JSX attributes object literal declaration
	InternalSymbolNameClass                   = unique.Make(InternalSymbolNamePrefix + "class")                   // Unnamed class expression
	InternalSymbolNameFunction                = unique.Make(InternalSymbolNamePrefix + "function")                // Unnamed function expression
	InternalSymbolNameComputed                = unique.Make(InternalSymbolNamePrefix + "computed")                // Computed property name declaration with dynamic name
	InternalSymbolNameAssignmentDeclaration   = unique.Make(InternalSymbolNamePrefix + "assignment")              // Assignment declarations
	InternalSymbolNameInstantiationExpression = unique.Make(InternalSymbolNamePrefix + "instantiationExpression") // Instantiation expressions
	InternalSymbolNameImportAttributes        = unique.Make(InternalSymbolNamePrefix + "importAttributes")
	InternalSymbolNameExportEquals            = unique.Make("export=") // Export assignment symbol
	InternalSymbolNameDefault                 = unique.Make("default") // Default export symbol (technically not wholly internal, but included here for usability)
	InternalSymbolNameThis                    = unique.Make("this")
	InternalSymbolNameModuleExports           = unique.Make("module.exports")
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
