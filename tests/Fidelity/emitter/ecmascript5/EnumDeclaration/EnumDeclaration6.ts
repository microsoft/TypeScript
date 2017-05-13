module M {
  enum E1 {
    A
  }

  enum E3 {
    A = 1
  }
}

module M {
  module N {
    enum E1 {
      A
    }

    enum E3 {
      A = 1
    }
  }
}

module M.N.O {
  enum E1 {
    A
  }

  enum E3 {
    A = 1
  }
}