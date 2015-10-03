// @allowUnreachableCode: false
// @preserveConstEnums: false

while (true) { }
const enum E { X }

module A4 {
    while (true);
    module A {
        const enum E { X }
    }
}

