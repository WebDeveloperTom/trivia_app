//Issues:

var url = "https://opentdb.com/api.php?amount=1&category=9&type=multiple&encode=url3986";
var requestkey = "https://opentdb.com/api_token.php?command=request";
var key;
var answer;
var ogAns;
var li;
var incorrect = [];

$(document).ready(function() {
    $.getJSON(requestkey)
  .done(function(data){
    key = url + "&token=" + data.token;
  })
});

$("#questbtn").click(genQuestion);
$("#answerbtn").click(getAnswer);


function genQuestion (){
  $.getJSON(key)
  .done(function(data){
    var decodedquest = decodeURIComponent(data.results[0].question);
    answer = decodeURIComponent(data.results[0].correct_answer);
    ogAns = data.results[0].correct_answer;
    incorrect = data.results[0].incorrect_answers;
    $("#question").text(decodedquest);
    $("#questbtn").toggleClass("hide");
    $("#answerbtn").toggleClass("hide");
    $("#answer").text("");
    allans();
  })
};

function getAnswer(){
  $("#answer").text(answer);
  $("#questbtn").toggleClass("hide");
  $("#answerbtn").toggleClass("hide");
  // $( "ul li:nth-child(" +li+")" ).toggleClass("hlAnswer");
};

function getRandomInt() {
    return Math.floor(Math.random() * (4)+1);
}

function allans(){
  li = getRandomInt();
  incorrect.splice((li-1), 0, ogAns);
  for(var i = 0; i < incorrect.length; i++){
    $("."+i).text(decodeURIComponent(incorrect[i]));
  };
}
