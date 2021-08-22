const express = require('express');
const app = express();

const port = 3000;

app.use(express.json());

const filmes = [
    "Cap América",
    "Capitã Marvel",
    "O Incrível Hulk",
    "Homem de Ferro",
    "Homem de Ferro 2"
];

app.get('/', (req, res) => {
    res.send('Hello, Bluemer!');
});

app.get('/filmes', (req,res) => {
    res.send(filmes);
});

app.get('/filmes/:id', (req, res) => {
    const id = req.params.id -1;
    const filme = filmes[id];

    if (!filme){
        res.send('Filme não encontrado');
    }
    res.send(filme);
});

// rota que cadastra um novo filme:
//LISTA - GET
//CRIAR - POST
//ATUALIZAR - PUT
//DELETAR - DELETE
//Api não sabe qual filme ta vindo

app.post('/filmes', (req, res) => {
    const filme = req.body.filme;
    const id = filmes.length;
    filmes.push(filme);

    res.send(`Filme adicionado com sucesso: ${filme}. O ID do filme é ${id}.`)
});


app.put('/filmes/:id', (req, res) => {
    const id = req.params.id -1;
    const filme = req.body.filme;
    const nomeAnterior = filmes[id];
    filmes[id] = filme;
    
    res.send(`Filme anterior ${nomeAnterior} atualizado para: ${filme}.`);

});


app.delete('/filmes/:id', (req, res) => {
    const id = req.params.id -1;
    filmes.splice(id,1);
    //delete filmes[id];

    if (!filme){
        res.send('Filme não encontrado');
    }
    delete filmes[id];
    res.send(filme);
    
});


app.listen(port, function(){
    console.log(`App rodando na porta http://localhost:${port}/`);
});

//let abacate = param => param; forma de chamar função de uma forma reduzida. Lê-se: declara variavel, que recebe o parâmetro da função "param" e retorna no console o próprio parametro "param".