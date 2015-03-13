Main.test "
  Pref constructor exceptions"
Main.test
  "new Pref()": (mock) -> [
    Main.throws, "[object Pref] `id` is missing", ->
      new Pref() ]
  "new Pref true": (mock) -> [
    Main.throws, "'opt' is type 'boolean', not 'object'", ->
      new Pref true ]

  #@todo investigate unexpected behavior for `new Pref null`
