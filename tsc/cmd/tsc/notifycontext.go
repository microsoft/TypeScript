//go:build !wasip1

package main

import (
	"context"
	"os"
	"os/signal"
)

func notifyContext(parent context.Context, signals ...os.Signal) (context.Context, context.CancelFunc) {
	return signal.NotifyContext(parent, signals...)
}
