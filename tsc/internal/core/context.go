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

// WithoutRequestID returns a context for one of several workers that a request
// runs in parallel, such as one per file. Checker pools use the request ID to hand a
// request back a checker it already holds (nested acquisition), which is only
// sound while all of a request's acquisitions happen on a single goroutine.
// Workers that run concurrently with each other must therefore acquire their
// checkers as independent callers rather than as the request itself.
func WithoutRequestID(ctx context.Context) context.Context {
	if GetRequestID(ctx) == "" {
		return ctx
	}
	return context.WithValue(ctx, requestIDKey, "")
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
