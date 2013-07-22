var possibleTriads = require('./triads');

module.exports = exports = function(notes) {
  var triads = possibleTriads(notes), chords = [];

  triads.forEach(function(triad) {
    var indexes = triad.notes.map(function(n) { return n.toString() });

    var exts = notes.filter(function(note) {
      return indexes.indexOf(note.toString()) === -1; 
    }).map(function(note) {
      return triad.notes[0].interval(note)
    });

    var root = triad.notes[0], extensions = [];
    for (var i = 0, length = exts.length; i < length; i++) {
      var ext = exts[i].direction() === 'down' ?  exts[i].invert() : exts[i];
      var num = ext.number();

      if (num === 2 || num === 4)
        ext.coord[0]++;
      else if (num === 3 && triad.type.indexOf('sus') !== -1)
        return; // No thirds in sus chords

      extensions.push(ext);
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
}
