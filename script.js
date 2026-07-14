        // ===== PASSWORD SECTION =====
        // Her date of birth, format DD/MM/YYYY
        const correctPassword = '15/07/2006';

        function checkPassword() {
            const day = document.getElementById('day').value.padStart(2, '0');
            const month = document.getElementById('month').value.padStart(2, '0');
            const year = document.getElementById('year').value;

            const enteredPassword = day + '/' + month + '/' + year;

            if (enteredPassword === correctPassword) {
                // Correct password!
                createConfetti();
                document.getElementById('passwordScreen').classList.add('hidden');
                document.getElementById('mainContainer').style.display = 'block';
                document.getElementById('musicBtn').style.display = 'block';
                document.getElementById('pageIndicator').style.display = 'block';
                document.getElementById('navButtons').style.display = 'flex';
                updateFriendshipCounter();
                
                // Auto load to page 1 after 2.5 seconds
                setTimeout(() => {
                    goToPage(1);
                }, 2500);
            } else {
                // Wrong password
                const errorMsg = document.getElementById('errorMessage');
                errorMsg.classList.add('show');
                setTimeout(() => {
                    errorMsg.classList.remove('show');
                }, 3000);
                
                // Clear inputs
                document.getElementById('day').value = '';
                document.getElementById('month').value = '';
                document.getElementById('year').value = '';
            }
        }

        // Allow Enter key to submit password
        document.addEventListener('DOMContentLoaded', function() {
            document.getElementById('year').addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    checkPassword();
                }
            });
        });

        // ===== WEBSITE SECTION =====
        let currentPage = 0;
        let blownCandlesCount = 0;
        let photosIndex = 0;
        let isMusicPlaying = false;

        const pages = document.querySelectorAll('.page');
        // EDIT ME: replace each url with a real photo of you two (e.g. 'photos/photo1.jpg')
        // and rewrite each caption to say something true and specific about that memory
        const photos = [
            { url: 'photo1.jpg', caption: 'Smile more, worry less 😊' },
            { url: 'photo2.jpg', caption: 'You\'re a sunflower 🌻' },
            { url: 'photo3.jpg', caption: 'Keep shining ✨' },
            { url: 'photo4.jpg', caption: 'Be yourself ❤️' },
            { url: 'photo5.jpg', caption: 'You are beautiful 💕' },
            { url: 'photo6.jpg', caption: 'My favorite memory with you 📸' },
            { url: 'photo7.jpg', caption: 'That day we couldn\'t stop laughing 😂' },
            { url: 'photo8.jpg', caption: 'Always by my side 🤍' },
            { url: 'photo9.jpg', caption: 'This one just feels like home 🏡' },
            { url: 'photo10.jpg', caption: 'Here\'s to many more like this 🥂' }
        ];

        function goToPage(pageNum) {
            pages.forEach(p => p.classList.add('hidden'));
            pages[pageNum].classList.remove('hidden');
            currentPage = pageNum;
            
            document.getElementById('page-number').textContent = pageNum + 1;
            document.getElementById('page-total').textContent = pages.length;
            document.getElementById('prev-btn').style.display = currentPage === 0 ? 'none' : 'block';
            document.getElementById('next-btn').style.display = currentPage === pages.length - 1 ? 'none' : 'block';

            if (pages[pageNum].id === 'pageQuiz') {
                quizIndex = 0;
                quizScore = 0;
                document.querySelectorAll('.quiz-box').forEach(box => {
                    if (!box.classList.contains('quiz-final')) box.style.display = 'block';
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

        function blowCandle(index) {
            const candles = document.querySelectorAll('.candle');
            candles[index].classList.add('blown');
            candles[index].textContent = '💨';
            blownCandlesCount++;

            if (blownCandlesCount === 5) {
                createConfetti();
                document.getElementById('cake-message').style.display = 'block';
            }
        }

        function openEnvelope() {
            const envelope = document.getElementById('envelope');
            if (envelope.textContent === '💌') {
                envelope.classList.add('opened');
                envelope.textContent = '📧';
                document.getElementById('envelope-message').style.display = 'block';
                createConfetti();
            }
        }

        function nextPhoto() {
            photosIndex = (photosIndex + 1) % photos.length;
            updatePhoto();
        }

        function previousPhoto() {
            photosIndex = (photosIndex - 1 + photos.length) % photos.length;
            updatePhoto();
        }

        function updatePhoto() {
            document.getElementById('photo-img').src = photos[photosIndex].url;
            document.getElementById('photo-caption').textContent = photos[photosIndex].caption;
        }

        function toggleMusic() {
            const audio = document.getElementById('bgMusic');
            isMusicPlaying = !isMusicPlaying;
            const btn = document.querySelector('.music-btn');
            if (isMusicPlaying) {
                audio.play().catch(() => {
                    // Autoplay/file might be blocked or missing - that's okay
                    console.log('Add your own background-music.mp3 file to enable music.');
                });
                btn.textContent = '🎵';
            } else {
                audio.pause();
                btn.textContent = '🔇';
            }
        }

        // ===== FRIENDSHIP COUNTER =====
        // Date you two became friends (04/03/2024)
        const friendshipStartDate = '2024-03-04';

        function updateFriendshipCounter() {
            const start = new Date(friendshipStartDate);
            const now = new Date();
            let years = now.getFullYear() - start.getFullYear();
            let months = now.getMonth() - start.getMonth();
            let days = now.getDate() - start.getDate();

            if (days < 0) {
                months--;
                const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
                days += lastMonth.getDate();
            }
            if (months < 0) {
                years--;
                months += 12;
            }

            const totalDays = Math.floor((now - start) / (1000 * 60 * 60 * 24));

            document.getElementById('countYears').textContent = years;
            document.getElementById('countMonths').textContent = months;
            document.getElementById('countDays').textContent = days;
            document.getElementById('countTotalDays').textContent = totalDays;
        }

        // ===== MEMORY QUIZ =====
        // EDIT ME: replace these with real questions only she would know the answer to!
        const quizQuestions = [
            {
                question: "Where did we first meet?",
                options: ["School", "Through friends", "Online", "Work"],
                correct: 1
            },
            {
                question: "What's our favorite thing to do together?",
                options: ["Watch movies", "Long calls", "Travel", "Bitching"],
                correct: 3
            },
            {
                question: "What do I always tease you about?",
                options: ["Being late", "Your laugh",  "Your playlist", "Flat chest"],
                correct: 3
            }
        ];
        let quizIndex = 0;
        let quizScore = 0;
        let quizAnswered = false;

        function loadQuizQuestion() {
            quizAnswered = false;
            document.getElementById('quizFinal').style.display = 'none';
            document.getElementById('quizFeedback').textContent = '';

            if (quizIndex >= quizQuestions.length) {
                document.querySelector('.quiz-box:not(.quiz-final)').style.display = 'none';
                document.getElementById('quizFinal').style.display = 'block';
                document.getElementById('quizScore').textContent = quizScore;
                createConfetti();
                return;
            }

            const q = quizQuestions[quizIndex];
            document.getElementById('quizProgress').textContent = `Question ${quizIndex + 1} of ${quizQuestions.length}`;
            document.getElementById('quizQuestion').textContent = q.question;

            const optionsDiv = document.getElementById('quizOptions');
            optionsDiv.innerHTML = '';
            q.options.forEach((opt, i) => {
                const btn = document.createElement('div');
                btn.className = 'quiz-option';
                btn.textContent = opt;
                btn.onclick = () => selectQuizAnswer(i, btn);
                optionsDiv.appendChild(btn);
            });
        }

        function selectQuizAnswer(i, el) {
            if (quizAnswered) return;
            quizAnswered = true;
            const q = quizQuestions[quizIndex];
            const allOptions = document.querySelectorAll('.quiz-option');

            if (i === q.correct) {
                el.classList.add('correct');
                document.getElementById('quizFeedback').textContent = "Yes! You know it 💕";
                quizScore++;
            } else {
                el.classList.add('wrong');
                allOptions[q.correct].classList.add('correct');
                document.getElementById('quizFeedback').textContent = "Close! Here's the right one 😊";
            }

            setTimeout(() => {
                quizIndex++;
                loadQuizQuestion();
            }, 1500);
        }

        function createConfetti() {
            const emojis = ['🎉', '🎊', '✨', '💕', '🌟', '💖', '🎈'];
            for (let i = 0; i < 60; i++) {
                const conf = document.createElement('div');
                conf.className = 'confetti';
                conf.textContent = emojis[Math.floor(Math.random() * emojis.length)];
                conf.style.left = Math.random() * 100 + '%';
                conf.style.top = '-20px';
                conf.style.fontSize = Math.random() * 20 + 15 + 'px';
                document.body.appendChild(conf);
                setTimeout(() => conf.remove(), 3000);
            }
        }

        function celebrate() {
            createConfetti();
            for (let i = 0; i < 3; i++) {
                setTimeout(() => createConfetti(), i * 500);
            }
        }
