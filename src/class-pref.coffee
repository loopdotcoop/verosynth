class Pref
  toString: -> "[object Pref]"

  constructor: (opt={}) ->
    if null == opt then throw new Error "'opt' is null"
    if 'object' != typeof opt then throw new Error "
      'opt' is type '#{typeof opt}', not 'object'"
    @id = opt.id

    # Record this instance to the `prefs` lookup-array
    app.prefs ?= new Larry
    app.prefs.push @

    log 'Constructed a Pref instance!'


