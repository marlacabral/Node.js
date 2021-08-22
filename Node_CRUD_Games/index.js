const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());


const getGamesValidos = () => games.filter(Boolean);
const getGameById = (id) => getGamesValidos().find((game) => game.id === id);
const getIndexByGame = (id) => getGamesValidos().findIndex((game) => game.id === id);

const games = [
    {
        id: 1,
        nome: "Mario Bros",
        imagemUrl: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fjovempan.com.br%2Fentretenimento%2Ftv-e-cinema%2Fsuper-mario-bros-vai-ganhar-animacao-para-o-cinema.html&psig=AOvVaw3qfx4mlxEyU2f4UBx9PZ7B&ust=1629670854030000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCNiCq5aTw_ICFQAAAAAdAAAAABAD",

    },
    {
        id: 2,
        nome: "Bomberman",
        imagemUrl: "http://s2.glbimg.com/8loMEz6b3F-PHvQwJxcx2t5FF8w=/695x0/s.glbimg.com/po/tt2/f/original/2014/10/27/bomberman-imagem-divulgacao.jpg",
    },
    {
        id: 3,
        nome: "Top Gear",
        imagemUrl: "https://s2.glbimg.com/7wRs2j2dg9fbZpdIRG5TkSEMPSA=/0x0:913x579/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2020/l/A/zPe6OzRnitN3F1rd77Gw/captura-de-tela-2020-04-24-as-10.06.52.png",
    },
];

app.get('/', (req, res) => {
    res.send('Bem vindos aos GAMES!');
});

app.get('/games', (req, res) => {
    res.send(getGamesValidos());
});

app.get('/games/:id', (req, res) => {
    const id = req.params.id;
    const game = getGameById(id);

    if (!game){
        res.send("ID inválido, tente novamente.");
    }
    else{
        res.send(game);
    }
});

//rota de cadastro de um novo game
app.post("/games", (req, res) => {
    const game = req.body;
  
    if(!game || !game.nome || !game.imagemUrl){
        res.status(400).send({
            message:"Game inválido. Tente novamente.",
        });
        return;
    }
  
    const ultimoGame = games[games.length -1];
  
    if(games.length){
        game.id = ultimoGame.id +1;
        games.push(game);
    }else{
        game.id = 1;
        games.push(game);
    }
    
    res.send(`Game adicionado com sucesso: ${game.nome}. 
    O ID do game é ${game.id}.`);
  });
  
//rota de atualizacao de um game
app.put("/games/:id", (req, res) => {
    const id = +req.params.id - 1;
    const gameIndex = getIndexByGame(id);
  
    if (gameIndex < 0){
        res.status(404).send({
            message: "O game não foi encontrado, tente novamente."
        });
        return;
    }
    const novoGame = req.body;
  
    if(!Object.keys(novoGame).length){
        res.status(400).send({
            message: "O body esta vazio."
        });
        return;
    }

    if(!novoGame || !novoGame.nome || !novoGame.imagemUrl){
     res.status(400).send({
         message: "Game inválido, tente novamente."
     });
     return;   
    }

    const game = getGameById(id);
  
    games[gameIndex] = {
      ...game,
      ...novoGame,

    };
  
    res.send(games[gameIndex]);
});
  
  //rota de remocao de um game
app.delete("/games/:id", (req, res) => {
    const id = +req.params.id;
    const gameIndex = getIndexByGame(id);
  
    if(gameIndex < 0){
        res.status(404).send({
            message: "Game não encontrado, tente novamente."
        });
        return;
    }
    games.splice(gameIndex, 1);
    res.send({
        message:"Game removido com sucesso."
    });
  });
  
app.listen(port, () => {
    console.info(`App rodando em: http://localhost:${port}/`)
});
