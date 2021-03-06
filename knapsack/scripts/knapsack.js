const userInput = document.getElementById('number-input');
const numberOfRows = document.getElementById('btn1');
var mwt;
let weight = [];
let price = [];
let profit = []; 

function getUserNumberInput(){
    return parseInt(userInput.value);
}

function fields(){
    const rate = document.getElementById('btn2');
    var lines = '';
    if ( getUserNumberInput() <= 0){
        alert("invalid user input!")
        return;
    }
    for (let i=1; i<=getUserNumberInput(); i++){
        lines += `<br>Weight <input type="number" id="weight${i}">  
        Price <input type="number" id="price${i}"> <br> <br>`;
    }
    document.getElementById("user-fields").innerHTML = lines;
    document.getElementById("rate").innerHTML = `<button id="btn2">Send</button> <br>`;
    // return lines;
}

function value(){
    weight = [];
    price = [];
    profit = [];
    var a;
    var b;
    for (let i=1; i<=getUserNumberInput(); i++){
            a = parseFloat(document.getElementById(`weight${i}`).value);
            b= parseFloat(document.getElementById(`price${i}`).value);
            if( (a > 0 && b >0 ) ){
                weight.push(a);
                price.push(b);
                profit.push(b/a);
            }else{
                alert("Invalid Input");
                return ;
            }

    }
    document.getElementById("max").innerHTML =`<br>Maximum weight <input type="number" id="maxwt"> <br>`;
    document.getElementById("done").innerHTML = `<br> <button id="btn3">Done</button>`;
    const done = document.getElementById('btn3');
    console.log("before sort profit " + profit);
    console.log("before sort weight " + weight);
    for (let i=0 ; i<getUserNumberInput(); i++){
        let min = i;
        for (let j=i+1; j<getUserNumberInput(); j++){
            if(profit[min]<profit[j]){
                min = j;
            }
        }
        if (min !== i){
            // for profit
            let tmp = profit[i];
            profit[i] = profit[min];
            profit[min] = tmp;
            // for weight 
            let tmp1 = weight[i];
            weight[i] = weight[min];
            weight[min] = tmp1;
            // for price
            let tmp2 = price[i];
            price[i] = price[min];
            price[min] = tmp2;
        }
    }
    console.log("after sort " + profit);
    console.log("after sort weight " + weight);
}

function knap(num1){
    let maxWt = parseFloat(document.getElementById(`maxwt`).value);
    if (maxWt<=0){
        alert ("Invalid user input");
        return;
    }
    let maxProfit = 0
    for (let i = 0; i<getUserNumberInput(); i++){
        if(maxWt>0 && weight[i]<=maxWt){
            maxProfit = maxProfit + price[i];
            maxWt = maxWt - weight[i];
        }
        else if(maxWt>0){
            maxProfit = maxProfit + (maxWt*profit[i]);
            maxWt = 0;
        }
        else{
            break;
        }
        console.log(maxProfit);
    }
    document.getElementById("result").innerHTML= "Maximim profit is "+ maxProfit;
}

numberOfRows.addEventListener('click', fields);
rate.addEventListener('click', value);
done.addEventListener('click', knap);