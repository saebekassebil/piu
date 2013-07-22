# più
 - *adverb \\ˈpyü, pē-ˈü\\*

Let's infer some chord names from collections of notes, shall we?

Install with npm:

    $ npm install piu

Require like any other npm module:

    var piu = require('piu');

You'll most likely use this library with `teoria` (as all the methods but `piu.name()`
depends on objects from `teoria`), so let's require that too:

    var teoria = require('teoria');

And now, you're ready to infer triads, chord extensions and names!

**DISCLAIMER**: This library is far from finished, and the `piu.name()` method
will only recognize triads and tetrads (that is, chords consisting of 3 or 4 notes)

## API

### piu.triads(notes) -> Array of `triad`s
This method returns an `array` all the triads that the `notes` array constitutes.

Each `triad` object has two properties:

 - `notes` - An array of the notes (`TeoriaNote`), ordered as tonic, third, fifth
 - `type` - The "type"/quality of the chord, which is one of:
   - `''` for major
   - `'m'` for minor
   - `'aug'` for augmented
   - `'dim'` for diminished
   - `'sus2'` for suspended second
   - `'sus4'` for suspended fourth
   - All of above + `'#5'` or `'b5'` for fifth alterations

### piu.infer(notes) -> Array of `chord`s
This method returns an `array` of all the chords that the `notes` array constitutes.
Each `chord` object has three properties:

 - `root` - A string representation of the root note (octave-less)
 - `type` - The "type"/quality of the base triad of the chord (as described above)
 - `exts` - An `array` of intervals (`TeoriaInterval`), that extends the base triad

### piu.name(chord) -> String notation of the chord
This method takes a `chord` object, like the one that `piu.infer` returns, and
returns a string representation of that chord.

```javascript
// You can use the piu.name() method directly:
piu.name({
  root: 'A',
  type: 'm',
  exts: [teoria.interval('m7')]
});
// -> 'Am7'

// Or map results from piu.infer(), to piu.name():
piu.name(
  piu.infer([
	teoria.note('c'),
	teoria.note('e'),
	teoria.note('g'),
	teoria.note('bb')
  ])[0]
);
// -> C7
```
