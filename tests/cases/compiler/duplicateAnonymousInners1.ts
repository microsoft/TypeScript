module Foo {

    class Helper {

    }
    
    class Inner {}
    // Inner should show up in Intellisense
    
    export var Outer=0;
}


module Foo {
    
    // Should not be an error
    class Helper {

    }
    
    // Inner should not show up in Intellisense
    // Outer should show up in Intellisense

}
