/* -------------------------------------------------------------- */

const print = text => console.log(text)
const $ = document.querySelector.bind(document)

/* -------------------------------------------------------------- */

import Modal from './modal.js'

const modal = Modal({ animateClasses: ['animate-pop', 'back'] })

document.querySelector('.open-modal').addEventListener('click', modal.open)
