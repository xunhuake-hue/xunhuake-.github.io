
(function() {
    window.views = window.views || {};
    const { editable, editableImg } = window.utils;

    window.views.renderActions = function() {
        const d = window.store.data.actions;
        return `
        <div class="min-h-screen bg-star-dark py-20 px-6">
            <div class="container mx-auto max-w-4xl">
                <h1 class="text-5xl font-serif font-bold text-white mb-16 text-center"><span class="border-b-4 border-star-red pb-2">红色活动</span> Actions</h1>
                <!-- Thursday -->
                <div class="relative bg-slate-900 border border-slate-800 overflow-hidden mb-20 group">
                    <div class="absolute top-0 left-0 w-2 h-full bg-star-gold"></div>
                    <div class="grid grid-cols-1 md:grid-cols-2">
                        <div class="h-64 md:h-auto overflow-hidden relative">${editableImg('actions.mealImg', d.mealImg, 'Meal')}</div>
                        <div class="p-8 flex flex-col justify-center">
                            <div class="flex items-center space-x-2 text-star-gold mb-2"><i data-lucide="utensils" width="20"></i><span class="font-mono font-bold uppercase">Every Thursday</span></div>
                            <h2 class="text-3xl font-bold text-white mb-4">${editable('actions.mealTitle', d.mealTitle)}</h2>
                            <h3 class="text-xl text-slate-400 font-serif italic mb-6">${editable('actions.mealQuote', d.mealQuote)}</h3>
                            <div class="text-slate-400 text-sm leading-relaxed mb-6">${editable('actions.mealDesc', d.mealDesc, true)}</div>
                        </div>
                    </div>
                </div>
                <!-- Saturday -->
                <div class="relative bg-slate-900 border border-slate-800 overflow-hidden mb-20 group">
                    <div class="absolute top-0 right-0 w-2 h-full bg-star-red"></div>
                    <div class="grid grid-cols-1 md:grid-cols-2">
                        <div class="p-8 flex flex-col justify-center order-2 md:order-1 text-right">
                            <div class="flex items-center justify-end space-x-2 text-star-red mb-2"><span class="font-mono font-bold uppercase">Every Saturday</span><i data-lucide="mic-2" width="20"></i></div>
                            <h2 class="text-3xl font-bold text-white mb-4">${editable('actions.heritageTitle', d.heritageTitle)}</h2>
                            <h3 class="text-xl text-slate-400 font-serif italic mb-6">${editable('actions.heritageQuote', d.heritageQuote)}</h3>
                            <ul class="text-slate-400 text-sm leading-relaxed mb-6 space-y-2 inline-block text-right w-full">
                                <li>${editable('actions.heritageDesc1', d.heritageDesc1)}</li>
                                <li>${editable('actions.heritageDesc2', d.heritageDesc2)}</li>
                            </ul>
                        </div>
                        <div class="h-64 md:h-auto overflow-hidden order-1 md:order-2 relative">${editableImg('actions.heritageImg', d.heritageImg, 'Heritage')}</div>
                    </div>
                </div>
                 <div class="text-center py-10"><p class="text-2xl font-serif text-star-gold">${editable('actions.finalQuote', d.finalQuote)}</p></div>
            </div>
        </div>`;
    };
})();
