let stiker = {};
let stikersList =[];
let textArea;
let textAreaEl = document.querySelector ('text');
const stickersListEl = document.querySelector ('#sticker-block');
const stickerEl = document.querySelector ('#stikerItem');
const STIKERS_URL = 'https://5dd3d5ba8b5e080014dc4bfa.mockapi.io/stickers';
const ADD_BTN_CLASS = 'btn-add';
const STORAGE_KEY = 'list';
const DELETE_BTN_CLASS = 'btn-delete';
const EDIT_CLASS = 'edit';
const STICKER_ITEM_CLASS = '.sticker-item';
document.addEventListener ('click', onBtnAddCLick);
stickersListEl.document.addEventListener ('click',onBtnDeleteClick);
textAreaEl.document.addEventListener ('focusout',onTextAreaClick);

init();

function init() {
    fetchStikersList();
}

function fetchStikersList() {
    fetch(STIKERS_URL)
    .then((res) => res.json())
    .then((data) => {
        stikersList = data;
        renderStikersList()
    })
}

function onBtnAddCLick () {
    createNewStiker();
    renderStikersList();
    saveData();
}

function createNewStiker (data) {
    return fetch(this.STIKERS_URL, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((res) => res.json());
}

function renderStikersList() {
    stickersListEl.innerHTML = stikersList.map(createNewStickerHTML).join('\n');
} 

function createNewStickerHTML (sticker){
    return  TITLE_ITEM_TEMPLATE.replace('{{id}}', sticker.id)
            .replace('{{description}}', sticker.description)
}

function onBtnDeleteClick (el){
    const id = getStickerId(el.target,selector);
    elem = el.target.stikersList.contains(DELETE_BTN_CLASS);
    deleteSticker(elem);
    restoreData();
    renderStikersList();
    saveData();

}
function getStickerId(el) {
    const sticker = el.closest(STICKER_ITEM_CLASS);
    return sticker && +sticker.dataset.id;
}

function deleteSticker(elem){
    fetch(API_URL + elem.id, {
        method: 'DELETE',
    }).then((data) => {
        fetchStikersList();
    })
}

function onTextAreaClick() {
    const id = getStickerId(el.target);
    elem = el.target.stikersList.contains(EDIT_CLASS);
    getCustumersText();
    editCusrtumersText();
    renderStikersList();
    saveData();
}

function getCustumersText(){
    return textArea = textAreaEl.value;
}

function editCusrtumersText(sticker){
    return fetch(API_URL + sticker.id, {
        method: 'PUT',
        body: JSON.stringify(sticker),
        headers: {
            'Content-Type': 'application/json',
            },
    }).then((res) => res.json());
}

function saveData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stikersList));
}

function restoreData() {
    const data = localStorage.getItem(STORAGE_KEY);

    return data ? JSON.parse(data) : [];}