Main.test "
  Pref constructor usage"
Main.test ->
  app.prefs = new Larry # clean up after previous tests
  new Pref { id:'pref1' }
Main.test
  "new Pref is recorded in `app.prefs`": (mock) -> [
    Main.eq, mock, ->
      app.prefs.pref1 ]

  #@todo investigate unexpected behavior for `new Pref null`
