// ==ORIGINAL==
<U1a, U1b>(u1a: U1a, u1b: U1b) => {
    function F1<T1a, T1b>(t1a: T1a, t1b: T1b) {
        <U2a, U2b>(u2a: U2a, u2b: U2b) => {
            function F2<T2a, T2b>(t2a: T2a, t2b: T2b) {
                <U3a, U3b>(u3a: U3a, u3b: U3b) => {
                        /*[#|*/t1a.toString();
                        t2a.toString();
                        u1a.toString();
                        u2a.toString();
                        u3a.toString();/*|]*/
                }
            }
        }
    }
}
// ==SCOPE::Extract to inner function in arrow function==
<U1a, U1b>(u1a: U1a, u1b: U1b) => {
    function F1<T1a, T1b>(t1a: T1a, t1b: T1b) {
        <U2a, U2b>(u2a: U2a, u2b: U2b) => {
            function F2<T2a, T2b>(t2a: T2a, t2b: T2b) {
                <U3a, U3b>(u3a: U3a, u3b: U3b) => {
                        /*RENAME*/newFunction();

                    function newFunction() {
                        t1a.toString();
                        t2a.toString();
                        u1a.toString();
                        u2a.toString();
                        u3a.toString();
                    }
                }
            }
        }
    }
}
// ==SCOPE::Extract to inner function in function 'F2'==
<U1a, U1b>(u1a: U1a, u1b: U1b) => {
    function F1<T1a, T1b>(t1a: T1a, t1b: T1b) {
        <U2a, U2b>(u2a: U2a, u2b: U2b) => {
            function F2<T2a, T2b>(t2a: T2a, t2b: T2b) {
                <U3a, U3b>(u3a: U3a, u3b: U3b) => {
                        /*RENAME*/newFunction<U3a>(u3a);
                }

                function newFunction<U3a>(u3a: U3a) {
                    t1a.toString();
                    t2a.toString();
                    u1a.toString();
                    u2a.toString();
                    u3a.toString();
                }
            }
        }
    }
}
// ==SCOPE::Extract to inner function in function 'F1'==
<U1a, U1b>(u1a: U1a, u1b: U1b) => {
    function F1<T1a, T1b>(t1a: T1a, t1b: T1b) {
        <U2a, U2b>(u2a: U2a, u2b: U2b) => {
            function F2<T2a, T2b>(t2a: T2a, t2b: T2b) {
                <U3a, U3b>(u3a: U3a, u3b: U3b) => {
                        /*RENAME*/newFunction<U2a, T2a, U3a>(t2a, u2a, u3a);
                }
            }
        }

        function newFunction<U2a, T2a, U3a>(t2a: T2a, u2a: U2a, u3a: U3a) {
            t1a.toString();
            t2a.toString();
            u1a.toString();
            u2a.toString();
            u3a.toString();
        }
    }
}
// ==SCOPE::Extract to function in global scope==
<U1a, U1b>(u1a: U1a, u1b: U1b) => {
    function F1<T1a, T1b>(t1a: T1a, t1b: T1b) {
        <U2a, U2b>(u2a: U2a, u2b: U2b) => {
            function F2<T2a, T2b>(t2a: T2a, t2b: T2b) {
                <U3a, U3b>(u3a: U3a, u3b: U3b) => {
                        /*RENAME*/newFunction<U1a, T1a, U2a, T2a, U3a>(t1a, t2a, u1a, u2a, u3a);
                }
            }
        }
    }
}

function newFunction<U1a, T1a, U2a, T2a, U3a>(t1a: T1a, t2a: T2a, u1a: U1a, u2a: U2a, u3a: U3a) {
    t1a.toString();
    t2a.toString();
    u1a.toString();
    u2a.toString();
    u3a.toString();
}
