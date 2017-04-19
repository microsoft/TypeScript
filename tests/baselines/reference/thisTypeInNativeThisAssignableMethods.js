//// [thisTypeInNativeThisAssignableMethods.ts]
class A {
    options: string[];

    addOptions(options: string[]) {
        if (!this.options) {
            this.options = [];
        }
        options.forEach(function (item) {
            this.options.push(item);
        }, this);
        return this;
    }

    testUndefined(options: string[]) {
        const undefinedArr: Array<undefined> = []
        options.forEach(function () {
            undefinedArr.push(this);
        }); // case1
        options.forEach(function () {
            undefinedArr.push(this);
        }, undefined); // case2
        options.forEach(function () {
            undefinedArr.push(this);
        }, null); // case3

        const arrLike = {} as ArrayLike<number>
        Array.from(arrLike, function (item) {
            return this === undefined ? 2 : 1;
        }, undefined)

        const iterLike = [] as Iterable<number>
        Array.from(iterLike, function (item) {
            return this === undefined ? 2 : 1;
        }, undefined)
    }

    test(options: string[]) {
        const thisObject = {
            options: [] as string[]
        };

        options.find(function (val, index) {
            return val === this.options[index];
        }, thisObject);

        options.findIndex(function (val, index) {
            return val === this.options[index];
        }, thisObject);

        options.forEach(function (val, index) {
            return val === this.options[index];
        }, thisObject);

        options.map(function (val, index) {
            if (val === this.options[index])
                return this.options[index];
        }, thisObject);

        options.some(function (val, index) {
            return val === this.options[index];
        }, thisObject);

        options.filter(function (val, index) {
            return val === this.options[index];
        }, thisObject);

        options.every(function (val, index) {
            return val === this.options[index];
        }, thisObject);

        const arrLike = {} as ArrayLike<number>
        Array.from(arrLike, function (item) {
            return this.options[item].length
        }, thisObject)

        const iterLike = [] as Iterable<number>
        Array.from(iterLike, function (item) {
            return this.options[item].length
        }, thisObject)
    }

    test1(options: string[]) {
        const thisObject = {
            options: [] as ReadonlyArray<string>
        };

        options.find(function (val, index) {
            return val === this.options[index];
        }, thisObject);

        options.findIndex(function (val, index) {
            return val === this.options[index];
        }, thisObject);

        options.forEach(function (val, index) {
            return val === this.options[index];
        }, thisObject);

        options.map(function (val, index) {
            if (val === this.options[index])
                return this.options[index];
        }, thisObject);

        options.some(function (val, index) {
            return val === this.options[index];
        }, thisObject);

        options.filter(function (val, index) {
            return val === this.options[index];
        }, thisObject);

        options.every(function (val, index) {
            return val === this.options[index];
        }, thisObject);
    }

    test2(options: Int8Array[]) {
        const thisObject = {
            options: [] as Int8Array[]
        };

        options.find(function (val, index) {
            return val === this.options[index];
        }, thisObject);

        options.findIndex(function (val, index) {
            return val === this.options[index];
        }, thisObject);

        options.forEach(function (val, index) {
            return val === this.options[index];
        }, thisObject);

        options.map(function (val, index) {
            if (val === this.options[index])
                return this.options[index];
        }, thisObject);

        options.some(function (val, index) {
            return val === this.options[index];
        }, thisObject);

        options.filter(function (val, index) {
            return val === this.options[index];
        }, thisObject);

        options.every(function (val, index) {
            return val === this.options[index];
        }, thisObject);
    }

    test3(options: Uint8Array[]) {
        const thisObject = {
            options: [] as Uint8Array[]
        };

        options.find(function (val, index) {
            return val === this.options[index];
        }, thisObject);

        options.findIndex(function (val, index) {
            return val === this.options[index];
        }, thisObject);

        options.forEach(function (val, index) {
            return val === this.options[index];
        }, thisObject);

        options.map(function (val, index) {
            if (val === this.options[index])
                return this.options[index];
        }, thisObject);

        options.some(function (val, index) {
            return val === this.options[index];
        }, thisObject);

        options.filter(function (val, index) {
            return val === this.options[index];
        }, thisObject);

        options.every(function (val, index) {
            return val === this.options[index];
        }, thisObject);
    }

    test4(options: Float32Array[]) {
        const thisObject = {
            options: [] as Float32Array[]
        };

        options.find(function (val, index) {
            return val === this.options[index];
        }, thisObject);

        options.findIndex(function (val, index) {
            return val === this.options[index];
        }, thisObject);

        options.forEach(function (val, index) {
            return val === this.options[index];
        }, thisObject);

        options.map(function (val, index) {
            if (val === this.options[index])
                return this.options[index];
        }, thisObject);

        options.some(function (val, index) {
            return val === this.options[index];
        }, thisObject);

        options.filter(function (val, index) {
            return val === this.options[index];
        }, thisObject);

        options.every(function (val, index) {
            return val === this.options[index];
        }, thisObject);
    }

    test5(options: Uint8ClampedArray[]) {
        const thisObject = {
            options: [] as Uint8ClampedArray[]
        };

        options.find(function (val, index) {
            return val === this.options[index];
        }, thisObject);

        options.findIndex(function (val, index) {
            return val === this.options[index];
        }, thisObject);

        options.forEach(function (val, index) {
            return val === this.options[index];
        }, thisObject);

        options.map(function (val, index) {
            if (val === this.options[index])
                return this.options[index];
        }, thisObject);

        options.some(function (val, index) {
            return val === this.options[index];
        }, thisObject);

        options.filter(function (val, index) {
            return val === this.options[index];
        }, thisObject);

        options.every(function (val, index) {
            return val === this.options[index];
        }, thisObject);
    }

    test6(options: Int16Array[]) {
        const thisObject = {
            options: [] as Int16Array[]
        };

        options.find(function (val, index) {
            return val === this.options[index];
        }, thisObject);

        options.findIndex(function (val, index) {
            return val === this.options[index];
        }, thisObject);

        options.forEach(function (val, index) {
            return val === this.options[index];
        }, thisObject);

        options.map(function (val, index) {
            if (val === this.options[index])
                return this.options[index];
        }, thisObject);

        options.some(function (val, index) {
            return val === this.options[index];
        }, thisObject);

        options.filter(function (val, index) {
            return val === this.options[index];
        }, thisObject);

        options.every(function (val, index) {
            return val === this.options[index];
        }, thisObject);
    }

    test7(options: Uint16Array[]) {
        const thisObject = {
            options: [] as Uint16Array[]
        };

        options.find(function (val, index) {
            return val === this.options[index];
        }, thisObject);

        options.findIndex(function (val, index) {
            return val === this.options[index];
        }, thisObject);

        options.forEach(function (val, index) {
            return val === this.options[index];
        }, thisObject);

        options.map(function (val, index) {
            if (val === this.options[index])
                return this.options[index];
        }, thisObject);

        options.some(function (val, index) {
            return val === this.options[index];
        }, thisObject);

        options.filter(function (val, index) {
            return val === this.options[index];
        }, thisObject);

        options.every(function (val, index) {
            return val === this.options[index];
        }, thisObject);
    }

    test8(options: Uint32Array[]) {
        const thisObject = {
            options: [] as Uint32Array[]
        };

        options.find(function (val, index) {
            return val === this.options[index];
        }, thisObject);

        options.findIndex(function (val, index) {
            return val === this.options[index];
        }, thisObject);

        options.forEach(function (val, index) {
            return val === this.options[index];
        }, thisObject);

        options.map(function (val, index) {
            if (val === this.options[index])
                return this.options[index];
        }, thisObject);

        options.some(function (val, index) {
            return val === this.options[index];
        }, thisObject);

        options.filter(function (val, index) {
            return val === this.options[index];
        }, thisObject);

        options.every(function (val, index) {
            return val === this.options[index];
        }, thisObject);
    }

    test9(options: Float64Array[]) {
        const thisObject = {
            options: [] as Float64Array[]
        };

        options.find(function (val, index) {
            return val === this.options[index];
        }, thisObject);

        options.findIndex(function (val, index) {
            return val === this.options[index];
        }, thisObject);

        options.forEach(function (val, index) {
            return val === this.options[index];
        }, thisObject);

        options.map(function (val, index) {
            if (val === this.options[index])
                return this.options[index];
        }, thisObject);

        options.some(function (val, index) {
            return val === this.options[index];
        }, thisObject);

        options.filter(function (val, index) {
            return val === this.options[index];
        }, thisObject);

        options.every(function (val, index) {
            return val === this.options[index];
        }, thisObject);
    }
}


//// [thisTypeInNativeThisAssignableMethods.js]
class A {
    addOptions(options) {
        if (!this.options) {
            this.options = [];
        }
        options.forEach(function (item) {
            this.options.push(item);
        }, this);
        return this;
    }
    testUndefined(options) {
        const undefinedArr = [];
        options.forEach(function () {
            undefinedArr.push(this);
        }); // case1
        options.forEach(function () {
            undefinedArr.push(this);
        }, undefined); // case2
        options.forEach(function () {
            undefinedArr.push(this);
        }, null); // case3
        const arrLike = {};
        Array.from(arrLike, function (item) {
            return this === undefined ? 2 : 1;
        }, undefined);
        const iterLike = [];
        Array.from(iterLike, function (item) {
            return this === undefined ? 2 : 1;
        }, undefined);
    }
    test(options) {
        const thisObject = {
            options: []
        };
        options.find(function (val, index) {
            return val === this.options[index];
        }, thisObject);
        options.findIndex(function (val, index) {
            return val === this.options[index];
        }, thisObject);
        options.forEach(function (val, index) {
            return val === this.options[index];
        }, thisObject);
        options.map(function (val, index) {
            if (val === this.options[index])
                return this.options[index];
        }, thisObject);
        options.some(function (val, index) {
            return val === this.options[index];
        }, thisObject);
        options.filter(function (val, index) {
            return val === this.options[index];
        }, thisObject);
        options.every(function (val, index) {
            return val === this.options[index];
        }, thisObject);
        const arrLike = {};
        Array.from(arrLike, function (item) {
            return this.options[item].length;
        }, thisObject);
        const iterLike = [];
        Array.from(iterLike, function (item) {
            return this.options[item].length;
        }, thisObject);
    }
    test1(options) {
        const thisObject = {
            options: []
        };
        options.find(function (val, index) {
            return val === this.options[index];
        }, thisObject);
        options.findIndex(function (val, index) {
            return val === this.options[index];
        }, thisObject);
        options.forEach(function (val, index) {
            return val === this.options[index];
        }, thisObject);
        options.map(function (val, index) {
            if (val === this.options[index])
                return this.options[index];
        }, thisObject);
        options.some(function (val, index) {
            return val === this.options[index];
        }, thisObject);
        options.filter(function (val, index) {
            return val === this.options[index];
        }, thisObject);
        options.every(function (val, index) {
            return val === this.options[index];
        }, thisObject);
    }
    test2(options) {
        const thisObject = {
            options: []
        };
        options.find(function (val, index) {
            return val === this.options[index];
        }, thisObject);
        options.findIndex(function (val, index) {
            return val === this.options[index];
        }, thisObject);
        options.forEach(function (val, index) {
            return val === this.options[index];
        }, thisObject);
        options.map(function (val, index) {
            if (val === this.options[index])
                return this.options[index];
        }, thisObject);
        options.some(function (val, index) {
            return val === this.options[index];
        }, thisObject);
        options.filter(function (val, index) {
            return val === this.options[index];
        }, thisObject);
        options.every(function (val, index) {
            return val === this.options[index];
        }, thisObject);
    }
    test3(options) {
        const thisObject = {
            options: []
        };
        options.find(function (val, index) {
            return val === this.options[index];
        }, thisObject);
        options.findIndex(function (val, index) {
            return val === this.options[index];
        }, thisObject);
        options.forEach(function (val, index) {
            return val === this.options[index];
        }, thisObject);
        options.map(function (val, index) {
            if (val === this.options[index])
                return this.options[index];
        }, thisObject);
        options.some(function (val, index) {
            return val === this.options[index];
        }, thisObject);
        options.filter(function (val, index) {
            return val === this.options[index];
        }, thisObject);
        options.every(function (val, index) {
            return val === this.options[index];
        }, thisObject);
    }
    test4(options) {
        const thisObject = {
            options: []
        };
        options.find(function (val, index) {
            return val === this.options[index];
        }, thisObject);
        options.findIndex(function (val, index) {
            return val === this.options[index];
        }, thisObject);
        options.forEach(function (val, index) {
            return val === this.options[index];
        }, thisObject);
        options.map(function (val, index) {
            if (val === this.options[index])
                return this.options[index];
        }, thisObject);
        options.some(function (val, index) {
            return val === this.options[index];
        }, thisObject);
        options.filter(function (val, index) {
            return val === this.options[index];
        }, thisObject);
        options.every(function (val, index) {
            return val === this.options[index];
        }, thisObject);
    }
    test5(options) {
        const thisObject = {
            options: []
        };
        options.find(function (val, index) {
            return val === this.options[index];
        }, thisObject);
        options.findIndex(function (val, index) {
            return val === this.options[index];
        }, thisObject);
        options.forEach(function (val, index) {
            return val === this.options[index];
        }, thisObject);
        options.map(function (val, index) {
            if (val === this.options[index])
                return this.options[index];
        }, thisObject);
        options.some(function (val, index) {
            return val === this.options[index];
        }, thisObject);
        options.filter(function (val, index) {
            return val === this.options[index];
        }, thisObject);
        options.every(function (val, index) {
            return val === this.options[index];
        }, thisObject);
    }
    test6(options) {
        const thisObject = {
            options: []
        };
        options.find(function (val, index) {
            return val === this.options[index];
        }, thisObject);
        options.findIndex(function (val, index) {
            return val === this.options[index];
        }, thisObject);
        options.forEach(function (val, index) {
            return val === this.options[index];
        }, thisObject);
        options.map(function (val, index) {
            if (val === this.options[index])
                return this.options[index];
        }, thisObject);
        options.some(function (val, index) {
            return val === this.options[index];
        }, thisObject);
        options.filter(function (val, index) {
            return val === this.options[index];
        }, thisObject);
        options.every(function (val, index) {
            return val === this.options[index];
        }, thisObject);
    }
    test7(options) {
        const thisObject = {
            options: []
        };
        options.find(function (val, index) {
            return val === this.options[index];
        }, thisObject);
        options.findIndex(function (val, index) {
            return val === this.options[index];
        }, thisObject);
        options.forEach(function (val, index) {
            return val === this.options[index];
        }, thisObject);
        options.map(function (val, index) {
            if (val === this.options[index])
                return this.options[index];
        }, thisObject);
        options.some(function (val, index) {
            return val === this.options[index];
        }, thisObject);
        options.filter(function (val, index) {
            return val === this.options[index];
        }, thisObject);
        options.every(function (val, index) {
            return val === this.options[index];
        }, thisObject);
    }
    test8(options) {
        const thisObject = {
            options: []
        };
        options.find(function (val, index) {
            return val === this.options[index];
        }, thisObject);
        options.findIndex(function (val, index) {
            return val === this.options[index];
        }, thisObject);
        options.forEach(function (val, index) {
            return val === this.options[index];
        }, thisObject);
        options.map(function (val, index) {
            if (val === this.options[index])
                return this.options[index];
        }, thisObject);
        options.some(function (val, index) {
            return val === this.options[index];
        }, thisObject);
        options.filter(function (val, index) {
            return val === this.options[index];
        }, thisObject);
        options.every(function (val, index) {
            return val === this.options[index];
        }, thisObject);
    }
    test9(options) {
        const thisObject = {
            options: []
        };
        options.find(function (val, index) {
            return val === this.options[index];
        }, thisObject);
        options.findIndex(function (val, index) {
            return val === this.options[index];
        }, thisObject);
        options.forEach(function (val, index) {
            return val === this.options[index];
        }, thisObject);
        options.map(function (val, index) {
            if (val === this.options[index])
                return this.options[index];
        }, thisObject);
        options.some(function (val, index) {
            return val === this.options[index];
        }, thisObject);
        options.filter(function (val, index) {
            return val === this.options[index];
        }, thisObject);
        options.every(function (val, index) {
            return val === this.options[index];
        }, thisObject);
    }
}
