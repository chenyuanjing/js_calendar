import { createDateTrs } from "../utils";
import { WEEK_DAYS } from "./config";

import { getLastMonthRestDays, getMonthDayCount, getNextMonthRestDays, getFormatDate } from './utils';
import { getDateInfo } from "../utils";


const domPool = {
    weekDays: null,
    controlArea: null
}
export function createWeekDayNode() {
    if(!domPool.weekDays) {
        domPool.weekDays = document.createElement('tr');
        domPool.weekDays.className = 'week-day';

        domPool.weekDays.innerHTML = WEEK_DAYS.map((item) => (
            `<th>${item}</th>`
        )).join('');
    }

    return domPool.weekDays;
}

export function createDateNode(year, month) {
    const lastMonthRestDays = getLastMonthRestDays(year, month);
    const currentMonthDayCount = getMonthDayCount(year, month);
    const nextMonthRestDays = getNextMonthRestDays(year, month);
    const trArr = createDateTrs(6);

    const lastMonthRestDaysTd = createRestDaysTd(lastMonthRestDays);
    const currentMonthDayCountTd = createCurrentDaysTd(currentMonthDayCount, year, month);
    const nextMonthRestDaysTd = createRestDaysTd(nextMonthRestDays);

    const tds = [...lastMonthRestDaysTd, ...currentMonthDayCountTd, ...nextMonthRestDaysTd];

    let index = 0;

    trArr.forEach(tr => {
        for(let i = 0; i < 7; i ++) {
            tr.appendChild(tds[index ++])
        }
    })

    return trArr;
}

function createRestDaysTd(restDays) {
    return restDays.map(item => {
        const oTd = document.createElement('td');
        oTd.className = 'day rest-day';
        oTd.innerText = item;

        return oTd;
    })
}

function createCurrentDaysTd(currentDaysCount, year, month) {
    const tdArr = [];

    const [
        currentYear,
        currentMonth,
        currentDay
    ] = getDateInfo();

    for(let i = 1; i <= currentDaysCount; i ++) {
        const oTd = document.createElement('td');
        
        oTd.className = 'day current-day';

        if(year === currentYear && month === currentMonth && currentDay === i) {
            oTd.className += ' current-day current';
        }

        oTd.innerText = i;
        oTd.dataset['date'] = getFormatDate(year, month, i);
        tdArr.push(oTd);
    }

    return tdArr;
}

export function createControllArea(year, month) {
    if(!domPool.controlArea) {
        domPool.controlArea = document.createElement('div');
        domPool.controlArea.className = 'control-area';

        domPool.controlArea.innerHTML = `
            <span class="control-btn btn-year-lt">&lt;&lt;</span>
            <span class="control-btn btn-month-lt">&lt;</span>
            <span class="control-title-content">
                <span class="control-title">
                    <span class="title-year">${ year }</span>年
                </span>
                <span class="control-title">
                    <span class="title-month">${ month }</span>月
                </span>
            </span>
            <span class="control-btn btn-month-gt">&gt;</span>
            <span class="control-btn btn-year-gt">&gt;&gt;</span>
        `;
    } else {
        domPool.controlArea.querySelector('.title-year').innerText = year;
        domPool.controlArea.querySelector('.title-month').innerText = month;
    }

    return domPool.controlArea;
}