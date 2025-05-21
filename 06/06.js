document.addEventListener('DOMContentLoaded', () => {
    const img = document.querySelector(".mdiv > img");
    const bt = document.querySelector(".mdiv > button");

    bt.addEventListener('click', () => {
        //1.1에서 6까지 랜덤 수 생성
        let n = Math.floor(Math.random() * 6) + 1;

        //2.랜덤수에 해당하는 이미지 변경
        img.setAttribute('src', `../img/${n}.png`);
        img.setAttribute('alt', `${n}번 주사위`);
    })
});