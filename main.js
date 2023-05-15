const burgerIcon = document.querySelector('.burger-icon');
const menu = document.querySelector('.burger-elements');

addAD()

burgerIcon.addEventListener('click', () => {
  menu.classList.toggle('show');
});


const buttons = document.querySelectorAll(".btnDescribe");




function addBlocks(data) {

  let blocks_container = document.querySelector(".blocks");
  let blocks = "";

  let i = blocks_container.childElementCount;
 
  while((i < blocks_container.childElementCount + 5) && (i < data.length)){
    blocks += `
      <div class="block">
        <div class="container-img">
          <img src="files/${data[i].imgName}">
          <p class="overlay">${data[i].price}</p>
        </div>
        <p class="name">${data[i].name}</p>
        <p class="describe">${data[i].describe}</p>
        <button class="btnDescribe">опис</button>
      </div>
    `;
    i++;
  };
  
  blocks_container.innerHTML += blocks;

  let len = document.querySelector(".blocks").childElementCount;
  let moreBtn = document.querySelector(".moreBtn");

  if(len === data.length)
    moreBtn.style.display = "none";
  else
    moreBtn.style.display = "block";


  
  let btnsDescribe = blocks_container.querySelectorAll(".btnDescribe");
  btnsDescribe.forEach(btn => {
    btn.addEventListener("click", ()=>{
      const pDescribe = btn.parentNode.querySelector(".describe");
      pDescribe.classList.toggle("show");
    });
  });
}


fetch("infoJSON.json")
  .then(response => response.json())
  .then(dataConst => {

    let filterPanel = `
    <div class = "filterPanel">
      <input class = "searchInput" type="text" placeholder="...">
      <button class = "searchBtn">Пошук</button>
    </div>
    `;

    let filter_container = document.getElementById("filterContainer");
    filter_container.innerHTML = filterPanel;

    addBlocks(dataConst);

    let data = dataConst;

    let searchBtn = document.querySelector(".searchBtn");
    let searchText = document.querySelector(".searchInput");

    searchBtn.addEventListener("click", ()=>{
      let content = searchText.value;
      
      let blocks = document.querySelector(".blocks");
      if(content !== ""){
        blocks.innerHTML = "";
        
        let data_filtered = [];

        let i = 0;
        while(i < dataConst.length){
          if(dataConst[i].name.toLowerCase().includes(content.toLowerCase())){ 
            data_filtered.push(dataConst[i]);
            console.log(data_filtered);
          }
          i++;
        }
        data = data_filtered;
        addBlocks(data);
        

       
      }

      else{
        data = dataConst;
        blocks.innerHTML = "";
        addBlocks(dataConst);

      }
  })

    const btnMore = document.querySelector(".moreBtn");

    btnMore.addEventListener("click",() =>{
      addBlocks(data);  
    }) 
  })
.catch(error => {
  console.error("Error loading infoJSON.json:", error);
});


window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (window.pageYOffset > (window.innerHeight / 2)) {
    document.getElementById("goUp").classList.add("show");
  } else {
    document.getElementById("goUp").classList.remove("show")
  }
}
  

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}



setTimeout(()=>{
  if(!localStorage.getItem("subscribe")){
    let subscribeWindow = document.querySelector(".subscribe-window");
    subscribeWindow.classList.add("show");
  }



},2000);





function addAD() {

  setTimeout(() => { 
    let advertise = document.querySelector(".advertise");
    advertise.classList.add("show");

    const timer = document.querySelector(".timer");
    const close = document.querySelector(".close");

    let sec = 6;

    const count = () => {
      sec--;
      timer.innerHTML = sec;

      if (sec === 0) {
        timer.style.display = "none";
        close.style.display = "block";

        close.addEventListener("click",()=>{ 
          addAD();
          adRemove();
        });

      } else {
        setTimeout(count, 1000);
      }
    };

    count();
  }, 30000);
}

function adRemove() { 
  let advertise = document.querySelector(".advertise");
  advertise.classList.remove("show");
}


function removeWindow(){
  let subscribeWindow = document.querySelector(".subscribe-window");
  subscribeWindow.classList.remove("show");
}

function addMember(){
  localStorage.setItem("subscribe", true);
  removeWindow()
}