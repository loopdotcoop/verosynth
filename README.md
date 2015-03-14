VeroSynth 0.0.5
===============

An open source JavaScript library which takes audio inputs, adds FX, visualises 
the signal at various points, and generates audio outputs.

See [verosynth.loop.coop](http://verosynth.loop.coop/) for documentation and 
live examples.



Build
-----

Build VeroSynth on the command line:
```
$ coffee -j build/verosynth.js -wc src/*.coffee
```

Build VeroSynth with tests:
```
$ coffee -j build/verosynth-test.js -wc src/*.coffee src/test/*.coffee
```

Test VeroSynth on the client:  
Open `test.html` in a web browser

