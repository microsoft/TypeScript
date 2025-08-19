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

func FailBadSyntaxKind(node interface{ KindString() string }, message ...string) {
	var msg string
	if len(message) == 0 {
		msg = "Unexpected node."
	} else {
		msg = message[0]
	}
	Fail(fmt.Sprintf("%s\r\nNode %s was unexpected.", msg, node.KindString()))
}

func AssertNever(member any, message ...string) {
	var msg string
	if len(message) == 0 {
		msg = "Illegal value:"
	} else {
		msg = message[0]
	}
	var detail string
	if member, ok := member.(interface{ KindString() string }); ok {
		detail = member.KindString()
	} else if member, ok := member.(fmt.Stringer); ok {
		detail = member.String()
	} else {
		detail = fmt.Sprintf("%v", member)
	}
	Fail(fmt.Sprintf("%s %s", msg, detail))
}
