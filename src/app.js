import Calendar from './components/Calendar';

;(() => {

    Calendar('#app', [2022, 10], (date) => {
        console.log(date);
    });


    // const oApp = document.querySelector('#app');
    // const dateInfo = myCalendar.getDateInfo();

    // const init = () => {
    //     render(...dateInfo);
    // }

    // function render(...args) {
    //     oApp.appendChild(myCalendar.render(...args));
    // }

    // function handler(date) {
    //     console.log(date)
    // }

    // init();
})();