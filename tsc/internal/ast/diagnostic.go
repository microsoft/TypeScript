package ast

import (
	"slices"
	"strings"
	"sync"

	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/diagnostics"
	"github.com/microsoft/typescript-go/internal/locale"
)

// Diagnostic

type Diagnostic struct {
	file     *SourceFile
	loc      core.TextRange
	code     int32
	category diagnostics.Category
	// Original message; may be nil.
	message            *diagnostics.Message
	messageKey         diagnostics.Key
	messageArgs        []string
	messageChain       []*Diagnostic
	relatedInformation []*Diagnostic
	reportsUnnecessary bool
	reportsDeprecated  bool
	skippedOnNoEmit    bool
}

func (d *Diagnostic) File() *SourceFile                 { return d.file }
func (d *Diagnostic) Pos() int                          { return d.loc.Pos() }
func (d *Diagnostic) End() int                          { return d.loc.End() }
func (d *Diagnostic) Len() int                          { return d.loc.Len() }
func (d *Diagnostic) Loc() core.TextRange               { return d.loc }
func (d *Diagnostic) Code() int32                       { return d.code }
func (d *Diagnostic) Category() diagnostics.Category    { return d.category }
func (d *Diagnostic) MessageKey() diagnostics.Key       { return d.messageKey }
func (d *Diagnostic) MessageArgs() []string             { return d.messageArgs }
func (d *Diagnostic) MessageChain() []*Diagnostic       { return d.messageChain }
func (d *Diagnostic) RelatedInformation() []*Diagnostic { return d.relatedInformation }
func (d *Diagnostic) ReportsUnnecessary() bool          { return d.reportsUnnecessary }
func (d *Diagnostic) ReportsDeprecated() bool           { return d.reportsDeprecated }
func (d *Diagnostic) SkippedOnNoEmit() bool             { return d.skippedOnNoEmit }

func (d *Diagnostic) SetFile(file *SourceFile)                  { d.file = file }
func (d *Diagnostic) SetLocation(loc core.TextRange)            { d.loc = loc }
func (d *Diagnostic) SetCategory(category diagnostics.Category) { d.category = category }
func (d *Diagnostic) SetSkippedOnNoEmit()                       { d.skippedOnNoEmit = true }

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

func (d *Diagnostic) Clone() *Diagnostic {
	result := *d
	return &result
}

func (d *Diagnostic) Localize(locale locale.Locale) string {
	return diagnostics.Localize(locale, d.message, d.messageKey, d.messageArgs...)
}

// For debugging only.
func (d *Diagnostic) String() string {
	return diagnostics.Localize(locale.Default, d.message, d.messageKey, d.messageArgs...)
}

func NewDiagnosticFromSerialized(
	file *SourceFile,
	loc core.TextRange,
	code int32,
	category diagnostics.Category,
	messageKey diagnostics.Key,
	messageArgs []string,
	messageChain []*Diagnostic,
	relatedInformation []*Diagnostic,
	reportsUnnecessary bool,
	reportsDeprecated bool,
	skippedOnNoEmit bool,
) *Diagnostic {
	return &Diagnostic{
		file:               file,
		loc:                loc,
		code:               code,
		category:           category,
		messageKey:         messageKey,
		messageArgs:        messageArgs,
		messageChain:       messageChain,
		relatedInformation: relatedInformation,
		reportsUnnecessary: reportsUnnecessary,
		reportsDeprecated:  reportsDeprecated,
		skippedOnNoEmit:    skippedOnNoEmit,
	}
}

func NewDiagnostic(file *SourceFile, loc core.TextRange, message *diagnostics.Message, args ...any) *Diagnostic {
	return &Diagnostic{
		file:               file,
		loc:                loc,
		code:               message.Code(),
		category:           message.Category(),
		message:            message,
		messageKey:         message.Key(),
		messageArgs:        diagnostics.StringifyArgs(args),
		reportsUnnecessary: message.ReportsUnnecessary(),
		reportsDeprecated:  message.ReportsDeprecated(),
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
	mu                       sync.Mutex
	count                    int
	fileDiagnostics          map[string][]*Diagnostic
	fileDiagnosticsSorted    collections.Set[string]
	nonFileDiagnostics       []*Diagnostic
	nonFileDiagnosticsSorted bool
}

func (c *DiagnosticsCollection) Add(diagnostic *Diagnostic) {
	c.mu.Lock()
	defer c.mu.Unlock()

	c.count++

	if diagnostic.File() != nil {
		fileName := diagnostic.File().FileName()
		if c.fileDiagnostics == nil {
			c.fileDiagnostics = make(map[string][]*Diagnostic)
		}
		c.fileDiagnostics[fileName] = append(c.fileDiagnostics[fileName], diagnostic)
		c.fileDiagnosticsSorted.Delete(fileName)
	} else {
		c.nonFileDiagnostics = append(c.nonFileDiagnostics, diagnostic)
		c.nonFileDiagnosticsSorted = false
	}
}

func (c *DiagnosticsCollection) Lookup(diagnostic *Diagnostic) *Diagnostic {
	c.mu.Lock()
	defer c.mu.Unlock()

	var diagnostics []*Diagnostic
	if diagnostic.File() != nil {
		diagnostics = c.getDiagnosticsForFileLocked(diagnostic.File().FileName())
	} else {
		diagnostics = c.getGlobalDiagnosticsLocked()
	}
	if i, ok := slices.BinarySearchFunc(diagnostics, diagnostic, CompareDiagnostics); ok {
		return diagnostics[i]
	}
	return nil
}

func (c *DiagnosticsCollection) GetGlobalDiagnostics() []*Diagnostic {
	c.mu.Lock()
	defer c.mu.Unlock()

	return c.getGlobalDiagnosticsLocked()
}

func (c *DiagnosticsCollection) getGlobalDiagnosticsLocked() []*Diagnostic {
	if !c.nonFileDiagnosticsSorted {
		slices.SortStableFunc(c.nonFileDiagnostics, CompareDiagnostics)
		c.nonFileDiagnosticsSorted = true
	}
	return slices.Clone(c.nonFileDiagnostics)
}

func (c *DiagnosticsCollection) GetDiagnosticsForFile(fileName string) []*Diagnostic {
	c.mu.Lock()
	defer c.mu.Unlock()

	return c.getDiagnosticsForFileLocked(fileName)
}

func (c *DiagnosticsCollection) getDiagnosticsForFileLocked(fileName string) []*Diagnostic {
	if !c.fileDiagnosticsSorted.Has(fileName) {
		slices.SortStableFunc(c.fileDiagnostics[fileName], CompareDiagnostics)
		c.fileDiagnosticsSorted.Add(fileName)
	}
	return slices.Clone(c.fileDiagnostics[fileName])
}

func (c *DiagnosticsCollection) GetDiagnostics() []*Diagnostic {
	c.mu.Lock()
	defer c.mu.Unlock()

	diagnostics := make([]*Diagnostic, 0, c.count)
	diagnostics = append(diagnostics, c.nonFileDiagnostics...)
	for _, diags := range c.fileDiagnostics {
		diagnostics = append(diagnostics, diags...)
	}
	slices.SortFunc(diagnostics, CompareDiagnostics)
	return diagnostics
}

func getDiagnosticPath(d *Diagnostic) string {
	if d.File() != nil {
		return d.File().FileName()
	}
	return ""
}

func EqualDiagnostics(d1, d2 *Diagnostic) bool {
	if d1 == d2 {
		return true
	}
	return EqualDiagnosticsNoRelatedInfo(d1, d2) &&
		slices.EqualFunc(d1.RelatedInformation(), d2.RelatedInformation(), EqualDiagnostics)
}

func EqualDiagnosticsNoRelatedInfo(d1, d2 *Diagnostic) bool {
	if d1 == d2 {
		return true
	}
	return getDiagnosticPath(d1) == getDiagnosticPath(d2) &&
		d1.Loc() == d2.Loc() &&
		d1.Code() == d2.Code() &&
		slices.Equal(d1.MessageArgs(), d2.MessageArgs()) &&
		slices.EqualFunc(d1.MessageChain(), d2.MessageChain(), equalMessageChain)
}

func equalMessageChain(c1, c2 *Diagnostic) bool {
	if c1 == c2 {
		return true
	}
	return c1.Code() == c2.Code() &&
		slices.Equal(c1.MessageArgs(), c2.MessageArgs()) &&
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
		c := slices.Compare(c1[i].MessageArgs(), c2[i].MessageArgs())
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
	if d1 == d2 {
		return 0
	}
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
	c = slices.Compare(d1.MessageArgs(), d2.MessageArgs())
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
