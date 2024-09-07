let timerInterval;
let isPaused = false;
let isBreak = false; 
let workTime = 25;
let breakTime = 5;
let timeLeft = workTime * 60;

document.getElementById("start").addEventListener("click", function() {
    if (!isPaused) {
        timeLeft = isBreak ? breakTime * 60 : workTime * 60; 
    }
    startTimer();
});

document.getElementById("pause").addEventListener("click", function() {
    clearInterval(timerInterval);
    isPaused = true;
});

document.getElementById("reset").addEventListener("click", function() {
    clearInterval(timerInterval);
    isBreak = false; 
    timeLeft = workTime * 60;
    updateDisplay();
    resetExerciseDisplay(); 
    isPaused = false;
});

document.getElementById("saveSettings").addEventListener("click", function() {
    workTime = parseInt(document.getElementById("workTime").value);
    breakTime = parseInt(document.getElementById("breakTime").value);
    timeLeft = isBreak ? breakTime * 60 : workTime * 60; 
    localStorage.setItem("workTime", workTime);
    localStorage.setItem("breakTime", breakTime);
    updateDisplay();
});

function startTimer() {
    timerInterval = setInterval(function() {
        timeLeft--;
        updateDisplay();

        if (timeLeft <= 0) {
            clearInterval(timerInterval);

            if (!isBreak) {
                
                displayExercise();
                isBreak = true;
                timeLeft = breakTime * 60; 
                document.querySelector("h1").textContent = "Pausa"; 
                startTimer(); 
            } else {
                
                resetExerciseDisplay();
                isBreak = false;
                timeLeft = workTime * 60; 
                document.querySelector("h1").textContent = "Pomodoro"; 
                startTimer(); 
            }
        }
    }, 1000);
}

function updateDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;

    document.getElementById("minutes").textContent = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("seconds").textContent = seconds < 10 ? "0" + seconds : seconds;

    
    if (isBreak) {
        document.title = `Pausa - ${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
    } else {
        document.title = `Pomodoro - ${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
    }
}

function displayExercise() {
    const randomExercise = exercisesData[Math.floor(Math.random() * exercisesData.length)];
    
    document.getElementById("exerciseDisplay").textContent = randomExercise.description;

    let existingImage = document.getElementById("exerciseImage");
    if (existingImage) {
        existingImage.remove();
    }

    let img = document.createElement("img");
    img.id = "exerciseImage";
    img.src = randomExercise.image;
    img.alt = randomExercise.description;
    img.style.maxWidth = "100%"; 
    
    
    document.getElementById("exercise").appendChild(img);
}

function resetExerciseDisplay() {
    
    document.getElementById("exerciseDisplay").textContent = "A cada pausa, um exercício será exibido aqui!";
    
    
    let existingImage = document.getElementById("exerciseImage");
    if (existingImage) {
        existingImage.remove();
    }
}
