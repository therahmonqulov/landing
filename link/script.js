const form = document.querySelector('.form');
const body = document.querySelector('body');

// Formni ochish tugmalari
const showFormButtons = document.querySelectorAll('.show_form_button');
showFormButtons.forEach(button => {
    button.addEventListener('click', () => {
        form.style.display = 'block';
        body.style.overflow = 'hidden';
    });
});

// Formni yopish
document.querySelector('.f-button').addEventListener('click', () => {
    form.style.display = 'none';
    body.style.overflow = 'auto';
});

// Custom Select (davlat tanlash)
function initializeAllCustomSelects() {
    const allCustomSelects = document.querySelectorAll('.custom-select');

    allCustomSelects.forEach(customSelect => {
        const selectSelected = customSelect.querySelector('.select-selected');
        const selectItems = customSelect.querySelector('.select-items');
        const selectedText = selectSelected.querySelector('.selected-text');
        const options = selectItems.querySelectorAll('.select-option');

        selectSelected.addEventListener('click', (e) => {
            e.stopPropagation();
            document.querySelectorAll('.custom-select').forEach(other => {
                if (other !== customSelect) {
                    other.querySelector('.select-items')?.classList.remove('select-show');
                    other.querySelector('.select-selected')?.classList.remove('active');
                }
            });
            selectItems.classList.toggle('select-show');
            selectSelected.classList.toggle('active');
        });

        options.forEach(option => {
            option.addEventListener('click', (e) => {
                e.stopPropagation();

                selectItems.querySelector('.selected')?.classList.remove('selected');
                option.classList.add('selected');

                const flagCode = option.getAttribute('data-flag');
                const code = option.getAttribute('data-code');
                const maxlength = option.getAttribute('data-maxlength'); // belgilar soni (bo'shliqlar bilan)
                const country = option.getAttribute('data-value');

                selectedText.innerHTML = `
                    <img src="./media/flags/${flagCode}.png" alt="Bayroq" style="width:24px;height:18px;margin-right:8px;">
                    <span class="arrow"><i class="fa-solid fa-angle-down"></i></span>
                    ${code}
                `;

                const phoneInput = document.getElementById('phone');
                if (phoneInput) {
                    phoneInput.maxLength = maxlength;
                    phoneInput.value = '';
                    phoneInput.dataset.country = country; // formatlash uchun saqlaymiz
                    updatePhonePlaceholder(country);
                    validatePhone(); // agar allaqachon yozilgan bo'lsa, tozalaydi
                }

                selectItems.classList.remove('select-show');
                selectSelected.classList.remove('active');
            });
        });
    });

    document.addEventListener('click', () => {
        document.querySelectorAll('.custom-select').forEach(cs => {
            cs.querySelector('.select-items')?.classList.remove('select-show');
            cs.querySelector('.select-selected')?.classList.remove('active');
        });
    });
}

document.addEventListener('DOMContentLoaded', initializeAllCustomSelects);

// Placeholder ni davlatga qarab o'zgartirish
function updatePhonePlaceholder(country) {
    const phoneInput = document.getElementById('phone');
    let placeholder = '';

    switch (country) {
        case 'UZ':  placeholder = '99 999 99 99'; break;
        case 'KRZ': placeholder = '999 999 999'; break;
        case 'TJK': placeholder = '999 999 999'; break;
        case 'TK':  placeholder = '99 999 999'; break;
        case 'KZ':  
        case 'RU':  placeholder = '999 999 9999'; break;
        case 'US':  placeholder = '999 999 9999'; break;
        case 'GER': placeholder = '999 99999999'; break;
        case 'TUR': placeholder = '999 999 9999'; break;
        case 'BEL': placeholder = '99 999 9999'; break;
        case 'UKI': placeholder = '99 999 9999'; break;
        default:    placeholder = 'Telefon raqam';
    }

    phoneInput.placeholder = placeholder;
}

// Telefon raqamni avto-formatlash (bo'shliq bilan)
const phoneInput = document.getElementById('phone');

phoneInput.addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, ''); // faqat raqamlar
    const country = phoneInput.dataset.country || 'UZ';
    let formatted = '';

    switch (country) {
        case 'UZ':
            if (value.length > 7) formatted = `${value.slice(0,2)} ${value.slice(2,5)} ${value.slice(5,7)} ${value.slice(7,9)}`;
            else if (value.length > 5) formatted = `${value.slice(0,2)} ${value.slice(2,5)} ${value.slice(5)}`;
            else if (value.length > 2) formatted = `${value.slice(0,2)} ${value.slice(2)}`;
            else formatted = value;
            break;

        case 'KRZ':
        case 'TJK':
            if (value.length > 6) formatted = `${value.slice(0,3)} ${value.slice(3,6)} ${value.slice(6,9)}`;
            else if (value.length > 3) formatted = `${value.slice(0,3)} ${value.slice(3)}`;
            else formatted = value;
            break;

        case 'TK':
            if (value.length > 5) formatted = `${value.slice(0,2)} ${value.slice(2,5)} ${value.slice(5,8)}`;
            else if (value.length > 2) formatted = `${value.slice(0,2)} ${value.slice(2)}`;
            else formatted = value;
            break;

        case 'KZ':
        case 'RU':
        case 'US':
        case 'TUR':
            if (value.length > 6) formatted = `${value.slice(0,3)} ${value.slice(3,6)} ${value.slice(6,10)}`;
            else if (value.length > 3) formatted = `${value.slice(0,3)} ${value.slice(3)}`;
            else formatted = value;
            break;

        case 'GER':
            if (value.length > 8) formatted = `${value.slice(0,3)} ${value.slice(3,11)}`;
            else if (value.length > 3) formatted = `${value.slice(0,3)} ${value.slice(3)}`;
            else formatted = value;
            break;

        case 'BEL':
        case 'UKI':
            if (value.length > 7) formatted = `${value.slice(0,2)} ${value.slice(2,5)} ${value.slice(5,9)}`;
            else if (value.length > 5) formatted = `${value.slice(0,2)} ${value.slice(2,5)} ${value.slice(5)}`;
            else if (value.length > 2) formatted = `${value.slice(0,2)} ${value.slice(2)}`;
            else formatted = value;
            break;

        default:
            formatted = value;
    }

    e.target.value = formatted;
});

// Form elementlari
const submitForm = document.forms['contact-form'];
const inputName = document.getElementById('name');
const warningP = document.querySelector('.warning-p');
const inputPhone = document.getElementById("phone")

// Ism uchun dinamik xato xabari (HTMLda yo'q edi, shuning uchun yaratamiz)
const nameError = document.createElement('p');
nameError.style.color = 'red';
nameError.style.fontSize = '14px';
nameError.style.marginTop = '5px';
nameError.style.display = 'none';
inputName.parentNode.insertBefore(nameError, inputName.nextSibling);

// Validatsiya funksiyalari (faqat submitda ishlaydi)
function validateName() {
    const nameValue = inputName.value.trim();
    const nameRegex = /^[A-Za-zÀ-ÿ\s'-]{2,}$/; // harflar, bo'shliq, apostrof

    if (nameValue === '' || !nameRegex.test(nameValue)) {
        nameError.textContent = "❌ Ismingizni to‘g‘ri kiriting!";
        nameError.style.display = 'block';
        inputName.style.borderColor = 'red';
        return false;
    } else {
        nameError.textContent = '';
        nameError.style.display = 'none';
        inputName.style.borderColor = '';
        return true;
    }
}

function validatePhone() {
    const phoneValue = inputPhone.value.trim();
    const expectedLength = parseInt(inputPhone.maxLength);

    if (phoneValue.length !== expectedLength || phoneValue.includes('_')) {
        warningP.textContent = "❌ Telefon raqam to‘liq va to‘g‘ri kiritilmadi!";
        warningP.style.display = 'block';
        inputPhone.style.borderColor = 'red';
        return false;
    } else {
        warningP.style.display = 'none';
        inputPhone.style.borderColor = '';
        return true;
    }
}

// Form submit (faqat shu yerda validatsiya)
submitForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Faqat submit bosilganda tekshirish
    const isNameValid = validateName();
    const isPhoneValid = validatePhone();

    if (!isNameValid || !isPhoneValid) {
        return; // xato bo'lsa yuborilmaydi
    }

    const name = inputName.value.trim();
    const phone = inputPhone.value.trim();

    try {
        // Bu yerda scriptURL aniqlangan bo'lishi kerak (Google Apps Script URL)
        await fetch(scriptURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, phone }),
            mode: 'no-cors'
        });

        // Muvaffaqiyatli bo'lsa formni yopamiz
        form.style.display = 'none';
        body.style.overflow = 'auto';

        // Agar thank-you sahifa bo'lsa:
        // window.location.href = "thank-you.html";

        alert("Muvaffaqiyatli ro'yxatdan o'tdingiz!");

    } catch (error) {
        console.error("Xatolik:", error);
        alert("Ma'lumot yuborishda xatolik. Iltimos, qayta urinib ko‘ring.");
    }
});