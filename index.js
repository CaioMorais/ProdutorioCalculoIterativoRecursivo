const express = require('express');
const req = require('express/lib/request');
const app = express()
const port = 3000

function ProdutorioRecursivo(m,n, result){
  if(m > 0 && n >= m){
    result = ((m + (1/m)) * result);
    if(m==n){
      return {'produtorio': result}
    }
    else{
      m++;
      return ProdutorioRecursivo(m, n, result)
    }
  }
  else{
    return "Parâmetros inválidos!"
  }
}

function CalcProdutorioIterativo(m, n){
  let aux = 1;
  if(m > 0 && n > m){
    for (let index = m; index <= n; index++) {
      aux = (index+(1/index)) * aux;
    }
  }
  else{
    return "Parâmetros inválidos!"
  }
  return {'produtorio': aux}
}

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/produtorio/:m/:n/:metodo', (req,res) => {
  m = parseInt(req.params['m']) 
  n = parseInt(req.params['n'])
  metodo = req.params['metodo']
  if(metodo.toUpperCase() == 'I'){
    result = CalcProdutorioIterativo(m,n);
  }
  else if(metodo.toUpperCase() == 'R'){
    result = ProdutorioRecursivo(m, n, 1);
  }
  else{
    result = 'Método não existente'
  }
  res.send(result);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})