document.addEventListener('DOMContentLoaded', () => {
    // 요소 가져오기
    const img = document.querySelector('.mdiv > img');
    const txt1 = document.querySelector('#txt1');
    const bt = document.querySelector('button');

    //flag 변수
    let flag = false;
    let n;

    bt.addEventListener('click', (e) => {

        if (!flag) {
            n = Math.floor(Math.random() * 100) + 1; //1~100까지
            flag = true;
            img.setAttribute('src', '../img/what.png');
            txt1.value = '';
            txt1.style.display = 'inline';
            txt1.focus();
            bt.innerHTML = '확인';
            return;
        }
        console.log(n);
        
        if (parseInt(txt1.value) > n) {
            img.setAttribute('src', '../img/down.png');
        }
        else if (parseInt(txt1.value) < n) {
            img.setAttribute('src', '../img/up.png');
        }
        else if (parseInt(txt1.value) == n) {
            txt1.style.display = 'none';
            bt.innerHTML = '다시 하기';
            flag = false;
            img.setAttribute('src', '../img/good.png');
        }
    })
})