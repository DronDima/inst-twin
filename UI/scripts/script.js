$(document).ready(function() {
  $("#date-from").datepicker();
  $("#date-to").datepicker();
})

function hideVars() {
  document.getElementsByClassName("filter__variants")[0].style.display = "none";
}

function showVars() {
  document.getElementsByClassName("filter__variants")[0].style.display = "block";
}

function keyDown(input, event) {
  if(event.keyCode == 13 && input.value != "") {
    var span = document.createElement('span');
    span.classList.add("filter__tag");
    span.innerHTML = input.value;
    input.parentNode.insertBefore(span, input);
    input.value = "";
  }
  else if(event.keyCode == 8 && input.value == "") {
    input.previousSibling.remove();
  }
}

function addHashtag(element) {
  element.classList.toggle("filter__variant_hide");
  var span = document.createElement('span');
  span.classList.add("filter__tag");
  span.innerHTML = element.innerHTML;
  var input = document.getElementsByClassName("filter__tags-input")[0];
  input.parentNode.insertBefore(span, input);
  document.getElementsByClassName("filter__tags-input")[0].focus();
}


function openDiv(el) {
  if(document.documentElement.clientWidth > 610) {
    if(el.style.gridColumn == "1 / 3") {
      el.style.gridColumn = "";
      el.style.width = "";
      el.style.justifySelf = "";
      desc = el.getElementsByClassName("el__desc")[0];
      desc.style.display = "none";
      hashtag = el.getElementsByClassName("el__hashtag")[0];
      hashtag.style.display = "none";
      links = el.getElementsByClassName("el__link");
      links[0].style.display = "none";
      links[1].style.display = "none";
      var coordY = el.getBoundingClientRect().top + pageYOffset;
      window.scrollTo(0,coordY);
    }
    else {
      el.style.gridColumn = "1/3";
      el.style.width = "80%";
      el.style.justifySelf = "center";
      desc = el.getElementsByClassName("el__desc")[0];
      desc.style.display = "block";
      hashtag = el.getElementsByClassName("el__hashtag")[0];
      hashtag.style.display = "block";
      links = el.getElementsByClassName("el__link");
      links[0].style.display = "inline-grid";
      links[1].style.display = "inline-grid";
      var coordY = el.getBoundingClientRect().top + pageYOffset;
      window.scrollTo(0,coordY);
    }
  }
}

function setBlur() {
  document.getElementsByClassName("wrapper")[0].style.filter = "blur(2px)";
}

function unsetBlur() {
  document.getElementsByClassName("wrapper")[0].style.filter = "";
}
