document.querySelector("#btn-add").addEventListener("click", () => {
  document.querySelector("#content-modal").classList.add("open__modal")
})
document.querySelector("#btn-remove").addEventListener("click", () => {
  document.querySelector("#content-modal").classList.remove("open__modal")
})
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelector("#content-modal").classList.remove("open__modal")
  }
})
document.querySelector("#content-modal .content__prever-body").addEventListener('click', event => {
  event._isClickWithInModal = true
})
document.querySelector("#content-modal").addEventListener('click', event => {
  if (event._isClickWithInModal) return;
  event.currentTarget.classList.remove("open__modal")
})


