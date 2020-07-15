import $ from 'jquery';
import './style.scss';

let num = 0;
num = setInterval(() => {
  // eslint-disable-next-line no-plusplus
  num++;
  $('#main').html(`You've been on this page for ${num} seconds.`);
}, 1000);
