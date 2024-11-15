package ast

import (
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
	messageChain       []*MessageChain
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
func (d *Diagnostic) MessageChain() []*MessageChain     { return d.messageChain }
func (d *Diagnostic) RelatedInformation() []*Diagnostic { return d.relatedInformation }

func (d *Diagnostic) SetFile(file *SourceFile)                  { d.file = file }
func (d *Diagnostic) SetCategory(category diagnostics.Category) { d.category = category }

func (d *Diagnostic) SetMessageChain(messageChain []*MessageChain) *Diagnostic {
	d.messageChain = messageChain
	return d
}

func (d *Diagnostic) AddMessageChain(messageChain *MessageChain) *Diagnostic {
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
		text = core.FormatStringFromArgs(text, args)
	}
	return &Diagnostic{
		file:     file,
		loc:      loc,
		code:     message.Code(),
		category: message.Category(),
		message:  text,
	}
}

func NewDiagnosticFromMessageChain(file *SourceFile, loc core.TextRange, messageChain *MessageChain) *Diagnostic {
	return &Diagnostic{
		file:         file,
		loc:          loc,
		code:         messageChain.code,
		category:     messageChain.category,
		message:      messageChain.message,
		messageChain: messageChain.messageChain,
	}
}

// MessageChain

type MessageChain struct {
	code         int32
	category     diagnostics.Category
	message      string
	messageChain []*MessageChain
}

func (m *MessageChain) Code() int32                    { return m.code }
func (m *MessageChain) Category() diagnostics.Category { return m.category }
func (m *MessageChain) Message() string                { return m.message }
func (m *MessageChain) MessageChain() []*MessageChain  { return m.messageChain }

func (m *MessageChain) SetMessageChain(chain []*MessageChain) { m.messageChain = chain }

func (m *MessageChain) AddMessageChain(messageChain *MessageChain) *MessageChain {
	if messageChain != nil {
		m.messageChain = append(m.messageChain, messageChain)
	}
	return m
}

func NewMessageChain(message *diagnostics.Message, args ...any) *MessageChain {
	text := message.Message()
	if len(args) != 0 {
		text = core.FormatStringFromArgs(text, args)
	}
	return &MessageChain{
		code:     message.Code(),
		category: message.Category(),
		message:  text,
	}
}
