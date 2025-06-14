let arr = [0, 0, 0, 0, 0, 0, 0, 0, 1];
let isFlag = false;
let cnt = 0;  // 전역변수로 선언

const init = (cols) => {
    arr.sort(() => Math.random() - 0.5);
    isFlag = true;
    cnt = 0;   // 초기화만 함

    for (let [idx, col] of cols.entries()) {
        col.innerHTML = '';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const cols = document.querySelectorAll('.col');
    const bt = document.querySelector('button');
    const msg = document.querySelector('#msg');

    // 여기서 let cnt = 0; 삭제
    // let cnt = 0; 

    for (let [idx, col] of cols.entries()) {
        col.addEventListener('click', () => {
            if (!isFlag) {
                msg.innerHTML = "폭탄을 섞어주세요.";
                return;
            }

            if (msg.innerHTML.includes('실패')) return;

            if (col.innerHTML !== '') return;

            if (arr[idx] == 0) {
                col.innerHTML = '<img src="../img/hart.png">';
                cnt++;

                if (cnt === 8) {
                    msg.innerHTML = "성공!";
                    bt.innerHTML = "폭탄섞기";
                    isFlag = false;
                    cnt = 0;
                    cols[arr.indexOf(1)].innerHTML = '<img src="../img/hart.png">';
                }
            } else if (arr[idx] == 1) {
                col.innerHTML = '<img src="../img/boom.png">';
                msg.innerHTML = "실패!";
                bt.innerHTML = "폭탄섞기";
                isFlag = false;
            }
        });
    }

    bt.addEventListener('click', () => {
        if (!isFlag) {
            msg.innerHTML = "";
            bt.innerHTML = "게임중...";
            init(cols);
        }
    });
});
