import axios from 'axios'

// API json-server'а (запускается командой "json-server -p 3001 data.json")
const api = 'http://localhost:3001/';


// Запрос на получение данных таблицы
export const getData = () => {
    return axios.get(`${api}data`)
};

// Запрос на удаление элемента из таблицы
export const deleteItem = (item) => {
    return axios.delete(`${api}data/${item}`)
};

// Запрос на создание элемента таблицы
export const createItem = (item) => {
    return axios.post(`${api}data/`, item)
};

// Запрос на редактирование элемента таблицы
export const editItem = (item) => {
    return axios.put(`${api}data/${item.id}`, item)
};