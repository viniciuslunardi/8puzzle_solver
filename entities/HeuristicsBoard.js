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
        let distance = 0;
        for (let line = 0; line < 3; line++) {
            for (let column = 0; column < 3; column++) {
                const currentValue = this.board[line][column];
                if (currentValue !== 0) {
                    let targetXAxis = Math.floor((currentValue - 1) / 3); // posição do eixo X que o valor precisa estar
                    let targetYAxis = (currentValue - 1) % 3; // posição do eixo Y que o valor precisa estar
                    if (targetXAxis !== line && targetYAxis !== column) {
                        // se não está nem na linha nem na coluna certa, soma 2
                        distance += 2;
                    } else if ((targetXAxis === line &&  targetYAxis !== column) || (targetXAxis !== line &&  targetYAxis === column)) {
                        // se esta na linha certa ou na coluna certa, mas não é a posição final, soma 1
                        distance++;
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
        let distance = 0;
        for (let line = 0; line < 3; line++) {
            for (let column = 0; column < 3; column++) {
                const currentValue = this.board[line][column];
                if (currentValue !== 0) {
                    let targetXAxis = Math.floor((currentValue - 1) / 3); // posição do eixo X que o valor precisa estar
                    let targetYAxis = (currentValue - 1) % 3; // posição do eixo Y que o valor precisa estar
                    // distancia vira o valor da hueristica: posição atual do numero + o valor de onde ele deveria estar, que se acumula para cada posição do tabuleiro, quanto mais perto, menor
                    distance += Math.abs(line - targetXAxis) + Math.abs(column - targetYAxis);

                    // Conflito Linear nas linhas
                    if (line === targetXAxis) {
                        for (let k = column + 1; k < 3; k++) {
                            let nextValue = this.board[line][k];
                            let nextTargetXAxis = Math.floor((nextValue - 1) / 3);
                            if (line === nextTargetXAxis && currentValue > nextValue) {
                                distance += 2;
                            }
                        }
                    }

                    // Conflito Linear nas colunas
                    if (column === targetYAxis) {
                        for (let k = line + 1; k < 3; k++) {
                            let nextValue = this.board[k][column];
                            let nextTargetY = (nextValue - 1) % 3;
                            if (column === nextTargetY && currentValue > nextValue) {
                                distance += 2;
                            }
                        }
                    }
                }
            }
        }
        return distance;
    }

    /*
       Sobrescreve o method para gerar children boards de acordo com a abordagem heurística
    */
    generateChildrenBoards() {
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
