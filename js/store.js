
(function() {
    class Store {
        constructor() {
            const INITIAL_DATA = window.INITIAL_DATA;
            try {
                const saved = localStorage.getItem('stars_guild_data');
                this.data = saved ? JSON.parse(saved) : INITIAL_DATA;
            } catch (e) {
                console.error("Failed to load data, resetting to default", e);
                this.data = INITIAL_DATA;
            }
            
            // Merge to ensure data integrity
            this.data = { ...INITIAL_DATA, ...this.data };
            if(this.data.home) this.data.home = { ...INITIAL_DATA.home, ...this.data.home };
            if(this.data.stats) this.data.stats = { ...INITIAL_DATA.stats, ...this.data.stats };
            if(this.data.actions) this.data.actions = { ...INITIAL_DATA.actions, ...this.data.actions };
            if(this.data.base) this.data.base = { ...INITIAL_DATA.base, ...this.data.base };

            this.isAuthenticated = sessionStorage.getItem('stars_auth') === 'true';
            this.isEditMode = sessionStorage.getItem('stars_auth') === 'true';
            this.listeners = [];
        }

        save() {
            try {
                localStorage.setItem('stars_guild_data', JSON.stringify(this.data));
                this.notify();
            } catch (e) {
                if (e.name === 'QuotaExceededError') {
                    alert('存储空间不足！图片太大，无法保存。请尝试使用更小的图片。');
                } else {
                    console.error('Save failed', e);
                }
            }
        }

        reset() {
            if (confirm('确定重置所有数据到初始状态吗？')) {
                this.data = JSON.parse(JSON.stringify(window.INITIAL_DATA));
                localStorage.removeItem('stars_guild_data');
                this.save();
                location.reload();
            }
        }

        login(password) {
            if (password === 'stars') {
                this.isAuthenticated = true;
                this.isEditMode = true;
                sessionStorage.setItem('stars_auth', 'true');
                this.notify();
                return true;
            }
            return false;
        }

        logout() {
            this.isAuthenticated = false;
            this.isEditMode = false;
            sessionStorage.removeItem('stars_auth');
            this.notify();
        }

        toggleEditMode() {
            this.isEditMode = !this.isEditMode;
            this.notify();
        }

        updateField(path, value) {
            const parts = path.split('.');
            if (parts.length === 2) {
                this.data[parts[0]][parts[1]] = value;
            } else if (parts.length === 3) {
                const collection = parts[0];
                const id = parts[1];
                const field = parts[2];
                const item = this.data[collection].find(i => i.id === id);
                if (item) item[field] = value;
            }
            this.save();
        }

        subscribe(listener) {
            this.listeners.push(listener);
        }

        notify() {
            this.listeners.forEach(fn => fn());
        }
    }

    window.store = new Store();
})();
