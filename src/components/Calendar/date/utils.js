// 获取指定年月的第一天为周几
export function getFirstWeekDay(year, month) {
    const date = new Date(year, month - 1, 1);
    return date.getDay();
}

// 获取指定月共有几天
export function getMonthDayCount(year, month) {
    const date = new Date(year, month, 0);
    return date.getDate();
}

// 当前月展示的上个月剩余天
export function getLastMonthRestDays(year, month) {
    const days = getFirstWeekDay(year, month);
    let lastDate = getMonthDayCount(year, month - 1);
    const restDays = [];

    while(restDays.length < days) {
        restDays.push(lastDate --);
    }

    return restDays.reverse();
}


// 当前月展示的下个月剩余天
export function getNextMonthRestDays(year, month) {
    const lastMonthRestDayCount = getLastMonthRestDays(year, month).length;
    const currentMonthDayCount = getMonthDayCount(year, month);
    const nextMonthRestDayCount = 42 - (lastMonthRestDayCount + currentMonthDayCount);
    let restDays = [];

    for (let i = 1; i <= nextMonthRestDayCount; i ++) {
        restDays.push(i);
    }

    return restDays;
}


export function getFormatDate(year, month, date) {
    const dateArr = [year, month, date];

    for (let i = 1; i < dateArr.length; i ++) {
        dateArr[i] < 10 && (dateArr[i] =  '0' + dateArr[i]);
    }

    return dateArr.join('-');
}