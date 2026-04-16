package core

import (
	"context"
)

type key int

const (
	requestIDKey key = iota
	checkerLifetimeKey
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

type CheckerLifetime int

const (
	CheckerLifetimeTemporary CheckerLifetime = iota
	CheckerLifetimeDiagnostics
	CheckerLifetimeAPI
)

func WithCheckerLifetime(ctx context.Context, lifetime CheckerLifetime) context.Context {
	return context.WithValue(ctx, checkerLifetimeKey, lifetime)
}

func GetCheckerLifetime(ctx context.Context) CheckerLifetime {
	if lifetime, ok := ctx.Value(checkerLifetimeKey).(CheckerLifetime); ok {
		return lifetime
	}
	return CheckerLifetimeTemporary
}
