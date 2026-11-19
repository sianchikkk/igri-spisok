const games = [
    { title: "Каркассон", players: 4, borrower: [], count: 3 },
    { title: "Доббль", players: 6, borrower: [],count: 3 },
    { title: "Шахматы", players: 2, borrower: [], count: 3}
]


const borrowButton = document.getElementById(`borrowButton`);
const returnButton = document.getElementById(`returnButton`);
const gameSelect = document.getElementById(`gameSelect`);
const gameList = document.getElementById(`gameList`);
const message = document.getElementById(`message`);
const errorName = document.getElementById(`errorName`);
const onlyFree = document.getElementById('onlyFree');
const borrowerName = document.getElementById('borrowerName');
const newTitle = document.getElementById('newTitle');
const newPlayers = document.getElementById('newPlayers');
const copySelect = document.getElementById('copySelect');
const newTitle2 = document.getElementById('newTitle2');
const addcopybutton = document.getElementById('addcopybutton');


borrowButton.addEventListener('click', () => {
    const game = games[Number(gameSelect.value)];
    const name = borrowerName.value.trim();
    if (name === '') {
        message.textContent = 'Введите имя'
        return;
    }
    if (game.borrower !== null) {
        message.textContent = 'Игра уже выдана'
        return;
    }
    game.borrower = name
    message.textContent = 'Игра выдана'
    renderGames()
})
returnButton.addEventListener('click', () => {
    const game = games[Number(gameSelect.value)];
    if (game.borrower === null) {
        message.textContent = 'Игра уже свободна';
        return;
    }
    game.borrower = null;
    message.textContent = 'Игра возвращена';
    renderGames();
});
onlyFree.addEventListener('change', () => {
    renderGames();
});
function renderGames() {
    gameList.innerHTML = '';
    let gamesToShow;
    if (onlyFree.checked) {
        gamesToShow = games.filter(game => game.borrower.length===0);
    } else {
        gamesToShow = games;
    }
    if (onlyFree.checked && gamesToShow.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'Свободных игр пока нет';
        gameList.append(li);
        return; 
    }
    gamesToShow.forEach(game => {
        const li = document.createElement('li');
        let check = ""
        if (game.borrower.length===0) {
            check = ""
        }
        else {
            check = `· Взяли ${game.borrower.join(`,`)}`;
        };
        li.textContent = `${game.title} · ${game.players} игроков ${check} · Осталось ${game.count} шт.`;
        gameList.append(li);
    });
}
function renderGameOptions() {
    gameSelect.innerHTML = ''; 
    games.forEach((game, index) => {
        const option = document.createElement('option');
        option.textContent = game.title;
        option.value = index; 
        gameSelect.append(option);
    });
}
function renderGameOptions2() {
    copySelect.innerHTML = ''; 
    games.forEach((game, index) => {
        const option = document.createElement('option');
        option.textContent = game.title;
        option.value = index; 
        copySelect.append(option);
    });
}

addGameButton.addEventListener('click', () => {
    const title = newTitle.value.trim();
    const players = Number(newPlayers.value);
    if (title !== '' && Number.isInteger(players) && players > 0) {
        games.push({ title: title, players: players, borrower: null });
        newTitle.value = '';
        newPlayers.value = '';
        renderGames();
        renderGameOptions();
        renderGameOptions2();
    } else {
        message.textContent = 'Введите корректное название и целое число игроков';
    }
});
addcopybutton.addEventListener(`click`,() =>{
    const select = Number(copySelect.value)
    if (Number(newTitle2.value > 0)){
        games[select].count += Number(newTitle2.value)
        message.textContent = "Копии добавлены"
        newTitle2.value =""
        renderGames()
    }
    else{
        message.textContent = "Введите число копий, которое хотите добавить"
    }
});
addcopybutton2.addEventListener(`click`,() =>{
    const select = Number(copySelect.value)
    if (Number(newTitle2.value > 0)){
        games[select].count += Number(newTitle2.value)
        message.textContent = "Копии убраны"
        newTitle2.value =""
        renderGames()
    }
    else{
        message.textContent = "Введите число копий, которое хотите убрать"
    }
});
renderGames();
renderGameOptions();
renderGameOptions2();