// const form = document.createElement('form');
// form.className = 'create-user-form';

// const firstlabel = document.createElement('label');
// firstlabel.textContent = 'Имя';
// form.append(firstlabel);

// const firstInput = document.createElement('input');
// firstInput.setAttribute('type', 'text');
// firstInput.setAttribute('name', 'password');
// firstInput.setAttribute('placeholder', 'Введите ваше имя');
// firstlabel.append(firstInput)


// const secondLabel = document.createElement('label');
// secondLabel.textContent = 'Пароль';
// form.append(secondLabel);

// const secondInput = document.createElement('input');
// secondInput.setAttribute('type', 'password');
// secondInput.setAttribute('name', 'password');
// secondInput.setAttribute('placeholder', 'Придумайте Пароль');
// secondLabel.append(secondInput)

// const button = document.createElement('button');
// button.setAttribute('type', 'submit');
// button.textContent = 'Подтвердить';
// form.append(button)

// document.body.append(form)
// console.log(form)

document.body.innerHTML = '<form class="create-user-form"><label>Имя<input type="text" name="userName" placeholder="Введите ваше имя"></label><label>Пароль<input type="password" name="password" placeholder="Придумайте Пароль"></label><button type="submit">Подтвердить</button></form>'
console.log(form)




