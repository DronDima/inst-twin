$(document).ready(function() {
  $("#date").datepicker();

})


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
