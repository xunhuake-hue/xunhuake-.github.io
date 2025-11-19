
(function() {
    window.views = window.views || {};
    const { editable, editableImg } = window.utils;

    function renderStatCard(label, value, icon, path) {
        return `
        <div class="bg-slate-900/80 border border-star-gold/20 p-6 backdrop-blur-sm hover:border-star-red/50 transition-all duration-500 group">
            <div class="flex justify-between items-start mb-4">
                <i data-lucide="${icon}" class="text-slate-600 group-hover:text-star-gold transition-colors" width="24"></i>
                <span class="text-xs font-mono text-star-red uppercase tracking-wider">Live Data</span>
            </div>
            <div class="text-4xl font-bold text-slate-100 mb-1 font-mono group-hover:text-star-gold transition-colors">
                ${editable(path, value)}
            </div>
            <div class="text-sm text-slate-400">${label}</div>
        </div>`;
    }

    window.views.renderHome = function() {
        const h = window.store.data.home;
        const s = window.store.data.stats;
        
        return `
        <div class="w-full">
            <section class="relative h-[90vh] w-full overflow-hidden flex items-center justify-center">
                <div class="absolute inset-0 z-0">
                    ${editableImg('home.heroBg', h.heroBg, 'Hero BG', 'w-full h-full object-cover opacity-40 scale-105 animate-pulse-slow')}
                    <div class="absolute inset-0 bg-gradient-to-t from-star-dark via-star-dark/60 to-transparent pointer-events-none"></div>
                    <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')] opacity-30 pointer-events-none"></div>
                </div>
                <div class="relative z-10 text-center px-4 max-w-5xl mx-auto">
                    <div class="mb-6 animate-fade-in-up">
                        <span class="inline-block py-1 px-3 border border-star-red/50 text-star-red text-xs tracking-[0.3em] uppercase bg-black/50 backdrop-blur-md">Stars Guild • Est. 2024</span>
                    </div>
                    <h1 class="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight tracking-wide drop-shadow-xl">
                        <span class="block mb-2">${editable('home.heroSlogan1', h.heroSlogan1)}</span>
                        <span class="block text-star-gold/90">${editable('home.heroSlogan2', h.heroSlogan2)}</span>
                    </h1>
                    <div class="text-lg md:text-xl text-slate-300 mb-10 font-light tracking-wide border-l-4 border-star-red pl-4 mx-auto inline-block text-left bg-black/30 p-4">
                        ${editable('home.heroSubSlogan', h.heroSubSlogan)}
                    </div>
                    <div class="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up">
                        <button class="px-8 py-4 bg-star-red hover:bg-red-700 text-white font-bold tracking-wider uppercase transition-all duration-300 shadow-[0_0_20px_rgba(185,28,28,0.4)] clip-path-slant">入会申请</button>
                        <button class="px-8 py-4 bg-transparent border border-star-red text-star-red hover:bg-star-red/10 font-bold tracking-wider uppercase transition-all duration-300 clip-path-slant">委托发布</button>
                    </div>
                </div>
            </section>
            <section class="py-24 bg-slate-950 relative border-t border-star-gold/10">
                <div class="container mx-auto px-6">
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div class="space-y-8">
                            <h2 class="text-3xl font-serif font-bold text-star-gold border-l-4 border-star-red pl-4">${editable('home.missionTitle', h.missionTitle)}</h2>
                            <div class="text-slate-300 text-lg leading-relaxed text-justify font-light">
                                ${editable('home.missionText', h.missionText, true)}
                                <br/><br/>
                                <span class="text-star-red font-bold text-xl">${editable('home.missionHighlight', h.missionHighlight)}</span>
                            </div>
                            <div class="pt-4 opacity-30 hover:opacity-100 transition-opacity cursor-pointer w-fit" onclick="window.starsApp.openBooks()">
                                <div class="flex items-center space-x-2 text-sm text-star-gold"><i data-lucide="book-open" width="16"></i><span>阅读角</span></div>
                            </div>
                        </div>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            ${renderStatCard('已攻略地下城', s.dungeons, 'activity', 'stats.dungeons')}
                            ${renderStatCard('已援助困难家庭', s.families, 'heart', 'stats.families')}
                            ${renderStatCard('助农销售 (万元)', s.sales, 'shopping-cart', 'stats.sales')}
                            <div class="bg-star-red/10 border border-star-red/30 p-6 flex items-center justify-center">
                                <p class="text-star-red font-serif font-bold text-xl text-center">利润 100%<br/>回流农户</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>`;
    };
})();
