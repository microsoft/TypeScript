//go:build darwin && arm64

package fswatch

import (
	"bytes"
	"fmt"
	"os/exec"
	"path/filepath"
	"regexp"
	"sort"
	"strings"
	"testing"
)

// TestCallbackASMTouchesOnlySafeRegisters verifies that fsEventsCallbackASM
// (the C callback entered from CFRunLoop) only touches registers that are
// safe to clobber under AAPCS, i.e. registers the C caller doesn't expect
// to find unchanged after the call.
//
// We are entered from C (FSEvents -> CFRunLoopRun -> ... -> our callback)
// and never transition into Go ABI; we must therefore obey the standard
// arm64 AAPCS contract:
//
//	Callee-saved (must be preserved across our call):
//	  R19-R28 (general)        F8-F15 (float)        R29 (FP)    R30 (LR)
//	Caller-saved (free to clobber):
//	  R0-R8 (args/return)      F0-F7  (args/return)
//	  R9-R15 (scratch)         F16-F31 (scratch)
//	  R16, R17 (IP0/IP1: linker trampoline scratch; caller-saved)
//	Special / restricted:
//	  R18: platform register; reserved by darwin (do not touch)
//	  RSP: stack pointer (we manage)
//	  ZR:  zero register (read-only constant)
//	  PC:  program counter (read-only, appears in PC-relative addresses)
//
// We *do* touch R29 and R30, but only because we save the caller's value
// to the stack on entry and restore it on exit (R29 to set up our frame
// chain pointer; R30 because each of our BLs clobbers LR). Treating them
// as allowed in this test is correct so long as the prologue/epilogue
// continue to save/restore them; a bare reference without that bookkeeping
// would still be a bug, but a much more obvious one to spot in review.
//
// The motivating failure was a silent R27 (REGTMP) clobber from
// `MOVD ·sym(SB), Rn` pseudo-instruction expansion (cmd/internal/obj/
// arm64/a.out.go: REGTMP = REG_R27); FSEvents holds a CFAllocator pointer
// in R27 across our callback and uses it for CFRelease afterwards, so the
// clobber surfaces as a SIGSEGV inside objc_release deep in CFRunLoopRun.
// The crash is layout-sensitive and not reliably caught by the
// race-detector test suite alone, hence this static check.
//
// A whitelist (rather than a blacklist of "known dangerous" registers)
// guards against any future Go toolchain change that introduces a new
// kind of pseudo-instruction expansion using a register we hadn't
// previously thought to forbid: any unfamiliar register name in the
// disassembly will fail the test.
//
// If the asm is ever rewritten to use the save-and-restore strategy
// (mirroring runtime/cgo/abi_arm64.h's SAVE_R19_TO_R28 / RESTORE_R19_TO_R28),
// the safe set here will need to be extended to include R19-R28 (and the
// test should be supplemented with a check that the prologue/epilogue
// actually save and restore them).
func TestCallbackASMTouchesOnlySafeRegisters(t *testing.T) {
	t.Parallel()
	// `go test` (without -c) strips the test binary, so we can't disassemble
	// it for symbol-level inspection. Build a fresh, unstripped copy.
	bin := filepath.Join(t.TempDir(), "callback-disasm.test")
	if out, err := exec.Command("go", "test", "-c", "-o", bin, ".").CombinedOutput(); err != nil {
		t.Fatalf("go test -c failed: %v\n%s", err, out)
	}

	out, err := exec.Command("go", "tool", "objdump", "-s", "fsEventsCallbackASM", bin).CombinedOutput()
	if err != nil {
		t.Fatalf("go tool objdump failed: %v\n%s", err, out)
	}
	if len(out) == 0 {
		t.Fatalf("go tool objdump produced no output; symbol fsEventsCallbackASM not found in %s", bin)
	}

	// Set of registers safe to touch when called from C.
	safe := map[string]bool{
		"RSP": true, "ZR": true, "ZRW": true, "PC": true,
		// Frame/link registers: managed by our prologue/epilogue.
		"R29": true, "R30": true,
	}
	// Caller-saved general-purpose: R0-R17.
	for i := range 18 {
		safe[fmt.Sprintf("R%d", i)] = true
	}
	// Caller-saved float: F0-F7 and F16-F31.
	for i := range 8 {
		safe[fmt.Sprintf("F%d", i)] = true
	}
	for i := 16; i <= 31; i++ {
		safe[fmt.Sprintf("F%d", i)] = true
	}

	// Match register tokens of the form Rnn / Fnn / RSP / ZR / PC.
	regToken := regexp.MustCompile(`\b([RF]\d+|RSP|RZR|ZR|PC)\b`)

	// Each disassembly line looks like:
	//   fsevents_darwin_ffi_arm64.s:106\t0x10012b1e0\t\td10083ff\t\tSUB $32, RSP, RSP\t
	// We only want to inspect the instruction text (the last tab-delimited
	// non-empty field). The header line ("TEXT _fsEventsCallbackASM(SB) ...")
	// is skipped.
	type violation struct{ reg, line string }
	var violations []violation
	seen := map[string]bool{}

	for raw := range strings.SplitSeq(string(out), "\n") {
		line := strings.TrimRight(raw, " \t")
		if line == "" || strings.HasPrefix(line, "TEXT ") {
			continue
		}
		fields := strings.Split(line, "\t")
		// Find the rightmost non-empty field: the instruction text.
		var inst string
		for i := len(fields) - 1; i >= 0; i-- {
			if f := strings.TrimSpace(fields[i]); f != "" {
				inst = f
				break
			}
		}
		if inst == "" {
			continue
		}
		for _, m := range regToken.FindAllString(inst, -1) {
			if safe[m] {
				continue
			}
			if seen[m] {
				continue
			}
			seen[m] = true
			violations = append(violations, violation{reg: m, line: line})
		}
	}

	if len(violations) > 0 {
		sort.Slice(violations, func(i, j int) bool { return violations[i].reg < violations[j].reg })
		var b bytes.Buffer
		fmt.Fprintf(&b, "fsEventsCallbackASM touches register(s) the C caller (CFRunLoop/FSEvents) "+
			"expects preserved or that are platform-reserved on darwin/arm64. The C ABI "+
			"requires R19-R28, F8-F15 to be preserved across the call, and R18 to be left "+
			"untouched. See the REGTMP hazard note in fsevents_darwin_ffi_arm64.s.\n")
		for _, v := range violations {
			fmt.Fprintf(&b, "  %s first appears in: %s\n", v.reg, v.line)
		}
		t.Fatal(b.String())
	}
}
