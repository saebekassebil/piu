var vows    = require('vows')
  , assert  = require('assert')
  , teoria  = require('teoria')
  , piu     = require('../index');

function names(notes) {
  return piu.infer(notes.map(teoria.note)).map(piu.name);
}

vows.describe('più name inference').addBatch({
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
  }
}).export(module);
