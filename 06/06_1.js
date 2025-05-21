//오브젝트 생성
let obj1 = {};
let obj2 = new Object();

//오브젝트 초기화
obj1 = {'a' : 1, 'b' : 2};

console.log(`a = ${obj1['a']}`)

//수정
obj1['a'] = 10;
console.log(obj1);

//추가
obj1['c'] = 30;
console.log(obj1);

//삭제
delete obj1['b'];
console.log(obj1);

//데이터 순회
console.log("오브젝트 키목록 : ",Object.keys(obj1));
console.log("오브젝트 값목록 : ",Object.values(obj1));
console.log("오브젝트 목록 : ",Object.entries(obj1));

for (let k of Object.keys(obj1)){
    console.log(obj1[k]);
}

for (let v of Object.values(obj1)){
    console.log(v);
}

for (let item of Object.entries(obj1)){
    console.log(item);
}

for (let [k,v] of Object.entries(obj1)){
    console.log(`키 : ${k}, 값 : ${v}`);
}

//오브젝트 복사
obj2 = {'apple' : '🍎', 'banana' : '🍌'};
obj1 = {...obj2,'orange' : '🍊'};

console.log(obj1);
console.log(obj2);