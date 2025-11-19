
(function() {
    window.views = window.views || {};
    const { editable, editableImg } = window.utils;

    function renderProductCard(p) {
        const path = `products.${p.id}`;
        return `
        <div class="bg-white text-slate-800 group overflow-hidden relative flex flex-col h-full border-b-4 border-star-red hover:shadow-2xl transition-shadow duration-300">
            <div class="relative h-64 overflow-hidden">
                ${editableImg(`${path}.imageUrl`, p.imageUrl, p.name, 'w-full h-full object-cover transition-transform duration-700 group-hover:scale-105')}
                ${p.category === 'Agricultural' ? '<div class="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 font-bold uppercase">助农产品</div>' : ''}
                <div class="absolute bottom-0 right-0 bg-star-red text-white px-3 py-1 font-mono font-bold flex items-center">¥ ${editable(`${path}.price`, p.price)}</div>
            </div>
            <div class="p-6 flex flex-col flex-grow">
                <h3 class="font-serif font-bold text-xl text-slate-900 mb-2 w-full">${editable(`${path}.name`, p.name)}</h3>
                <div class="text-sm text-slate-600 mb-4 flex-grow font-light w-full">${editable(`${path}.description`, p.description, true)}</div>
                <div class="pt-4 border-t border-slate-100 flex justify-between items-center">
                    <span class="text-xs text-slate-400 flex items-center">
                        <i data-lucide="${p.origin ? 'tag' : 'gift'}" width="12" class="mr-1"></i>
                        ${p.origin || '群星周边'}
                    </span>
                    <button class="text-star-red border border-star-red px-4 py-1 text-sm font-bold hover:bg-star-red hover:text-white transition-colors flex items-center">
                        <i data-lucide="shopping-cart" width="14" class="mr-2"></i> 购买
                    </button>
                </div>
            </div>
        </div>`;
    }

    window.views.renderSelection = function() {
        return `
        <div class="min-h-screen bg-slate-100 text-slate-900 py-20 px-6">
            <div class="container mx-auto">
                <div class="flex flex-col md:flex-row justify-between items-end mb-12 border-b-2 border-star-red/20 pb-6">
                    <div>
                        <h1 class="text-4xl font-serif font-bold text-slate-900">群星甄选 <span class="text-star-red text-2xl">Stars Selection</span></h1>
                        <p class="text-slate-500 mt-2">连接土地与餐桌，让每一分钱都温暖劳动者。</p>
                    </div>
                    <div class="bg-star-gold/10 border border-star-gold/50 p-3 rounded-sm mt-4 md:mt-0">
                        <p class="text-star-gold-dim text-sm font-bold">⚠️ 承诺：扣除物流成本后，利润 100% 归还农户。</p>
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    ${window.store.data.products.map(p => renderProductCard(p)).join('')}
                </div>
            </div>
        </div>`;
    };
})();
