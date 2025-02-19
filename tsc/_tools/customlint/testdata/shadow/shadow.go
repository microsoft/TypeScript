package shadow

func F1() int {
	value := 1
	if value == 1 {
		value := 2 // Bad
		println(value)
	}
	return value
}

func F1a() int {
	value := 1
	if value == 1 {
		value := 2 // OK
		println(value)
	}
	return 1234
}

func F2() int {
	value := 1
	if value == 1 {
		value := 2 // OK
		println(value)
		return value
	}
	return value
}

func F2a() int {
	value := 1
	if value == 1 {
		value := 2 // OK
		println(value)
		return value
	}
	return 1234
}

func F3(value int) int {
	if value == 1 {
		value := 2 // Bad
		println(value)
	}
	return value
}

func F4(value int) int {
	if value == 1 {
		value := 2 // OK
		println(value)
		return value
	}
	return value
}

type isType int

func F5() isType {
	var isType isType // OK
	return isType
}

type isAlias int

func F6() isAlias {
	var isAlias isAlias // OK
	return isAlias
}

func F7() int {
	value := 1

	fn := func() {
		value := 2 // Bad
		println(value)
	}

	fn()
	fn()

	return value
}

func F8() int {
	value := 1

	fn := func() int {
		value := 2 // Dubious
		println(value)
		return value
	}

	fn()
	fn()

	return value
}

func callIt(fn func()) {
	fn()
}

func F9() int {
	value := 1

	callIt(func() {
		value := 2 // Bad
		println(value)
	})

	return value
}

func callIt2(fn func() int) int {
	return fn()
}

func F10() int {
	value := 1

	callIt2(func() int {
		value := 2 // Bad
		println(value)
		return value
	})

	return value
}

func F11() int {
	value := 1

	callIt(func() {
		value := 2 // Bad

		callIt(func() {
			value := 3 // Bad
			println(value)
		})

		println(value)
	})

	return value
}

func F12() int {
	value := 1
	if value == 1 {
		value := value // Bad
		println(value)
	}
	return value
}

func F12a(value int) int {
	if value == 1 {
		value := value // Bad
		println(value)
	}
	return value
}

func F12b() int {
	value := 1
	if value == 1 {
		value, other := value, 1234 // Bad
		println(value, other)
	}
	return value
}

func F13() int {
	value := 1
	if value == 1 {
		value := value // OK
		println(value)
		return value
	}
	return value
}

func F13a(value int) int {
	if value == 1 {
		value := value // OK
		println(value)
		return value
	}
	return value
}

func F13b() int {
	value := 1
	if value == 1 {
		value, other := value, 1234 // OK
		println(value, other)
		return value
	}
	return value
}

var globalValue int

func F14a() int {
	if globalValue == 1 {
		globalValue := 2 // Bad
		println(globalValue)
	}
	return globalValue
}

func F14b() int {
	if globalValue == 1 {
		globalValue := 2 // Dubious
		println(globalValue)
		return globalValue
	}
	return globalValue
}

func F15(m1 map[string]int, m2 map[string]int) int {
	if v1, ok := m1["a"]; ok {
		if v2, ok := m2["a"]; ok { // OK
			return v1 + v2
		}
	}
	return 0
}

func F16() {
	foo := 1
	bar := 2
	println(foo, bar)

	callIt(func() {
		foo := 3 // Bad
		bar := 4 // Bad
		println(foo, bar)
	})
}

func F16b() {
	foo := 1
	bar := 2
	println(foo, bar)

	callIt(func() {
		foo := 3 // Bad
		bar := 4 // Bad
		println(foo, bar)
	})

	println(foo, bar)
}

type someError struct{}

func (*someError) Error() string {
	return "some error"
}

var errSome = &someError{}

func F17(read func() (v any, err error), sendError func(error) error) error {
	for {
		v, err := read()
		if err != nil {
			if err == errSome {
				// OK: use after asignnent above; switching to = below would not be observable.
				if err := sendError(err); err != nil {
					return err
				}
				continue
			}
			return err
		}
		println(v)
	}
}

func F17b(read func() (v any, err error), sendError func(error) error) error {
	for {
		v, err := read()
		if err != nil {
			return err
		}
		if v == "bad value" {
			// OK: use after asignnent above; switching to = below would not be observable.
			if err := sendError(err); err != nil {
				return err
			}
		}
	}
}

func F18(index int) int {
	return callIt2(func() int {
		if index == 0 {
			return 1234
		}

		if index == 1 {
			// Dubuious; did this mean to keep the value for another execution?
			index := 2
			println(index)
			return index
		}

		println(index)
		return index
	})
}

func F19() {
	value := 1

	print := func() {
		println(value)
	}

	setAndPrint := func(v int) {
		value := v
		println(value)
	}

	setAndPrint(1234)
	print()
}

func F19b() {
	value := 1

	print := func() {
		println(value)
	}

	setAndPrint := func(v int) {
		println(value)
		value := v
		println(value)
	}

	setAndPrint(1234)
	print()
}

func add(a, b int) int {
	return a + b
}

func F20(value int) int {
	switch {
	case value < 10:
		value := add(value, value) // OK
		if value < 10 {
			return value
		}
		return value + 1
	case value < 20:
		return value
	}
	return value
}

func F20a(value int) int {
	switch {
	case value < 10:
		println(value)
		value := add(value, value) // OK
		println(value)
		if value < 10 {
			return value
		}
		return value + 1
	case value < 20:
		return value
	}
	return value
}
