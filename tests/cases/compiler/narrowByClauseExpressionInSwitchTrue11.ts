// @strict: true
// @noEmit: true

function uhoh(input: string) : "A"|"B"|"C" {
    switch (true) {
        case /a/.test(input):
            return "A";
        case /b/.test(input):
            return "B";
        case true:
            return "C";
    }
}

function uhoh1(input: string) : "A"|"B"|"C" {
    switch ((true)) {
        case /a/.test(input):
            return "A";
        case /b/.test(input):
            return "B";
        case (true):
            return "C";
    }
}