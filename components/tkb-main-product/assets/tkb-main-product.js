(() => {
  const init = root => {
    if (!root || root.dataset.ready) return;
    root.dataset.ready = '1';

    const json = root.querySelector('[data-product-variants]');
    const form = root.querySelector('[data-product-form]');
    if (!json || !form) return;

    let variants = [];
    try {
      variants = JSON.parse(json.textContent);
    } catch (e) {
      console.error(e);
      return;
    }

    const inputs = [...root.querySelectorAll('[data-option-input]')];
    const idInput = root.querySelector('[data-variant-id]');
    const price = root.querySelector('[data-product-price]');
    const compare = root.querySelector('[data-compare-price]');
    const add = root.querySelector('[data-add-to-cart]');
    const label = root.querySelector('[data-add-label]');
    const status = root.querySelector('[data-product-status]');

    const money = cents =>
      (Number(cents || 0) / 100).toLocaleString(undefined, {
        style: 'currency',
        currency: 'USD'
      });

    const normalize = value => (value || '').trim().toLowerCase();

    const selected = () =>
      [...new Set(inputs.map(input => +input.dataset.optionPosition))]
        .sort()
        .map(position =>
          root.querySelector(
            `[data-option-input][data-option-position="${position}"]:checked`
          )?.value || null
        );

    const selectedColor = () => {
      const colorFieldset = root.querySelector('[data-color-option="true"]');
      if (!colorFieldset) return null;
      return colorFieldset.querySelector('[data-option-input]:checked')?.value || null;
    };

    const find = () => {
      const values = selected();
      return variants.find(variant =>
        variant.options.every((value, index) => value === values[index])
      );
    };

    const showMedia = id => {
      if (!id) return;

      root.querySelectorAll('[data-media-id]').forEach(media => {
        const active = String(media.dataset.mediaId) === String(id);
        media.hidden = !active;
        media.classList.toggle('is-active', active);
      });

      root.querySelectorAll('[data-media-trigger]').forEach(button => {
        const active = String(button.dataset.mediaTrigger) === String(id);
        button.classList.toggle('is-active', active);
        button.setAttribute('aria-pressed', active ? 'true' : 'false');
      });
    };

    const showMediaGroup = (groupName, preferredMediaId = null) => {
      if (!groupName) return false;

      const normalizedGroup = normalize(groupName);
      const mediaItems = [...root.querySelectorAll('[data-media-id]')];
      const thumbItems = [...root.querySelectorAll('[data-media-trigger]')];

      const matchingMedia = mediaItems.filter(
        media => normalize(media.dataset.mediaGroup) === normalizedGroup
      );

      const matchingThumbs = thumbItems.filter(
        button => normalize(button.dataset.mediaGroup) === normalizedGroup
      );

      if (!matchingMedia.length) return false;

      thumbItems.forEach(button => {
        const belongsToGroup = normalize(button.dataset.mediaGroup) === normalizedGroup;
        button.hidden = !belongsToGroup;
        button.classList.remove('is-active');
        button.setAttribute('aria-pressed', 'false');
      });

      let activeMedia = matchingMedia.find(
        media => String(media.dataset.mediaId) === String(preferredMediaId)
      );

      if (!activeMedia) activeMedia = matchingMedia[0];

      mediaItems.forEach(media => {
        const active = media === activeMedia;
        media.hidden = !active;
        media.classList.toggle('is-active', active);
      });

      const activeThumb = matchingThumbs.find(
        button => String(button.dataset.mediaTrigger) === String(activeMedia.dataset.mediaId)
      );

      if (activeThumb) {
        activeThumb.hidden = false;
        activeThumb.classList.add('is-active');
        activeThumb.setAttribute('aria-pressed', 'true');
      }

      return true;
    };

    const availability = () => {
      const current = selected();

      inputs.forEach(input => {
        const position = +input.dataset.optionPosition - 1;
        const candidate = [...current];
        candidate[position] = input.value;

        input.disabled = !variants.some(
          variant =>
            variant.available &&
            variant.options.every((value, index) =>
              index === position
                ? value === candidate[index]
                : candidate[index] == null || value === candidate[index]
            )
        );
      });
    };

    const update = () => {
      inputs.forEach(input => {
        if (!input.checked) return;

        const output = root.querySelector(
          `[data-option-label="${input.dataset.optionPosition}"]`
        );
        if (output) output.textContent = input.value;
      });

      const variant = find();

      if (!variant) {
        idInput.value = '';
        add.disabled = true;
        label.textContent = 'Unavailable';
        status.textContent = 'This combination is not available.';
        availability();
        return;
      }

      idInput.value = variant.id;
      price.textContent = money(variant.price);

      const sale = Number(variant.compare_at_price || 0) > Number(variant.price || 0);
      compare.hidden = !sale;
      compare.textContent = sale ? money(variant.compare_at_price) : '';

      add.disabled = !variant.available;
      label.textContent = variant.available ? 'Add to cart' : 'Sold out';
      status.textContent = variant.available ? '' : 'This selection is sold out.';

      const color = selectedColor();
      const preferredMediaId = variant.featured_media?.id || variant.featured_image?.id || null;
      const groupedMediaShown = color
        ? showMediaGroup(color, preferredMediaId)
        : false;

      if (!groupedMediaShown && preferredMediaId) {
        root.querySelectorAll('[data-media-trigger]').forEach(button => {
          button.hidden = false;
        });
        showMedia(preferredMediaId);
      }

      const url = new URL(location.href);
      url.searchParams.set('variant', variant.id);
      history.replaceState({}, '', url);

      availability();
    };

    inputs.forEach(input => input.addEventListener('change', update));

    root.querySelectorAll('[data-media-trigger]').forEach(button => {
      button.addEventListener('click', () => {
        showMedia(button.dataset.mediaTrigger);
      });
    });

    const qty = root.querySelector('[data-quantity-input]');
    root.querySelector('[data-quantity-minus]')?.addEventListener('click', () => {
      qty.value = Math.max(1, +qty.value - 1);
    });
    root.querySelector('[data-quantity-plus]')?.addEventListener('click', () => {
      qty.value = Math.max(1, +qty.value + 1);
    });

    update();
  };

  const all = scope =>
    (scope || document).querySelectorAll('[data-tkb-product]').forEach(init);

  document.addEventListener('DOMContentLoaded', () => all());
  document.addEventListener('shopify:section:load', event => all(event.target));
})();
