let notes = document.getElementById("notes"),
    form = document.getElementById("form_file_selector"),
    file_link = document.getElementById("file_link"),
    button = document.getElementById("submit_button"); 


function checktype(elem, type) {
    var lastNamecomment = elem.target.nextElementSibling;
    if (elem.target.value.type != 'file') {

        elem.target.style.color = 'red';
        lastNamecomment.style.visibility = 'visible';
    } else {
        elem.target.style.color = 'green';
        lastNamecomment.style.visibility = 'hidden';
    }
}

file_link.addEventListener("input", function(elem){
    alert("File must be a html")
})

// notes.addEventListener("click", function (elem) { checktype(elem, 'HTML'); });
// form.addEventListener('submit', function (elem) {
//     elem.preventDefault();
//     if (notes.type == 'html') {
//         elem.submit()
//     } else {
//         alert("File must be a html")
//     }
// })
