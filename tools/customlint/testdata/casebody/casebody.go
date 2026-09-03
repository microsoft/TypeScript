package casebody

var X int

func Switch() {
	switch X {
	case 1:
	case 2:
	case 3:
	case 4:
		println(`oops`)
	}
}

func SwitchCommented() {
	switch X {
	case 1:
		// do nothing
	case 2:
	case 3:
	case 4:
		println(`oops`)
	}
}

func SwitchSingleCase() {
	switch X {
	case 1:
	}
}

func SwitchDefaultCase() {
	switch X {
	case 1:
	default:
	}
}

func SwitchBreak() {
	switch X {
	case 1:
		break
	case 2:
		// intentionally empty
		break
	case 3:
		println(`oops`)
		break
	case 4:
		for {
			break
		}
	}
}

func SelectBreak() {
	select {
	case <-ch:
		break
	default:
		println(`oops`)
		break
	}
}

var (
	ch  = make(chan int)
	ch2 = make(chan int)
	ch3 = make(chan int)
	ch4 = make(chan int)
)

func Select() {
	select {
	case <-ch:
	case <-ch2:
	case <-ch3:
	case <-ch4:
		println(`oops`)
	}
}

func SelectCommented() {
	select {
	case <-ch:
		// do nothing
	}
}

func SelectSingleCase() {
	select {
	case <-ch:
	}
}

func SelectDefaultCase() {
	select {
	case x := <-ch:
		println(x)
	default:
	}
}
