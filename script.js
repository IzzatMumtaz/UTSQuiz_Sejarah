const backgroundMusic = document.getElementById("background-music");
const muteButton = document.getElementById("mute-button");
let correctSound = new Audio("bnr.mp3");
let wrongSound = new Audio("wrong.mp3");
let countdownSound = new Audio("mbuhMendingTuru.mp3");

let isMuted = false;
let timerInterval; // Untuk menyimpan timer interval
let countdownInterval; // Untuk menyimpan timer countdown saat ini

const timerProgress = document.getElementById("timer-progress");

// Fungsi untuk memperbarui nilai progress bar
function updateProgressBar(timeLeft) {
    timerProgress.value = timeLeft;
}

function toggleMute() {
    if (isMuted) {
        backgroundMusic.play();
        muteButton.src = "speaker.png";
        isMuted = false;
    } else {
        backgroundMusic.pause();
        muteButton.src = "mute.png";
        isMuted = true;
    }
}

// Fungsi untuk menampilkan countdown timer
function displayTimer(timeLeft) {
    const timerElement = document.getElementById("countdown-timer");
    timerElement.innerText = "Timer: " + timeLeft + " detik";
    if (timeLeft <= 5) {
        timerElement.style.color = "red"; // Mengubah warna timer menjadi merah
    } else {
        timerElement.style.color = "black"; // Kembali ke warna hitam jika tidak kurang dari 5 detik
    }
}

// Fungsi untuk memulai countdown timer
// Fungsi untuk memulai countdown timer
function startCountdownTimer() {
    let timeLeft = 20; // Waktu awal dalam detik
    displayTimer(timeLeft); // Menampilkan waktu awal

    countdownInterval = setInterval(() => {
        timeLeft--; // Mengurangi waktu sisa
        displayTimer(timeLeft); // Menampilkan waktu sisa yang baru
        updateProgressBar(timeLeft); // Memperbarui nilai progress bar

        if (timeLeft <= 0) {
            clearInterval(countdownInterval); // Hentikan timer saat waktu habis
            playWrongSound();
            shakeScreen(); // Memainkan suara "wrong"
            handleNextButton(); // Pergi ke pertanyaan berikutnya
        }
    }, 1000); /// Per detik
}

// Fungsi untuk menghentikan timer countdown
function stopCountdownTimer() {
    clearInterval(countdownInterval);
}

// Fungsi untuk memainkan efek suara "salah"
function playWrongSound() {
    wrongSound.play();
}

// Fungsi untuk menambahkan getaran layar
function shakeScreen() {
    // Mengubah posisi horizontal
    document.body.style.animation = "shakeX 0.5s";
    // Mengubah posisi vertikal
    setTimeout(() => {
        document.body.style.animation = "";
    }, 500);
}

// Fungsi untuk menampilkan pertanyaan dan menjalankan timer
function showQuestion() {
    resetState();
    stopTimer(); // Hentikan timer sebelum menampilkan soal baru
    startCountdownTimer();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElemet.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}


// Fungsi untuk memulai timer
function startTimer() {
    let timeLeft = 20; // Waktu dalam detik
    timerInterval = setInterval(() => {
        timeLeft--;
        if (timeLeft <= 0) {
            // Waktu habis, lanjut ke soal berikutnya
            clearInterval(timerInterval);
            handleNextButton();
        }
    }, 1000); // Per detik
}

// Fungsi untuk menghentikan timer
function stopTimer() {
    clearInterval(timerInterval);
}

// Fungsi untuk mereset state
function resetState() {
    stopCountdownTimer(); // Hentikan timer countdown saat ini sebelum menampilkan soal baru
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

// Fungsi untuk mengganti background music
function changeBackgroundMusic() {
    backgroundMusic.src = "mbuhMendingTuru.mp3"; // Ganti dengan nama file lagu baru
    backgroundMusic.play();
}


const questions = [{
        question: "Sebab utama jatuhnya Kabinet Sukiman adalah",
        answer: [
            { text: "Penandatanganan bantuan ekonomi dan militer antara Indonesia dan Amerika Serikat", correct: true },
            { text: "Eksistensi mantan pemimpin negara federal yang masih kuat", correct: false },
            { text: "Banyak hutang negara", correct: false },
            { text: "Korupsi merajalela di setiap lembaga negara", correct: false },
        ]
    },
    {
        question: "Sistem ekonomi Ali-Baba yang diprakarsai oleh Menteri Iskaq Tjokroadisurjo bertujuan",
        answer: [
            { text: "Memperoleh bantuan kredit", correct: false },
            { text: "Mengadakan pemutusan hubungan ekonomi dengan Amerika Serikat", correct: false },
            { text: "Memajukan pengusaha pribumi", correct: true },
            { text: "Menjalin hubungan dengan Cina", correct: false },
        ]
    },
    {
        question: "Tindakan pertama yang dilakukan Mayjen Soeharto setelah menerima Supersemar adalah",
        answer: [
            { text: "Mengadili tokoh-tokoh yang terlibat dalam penculikan petinggi AD", correct: false },
            { text: "Membentuk Kabinet Ampera", correct: false },
            { text: "Meredam demonstrasi mahasiswa di Jakarta", correct: false },
            { text: "Membubarkan PKI dan ormas-ormasnya", correct: true },
        ]
    },
    {
        question: "Penyebab utama kegagalan Demokrasi Liberal adalah",
        answer: [
            { text: "Dianggap tidak sesuai dengan kondisi masyarakat Indonesia serta dalam pelaksanaannya terjadi penyimpangan terhadap UUD 1945", correct: true },
            { text: "Terjadinya pemberontakan di berbagai daerah", correct: false },
            { text: "Penyimpangan terhadap politik luar negeri", correct: false },
            { text: "Tindakan presiden yang tidak sesuai dengan UUD 1945", correct: false },
        ]
    },
    {
        question: "Tokoh ekonomi yang mempelopori program Gerakan Benteng ialah",
        answer: [
            { text: "Margono", correct: false },
            { text: "Soemitro Djojohadikoesoem", correct: true },
            { text: "Kasman Singodimejo", correct: false },
            { text: "M.Hatta", correct: false },
        ]
    },
    {
        question: "Sistem Demokrasi Liberal diterapkan di Indonesia dalam kurun waktu...",
        answer: [
            { text: "1950 - 1959", correct: true },
            { text: "1951 - 1565", correct: false },
            { text: "1950 -1955", correct: false },
            { text: "1950 -1960", correct: false },
        ]
    },
    {
        question: "Kabinet terakhir pada masa Demokrasi Liberal adalah...",
        answer: [
            { text: "Kabinet Wilopo", correct: false },
            { text: "Kabinet Sukiman", correct: false },
            { text: "Kabinet Djuanda", correct: true },
            { text: "Kabinet Ali Sastroamidjojo", correct: false },
        ]
    },
    {
        question: "Pemilu 1955 berhasil memunculkan empat besar parpol peraih suara terbanyak, kecual...",
        answer: [
            { text: "PKI", correct: false },
            { text: " Masyumi", correct: false },
            { text: "NU", correct: false },
            { text: "Murba", correct: true },
        ]
    },
    {
        question: "Penyebab kemunduran Kabinet Wilopo antara alai adalah sebagai berikut, kecuali ...",
        answer: [
            { text: "Munculnya provinsialisme dan separatisme", correct: false },
            { text: "Adanya kesepakatan Mutual Security Act dengan Amerika Serikat", correct: true },
            { text: "Adanya peristiwa Tanjung Morawa", correct: false },
            { text: "Adanya Intervensi parlemen terhadap TNI", correct: false },
        ]
    },
    {
        question: "Kabinet Natsir yang terbentuk pada masa Demokrasi Liberal dikenal dengan sebutan Zaken Kabinet, yang berarti ...",
        answer: [
            { text: "Kabinet dimana para menterinya bertanggungjawab terhadap parlemen.", correct: false },
            { text: "Kabinet yang dipimpin oleh Perdana Menteri", correct: false },
            { text: "Kabinet dimana menteri-menterinya ahli di bidangnya masing-masing", correct: true },
            { text: " Kabinet yang terjadi karena adanya koalisi antar partai", correct: false },
        ]
    },


];

const questionElemet = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");


let currentQuestionIndex = 0;
let score = 0;


function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Lanjut";
    showQuestion();
}


function selectAnswer(e) {
    stopTimer(); // Hentikan timer saat jawaban dipilih
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
        // Memainkan suara ketika jawaban benar
        correctSound.play();
    } else {
        selectedBtn.classList.add("incorrect");
        // Menambahkan efek suara "salah"
        playWrongSound();
        // Menambahkan getaran layar
        shakeScreen();
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}


function showScore() {
    resetState();
    questionElemet.innerHTML = `Nilai anda adalah ${score} dari ${questions.length}!`;
    nextButton.innerHTML = "Ulangi";
    nextButton.style.display = "block";

}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();