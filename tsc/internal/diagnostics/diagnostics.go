// Package diagnostics contains generated localizable diagnostic messages.
package diagnostics

import "github.com/microsoft/typescript-go/internal/stringutil"

//go:generate go run generate.go -output ./diagnostics_generated.go
//go:generate go tool golang.org/x/tools/cmd/stringer -type=Category -output=stringer_generated.go

type Category int32

const (
	CategoryWarning Category = iota
	CategoryError
	CategorySuggestion
	CategoryMessage
)

func (category Category) Name() string {
	switch category {
	case CategoryWarning:
		return "warning"
	case CategoryError:
		return "error"
	case CategorySuggestion:
		return "suggestion"
	case CategoryMessage:
		return "message"
	}
	panic("Unhandled diagnostic category")
}

type Message struct {
	code                         int32
	category                     Category
	key                          string
	text                         string
	reportsUnnecessary           bool
	elidedInCompatibilityPyramid bool
	reportsDeprecated            bool
}

func (m *Message) Code() int32                        { return m.code }
func (m *Message) Category() Category                 { return m.category }
func (m *Message) Key() string                        { return m.key }
func (m *Message) Message() string                    { return m.text }
func (m *Message) ReportsUnnecessary() bool           { return m.reportsUnnecessary }
func (m *Message) ElidedInCompatibilityPyramid() bool { return m.elidedInCompatibilityPyramid }
func (m *Message) ReportsDeprecated() bool            { return m.reportsDeprecated }

func (m *Message) Format(args ...any) string {
	text := m.Message()
	if len(args) != 0 {
		text = stringutil.Format(text, args)
	}
	return text
}
