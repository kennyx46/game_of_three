export const getGame =  async (id) => {
    const res = await fetch(`/api/game/${id}`);
    const { game } = await res.json();
    return game;
};

export const startGame =  async () => {
    const res = await fetch('/api/game', {
      method: 'POST',
    });
    const { game } = await res.json();
    return game;
}

export const makeMove = async (game, body) => {
    const res = await fetch(`/api/game/${game.id}/move`, {
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      method: 'POST',
      body: JSON.stringify(body)
    });
    const resBody = await res.json();
    return resBody.game;
}

export default {
    startGame,
    getGame,
    makeMove,
}
