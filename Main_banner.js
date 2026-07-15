document.addEventListener("DOMContentLoaded", () => {
    // 1. 책 데이터 배열 정의 (원하는 만큼 추가할 수 있습니다)
    const bookData = [
        {
            imgSrc: "이미지/book-cover1.jpg",
            title: "매스커레이드 라이프",
            author: "히가시노 게이고 미스터리<br>최신작"
        },
        {
            imgSrc: "이미지/book-cover2.jpg", // 다음 책 이미지 경로
            title: "나미야 잡화점의 기적",
            author: "히가시노 게이고 감동 미스터리<br>스테디셀러"
        },
        {
            imgSrc: "이미지/book-cover3.jpg", // 또 다른 책 이미지 경로
            title: "가면산장 살인사건",
            author: "반전의 반전을 거듭하는<br>명작 미스터리"
        }
    ];

    // 현재 표시 중인 책의 인덱스 (0부터 시작)
    let currentIndex = 0;

    // 2. DOM 요소 선택
    const bookImg = document.getElementById("main_banner_book_img");
    const bookTitle = document.getElementById("Main_banner_title1");
    const bookAuthor = document.getElementById("Main_banner_author1");
    
    const prevBtn = document.getElementById("Main_banner_prev_btn");
    const nextBtn = document.getElementById("Main_banner_next_btn");

    // 3. 화면을 업데이트하는 함수
    function updateBanner(index) {
        const currentBook = bookData[index];
        
        // 데이터 교체
        bookImg.src = currentBook.imgSrc;
        bookTitle.textContent = currentBook.title;
        bookAuthor.innerHTML = currentBook.author; // <br> 태그 적용을 위해 innerHTML 사용
    }

    // 4. '이전' 버튼 클릭 이벤트
    prevBtn.addEventListener("click", () => {
        currentIndex--;
        // 첫 번째 아이템에서 이전을 누르면 마지막 아이템으로 이동
        if (currentIndex < 0) {
            currentIndex = bookData.length - 1;
        }
        updateBanner(currentIndex);
    });

    // 5. '다음' 버튼 클릭 이벤트
    nextBtn.addEventListener("click", () => {
        currentIndex++;
        // 마지막 아이템에서 다음을 누르면 첫 번째 아이템으로 이동
        if (currentIndex >= bookData.length) {
            currentIndex = 0;
        }
        updateBanner(currentIndex);
    });
});




