namespace m {
}

// In second instance of same module, exported interface is not visible
namespace m {
    interface f {}
    export class n { 
        private n: f;
    }
}
