// Namespace export merged with enum must not be treated as an enum member via E["C"].
// Previously panicked: Unhandled case in Node.MemberList: KindModuleBlock

namespace E {
    export class C {}
}
enum E {
    D = E["C"],
}
