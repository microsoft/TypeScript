package locale

import (
	"context"

	"golang.org/x/text/language"
)

type contextKey int

type Locale language.Tag

var Default Locale

func (l Locale) String() string {
	if l == Default {
		return ""
	}
	return language.Tag(l).String()
}

func WithLocale(ctx context.Context, locale Locale) context.Context {
	return context.WithValue(ctx, contextKey(0), locale)
}

func FromContext(ctx context.Context) Locale {
	locale, _ := ctx.Value(contextKey(0)).(Locale)
	return locale
}

func Parse(localeStr string) (locale Locale, ok bool) {
	// Parse gracefully fails.
	tag, err := language.Parse(localeStr)
	return Locale(tag), err == nil
}
