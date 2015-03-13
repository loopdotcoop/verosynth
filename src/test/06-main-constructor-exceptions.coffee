Main.test "
  Main constructor exceptions"
Main.test
  "new Main 1": (mock) -> [
    Main.throws, "'opt' is type 'number', not 'object'", ->
      new Main 1 ]

  #@todo investigate unexpected behavior for `new Main null`
