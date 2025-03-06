package printer

type EmitFlags uint32

const (
	EFSingleLine                EmitFlags = 1 << iota // The contents of this node should be emitted on a single line.
	EFMultiLine                                       // The contents of this node should be emitted on multiple lines.
	EFNoLeadingSourceMap                              // Do not emit a leading source map location for this node.
	EFNoTrailingSourceMap                             // Do not emit a trailing source map location for this node.
	EFNoNestedSourceMaps                              // Do not emit source map locations for children of this node.
	EFNoTokenLeadingSourceMaps                        // Do not emit leading source map location for token nodes.
	EFNoTokenTrailingSourceMaps                       // Do not emit trailing source map location for token nodes.
	EFNoLeadingComments                               // Do not emit leading comments for this node.
	EFNoTrailingComments                              // Do not emit trailing comments for this node.
	EFNoNestedComments                                // Do not emit nested comments for children of this node.
	EFHelperName                                      // The Identifier refers to an *unscoped* emit helper (one that is emitted at the top of the file)
	EFExportName                                      // Ensure an export prefix is added for an identifier that points to an exported declaration with a local name (see SymbolFlags.ExportHasLocal).
	EFLocalName                                       // Ensure an export prefix is not added for an identifier that points to an exported declaration.
	EFInternalName                                    // The name is internal to an ES5 class body function.
	EFIndented                                        // Adds an explicit extra indentation level for class and function bodies when printing (used to match old emitter).
	EFNoIndentation                                   // Do not indent the node.
	EFReuseTempVariableScope                          // Reuse the existing temp variable scope during emit.
	EFCustomPrologue                                  // Treat the statement as if it were a prologue directive (NOTE: Prologue directives are *not* transformed).
	EFNoHoisting                                      // Do not hoist this declaration in --module system
	EFNoAsciiEscaping                                 // When synthesizing nodes that lack an original node or textSourceNode, we want to write the text on the node with ASCII escaping substitutions.
	EFExternalHelpers                                 // This source file has external helpers
	EFNeverApplyImportHelper                          // Do not apply an import helper to this node
	EFStartOnNewLine                                  // Start this node on a new line
	EFIndirectCall                                    // Emit CallExpression as an indirect call: `(0, f)()`
)

const (
	EFNone              EmitFlags = 0
	EFNoSourceMap                 = EFNoLeadingSourceMap | EFNoTrailingSourceMap             // Do not emit a source map location for this node.
	EFNoTokenSourceMaps           = EFNoTokenLeadingSourceMaps | EFNoTokenTrailingSourceMaps // Do not emit source map locations for tokens of this node.
	EFNoComments                  = EFNoLeadingComments | EFNoTrailingComments               // Do not emit comments for this node.
)
