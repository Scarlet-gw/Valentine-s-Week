document.addEventListener("DOMContentLoaded", function() {
    const checkpoints = document.querySelectorAll(".checkpoint");
    const progressLine = document.querySelector(".progress-line");

    // Get today's date in DD/MM/YYYY format
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-GB');

    let activeCount = 0;

    checkpoints.forEach((button, index) => {
        const buttonDate = button.getAttribute("data-date");
        const link = button.getAttribute("data-link");
        const message = button.getAttribute("data-message");

        if (formattedDate >= buttonDate) {
            button.classList.add("active");
            button.style.background = "red";
            button.onclick = () => smoothNavigate(link);
            activeCount = index + 1;
        } else {
            button.onclick = () => alert(message || "This event is not available yet!");
        }
    });

    // Adjust the progress bar width to align with first and last unlocked checkpoint
    if (activeCount > 1) {
        let progressPercent = ((activeCount - 1) / (checkpoints.length - 1)) * 100;
        progressLine.style.left = "6%";
        progressLine.style.width = "88%";
        progressLine.style.background = `linear-gradient(to right, green ${progressPercent}%, rgba(255, 255, 255, 0.5) ${progressPercent}%)`;
    }

    function smoothNavigate(url) {
        document.body.classList.add("fade-out");
        setTimeout(() => {
            window.location.href = url;
        }, 800);
    }
});