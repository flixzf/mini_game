document.addEventListener('DOMContentLoaded', () => {
    const boxesContainer = document.getElementById('boxes-container');
    const resetButton = document.getElementById('reset-button');
    const messageDisplay = document.getElementById('message');

    const totalBoxes = 8; // 상자 개수
    let winningBoxIndex = -1;
    let gameActive = true;

    function initializeGame() {
        boxesContainer.innerHTML = ''; // 기존 상자 제거
        messageDisplay.textContent = ''; // 메시지 초기화
        gameActive = true;
        resetButton.disabled = true; // 다시하기 버튼 비활성화

        winningBoxIndex = Math.floor(Math.random() * totalBoxes); // 당첨 상자 무작위 선택

        for (let i = 0; i < totalBoxes; i++) {
            const box = document.createElement('div');
            box.classList.add('box');
            box.dataset.index = i; // 상자 인덱스 저장
            box.textContent = `BOX ${i + 1}`;
            box.addEventListener('click', handleBoxClick);
            boxesContainer.appendChild(box);
        }
    }

    function handleBoxClick(event) {
        if (!gameActive) return; // 게임 비활성화 시 클릭 무시

        const clickedBox = event.target;
        const clickedIndex = parseInt(clickedBox.dataset.index);

        gameActive = false; // 한 번 클릭하면 게임 비활성화

        // 모든 상자 클릭 비활성화
        Array.from(boxesContainer.children).forEach(box => {
            box.removeEventListener('click', handleBoxClick);
            box.style.cursor = 'default';
        });

        if (clickedIndex === winningBoxIndex) {
            clickedBox.classList.add('win');
            messageDisplay.textContent = '축하합니다! 당첨되었습니다!';
        } else {
            clickedBox.classList.add('lose');
            messageDisplay.textContent = '아쉽네요! 다음 기회에...';
            // 당첨 상자도 보여주기
            Array.from(boxesContainer.children).forEach(box => {
                if (parseInt(box.dataset.index) === winningBoxIndex) {
                    box.classList.add('win');
                }
            });
        }
        resetButton.disabled = false; // 다시하기 버튼 활성화
    }

    resetButton.addEventListener('click', initializeGame);

    // 게임 초기화
    initializeGame();
});