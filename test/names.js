var test = require('tape'),
    teoria = require('teoria'),
    piu = require('../');

function has(haystack, needles) {
  var i = 0, n = needles.length;
  haystack.forEach(function(hay) {
    needles.forEach(function(needle) {
      i = (hay === needle) ? i + 1 : i;
    });
  });

  return i === n;
}

function names(notes, enharmonic) {
  return piu.infer(notes.map(teoria.note), enharmonic).map(piu.name);
}

test('Chord inference chops', function(t) {
  // power chords
  t.deepEqual(names(['c', 'g']), ['C5']);
  t.deepEqual(names(['d', 'a']), ['D5']);
  t.deepEqual(names(['b', 'e']), ['E5']);
  t.deepEqual(names(['F#4', 'B4']), ['B5']);

  // triads
  t.deepEqual(names(['c', 'e', 'g']), ['C']);
  t.deepEqual(names(['e', 'c', 'g']), ['C']);
  t.deepEqual(names(['a', 'c', 'e']), ['Am']);
  t.deepEqual(names(['e', 'a', 'c']), ['Am']);
  t.deepEqual(names(['eb', 'g', 'b']), ['Ebaug']);
  t.deepEqual(names(['d', 'f', 'ab']), ['Ddim']);
  t.assert(has(names(['g', 'c', 'd']), ['Csus2', 'Gsus4']));
  t.assert(has(names(['ab', 'bb', 'eb']), ['Absus2']));
  t.deepEqual(names(['f#', 'b', 'cx']), ['F#sus4#5']);
  t.deepEqual(names(['cb', 'a', 'f']), ['FMb5']);
  t.deepEqual(names(['e', 'g', 'b#']), ['Em#5']);

  // tetrads
  t.assert(names(['c', 'e', 'g', 'bb']).indexOf('C7') !== -1);
  t.assert(names(['c', 'e', 'g', 'b']).indexOf('Cmaj7') !== -1);
  t.assert(names(['a', 'c', 'e', 'g']).indexOf('Am7') !== -1);
  t.assert(names(['a', 'c', 'eb', 'g']).indexOf('Am7b5') !== -1);
  t.assert(names(['f#', 'a#', 'c', 'e#']).indexOf('F#maj7b5') !== -1);
  t.assert(names(['d', 'f', 'a', 'e']).indexOf('Dmadd9') !== -1);
  t.assert(names(['eb', 'g', 'b', 'db']).indexOf('Eb7#5') !== -1);
  t.assert(names(['b', 'e', 'f#', 'a']).indexOf('B7sus4') !== -1);
  t.assert(names(['e', 'g#', 'bb', 'd']).indexOf('E7b5') !== -1);
  t.assert(names(['d', 'f', 'ab', 'cb']).indexOf('Ddim7') !== -1);
  t.assert(names(['c', 'eb', 'gb', 'bbb']).indexOf('Cdim7') !== -1);

  // parenthesis
  t.assert(names(['d', 'eb', 'g', 'b']).indexOf('G(b6)') !== -1);
  t.assert(names(['ab', 'c', 'eb', 'fb']).indexOf('Ab(b6)') !== -1);

  // be octave-agnostic
  t.equal(names(['d', 'f', 'a', 'D']).length, 1);
  t.end();
});
