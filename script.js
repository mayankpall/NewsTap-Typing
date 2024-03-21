var speeds = []; // Array to store typing speeds
var startTime; // Variable to store start time
var contentWords; // Variable to store words in content

function startGame() {
    document.getElementById("start-container").style.display = "none";
    document.getElementById("content").style.display = "block";
    document.getElementById("user-input").style.display = "block";
    fetchRandomNews();
    document.getElementById("user-input").focus();
    startTime = Date.now(); // Set the start time when the game starts
}

function updateContent(newContent) {
    document.getElementById("content").innerHTML = newContent;
    contentWords = newContent.trim().split(" "); // Store words in content
}

document.getElementById("user-input").addEventListener("input", function() {
    var userInput = document.getElementById("user-input").value.trim();
    var userInputWords = userInput.split(" ");
    if (userInput === contentWords.join(" ")) {
        displayResults(); // Display results if user completes typing before time
    }
});

setTimeout(function() {
    document.getElementById("user-input").disabled = true;
    displayResults(); // Display results after time is over
}, 60000); // 1 minute timeout

function fetchRandomNews() {
    fetch("https://newsapi.org/v2/top-headlines?country=us&apiKey=664b291c95b743b59025ede3d76d72aa")
    .then(response => response.json())
    .then(data => {
        var articles = data.articles;
        var randomArticle = articles[Math.floor(Math.random() * articles.length)];
        var content = randomArticle.title; // You can choose to display the article title, description, or content
        updateContent(content);
    })
    .catch(error => {
        console.error("Error fetching news:", error);
    });
}

function calculateGrossSpeed(wordsTyped, timeTaken) {
    return wordsTyped / timeTaken;
}

function calculateAccuracy(userInputWords, contentWords) {
    var correctWords = 0;
    for (var i = 0; i < userInputWords.length; i++) {
        if (userInputWords[i] === contentWords[i]) {
            correctWords++;
        }
    }
    return (correctWords / contentWords.length) * 100;
}

function countErrors(userInputWords, contentWords) {
    var errors = 0;
    for (var i = 0; i < Math.min(userInputWords.length, contentWords.length); i++) {
        if (userInputWords[i] !== contentWords[i]) {
            errors++;
        }
    }
    return errors;
}

function displayResults() {
    var endTime = Date.now();
    var elapsedTime = (endTime - startTime) / 60000; // Convert milliseconds to minutes
    var wordsTyped = contentWords.length;
    var grossSpeed = calculateGrossSpeed(wordsTyped, elapsedTime);
    speeds.push(grossSpeed); // Store the speed in the array
    var userInputWords = document.getElementById("user-input").value.trim().split(" ");
    var accuracy = calculateAccuracy(userInputWords, contentWords);
    var timeTaken = (endTime - startTime) / 1000; // Convert milliseconds to seconds
    document.getElementById("time-taken").innerHTML = "Time taken: " + timeTaken.toFixed(2) + " seconds";
    document.getElementById("gross-speed").innerHTML = "Gross typing speed: " + grossSpeed.toFixed(2) + " words per minute.";
    document.getElementById("accuracy").innerHTML = "Accuracy: " + accuracy.toFixed(2) + "%";
    document.getElementById("errors-made").innerHTML = "Errors made: " + countErrors(userInputWords, contentWords);
    document.getElementById("gross-speed").classList.remove("hidden");
    document.getElementById("accuracy").classList.remove("hidden");
    document.getElementById("time-taken").classList.remove("hidden");
    document.getElementById("errors-made").classList.remove("hidden");
}
