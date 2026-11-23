// @experimentalDecorators: true
// @emitDecoratorMetadata: true

declare function dec(...args: any[]): any;

const o = {
    m(@dec x: string) {}
};

class C {
    @dec
    prop!: number;

    method() {
        return {
            m(@dec x: string) {},
            set s(@dec v: number) {}
        };
    }
}
