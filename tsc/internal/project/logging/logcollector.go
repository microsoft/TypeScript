package logging

import (
	"fmt"
	"strings"
	"time"

	"github.com/microsoft/TypeScript/tsc/internal/typeutil"
)

type LogCollector interface {
	fmt.Stringer
	Logger
}

type DefLogCollector = LogCollector /* ref: nonnil */

type logCollector struct {
	logger
	builder typeutil.DefPtr[strings.Builder]
}

type defLogCollectorImpl = *logCollector /* ref: nonnil */

func (lc defLogCollectorImpl) String() string {
	return lc.builder.String()
}

func NewTestLogger() DefLogCollector {
	var builder strings.Builder
	return &logCollector{
		logger: logger{
			writer: &builder,
			prefix: func() string {
				return formatTime(time.Unix(1349085672, 0))
			},
		},
		builder: &builder,
	}
}
