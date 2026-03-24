package debug

import (
	"fmt"
)

func Fail(reason string) {
	if len(reason) == 0 {
		reason = "Debug failure."
	} else {
		reason = "Debug failure. " + reason
	}
	// runtime.Breakpoint()
	panic(reason)
}

func FailBadSyntaxKind(node interface{ KindString() string }, message ...any) {
	var msg string
	if len(message) == 0 {
		msg = "Unexpected node."
	} else {
		msg = fmt.Sprint(message...)
	}
	Fail(fmt.Sprintf("%s\nNode %s was unexpected.", msg, node.KindString()))
}

func AssertNever(member any, message ...any) {
	var msg string
	if len(message) == 0 {
		msg = "Illegal value:"
	} else {
		msg = fmt.Sprint(message...)
	}
	var detail string
	if m, ok := member.(interface{ KindString() string }); ok {
		detail = m.KindString()
	} else if m, ok := member.(fmt.Stringer); ok {
		detail = m.String()
	} else {
		detail = fmt.Sprintf("%v", member)
	}
	Fail(fmt.Sprintf("%s %s", msg, detail))
}

func Assert(value bool, message ...any) {
	if value {
		return
	}
	assertSlow(message...)
}

func assertSlow(message ...any) {
	// See https://dave.cheney.net/2020/05/02/mid-stack-inlining-in-go
	var msg string
	if len(message) > 0 {
		msg = "False expression: " + fmt.Sprint(message...)
	} else {
		msg = "False expression."
	}
	Fail(msg)
}
