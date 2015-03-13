test.section "Larry constructor exceptions"

test.throws [

  "new Larry 'foo'"
  "'opt' is type 'string', not 'object'"
  -> new Larry 'foo'

]

#@todo investigate unexpected behavior for `new Larry null`
