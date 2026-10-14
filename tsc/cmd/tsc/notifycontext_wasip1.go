//go:build wasip1

package main

import (
	"context"
	"os"
)

func notifyContext(parent context.Context, _ ...os.Signal) (context.Context, context.CancelFunc) {
	return context.WithCancel(parent)
}
