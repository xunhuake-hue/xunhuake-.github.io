
import React, { useState } from 'react';
import { MapPin, Clock, Phone, Coffee } from 'lucide-react';
import { useAdmin, EditableField, EditableImage } from '../AdminContext';

const Base: React.FC = () => {
  const { data, updateData } = useAdmin();
  const [cursorVariant, setCursorVariant] = useState('default');

  const updateBase = (field: string, value: string) => {
      updateData({ base: { ...data.base, [field]: value } });
  };

  return (
    <div className="min-h-screen bg-star-dark relative overflow-hidden">
       {/* Background atmosphere */}
       <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1550100136-e0721016d6b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center"></div>
       <div className="absolute inset-0 z-0 bg-gradient-to-b from-star-dark via-star-dark/90 to-star-dark"></div>

       <div className="container mx-auto px-6 relative z-10 py-20">
          <div className="max-w-5xl mx-auto bg-black/60 backdrop-blur-lg border border-star-gold/30 p-8 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                
                {/* Left: Info */}
                <div>
                   <h1 className="text-4xl font-serif font-bold text-white mb-2">群星俱乐部</h1>
                   <h2 className="text-star-gold font-mono tracking-widest text-sm mb-8">STARS CLUB • HAIKOU</h2>
                   
                   <div className="space-y-6 text-slate-300">
                      <div className="flex items-start space-x-4">
                         <MapPin className="text-star-red mt-1" />
                         <div>
                            <p className="font-bold text-white">地址 Address</p>
                            <p><EditableField value={data.base.address} onSave={(val) => updateBase('address', val)} /></p>
                            <p className="text-xs text-slate-500 mt-1">
                                <EditableField value={data.base.addressNote} onSave={(val) => updateBase('addressNote', val)} />
                            </p>
                         </div>
                      </div>
                      
                      <div className="flex items-start space-x-4">
                         <Clock className="text-star-red mt-1" />
                         <div>
                            <p className="font-bold text-white">营业时间 Hours</p>
                            <p><EditableField value={data.base.hours} onSave={(val) => updateBase('hours', val)} /></p>
                            <p className="text-xs text-slate-500 mt-1">
                                <EditableField value={data.base.hoursNote} onSave={(val) => updateBase('hoursNote', val)} />
                            </p>
                         </div>
                      </div>

                      <div className="border-t border-white/10 pt-6 mt-8">
                         <div className="flex items-center gap-4">
                            <div className="w-16 h-16 flex-shrink-0">
                                <EditableImage 
                                    src={data.base.managerImg} 
                                    alt="Manager" 
                                    onSave={(val) => updateBase('managerImg', val)}
                                    className="w-full h-full rounded-full border-2 border-star-gold/50 grayscale hover:grayscale-0 transition-all object-cover"
                                />
                            </div>
                            <div>
                               <p className="text-star-gold font-bold text-lg">
                                   <EditableField value={data.base.managerName} onSave={(val) => updateBase('managerName', val)} />
                               </p>
                               <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">
                                   <EditableField value={data.base.managerRole} onSave={(val) => updateBase('managerRole', val)} />
                               </p>
                               <p className="text-sm italic text-slate-300">
                                   <EditableField value={data.base.managerQuote} onSave={(val) => updateBase('managerQuote', val)} />
                               </p>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>

                {/* Right: Image/Vibe */}
                <div className="relative h-96 md:h-full min-h-[400px] border border-slate-700 p-2 rotate-2 hover:rotate-0 transition-transform duration-500 bg-slate-900">
                   <EditableImage 
                        src={data.base.vibeImg} 
                        alt="Bar Interior" 
                        onSave={(val) => updateBase('vibeImg', val)}
                        className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
                   />
                   <div className="absolute bottom-6 right-6 bg-black/80 px-4 py-2 border border-star-red text-star-red font-mono text-xs tracking-widest animate-pulse pointer-events-none">
                      OPEN
                   </div>
                </div>
             </div>
          </div>
          
          {/* Map Placeholder */}
          <div className="mt-20 max-w-5xl mx-auto border border-slate-800 h-64 bg-slate-900 flex items-center justify-center group cursor-pointer hover:bg-slate-800 transition-colors">
             <div className="text-center">
                <MapPin size={48} className="mx-auto text-slate-600 group-hover:text-star-red mb-4 transition-colors"/>
                <p className="text-slate-500 font-mono uppercase">Map Module Loading...</p>
                <p className="text-xs text-slate-700 mt-2">Click to open Navigation System</p>
             </div>
          </div>
       </div>
    </div>
  );
};

export default Base;
