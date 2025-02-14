document.addEventListener("DOMContentLoaded", () => {
    const rods = document.querySelectorAll('.rod');
    const moveCounterDisplay = document.getElementById('move-counter');
    const diskSelect = document.getElementById('disk-select');
    let selectedDisk = null;
    let moveCount = 0;
    let diskCount = 4;

    function initializeGame() {
        moveCount = 0;
        moveCounterDisplay.textContent = `Hamle Sayısı: ${moveCount}`;
        rods.forEach(rod => rod.innerHTML = '');
        
        diskCount = parseInt(diskSelect.value);
        let rod1 = document.getElementById('rod1');

        for (let i = diskCount; i >= 1; i--) {
            let disk = document.createElement('div');
            disk.classList.add('disk', `w${i}`);
            disk.dataset.weight = i;
            disk.textContent = i;
            rod1.appendChild(disk);
        }
    }

    function getTopDisk(rod) {
        return rod.querySelector('.disk:last-child');
    }

    function canPlaceDisk(rod, disk) {
        let topDisk = getTopDisk(rod);
        return !topDisk || parseInt(topDisk.dataset.weight) > parseInt(disk.dataset.weight);
    }

    function moveDisk(disk, targetRod) {
        if (canPlaceDisk(targetRod, disk)) {
            targetRod.appendChild(disk);
            moveCount++;
            moveCounterDisplay.textContent = `Hamle Sayısı: ${moveCount}`;
            checkWin();
        }
    }

    rods.forEach(rod => {
        rod.addEventListener('click', function () {
            let topDisk = getTopDisk(rod);
            if (selectedDisk) {
                moveDisk(selectedDisk, rod);
                selectedDisk.classList.remove('selected');
                selectedDisk = null;
            } else if (topDisk) {
                selectedDisk = topDisk;
                selectedDisk.classList.add('selected');
            }
        });
    });

    function checkWin() {
        let lastRod = document.getElementById('rod3');
        if (lastRod.children.length === diskCount) {
            let optimalMoves = Math.pow(2, diskCount) - 1;
            let message;
            if (moveCount === optimalMoves) {
                message = `Mükemmel! Optimal çözümde tamamladın! 🎯 (${optimalMoves} hamle)`;
                startConfetti();
            } else if (moveCount <= optimalMoves + 5) {
                message = "Güzel iş! Ama biraz daha hızlı olabilirsin! 🔥";
            } else if (moveCount <= optimalMoves + 15) {
                message = "Fena değil ama geliştirmeye açık! 😏";
            } else {
                message = "Bu kadar sürede mi bitirdin? Tekrar dene! 😂";
            }
            setTimeout(() => alert(message), 300);
        }
    }

    function startConfetti() {
        confetti({ particleCount: 200, spread: 100 });
    }

    diskSelect.addEventListener("change", initializeGame);
    initializeGame();
});
