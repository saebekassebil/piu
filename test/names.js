var vows    = require('vows')
  , assert  = require('assert')
  , teoria  = require('teoria')
  , piu     = require('../index');

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

vows.describe('più name inference').addBatch({
  'piu.name() power-chords': {
    'c, g is C5': function() {
      assert.notEqual(names(['c', 'g']).indexOf('C5'), -1);
    },

    'd, a is D5': function() {
      assert.notEqual(names(['d', 'a']).indexOf('D5'), -1);
    },

    'b, e is E5': function() {
      assert.notEqual(names(['b', 'e']).indexOf('E5'), -1);
    },

    'F#4, B4 is B5': function() {
      assert.notEqual(names(['F#4', 'B4']).indexOf('B5'), -1);
    }
  },

  'piu.name() triads': {
    'c, e, g is C': function() {
      assert.notEqual(names(['c', 'e', 'g']).indexOf('C'), -1);
    },

    'e, c, g is C': function() {
      assert.notEqual(names(['e', 'c', 'g']).indexOf('C'), -1);
    },

    'a, c, e is Am': function() {
      assert.notEqual(names(['a', 'c', 'e']).indexOf('Am'), -1);
    },

    'e, a, c is Am': function() {
      assert.notEqual(names(['e', 'a', 'c']).indexOf('Am'), -1);
    },

    'eb, g, b is Ebaug': function() {
      assert.notEqual(names(['eb', 'g', 'b']).indexOf('Ebaug'), -1);
    },

    'd, f, ab is Ddim': function() {
      assert.notEqual(names(['d', 'f', 'ab']).indexOf('Ddim'), -1);
    },

    'g, c, d is Gsus4': function() {
      assert.notEqual(names(['g', 'c', 'd']).indexOf('Gsus4'), -1);
    },

    'ab, bb, eb is Absus2': function() {
      assert.notEqual(names(['ab', 'bb', 'eb']).indexOf('Absus2'), -1);
    },

    'f#, b, cx is F#sus4#5': function() {
      assert.notEqual(names(['f#', 'b', 'cx']).indexOf('F#sus4#5'), -1);
    },

    'cb, a, f is FMb5': function() {
      assert.notEqual(names(['cb', 'a', 'f']).indexOf('FMb5'), -1);
    },

    'e, g, b# is Em#5': function() {
      assert.notEqual(names(['e', 'g', 'b#']).indexOf('Em#5'), -1);
    }
  },

  'piu.name() tetrads': {
    'c, e, g, bb is C7': function() {
      assert.notEqual(names(['c', 'e', 'g', 'bb']).indexOf('C7'), -1);
    },

    'c, e, g, b is Cmaj7': function() {
      assert.notEqual(names(['c', 'e', 'g', 'b']).indexOf('Cmaj7'), -1);
    },

    'a, c, e, g is Am7': function() {
      assert.notEqual(names(['a', 'c', 'e', 'g']).indexOf('Am7'), -1);
    },

    'a, c, eb, g is Am7b5': function() {
      assert.notEqual(names(['a', 'c', 'eb', 'g']).indexOf('Am7b5'), -1);
    },

    'f#, a#, c, e# is F#maj7b5': function() {
      assert.notEqual(names(['f#', 'a#', 'c', 'e#']).indexOf('F#maj7b5'), -1);
    },

    'd, f, a, e is Dmadd9': function() {
      assert.notEqual(names(['d', 'f', 'a', 'e']).indexOf('Dmadd9'), -1);
    },

    'eb, g, b, db is Eb7#5': function() {
      assert.notEqual(names(['eb', 'g', 'b', 'db']).indexOf('Eb7#5'), -1);
    },

    'b, e, f#, a is B7sus4': function() {
      assert.notEqual(names(['b', 'e', 'f#', 'a']).indexOf('B7sus4'), -1);
    },

    'e, g#, bb, d is E7b5': function() {
      assert.notEqual(names(['e', 'g#', 'bb', 'd']).indexOf('E7b5'), -1);
    },

    'd, f, ab, cb is Ddim7': function() {
      assert.notEqual(names(['d', 'f', 'ab', 'cb']).indexOf('Ddim7'), -1);
    },

    'c, eb, gb, bbb is Cdim7': function() {
      assert.notEqual(names(['c', 'eb', 'gb', 'bbb']).indexOf('Cdim7'), -1);
    }
  },

  'piu.name() parenthesis insertion': {
    'd, eb, g, b is G(b6)': function() {
      assert.notEqual(names(['d', 'eb', 'g', 'b']).indexOf('G(b6)'), -1);
    },

    'ab, c, eb, fb is Ab(b6)': function() {
      assert.notEqual(names(['ab', 'c', 'eb', 'fb']).indexOf('Ab(b6)'), -1);
    }
  },

  'piu.infer() with enharmonic inferring enabled': {
    'd, f, ab, cb is enharmonic equivalent to 4 dim7 chords': function() {
      assert.equal(has(names(['d', 'f', 'ab', 'cb'], true),
        ['Ddim7', 'Fdim7', 'Abdim7', 'Bdim7']), true);
    }
  },

  'piu.infer ignore identical (octave-agnostic) notes': {
    'd, f, a, D only infers *one* Dm': function() {
      assert.equal(names(['d', 'f', 'a', 'D']).length, 1);
    }
  }
}).export(module);
