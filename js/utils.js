
(function() {
    window.utils = {};

    window.utils.editable = function(path, value, multiline = false, cssClass = '') {
        if (!window.store.isEditMode) return `<span class="${cssClass}">${value !== undefined ? value : ''}</span>`;
        
        const safeValue = String(value || '').replace(/"/g, '&quot;');
        if (multiline) {
            return `<textarea onchange="window.starsApp.updateField('${path}', this.value)" class="bg-slate-800 border border-star-gold/50 text-white p-1 w-full rounded min-h-[100px] ${cssClass}">${value || ''}</textarea>`;
        }
        return `<input type="text" onchange="window.starsApp.updateField('${path}', this.value)" value="${safeValue}" class="bg-slate-800 border border-star-gold/50 text-white px-1 rounded min-w-[50px] ${cssClass}">`;
    };

    window.utils.editableImg = function(path, src, alt, cssClass = '') {
        const imgHtml = `<img src="${src}" alt="${alt}" class="${cssClass} w-full h-full object-cover transition-transform duration-700 ${window.store.isEditMode ? 'opacity-50' : ''}">`;
        
        if (!window.store.isEditMode) return imgHtml;
        
        return `
        <div class="relative w-full h-full group bg-slate-900 overflow-hidden">
            ${imgHtml}
            <div class="absolute top-2 left-2 right-2 z-[60]">
                <div class="flex gap-1">
                    <input type="text" value="${src}" onchange="window.starsApp.updateField('${path}', this.value)" 
                    class="bg-black/80 text-white text-[10px] p-2 border border-star-red w-full rounded shadow-lg" placeholder="Image URL...">
                    <label class="cursor-pointer bg-star-red hover:bg-red-700 text-white p-2 rounded shadow-lg flex items-center justify-center transition-colors" title="Upload Image">
                        <i data-lucide="upload" width="14"></i>
                        <input type="file" class="hidden" accept="image/*" onchange="window.starsApp.handleImageUpload(event, '${path}')">
                    </label>
                </div>
            </div>
        </div>`;
    };

    window.utils.handleImageUpload = function(event, path) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const MAX_WIDTH = 800;
                const MAX_HEIGHT = 800;
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
                    }
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                
                const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
                window.store.updateField(path, dataUrl);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    };
})();
