const playerMain = document.querySelector('.player');
const opponentMain = document.querySelector('.opponent');
const opponentText = document.querySelector('.opponent-text');
const playerText = document.querySelector('.player-text');
const gameText = document.querySelector('.game-text');

export function fillGridShow(board, opponent) {
    const classes = ['empty', 'ship1', 'ship2', 'ship3', 'ship4', 'ship5', 'miss', 'hit'];
    const list = [];
    for (let i = 0; i < 10; ++i) {
        for (let j = 0; j < 10; ++j) {
            const div = document.createElement('div');
            div.className = classes[board[i][j]];
            div.dataset.x = j;
            div.dataset.y = i;
            list.push(div);
        }
    }
    (opponent ? opponentMain : playerMain).replaceChildren(...list);
}

export function fillGridSecret(board, opponent) {
    const list = [];
    for (let i = 0; i < 10; ++i) {
        for (let j = 0; j < 10; ++j) {
            const div = document.createElement('div');
            switch (board[i][j]) {
                case 6:
                    div.className = 'hit';
                    break;
                case 7:
                    div.className = 'miss';
                    break;
                default:
                    div.className = 'empty';
                    break;
            }
            div.dataset.x = j;
            div.dataset.y = i;
            list.push(div);
        }
    }
    (opponent ? opponentMain : playerMain).replaceChildren(...list);
}

export async function opponentSays(msg) {
    opponentText.textContent = msg;
}

export async function humanSays(msg) {
    playerText.textContent = msg;
}

export function gameSays(msg) {
    gameText.textContent = msg;
}
