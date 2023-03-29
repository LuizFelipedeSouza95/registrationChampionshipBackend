function generateRoudeds(players) {
  const teams = [...players]; // Array de times

  // Verifica se o número de jogadores é ímpar e adiciona um jogador "Profissional"
  if (teams.length % 2 !== 0) {
    teams.push("Profissional");
  }

  const numRounds = teams.length - 1; // O número de rodadas é igual ao número de elementos - 1
  const numGamesPerRound = teams.length / 2; // Cada rodada terá metade do número total de elementos

  const rounds = { ida: [], volta: [] }; // Objeto para armazenar as rodadas de ida e volta

  // Cria as rodadas de ida e volta
  for (let k = 0; k < 2; k++) {
    for (let i = 0; i < numRounds; i++) {
      const round = [];

      // Distribui os jogos na rodada
      for (let j = 0; j < numGamesPerRound; j++) {
        const home = teams[j];
        const away = teams[teams.length - 1 - j];

        // Verifica se é a rodada de volta e inverte as posições dos times
        if (k === 1) {
          round.push({ casa: away, fora: home });
        } else {
          round.push({ casa: home, fora: away });
        }
      }

      // Rotaciona o array de times para criar a próxima rodada
      teams.splice(1, 0, teams.pop());

      // Adiciona a rodada ao objeto correspondente (ida ou volta)
      if (k === 1) {
        rounds.volta.push(round);
      } else {
        rounds.ida.push(round);
      }
    }
  }

  // Cria o objeto de rodadas no formato desejado
  const formattedRounds = {};
  rounds.ida.forEach((rodada, index) => {
    const rodadaNumber = index + 1;
    formattedRounds[`rodada${rodadaNumber}`] = rodada.map((jogo) => ({
      casa: jogo.casa,
      fora: jogo.fora,
    }));
  });
  rounds.volta.forEach((rodada, index) => {
    const rodadaNumber = index + 1;
    formattedRounds[`rodada${numRounds + rodadaNumber}`] = rodada.map(
      (jogo) => ({ casa: jogo.casa, fora: jogo.fora })
    );
  });

  return formattedRounds;
}

// exporta a função generateRoudeds como módulo da API
module.exports = { generateRoudeds };
