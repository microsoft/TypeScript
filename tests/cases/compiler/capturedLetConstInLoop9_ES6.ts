// @target: ES6

for (let x = 0; x < 1; ++x) {
    let x;
    (function() { return x });
    {
        let x;
        (function() { return x });
    }

    try { }
    catch (e) {
        let x;
        (function() { return x });
    }

    switch (x) {
        case 1:
            let x;
            (function() { return x });
           break;
    }
    
    while (1 == 1) {
        let x;
        (function() { return x });
    }
    
    class A {
        m() {
            return x + 1;
        }
    }
}

declare function use(a: any);

function foo() {
    l0:
    for (let a of []) {
        
        if (a === 1) {
            break;
        }
        
        if (a === 2) {
            break l0;
        }
        
        for (let b of []) {
            var [{x, y:z}] = [{x:1, y:2}];
            if (b === 1) {
                break;
            }
            
            
            if (b === 2) {
                break l0;
            }
            
            l1:
            if (b === 3) {
                break l1;
            }
            
            return 50;
        }

        for (let b of []) {
            var [{x1, y:z1}] = [{x1:1, y:arguments.length}];
            if (b === 1) {
                break;
            }
            
            if (b === 2) {
                break l0;
            }
            () => b
            return 100;
        }

        
        () => a;
    }
    
    use(x);
    use(z);
    use(x1);
    use(z1);
}

function foo2() {
    for (let x of []) {
        if (x === 1) {
            break;
        }
        else if (x === 2) {
            continue;
        }
        
        while (1 === 1) {
            if (x) {
                break;
            }
            else {
                continue;
            }
        }
        
        switch(x) {
            case 1: break;
            case 2: continue;
        }
        
        for (let y of []) {
            switch(y) {
                case 1: break;
                case 2: continue;
            }
        }
    }
}

class C {
    constructor(private N: number) { }
    foo() {
        for (let i = 0; i < 100; i++) {
            let f = () => this.N * i;
        }
    }
}

function foo3 () {
    let x = arguments.length;
    for (let y of []) {
        let z = arguments.length;
        (function() { return y + z + arguments.length; });
    }
}