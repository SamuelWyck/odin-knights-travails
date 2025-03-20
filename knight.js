import Deque from "linked-deque";


function knightMoves(start, target) {
    const boardSide = 8;

    const steps = shortestPath(start[0], start[1], boardSide, target[0], target[1]);
    if (steps === -1) {
        return [];
    }
};


function shortestPath(sRow, sCol, boardSize, tRow, tCol) {

    const deque = new Deque();
    deque.push([sRow, sCol, 0])
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



knightMoves([0, 0], [7, 7])