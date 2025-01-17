package ast

import (
	"maps"
	"slices"
	"strings"

	"github.com/microsoft/typescript-go/internal/compiler/diagnostics"
	"github.com/microsoft/typescript-go/internal/core"
)

// Diagnostic

type Diagnostic struct {
	file               *SourceFile
	loc                core.TextRange
	code               int32
	category           diagnostics.Category
	message            string
	messageChain       []*Diagnostic
	relatedInformation []*Diagnostic
}

func (d *Diagnostic) File() *SourceFile                 { return d.file }
func (d *Diagnostic) Pos() int                          { return d.loc.Pos() }
func (d *Diagnostic) End() int                          { return d.loc.End() }
func (d *Diagnostic) Len() int                          { return d.loc.Len() }
func (d *Diagnostic) Loc() core.TextRange               { return d.loc }
func (d *Diagnostic) Code() int32                       { return d.code }
func (d *Diagnostic) Category() diagnostics.Category    { return d.category }
func (d *Diagnostic) Message() string                   { return d.message }
func (d *Diagnostic) MessageChain() []*Diagnostic       { return d.messageChain }
func (d *Diagnostic) RelatedInformation() []*Diagnostic { return d.relatedInformation }

func (d *Diagnostic) SetFile(file *SourceFile)                  { d.file = file }
func (d *Diagnostic) SetLocation(loc core.TextRange)            { d.loc = loc }
func (d *Diagnostic) SetCategory(category diagnostics.Category) { d.category = category }

func (d *Diagnostic) SetMessageChain(messageChain []*Diagnostic) *Diagnostic {
	d.messageChain = messageChain
	return d
}

func (d *Diagnostic) AddMessageChain(messageChain *Diagnostic) *Diagnostic {
	if messageChain != nil {
		d.messageChain = append(d.messageChain, messageChain)
	}
	return d
}

func (d *Diagnostic) SetRelatedInfo(relatedInformation []*Diagnostic) *Diagnostic {
	d.relatedInformation = relatedInformation
	return d
}

func (d *Diagnostic) AddRelatedInfo(relatedInformation *Diagnostic) *Diagnostic {
	if relatedInformation != nil {
		d.relatedInformation = append(d.relatedInformation, relatedInformation)
	}
	return d
}

func NewDiagnostic(file *SourceFile, loc core.TextRange, message *diagnostics.Message, args ...any) *Diagnostic {
	return &Diagnostic{
		file:     file,
		loc:      loc,
		code:     message.Code(),
		category: message.Category(),
		message:  message.Format(args...),
	}
}

func NewDiagnosticChain(chain *Diagnostic, message *diagnostics.Message, args ...any) *Diagnostic {
	if chain != nil {
		return NewDiagnostic(chain.file, chain.loc, message, args...).AddMessageChain(chain).SetRelatedInfo(chain.relatedInformation)
	}
	return NewDiagnostic(nil, core.TextRange{}, message, args...)
}

func NewCompilerDiagnostic(message *diagnostics.Message, args ...any) *Diagnostic {
	return NewDiagnostic(nil, core.UndefinedTextRange(), message, args...)
}

type DiagnosticsCollection struct {
	fileDiagnostics    map[string][]*Diagnostic
	nonFileDiagnostics []*Diagnostic
}

func (c *DiagnosticsCollection) Add(diagnostic *Diagnostic) {
	if diagnostic.File() != nil {
		fileName := diagnostic.File().FileName()
		if c.fileDiagnostics == nil {
			c.fileDiagnostics = make(map[string][]*Diagnostic)
		}
		c.fileDiagnostics[fileName] = core.InsertSorted(c.fileDiagnostics[fileName], diagnostic, CompareDiagnostics)
	} else {
		c.nonFileDiagnostics = core.InsertSorted(c.nonFileDiagnostics, diagnostic, CompareDiagnostics)
	}
}

func (c *DiagnosticsCollection) Lookup(diagnostic *Diagnostic) *Diagnostic {
	var diagnostics []*Diagnostic
	if diagnostic.File() != nil {
		diagnostics = c.fileDiagnostics[diagnostic.File().FileName()]
	} else {
		diagnostics = c.nonFileDiagnostics
	}
	if i, ok := slices.BinarySearchFunc(diagnostics, diagnostic, CompareDiagnostics); ok {
		return diagnostics[i]
	}
	return nil
}

func (c *DiagnosticsCollection) GetGlobalDiagnostics() []*Diagnostic {
	return c.nonFileDiagnostics
}

func (c *DiagnosticsCollection) GetDiagnosticsForFile(fileName string) []*Diagnostic {
	return c.fileDiagnostics[fileName]
}

func (c *DiagnosticsCollection) GetDiagnostics() []*Diagnostic {
	fileNames := slices.Collect(maps.Keys(c.fileDiagnostics))
	slices.Sort(fileNames)
	diagnostics := c.nonFileDiagnostics
	for _, fileName := range fileNames {
		diagnostics = append(diagnostics, c.fileDiagnostics[fileName]...)
	}
	return diagnostics
}

func getDiagnosticPath(d *Diagnostic) string {
	if d.File() != nil {
		return d.File().FileName()
	}
	return ""
}

func EqualDiagnostics(d1, d2 *Diagnostic) bool {
	return getDiagnosticPath(d1) == getDiagnosticPath(d2) &&
		d1.Loc() == d2.Loc() &&
		d1.Code() == d2.Code() &&
		d1.Message() == d2.Message() &&
		slices.EqualFunc(d1.MessageChain(), d2.MessageChain(), equalMessageChain) &&
		slices.EqualFunc(d1.RelatedInformation(), d2.RelatedInformation(), EqualDiagnostics)
}

func equalMessageChain(c1, c2 *Diagnostic) bool {
	return c1.Code() == c2.Code() &&
		c1.Message() == c2.Message() &&
		slices.EqualFunc(c1.MessageChain(), c2.MessageChain(), equalMessageChain)
}

func compareMessageChainSize(c1, c2 []*Diagnostic) int {
	c := len(c2) - len(c1)
	if c != 0 {
		return c
	}
	for i := range c1 {
		c = compareMessageChainSize(c1[i].MessageChain(), c2[i].MessageChain())
		if c != 0 {
			return c
		}
	}
	return 0
}

func compareMessageChainContent(c1, c2 []*Diagnostic) int {
	for i := range c1 {
		c := strings.Compare(c1[i].Message(), c2[i].Message())
		if c != 0 {
			return c
		}
		if c1[i].MessageChain() != nil {
			c = compareMessageChainContent(c1[i].MessageChain(), c2[i].MessageChain())
			if c != 0 {
				return c
			}
		}
	}
	return 0
}

func compareRelatedInfo(r1, r2 []*Diagnostic) int {
	c := len(r2) - len(r1)
	if c != 0 {
		return c
	}
	for i := range r1 {
		c = CompareDiagnostics(r1[i], r2[i])
		if c != 0 {
			return c
		}
	}
	return 0
}

func CompareDiagnostics(d1, d2 *Diagnostic) int {
	c := strings.Compare(getDiagnosticPath(d1), getDiagnosticPath(d2))
	if c != 0 {
		return c
	}
	c = d1.Loc().Pos() - d2.Loc().Pos()
	if c != 0 {
		return c
	}
	c = d1.Loc().End() - d2.Loc().End()
	if c != 0 {
		return c
	}
	c = int(d1.Code()) - int(d2.Code())
	if c != 0 {
		return c
	}
	c = strings.Compare(d1.Message(), d2.Message())
	if c != 0 {
		return c
	}
	c = compareMessageChainSize(d1.MessageChain(), d2.MessageChain())
	if c != 0 {
		return c
	}
	c = compareMessageChainContent(d1.MessageChain(), d2.MessageChain())
	if c != 0 {
		return c
	}
	return compareRelatedInfo(d1.RelatedInformation(), d2.RelatedInformation())
}
