
(function() {
    window.views = window.views || {};
    const { editable, editableImg } = window.utils;

    function renderMemberCard(m) {
        const path = `members.${m.id}`;
        return `
        <div class="${m.special ? 'lg:col-span-2' : ''} group relative w-full ${window.store.isEditMode ? 'h-[500px]' : 'h-[450px]'} bg-slate-900 border border-slate-800 overflow-hidden hover:border-star-gold transition-all duration-500 shadow-lg">
            <div class="absolute inset-0 h-full w-full">
                ${editableImg(`${path}.imageUrl`, m.imageUrl, m.name, 'w-full h-full object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-110')}
            </div>
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-500 pointer-events-none"></div>
            <div class="absolute top-4 right-4 w-10 h-10 border-2 border-star-gold flex items-center justify-center transform rotate-45 bg-black/50 backdrop-blur-md z-20">
                <span class="text-star-gold font-bold font-mono transform -rotate-45 text-lg">${editable(`${path}.rank`, m.rank)}</span>
            </div>
            <div class="absolute bottom-0 left-0 w-full p-6 z-20 ${window.store.isEditMode ? '' : 'transform translate-y-14 group-hover:translate-y-0'} transition-transform duration-500 ease-out">
                <div class="border-l-4 border-star-red pl-4 mb-4">
                    <h3 class="text-3xl font-serif font-bold text-white mb-1">${editable(`${path}.alias`, m.alias)}</h3>
                    <div class="text-sm text-slate-400 font-mono uppercase tracking-widest">${editable(`${path}.name`, m.name)}</div>
                </div>
                <div class="space-y-3 ${window.store.isEditMode ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity duration-500 delay-100">
                    <div class="flex items-center space-x-2 text-star-gold text-sm"><i data-lucide="shield" width="14"></i>${editable(`${path}.role`, m.role)}</div>
                    <div class="flex items-center space-x-2 text-star-red text-sm font-bold"><i data-lucide="zap" width="14"></i>${editable(`${path}.position`, m.position)}</div>
                    <div class="pt-4 border-t border-white/10">
                        <p class="text-slate-300 text-xs italic font-serif">${editable(`${path}.motto`, m.motto, true)}</p>
                    </div>
                </div>
            </div>
        </div>`;
    }

    window.views.renderComrades = function() {
        return `
        <div class="min-h-screen py-20 px-6 bg-star-dark">
            <div class="container mx-auto">
                <div class="mb-16 text-center">
                    <h1 class="text-4xl md:text-5xl font-serif font-bold text-slate-100 mb-4"><span class="text-star-red">群星</span>闪耀时</h1>
                    <p class="text-slate-400 max-w-2xl mx-auto font-light">他们是凡人，也是英雄。在潮汐中站立，在烟火中前行。</p>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    ${window.store.data.members.map(m => renderMemberCard(m)).join('')}
                </div>
            </div>
        </div>`;
    };
})();
