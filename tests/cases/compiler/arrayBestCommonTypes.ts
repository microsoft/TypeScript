module EmptyTypes {
    interface iface { }
    class base implements iface { }
    class base2 implements iface { }
    class derived extends base { }


    class f {
        public voidIfAny(x: boolean, y?: boolean): number;
        public voidIfAny(x: string, y?: boolean): number;
        public voidIfAny(x: number, y?: boolean): number;
        public voidIfAny(x: any, y = false): any { return null; }

        public x() {
            <number>(this.voidIfAny([4, 2][0]));
            <number>(this.voidIfAny([4, 2, undefined][0]));
            <number>(this.voidIfAny([undefined, 2, 4][0]));
            <number>(this.voidIfAny([null, 2, 4][0]));
            <number>(this.voidIfAny([2, 4, null][0]));
            <number>(this.voidIfAny([undefined, 4, null][0]));

            <number>(this.voidIfAny(['', "q"][0]));
            <number>(this.voidIfAny(['', "q", undefined][0]));
            <number>(this.voidIfAny([undefined, "q", ''][0]));
            <number>(this.voidIfAny([null, "q", ''][0]));
            <number>(this.voidIfAny(["q", '', null][0]));
            <number>(this.voidIfAny([undefined, '', null][0]));

            <number>(this.voidIfAny([[3, 4], [null]][0][0]));


            var t1: { x: number; y: base; }[] = [{ x: 7, y: new derived() }, { x: 5, y: new base() }];
            var t2: { x: boolean; y: base; }[] = [{ x: true, y: new derived() }, { x: false, y: new base() }];
            var t3: { x: string; y: base; }[] = [{ x: undefined, y: new base() }, { x: '', y: new derived() }];

            var anyObj: any = null;
            // Order matters here so test all the variants
            var a1 = [{ x: 0, y: 'a' }, { x: 'a', y: 'a' }, { x: anyObj, y: 'a' }];
            var a2 = [{ x: anyObj, y: 'a' }, { x: 0, y: 'a' }, { x: 'a', y: 'a' }];
            var a3 = [{ x: 0, y: 'a' }, { x: anyObj, y: 'a' }, { x: 'a', y: 'a' }];

            var ifaceObj: iface = null;
            var baseObj = new base();
            var base2Obj = new base2();

            var b1 = [baseObj, base2Obj, ifaceObj];
            var b2 = [base2Obj, baseObj, ifaceObj];
            var b3 = [baseObj, ifaceObj, base2Obj];
            var b4 = [ifaceObj, baseObj, base2Obj];
        }
    }
}

module NonEmptyTypes {
    interface iface { x: string; }
    class base implements iface { x: string; y: string; }
    class base2 implements iface { x: string; z: string; }
    class derived extends base { a: string; }


    class f {
        public voidIfAny(x: boolean, y?: boolean): number;
        public voidIfAny(x: string, y?: boolean): number;
        public voidIfAny(x: number, y?: boolean): number;
        public voidIfAny(x: any, y = false): any { return null; }

        public x() {
            <number>(this.voidIfAny([4, 2][0]));
            <number>(this.voidIfAny([4, 2, undefined][0]));
            <number>(this.voidIfAny([undefined, 2, 4][0]));
            <number>(this.voidIfAny([null, 2, 4][0]));
            <number>(this.voidIfAny([2, 4, null][0]));
            <number>(this.voidIfAny([undefined, 4, null][0]));

            <number>(this.voidIfAny(['', "q"][0]));
            <number>(this.voidIfAny(['', "q", undefined][0]));
            <number>(this.voidIfAny([undefined, "q", ''][0]));
            <number>(this.voidIfAny([null, "q", ''][0]));
            <number>(this.voidIfAny(["q", '', null][0]));
            <number>(this.voidIfAny([undefined, '', null][0]));

            <number>(this.voidIfAny([[3, 4], [null]][0][0]));


            var t1: { x: number; y: base; }[] = [{ x: 7, y: new derived() }, { x: 5, y: new base() }];
            var t2: { x: boolean; y: base; }[] = [{ x: true, y: new derived() }, { x: false, y: new base() }];
            var t3: { x: string; y: base; }[] = [{ x: undefined, y: new base() }, { x: '', y: new derived() }];

            var anyObj: any = null;
            // Order matters here so test all the variants
            var a1 = [{ x: 0, y: 'a' }, { x: 'a', y: 'a' }, { x: anyObj, y: 'a' }];
            var a2 = [{ x: anyObj, y: 'a' }, { x: 0, y: 'a' }, { x: 'a', y: 'a' }];
            var a3 = [{ x: 0, y: 'a' }, { x: anyObj, y: 'a' }, { x: 'a', y: 'a' }];

            var ifaceObj: iface = null;
            var baseObj = new base();
            var base2Obj = new base2();

            var b1 = [baseObj, base2Obj, ifaceObj];
            var b2 = [base2Obj, baseObj, ifaceObj];
            var b3 = [baseObj, ifaceObj, base2Obj];
            var b4 = [ifaceObj, baseObj, base2Obj];
        }
    }
}

