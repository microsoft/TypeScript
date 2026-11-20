// Namespace export merged with enum must not be treated as an enum member via E["C"].
// Previously panicked: Unhandled case in Node.MemberList: KindModuleBlock

namespace E {
    export class C {}
}
enum E {
    D = E["C"],
}

// Alias exports that resolve to enum members must still constant-evaluate (like E.C).
enum F {
    A = 1,
}
namespace E2 {
    export import C = F.A;
}
enum E2 {
    D = E2["C"],
    Next,
}
