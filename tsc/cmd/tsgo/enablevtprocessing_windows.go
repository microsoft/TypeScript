package main

import (
	"golang.org/x/sys/windows"
)

func enableVirtualTerminalProcessing() {
	h, err := windows.GetStdHandle(windows.STD_OUTPUT_HANDLE)
	if err != nil || h == windows.InvalidHandle {
		return
	}
	fileType, err := windows.GetFileType(h)
	if err != nil || fileType == windows.FILE_TYPE_CHAR {
		var mode uint32
		if err := windows.GetConsoleMode(h, &mode); err != nil {
			return
		}
		if mode&windows.ENABLE_VIRTUAL_TERMINAL_PROCESSING == 0 {
			windows.SetConsoleMode(h, mode|windows.ENABLE_VIRTUAL_TERMINAL_PROCESSING)
		}
	}
}
