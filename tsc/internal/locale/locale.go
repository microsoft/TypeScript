package locale

import (
	"context"

	"golang.org/x/text/language"
)

type contextKey int

type (
	Locale     language.Tag
	DefContext = context.Context // ref: nonnil
)

var Default Locale

func (l Locale) String() string {
	if l == Default {
		return ""
	}
	return language.Tag(l).String()
}

func WithLocale(ctx DefContext, locale Locale) context.Context {
	// TODO: context.WithValue should be typed as returning a non-nil context.Context.
	return context.WithValue(ctx, contextKey(0), locale)
}

func FromContext(ctx DefContext) Locale {
	locale, _ := ctx.Value(contextKey(0)).(Locale)
	return locale
}

func HasLocale(ctx DefContext) bool {
	_, ok := ctx.Value(contextKey(0)).(Locale)
	return ok
}

func Parse(localeStr string) (locale Locale, ok bool) {
	// Parse gracefully fails.
	tag, err := language.Parse(localeStr)
	return Locale(tag), err == nil
}
