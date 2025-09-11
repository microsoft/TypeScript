// @allowUnreachableCode: false
// @preserveConstEnums: false

while (true) { }
const enum E { X }

namespace A4 {
    while (true);
    namespace A {
        const enum E { X }
    }
}

