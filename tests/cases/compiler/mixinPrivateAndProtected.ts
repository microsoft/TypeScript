// Repro from #13830

type Constructor<T> = new(...args: any[]) => T;

class A {
    public pb: number = 2;
    protected ptd: number = 1;
    private pvt: number = 0;
}

function mixB<T extends Constructor<{}>>(Cls: T) {
    return class extends Cls {
        protected ptd: number = 10;
        private pvt: number = 0;
    };
}

function mixB2<T extends Constructor<A>>(Cls: T) {
    return class extends Cls {
        protected ptd: number = 10;
    };
}

const
    AB = mixB(A),
    AB2 = mixB2(A);

function mixC<T extends Constructor<{}>>(Cls: T) {
    return class extends Cls {
        protected ptd: number = 100;
        private pvt: number = 0;
    };
}

const
    AB2C = mixC(AB2),
    ABC = mixC(AB);

const
    a = new A(),
    ab = new AB(),
    abc = new ABC(),
    ab2c = new AB2C();

a.pb.toFixed();
a.ptd.toFixed();    // Error
a.pvt.toFixed();    // Error

ab.pb.toFixed();
ab.ptd.toFixed();   // Error
ab.pvt.toFixed();   // Error

abc.pb.toFixed();
abc.ptd.toFixed();  // Error
abc.pvt.toFixed();  // Error

ab2c.pb.toFixed();
ab2c.ptd.toFixed(); // Error
ab2c.pvt.toFixed(); // Error

// Repro from #13924

class Person {
	constructor(public name: string) {}

	protected myProtectedFunction() {
		// do something
	}
}

function PersonMixin<T extends Constructor<Person>>(Base: T) {
	return class extends Base {
		constructor(...args: any[]) {
			super(...args);
		}

		myProtectedFunction() {
			super.myProtectedFunction();
			// do more things
		}
	};
}

class Customer extends PersonMixin(Person) {
	accountBalance: number;
    f() {
    }
}
