let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let result = document.querySelector(".result");
let turn0=true;
// win patterns
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

// switch turns
boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(turn0){
            box.innerText = "O";
            turn0 = false;
        } else {
            box.innerText = "X";
            turn0 = true;
        }
        box.disabled = true;

        checkWinner();
    });
});

//check winner
const checkWinner = () =>{
    for(let pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if (pos1Val === pos2Val && pos2Val==pos3Val){
                boxes[pattern[0]].style.backgroundColor="green";
                boxes[pattern[1]].style.backgroundColor="green";
                boxes[pattern[2]].style.backgroundColor="green";
                result.innerText=`Winner of the Game is ${pos1Val}`
            }
        }
    }
}