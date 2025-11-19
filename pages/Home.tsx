
import React from 'react';
import { BookOpen, Activity, Heart, ShoppingCart } from 'lucide-react';
import { useAdmin, EditableField, EditableImage } from '../AdminContext';

interface HomeProps {
  onBookClick: () => void;
}

const StatCard: React.FC<{ label: string; value: string; icon: React.ElementType; delay: string; onSave: (val: string) => void }> = ({ label, value, icon: Icon, delay, onSave }) => (
  <div className={`bg-slate-900/80 border border-star-gold/20 p-6 backdrop-blur-sm hover:border-star-red/50 transition-all duration-500 group animate-fade-in-up`} style={{ animationDelay: delay }}>
    <div className="flex justify-between items-start mb-4">
      <Icon className="text-slate-600 group-hover:text-star-gold transition-colors" size={24} />
      <span className="text-xs font-mono text-star-red uppercase tracking-wider">Live Data</span>
    </div>
    <div className="text-4xl font-bold text-slate-100 mb-1 font-mono group-hover:text-star-gold transition-colors">
        <EditableField value={value} onSave={onSave} />
    </div>
    <div className="text-sm text-slate-400">{label}</div>
  </div>
);

const Home: React.FC<HomeProps> = ({ onBookClick }) => {
  const { data, updateData } = useAdmin();

  const updateHome = (field: string, value: string) => {
      updateData({ home: { ...data.home, [field]: value } });
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[90vh] w-full overflow-hidden flex items-center justify-center">
        {/* Simulated Video Background */}
        <div className="absolute inset-0 z-0">
          <EditableImage 
            src={data.home.heroBg} 
            onSave={(val) => updateHome('heroBg', val)}
            className="w-full h-full object-cover opacity-40 scale-105 animate-pulse-slow"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-star-dark via-star-dark/60 to-transparent pointer-events-none"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')] opacity-30 pointer-events-none"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <div className="mb-6 animate-fade-in-down">
            <span className="inline-block py-1 px-3 border border-star-red/50 text-star-red text-xs tracking-[0.3em] uppercase bg-black/50 backdrop-blur-md">
              Stars Guild • Est. 2024
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight tracking-wide drop-shadow-xl">
            <span className="block mb-2">
                <EditableField value={data.home.heroSlogan1} onSave={(val) => updateHome('heroSlogan1', val)} />
            </span>
            <span className="block text-star-gold/90">
                <EditableField value={data.home.heroSlogan2} onSave={(val) => updateHome('heroSlogan2', val)} />
            </span>
          </h1>
          
          <div className="text-lg md:text-xl text-slate-300 mb-10 font-light tracking-wide border-l-4 border-star-red pl-4 mx-auto inline-block text-left bg-black/30 p-4">
             <EditableField value={data.home.heroSubSlogan} onSave={(val) => updateHome('heroSubSlogan', val)} />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up">
            <button className="px-8 py-4 bg-star-red hover:bg-red-700 text-white font-bold tracking-wider uppercase transition-all duration-300 shadow-[0_0_20px_rgba(185,28,28,0.4)] hover:shadow-[0_0_30px_rgba(185,28,28,0.6)] clip-path-slant">
              入会申请
            </button>
            <button className="px-8 py-4 bg-transparent border border-star-red text-star-red hover:bg-star-red/10 font-bold tracking-wider uppercase transition-all duration-300 clip-path-slant">
              委托发布
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-slate-500">
          <div className="w-6 h-10 border-2 border-slate-500 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-slate-500 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-slate-950 relative border-t border-star-gold/10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
               <h2 className="text-3xl font-serif font-bold text-star-gold border-l-4 border-star-red pl-4">
                   <EditableField value={data.home.missionTitle} onSave={(val) => updateHome('missionTitle', val)} />
               </h2>
               <div className="text-slate-300 text-lg leading-relaxed text-justify font-light">
                 <EditableField value={data.home.missionText} multiline onSave={(val) => updateHome('missionText', val)} className="w-full" />
                 <br/><br/>
                 <span className="text-star-red font-bold text-xl">
                    <EditableField value={data.home.missionHighlight} onSave={(val) => updateHome('missionHighlight', val)} />
                 </span>
               </div>
               
               {/* Hidden Easter Egg Trigger */}
               <div className="pt-4 opacity-30 hover:opacity-100 transition-opacity cursor-pointer w-fit" onClick={onBookClick}>
                  <div className="flex items-center space-x-2 text-sm text-star-gold">
                    <BookOpen size={16}/>
                    <span>阅读角</span>
                  </div>
               </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <StatCard 
                    label="已攻略地下城" 
                    value={data.stats.dungeons} 
                    icon={Activity} 
                    delay="0ms" 
                    onSave={(val) => updateData({ stats: { ...data.stats, dungeons: val } })}
               />
               <StatCard 
                    label="已援助困难家庭" 
                    value={data.stats.families} 
                    icon={Heart} 
                    delay="100ms"
                    onSave={(val) => updateData({ stats: { ...data.stats, families: val } })}
               />
               <StatCard 
                    label="助农产品销售额 (万元)" 
                    value={data.stats.sales} 
                    icon={ShoppingCart} 
                    delay="200ms"
                    onSave={(val) => updateData({ stats: { ...data.stats, sales: val } })}
               />
               <div className="bg-star-red/10 border border-star-red/30 p-6 flex items-center justify-center">
                  <p className="text-star-red font-serif font-bold text-xl text-center">利润 100%<br/>回流农户</p>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
