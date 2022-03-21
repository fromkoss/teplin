if (!customElements.get('product-add-btn')) {
    customElements.define('product-add-btn', class ProductAddBtn extends HTMLElement {
        constructor() {
            super();
            this.addEventListener('click', this._onClick.bind(this));
        }

        /**
         *
         * @param evt
         * @private
         */
        _onClick(evt) {
            evt.preventDefault();
            if (this.classList.contains('loading')) return;
            this.setAttribute('aria-disabled', true);
            this.classList.add('loading');
            const { id, qty, ...properties} = this.dataset;

            if (!id) {
                console.log('Id is required')
                return ;
            }

            return this._addToCart({
                items: [
                    {
                        id,
                        quantity: qty || 1,
                        properties,
                    }
                ]
            });
        }

        /**
         *
         * @param payload
         * @returns {Promise<void>}
         * @private
         */
        async _addToCart(payload){
            await fetch(`${window.Shopify.routes.root}cart/add.js`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
                .then(response => {
                    return response.json();
                }).then((response) => {
            })
                .catch((error) => {
                    console.error('Error:', error);
                });
            const cart = await this._getCart().finally(() => {
                this.classList.remove('loading');
                this.removeAttribute('aria-disabled');
            });;
            console.log('Cart',cart);
        }

        /**
         *
         * @returns {Promise<any>}
         * @private
         */
        async _getCart() {
            return await fetch(`${window.Shopify.routes.root}cart.js`,)
                .then(response => {
                    return response.json();
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    });
}
