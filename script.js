// Fortune Data

const fortunes = [
    "A great financial wind blows your way",
    "Beware of a trickster hiding behind a smile",
    "An unexpected email will alter your week",
    "A new friendship will bring you unexpected joy",
    "Your hard work will soon be rewarded",
    "A mysterious opportunity will appear when you least expect it",
    "Someone from your past will return with important news",
    "Trust your instincts when making your next big decision",
    "A journey will lead you toward an exciting discovery",
    "Good fortune will find you when you stop looking for it"
];


// Starts completely empty
const pastReadings = [];


// Get Html Element

const fortuneForm = document.getElementById("fortuneForm");
const nameInput = document.getElementById("name");
const zodiacInput = document.getElementById("zodiac");

const summary = document.getElementById("summary");
const tarotCards = document.getElementById("tarotCards");

const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const sortButton = document.getElementById("sortButton");

const searchResult = document.getElementById("searchResult");
const fortuneArchive = document.getElementById("fortuneArchive");


// Destiny Teller

fortuneForm.addEventListener("submit", function(event) {

    // Prevent page from refreshing
    event.preventDefault();

    const name = nameInput.value.trim();
    const zodiac = zodiacInput.value;


    // Validate Name

    if (name === "") {

        alert("Please enter your name before revealing your fate.");

        return;

    } else {

        console.log("Name entered:", name);

    }

    // COSMIC LUCK SCORE
    // Random number from 1 - 100

    const luckScore = Math.floor(Math.random() * 100) + 1;


    // Ternary Operator

    const status = luckScore > 50 ? "Blessed" : "Cursed";


    // Display Summary

    summary.innerHTML = `
        <p>
            Welcome, <strong>${name}</strong>!
        </p>

        <p>
            Zodiac Sign: <strong>${zodiac || "Unknown"}</strong>
        </p>

        <p>
            Your Cosmic Luck Score is:
            <strong>${luckScore}/100</strong>
        </p>

        <p class="${status === "Blessed" ? "blessed" : "cursed"}">
            Your cosmic status is:
            <strong>${status}</strong>
        </p>
    `;


    // 3 distinct fortune

    const selectedFortunes = [];


    while (selectedFortunes.length < 3) {

        const randomIndex = Math.floor(
            Math.random() * fortunes.length
        );

        const randomFortune = fortunes[randomIndex];


        // Make sure we don't select the same fortune twice

        if (!selectedFortunes.includes(randomFortune)) {

            selectedFortunes.push(randomFortune);

        }

    }


    // Display tarot Card

    tarotCards.innerHTML = "";

    selectedFortunes.forEach(function(fortune, index) {

        const card = document.createElement("div");

        card.classList.add("tarot-card");

        card.innerHTML = `
            <h3>Card ${index + 1}</h3>
            <p>${fortune}</p>
        `;

        tarotCards.appendChild(card);

    });


    // Save reading

    pastReadings.push({
        name: name,
        zodiac: zodiac,
        luckScore: luckScore,
        status: status,
        cards: selectedFortunes
    });


    console.log("Past Readings:", pastReadings);

});


// ========================================
// DISPLAY FORTUNE ARCHIVE
// ========================================

function displayFortunes() {

    fortuneArchive.innerHTML = "";

    fortunes.forEach(function(fortune) {

        const item = document.createElement("div");

        item.classList.add("archive-item");

        item.textContent = fortune;

        fortuneArchive.appendChild(item);

    });

}


// Show fortunes when page loads
displayFortunes();


// ========================================
// SEARCH FORTUNES
// ========================================

searchButton.addEventListener("click", function() {

    const searchTerm = searchInput.value.trim().toLowerCase();


    if (searchTerm === "") {

        searchResult.textContent = "Please enter a keyword to search.";

        return;

    }

    // ========================================
    // ARRAY.FIND() + STRING.INCLUDES()
    // ========================================

    const foundFortune = fortunes.find(function(fortune) {

        return fortune.toLowerCase().includes(searchTerm);

    });

    if (foundFortune) {

        searchResult.innerHTML = `
            ✨ Fortune found:
            <strong>${foundFortune}</strong>
        `;

    } else {

        searchResult.textContent =
            "The cosmos could not find a fortune containing that word.";

    }

});

sortButton.addEventListener("click", function() {

    fortunes.sort();

    displayFortunes();

});

// galaxy stars

const starField = document.getElementById("starField");

// Create 180 stars

for (let i = 0; i < 180; i++) {

    const star = document.createElement("div");

    star.classList.add("star");

    // Randomly make some stars larger

    if (Math.random() > 0.85) {
        star.classList.add("large");
    }

    // Random position

    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";


    // Random animation speed

    star.style.animationDuration =
        2 + Math.random() * 4 + "s";


    // Random animation delay

    star.style.animationDelay =
        Math.random() * 5 + "s";


    starField.appendChild(star);
}

function createCosmicExplosion() {

    const explosion =
        document.getElementById("cosmicExplosion");


    // Remove old explosion particles

    explosion.innerHTML = "";

    // Create 70 particles

    for (let i = 0; i < 70; i++) {

        const star =
            document.createElement("div");

        star.classList.add("explosion-star");

        // Random direction

        const angle =
            Math.random() * Math.PI * 2;


        // Random distance

        const distance =
            100 + Math.random() * 500;


        const x =
            Math.cos(angle) * distance;

        const y =
            Math.sin(angle) * distance;


        star.style.left = "50%";
        star.style.top = "45%";


        star.style.setProperty(
            "--x",
            `${x}px`
        );

        star.style.setProperty(
            "--y",
            `${y}px`
        );

        // Random delay

        star.style.animationDelay =
            Math.random() * 0.2 + "s";

        explosion.appendChild(star);
    }
    // Remove particles after animation

    setTimeout(function() {

        explosion.innerHTML = "";

    }, 1500);
}