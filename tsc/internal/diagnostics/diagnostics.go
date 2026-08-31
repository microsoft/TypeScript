// Package diagnostics contains generated localizable diagnostic messages.
package diagnostics

import (
	"fmt"
	"regexp"
	"strconv"
	"strings"

	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/locale"
	"golang.org/x/text/language"
)

//go:generate go run generate.go
//go:generate go tool golang.org/x/tools/cmd/stringer -type=Category -output=stringer_generated.go
//go:generate npx dprint fmt diagnostics_generated.go localizations_generated.go stringer_generated.go

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

type Key string

type Message struct {
	code                         int32
	category                     Category
	key                          Key
	text                         string
	reportsUnnecessary           bool
	elidedInCompatibilityPyramid bool
	reportsDeprecated            bool
}

func (m *Message) Code() int32                        { return m.code }
func (m *Message) Category() Category                 { return m.category }
func (m *Message) Key() Key                           { return m.key }
func (m *Message) ReportsUnnecessary() bool           { return m.reportsUnnecessary }
func (m *Message) ElidedInCompatibilityPyramid() bool { return m.elidedInCompatibilityPyramid }
func (m *Message) ReportsDeprecated() bool            { return m.reportsDeprecated }

// For debugging only.
func (m *Message) String() string {
	return m.text
}

func (m *Message) Localize(locale locale.Locale, args ...any) string {
	return Localize(locale, m, "", StringifyArgs(args)...)
}

func Localize(locale locale.Locale, message *Message, key Key, args ...string) string {
	if message == nil {
		message = keyToMessage(key)
	}
	if message == nil {
		panic("Unknown diagnostic message: " + string(key))
	}

	text := message.text
	if localized, ok := getLocalizedMessages(language.Tag(locale))[message.key]; ok {
		text = localized
	}

	return Format(text, args)
}

func getLocalizedMessages(loc language.Tag) map[Key]string {
	if loc == language.Und {
		return nil
	}

	_, index, confidence := matcher.Match(loc)
	if confidence >= language.Low && index >= 0 && index < len(localeFuncs) {
		if fn := localeFuncs[index]; fn != nil {
			return fn()
		}
	}
	return nil
}

var placeholderRegexp = regexp.MustCompile(`{(\d+)}`)

func Format(text string, args []string) string {
	if len(args) == 0 {
		return text
	}

	// Replace invalid UTF-8 with Unicode replacement character
	args = core.SameMap(args, func(arg string) string {
		return strings.ToValidUTF8(arg, "\uFFFD")
	})

	return placeholderRegexp.ReplaceAllStringFunc(text, func(match string) string {
		index, err := strconv.ParseInt(match[1:len(match)-1], 10, 0)
		if err != nil || int(index) >= len(args) {
			panic("Invalid formatting placeholder")
		}
		return args[int(index)]
	})
}

func StringifyArgs(args []any) []string {
	if len(args) == 0 {
		return nil
	}

	result := make([]string, len(args))
	for i, arg := range args {
		if s, ok := arg.(string); ok {
			result[i] = s
		} else {
			result[i] = fmt.Sprintf("%v", arg)
		}
	}
	return result
}

func NewAdHocMessage(message string) *Message {
	return &Message{
		code:     -1,
		category: CategoryError,
		key:      "-1",
		text:     message,
	}
}
