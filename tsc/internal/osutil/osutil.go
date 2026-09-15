package osutil

import (
	"context"
	"os"
	"os/signal"
	"syscall"
)

// Args returns the command-line arguments with platform-specific launcher details removed.
func Args() []string {
	return args()
}

// Executable returns the path of the current executable, accounting for platform-specific launchers.
func Executable() (string, error) {
	return executable()
}

// NotifyTerminationSignals registers for process termination signals.
func NotifyTerminationSignals() (<-chan os.Signal, func()) {
	ch := make(chan os.Signal, 1)
	signal.Notify(ch, syscall.SIGINT, syscall.SIGTERM)
	return ch, func() {
		signal.Stop(ch)
	}
}

// NotifyTerminationContext returns a context that terminates the process when a
// process termination signal arrives.
func NotifyTerminationContext(parent context.Context) (context.Context, context.CancelFunc) {
	ctx, cancel := context.WithCancel(parent)
	sigCh, stopSignals := NotifyTerminationSignals()
	go func() {
		select {
		case sig := <-sigCh:
			ReraiseSignal(sig)
			cancel()
		case <-ctx.Done():
			return
		}
	}()
	return ctx, func() {
		stopSignals()
		cancel()
	}
}
