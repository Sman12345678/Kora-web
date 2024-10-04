var outer = document.getElementById('outer'), cover = document.getElementById('cover'), counter = 0;

window.onload = function() {
  cover.addEventListener('click', opener);
}

function opener() {
  counter++;
  if(counter % 2 !== 0) {
    outer.classList.add('isOpen');
  } else if(counter % 2 == 0) {
    outer.classList.remove('isOpen');
  }
}