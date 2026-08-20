package ast

import (
	"slices"
	"strings"
	"sync"

	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/diagnostics"
	"github.com/microsoft/TypeScript/tsc/internal/locale"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
)

// RepopulateDiagnosticKind indicates the kind of repopulation for a diagnostic chain entry.
type RepopulateDiagnosticKind int

const (
	RepopulateModeMismatch   RepopulateDiagnosticKind = 1
	RepopulateModuleNotFound RepopulateDiagnosticKind = 2
)

// RepopulateDiagnosticInfo stores information needed to recompute a diagnostic chain entry
// during incremental builds when the program state may have changed.
type RepopulateDiagnosticInfo struct {
	Kind            RepopulateDiagnosticKind
	ModuleReference string
	Mode            core.ResolutionMode
	PackageName     string
}

// Diagnostic

type Diagnostic struct {
	file     *SourceFile
	loc      core.TextRange
	code     int32
	category diagnostics.Category
	// source, when non-empty, is a custom prefix (e.g. a content mapper's name) shown instead of "TS"
	// before the code. It marks the diagnostic as coming from an external source whose ranges point
	// into the file's original, untransformed text.
	source string
	// Original message; may be nil.
	message *diagnostics.Message
	// messageText is an already-localized message used when message is nil, e.g. a diagnostic
	// deserialized from an external process that owns its own localization.
	messageText        string
	messageKey         diagnostics.Key
	messageArgs        []string
	messageChain       []*Diagnostic
	relatedInformation []*Diagnostic
	reportsUnnecessary bool
	reportsDeprecated  bool
	skippedOnNoEmit    bool
	repopulateInfo     *RepopulateDiagnosticInfo
}

func (d *Diagnostic) File() *SourceFile                         { return d.file }
func (d *Diagnostic) Pos() int                                  { return d.loc.Pos() }
func (d *Diagnostic) End() int                                  { return d.loc.End() }
func (d *Diagnostic) Len() int                                  { return d.loc.Len() }
func (d *Diagnostic) Loc() core.TextRange                       { return d.loc }
func (d *Diagnostic) Code() int32                               { return d.code }
func (d *Diagnostic) Category() diagnostics.Category            { return d.category }
func (d *Diagnostic) Source() string                            { return d.source }
func (d *Diagnostic) MessageText() string                       { return d.messageText }
func (d *Diagnostic) MessageKey() diagnostics.Key               { return d.messageKey }
func (d *Diagnostic) MessageArgs() []string                     { return d.messageArgs }
func (d *Diagnostic) MessageChain() []*Diagnostic               { return d.messageChain }
func (d *Diagnostic) RelatedInformation() []*Diagnostic         { return d.relatedInformation }
func (d *Diagnostic) ReportsUnnecessary() bool                  { return d.reportsUnnecessary }
func (d *Diagnostic) ReportsDeprecated() bool                   { return d.reportsDeprecated }
func (d *Diagnostic) SkippedOnNoEmit() bool                     { return d.skippedOnNoEmit }
func (d *Diagnostic) RepopulateInfo() *RepopulateDiagnosticInfo { return d.repopulateInfo }

func (d *Diagnostic) SetFile(file *SourceFile)                         { d.file = file }
func (d *Diagnostic) SetLocation(loc core.TextRange)                   { d.loc = loc }
func (d *Diagnostic) SetCategory(category diagnostics.Category)        { d.category = category }
func (d *Diagnostic) SetSkippedOnNoEmit()                              { d.skippedOnNoEmit = true }
func (d *Diagnostic) SetRepopulateInfo(info *RepopulateDiagnosticInfo) { d.repopulateInfo = info }

func (d *Diagnostic) SetExternalData(source string, messageText string) *Diagnostic {
	d.source = source
	d.messageText = messageText
	return d
}

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
	if d.message == nil && d.messageText != "" {
		return d.messageText
	}
	return diagnostics.Localize(locale, d.message, d.messageKey, d.displayMessageArgs()...)
}

// For debugging only.
func (d *Diagnostic) String() string {
	if d.message == nil && d.messageText != "" {
		return d.messageText
	}
	return diagnostics.Localize(locale.Default, d.message, d.messageKey, d.displayMessageArgs()...)
}

// displayMessageArgs substitutes the original text for a complete alias span when a diagnostic argument
// exactly matches the virtual alias. Stored arguments remain unchanged for code fixes and serialization.
func (d *Diagnostic) displayMessageArgs() []string {
	if d.file == nil || d.source != "" {
		return d.messageArgs
	}
	segment, ok := d.file.SpanMap().AliasForVirtualSpan(d.loc)
	if !ok {
		return d.messageArgs
	}
	virtualText := d.file.Text()
	originalText := d.file.OriginalText()
	if segment.VirtualStart < 0 || segment.VirtualEnd > core.TextPos(len(virtualText)) ||
		segment.OriginalStart < 0 || segment.OriginalEnd > core.TextPos(len(originalText)) {
		return d.messageArgs
	}
	virtualName := virtualText[segment.VirtualStart:segment.VirtualEnd]
	originalName := originalText[segment.OriginalStart:segment.OriginalEnd]
	var result []string
	for i, arg := range d.messageArgs {
		if arg != virtualName {
			continue
		}
		if result == nil {
			result = slices.Clone(d.messageArgs)
		}
		result[i] = originalName
	}
	if result != nil {
		return result
	}
	return d.messageArgs
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

// NewExternalDiagnostic creates a diagnostic reported by an external source such as a content mapper.
// The message text is already localized (the external source owns localization) and the code is shown
// with the given source prefix (e.g. "vue") instead of "TS". The location refers to the file's original,
// untransformed content.
func NewExternalDiagnostic(file *SourceFile, loc core.TextRange, source string, category diagnostics.Category, code int32, messageText string) *Diagnostic {
	return &Diagnostic{
		file:        file,
		loc:         loc,
		code:        code,
		category:    category,
		source:      source,
		messageText: messageText,
	}
}

type DiagnosticsCollection struct {
	mu                       sync.Mutex
	count                    int
	fileDiagnostics          map[tspath.Path][]*Diagnostic
	fileDiagnosticsSorted    collections.Set[tspath.Path]
	nonFileDiagnostics       []*Diagnostic
	nonFileDiagnosticsSorted bool
	diagnosticIndex          map[diagnosticLocationKey]*Diagnostic
	diagnosticCollisions     map[diagnosticLocationKey][]*Diagnostic
}

func (c *DiagnosticsCollection) Add(diagnostic *Diagnostic) *Diagnostic {
	c.mu.Lock()
	defer c.mu.Unlock()

	key := getDiagnosticLocationKey(diagnostic)
	if existing := c.diagnosticIndex[key]; existing != nil {
		if EqualDiagnostics(existing, diagnostic) {
			return existing
		}
		for _, collision := range c.diagnosticCollisions[key] {
			if EqualDiagnostics(collision, diagnostic) {
				return collision
			}
		}
	}
	if c.diagnosticIndex == nil {
		c.diagnosticIndex = make(map[diagnosticLocationKey]*Diagnostic)
	}
	if c.diagnosticIndex[key] == nil {
		c.diagnosticIndex[key] = diagnostic
	} else {
		if c.diagnosticCollisions == nil {
			c.diagnosticCollisions = make(map[diagnosticLocationKey][]*Diagnostic)
		}
		c.diagnosticCollisions[key] = append(c.diagnosticCollisions[key], diagnostic)
	}

	c.count++

	if diagnostic.File() != nil {
		path := diagnostic.File().Path()
		if c.fileDiagnostics == nil {
			c.fileDiagnostics = make(map[tspath.Path][]*Diagnostic)
		}
		c.fileDiagnostics[path] = append(c.fileDiagnostics[path], diagnostic)
		c.fileDiagnosticsSorted.Delete(path)
	} else {
		c.nonFileDiagnostics = append(c.nonFileDiagnostics, diagnostic)
		c.nonFileDiagnosticsSorted = false
	}
	return diagnostic
}

type diagnosticLocationKey struct {
	path tspath.Path
	loc  core.TextRange
	code int32
}

func getDiagnosticLocationKey(diagnostic *Diagnostic) diagnosticLocationKey {
	var path tspath.Path
	if diagnostic.File() != nil {
		path = diagnostic.File().Path()
	}
	return diagnosticLocationKey{
		path: path,
		loc:  diagnostic.Loc(),
		code: diagnostic.Code(),
	}
}

func (c *DiagnosticsCollection) Lookup(diagnostic *Diagnostic) *Diagnostic {
	c.mu.Lock()
	defer c.mu.Unlock()

	var diagnostics []*Diagnostic
	if diagnostic.File() != nil {
		diagnostics = c.getDiagnosticsForFileLocked(diagnostic.File())
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

func (c *DiagnosticsCollection) GetDiagnosticsForFile(file *SourceFile) []*Diagnostic {
	c.mu.Lock()
	defer c.mu.Unlock()

	return c.getDiagnosticsForFileLocked(file)
}

func (c *DiagnosticsCollection) getDiagnosticsForFileLocked(file *SourceFile) []*Diagnostic {
	path := file.Path()
	if !c.fileDiagnosticsSorted.Has(path) {
		slices.SortStableFunc(c.fileDiagnostics[path], CompareDiagnostics)
		c.fileDiagnosticsSorted.Add(path)
	}
	return slices.Clone(c.fileDiagnostics[path])
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
		d1.Category() == d2.Category() &&
		d1.Source() == d2.Source() &&
		getDiagnosticMessageIdentity(d1) == getDiagnosticMessageIdentity(d2) &&
		slices.Equal(d1.MessageArgs(), d2.MessageArgs()) &&
		slices.EqualFunc(d1.MessageChain(), d2.MessageChain(), equalMessageChain)
}

func getDiagnosticMessageIdentity(diagnostic *Diagnostic) string {
	if diagnostic.MessageText() != "" {
		return diagnostic.MessageText()
	}
	if diagnostic.message != nil && diagnostic.Code() == -1 {
		return diagnostic.message.String()
	}
	return string(diagnostic.MessageKey())
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
	c = int(d1.Category()) - int(d2.Category())
	if c != 0 {
		return c
	}
	c = strings.Compare(d1.Source(), d2.Source())
	if c != 0 {
		return c
	}
	c = strings.Compare(getDiagnosticMessageIdentity(d1), getDiagnosticMessageIdentity(d2))
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
