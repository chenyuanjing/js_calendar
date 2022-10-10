import { createDateTrs, getDateInfo } from "../utils";
import { createDecadeYear, getStartAndEndYear } from "./utils";

const domPool = {
    controlArea: null
}

export function createYearControlArea(year) {
    const [ startYear, endYear ] = getStartAndEndYear(year);

    if (!domPool.controlArea) {
        domPool.controlArea = document.createElement('div');
        domPool.controlArea.className = 'year-control-area';

        domPool.controlArea.innerHTML = `
        <span class="control-btn btn-year-lt">&lt;&lt;</span>
        <span class="control-title-content">
            <span class="control-title">
                <span class="start-year">${ startYear }</span>
                -
                <span class="end-year">${ endYear }</span>
            </span>
        </span>
        <span class="control-btn btn-year-gt">&gt;&gt;</span>
        `
    } else {
        domPool.controlArea.querySelector('.start-year').innerText = startYear;
        domPool.controlArea.querySelector('.end-year').innerText = endYear;
    }

    return domPool.controlArea;
}

export function createYearTd(year) {
    const  decadeYearArr = createDecadeYear(year);
    const [ currentYear ] = getDateInfo();
    const tdArr = [];


    decadeYearArr.forEach(item => {
        const oTd = document.createElement('td');
        oTd.innerText = item;
        oTd.className = 'year decade-year';

        if(currentYear === item) {
            oTd.className += ' current';
        }
        oTd.setAttribute('data-year', item)
        tdArr.push(oTd);
    })

    return tdArr;
}

let index = 0

export function createYearNode(year) {
    const yearArr = createDateTrs(3);
    const yearTds = createYearTd(year);


    yearArr.forEach((tr) => {
        for(let i = 0; i < 4 && yearTds[index]; i ++) {
            tr.appendChild(yearTds[index ++]);
        }
    })

    index = 0;

    return yearArr;
}