package core

import (
	"context"

	"golang.org/x/text/language"
)

type key int

const (
	requestIDKey key = iota
	localeKey
)

func WithRequestID(ctx context.Context, id string) context.Context {
	return context.WithValue(ctx, requestIDKey, id)
}

func GetRequestID(ctx context.Context) string {
	if id, ok := ctx.Value(requestIDKey).(string); ok {
		return id
	}
	return ""
}

func WithLocale(ctx context.Context, locale language.Tag) context.Context {
	return context.WithValue(ctx, localeKey, locale)
}

func GetLocale(ctx context.Context) language.Tag {
	if locale, ok := ctx.Value(localeKey).(language.Tag); ok {
		return locale
	}
	return language.Und
}
