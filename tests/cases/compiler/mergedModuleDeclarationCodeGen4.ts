namespace superContain {
    export namespace contain {
        export namespace my.buz {
            export namespace data {
                export function foo() { }
            }
        }
        export namespace my.buz {
            export namespace data {
                export function bar(contain, my, buz, data) {
                    foo();
                }
            }
        }
    }
}