const inputText = document.getElementById("text");
const inputNumber = document.getElementById("amount");
const formSubmit = document.getElementById("form");
const modalOver = document.getElementById("modal-overlay");
const closeModal = document.getElementById("close-modal");
const balance = document.getElementById("balance");
const historyList = document.getElementById("list");
const btndeleteHistory = document.getElementById("btndeleteHistory");



btndeleteHistory.addEventListener("click", ()=>{
    localStorage.clear();
    historyList.innerHTML= '';
    balance.innerText = currencyFormatter (0);

})

let transactions = [];

const storedData = localStorage.getItem("expenses");


function paintItems (name, price) {

 const newLi = document.createElement("li");
 
 const deleteBtn = document.createElement("button");
 deleteBtn.innerText = "X";
 deleteBtn.classList.add("deleteBtn");
 

newLi.innerHTML= `<h1>${name}</h1> <p>${price}</p>`; 

historyList.appendChild(newLi);
newLi.appendChild(deleteBtn);

 }


if (localStorage.getItem("expenses")){

          console.log("Sisa´, funciono´");
          
       transactions = JSON.parse(storedData);  
  

    //  paintItems (tran.text, tran.amount);


     printer (transactions,historyList);

 ;

balance.innerText = currencyFormatter (reduceT());

}else{

          console.log("No");

}

 

function currencyFormatter (numb) {

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});
  

return formatter.format(numb)

}

 function reduceT () {

          const reduceArray = transactions.reduce((acumulator, transaction)=>{ return acumulator + transaction.amount },0);

          return reduceArray;
          
 }

function generateID() {

 return Date.now();

};

formSubmit.addEventListener("submit", (e)=>{

e.preventDefault();
 
 console.log(inputText.value.trim());
 console.log(inputNumber.value.trim());

if(inputText.value.trim() == ""  || inputNumber.value.trim() == ""){

   modalOver.classList.remove("hidden");

}else{

 const transaction = {
    id: generateID(),  
    text: inputText.value,
    amount: +inputNumber.value  
};

transactions.push(transaction);



console.log(transactions);
  
  if(transaction.amount < 0){

    const liCreate = document.createElement("li");
    liCreate.classList.add("minus");
    liCreate.innerHTML= `<h1>${transaction.text}</h1> ${transaction.amount}`

    
    historyList.appendChild(liCreate);

    const deleteBtn = document.createElement("button");
 deleteBtn.innerText = "X";
 deleteBtn.classList.add("deleteBtn");
 liCreate.appendChild(deleteBtn);
 balance.innerText = currencyFormatter (reduceT());
localStorage.setItem("expenses", JSON.stringify(transactions));

inputText.value = "";
    inputNumber.value = "";

}else{

   const liCreate = document.createElement("li");
    liCreate.classList.add("plus");
    liCreate.innerHTML= `<h1>${transaction.text}</h1> ${transaction.amount}`
        historyList.appendChild(liCreate);
        const deleteBtn = document.createElement("button");
 deleteBtn.innerText = "X";
 deleteBtn.classList.add("deleteBtn");
 liCreate.appendChild(deleteBtn);
 balance.innerText = currencyFormatter (reduceT());
localStorage.setItem("expenses", JSON.stringify(transactions));

inputText.value = "";
    inputNumber.value = "";
}

 

console.log(transactions);
}

});

closeModal.addEventListener("click",()=>{

          modalOver.classList.add("hidden");

});


modalOver.addEventListener("click", (e) => {
    if (e.target === modalOver) {
        modalOver.classList.add("hidden");
    }
});
 


function printer (array,father) {

array.forEach((item)=>{
    
    
 if(item.amount < 0){

    const liCreate = document.createElement("li");
    liCreate.classList.add("minus");
    liCreate.innerHTML= `<h1>${item.text}</h1> ${item.amount}`

    
    father.appendChild(liCreate);

    const deleteBtn = document.createElement("button");
 deleteBtn.innerText = "X";
 deleteBtn.classList.add("deleteBtn");
 liCreate.appendChild(deleteBtn);

}else{

   const liCreate = document.createElement("li");
    liCreate.classList.add("plus");
    liCreate.innerHTML= `<h1>${item.text}</h1> ${item.amount}`
        father.appendChild(liCreate);
        const deleteBtn = document.createElement("button");
 deleteBtn.innerText = "X";
 deleteBtn.classList.add("deleteBtn");
 liCreate.appendChild(deleteBtn);

}})


};

 

historyList.addEventListener("click", (e) => { 
 console.log(e.target.classList)
      if (e.target.classList.contains("deleteBtn")) {

        const itemClicked = e.target.parentElement;

        console.log("this",itemClicked);

        const indice = Array.from(historyList.children).indexOf(itemClicked);

        transactions.splice(indice, 1);

        localStorage.setItem("expenses", JSON.stringify(transactions));
  
          
          itemClicked.remove();

           balance.innerText = currencyFormatter (reduceT());

          console.log(itemClicked);
      }
 
 })





