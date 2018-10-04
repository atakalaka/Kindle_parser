let notes = document.getElementById("notes"),
    form = document.getElementById("form_file_selector");

function checktype(elem, type) {
    var lastNamecomment = elem.target.nextElementSibling;
    if (elem.target.type != type) {
        elem.target.style.color = 'red';
        lastNamecomment.style.visibility = 'visible';
    } else {
        elem.target.style.color = 'green';
        lastNamecomment.style.visibility = 'hidden';
    }
}

notes.addEventListener("blur", function (elem) { checktype(elem, 'HTML'); });
form.addEventListener('submit', function (elem) {
    elem.preventDefault();
    if (notes.type == 'HTML'
    ) {
        elem.submit()
    } else {
        alert("File must be a html")
    }
})
