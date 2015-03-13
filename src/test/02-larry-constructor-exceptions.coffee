Main.test "
  Larry constructor exceptions"
Main.test
  "new Larry 'foo'": (mock) -> [
    Main.throws, "'opt' is type 'string', not 'object'", ->
      new Larry 'foo' ]

  #@todo investigate unexpected behavior for `new Larry null`
