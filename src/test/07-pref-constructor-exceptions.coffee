test.section "Pref constructor exceptions"

test.throws [

  "new Pref()"
  "[object Pref] `id` is missing"
  -> new Pref()

  "new Pref true"
  "'opt' is type 'boolean', not 'object'"
  -> new Pref true

]

#@todo investigate unexpected behavior for `new Pref null`
