declare class B<T> {    
    m<U>(): B<U>;
    static g(): B<any>;
}

class D extends B<any> {
    constructor() {
        super(); 
    }
}
