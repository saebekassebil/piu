var possibleTriads  = require('./triads')
  , combi           = require('./combinatorics');

module.exports = function infer(notes, enharmonics) {
  var triads, chords = [];

  if (enharmonics) {
    var n = notes.length;
    notes = notes.map(function(note) {
      return [note].concat(note.enharmonics());
    });

    // Flatten it
    notes = [].concat.apply([], notes);

    chords = combi.k_combinations(notes, n).map(function(notecombi) {
      return infer(notecombi);
    });

    return [].concat.apply([], chords);
  }

  // Special case for power-chords (which aren't actual chords)
  if (notes.length === 2) {
    var root = notes[0], interval = root.interval(notes[1])
      , val = interval.value(), num = Math.abs(val);

    if ((num !== 4 && num !== 5) || interval.quality() !== 'P')
      return [];

    if (val === -5 || val === 4)
      root = notes[1];

    return [{
      root: root.name().toUpperCase() + root.accidental(),
      type: '5',
      exts: []
    }];
  }

  triads = possibleTriads(notes);
  triads.forEach(function(triad) {
    var indexes = triad.notes.map(function(n) { return n.toString(true); });
    var chromas = triad.notes.map(function(n) { return n.chroma(); });
    var root = triad.notes[0], extensions = [];

    var exts = notes.filter(function(note) {
      return indexes.indexOf(note.toString(true)) === -1;
    });

    for (var i = 0, length = exts.length; i < length; i++) {
      var ext = exts[i];
      var interval = root.interval(ext);
      if (chromas.indexOf(ext.chroma()) !== -1 ||
          Math.abs(interval.qualityValue()) > 2) return;

      interval = interval.direction() === 'down' ?  interval.invert() : interval;
      var q = interval.quality();
      var num = interval.number();

      if (num === 2 || num === 4)
        interval.coord[0]++;
      else if (num === 3 && triad.type.indexOf('sus') !== -1)
        return; // No thirds in sus chords
      else if (q === 'A' && num !== 2 && num !== 4)
        return;
      else if (q === 'd' && num !== 4 && !(num === 7 && triad.type === 'dim'))
        return;
      else if (q === 'dd' || q === 'AA')
        return;

      extensions.push(interval);
    }

    // Sort descending
    extensions.sort(function(a, b) { return b.number() - a.number(); });

    chords.push({
      root: root.name().toUpperCase() + root.accidental(),
      type: triad.type,
      exts: extensions
    });
  });

  return chords;
};
