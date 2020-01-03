const a = {
    b: {
        c: {
            d: {
                e: {
                    hmm: 10,
                    foo(x: number, y: number) { return this.hmm * x * y },
                }
            }
        }
    }
}

const j = a.b.c.d.e.foo(?, 1);
