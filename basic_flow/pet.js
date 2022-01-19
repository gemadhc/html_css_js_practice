
console.log("hello!");

const questions = ["What kind of animal are you looking for?",
                    "What's your lifestyle like?",
                    "Are there any children in the household?"
];

const answer_1 = ["cats", "dogs", "fish", "turtles"];
const answer_2 = ["stay at home mostly",
                "go out at lot",
                 "need an adventure companion"];
const answer_3 =["yes", "no", "not now but they are in the future"];
const answers = [];
answers.push(answer_1);
answers.push(answer_2);
answers.push(answer_3);
var k = 0;
var j = 0;
var quiz_active = false;
var is_first_quiz = true;
const match_names = ["Bob", "Clara", "Sid", "spencer"];
const match_images= ["images/cat_portrait.jpg", "images/cat_portrait.jpg",
"images/cat_portrait.jpg","images/cat_portrait.jpg"];
const info = "ksdfdsfdsfhdksahfjk kjsdhf askdhfk asddjhfkhsakjkjasdf sdkjfhjdfskj"
var total_matches = match_names.length;

function clean_matches(){
  document.querySelector(".quiz_button").remove();
  document.querySelector(".show_matches").remove();
  document.querySelector("h3").remove();
  is_first_quiz = false;
  display_quiz();
}
function hide_matches(){
  document.querySelector(".quiz_button").remove();
  document.querySelector(".show_matches").style.display = "none";
  document.querySelector("h3").style.display = "none";

}
function unhide_matches(){
  /*hide the card info*/
  document.querySelector("p").remove();
  document.querySelector(".animal_card").remove();
  let new_b = document.createElement("button");
  new_b.classList.add("quiz_button");
  new_b.innerHTML = "start again";
  new_b.addEventListener("click", clean_matches);
  document.querySelector(".card").prepend(new_b);
  document.querySelector(".show_matches").style.display = "flex";
  document.querySelector("h3").style.display = "block";

}
function match_info(){
  hide_matches();
  let container = document.createElement("article");
  let information = document.createElement("p");
  let name = document.createElement("h4");
  let goback_button = document.createElement("button");
  let image = document.createElement("img");
  image.setAttribute("src", match_images[k]);
  name.innerHTML = match_names[k];
  information.innerHTML = info;
  goback_button.innerHTML = "Go back!";
  goback_button.classList.add("quiz_button");
  image.classList.add("card_photo");
  container.classList.add("animal_card");
  container.append(goback_button);
  goback_button.addEventListener("click", unhide_matches);
  container.append(image);
  container.append(name);
  container.append(information);
  document.querySelector(".show_matches").style.display = "none";
  document.querySelector("h3").style.display = "none";
  document.querySelector(".card").append(container);
}


function display_matches(){
    quiz_active = false;
    let my_card = document.querySelector(".card");
    let header = document.createElement("h3");
    let start_again = document.createElement("button");
    start_again.innerHTML ="try again";
    start_again.classList.add("quiz_button");
    start_again.style.display = "block";
    header.innerHTML ="We found " + total_matches + " matches!";
    my_card.append(start_again);
    start_again.addEventListener("click", function(){
      clean_matches();
      display_quiz();
    });
    my_card.append(header);
    let show_matches = document.createElement("div");
    show_matches.classList.add("show_matches");
    my_card.append(show_matches);

    for(let i = 0 ; i < total_matches; i++){
        let profile = document.createElement("div");
        profile.classList.add("profile");
        let new_match_name = document.createElement("h4");
        let new_match_image = document.createElement("img");
        new_match_name.innerHTML = match_names[i];
        new_match_image.setAttribute("src", match_images[i]);
        new_match_image.classList.add("match_image");
        profile.append(new_match_image);
        profile.append(new_match_name);
        show_matches.append(profile);
        profile.addEventListener("click", function(){
          k = i;
          match_info();
        });
    }
}

function clean_quiz(){
  document.querySelector("h2").remove();
  document.querySelector(".answer_box").remove();
   document.querySelector(".quiz_button").remove();
}
function clean_landing(){
  //document.querySelector("h2").style.display = "none";
  document.querySelector("p").style.display = "none";
  document.querySelector("button").remove();
}

function update_quiz(){
  if( j == questions.length){
    clean_quiz();
    display_matches();
  }else{
    let question = document.querySelector("h2");
    question.innerHTML = questions[j];
    if(j > 0){
      for(let i = 0; i < answers[j-1].length; i++){
        let to_remove = document.querySelector(".answer_item");
        to_remove.remove();
      }
    }
    for(let i = 0; i < answers[j].length; i++){
      let answer_spot = document.createElement("div");
      answer_spot.classList.add("answer_item");
      answer_spot.innerHTML = answers[j][i];
      document.querySelector(".answer_box").append(answer_spot);
    }
    j++;
    if(j == questions.length){
      document.querySelector(".quiz_button").innerHTML = "MATCH!";
    }
  }
}
function display_quiz(){
  if(is_first_quiz == true){
    clean_landing();
  }
  if(quiz_active == false){
    j = 0;
    k = 0;
    let my_card = document.querySelector(".card");
    my_card.style.display = "flex";

    /*create new elements*/
    let new_question = document.createElement("h2");
    let answer_box = document.createElement("section");
    let next_button = document.createElement("button");

    answer_box.classList.add("answer_box");
    next_button.classList.add("quiz_button");
    next_button.innerHTML  = "NEXT";

    my_card.append(new_question);
    my_card.append(answer_box);
    my_card.append(next_button);
    next_button.addEventListener("click", update_quiz);

    quiz_active = true;
    update_quiz();
  }
}
document.querySelector(".quiz_link").addEventListener("click", display_quiz);
