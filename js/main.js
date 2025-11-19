
(function() {
    const router = new window.Router();

    // Global App Controller
    window.starsApp = {
        navigate: (path) => router.navigate(path),
        toggleEditMode: () => window.store.toggleEditMode(),
        resetData: () => window.store.reset(),
        logout: () => window.store.logout(),
        
        // UI Helpers
        updateField: (path, value) => window.store.updateField(path, value),
        handleImageUpload: (e, path) => window.utils.handleImageUpload(e, path),
        
        // Modals
        openLogin: () => document.getElementById('login-modal').classList.replace('hidden', 'flex'),
        closeLogin: () => document.getElementById('login-modal').classList.replace('flex', 'hidden'),
        handleLogin: (e) => {
            e.preventDefault();
            const pwd = document.getElementById('password-input').value;
            if(window.store.login(pwd)) {
                window.starsApp.closeLogin();
                document.getElementById('password-input').value = '';
            } else {
                alert('密码错误(Hint: stars)');
            }
        },
        openBooks: () => document.getElementById('book-modal').classList.replace('hidden', 'flex'),
        closeBooks: () => document.getElementById('book-modal').classList.replace('flex', 'hidden'),
        handleCopyrightClick: () => console.log("Click")
    };

    function updateAdminUI() {
        const toolbar = document.getElementById('admin-toolbar');
        const status = document.getElementById('admin-status');
        const lockBtn = document.getElementById('lock-btn');
        const editBtn = document.getElementById('btn-edit-mode');
        
        if (window.store.isAuthenticated) {
            toolbar.classList.remove('hidden');
            status.classList.remove('hidden');
            lockBtn.classList.add('hidden');
            editBtn.classList.toggle('bg-star-gold', window.store.isEditMode);
            editBtn.classList.toggle('text-black', window.store.isEditMode);
        } else {
            toolbar.classList.add('hidden');
            status.classList.add('hidden');
            lockBtn.classList.remove('hidden');
        }
        if(window.lucide) window.lucide.createIcons();
    }

    // Subscribe to store updates
    window.store.subscribe(() => {
        router.render();
        updateAdminUI();
    });

    // Initialize
    document.addEventListener('DOMContentLoaded', () => {
        router.init();
        updateAdminUI();
    });
})();
