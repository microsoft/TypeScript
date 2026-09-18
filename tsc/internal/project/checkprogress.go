package project

import "context"

type checkProgressKey struct{}

// checkProgressBatchFiles is how many files a check gets through between reports. A bar has a
// hundred positions however big the sweep, so reporting every file is work no one can see.
const checkProgressBatchFiles = 10

// CheckProgress is told how far a whole-program check has got: how many of the files it was given
// it has finished, and how many there were. It is called from each of the checkers doing the work,
// so it must be safe to call concurrently. It is called once per checkProgressBatchFiles files,
// and once more when the check finishes, so the last report is the final count.
type CheckProgress func(checked int, total int)

// WithCheckProgress attaches a progress callback to a context. A check of a large project runs for
// minutes inside a single call, so a caller that wants to say how far along it is cannot learn it
// from the call returning; the pool doing the work has to say.
func WithCheckProgress(ctx context.Context, report CheckProgress) context.Context {
	return context.WithValue(ctx, checkProgressKey{}, report)
}

func checkProgressFrom(ctx context.Context) CheckProgress {
	report, _ := ctx.Value(checkProgressKey{}).(CheckProgress)
	return report
}
