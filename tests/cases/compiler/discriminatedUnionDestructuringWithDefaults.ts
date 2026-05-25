// @strict: true

// Case 1: the issue #50139 repro — must compile clean after the fix
function repro({ isText = false, children = 0 }:
    { isText: true; children?: string }
  | { isText: false; children?: number }
) {
    if (isText === true) {
        let data: string = children;
    } else if (isText === false) {
        let data: number = children;
    }
}

// Case 2: control — no defaults, already worked, must not regress
function control({ isText, children }:
    { isText: true; children: string }
  | { isText: false; children: number }
) {
    if (isText === true) {
        let data: string = children;
    } else if (isText === false) {
        let data: number = children;
    }
}

// Case 3: whzx5byb's soundness check — default foreign to one arm must still error
function soundnessCheck({ isText = false, children = true }: // expect error on `children = true`
    { isText: true; children?: string }
  | { isText: false; children?: number }
) {
    if (isText === true) {
        let data: string = children;
    }
}
