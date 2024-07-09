// @pretty: true
interface A {
    a: number;
}

interface Large {
    something: {
        another: {
            more: {
                thing: A;
            }
            yetstill: {
                another: A;
            }
        }
    }
}

const x: Large = {
    something: {
        another: {
            more: {
                thing: {}
            },
            yetstill: {
                another: {}
            }
        }
    }
}
