package cleanup

import "testing"

func badT(t *testing.T) {
	t.Cleanup(func() {
		t.Log("done")
	})
}

func badB(b *testing.B) {
	b.Cleanup(func() {
		b.Log("done")
	})
}

func badTB(tb testing.TB) {
	tb.Cleanup(func() {
		tb.Log("done")
	})
}

func badMultipleRefs(t *testing.T) {
	t.Cleanup(func() {
		t.Log("first")
		t.Log("second")
	})
}

func good(t *testing.T) {
	t.Cleanup(func() {
		println("no capture")
	})
}

func goodNamedFunc(t *testing.T) {
	t.Cleanup(namedFunc)
}

func namedFunc() {}
