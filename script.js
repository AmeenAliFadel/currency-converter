const dropList = document.querySelectorAll('.drop-list select'),
fromCurrency = document.querySelector(".from select"),
toCurrency = document.querySelector('.to select')
getButton = document.querySelector("form button");
for (let index = 0; index < dropList.length; index++) {
    for(currency_code in country_code){
        let selected;
        if(index==0){
            selected = currency_code == "USD" ? "selected" : "";
        }else if(index==1){
            selected = currency_code == "NPR" ? "selected" : "";
        }
        let optionTag=`<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        dropList[index].insertAdjacentHTML("beforeend", optionTag);
    }
    dropList[index].addEventListener("change", e=>{
        loadFlag(e.target);
    })
    
}
function loadFlag(element){
    for(code in country_code){
        if(code == element.value){
            let imgTag = element.parentElement.querySelector("img");
            imgTag.src =`https://flagsapi.com/${country_code[code]}/flat/64.png`
        }
    }
}
window.addEventListener('load' ,()=>{
    getExchangeRate();
});
getButton.addEventListener('click' ,e=>{
    e.preventDefault();
    getExchangeRate();
});
const exchangeIcon =document.querySelector('.drop-list .icon');
exchangeIcon.addEventListener("click", ()=>{
    let tempCode=fromCurrency.value;
    fromCurrency.value=toCurrency.value;
    toCurrency.value=tempCode;
    loadFlag(fromCurrency);
    loadFlag(toCurrency);
    getExchangeRate();
})

function getExchangeRate(){
    const amount = document.querySelector(".amount input");
    const exchangeRateTxt = document.querySelector(".exchange-rate");
    let amountVal = amount.value;
    if(amountVal == "" || amountVal =="0"){
        amount.value = "1";
        amountVal=1;
    }
    exchangeRateTxt.innerText = "Getting Exchange Rate...";
    let url =`https://v6.exchangerate-api.com/v6/66d0d065d1912f723d402ac6/latest/${fromCurrency.value}`;
    fetch(url).then(response =>response.json()).then(result=>{
        let exchangeRate = result.conversion_rates[toCurrency.value];
        
        let totalExchangeRate = (amountVal * exchangeRate).toFixed(2);
        // console.log(totalExchangeRate);
        exchangeRateTxt.innerText=`${amountVal} ${fromCurrency.value} =${totalExchangeRate} ${toCurrency.value}`;
    }).catch(()=>{
        exchangeRateTxt.innerText = "Somethig went wrong";
    });
}