# 8 Puzzle Solver em Node JS


## Pré-requisitos

- **Node JS**: Para rodar a aplicação, certifique-se de ter o Node JS instalado em sua máquina local.
    - Versão recomendada: `20.3.0` (versão em que foi desenvolvido).

## Executando a Aplicação

Para rodar o programa, use o seguinte comando no terminal:
```shell script
sh run.sh
```

## Métodos de Busca Disponíveis

| N | Método de Busca                                          |
|----|----------------------------------------------------------|
| 0  | Custo Uniforme                                           |
| 1  | A* com heurística simples                                |
| 2  | A* com heurística complexa (distância de manhattan + conflito linear) |

## Tabuleiros Disponíveis

### Simples

```
4 1 2
7 3 6
0 8 5
```

### Médio

```
8 3 6
2 5 1
4 7 0
```

### Complexo

```
8 6 7
2 5 4
3 1 0
```


## Alterando o Método de Busca e Tabuleiro

Para alterar o método de busca ou selecionar um tabuleiro diferente:

1. Abra o arquivo `index.js`.
2. Modifique a variável `searchMethod` de acordo com o método desejado (baseado nos números listados em "Métodos de Busca Disponíveis" acima).
3. Comente ou descomente a variável `initialBoard` para selecionar o tabuleiro de sua preferência.
