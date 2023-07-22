import type { Directive } from 'vue'

const store = new Map()

type ThisElement = HTMLElement
type ThisValue = () => void

function clickHandler(this: { el: ThisElement; value: ThisValue }, { target }: Event): void {
  if (!(target instanceof HTMLElement)) return

  if (target.contains(this.el || null)) {
    this.value()
  }
}

const clickOutside: Directive<ThisElement, ThisValue> = {
  created(el, { value }) {
    store.set(el, clickHandler.bind({ el, value }))
  },
  mounted(el) {
    document.body.addEventListener('click', store.get(el))
  },
  unmounted(el) {
    document.body.removeEventListener('click', store.get(el))
    store.delete(el)
  }
}

export default clickOutside
