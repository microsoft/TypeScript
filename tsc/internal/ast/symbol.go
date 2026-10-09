package ast

import (
	"strings"
	"sync/atomic"

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
	name             string
	declarations     []Node
	valueDeclaration Node
	members          SymbolTable
	exports          SymbolTable
	parent           *Symbol
	exportSymbol     *Symbol
}

func (s *Symbol) Flags() SymbolFlags     { return s.flags }
func (s *Symbol) CheckFlags() CheckFlags { return s.checkFlags }
func (s *Symbol) Name() string           { return s.data.name }
func (s *Symbol) Declarations() []Node   { return s.data.declarations }
func (s *Symbol) ValueDeclaration() Node { return s.data.valueDeclaration }
func (s *Symbol) Members() SymbolTable   { return s.data.members }
func (s *Symbol) Exports() SymbolTable   { return s.data.exports }
func (s *Symbol) Parent() *Symbol        { return s.data.parent }
func (s *Symbol) ExportSymbol() *Symbol  { return s.data.exportSymbol }

func (s *Symbol) SetFlags(value SymbolFlags)     { s.flags = value }
func (s *Symbol) SetCheckFlags(value CheckFlags) { s.checkFlags = value }
func (s *Symbol) SetName(value string)           { s.data.name = value }
func (s *Symbol) SetDeclarations(value []Node)   { s.data.declarations = value }
func (s *Symbol) SetValueDeclaration(value Node) { s.data.valueDeclaration = value }
func (s *Symbol) SetMembers(value SymbolTable)   { s.data.members = value }
func (s *Symbol) SetExports(value SymbolTable)   { s.data.exports = value }
func (s *Symbol) SetParent(value *Symbol)        { s.data.parent = value }
func (s *Symbol) SetExportSymbol(value *Symbol)  { s.data.exportSymbol = value }

// SymbolWithData is a helper structure that contains both a Symbol and its associated symbolData.
type SymbolWithData struct {
	s Symbol
	d symbolData
}

// Initializes a SymbolWithData instance and returns the embedded Symbol.
func (sd *SymbolWithData) Initialize() *Symbol {
	sd.s.data = &sd.d
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
	if s.ValueDeclaration().IsNil() {
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

// SymbolTable

type SymbolTable map[string]*Symbol

const InternalSymbolNamePrefix = "\xFE" // Invalid UTF8 sequence, will never occur as IdentifierName

const (
	InternalSymbolNameCall                    = InternalSymbolNamePrefix + "call"                    // Call signatures
	InternalSymbolNameConstructor             = InternalSymbolNamePrefix + "constructor"             // Constructor implementations
	InternalSymbolNameNew                     = InternalSymbolNamePrefix + "new"                     // Constructor signatures
	InternalSymbolNameIndex                   = InternalSymbolNamePrefix + "index"                   // Index signatures
	InternalSymbolNameExportStar              = InternalSymbolNamePrefix + "export"                  // Module export * declarations
	InternalSymbolNameGlobal                  = InternalSymbolNamePrefix + "global"                  // Global self-reference
	InternalSymbolNameMissing                 = InternalSymbolNamePrefix + "missing"                 // Indicates missing symbol
	InternalSymbolNameType                    = InternalSymbolNamePrefix + "type"                    // Anonymous type literal symbol
	InternalSymbolNameObject                  = InternalSymbolNamePrefix + "object"                  // Anonymous object literal declaration
	InternalSymbolNameJSXAttributes           = InternalSymbolNamePrefix + "jsxAttributes"           // Anonymous JSX attributes object literal declaration
	InternalSymbolNameClass                   = InternalSymbolNamePrefix + "class"                   // Unnamed class expression
	InternalSymbolNameFunction                = InternalSymbolNamePrefix + "function"                // Unnamed function expression
	InternalSymbolNameComputed                = InternalSymbolNamePrefix + "computed"                // Computed property name declaration with dynamic name
	InternalSymbolNameAssignmentDeclaration   = InternalSymbolNamePrefix + "assignment"              // Assignment declarations
	InternalSymbolNameInstantiationExpression = InternalSymbolNamePrefix + "instantiationExpression" // Instantiation expressions
	InternalSymbolNameImportAttributes        = InternalSymbolNamePrefix + "importAttributes"
	InternalSymbolNameExportEquals            = "export=" // Export assignment symbol
	InternalSymbolNameDefault                 = "default" // Default export symbol (technically not wholly internal, but included here for usability)
	InternalSymbolNameThis                    = "this"
	InternalSymbolNameModuleExports           = "module.exports"
)

func SymbolName(symbol *Symbol) string {
	if !symbol.ValueDeclaration().IsNil() && IsPrivateIdentifierClassElementDeclaration(symbol.ValueDeclaration()) {
		return symbol.ValueDeclaration().Name().Text()
	}
	return symbol.Name()
}

// EscapeAllInternalSymbolNames replaces internal symbol name markers ("\xFE") with "__".
func EscapeAllInternalSymbolNames(name string) string {
	return strings.ReplaceAll(name, InternalSymbolNamePrefix, "__")
}

func EscapeInternalSymbolName(name string) string {
	if rest, ok := strings.CutPrefix(name, InternalSymbolNamePrefix); ok {
		return "__" + rest
	}
	return name
}

// EscapeSymbolName converts a binder symbol name into its escaped "__String"
// form. Internal names (prefixed with the "\xFE" sentinel) become "__"-prefixed,
// and user names that already begin with "__" gain an extra leading underscore
// so they can be distinguished from internal names.
func EscapeSymbolName(name string) string {
	if rest, ok := strings.CutPrefix(name, InternalSymbolNamePrefix); ok {
		return "__" + rest
	}
	if len(name) >= 2 && name[0] == '_' && name[1] == '_' {
		return "_" + name
	}
	return name
}
