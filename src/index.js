import timer from './modules/timer';
import menu from './modules/menu';
import popupAction from './modules/popupAction';
import tabsChanger from './modules/tabsChanger';
import slider from './modules/slider';
import calculator from './modules/calculator';
import team from './modules/team';
import sendForm from './modules/sendForm';


// таймер
timer('01 august 2020 00:00');

// -----------------------------------------------------------------------------------

// меню
menu();

// -----------------------------------------------------------------------------------

//popup
popupAction();

// -----------------------------------------------------------------------------------

// tabs
tabsChanger();

// -----------------------------------------------------------------------------------

//slider
slider();

// -----------------------------------------------------------------------------------

//calculator
calculator(100);

// -----------------------------------------------------------------------------------

//team
team();

// -----------------------------------------------------------------------------------

// send ajax-form
sendForm();
