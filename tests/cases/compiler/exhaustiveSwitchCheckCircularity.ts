// @strict: true

// Repro from #47539

declare function isNever(n: never): boolean;

function f() {
    let foo: "aaa" | "bbb" = "aaa";
    while (true) {
        switch (foo) {
            case "aaa":
        }
        if (foo === "aaa") {
            foo = "bbb";
        }
        else if (isNever(foo)) {  // Error expected
            break;
        }
    }
}
