class C {
    private x = 0;
}

module M {
    class C {
        private x = 0;
    }
}

module M1.M2 {
    class C {
        private x = 0;
    }
}

module M1 {
    module M2 {
        class C {
            private x = 0;
        }
    }
}