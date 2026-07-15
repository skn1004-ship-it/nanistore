// 1. 전체 책 데이터를 담을 변수
let allBooks = []; 
let currentIndex = 0;

// 2. 데이터 가져오기 및 초기화 함수
async function fetchTodayBooks() {
    const API_KEY = '700ebf4ec991a549ab74fa9d95364239';
    const query = '추천';

    try {
        const response = await fetch(`https://dapi.kakao.com/v3/search/book?target=title&query=${query}&size=50`, {
            headers: { Authorization: `KakaoAK ${API_KEY}` }
        });
        const data = await response.json();
        
        // 데이터 전체 저장
        allBooks = data.documents; 
        
        // 첫 렌더링
        renderBooks(); 
        
    } catch (error) {
        console.error('책 정보를 가져오는 중 오류 발생:', error);
    }
}

// 3. 화면 그리기 함수
function renderBooks() {
    const container = document.getElementById('book-list-container');
    container.innerHTML = '';
    
    // 현재 인덱스 기준 4개만 표시
    const visibleBooks = allBooks.slice(currentIndex, currentIndex + 4);
    
    visibleBooks.forEach(book => {
        const bookItem = document.createElement('a');
        bookItem.className = 'Today_book_section';
        bookItem.href = book.url;
        bookItem.target = '_blank';
        
        bookItem.innerHTML = `
            <img class="Today_book_cover" src="${book.thumbnail}" alt="${book.title}">
            <p class="Today_book_name">${book.title}</p>
        `;
        container.appendChild(bookItem);
    });
    const emptyCount = 4 - visibleBooks.length;
    for (let i = 0; i < emptyCount; i++) {
        const emptyItem = document.createElement('div');
        emptyItem.className = 'Today_book_section'; // 같은 스타일 공유
        emptyItem.style.visibility = 'hidden'; // 안 보이게 숨김
        container.appendChild(emptyItem);
    }
}

// 4. 화살표 버튼 클릭 이벤트
document.getElementById('next-btn').addEventListener('click', () => {
    if (currentIndex + 4 < allBooks.length) {
        currentIndex += 4;
        renderBooks();
    }
});

document.getElementById('prev-btn').addEventListener('click', () => {
    if (currentIndex - 4 >= 0) {
        currentIndex -= 4;
        renderBooks();
    }
});

// 5. 실행
fetchTodayBooks();