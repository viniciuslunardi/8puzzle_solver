import Game from './entities/Game.js';


(() => {

    // 0 = Uniform Cost
    // 1 = Simple Heuristic
    // 2 = Complex/better Heuristic
    //todo aq da pra fazer algo melhor
    const searchMethod = 2; // change this to use different approaches to the solution

    // 12 movimentos pra resolver
    // const initialBoard = [
    //     [4, 1, 2],
    //     [7, 3, 6],
    //     [0, 8, 5]
    // ]; // change this to get different solutions for different boards

    // 20 movimentos pra resolver
    // const initialBoard = [
    //     [8, 3, 6],
    //     [2, 5, 1],
    //     [4, 7, 0]
    // ]; // change this to get different solutions for different boards


    // 30 movimentos pra resolver
    const initialBoard = [
        [8, 6, 7],
        [2, 5, 4],
        [3, 1, 0]
    ]; // change this to get different solutions for different boards


    const game = new Game(initialBoard, searchMethod);
    game.play();

    // keeps process alive
    process.stdin.resume();
})();