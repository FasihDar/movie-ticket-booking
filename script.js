document.addEventListener("DOMContentLoaded", function () {
    const seatsContainer = document.querySelector(".seats");
    const selectedSeats = [];
    let seatPrice = 5;

    // Update seat price based on selected movie
    document.getElementById("movie").addEventListener("change", function () {
        const selectedMovie = this.options[this.selectedIndex];
        seatPrice = parseInt(selectedMovie.getAttribute("data-price"));
        updateConfirmation();
    });

    function updateAvailability() {
        const availableSeats = document.querySelectorAll(".seat.available").length;
        const selectedCount = selectedSeats.length;
        const occupiedSeats = document.querySelectorAll(".seat.occupied").length;
        updateDigitColors(document.getElementById("available"), "#696969", availableSeats);
        updateDigitColors(document.getElementById("selected"), "#00FFFF", selectedCount);
        updateDigitColors(document.getElementById("occupied"), "#FFFFFF", occupiedSeats);

    }

    function updateConfirmation() {
        const confirmationMessage = document.getElementById("confirmation-message");
        const totalSeats = selectedSeats.length;
        const totalPrice = totalSeats * seatPrice;
        confirmationMessage.innerHTML = `You have selected <span style="color: ${totalSeats > 0 ? "#00FFFF" : "black"}">${totalSeats}</span> seat(s) and the price is $<span style="color: ${totalPrice > 0 ? "#00FFFF" : "black"}">${totalPrice}</span>.`;
    }

    function updateDigitColors(element, color, count) {
        const text = String(count);
        element.innerHTML = '';
        for (const char of text) {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.color = color;
            element.appendChild(span);
        }
    }

    function toggleSeatSelection(seat) {
        if (seat.classList.contains("available")) {
            seat.classList.toggle("selected");
            const seatIndex = selectedSeats.indexOf(seat);
            if (seatIndex === -1) {
                selectedSeats.push(seat);
            } else {
                selectedSeats.splice(seatIndex, 1);
            }
            updateAvailability();
            updateConfirmation();
        }
    }

    const numSeats = 50;
    for (let i = 1; i <= numSeats; i++) {
        const seat = document.createElement("div");
        seat.classList.add("seat");
        if (Math.random() < 0.2) {
            seat.classList.add("occupied");
        } else {
            seat.classList.add("available");
        }
        seat.addEventListener("click", function () {
            toggleSeatSelection(seat);
        });
        seatsContainer.appendChild(seat);
    }

    updateAvailability();
});
