document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.querySelector(".search-form input");
    const searchButton = document.querySelector(".search-form button");
    const orphanages = Array.from(document.querySelectorAll(".custom-block-wrap1"));

    searchButton.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent form submission
        const searchTerm = searchInput.value.trim().toLowerCase();

        orphanages.forEach(orphanage => {
            const nameElement = orphanage.querySelector("h5");
            const orphanageName = nameElement ? nameElement.textContent.trim().toLowerCase() : "";

            if (orphanageName.includes(searchTerm)) {
                orphanage.style.display = "block"; // Show matching orphanages
            } else {
                orphanage.style.display = "none"; // Hide non-matching orphanages
            }
        });
    });

    searchInput.addEventListener("input", function () {
        if (searchInput.value.trim() === "") {
            // Show all orphanages if the input is cleared
            orphanages.forEach(orphanage => (orphanage.style.display = "block"));
        }
    });
});
