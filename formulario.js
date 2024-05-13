const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

const modal = document.getElementById('mensaje');

function borraTodo(){
    username.value = "";
    email.value = "";
    password.value = "";
    password2.value = "";
}

form.addEventListener('submit', e => {
    e.preventDefault();
    validateInputs();
});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validateInputs = () => {
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();

    let allInputsValid = true;

    if(usernameValue === '') {
        setError(username, 'Nombre de usuario obligatorio');
    } 
    else if(usernameValue.length < 7){
        setError(username,'Nombre de usuario muy corto')
    }else {
        setSuccess(username);
    }

    if(emailValue === '') {
        setError(email, 'Correo electrónico obligatorio');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Proporcione un correo electrónico válido');
    } else {
        setSuccess(email);
    }

    if(passwordValue === '') {
        setError(password, 'Contraseña obligatoria');
    } else if (passwordValue.length < 8 ) {
        setError(password, 'La contraseña debe tener al menos 8 caracteres')
    } else {
        setSuccess(password);
    }

    if(password2Value === '') {
        setError(password2, 'Por favor confirme su contraseña');
    } else if (password2Value !== passwordValue) {
        setError(password2, "Las contraseñas no coinciden");
        borraTodo()

    } else {
        setSuccess(password2);
    }

    if (!username.parentElement.classList.contains('success')) {
        allInputsValid = false;
    }
    if (!email.parentElement.classList.contains('success')) {
        allInputsValid = false;
    }
    if (!password.parentElement.classList.contains('success')) {
        allInputsValid = false;
    }
    if (!password2.parentElement.classList.contains('success')) {
        allInputsValid = false;
    }

    // Si todos los campos son válidos, muestra el mensaje de éxito
    if (allInputsValid) {
        form.style.display = "none";
        modal.style.display = "flex";
        modal.style.flexDirection = "column";
        modal.style.alignItems = "center";
    }
    
};
