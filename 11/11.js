const yesterday = () => {
  let yday = new Date() ;
  yday.setDate(yday.getDate() - 1) ; //어제 날짜

  return yday.toISOString().slice(0, 10);

  // let y = yday.getFullYear() ; //연도4자리
  // let m = yday.getMonth() + 1 ; //월 
  // m = m < 10 ? '0' + m : m ;

  // let d = yday.getDate() ; //일
  // d = d < 10 ? '0' + d : d ;
  
  // return y+String(m).padStart(2, '0')+String(d).padStart(2,'0') ;
}
const getPoster = (movieName, callback) => {
  const tmdbKey = "fbb253eea2feff796a6b932a28a236e5";
  let url = `https://api.themoviedb.org/3/search/movie?api_key=${tmdbKey}&query=${encodeURIComponent(movieName)}&language=ko`;

  fetch(url)
    .then(resp => resp.json())
    .then(data => {
      if (data.results && data.results.length > 0) {
        const posterPath = data.results[0].poster_path;
        callback(posterPath ? `https://image.tmdb.org/t/p/w200${posterPath}` : null);
      } else {
        callback(null);
      }
    })
    .catch(err => {
      console.error(err);
      callback(null);
    });
};

const getMvList = (dt, ul, gubun) => {
  console.log("dt=", dt);
  const apikey = "51697218a4fe9c9c3e277d9fcef05bf3";

  let url = `http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${apikey}&targetDt=${dt}`;

  if (gubun == "r2") {
    url = `${url}&multiMovieYn=N`;
  } else if (gubun == "r3") {
    url = `${url}&multiMovieYn=Y`;
  }

  fetch(url)
    .then(resp => resp.json())
    .then(data => {
      const dailyBoxOfficeList = data.boxOfficeResult.dailyBoxOfficeList;
      console.log(dailyBoxOfficeList);

      const mvList = dailyBoxOfficeList.map(item =>
        `<li>
          <span class="spRank">${item.rank}</span>
          <span class="spMv">${item.movieNm}</span>
          ${parseInt(item.rankInten) > 0
            ? '<span class="spR"><i class="fa-solid fa-arrow-up"></i>' + Math.abs(item.rankInten) + "</span>"
            : parseInt(item.rankInten) < 0
              ? '<span class="spB"><i class="fa-solid fa-arrow-down"></i>' + Math.abs(item.rankInten) + "</span>"
              : '<i class="fa-solid fa-minus sp"></i>'
          }
        </li>`
      );

      ul.innerHTML = mvList.join('');

      
      const liList = ul.querySelectorAll('li');
     liList.forEach((li, idx) => {
  const movieName = dailyBoxOfficeList[idx].movieNm;
  const movieCd = dailyBoxOfficeList[idx].movieCd;
  const openDt = dailyBoxOfficeList[idx].openDt;
const audiAcc = dailyBoxOfficeList[idx].audiAcc;
  li.addEventListener('click', () => {
    getPoster(movieName, (posterUrl) => {
      const posterDiv = document.querySelector('.poster');
      posterDiv.innerHTML = posterUrl
        ? `<img src="${posterUrl}" alt="포스터">
        <div class="movieCd">영화코드: ${movieCd}</div>
        <div class="openDt">개봉일:${openDt}</div>
        <div class="audiAcc">누적관객수:${audiAcc}</div>`
        : `<span>포스터 없음</span>
        <div class="movieCd">영화코드: ${movieCd}</div>
        <div class="openDt">개봉일:${openDt}</div>
        <div class="audiAcc">누적관객수:${audiAcc}</div>`;
    });
  });

  
});

    })
    .catch(err => console.log(err));
};


document.addEventListener("DOMContentLoaded", ()=>{
  const ul = document.querySelector("main ul") ;
  const dtIn = document.querySelector("#dt") ;
  const bt = document.querySelector(".divRadio > button")
  dtIn.setAttribute("max", yesterday()) ;

  dtIn.value = yesterday() ; 
  getMvList(dtIn.value.replaceAll('-',''), ul) ;
  console.log(yesterday())

  dtIn.addEventListener("change" , () => { 
    document.querySelector('.poster').innerHTML = '';
    getMvList(dtIn.value.replaceAll('-',''), ul, "") ;
  });
  
  bt.addEventListener("click" , (e)=>{
    e.preventDefault();
    
    const gubun = document.querySelector("[type=radio]:checked").value ; 
    getMvList(dtIn.value.replaceAll('-',''), ul, gubun) ;
  });
});