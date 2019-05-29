class Questions {
    getQuestionsList() {										// получение списка задачи
        return new Promise(resolve => {
            const xhr = new XMLHttpRequest();

            xhr.open('GET', 'http://localhost:3000/api/questions', true);

            xhr.onload = () => {			// при получении ответа мы хотим промис зарезолвить и передать куда-то где вызовем функцию  в файле addAndList
               try {
                   resolve(JSON.parse(xhr.response));
               } catch (error) {
                   alert(` Извините, в данных ошибка. \n Имя ошибки: ${error.name} \n Текст ошибки: ${error.message}`);
               }
            };

            xhr.send();
        });
    }
}


export default Questions;