class C1 { foo() {} }

new C1() as Record<string, unknown>;


class C2 { foo() {} }
namespace C2 { export const unrelated = 3; }

new C2() as Record<string, unknown>;

C2.unrelated
new C2().unrelated


namespace C3 { export const unrelated = 3; }

C3 as Record<string, unknown>;
