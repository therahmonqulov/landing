const form = document.querySelector('.form');
const imgButton = document.querySelector('.img-button');
const body = document.querySelector('body');

// show-button-function (show button)
const showFormButton = document.querySelectorAll('.show_form_button');
showFormButton.forEach(function (button) {
    button.addEventListener("click", function () {
        form.style.display = 'block';
        body.style.overflow = 'hidden'; // scrollni o'chirish
    });
});

// hide-button-function (close button)
const hideButton = document.querySelector('.f-button').addEventListener('click', () => {
    body.style.overflow = "auto"; // Enable scrolling
    form.style.display = 'none';
});

function initCustomSelect() {
    const customSelect = document.querySelector('.custom-select');
    const selectSelected = customSelect.querySelector('.select-selected');
    const selectItems = customSelect.querySelector('.select-items');
    const selectedText = selectSelected.querySelector('.selected-text');
    const flagImg = document.getElementById('flag');
    const options = selectItems.querySelectorAll('.select-option');

    // Ochish/yopish
    selectSelected.addEventListener('click', (e) => {
        e.stopPropagation();
        selectItems.classList.toggle('select-show');
        selectSelected.classList.toggle('active'); // Bu klass strelkani aylantiradi
    });

    // Dropdown ni yopish
    selectItems.classList.remove('select-show');
    selectSelected.classList.remove('active'); // ← bu muhim!

    document.addEventListener('click', () => {
        selectItems.classList.remove('select-show');
        selectSelected.classList.remove('active');
    });
    // Option tanlash
    options.forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();

            // Oldingi selected ni o'chirish
            selectItems.querySelector('.selected')?.classList.remove('selected');
            option.classList.add('selected');

            // Yangi qiymatlarni olish
            const flagCode = option.getAttribute('data-flag');
            const code = option.getAttribute('data-code');
            const maxlength = option.getAttribute('data-maxlength');
            const value = option.getAttribute('data-value');

            // Bayroqni yangilash
            flagImg.src = `./media/flags/${flagCode}.png`;

            // Matnni yangilash (bayroq + kod)
            selectedText.innerHTML = `<img id="flag" src="./media/flags/${flagCode}.png" alt="Bayroq"><span class="arrow-down"><i class="fa-solid fa-angle-down"></i></span> ${code}`;

            // Telefon input maxlength va placeholder/pattern
            const phoneInput = document.getElementById('phone');
            phoneInput.maxLength = maxlength;
            phoneInput.value = '';
            updatePhonePlaceholderAndPattern(value);

            // Dropdown ni yopish
            selectItems.classList.remove('select-show');
            selectSelected.classList.remove('active');
        });
    });

    // Tashqarida click qilganda yopish
    document.addEventListener('click', () => {
        selectItems.classList.remove('select-show');
        selectSelected.classList.remove('active');
    });
}

// Telefon placeholder va pattern ni yangilash (eski logikani saqlab)
function updatePhonePlaceholderAndPattern(country) {
    const phoneInput = document.getElementById('phone');
    let placeholder = '';
    let pattern = '';

    switch (country) {
        case 'UZ':
            placeholder = '99-999-99-99';
            pattern = '\\d{2}-\\d{3}-\\d{2}-\\d{2}';
            break;
        case 'KRZ':
        case 'TJK':
            placeholder = '999-999-999';
            pattern = '\\d{3}-\\d{3}-\\d{3}';
            break;
        case 'TK':
            placeholder = '99-999-999';
            pattern = '\\d{2}-\\d{3}-\\d{3}';
            break;
        case 'KZ':
        case 'RU':
        case 'US':
            placeholder = '999-999-9999';
            pattern = '\\d{3}-\\d{3}-\\d{4}';
            break;
        case 'GER':
            placeholder = '999-99999999';
            pattern = '\\d{3}-\\d{8}';
            break;
        case 'TUR':
            placeholder = '999-999-9999';
            pattern = '\\d{3}-\\d{3}-\\d{4}';
            break;
        case 'BEL':
        case 'UKI':
            placeholder = '99-999-9999';
            pattern = '\\d{2}-\\d{3}-\\d{4}';
            break;
    }

    phoneInput.placeholder = placeholder;
    phoneInput.pattern = pattern;
}

// Yangi custom select ni ishga tushirish
initCustomSelect();

//phone number validation (telefon raqamni tekshirish)
const phoneInput = document.getElementById("phone");
phoneInput.addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, ""); // Faqat raqamlarni qabul qiladi

    if (value.length > 2 && value.length <= 5) {
        value = `${value.slice(0, 2)}-${value.slice(2)}`;
    } else if (value.length > 5 && value.length <= 7) {
        value = `${value.slice(0, 2)}-${value.slice(2, 5)}-${value.slice(5)}`;
    } else if (value.length > 7) {
        value = `${value.slice(0, 2)}-${value.slice(2, 5)}-${value.slice(5, 7)}-${value.slice(7)}`;
    }

    e.target.value = value;
});

const submitForm = document.forms['contact-form'];
const hideForm = document.querySelector('.hide-form-div');
const buttonS = document.querySelector('.submit-button');
const inputName = document.getElementById('name');
const inputPhone = document.getElementById('phone');
const nameError = document.createElement('p');
const warningP = document.querySelector('.warning-p');

// Xatolik xabarini yaratish
nameError.style.color = 'red';
nameError.style.fontSize = '14px';
nameError.style.marginTop = '5px';
inputName.parentNode.insertBefore(nameError, inputName.nextSibling);

// Formni boshlang‘ich holatda ko‘rsatish
hideForm.style.display = "block";

// Ismni tekshirish
function validateName() {
    const nameValue = inputName.value.trim();
    const nameRegex = /^[A-Za-zÀ-ÿ'-]{2,}$/; // Kamida 2 ta harf va faqat harflar bo‘lishi kerak

    if (!nameRegex.test(nameValue)) {
        nameError.textContent = "❌ Ismingizni kiriting!";
        inputName.style.borderColor = "red";
        return false;
    } else {
        nameError.textContent = "";
        inputName.style.borderColor = "";
        return true;
    }
}

// telefon raqamni tekshirish
function validatePhone() {
    const phoneValue = inputPhone.value.trim();

    if (phoneValue.length !== parseInt(inputPhone.maxLength)) { // Check for invalid phone input
        warningP.style.display = "block";
        return false;
    } else {
        warningP.style.display = "none";
        inputPhone.style.borderColor = "";
        return true;
    }
}

// tugmani bosganda formni tekshirib ochish
buttonS.addEventListener('click', () => {
    inputName.addEventListener("input", validateName);
    inputPhone.addEventListener("input", validatePhone);
    if (validateName() && validatePhone()) {

    }
});

// submit funksiyasi
submitForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateName() || !validatePhone()) {
        return;
    }

    let name = inputName.value.trim();
    let phone = inputPhone.value.trim();

    try {
        await fetch(scriptURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, phone }),
            mode: 'no-cors'
        });

        // Thank-you sahifasiga o'tish
        window.location.href = "";

    } catch (error) {
        console.log("Ma'lumotlarni yuborishda xatolik yuz berdi. Iltimos, qayta urinib ko'ring.\nXatolik: " + error.message);
    }
});
