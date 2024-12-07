package ast

import (
	"github.com/microsoft/typescript-go/internal/compiler/diagnostics"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/stringutil"
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
	text := message.Message()
	if len(args) != 0 {
		text = stringutil.Format(text, args)
	}
	return &Diagnostic{
		file:     file,
		loc:      loc,
		code:     message.Code(),
		category: message.Category(),
		message:  text,
	}
}

func NewDiagnosticChain(chain *Diagnostic, message *diagnostics.Message, args ...any) *Diagnostic {
	if chain != nil {
		return NewDiagnostic(chain.file, chain.loc, message, args...).SetRelatedInfo(chain.relatedInformation)
	}
	return NewDiagnostic(nil, core.TextRange{}, message, args...)
}
