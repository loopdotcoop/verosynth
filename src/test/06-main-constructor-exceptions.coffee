test.section "Main constructor exceptions"

test.throws [

  "new Main 1"
  "'opt' is type 'number', not 'object'"
  -> new Main 1

]

#@todo investigate unexpected behavior for `new Main null`
