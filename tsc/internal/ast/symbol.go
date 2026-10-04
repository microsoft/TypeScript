package ast

import (
	"strings"
	"sync/atomic"

	"github.com/microsoft/TypeScript/tsc/internal/debug"
)

// Symbol

type Symbol struct {
	Flags            SymbolFlags
	CheckFlags       CheckFlags // Non-zero only in transient symbols created by Checker
	Name             string
	Declarations     []*Node
	ValueDeclaration *Node
	Members          SymbolTable
	Exports          SymbolTable
	id               atomic.Uint64
	Parent           *Symbol
	ExportSymbol     *Symbol
}

// GetSourceFileOfSymbol returns the owning file of a published binder symbol, or
// nil for a non-file-owned symbol, even if it borrows declarations from a file.
// Ownership recovery walks only the first declaration's AST parents.
func GetSourceFileOfSymbol(symbol *Symbol) *SourceFile {
	debug.Assert(symbol != nil, "Expected a symbol")
	if symbol.Flags&SymbolFlagsTransient != 0 {
		return nil
	}
	if len(symbol.Declarations) == 0 {
		// A class's implicit prototype has no declaration of its own.
		debug.Assert(symbol.Flags&SymbolFlagsPrototype != 0, "File-bound symbol has no declarations")
		debug.Assert(symbol.Parent != nil && symbol.Parent.Flags&SymbolFlagsClass != 0, "Prototype has no declaring class")
		symbol = symbol.Parent
		debug.Assert(symbol.Flags&SymbolFlagsTransient == 0, "Prototype parent is not file-bound")
		debug.Assert(len(symbol.Declarations) != 0, "Prototype parent has no declarations")
	}
	file := GetSourceFileOfNode(symbol.Declarations[0])
	debug.Assert(file != nil, "File-bound declaration has no source file")
	return file
}

func (s *Symbol) IsExternalModule() bool {
	return s.Flags&SymbolFlagsModule != 0 && IsAmbientModuleSymbolName(s.Name)
}

func (s *Symbol) IsStatic() bool {
	if s.ValueDeclaration == nil {
		return false
	}
	modifierFlags := s.ValueDeclaration.ModifierFlags()
	return modifierFlags&ModifierFlagsStatic != 0
}

// See comment on `declareModuleMember` in `binder.go`.
func (s *Symbol) CombinedLocalAndExportSymbolFlags() SymbolFlags {
	if s.ExportSymbol != nil {
		return s.Flags | s.ExportSymbol.Flags
	}
	return s.Flags
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
	if symbol.ValueDeclaration != nil && IsPrivateIdentifierClassElementDeclaration(symbol.ValueDeclaration) {
		return symbol.ValueDeclaration.Name().Text()
	}
	return symbol.Name
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
