// script.js
document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const restartButton = document.getElementById('restart');
    const currentPlayerDisplay = document.getElementById('current-player');
    const modal = document.getElementById('modal');
    const modalMessage = document.getElementById('modal-message');
    const closeModalButton = document.getElementById('close-modal');
    let currentPlayer = 'X';
    let gameState = ['', '', '', '', '', '', '', '', ''];
    const winningPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });

    restartButton.addEventListener('click', restartGame);
    closeModalButton.addEventListener('click', closeModal);

    function handleCellClick(event) {
        const cell = event.target;
        const cellIndex = cell.getAttribute('data-index');

        if (gameState[cellIndex] !== '' || checkWinner()) {
            return;
        }

        gameState[cellIndex] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer.toLowerCase());

        if (checkWinner()) {
            showModal(`${currentPlayer} wins!`);
            highlightWinningCells();
        } else if (gameState.every(cell => cell !== '')) {
            showModal('Draw!');
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            currentPlayerDisplay.textContent = currentPlayer;
        }
    }

    function checkWinner() {
        return winningPatterns.some(pattern => {
            return pattern.every(index => {
                return gameState[index] === currentPlayer;
            });
        });
    }

    function highlightWinningCells() {
        winningPatterns.forEach(pattern => {
            if (pattern.every(index => gameState[index] === currentPlayer)) {
                pattern.forEach(index => {
                    cells[index].style.backgroundColor = '#d4edda';
                });
            }
        });
    }

    function restartGame() {
        gameState = ['', '', '', '', '', '', '', '', ''];
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o');
            cell.style.backgroundColor = '';
        });
        currentPlayer = 'X';
        currentPlayerDisplay.textContent = currentPlayer;
        closeModal();
    }

    function showModal(message) {
        modalMessage.textContent = message;
        modal.style.display = 'flex';
    }

    function closeModal() {
        modal.style.display = 'none';
    }
});
