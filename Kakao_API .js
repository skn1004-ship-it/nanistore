document.addEventListener("DOMContentLoaded", () => {
    const searchForm = document.querySelector(".Main_banner_search");
    const searchInput = document.querySelector(".search_input");

    // form의 기본 제출(새로고침) 동작을 막고 API 호출하기
    searchForm.addEventListener("submit", (e) => {
        e.preventDefault(); // 페이지 새로고침 방지

        const query = searchInput.value.trim();
        if (!query) {
            alert("검색어를 입력해주세요.");
            return;
        }

        searchBooks(query);
    });
});

// 카카오 도서 검색 API 호출 함수
async function searchBooks(query) {
    const REST_API_KEY = '700ebf4ec991a549ab74fa9d95364239'; // 🔴여기에 복사한 REST API 키를 넣으세요!
    const url = `https://dapi.kakao.com/v1/search/book?target=title&query=${encodeURIComponent(query)}`;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": `KakaoAK ${REST_API_KEY}` // 카카오 인증 헤더
            }
        });

        if (!response.ok) {
            throw new Error("API 요청에 실패했습니다.");
        }

        const data = await response.json();
        console.log("검색 결과 데이터:", data.documents);
        
        // 받아온 데이터를 화면에 뿌려주는 함수 실행
        displayResults(data.documents);

    } catch (error) {
        console.error("에러 발생:", error);
        alert("도서 검색 중 오류가 발생했습니다.");
    }
}

// 결과를 화면에 그리는 함수 (예시)
function displayResults(books) {
    // 💡 이 부분에서 받아온 books 배열을 가지고 
    // 메인 배너의 우측 책 정보(.Main_banner_book)를 변경하거나,
    // 본문 영역에 검색 결과 리스트를 생성하시면 됩니다!
    
    if(books.length > 0) {
        const firstBook = books[0]; // 가장 첫 번째 검색 결과
        
        // 예시: 메인 배너 우측의 책 정보를 검색된 첫 번째 책으로 임시 교체하기
        document.getElementById("main_banner_book_img").src = firstBook.thumbnail || '이미지/no-image.jpg';
        document.getElementById("Main_banner_title1").textContent = firstBook.title;
        document.getElementById("Main_banner_author1").innerHTML = `${firstBook.authors.join(', ')}<br>${firstBook.publisher}`;
    } else {
        alert("검색 결과가 없습니다.");
    }
}