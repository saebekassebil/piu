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
  if (first.length !== second.length) return false;

  for (var i = 0, length = first.length; i < length; i++)
    if (first[i] !== second[i]) return false;

  return true;
}

// Get all possible triad combinations of a set of notes
module.exports = exports = function(notes) {
  var combs = [], triads = [], thirds, fifth, type;

  // Get all k combinations and each of their permutations
  combi.k_combinations(notes, 3).forEach(function(comb) {
    combi.permutate(comb).forEach(function(perm) {
      combs.push(perm);
    });
  });

  combs.forEach(function(triad) {
    third = triad[0].interval(triad[1]);
    third = third.direction() === 'down' ? third.invert().simple(true) : third.simple();
    fifth = triad[0].interval(triad[2]);
    fifth = fifth.direction() === 'down' ? fifth.invert().simple(true) : fifth.simple();

    for (type in kTriads) {
      if (compareArray(kTriads[type], [third, fifth]))
        triads.push({ notes: triad, type: type });
    }
  });

  return triads;
}
