// Package diagnostics contains generated localizable diagnostic messages.
package diagnostics

//go:generate go run generate.go -output ./diagnostics_generated.go
//go:generate go run golang.org/x/tools/cmd/stringer -type=Category -output=stringer_generated.go

type Category int32

const (
	CategoryWarning Category = iota
	CategoryError
	CategorySuggestion
	CategoryMessage
)

type Message struct {
	code                         int32
	category                     Category
	key                          string
	text                         string
	reportsUnnecessary           bool
	elidedInCompatabilityPyramid bool
	reportsDeprecated            bool
}

func (m *Message) Code() int32                        { return m.code }
func (m *Message) Category() Category                 { return m.category }
func (m *Message) Key() string                        { return m.key }
func (m *Message) Message() string                    { return m.text }
func (m *Message) ReportsUnnecessary() bool           { return m.reportsUnnecessary }
func (m *Message) ElidedInCompatabilityPyramid() bool { return m.elidedInCompatabilityPyramid }
func (m *Message) ReportsDeprecated() bool            { return m.reportsDeprecated }
