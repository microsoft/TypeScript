package logging

import (
	"fmt"
	"strings"
	"time"
)

type LogCollector interface {
	fmt.Stringer
	Logger
}

type logCollector struct {
	logger
	builder *strings.Builder
}

func (lc *logCollector) String() string {
	return lc.builder.String()
}

func NewTestLogger() LogCollector {
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
