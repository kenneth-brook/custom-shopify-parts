class CSPProductRow {
  constructor(section) {
    this.section = section;
    this.viewport = section.querySelector('[data-row-viewport]');
    this.track = section.querySelector('[data-row-track]');
    this.prev = section.querySelector('[data-row-prev]');
    this.next = section.querySelector('[data-row-next]');

    if (!this.viewport || !this.track || section.dataset.layout !== 'carousel') return;

    this.onPrev = () => this.scroll(-1);
    this.onNext = () => this.scroll(1);
    this.update = () => this.updateControls();

    this.prev?.addEventListener('click', this.onPrev);
    this.next?.addEventListener('click', this.onNext);
    this.viewport.addEventListener('scroll', this.update, { passive: true });
    window.addEventListener('resize', this.update);

    this.updateControls();
  }

  scroll(direction) {
    const item = this.track.querySelector('.csp-product-row__item');
    if (!item) return;

    const styles = getComputedStyle(this.track);
    const gap = parseFloat(styles.columnGap || styles.gap || 0);
    const distance = item.getBoundingClientRect().width + gap;

    this.viewport.scrollBy({
      left: distance * direction,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
    });
  }

  updateControls() {
    if (!this.prev || !this.next) return;

    const maxScroll = this.viewport.scrollWidth - this.viewport.clientWidth;
    this.prev.disabled = this.viewport.scrollLeft <= 2;
    this.next.disabled = this.viewport.scrollLeft >= maxScroll - 2;
  }
}

function initCSPProductRows(root = document) {
  root.querySelectorAll('[data-product-row]').forEach((section) => {
    if (!section.cspProductRow) section.cspProductRow = new CSPProductRow(section);
  });
}

document.addEventListener('DOMContentLoaded', () => initCSPProductRows());
document.addEventListener('shopify:section:load', (event) => initCSPProductRows(event.target));
