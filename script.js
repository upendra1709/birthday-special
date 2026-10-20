
        // ===== PASSWORD SECTION =====
        const correctPassword = '22/10/2008';

        function checkPassword() {
            const day = document.getElementById('day').value.padStart(2, '0');
            const month = document.getElementById('month').value.padStart(2, '0');
            const year = document.getElementById('year').value;
            const enteredPassword = day + '/' + month + '/' + year;

            if (enteredPassword === correctPassword) {
                createConfetti();
                document.getElementById('passwordScreen').classList.add('hidden');
                document.getElementById('mainContainer').style.display = 'block';
                document.getElementById('musicBtn').style.display = 'block';
                document.getElementById('pageIndicator').style.display = 'block';
                document.getElementById('navButtons').style.display = 'flex';

                // Fixed: use the correct love-counter function name
                updateLoveCounter();

                setTimeout(() => goToPage(1), 2500);
            } else {
                const errorMsg = document.getElementById('errorMessage');
                errorMsg.classList.add('show');

                setTimeout(() => errorMsg.classList.remove('show'), 3000);

                document.getElementById('day').value = '';
                document.getElementById('month').value = '';
                document.getElementById('year').value = '';
            }
        }

        document.addEventListener('DOMContentLoaded', function () {
            const yearInput = document.getElementById('year');
            if (yearInput) {
                yearInput.addEventListener('keypress', function (e) {
                    if (e.key === 'Enter') checkPassword();
                });
            }
        });

        // ===== WEBSITE NAVIGATION =====
        let currentPage = 0;
        let blownCandlesCount = 0;
        let photosIndex = 0;
        let isMusicPlaying = false;

        const pages = document.querySelectorAll('.page');

        function goToPage(pageNum) {
            if (
                !Number.isInteger(pageNum) ||
                pageNum < 0 ||
                pageNum >= pages.length
            ) {
                console.error('Invalid page index:', pageNum);
                return;
            }

            pages.forEach(page => page.classList.add('hidden'));

            const activePage = pages[pageNum];
            activePage.classList.remove('hidden');
            currentPage = pageNum;

            const pageNumber = document.getElementById('page-number');
            const pageTotal = document.getElementById('page-total');
            const prevButton = document.getElementById('prev-btn');
            const nextButton = document.getElementById('next-btn');

            if (pageNumber) pageNumber.textContent = pageNum + 1;
            if (pageTotal) pageTotal.textContent = pages.length;
            if (prevButton) {
                prevButton.style.display = currentPage === 0 ? 'none' : 'block';
            }
            if (nextButton) {
                nextButton.style.display =
                    currentPage === pages.length - 1 ? 'none' : 'block';
            }

            if (activePage.id === 'pageCounter') {
                updateLoveCounter();
            }

            if (activePage.id === 'pageQuiz') {
                quizIndex = 0;
                quizScore = 0;

                document.querySelectorAll('.quiz-box').forEach(box => {
                    if (!box.classList.contains('quiz-final')) {
                        box.style.display = 'block';
                    }
                });

                loadQuizQuestion();
            }

            window.scrollTo(0, 0);
        }

        function nextPage() {
            if (currentPage < pages.length - 1) {
                goToPage(currentPage + 1);
            }
        }

        function previousPage() {
            if (currentPage > 0) {
                goToPage(currentPage - 1);
            }
        }

        // ===== BIRTHDAY CAKE =====
        function blowCandle(index) {
            const candles = document.querySelectorAll('.candle');

            if (!candles[index]) return;

            candles[index].classList.add('blown');
            candles[index].textContent = '💨';
            blownCandlesCount++;

            if (blownCandlesCount >= 5) {
                createConfetti();

                const message = document.getElementById('cake-message');
                if (message) message.style.display = 'block';
            }
        }

        // ===== LOVE LETTER =====
        function openEnvelope() {
            const envelope = document.getElementById('envelope');

            if (envelope && envelope.textContent.trim() === '💌') {
                envelope.classList.add('opened');
                envelope.textContent = '📧';

                const message = document.getElementById('envelope-message');
                if (message) message.style.display = 'block';

                createConfetti();
            }
        }

        // ===== PHOTO GALLERY =====
        const photos = [
            { url: 'photo1.jpg', caption: 'Smile more, worry less 😊' },
            { url: 'photo2.jpg', caption: "You're a sunflower 🌻" },
            { url: 'photo3.jpg', caption: 'Keep shining ✨' },
            { url: 'photo4.jpg', caption: 'Be yourself ❤️' },
            { url: 'photo5.jpg', caption: 'You are beautiful 💕' },
            { url: 'photo6.jpg', caption: 'My favorite memory with you 📸' },
            { url: 'photo7.jpg', caption: "That day we couldn't stop laughing 😂" },
            { url: 'photo8.jpg', caption: 'Always by my side 🤍' },
            { url: 'photo9.jpg', caption: 'This one just feels like home 🏡' },
            { url: 'photo10.jpg', caption: "Here's to many more like this 🥂" }
        ];

        function nextPhoto() {
            photosIndex = (photosIndex + 1) % photos.length;
            updatePhoto();
        }

        function previousPhoto() {
            photosIndex = (photosIndex - 1 + photos.length) % photos.length;
            updatePhoto();
        }

        function updatePhoto() {
            const image = document.getElementById('photo-img');
            const caption = document.getElementById('photo-caption');

            if (image) image.src = photos[photosIndex].url;
            if (caption) caption.textContent = photos[photosIndex].caption;
        }

        // ===== BACKGROUND MUSIC =====
        function toggleMusic() {
            const audio = document.getElementById('bgMusic');
            const btn = document.querySelector('.music-btn');

            if (!audio || !btn) return;

            isMusicPlaying = !isMusicPlaying;

            if (isMusicPlaying) {
                audio.play().then(() => {
                    btn.textContent = '🎵';
                }).catch(() => {
                    isMusicPlaying = false;
                    btn.textContent = '🔇';
                    console.log('Check that your background music file exists.');
                });
            } else {
                audio.pause();
                btn.textContent = '🔇';
            }
        }

        // ===== LOVE COUNTER ❤️ =====
        // Change this date if your relationship started on a different date.
        const loveStartDate = '2026-09-08';

        function updateLoveCounter() {
            const ids = [
                'countYears',
                'countMonths',
                'countDays',
                'countTotalDays'
            ];

            if (!ids.every(id => document.getElementById(id))) return;

            const start = new Date(loveStartDate + 'T00:00:00');
            const now = new Date();

            if (Number.isNaN(start.getTime())) return;

            let years = now.getFullYear() - start.getFullYear();
            let months = now.getMonth() - start.getMonth();
            let days = now.getDate() - start.getDate();

            if (days < 0) {
                months--;
                days += new Date(
                    now.getFullYear(),
                    now.getMonth(),
                    0
                ).getDate();
            }

            if (months < 0) {
                years--;
                months += 12;
            }

            const today = new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate()
            );

            const totalDays = Math.max(
                0,
                Math.floor((today - start) / 86400000)
            );

            document.getElementById('countYears').textContent =
                Math.max(0, years);

            document.getElementById('countMonths').textContent =
                Math.max(0, months);

            document.getElementById('countDays').textContent =
                Math.max(0, days);

            document.getElementById('countTotalDays').textContent =
                totalDays;
        }

        updateLoveCounter();
        setInterval(updateLoveCounter, 60000);

        // ===== MEMORY QUIZ 💕 =====
        const quizQuestions = [
            {
                question: 'Where did we first meet?',
                options: ['School', 'Through friends', 'Online', 'Game'],
                correct: 3
            },
            {
                question: "What's our favorite thing to do together?",
                options: ['Watch movies', 'Long calls', 'Travel', 'Meri gand marna'],
                correct: 3
            },
            {
                question: 'What do I always tease you about?',
                options: ['Being late', 'Your laugh', 'Your playlist', 'Your height'],
                correct: 3
            },
            {
                question: 'Who falls asleep first while VideoCall?',
                options: ['Me', 'You', 'Both of us', 'We never stop talking'],
                correct: 0
            },
            {
                question: 'One last question, Gayuu… how special am I to you?',
                options: [
                    'A little special',
                    'Very special',
                    'More than I can explain',
                    'You already know, silly!'
                ],
                correct: 3
            }
        ];

        let quizIndex = 0;
        let quizScore = 0;
        let quizAnswered = false;

        function loadQuizQuestion() {
            quizAnswered = false;

            const finalScreen = document.getElementById('quizFinal');
            const feedback = document.getElementById('quizFeedback');

            if (finalScreen) finalScreen.style.display = 'none';
            if (feedback) feedback.textContent = '';

            if (quizIndex >= quizQuestions.length) {
                const quizBox = document.querySelector('.quiz-box:not(.quiz-final)');
                if (quizBox) quizBox.style.display = 'none';
                if (finalScreen) finalScreen.style.display = 'block';

                const scoreLine = document.getElementById('quizScore');
                if (scoreLine) {
                    scoreLine.textContent = quizScore;
                    const parent = scoreLine.parentElement;
                    if (parent) {
                        parent.innerHTML =
                            `Score: <span id="quizScore">${quizScore}</span>/${quizQuestions.length}`;
                    }
                }

                createConfetti();
                return;
            }

            const q = quizQuestions[quizIndex];
            const progress = document.getElementById('quizProgress');
            const question = document.getElementById('quizQuestion');
            const optionsDiv = document.getElementById('quizOptions');

            if (progress) {
                progress.textContent =
                    `Question ${quizIndex + 1} of ${quizQuestions.length}`;
            }

            if (question) question.textContent = q.question;
            if (!optionsDiv) return;

            optionsDiv.innerHTML = '';

            q.options.forEach((option, i) => {
                const btn = document.createElement('div');
                btn.className = 'quiz-option';
                btn.textContent = option;
                btn.addEventListener('click', () => selectQuizAnswer(i, btn));
                optionsDiv.appendChild(btn);
            });
        }

        function selectQuizAnswer(i, element) {
            if (quizAnswered) return;

            quizAnswered = true;
            const question = quizQuestions[quizIndex];
            const allOptions = document.querySelectorAll('.quiz-option');
            const feedback = document.getElementById('quizFeedback');

            if (i === question.correct) {
                element.classList.add('correct');
                if (feedback) feedback.textContent = 'Yes! You know it 💕';
                quizScore++;
            } else {
                element.classList.add('wrong');

                if (allOptions[question.correct]) {
                    allOptions[question.correct].classList.add('correct');
                }

                if (feedback) {
                    feedback.textContent = "Close! Here's the right one 😊";
                }
            }

            setTimeout(() => {
                quizIndex++;
                loadQuizQuestion();
            }, 1500);
        }

        // ===== CONFETTI 🎉 =====
        function createConfetti() {
            const emojis = ['🎉', '🎊', '✨', '💕', '🌟', '💖', '🎈'];

            for (let i = 0; i < 60; i++) {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.textContent =
                    emojis[Math.floor(Math.random() * emojis.length)];

                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.top = '-20px';
                confetti.style.fontSize =
                    Math.random() * 20 + 15 + 'px';

                document.body.appendChild(confetti);
                setTimeout(() => confetti.remove(), 3000);
            }
        }

        function celebrate() {
            createConfetti();

            for (let i = 0; i < 3; i++) {
                setTimeout(() => createConfetti(), i * 500);
            }
        }
