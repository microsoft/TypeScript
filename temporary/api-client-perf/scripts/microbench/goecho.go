package main

import (
	"os"
	"syscall"
)

func main() {
	b := make([]byte, 65536)
	spin := len(os.Args) > 1
	if spin {
		syscall.SetNonblock(0, true)
	}
	for {
		var n int
		var err error
		if spin {
			for {
				n, err = syscall.Read(0, b)
				if err == syscall.EAGAIN {
					continue
				}
				break
			}
		} else {
			n, err = os.Stdin.Read(b)
		}
		if err != nil || n == 0 {
			return
		}
		syscall.Write(1, b[:n])
	}
}
