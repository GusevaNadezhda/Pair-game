

(function(){

const field = document.querySelector('#field')
let count;
let array;
let randomArray;
let twoArray;
let table;
let id;
let cardFirst = null;
let cardSecond = null;


function createForm() {
  field.innerHTML = "";
  const title = document.createElement('h1')
  title.textContent = "Найди пару котику";
  title.classList.add("title")
  const form = document.createElement('form');
  form.classList.add('form')
  const text = document.createElement('p');
  text.classList.add('text')
  text.textContent = 'Количество карточек по вертикали/горизонтали (только чётное число от 2 до 10):';
  const input = document.createElement('input');
  input.classList.add('input')
  const button = document.createElement('button');
  button.classList.add('button')
  button.textContent = 'Начать игру';


  field.appendChild(title)
  field.appendChild(form)
  form.appendChild(text)
  form.appendChild(input);
  form.appendChild(button)

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    count = input.value;
    if (count % 2 == 0 && count <= 10) {
      count = count;
    } else {
      count = 4;
    }
    array = createNumbersArray(count)
    randomArray = shuffle(array)
    twoArray = convertArr(randomArray, count)
    table = createTableByArr(twoArray)
    formGame.form.id = "closed";

    startGame(count)
  })
  return {
    form,
    input,
    button
  };
}

const formGame = createForm();

// Этап 1. Создайте функцию, генерирующую массив парных чисел. Пример массива, который должна возвратить функция: [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8].count - количество пар.

function createNumbersArray(count) {
  let arr = [];
  let length = count ** 2
  let k = 1;
  for (let i = 0; i < length; i++) {
    arr.push(k);
    if (arr[i - 1] == k && arr[i] == k) {
      k++
    }
  }
  return arr
}



// Этап 2. Создайте функцию перемешивания массива.Функция принимает в аргументе исходный массив и возвращает перемешанный массив. arr - массив чисел

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array
}



// создадим функцию которая будет превращать наш одномерный массив в двумерный

function convertArr(array, count) { // cols - указывает на количество элементов в подмассиве
  let resultArr = [];

  // будем пушить и резать массив, пока не опустошим его полностью
  while (array.length > 0) {
    resultArr.push(array.slice(0, count)); // пушим первые элементы исходного массива в новый
    array.splice(0, count) // удаляем запушенные элементы из исходного массива
  }
  // вернем новый массив
  return resultArr;
}

// создадим функцию создания таблицы из двумерного массива

function createTableByArr(array) {
  const table = document.createElement('table');

  for (let subArr of array) {
    let row = document.createElement('tr');
    table.appendChild(row)
    for (let elem of subArr) {
      let colum = document.createElement('td');
      colum.dataset.id = elem;
      row.appendChild(colum)
    }
  }
  return table
}


// Этап 3. Используйте две созданные функции для создания массива перемешанными номерами. На основе этого массива вы можете создать DOM-элементы карточек. У каждой карточки будет свой номер из массива произвольных чисел. Вы также можете создать для этого специальную функцию. count - количество пар.

function startGame(count) {
  field.innerHTML = "";

  const time = document.createElement('p');
    let timer;
    time.textContent = "60";
    if(count>5){
      time.textContent = "600"
    }
    time.classList.add("time");

    field.append(time)


    timer = setInterval(() => {
      time.textContent--;
      if (time.textContent <= 0) {
        alert('время вышло')
        table.innerHTML = '';
        createForm()
        clearInterval(timer);
      }
    }, 1000)

  table.id = "table"

  field.append(table)

  // обратимся ко всем ячекам нашей таблицы и пройдемся по каждой циклом, создаем в каждой карточку и присваиваем ей id равной тексту внутри ячейки
  const tds = document.querySelectorAll('td')

  for (let td of tds) {
    const card = document.createElement('div')
    card.classList.add("card")
    if(count>5){
      field.classList.add("field-small")
      table.classList.add("table-small")
      card.classList.add("card-small")
    }
    td.appendChild(card)



    // установим переворот карточки при нажатии и проверку на совпадение картинок

    card.addEventListener('click', function func() {


      if (cardFirst !== null && cardSecond !== null) {
        if (cardFirst.id == cardSecond.id) {
          cardFirst = null;
          cardSecond = null;
        } else {

            cardFirst.id = '';
            cardSecond.id = '';
            cardFirst.classList.remove("open");
            cardSecond.classList.remove("open")
            cardFirst = null;
            cardSecond = null;

        }
      }

      if (cardFirst == null) {
        cardFirst = this;
        card.id = td.dataset.id;
        card.classList.add("open")
        console.log(cardFirst !== null)
      } else {
        cardSecond = this;
        card.id = td.dataset.id;
        card.classList.add("open")
        console.log(cardSecond !== null)
      }


      if (cardFirst !== null && cardSecond !== null) {
        if (cardFirst.id == cardSecond.id) {
          cardFirst = null;
          cardSecond = null;
        }
      }

      if (document.querySelectorAll('.card.open').length == document.querySelectorAll('.card').length) {
        console.log('вы победили')
        clearInterval(timer);
        table.innerHTML = '';

        const gameAgein = document.createElement('button')
        gameAgein.classList.add('gameAgein')
        gameAgein.textContent = "Сыграть ещё";
        field.append(gameAgein)

        gameAgein.addEventListener('click', () => {
          gameAgein.innerHTML = " ";
          createForm()
        })
      }
    })
  }
}
})()




