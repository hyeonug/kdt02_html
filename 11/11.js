document.addEventListener("DOMContentLoaded", () => {
    const ul = document.querySelector("main>ul");
    const dateInput = document.getElementById("dt");


    const yesterday = ()=>{
        let yday = new Date();
        yday.setDate(yday.getDate()-1);

        let y = yday.getFullYear();
        let m = yday.getMonth()+1;
        m = m <10 ? '0'+m : m;
        let d = yday.getDate();
        d = d<10 ? '0'+d : d;
        return y+m+d


    }


    fetchMovieList(yesterday());


    function fetchMovieList(date) {
        const url = `https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=51697218a4fe9c9c3e277d9fcef05bf3&targetDt=${date}`;
        fetch(url)
            .then(resp => resp.json())
            .then(data => {
                const list = data.boxOfficeResult.dailyBoxOfficeList;
                const tags = list.map(item => {
                    let icon = '';
                    if (item.rankInten > 0) icon = '<i class="fa-solid fa-arrow-up" style="color:green;"></i>';
                    else if (item.rankInten < 0) icon = '<i class="fa-solid fa-arrow-down" style="color:red;"></i>';
                    else icon = '<i class="fa-solid fa-minus"></i>';

                    return `<li>
                        <span class="spRank">${item.rank}</span>
                        <span class="spName">${item.movieNm}</span>
                        <span class="spRankChange">${icon}</span>
                    </li>`;
                }).join('');
                ul.innerHTML = tags;
            })
            .catch(console.error);
    }

    dateInput.addEventListener("change", e => {
        fetchMovieList(e.target.value.replace(/-/g, ""));
    });
});
