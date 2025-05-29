document.addEventListener("DOMContentLoaded", () => {
    const ul = document.querySelector("main>ul");
    function fetchMovieList(date) {
        const url = `https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=51697218a4fe9c9c3e277d9fcef05bf3&targetDt=${date}`;


        fetch(url)
            .then(resp => resp.json())
            .then(data => {
                const list = data.boxOfficeResult.dailyBoxOfficeList;
                const tags = list.map(item => {
                    let icon = '';
                    if (item.rankInten > 0) {
                        icon = '<i class="fa-solid fa-arrow-up" style="color:green;"></i>';
                    } else if (item.rankInten < 0) {
                        icon = '<i class="fa-solid fa-arrow-down" style="color:red;"></i>';
                    } else {
                        icon = '<i class="fa-solid fa-minus"></i>';
                    }
                    return `<li>
      <span class="spRank">${item.rank}</span>
      <span class="spName">${item.movieNm}</span>
      <span class="spRankChange">${icon}</span>
    </li>`;
                }).join('');

                document.querySelector("main>ul").innerHTML = tags;
            })
            .catch(err => console.error(err));
    }
    document.getElementById("dt").addEventListener("change", (e) => {
        const selected = e.target.value.replace(/-/g, "");
        fetchMovieList(selected);
    });

});
