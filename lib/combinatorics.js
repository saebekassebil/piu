// Return all combinations of k elements in set of length n
exports.k_combinations = function k_combinations(set, k) {
  var i, j, combs = [], head, tailcombs, n = set.length, x;

  if (k > n || k <= 0) return combs;
  if (k === n) return [set];
  if (k === 1) return set.map(function(el) { return [el]; });

  for (i = 0; i < (n - k + 1); i++) {
    head = [set[i]];
    tailcombs = k_combinations(set.slice(i + 1), k - 1);

    for (j = 0, x = tailcombs.length; j < x; j++) {
      combs.push(head.concat(tailcombs[j]));
    }
  }

  return combs;
};

// Return all permutations of the set
exports.permutate = function permutate(set) {
  function p(set, index, callback) {
    // Swap elements i1 and i2 in array a[]
    function swap(a, i1, i2) {
      var t = a[i1];
      a[i1] = a[i2];
      a[i2] = t;
    }

    if (index == set.length - 1)
      callback(set);
    else {
      p(set, index + 1, callback);

      for (var i = index + 1; i < set.length; i++) {
        swap(set, i, index);
        p(set, index + 1, callback);
        swap(set, i, index);
      }
    }
  }

  if (!set || !set.length) return [];

  var permutations = [];
  p(set, 0, function(a) { permutations.push(a.slice(0)); });

  return permutations;
};
