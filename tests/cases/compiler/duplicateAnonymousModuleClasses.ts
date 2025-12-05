namespace F {

    class Helper {

    }

}


namespace F {
    
    // Should not be an error
    class Helper {

    }

}

namespace Foo {

    class Helper {

    }

}


namespace Foo {
    
    // Should not be an error
    class Helper {

    }

}

namespace Gar {
    namespace Foo {

        class Helper {

        }

    }


    namespace Foo {
    
        // Should not be an error
        class Helper {

        }

    }
}
