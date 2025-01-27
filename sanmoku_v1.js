const IMG_MARU = "maru.svg";
const IMG_BATSU = "batsu.svg";
const CLASS_MARU = "maru";
const CLASS_BATSU = "batsu";

/* ---------------------- tdタグのclassを変更する ---------------------- */
//class="ground"の要素をすべて取得してイベントリスナを追加
const cells = document.querySelectorAll('.ground');
for (const cell of cells){
    cell.addEventListener('click', addClassToCell, {once: true});//イベントリスナを一回だけ動作させるための指定（ようするに一回しか反応しないようにする）
}



function addClassToCell(event){
    //クリックされたセルを取得
    const clickedCell = event.target;
    //クリックされたセルにclassを追加
    clickedCell.classList.add( turn === TURN_MARU ? CLASS_MARU : CLASS_BATSU);
    gameOverCheck();
    turn *= -1;
}

//ターンを表す変数
const TURN_MARU = 1;
const TURN_BATSU = -1;
const TURN_NULL = 0;
let turn = TURN_MARU; //ターンの初期値


//○は1, ×は-1としてrow_colの位置のセルの値を取り出す
function getCell(row, col) {
    const cell = document.querySelector(`#cell${row}_${col}`);
    if( cell.classList.contains(CLASS_MARU) ){
        return TURN_MARU;
    } else if ( cell.classList.contains(CLASS_BATSU) ){
        return TURN_BATSU;
    }
    return TURN_NULL;
}

//勝敗が付いているかどうかをチェック
function gameOverCheck() {
    //縦方向
    for( let i = 1 ; i < 6 ; i++ ){
        if( Math.abs(getCell(i,1) + getCell(i,2) + getCell(i,3) + getCell(i,4) + getCell(i,5)) == 5 ){
            showWinner();
        }
    }
    //横方向
    for( let i = 1 ; i < 6 ; i++ ){
        if( Math.abs(getCell(1,i) + getCell(2,i) + getCell(3,i) + getCell(4,i) + getCell(5,i)) == 5 ){
            showWinner();
        }
    }
    //斜め方向
    if( Math.abs(getCell(1,1) + getCell(2,2) + getCell(3,3) + getCell(4,4) + getCell(5,5)) == 3 ){
        showWinner();
    } else if( Math.abs(getCell(1,5) + getCell(2,4) + getCell(3,3) + getCell(4,2) + getCell(5,1)) == 3 ){
        showWinner();
    }
    //引き分けかどうか
    checkDraw();
}

//勝者を表示
function showWinner(){
    const msgPara = document.querySelector('#message');
    if( TURN_MARU === turn ){
        msgPara.textContent = "○の勝ち!";
    } else {
        msgPara.textContent = "×の勝ち!";
    }
    //全てのセルからリスナを取り除く（これ以上ゲームが進まないようにする） 
    for (const cell of cells) {
        cell.removeEventListener('click', addClassToCell);
    }
}

//引き分けかどうかをチェック
function checkDraw(){
    const cell = document.querySelector("td:not(.maru):not(.batsu)");
    if( cell === null ){
        const msgPara = document.querySelector('#message');
        msgPara.textContent = "引き分け!";
    }
}