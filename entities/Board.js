export default class Board {
    constructor(board, parent = null, move = '') {
        this.board = board;
        this.parent = parent;
        this.move = move;
        this.cost = this.parent ? this.parent.cost + 1 : 0; // custo do nodo
        this.children = []; // tabuleiros filhos gerados
        this.goal = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 0]
        ];
        this.directions = ['UP', 'DOWN', 'LEFT', 'RIGHT'];
    }

    /*
       Method that tells if the current board is the goal
    */
    isGoal() {
        return JSON.stringify(this.board) === JSON.stringify(this.goal);
    }

    /*
       Method to move the board position, generating new boards

       @param { number } x      the x position of the blank value (0)
       @param { number } y      the y position of the blank value (0)
       @param { string } diretion       the direction of the moovement ( must be: UP, DOWN, LEFT, RIGHT)
       @returns { void | Array[][] }
    */
    moveBoard(x, y, direction) {
        const newBoard = this.board.map(row => row.slice());

        switch (direction) {
            case 'UP':
                if (x > 0) { // move para cima, caso possível
                    [newBoard[x][y], newBoard[x - 1][y]] = [newBoard[x - 1][y], newBoard[x][y]];
                    return newBoard;
                }
                break;
            case 'DOWN':
                if (x < 2) { // move para baixo, caso possível
                    [newBoard[x][y], newBoard[x + 1][y]] = [newBoard[x + 1][y], newBoard[x][y]];
                    return newBoard;
                }
                break;
            case 'LEFT':
                if (y > 0) { // move para esquerda, caso possível
                    [newBoard[x][y], newBoard[x][y - 1]] = [newBoard[x][y - 1], newBoard[x][y]];
                    return newBoard;
                }
                break;
            case 'RIGHT':
                if (y < 2) { // move para direita, caso possível
                    [newBoard[x][y], newBoard[x][y + 1]] = [newBoard[x][y + 1], newBoard[x][y]];
                    return newBoard;
                }
                break;
        }

        return null;
    }

    /*
     Method that creates all the new nodes that the current board can
     generate based on all the possible moovements
    */
    generateChildrenBoards() {
        const x = this.board.findIndex(row => row.includes(0));
        const y = this.board[x].indexOf(0);

        this.directions.forEach(direction => {
            // move o tabuleiro baseado no x e y do 0 (branco) em todas as direções possíveis
            let newBoard = this.moveBoard(x, y, direction);
            if (newBoard) {
                this.children.push(new Board(newBoard, this, direction)); // gera novos tabuleiros baseado no movimento (novos nodos)
            }
        });
    }
}
