function foo (v: number) {
    label: if (v) {
        class C {
            static {
                if (v === 1) {
                    break label;
                }
                if (b === 2) {
                    continue label;
                }

            }
        }

        if (v === 3) {
            break label;
        }
        if (v === 4) {
            continue label;
        }
    }
}
