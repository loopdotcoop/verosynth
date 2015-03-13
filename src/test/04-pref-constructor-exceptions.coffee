Main.test "
  Pref Constructor exceptions"
Main.test
  "new Pref true": (mock) -> [
    Main.throws, "'opt' is type 'boolean', not 'object'", ->
      new Pref true ]

  #@todo investigate unexpected behavior for `new Pref null`
