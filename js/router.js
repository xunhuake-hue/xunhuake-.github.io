
(function() {
    class Router {
        constructor() {
            // Routes will be initialized after views are loaded
        }

        init() {
            this.routes = {
                '#/': window.views.renderHome,
                '#/comrades': window.views.renderComrades,
                '#/selection': window.views.renderSelection,
                '#/actions': window.views.renderActions,
                '#/base': window.views.renderBase,
            };
            
            window.addEventListener('hashchange', () => this.render());
            this.render(); 
        }

        render() {
            const hash = window.location.hash || '#/';
            // Defensive programming if a view is missing
            const renderFn = this.routes[hash] || this.routes['#/'];
            
            if (typeof renderFn === 'function') {
                document.getElementById('root').innerHTML = renderFn();
            } else {
                document.getElementById('root').innerHTML = '<div class="text-white text-center p-10">Error loading view.</div>';
            }

            if (window.lucide) window.lucide.createIcons();
            window.scrollTo(0, 0);
            this.updateNavState(hash);
        }

        navigate(path) {
            window.location.hash = path;
        }

        updateNavState(currentHash) {
            const links = [
                { path: '#/', label: '星星之火', icon: 'star' },
                { path: '#/comrades', label: '核心成员', icon: 'shield' },
                { path: '#/selection', label: '群星甄选', icon: 'shopping-bag' },
                { path: '#/actions', label: '红色活动', icon: 'calendar' },
                { path: '#/base', label: '线下据点', icon: 'map-pin' },
            ];
            
            const html = links.map(l => {
                const active = currentHash === l.path || (currentHash === '' && l.path === '#/');
                return `
                <a href="javascript:void(0)" onclick="window.starsApp.navigate('${l.path}')" class="relative group flex items-center space-x-1 py-2 transition-colors duration-300 ${active ? 'text-star-red' : 'text-slate-300 hover:text-star-gold'}">
                    <i data-lucide="${l.icon}" width="16" class="mb-0.5 ${active ? 'fill-current' : ''}"></i>
                    <span class="font-medium">${l.label}</span>
                    ${active ? '<span class="absolute bottom-0 left-0 w-full h-0.5 bg-star-red shadow-[0_0_8px_rgba(185,28,28,0.8)]"></span>' : ''}
                </a>`;
            }).join('');
            const navContainer = document.getElementById('nav-links');
            if(navContainer) navContainer.innerHTML = html;
        }
    }

    window.Router = Router;
})();
