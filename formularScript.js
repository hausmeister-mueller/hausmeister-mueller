const firebaseConfig = {
    apiKey: "AIzaSyDYAcmZZlTVbmcLR26N2XfjTluDbgpYRWs",
    authDomain: "hausmeister-mueller.firebaseapp.com",
    projectId: "hausmeister-mueller",
    storageBucket: "hausmeister-mueller.appspot.com",
    messagingSenderId: "995682441664",
    appId: "1:995682441664:web:c08f3f85f04d1dac3d1025",
    measurementId: "G-QNY7JBYF4F"
};


firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const felix = 'ZjIpplzGBrg689OmCU5p5FKxdEc2';

const submitBtn = document.getElementById('submitBtn');



const elements = {
    name: document.getElementById('name'),
    lastName: document.getElementById('lastName'),
    street: document.getElementById('street'),
    city: document.getElementById('city'),
    streetNumber: document.getElementById('streetNumber'),
    zip: document.getElementById('zip'),
    phone: document.getElementById('phone')
};


function checkInputs() {
    const allFilled = Object.values(elements).every(el => el.value.trim() !== '');
    const agbChecked = document.getElementById('agb').checked;

    submitBtn.disabled = !(allFilled && agbChecked);

    return allFilled && agbChecked;
}

function toggleSubmitBtn() {
    const submitBtn = document.querySelector('.submit-btn');
    const successText = document.createElement('div');
    successText.classList.add('text');

    document.querySelectorAll('input, button').forEach(function (a){
        a.disabled = true;
    })

    function toggleText() {
        if (successText.dataset.state === 'a') {
            successText.innerHTML = '<span class="material-symbols-rounded">call</span> Wir werden uns telefonisch baldmöglichst melden';
            successText.dataset.state = 'b';
        } else {
            successText.innerHTML = '<span class="material-symbols-rounded">new_releases</span> Vielen Dank - Ihr Auftrag wurde aufgegeben';
            successText.dataset.state = 'a';
        }
    }

    successText.dataset.state = 'a';
    successText.innerHTML = '<span class="material-symbols-rounded">new_releases</span> Vielen Dank - Ihr Auftrag wurde aufgegeben';
    submitBtn.className = 'submit-btn success';
    submitBtn.innerHTML = '';
    submitBtn.appendChild(successText);

    setInterval(toggleText, 5000);
}

document.addEventListener('input', checkInputs);

document.getElementById('agb').addEventListener('change', checkInputs);

async function submit() {
    if (checkInputs()) {
        const data = {
            name: elements.name.value,
            lastName: elements.lastName.value,
            street: elements.street.value,
            city: elements.city.value,
            streetNumber: elements.streetNumber.value,
            zip: elements.zip.value,
            phone: elements.phone.value
        };
        db.collection(`employees/${felix}/assignments`).add(data)
            .then(() => {
                toggleSubmitBtn();
            })
            .catch(error => {
                alert('Etwas ist schiefgelaufen, bitte versuchen sie es später nochmal')
            });
    }
}
