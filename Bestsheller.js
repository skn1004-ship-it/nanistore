document.addEventListener('DOMContentLoaded', () => {

    // 1. 실제 데이터 배열
    const bookData = [
        {
            subtitle: "나는 내가 아닌 나", 
            mainTitle1: "60여 년 전 어느 청년이 남긴",
            mainTitle2: "삶과 존재에 대한 치열한 기록.",
            imgSrc: "이미지/BestSheller1_나는 내가 아닌 나.jpg",
            link: "https://search.daum.net/search?w=bookpage&bookId=7208312&q=%EB%82%98%EB%8A%94+%EB%82%B4%EA%B0%80+%EC%95%84%EB%8B%8C+%EB%82%98" 
        },
        {
            subtitle: "날아라 고양이",
            mainTitle1: "길고양이 '나비'의",
            mainTitle2: "묘생역전 이야기",
            imgSrc: "이미지/BestSheller2_날아라 고양이.jpg",
            link: "#" 
        },
        {
            subtitle: "방구석 수필",
            mainTitle1: "가족, 나를 만든사람들",
            mainTitle2: "2025 문학나눔 선정도서",
            imgSrc: "이미지/BestSheller3_방구석 수필.jpg",
            link: "https://search.daum.net/search?w=bookpage&bookId=6868818&q=%EB%B0%A9%EA%B5%AC%EC%84%9D+%EC%88%98%ED%95%84" 
        },
        {
            subtitle: "아주 특별한 상처물고기",
            mainTitle1: "상처를 딛고",
            mainTitle2: "빛나는 나로 자라는 이야기",
            imgSrc: "이미지/BestSheller4_아주 특별한 상처물고기.jpg",
            link: "https://search.daum.net/search?w=bookpage&bookId=7186450&q=%EC%95%84%EC%A3%BC+%ED%8A%B9%EB%B3%84%ED%95%9C+%EC%83%81%EC%B2%98%EB%AC%BC%EA%B3%A0%EA%B8%B0" 
        }
    ];

    let currentIndex = 0; 
    let autoFlipTimer = null; 

    // 2. HTML 요소 선택
    const container = document.querySelector('.BestSheller_section_show');
    const subTitleEl = document.querySelector('.BestSheller_sub_title');
    const mainTitleSpans = document.querySelectorAll('.BestSheller_main_title span');
    const moreBtnEl = document.querySelector('.BestSheller_more_btn');
    const imgEl = document.querySelector('.BestSheller_img img');
    const imgWrapEl = document.querySelector('.BestSheller_img');
    const pageEl = document.querySelector('.BestSheller_page'); 

    const prevBtn = document.getElementById('BestSheller_btn_left');
    const nextBtn = document.getElementById('BestSheller_btn_right');

    // 3. 화면을 갱신하고 애니메이션을 리셋하는 함수
    function updateSlider(index) {
        currentIndex = index;
        const currentBook = bookData[currentIndex];

        // [삭제] 기존 작동하던 애니메이션 강제 초기화
        if (subTitleEl) subTitleEl.style.animation = 'none';
        if (mainTitleSpans[0]) mainTitleSpans[0].style.animation = 'none';
        if (mainTitleSpans[1]) mainTitleSpans[1].style.animation = 'none';
        if (moreBtnEl) moreBtnEl.style.animation = 'none';
        if (imgWrapEl) imgWrapEl.style.animation = 'none';
        
        // 리플로우(Reflow) 발생으로 애니메이션 초기화 인지
        if (subTitleEl) void subTitleEl.offsetWidth; 

        // [수정] 데이터 매칭 및 텍스트/이미지 변경 (요소가 존재할 때만 안전하게 실행)
        if (subTitleEl) subTitleEl.textContent = currentBook.subtitle;
        if (mainTitleSpans[0]) mainTitleSpans[0].textContent = currentBook.mainTitle1;
        if (mainTitleSpans[1]) mainTitleSpans[1].textContent = currentBook.mainTitle2;
        if (imgEl) imgEl.src = currentBook.imgSrc;
        
        // 책이 바뀔 때마다 상세페이지 링크 주소도 함께 변경
        if (container) {
            container.href = currentBook.link || '#';
        }
        
        // 하단 페이지 번호 갱신
        if (pageEl) {
            pageEl.textContent = `${currentIndex + 1} / ${bookData.length}`;
        }

        // [수정] CSS 쌓이는 애니메이션 재발동 (.style.style.animation 오타 완전 삭제)
        if (subTitleEl) subTitleEl.style.animation = 'fadeInUpStack 0.8s forwards';
        if (mainTitleSpans[0]) mainTitleSpans[0].style.animation = 'fadeInUpStack 0.8s forwards 0.6s';
        if (mainTitleSpans[1]) mainTitleSpans[1].style.animation = 'fadeInUpStack 0.8s forwards 1.2s';
        if (moreBtnEl) moreBtnEl.style.animation = 'fadeInUpStack 0.6s forwards 2.0s';
        if (imgWrapEl) imgWrapEl.style.animation = 'fadeInUpStack 0.8s forwards 0.3s';
    }

    // 4. 타이머 제어 함수 (자동 회전 시작 및 재시작)
    function startAutoFlip() {
        if (autoFlipTimer) clearInterval(autoFlipTimer);

        autoFlipTimer = setInterval(() => {
            let nextIndex = (currentIndex + 1) % bookData.length;
            updateSlider(nextIndex);
        }, 5000);
    }

    // 5. 버튼 클릭 이벤트 리스너 등록
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            let nextIndex = (currentIndex - 1 + bookData.length) % bookData.length;
            updateSlider(nextIndex);
            startAutoFlip();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            let nextIndex = (currentIndex + 1) % bookData.length;
            updateSlider(nextIndex);
            startAutoFlip();
        });
    }

    // 6. 최초 실행
    updateSlider(0); 
    startAutoFlip(); 
});


