
import React from 'react';
import { Utensils, Mic2, Camera } from 'lucide-react';
import { useAdmin, EditableField, EditableImage } from '../AdminContext';

const Actions: React.FC = () => {
  const { data, updateData } = useAdmin();

  const updateActions = (field: string, value: string) => {
      updateData({ actions: { ...data.actions, [field]: value } });
  };

  return (
    <div className="min-h-screen bg-star-dark py-20 px-6">
       <div className="container mx-auto max-w-4xl">
          <h1 className="text-5xl font-serif font-bold text-white mb-16 text-center">
             <span className="border-b-4 border-star-red pb-2">红色活动</span> Actions
          </h1>

          {/* Thursday Meal */}
          <div className="relative bg-slate-900 border border-slate-800 overflow-hidden mb-20 group">
             <div className="absolute top-0 left-0 w-2 h-full bg-star-gold"></div>
             <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="h-64 md:h-auto overflow-hidden relative">
                   <EditableImage 
                        src={data.actions.mealImg} 
                        alt="Solidarity Meal" 
                        onSave={(val) => updateActions('mealImg', val)}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter grayscale group-hover:grayscale-0"
                   />
                </div>
                <div className="p-8 flex flex-col justify-center">
                   <div className="flex items-center space-x-2 text-star-gold mb-2">
                      <Utensils size={20}/>
                      <span className="font-mono font-bold uppercase">Every Thursday</span>
                   </div>
                   <h2 className="text-3xl font-bold text-white mb-4">
                       <EditableField value={data.actions.mealTitle} onSave={(val) => updateActions('mealTitle', val)} />
                   </h2>
                   <h3 className="text-xl text-slate-400 font-serif italic mb-6">
                       <EditableField value={data.actions.mealQuote} onSave={(val) => updateActions('mealQuote', val)} />
                   </h3>
                   <div className="text-slate-400 text-sm leading-relaxed mb-6">
                      <EditableField value={data.actions.mealDesc} multiline onSave={(val) => updateActions('mealDesc', val)} />
                   </div>
                   <button className="self-start px-6 py-2 border border-slate-600 hover:border-star-gold hover:text-star-gold transition-colors text-sm uppercase tracking-wider">
                      查看照片墙
                   </button>
                </div>
             </div>
          </div>

          {/* Saturday Heritage */}
          <div className="relative bg-slate-900 border border-slate-800 overflow-hidden mb-20 group">
             <div className="absolute top-0 right-0 w-2 h-full bg-star-red"></div>
             <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-8 flex flex-col justify-center order-2 md:order-1 text-right md:text-right">
                   <div className="flex items-center justify-end space-x-2 text-star-red mb-2">
                      <span className="font-mono font-bold uppercase">Every Saturday</span>
                      <Mic2 size={20}/>
                   </div>
                   <h2 className="text-3xl font-bold text-white mb-4">
                       <EditableField value={data.actions.heritageTitle} onSave={(val) => updateActions('heritageTitle', val)} />
                   </h2>
                   <h3 className="text-xl text-slate-400 font-serif italic mb-6">
                       <EditableField value={data.actions.heritageQuote} onSave={(val) => updateActions('heritageQuote', val)} />
                   </h3>
                   <ul className="text-slate-400 text-sm leading-relaxed mb-6 space-y-2 inline-block text-right w-full">
                      <li>
                          <EditableField value={data.actions.heritageDesc1} onSave={(val) => updateActions('heritageDesc1', val)} className="w-full text-right"/>
                      </li>
                      <li>
                          <EditableField value={data.actions.heritageDesc2} onSave={(val) => updateActions('heritageDesc2', val)} className="w-full text-right"/>
                      </li>
                   </ul>
                   <div className="flex justify-end">
                    <button className="px-6 py-2 bg-star-red text-white hover:bg-red-700 transition-colors text-sm uppercase tracking-wider">
                        预约直播
                    </button>
                   </div>
                </div>
                <div className="h-64 md:h-auto overflow-hidden order-1 md:order-2 relative">
                   <EditableImage 
                        src={data.actions.heritageImg} 
                        alt="Heritage Night" 
                        onSave={(val) => updateActions('heritageImg', val)}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 filter sepia group-hover:sepia-0"
                    />
                </div>
             </div>
          </div>

          {/* Quote */}
          <div className="text-center py-10">
             <p className="text-2xl font-serif text-star-gold">
                 <EditableField value={data.actions.finalQuote} onSave={(val) => updateActions('finalQuote', val)} />
             </p>
          </div>
       </div>
    </div>
  );
};

export default Actions;
