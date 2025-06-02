const SERVICE_KEY = 'uo%2FkP%2FvjK3cPQRqeJrvXqGlLCbxtxlJws51ULgnh4qhRwc59Z5ReFiii1r%2FYIvCmJeXld6zhWOf4a%2B21NZipyg%3D%3D'

function search() {
    const keyword = document.getElementById('searchInput').value.trim();
    if (!keyword) {
        alert("검색어를 입력하세요.");
        return;
    }

    const url = `https://apis.data.go.kr/B551011/PhotoGalleryService1/gallerySearchList1?serviceKey=${SERVICE_KEY}&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=test&arrange=A&keyword=${encodeURIComponent(keyword)}&_type=json`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const items = data.response.body.items.item;
            const container = document.getElementById('resultContainer');
            container.innerHTML = '';

            if (!items || items.length === 0) {
                container.innerHTML = '<p>검색 결과가 없습니다.</p>';
                return;
            }

            items.forEach(item => {
                const div = document.createElement('div');
                div.className = 'result-item';
                div.innerHTML = `
                    <img src="${item.galWebImageUrl}" alt="${item.galTitle}">
                    <h4>${item.galTitle}</h4>
                    <p>${item.galPhotographyLocation}</p>
                `;
                container.appendChild(div);
            });
        })
        .catch(error => {
            console.error('오류 발생:', error);
            alert('데이터를 불러오는 중 문제가 발생했습니다.');
        });
        
}
function resetForm() {
    document.getElementById('resultContainer').innerHTML = ''; 
}
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('searchInput').addEventListener('keydown', function(event) {
      if (event.key === 'Enter') {
          event.preventDefault();
          search();
      }
  });
});