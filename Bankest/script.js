'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Omar Abdelmoried',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');
const black =document.querySelector(".black");
const white  =document.querySelector(".white ");

const body  =document.querySelector("body");
 const movements__value =document.querySelector(".movements__value");
 const balanceDate=document.querySelector(".balance__date");
const logo =document.querySelector(".logo");
const color = document.querySelector(".color");
const formLabel=document.querySelector(".form__label");
/////////////////////////////////////////////////
// Function
//date lable dates
function timer(){

  const now =new Date();
  const opation ={
    day:"numeric",
    month:"long",
    year:"numeric",
    weekday:"long",
    hour:"numeric",minute:"numeric",second:"numeric"
  }


  setInterval(()=>{
    const now = new Date;
    
    labelDate.textContent = new Intl.DateTimeFormat(navigator.language,opation).format(now);
  },1000);
}



//!create user name
const createNames= function(accounts){
  accounts.forEach(account => 
     account.userName= account.owner.toLowerCase().split(" ").map(s1=>s1[0]).join("")
  );}
  createNames(accounts);
  //!End create user name
  
  
  //!login function
  btnLogin.addEventListener("click",function(e){
  console.log("welcome");
  e.preventDefault();
  const current= accounts.find(acc=>acc.userName===inputLoginUsername.value);
  console.log(current);
  if(current?.pin==inputLoginPin.value){
    containerApp.style.opacity=100;
    timer();
    labelWelcome.textContent=`welcome ${current.owner.split(" ")[0]}`;
    currentOperating(current);
  
    
  
  }});
  //!End login function
  
  
  
  const opation2 ={
    style:"currency",
    currency:"EUR"
  }
  
  function number(value,opation2){
   return new Intl.NumberFormat(navigator.language,opation2).format(value);
  }
  //! credit out account and credit in , interest and calac credit
  const movement= function(account){
    const sum = account.movements.reduce((acc,asc)=>acc+asc,0);
    labelBalance.textContent=`${number(sum,opation2)} `
    //!out
      const withdrawal = account.movements.filter(value=>value<0).reduce((acc,asc)=>acc+asc,0);
     
      labelSumOut.textContent=`${number(Number.parseInt(withdrawal*-1),opation2)} `;
      //!in
      const deposited = account.movements.filter(value=>value>0).reduce((acc,asc)=>acc+asc,0);
      labelSumIn.textContent=`${number(Number.parseInt(deposited),opation2)} `;
      //!sum interest
      const blance =account.movements.filter(mov=>mov>0).map(insr=>insr*account.interestRate/100).filter(mov=>mov>=1).reduce((acc,cur)=>
         acc+cur
          //!hint==> acc ===0 after that acc= acc+cur&&cur =vaue in array
        ,0);
        labelSumInterest.textContent=`${number(Number.parseInt(blance),opation2)}`
  }
  //!End credit out account and credit in , interest and calac credit
  
  //!add credit function
  btnLoan.addEventListener("click",function(e){
  e.preventDefault();
  let NewDate=new Date();

  let inputE =Number(inputLoanAmount.value);
  const current= accounts.find(acc=>acc.userName===inputLoginUsername.value);
  current.movementsDates.push(NewDate.toISOString());
  const correct=[...current.movements]
  if(correct.some(mov=>mov>inputE*.1)&&inputE>0){//correct.some() بتحقق اذا كان ف رقم عنصر واجد ف ال arr بيحقق الشرط
    current.movements.push(inputE);
    currentOperating(current);
  }
  inputLoanAmount.value="";
  
  
  });
  //!End add credit function
  
  
  
  //!trans credit
  btnTransfer.addEventListener("click", function(e) {
    e.preventDefault();


    const current = accounts.find(acc => acc.userName === inputTransferTo.value);
    const current2 = accounts.find(acc => acc.userName === inputLoginUsername.value);

    const sum = current2.movements.reduce((acc, val) => acc + val, 0);


    const amount = Number(inputTransferAmount.value);
console.log(amount);
    if (sum > amount && amount > 0) {
        if (current && current.userName !== current2.userName) {
            current.movements.push(amount);
            current2.movements.push(-amount);

            currentOperating(current2);
        } else {
            alert("تحقق من بيانات الحساب المستلم");
        }
    } else {
        alert("الرصيد غير كافٍ للتحويل");
    }

    const newDate = new Date();
    // console.log(newDate.toISOString());
    current.movementsDates.push(newDate.toISOString());
    current2.movementsDates.push(newDate.toISOString());

    inputTransferAmount.value = "";
    inputTransferTo.value = "";
});

    const currentOperating=function(current){
      operating(current);
      movement(current);
    };
    //!End trans credit
  
      //!mood
  black.addEventListener("click",function(){
    color.style.border= "solid #fff 2px";
    color.style.borderRadius= "20px";
   
    btnSort.style.color="#fff"

    logo.innerHTML=`<img src=${"icon.png"} alt="logo"> `
    body.style.backgroundColor="#000000e8";
    body.style.color="red";
    // summary.style.color="black";
    balanceDate.style.color="#fff"

  });
  white.addEventListener("click",function(){
    balanceDate.style.color="#444"

    logo.innerHTML=`<img src=${"logo.png"} alt="logo"> `
    body.style.backgroundColor="#f3f3f3";
    body.style.color="#444";
    logo.style.backgroundColor= "transparent";
    logo.style.padding= "none";
    logo.style.borderRadius= "none";
  
  });
  //!End mood
  //!close account
btnClose.addEventListener("click",function(e){
  e.preventDefault();
  const current=accounts.find(acc=>acc.userName===inputLoginUsername.value);
   if(current.userName===inputCloseUsername.value&&inputClosePin.value==current.pin){
  
    const index=accounts.findIndex(acs=>inputClosePin.value==current.pin);
   accounts.splice(index,index+1)
   containerApp.style.opacity=0;
   containerMovements.innerHTML="";
  
   inputClosePin.value="";
   inputCloseUsername.value="";
   inputLoginUsername.value="";
   inputLoginPin.value="";
  
   }
  
   currentOperating(current);
  });
  //! End close account
  //!some opretr
  const  movements= [200, 450, -400, 3000, -650, -130, 70, 1300];
  console.log(movements);
  console.log(movements.includes(-130));//!بتاخد ىقيم
  console.log(movements.some(mov=>mov>0));//!متياينه
  console.log(movements.some(mov=>mov>0));//?check if all emend achieve a conduction
  
  //!Flat==>
  
  const arr= [1,2,[3,4],5,[6,7,8,9]];//!expect out put [1,,2,3,4,5,6,7,8,9];
  console.log(arr.flat());//!dodn`t chang arr===>>//!expect out put [1,2,[3,4],5,[6,7,8,9]]
  
      const arrDeep= [1,2,[3,4],5,[6,7,[8,9]]];
      console.log(arrDeep.flat());//!expect out put [1,,2,3,4,5,6,7,[8,9]];
      console.log(arrDeep.flat(2))//!expect out put [1,,2,3,4,5,6,7,8,9];
  console.log(arr);
  
  
  console.log(arr.flat().map(mov=>mov*2));//!expect out put  [2, 4, 6, 8, 10, 12, 14, 16, 18];
  console.log(arrDeep.flat().map(mov=>mov*2));//!expect out put [2, 4, 6, 8, 10, 12, 14, NaN] 
  //?to solve this problem we use next solve
  console.log(arrDeep.flat(2).map(mov=>mov*2));//!expect out put  [2, 4, 6, 8, 10, 12, 14, 16, 18];
  // console.log(arr.flatMap());
  //!FlatMap==>
  console.log(arr.flatMap(mov=>mov*2));//!expect out put  [2, 4, 6, 8, 10, 12, 14, 16, 18];));
  console.log(arrDeep.flatMap(mov=>mov*2));//!expect out put [2, 4, 6, 8, 10, 12, 14, NaN] ;
  //? we can`t solve this problem work in one deep
  
  //!SORT==>
  const owners=accounts.map(acc=>acc.owner);
  console.log(owners.sort());//!expect out put ['Jessica Davis', 'Jonas Schmedtmann', 'Sarah Smith', 'Steven Thomas Williams'] رتبتهم عل حسب الحروف ويتغير المصفوفه الاصليه
  console.log(owners);//!expect out put ['Jessica Davis', 'Jonas Schmedtmann', 'Sarah Smith', 'Steven Thomas Williams']
  
  console.log(movements.sort());//!expect out put [-130, -400, -650, 1300, 200, 3000, 450, 70]
  //?solve
  console.log(movements.sort((a,b)=>{
    if(a>b){ return-1;}
    if(a<b) {return 1}
  }));//! expect out put [3000, 1300, 450, 200, 70, -130, -400, -650]
  console.log(movements.sort((a,b)=>a>b?1:-1));//!expect out put [-650, -400, -130, 70, 200, 450, 1300, 3000]
  console.log(movements.sort((a,b)=>b-a));//!expect out put [3000, 1300, 450, 200, 70, -130, -400, -650]
  
  console.log(movements.sort((a,b)=>a-b))//!expect out put [-650, -400, -130, 70, 200, 450, 1300, 3000]
  
  
  
  //!End some opretr
  //!doing operating in abb
const formatMovmentesDays = function(date, opation) {
  if (isNaN(new Date(date))) {
    return 'تاريخ غير صالح';
  }
  const calacDays = (day1, day2) => Math.round(Math.abs(day1 - day2) / (1000 * 60 * 60 * 24));
  const displayDate = calacDays(new Date(), date);
  if (displayDate === 0) return "To day";
  if (displayDate === 1) return "yesterday";
  if (displayDate < 7) return `${displayDate} أيام مضت`;
  else {
    return new Intl.DateTimeFormat(navigator.language, opation).format(date);
  }
}
  function operating(acc){
    containerMovements.innerHTML=" ";//ختمسح اى حاجه يين بداية ونهاية ال movementes
    // const movs=sor?acc.movements.slice().sort((a,b)=>a-b):acc.movements;
  
    acc.movements.forEach((mov,i,arr) => { 
      let totel=0;
      const opation ={
        day:"2-digit",
        month:"2-digit",
        year:"numeric",
      
      }
      const date = new Date(acc.movementsDates[i]);
     const date2= `${formatMovmentesDays(date,opation)}`
      
      // تحويل القيمة إلى تاريخ
    
         totel+=mov;
   
         const dateType = mov > 0 ?"deposit" : "withdrawal";
         const moving =` <div class="movements__row">
         <div class="movements__type movements__type--${dateType}">${i+1} ${dateType}</div>
         <div class="movements__date"> ${date2} </div>
         <div class="movements__value"> (${number(totel,opation2)})</div>
      </div>`;
      containerMovements.insertAdjacentHTML("afterbegin", moving);
  
        });};
  
      //!End doing operating in abb
  let sort=false;
  //!sort btn
  btnSort.addEventListener("click",function(e){
    e.preventDefault();
   
    const current = accounts.find(acc=>acc.userName===inputLoginUsername.value);
     const movs = sort ? current.movements.slice().sort((a,b)=>a-b):current.movements;

    operating({ movements: movs, movementsDates: current.movementsDates }); // استخدام القائمة الأصلية للتاريخ في العرض
     sort= !sort;
  
    
  });
  
  
  
  
  
  
  
  
  
  function User(id ,name){
    this.u=id;
    this.n=name;
  }
  const omar= new User(23,"omar");
  console.log(omar);
  
  
  
  
  
  
  //!End sort btn

  formatMovmentesDays 
  
//end date laple date
  // سيطبع الدالة قيمة المصفوفة arr بعد حساب البتات للعدد 1234
  
  