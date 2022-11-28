const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

const name = () => document.getElementById('name').value;
const email = () => document.getElementById('email').value;

function sendEmail() {
    Email.send({
        SecureToken: "8ce3595e-6225-4fcd-aa4b-921c97efe377",
        To: "lifeschoolproj@gmail.com",
        From : 'item0time@gmail.com',
        Subject : "Новые контактные данные от livingschool.online!",
        Body : `имя: ${name()} email: ${email()}`,
    }).then(message => showMessage(message));
}

function cooldownButton() {
    let submitBtn = document.getElementById('submit');
    submitBtn.disabled = true;
    
    let style = submitBtn.style;
    let text = submitBtn.value;
    submitBtn.style = "background-color: var(--white); color: white";
    submitBtn.value = "Успешно!";
    setTimeout(activate, 10000);
    function activate() {
        submitBtn.disabled = false;
        submitBtn.style = style;
        submitBtn.value = text;
    }
}

function showMessage(message) {
    swal({
        title: message == "OK" ? "Успешно!" : message,
        text: "Также можете связаться через контакты, указанные ниже.",
        icon: message == "OK" ? "success" : "error",
        button: "Отлично!"
    });
}

function showValidError() {
    swal({
        title: "Недопустимый адрес email.",
        text: "Введите корректный адрес электронной почты.",
        icon: "error",
        button: "Хорошо",
    })
}

function showUniqueError() {
    swal({
        title: "Данная почта уже была отправлена.",
        text: "",
        icon: "error",
        button: "Понятно",
    })
}

function clearForm() {
    document.getElementById('name').value = "";
    document.getElementById('email').value = "";
}

function checkUniqueEmail(email) {
    return localStorage.getItem(email) == null
}

function setEmail() {
    localStorage.setItem(email(), name())
}

function onSubmit() {
    if (validateEmail(email())) {
        if (checkUniqueEmail(email())) {
            sendEmail();
            setEmail();
            clearForm();
            cooldownButton();
        } else {
            showUniqueError();
        }
    } else {
        showValidError();
    }
}
