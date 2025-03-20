import Deque from "linked-deque";


function knightMoves(start, target) {
    const boardSide = 8;

    const moves = shortestPath(start[0], start[1], boardSide, target[0], target[1]);
    if (moves === -1) {
        console.log("Invalid start or end. Make sure that the positions are between 0-7 inclusive.");
        return [];
    }

    const path = knightPath(start[0], start[1], moves, boardSide, target[0], target[1], null, null);
    path.reverse();

    const movesWord = (moves !== 1) ? "moves" : "move";
    console.log(`You made it in ${moves} ${movesWord}! Your path is: `);
    console.log(path);

    return path;
};



// A function that returns the number of moves in the shortest path from one position to a target position.
function shortestPath(sRow, sCol, boardSize, tRow, tCol) {

    const deque = new Deque();
    deque.push([sRow, sCol, 0]);
    const visited = new Set();
    visited.add(JSON.stringify([sRow, sCol]));

    while (deque.length > 0) {
        const pos = deque.popleft();
        const row = pos[0];
        const col = pos[1];
        const distance = pos[2];
        if (row === tRow && col === tCol) {
            return distance;
        }

        const neighbors = [
            [row - 1, col - 2], [row - 1, col + 2],
            [row + 1, col - 2], [row + 1, col + 2],
            [row - 2, col - 1], [row - 2, col + 1],
            [row + 2, col - 1], [row + 2, col + 1]
        ];

        for (let neighbor of neighbors) {
            const nr = neighbor[0];
            const nc = neighbor[1];
            const rowValid = nr >= 0 && nr < boardSize;
            const colValid = nc >= 0 && nc < boardSize;
            const stringKey = JSON.stringify(neighbor);
            if (rowValid && colValid && !visited.has(stringKey)) {
                visited.add(stringKey);
                deque.push([nr, nc, distance + 1]);
            }
        }

    }

    return -1;
};



// A function that returns an array of positions from one position to a target position given a max number of moves.
function knightPath(row, col, moves, boardSize, tRow, tCol, prevRow, prevCol) {
    if (row == tRow && col === tCol) {
        return [[row, col]];
    }
    if (moves === 0) {
        return [];
    }

    const neighbors = [
        [row - 1, col - 2], [row - 1, col + 2],
        [row + 1, col - 2], [row + 1, col + 2],
        [row - 2, col - 1], [row - 2, col + 1],
        [row + 2, col - 1], [row + 2, col + 1]
    ];

    const path = [];
    for (let neighbor of neighbors) {
        const nr = neighbor[0];
        const nc = neighbor[1];
        const rowValid = nr >= 0 && nr < boardSize;
        const colValid = nc >= 0 && nr < boardSize;
        if (rowValid && colValid && (nr !== prevRow && nc !== prevCol)) {
            const result = knightPath(nr, nc, moves - 1, boardSize, tRow, tCol, row, col);
            for (let pos of result) {
                path.push(pos);
            }
            if (path.length > 0) {
                break;
            }
        }
    }

    if (path.length > 0) {
        path.push([row, col]);
    }
    return path;
};


export default knightMoves;
