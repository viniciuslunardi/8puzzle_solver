import Board from './Board.js';

export default class HeuristicsBoard extends Board {
    constructor(board, parent = null, move = '', simple = true) {
        super(board, parent, move);

        this.simple = simple;
        this.heuristic = simple ? this.simpleHeuristic() : this.complexHeuristic();
        this.totalCost = this.cost + this.heuristic; // determina o custo total do movimento do board
    }

    /*
       Basic heuristic, using only the position of the value to estimate the heuristic
    */
    simpleHeuristic() {
        // todo verificar se podemos melhorar essa implementação
        let distance = 0;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                let cellValue = this.board[i][j];
                if (cellValue !== 0) {
                    let targetX = Math.floor((cellValue - 1) / 3); // posição do eixo X que o valor precisa estar
                    let targetY = (cellValue - 1) % 3; // posição do eixo Y que o valor precisa estar
                    if (targetX !== i && targetY !== j) {
                        distance += 2; // se não está nem na linha nem na coluna certa, soma 2
                    } else if ((targetX === i &&  targetY !== j ) || (targetX !== i &&  targetY === j )) {
                        distance++; // se esta na linha certa ou na coluna certa, mas não é a posição final, soma 1
                    }
                }
            }
        }

        return distance;
    }

    /*
      Based on the Manhatan Distancy algorithm
    */
    complexHeuristic() {
        // todo verificar se podemos melhorar essa implementação
        let distance = 0;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                let cellValue = this.board[i][j];
                if (cellValue !== 0) {
                    let targetX = Math.floor((cellValue - 1) / 3); // posição do eixo X que o valor precisa estar
                    let targetY = (cellValue - 1) % 3; // posição do eixo Y que o valor precisa estar
                    // distancia vira o valor da hueristica: posição atual do numero + o valor de onde ele deveria estar, que se acumula para cada posição do tabuleiro, quanto mais perto, menor
                    distance += Math.abs(i - targetX) + Math.abs(j - targetY);
                }
            }
        }
        return distance;
    }

    /*
       Sobrescreve o method para gerar children boards de acordo com a abordagem heurística
    */
    generateChildrenBoards() {
        // todo verificar se podemos melhorar essa implementação
        const x = this.board.findIndex(row => row.includes(0));
        const y = this.board[x].indexOf(0);

        this.directions.forEach(direction => {
            // move o tabuleiro baseado no x e y do 0 (branco) em todas as direções possíveis
            let newBoard = this.moveBoard(x, y, direction);
            if (newBoard) {
                this.children.push(new HeuristicsBoard(newBoard, this, direction, this.simple)); // gera novos tabuleiros baseado no movimento (novos nodos)
            }
        });
    }
}
