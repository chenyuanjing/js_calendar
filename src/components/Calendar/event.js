import { ALLOW_FLAGS, getFlag, setFlag } from './store';

let target = null;

export default (...args) => {
    const [ container ] = args;
    container.addEventListener('click', handleClick.bind(null, ...args), false)
}

function handleClick(...args) {
    const [ container, handler, dateInfo, e ] = args;
    const tar = e.target;
    const className = tar.className;
    const flag = getFlag();

    if(className.includes('current-day')) {
        dateClick(tar, handler);
        return;
    }

    if(className.includes('decade-year')) {
        yearClick(container, tar, dateInfo);
    }

    if(className.includes('static-month')) {
        monthClick(container, tar, dateInfo);
    }

    if(className === 'title-year') {
        titleYearClick(container, dateInfo);
        return;
    }

    if(className === 'title-month') {
        titleMonthClick(container, dateInfo);
        return;
    }

    switch(flag) {
        case ALLOW_FLAGS.YEAR:
            yearControlClick(className, dateInfo);
            break;
        case ALLOW_FLAGS.MONTH:
            monthControlClick(className, dateInfo);
            break;
        case ALLOW_FLAGS.DATE:
            dateControlClick(className, dateInfo);
            break;
    }
}

function dateClick(tar, handler) {
    if(target) {
        target.className = target.className.replace('selected', '');
    }
    target = tar;
    tar.className += ' selected';

    handler && handler(tar.dataset.date);
}

function yearClick(container, tar, dateInfo) {
    dateInfo.year = Number(tar.dataset.year);
    setFlag(ALLOW_FLAGS.DATE, container, dateInfo);
}

function monthClick(container, tar, dateInfo) {
    dateInfo.month = Number(tar.dataset.month);
    setFlag(ALLOW_FLAGS.DATE, container, dateInfo);
}

function dateControlClick(className, dateInfo) {
    switch(className) {
        case 'control-btn btn-year-lt':
            dateInfo.year -= 1;
            break;
        case 'control-btn btn-month-lt':
            dateInfo.month > 1  ? dateInfo.month -= 1 : (dateInfo.year --, dateInfo.month = 12);
            break;
        case 'control-btn btn-year-gt':
            dateInfo.year += 1;
            break;
        case 'control-btn btn-month-gt':
            dateInfo.month < 12  ? dateInfo.month += 1 : (dateInfo.year ++, dateInfo.month = 1);
        break;
        default:
            break;
    }
}

function yearControlClick(className, dateInfo) {
    switch(className) {
        case 'control-btn btn-year-lt':
            dateInfo.year -= 10;
            break;
        case 'control-btn btn-year-gt':
            dateInfo.year += 10;
            break;
        default:
            break;

    }
}

function monthControlClick(className, dateInfo) {
    switch(className) {
        case 'control-btn btn-year-lt':
            dateInfo.year -= 1;
            break;
        case 'control-btn btn-year-gt':
            dateInfo.year += 1;
            break;
        default:
            break;

    }
}

function titleYearClick(container, dateInfo) {
    setFlag(ALLOW_FLAGS.YEAR, container, dateInfo);
}

function titleMonthClick(container, dateInfo) {
    setFlag(ALLOW_FLAGS.MONTH, container, dateInfo);
}