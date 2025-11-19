
import React from 'react';
import { Product } from '../types';
import { ShoppingCart, Gift, Tag } from 'lucide-react';
import { useAdmin, EditableField, EditableImage } from '../AdminContext';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { updateProduct, isEditMode } = useAdmin();

  return (
    <div className="bg-white text-slate-800 group overflow-hidden relative flex flex-col h-full border-b-4 border-star-red hover:shadow-2xl transition-shadow duration-300">
        <div className="relative h-64 overflow-hidden">
        <EditableImage 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            onSave={(val) => updateProduct(product.id, 'imageUrl', val)}
        />
        {product.category === 'Agricultural' && (
            <div className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 font-bold uppercase tracking-wide">
                助农产品
            </div>
        )}
        <div className="absolute bottom-0 right-0 bg-star-red text-white px-3 py-1 font-mono font-bold flex items-center">
            ¥ <EditableField value={product.price} onSave={(val) => updateProduct(product.id, 'price', Number(val))} className="bg-red-900 w-16 text-center"/>
        </div>
        </div>
        <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
            <h3 className="font-serif font-bold text-xl text-slate-900 group-hover:text-star-red transition-colors w-full">
                <EditableField value={product.name} onSave={(val) => updateProduct(product.id, 'name', val)} />
            </h3>
        </div>
        <div className="text-sm text-slate-600 mb-4 flex-grow font-light w-full">
            <EditableField value={product.description} multiline onSave={(val) => updateProduct(product.id, 'description', val)} className="bg-slate-100 text-slate-800 border-slate-300"/>
        </div>
        
        <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
            <span className="text-xs text-slate-400 flex items-center">
            {product.origin ? <><Tag size={12} className="mr-1"/> {product.origin}</> : <><Gift size={12} className="mr-1"/> 群星周边</>}
            </span>
            <button className="text-star-red border border-star-red px-4 py-1 text-sm font-bold hover:bg-star-red hover:text-white transition-colors flex items-center">
            <ShoppingCart size={14} className="mr-2"/> 购买
            </button>
        </div>
        </div>
    </div>
  );
};

const Selection: React.FC = () => {
  const { data } = useAdmin();

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 py-20 px-6">
       <div className="container mx-auto">
         <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b-2 border-star-red/20 pb-6">
            <div>
              <h1 className="text-4xl font-serif font-bold text-slate-900">群星甄选 <span className="text-star-red text-2xl">Stars Selection</span></h1>
              <p className="text-slate-500 mt-2">连接土地与餐桌，让每一分钱都温暖劳动者。</p>
            </div>
            <div className="bg-star-gold/10 border border-star-gold/50 p-3 rounded-sm mt-4 md:mt-0">
               <p className="text-star-gold-dim text-sm font-bold">
                 ⚠️ 承诺：扣除物流成本后，利润 100% 归还农户。
               </p>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.products.map(p => <ProductCard key={p.id} product={p} />)}
         </div>
         
         <div className="mt-16 bg-white p-8 border-l-8 border-star-gold shadow-lg">
            <div className="flex items-center gap-4">
               <div className="bg-star-red text-white w-12 h-12 flex items-center justify-center rounded-full font-bold text-xl flex-shrink-0">
                  赠
               </div>
               <div>
                  <h4 className="font-bold text-lg">每单附赠“群星纪念卡”</h4>
                  <p className="text-slate-500 text-sm">随机印有“共和七星”Q版形象及鼓励语。集齐7张可兑换线下俱乐部特调饮品一杯。</p>
               </div>
            </div>
         </div>
       </div>
    </div>
  );
};

export default Selection;
