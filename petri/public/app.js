const { createApp, ref, computed, onBeforeUnmount } = Vue;

const TAM_MIN = 5;
const TAM_MAX = 50;

createApp({
  setup() {
    const tamanho = ref(10);
    const grade = ref(Life.criarGrade(10));
    const geracao = ref(0);
    const velocidade = ref(300); // ms por geração
    const rodando = ref(false);
    let timer = null;

    const vivas = computed(() => Life.contarVivas(grade.value));
    const pxCelula = computed(() => Math.max(10, Math.min(36, Math.floor(340 / tamanho.value))));

    function avancar() {
      grade.value = Life.proximaGeracao(grade.value);
      geracao.value++;
    }

    function parar() {
      clearInterval(timer);
      timer = null;
      rodando.value = false;
    }

    function iniciar() {
      if (rodando.value) return;
      rodando.value = true;
      timer = setInterval(avancar, velocidade.value);
    }

    function alternarExecucao() {
      rodando.value ? parar() : iniciar();
    }

    function passo() {
      parar();
      avancar();
    }

    function reiniciar() {
      parar();
      grade.value = Life.criarGrade(tamanho.value);
      geracao.value = 0;
    }

    function alternarCelula(i, j) {
      if (rodando.value) return; // edição só com a simulação pausada
      grade.value[i][j] = !grade.value[i][j];
    }

    function mudarTamanho() {
      let n = parseInt(tamanho.value, 10);
      if (isNaN(n)) return;
      n = Math.max(TAM_MIN, Math.min(TAM_MAX, n));
      tamanho.value = n;
      grade.value = Life.redimensionar(grade.value, n);
    }

    function mudarVelocidade() {
      if (rodando.value) {
        clearInterval(timer);
        timer = setInterval(avancar, velocidade.value);
      }
    }

    onBeforeUnmount(parar);

    return {
      tamanho, grade, geracao, velocidade, rodando, vivas, pxCelula,
      TAM_MIN, TAM_MAX,
      alternarExecucao, passo, reiniciar, alternarCelula, mudarTamanho, mudarVelocidade,
    };
  },
}).mount('#app');
