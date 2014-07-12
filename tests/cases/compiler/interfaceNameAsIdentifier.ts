interface C {
    (): void;
}
C();

module m2 {
    export interface C {
        (): void;
    }
}

m2.C();
