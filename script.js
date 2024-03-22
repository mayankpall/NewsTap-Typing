<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>NewsTap Typing</title>
<link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
<link href="styles.css" rel="stylesheet">
</head>
<body>
<div class="container">
    <h1 class="game-title">NewsTap Typing</h1>
    <p class="welcome-message">Welcome! Get ready to type some news headlines.</p>
    <div id="test-container">
        <div id="start-container">
            <button onclick="startGame()" class="btn-start">Start Game</button>
        </div>
        <div id="content" style="display: none;"></div>
        <textarea id="user-input" class="input-box" style="display: none;" rows="6" autofocus></textarea>
        <p id="result" class="result-text"></p>
        <p id="gross-speed" class="hidden"></p>
        <p id="accuracy" class="hidden"></p>
        <p id="time-taken" class="hidden"></p>
        <p id="errors-made" class="hidden"></p>
    </div>
</div>

<script src="script.js"></script>
</body>
</html>
