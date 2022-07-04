let container = document.querySelector(".container");
let feat = document.querySelector(".feat");
let Search_Input = document.querySelector(".Search-Input");
let Clear_Icon = document.querySelector(".Clear-Icon");

// use async function too fetch data .json

async function GetData() {
    try {
        let JsonData = await fetch("javascript/data.json");
        let data = await JsonData.json();
        return data;
    } catch {
        console.error("no data");
    }
    return data;
}

//  add data Dynamic to dom
//ues  anonymous function inside template letter  it call self
// use map inside template letter  to loop on array
// use if condition inside template letter  by anonymous function
function DisplayData() {
    GetData().then((data) => {
                let results = "";
                data.forEach((el) => {
                            results += ` <div class="jobs">
                        <div class="job_details">
                        <div class="ImgJob">
                                <img src="${el.logo}" alt="${el.company}">
                        </div>
                <div class="details">
                <div class="HeaderJob">
                    <span>${el.company}</span>
                    ${(() => {
                      if (el.new) {
                        return "<span>new</span>";
                      } else {
                        return "";
                      }
                    })()}


                    ${(() => {
                      if (el.featured) {
                        return "<span>featured</span>";
                      } else {
                        return "";
                      }
                    })()}
        </div>
        <h2>${el.position}</h2>
        <div class="FooterJob">
            <span>${el.postedAt}</span><span>${el.contract}</span><span>${
        el.location
      }</span>
        </div>
    </div>
</div>
<div class="job_skills">
    <ul class="SkillsNames">
    <li class= "Li-Skill">${el.role}</li>
    <li class = "Li-Skill">${el.level}</li>
    ${el.languages.map((v) =>`<li class ="Li-Skill">${v}</li>`)}
    </ul>
</div>
</div>`;
    });
    container.innerHTML = results;
  });
}
DisplayData();

// add tag name to input to search
document.body.onclick = (e) => {
  if (e.target.classList.contains("Li-Skill")) {
    Search_Input.classList.remove("empty");
    Clear_Icon.classList.remove("empty");
  }
};
// clear input
// remove the input search
// remove the clear icon

Clear_Icon.addEventListener("click", () => {
  Search_Input.innerHTML = "";
  Clear_Icon.classList.add("empty");
  Search_Input.classList.add("empty");
  DisplayData();
});

// HiddenIcon_Input
function HiddenIcon_Input() {
  if (Search_Input.innerText == "") {
    Search_Input.classList.add("empty");
    Clear_Icon.classList.add("empty");
    DisplayData();
  }
}
HiddenIcon_Input();

// Add values to input with class name and update

document.body.addEventListener("click", (e) => {
 
  if (e.target.classList.contains("Li-Skill")) {
    Search_Input.innerHTML += `<div class="ContentSearch"><li class="List-search">${e.target.innerText}</li><span class="close"></span></div>`;
     DeleteSkill ();
   
    let resultsSearch = "";
    GetData().then((data) => {
      data.forEach((ele) => {
        let position = ele.position;
        let role = ele.role;
        let level = ele.level;
        if (
          Search_Input.innerText.includes(role) ||
          Search_Input.innerText.includes(level) ||
          Search_Input.innerText.includes(position) ||
          Search_Input.innerText.includes(ele.languages.map((v) => v))
        ) {
          resultsSearch += ` <div class="jobs">
        <div class="job_details">
        <div class="ImgJob">
                <img src="${ele.logo}" alt="${ele.company}">
        </div>
        <div class="details">
                <div class="HeaderJob">
                    <span>${ele.company}</span>
                    ${(() => {
                      if (ele.new) {
                        return "<span>new</span>";
                      } else {
                        return "";
                      }
                    })()}


                    ${(() => {
                      if (ele.featured) {
                        return "<span>featured</span>";
                      } else {
                        return "";
                      }
                    })()}
        </div>
        <h2>${ele.position}</h2>
        <div class="FooterJob">
            <span>${ele.postedAt}</span><span>${ele.contract}</span><span>${
            ele.location
          }</span>
        </div>
    </div>
</div>
<div class="job_skills">
    <ul class="SkillsNames">
    <li class= "Li-Skill">${ele.role}</li>
    <li class = "Li-Skill">${ele.level}</li>
    ${ele.languages.map((v) => `<li class="Li-Skill">${v}</li>`)}
    </ul>
</div>
</div>`;
        }
      });
      container.innerHTML = resultsSearch;
    });
  }

});


function DeleteSkill (){
  let CloseBtn = document.querySelectorAll(".close");
  let ContentSearch = document.querySelectorAll(".ContentSearch");
  CloseBtn.forEach((Btn)=>{
    Btn.addEventListener('click',(e)=>{
      e.target.parentElement.remove();
      
      HiddenIcon_Input();
    })
  })

}