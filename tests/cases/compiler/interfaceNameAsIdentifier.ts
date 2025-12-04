interface C {
    (): void;
}
C();

namespace m2 {
    export interface C {
        (): void;
    }
}

m2.C();
