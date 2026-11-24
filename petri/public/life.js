// Lógica de evolução da população (independente da interface).
(function (root) {
  function criarGrade(n) {
    return Array.from({ length: n }, () => Array(n).fill(false));
  }

  // Conta vizinhas vivas; bordas não se conectam (só vizinhas dentro da grade).
  function contarVizinhas(grade, i, j) {
    const n = grade.length;
    let total = 0;
    for (let di = -1; di <= 1; di++) {
      for (let dj = -1; dj <= 1; dj++) {
        if (di === 0 && dj === 0) continue;
        const a = i + di, b = j + dj;
        if (a >= 0 && a < n && b >= 0 && b < n && grade[a][b]) total++;
      }
    }
    return total;
  }

  // Calcula a próxima geração em uma matriz separada e a devolve.
  function proximaGeracao(atual) {
    const n = atual.length;
    const proxima = criarGrade(n);
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        const v = contarVizinhas(atual, i, j);
        proxima[i][j] = atual[i][j] ? (v === 2 || v === 3) : v === 3;
      }
    }
    return proxima;
  }

  function contarVivas(grade) {
    return grade.reduce((s, l) => s + l.filter(Boolean).length, 0);
  }

  // Redimensiona preservando as células que ainda cabem.
  function redimensionar(grade, n) {
    const nova = criarGrade(n);
    const m = Math.min(n, grade.length);
    for (let i = 0; i < m; i++)
      for (let j = 0; j < m; j++) nova[i][j] = grade[i][j];
    return nova;
  }

  const Life = { criarGrade, contarVizinhas, proximaGeracao, contarVivas, redimensionar };
  if (typeof module !== 'undefined' && module.exports) module.exports = Life;
  else root.Life = Life;
})(this);
