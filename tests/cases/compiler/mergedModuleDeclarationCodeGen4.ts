namespace superContain {
    export namespace contain {
        export module my.buz {
            export namespace data {
                export function foo() { }
            }
        }
        export module my.buz {
            export namespace data {
                export function bar(contain, my, buz, data) {
                    foo();
                }
            }
        }
    }
}