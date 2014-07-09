var combi = require('./combinatorics');

var kTriads = {
  '': ['M3', 'P5'],
  'm': ['m3', 'P5'],
  'aug': ['M3', 'A5'],
  'dim': ['m3', 'd5'],
  'sus2': ['M2', 'P5'],
  'sus4': ['P4', 'P5'],
  'sus2#5': ['M2', 'A5'],
  'sus2b5': ['M2', 'd5'],
  'sus4#5': ['P4', 'A5'],
  'sus4b5': ['P4', 'd5'],
  'Mb5': ['M3', 'd5'],
  'm#5': ['m3', 'A5']
};

function compareArray(first, second) {
  for (var i = 0, length = first.length; i < length; i++)
    if (first[i] !== second[i]) return false;

  return true;
}

// Get all possible triad combinations of a set of notes
module.exports = exports = function(notes) {
  var combs = [], triads = [], names = [], n = [], root, third, fifth, type;

  // Unique notes (for now, we handle all notes octave-agnostic)
  notes.forEach(function(note) {
    if (names.indexOf(note.toString(true)) === -1) {
      n.push(note);
      names.push(note.toString(true));
    }
  });

  // Get all k combinations and each of their permutations
  combi.k_combinations(n, 3).forEach(function(comb) {
    combi.permutate(comb).forEach(function(perm) {
      combs.push(perm);
    });
  });

  // Filter out triads with roots with double accidentals (Cx, Ebb, etc)
  combs
  .filter(function(triad) {
    return triad[0].name() !== triad[1].name() &&
           triad[0].name() !== triad[2].name() &&
           triad[1].name() !== triad[2].name() &&
           Math.abs(triad[0].accidentalValue()) < 2 &&
           Math.abs(triad[1].accidentalValue()) < 3 &&
           Math.abs(triad[2].accidentalValue()) < 3;
  })
  .forEach(function(triad) {
    root = triad[0];

    third = root.interval(triad[1]);
    third = third.direction() === 'down' ? third.invert().simple(true) : third.simple();
    fifth = root.interval(triad[2]);
    fifth = fifth.direction() === 'down' ? fifth.invert().simple(true) : fifth.simple();

    third = third.toString();
    fifth = fifth.toString();

    for (type in kTriads) {
      if (compareArray(kTriads[type], [third, fifth]))
        triads.push({ notes: triad, type: type });
    }
  });

  return triads;
};
