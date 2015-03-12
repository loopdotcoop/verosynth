Main.test "
  Constructor exceptions"
Main.test
  "Construct 1": () -> [
    Main.throws, "'opt' is type 'number', not 'object'", ->
      new Main 1 ]

  #@todo investigate unexpected behavior for `new Main null`
