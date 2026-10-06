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
    "Good fortune will find you when you stop looking for it",
    "A small risk taken today will grow into a great reward.",
    "Words spoken in kindness will return to you tenfold.",
    "A hidden talent is ready to be discovered, so stop doubting it.",
    "Someone you admire will notice your hard work.",
    "A misplaced opportunity will find its way back to your hands.",
    "Let go of an old grudge, and a new path will appear.",
    "The answer you have been seeking will arrive in a quiet moment.",
    "Good news travels toward you from across the water.",
    "A bold decision made before the week ends will change your luck.",
    "Rest is not wasted time, because your greatest idea is still forming.",
];


// Starts completely empty
const pastReadings = [];


// Zodiac signs in order. The position in this list (1-12) is used in the score.
const zodiacSigns = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
];

// A small extra message for each sign's element
const zodiacElements = {
  Aries: "Fire", Leo: "Fire", Sagittarius: "Fire",
  Taurus: "Earth", Virgo: "Earth", Capricorn: "Earth",
  Gemini: "Air", Libra: "Air", Aquarius: "Air",
  Cancer: "Water", Scorpio: "Water", Pisces: "Water"
};


// 2. GRAB ELEMENTS FROM THE PAGE
const nameInput    = document.getElementById("nameInput");
const zodiacSelect = document.getElementById("zodiacSelect");
const revealBtn    = document.getElementById("revealBtn");
const destinyZone  = document.getElementById("destinyZone");
const historyList  = document.getElementById("history");
const searchInput  = document.getElementById("searchInput");
const searchBtn    = document.getElementById("searchBtn");
const sortBtn      = document.getElementById("sortBtn");
const searchResult = document.getElementById("searchResult");
const archiveList  = document.getElementById("archive");

// 3. COSMIC LUCK SCORE (based on name + zodiac sign + today's date)
function calculateLuckScore(name, sign) {
  // Step 1: turn the name into a number by adding up each letter's code
  const cleanName = name.toLowerCase().replace(/\s/g, ""); // "Ada Obi" -> "adaobi"
  let nameValue = 0;
  for (let i = 0; i < cleanName.length; i++) {
    nameValue += cleanName.charCodeAt(i);
  }

  // Step 2: turn the zodiac sign into a number from 1 to 12
  const signValue = zodiacSigns.indexOf(sign) + 1;

  // Step 3: today's date, so the score changes every day (a "daily" score)
  const today = new Date();
  const dateValue = today.getFullYear() * 372 + (today.getMonth() + 1) * 31 + today.getDate();

  // Step 4: mix everything together, then squeeze it into the range 1 - 100
  const mixed = nameValue * 7 + signValue * 13 + dateValue * 3;
  return (mixed % 100) + 1;
}

// Destiny Teller (runs when the button is clicked)
function revealFate() {
  const name = nameInput.value.trim();
  const sign = zodiacSelect.value;

  // Conditional: make sure a name was typed
  if (name === "") {
    alert("The spirits need your name! Please enter it first.");
    nameInput.focus();
    return;
  }

  const luckScore = calculateLuckScore(name, sign);

  // Ternary operator: above 50 = Blessed, otherwise Cursed
  const status = luckScore > 50 ? "Blessed" : "Cursed";

  const cards = drawThreeCards();

  // Save this reading in the history array
  pastReadings.push({
    name: name,
    sign: sign,
    score: luckScore,
    status: status,
    cards: cards,
    time: new Date().toLocaleTimeString()
  });

  renderDestiny(name, sign, luckScore, status, cards);
  renderHistory();
}

// 3-Tarrot Spread: randomly pick 3 fortunes from the array, without repeating any
function drawThreeCards() {
  const deck = fortunes.slice();   // copy, so the original array is never changed
  const picked = [];

  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * deck.length);
    picked.push(deck[randomIndex]);
    deck.splice(randomIndex, 1);   // remove it so the same card can't appear twice
  }

  return picked;
}

function renderDestiny(name, sign, score, status, cards) {
  destinyZone.innerHTML = ""; // clear the old reading

  // ----- Summary -----
  const summary = document.createElement("div");
  summary.className = "summary";

  const title = document.createElement("h2");
  title.textContent = "Greetings, " + name + " of " + sign;

  const element = document.createElement("div");
  element.style.color = "var(--muted)";
  element.textContent = "Ruled by the element of " + zodiacElements[sign];

  const scoreEl = document.createElement("div");
  scoreEl.className = "score";
  scoreEl.textContent = score + " / 100";

  const label = document.createElement("div");
  label.style.color = "var(--muted)";
  label.textContent = "Your Cosmic Luck Score today";

  const statusEl = document.createElement("div");
  statusEl.className = "status " + status;
  statusEl.textContent = "You are " + status;

  summary.append(title, element, scoreEl, label, statusEl);
  destinyZone.appendChild(summary);

  // ----- Tarot cards -----
  const cardsWrap = document.createElement("div");
  cardsWrap.className = "cards";
  const positions = ["Past", "Present", "Future"];

  cards.forEach(function (text, i) {
    const card = document.createElement("div");
    card.className = "card";

    const num = document.createElement("div");
    num.className = "num";
    num.textContent = positions[i].toUpperCase();

    const symbol = document.createElement("div");
    symbol.className = "symbol";
    symbol.textContent = "\u2726";

    const p = document.createElement("p");
    p.textContent = text;

    card.append(num, symbol, p);
    cardsWrap.appendChild(card);
  });

  destinyZone.appendChild(cardsWrap);
}

function renderHistory() {
  historyList.innerHTML = "";

  // newest first, using a copy so pastReadings keeps its original order
  pastReadings.slice().reverse().forEach(function (r) {
    const li = document.createElement("li");
    const who = document.createElement("strong");
    who.textContent = r.name + " (" + r.sign + ")";
    li.append(who, " at " + r.time + " \u2014 " + r.score + " (" + r.status + "): " + r.cards.join(" | "));
    historyList.appendChild(li);
  });
}

// fortune archive sort and search
function renderArchive(highlight) {
  archiveList.innerHTML = "";

  fortunes.forEach(function (f) {
    const li = document.createElement("li");

    if (highlight && f === highlight.text) {
      li.appendChild(makeHighlighted(f, highlight.keyword));
    } else {
      li.textContent = f;
    }

    archiveList.appendChild(li);
  });
}

// Wraps the matched keyword in <mark> (works for any capitalization)
function makeHighlighted(text, keyword) {
  const frag = document.createDocumentFragment();
  const start = text.toLowerCase().indexOf(keyword.toLowerCase());

  frag.append(text.slice(0, start));
  const mark = document.createElement("mark");
  mark.textContent = text.slice(start, start + keyword.length);
  frag.append(mark, text.slice(start + keyword.length));

  return frag;
}

function searchFortunes() {
  const keyword = searchInput.value.trim();
  searchResult.className = "";

  if (keyword === "") {
    searchResult.textContent = "Type a keyword to search the cosmos.";
    renderArchive();
    return;
  }

  // BONUS: lowercase both sides so "WIND", "Wind" and "wind" all match
  const match = fortunes.find(function (f) {
    return f.toLowerCase().includes(keyword.toLowerCase());
  });

  if (match) {
    searchResult.className = "found";
    searchResult.textContent = "\u2726 Found: " + match;
    renderArchive({ text: match, keyword: keyword });
  } else {
    searchResult.className = "notfound";
    searchResult.textContent = "The cosmos holds no fortune with \"" + keyword + "\".";
    renderArchive();
  }
}

function sortArchive() {
  fortunes.sort(function (a, b) {
    return a.localeCompare(b);
  });
  searchResult.className = "";
  searchResult.textContent = "Archive sorted alphabetically.";
  renderArchive();
}

// 7. EVENT LISTENERS
revealBtn.addEventListener("click", revealFate);
searchBtn.addEventListener("click", searchFortunes);
sortBtn.addEventListener("click", sortArchive);

nameInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") revealFate();
});
searchInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") searchFortunes();
});

// Show the full archive when the page first loads
renderArchive();