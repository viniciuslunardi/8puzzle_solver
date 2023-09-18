import Board from './Board.js';
import HeuristicsBoard from './HeuristicsBoard.js';

export default class Game {
    constructor(initialBoard, searchMethod = 0) {
        this.initialBoard = initialBoard;
        this.searchMethods = {
            0: this.uniformCostSearch,
            1: this.heuristicSearch,
            2: this.heuristicSearch,
        }

        this.searchMethod = searchMethod;
        this.searchMethodFunc = this.searchMethods[searchMethod];
        this.visitedBoards = new Set();
        this.nodesVisited = 0;
        this.notExploredBoards = 0;
    }

    printSolution(node) {
        const moves = [];
        const boards = [];
        while (node.parent) {
            moves.push(node.move);
            boards.push(node.board);
            node = node.parent;
        }
        return { moves: moves.reverse(), boards: boards.reverse() };
    }

    displaySolution(movesAndBoards) {
        const { moves, boards } = movesAndBoards;

        if (moves.length === 0) {
            console.log("Sem movimentos necessários");
            this.printBoard(boards[0]);
        } else {
            moves.forEach((move, index) => {
                console.log(`Step ${index + 1}: Move 0  ${move}`);
                this.printBoard(boards[index]);
            });
            console.log("Passos para resolver o jogo:", moves.length);
        }
    }

    printBoard(board) {
        console.log('---------');
        for (let row of board) {
            console.log('| ' + row.join(' ') + ' |');
        }
        console.log('---------');
    }

    heuristicSearch() {
        this.searchMethod === 1 ? console.log('MÉTODO DE BUSCA HEURÍSTICA A* SIMPLES') : console.log('MÉTODO DE BUSCA HEURÍSTICA A* COM MELHOR HEURÍSTICA');
        const openList = this.searchMethod === 1 ? [new HeuristicsBoard(this.initialBoard)] : [new HeuristicsBoard(this.initialBoard, null, '', false)];

        while (openList.length > 0) {
            openList.sort((a, b) => a.totalCost - b.totalCost); // ordena baseado na hueristica e o custo do nó
            let currentNode = openList.shift(); // pega o primeiro nó (mais promissor) para seguir executando, remove ele dos nodos abertos

            this.nodesVisited++;  // Incrementa o contador de nós visitados, agora o currentNode foi visitado
            if (currentNode.isGoal()) {
                this.notExploredBoards = openList.length;
                return this.printSolution(currentNode);
            }

            this.visitedBoards.add(JSON.stringify(currentNode.board));
            currentNode.generateChildrenBoards(); // gera as jogadas possíveis a partir do nodo atual
            currentNode.children.forEach(child => {
                if (!this.visitedBoards.has(JSON.stringify(child.board))) {
                    openList.push(child);
                }``
            });
        }

        console.log(`Total de nodos (tabuleiros) visitados: ${this.nodesVisited}`);
        return null;
    }

    uniformCostSearch() {
        console.log('MÉTODO DE BUSCA UNIFORME');
        const openList = [new Board(this.initialBoard)];


        while (openList.length > 0) {
            openList.sort((a, b) => a.cost - b.cost);

            const currentNode = openList.shift();

            this.nodesVisited++;

            if (currentNode.isGoal()) {
                this.notExploredBoards = openList.length;
                return this.printSolution(currentNode);
            }

            this.visitedBoards.add(JSON.stringify(currentNode.board));
            currentNode.generateChildrenBoards();

            currentNode.children.forEach(child => {
                if (!this.visitedBoards.has(JSON.stringify(child.board))) {
                    openList.push(child);
                }
            });
        }

        console.log(`Total de nodos (tabuleiros) visitados: ${this.nodesVisited}`);
        return null;
    }

    play() {
        console.time('Tempo de execução');
        const solution = this.searchMethodFunc();
        this.displaySolution(solution);

        console.log(`Total de nodos (tabuleiros) visitados: ${this.nodesVisited}`);
        console.log(`Tamanho da fronteira: ${this.notExploredBoards}`);
        console.timeEnd('Tempo de execução');
    }
}
