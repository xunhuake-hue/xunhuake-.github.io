
(function() {
    window.views = window.views || {};
    const { editable, editableImg } = window.utils;

    window.views.renderBase = function() {
        const b = window.store.data.base;
        return `
        <div class="min-h-screen bg-star-dark relative overflow-hidden">
            <div class="absolute inset-0 z-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1550100136-e0721016d6b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center"></div>
            <div class="absolute inset-0 z-0 bg-gradient-to-b from-star-dark via-star-dark/90 to-star-dark"></div>
            <div class="container mx-auto px-6 relative z-10 py-20">
                <div class="max-w-5xl mx-auto bg-black/60 backdrop-blur-lg border border-star-gold/30 p-8 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div>
                            <h1 class="text-4xl font-serif font-bold text-white mb-2">群星俱乐部</h1>
                            <h2 class="text-star-gold font-mono tracking-widest text-sm mb-8">STARS CLUB • HAIKOU</h2>
                            <div class="space-y-6 text-slate-300">
                                <div class="flex items-start space-x-4"><i data-lucide="map-pin" class="text-star-red mt-1"></i><div><p class="font-bold text-white">地址 Address</p><p>${editable('base.address', b.address)}</p><p class="text-xs text-slate-500 mt-1">${editable('base.addressNote', b.addressNote)}</p></div></div>
                                <div class="flex items-start space-x-4"><i data-lucide="clock" class="text-star-red mt-1"></i><div><p class="font-bold text-white">营业时间 Hours</p><p>${editable('base.hours', b.hours)}</p><p class="text-xs text-slate-500 mt-1">${editable('base.hoursNote', b.hoursNote)}</p></div></div>
                                <div class="border-t border-white/10 pt-6 mt-8">
                                    <div class="flex items-center gap-4">
                                        <div class="w-16 h-16 flex-shrink-0 overflow-hidden rounded-full border-2 border-star-gold/50">${editableImg('base.managerImg', b.managerImg, 'Manager', 'object-cover rounded-full')}</div>
                                        <div>
                                            <p class="text-star-gold font-bold text-lg">${editable('base.managerName', b.managerName)}</p>
                                            <p class="text-xs text-slate-400 uppercase tracking-wider mb-1">${editable('base.managerRole', b.managerRole)}</p>
                                            <p class="text-sm italic text-slate-300">${editable('base.managerQuote', b.managerQuote)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="relative h-96 md:h-full min-h-[400px] border border-slate-700 p-2 rotate-2 hover:rotate-0 transition-transform duration-500 bg-slate-900">
                            ${editableImg('base.vibeImg', b.vibeImg, 'Bar', 'opacity-80 hover:opacity-100 transition-opacity')}
                            <div class="absolute bottom-6 right-6 bg-black/80 px-4 py-2 border border-star-red text-star-red font-mono text-xs tracking-widest animate-pulse pointer-events-none">OPEN</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    };
})();
