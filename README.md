# più
 - *adverb \\ˈpyü, pē-ˈü\\*

Let's infer some chord names from collections of notes, shall we?


Install with npm:

    $ npm install piu

You'll most likely use this library with [teoria](https://github.com/saebekassebil/teoria)
(as all the methods but `piu.name()` depends on objects from `teoria`),
so let's install that too:

    $ npm install teoria

And now, you're ready to infer triads, chord extensions and names!

```javascript
// Infer the chords (strictly) constituted by the notes D, F, A, C
piu
  .infer( ['d', 'f', 'a', 'c'].map(teoria.note) )
  .map( piu.name );
// -> ['Dm7', 'F6']

// Infer the chords (enharmonically) constituted by the notes B, D, F and Ab
piu
  .infer( ['b', 'd', 'f', 'ab'].map(teoria.note) )
  .map( piu.name );
// -> ['Dm6b5', 'Bdim7', 'Ddim7', 'Fm6b5' ... ]
```

**DISCLAIMER**: The `piu.name()` method will (for now) only recognize
power-chords, triads and tetrads (that is, chords consisting of 2, 3 or 4 notes)

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

### piu.infer(notes, enharmonic) -> Array of `chord`s
This method returns an `array` of all the chords that the `notes` array constitutes.

If *enharmonic* is `true`, all enharmonic chords will be returned as well.
Otherwise the inferring defaults to "strict" chord inferring which will only
return chords that consists of **exactly** the given notes.

```javascript
// Default is strict inferring
piu.infer(['d', 'f', 'ab', 'cb'].map(teoria.note)).map(piu.name);
// -> [ 'Ddim7', 'Fm6b5' ]

// Enable enharmonic inferring
piu.infer(['d', 'f', 'ab', 'cb'].map(teoria.note), true).map(piu.name);
// -> [ 'Ddim7', 'Fm6b5', 'Dm6b5', 'Bdim7', 'Bm6b5', 'G#dim7', 'G#m6b5', ... ]
```

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

// Select a result from piu.infer() and hand it along to piu.name()
piu.name(
  piu.infer(['c', 'e', 'g', 'bb'].map(teoria.note))[0]
);
// -> C7

// Create an array of TeoriaNotes, and then map each possible chord to its name:
piu.infer( ['d', 'e', 'g', 'bb'].map( teoria.note ) ).map( piu.name );
// -> [ 'Gm6', 'Em7b5' ]
```
