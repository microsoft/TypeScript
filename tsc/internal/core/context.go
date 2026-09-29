package core

import (
	"context"
)

type key int

const (
	requestIDKey key = iota
	checkerLifetimeKey
	interactiveRequestKey
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

// WithInteractiveRequest marks work a user is waiting on directly, as against work done ahead of
// being asked for it. Whole-workspace passes stand aside while any of it is outstanding.
func WithInteractiveRequest(ctx context.Context) context.Context {
	return context.WithValue(ctx, interactiveRequestKey, true)
}

func IsInteractiveRequest(ctx context.Context) bool {
	interactive, _ := ctx.Value(interactiveRequestKey).(bool)
	return interactive
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
