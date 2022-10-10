import { update as dateUpdate, render as dateRender } from "./date/render";
import { update as yearUpdate, render as yearRender } from "./year/render";
import { update as monthUpdate, render as monthRender } from './month/render';

export const ALLOW_FLAGS = {
    'YEAR': 'YEAR',
    'MONTH': 'MONTH',
    'DATE': 'DATE'
}

let currentFlag = ALLOW_FLAGS.DATE;

export function getFlag() {
    return currentFlag;
}

export function setFlag(flag, container, { year, month }) {
    if(ALLOW_FLAGS[flag]) {
        currentFlag = ALLOW_FLAGS[flag];
    }

    switch(currentFlag) {
        case ALLOW_FLAGS.YEAR:
            yearRender(container, year);
            break;
        case ALLOW_FLAGS.MONTH:
            monthRender(container, year, month);
            break;
        case ALLOW_FLAGS.DATE:
            dateRender(container, year, month);
            break;
        default:
            break;
    }
}

export function reactive ({ year, month }) {
    const dateInfo = {},
          _dateInfo = [ year, month ];
    
    Object.defineProperties(dateInfo, {
        year: {
            get() {
                return _dateInfo[0];
            },
            set(newVal) {
                _dateInfo[0] = newVal;
                update(..._dateInfo);
            }
        },
        month: {
            get() {
                return _dateInfo[1];
            },
            set(newVal) {
                _dateInfo[1] = newVal;
                update(..._dateInfo);
            }
        }
    })

    return dateInfo;
}

function update(year, month) {
    switch (currentFlag) {
        case ALLOW_FLAGS.YEAR:
            yearUpdate(year);
            break;
        case ALLOW_FLAGS.MONTH:
            monthUpdate(year);
            break;
        case ALLOW_FLAGS.DATE:
            dateUpdate(year, month);
            break;
        default:
            break;
    }
}