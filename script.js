document.addEventListener("DOMContentLoaded", () => {

    document.querySelectorAll(".disk").forEach(disk => {
        disk.textContent = `${disk.dataset.weight}`;
    });
    let rods = document.querySelectorAll('.rod');
    let selectedDisk = null;
    let moveCount = 0;

    const moveCounterDisplay = document.getElementById('move-counter');

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
        if (lastRod.children.length === 4) {
            let message;
            if (moveCount === 15) {
                message = "Mükemmel! Optimal çözümde tamamladın! 🎯";
                startConfetti();
            } else if (moveCount <= 20) {
                message = "Güzel iş! Ama biraz daha hızlı olabilirsin! 🔥";
            } else if (moveCount <= 30) {
                message = "Fena değil ama geliştirmeye açık! 😏";
            } else {
                message = "Bu kadar sürede mi bitirdin? Tekrar dene! 😂";
            }
            setTimeout(() => alert(message), 300);
        }
    }

    function startConfetti() {
        confetti({
            particleCount: 200,
            spread: 100
        });
    }
});


function startConfetti() {
    const canvas = document.getElementById("confetti");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];

    for (let i = 0; i < 100; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 4 + 1,
            d: Math.random() * 4
        });
    }

    function drawConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "rgba(255, 0, 0, 0.8)";
        ctx.beginPath();
        for (let i = 0; i < particles.length; i++) {
            let p = particles[i];
            ctx.moveTo(p.x, p.y);
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, false);
        }
        ctx.fill();
        updateConfetti();
    }

    function updateConfetti() {
        for (let i = 0; i < particles.length; i++) {
            let p = particles[i];
            p.y += p.d;
            if (p.y > canvas.height) {
                p.y = 0;
                p.x = Math.random() * canvas.width;
            }
        }
    }

    function animateConfetti() {
        drawConfetti();
        requestAnimationFrame(animateConfetti);
    }

    animateConfetti();
}
