package main

import (
	"golang.org/x/sys/windows"
)

func enableVirtualTerminalProcessing() {
	hStdout, err := windows.GetStdHandle(windows.STD_OUTPUT_HANDLE)
	if err == nil && hStdout != windows.InvalidHandle {
		var mode uint32
		err = windows.GetConsoleMode(windows.Handle(hStdout), &mode)
		if err == nil {
			windows.SetConsoleMode(windows.Handle(hStdout), mode|windows.ENABLE_VIRTUAL_TERMINAL_PROCESSING)
		}
	}
}
