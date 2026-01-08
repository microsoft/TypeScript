// @declaration: true

declare namespace A.B.Base {
    export class W {
        id: number;
    }
}
namespace X.Y.base {

    export class W extends A.B.Base.W {
        name: string;
    }
}

namespace X.Y.base.Z {

    export class W<TValue> extends X.Y.base.W {
        value: boolean;
    }
}
