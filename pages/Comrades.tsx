
import React from 'react';
import { Member } from '../types';
import { Shield, Zap } from 'lucide-react';
import { useAdmin, EditableField, EditableImage } from '../AdminContext';

const MemberCard: React.FC<{ member: Member }> = ({ member }) => {
  const { updateMember, isEditMode } = useAdmin();

  return (
    <div className={`group relative w-full ${isEditMode ? 'h-[500px]' : 'h-[450px]'} bg-slate-900 border border-slate-800 overflow-hidden hover:border-star-gold transition-all duration-500 shadow-lg hover:shadow-[0_0_20px_rgba(245,158,11,0.3)]`}>
      {/* Background Image */}
      <div className="absolute inset-0 h-full w-full">
           <EditableImage 
                src={member.imageUrl} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
                onSave={(val) => updateMember(member.id, 'imageUrl', val)}
           />
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-500 pointer-events-none"></div>

      {/* Rank Badge */}
      <div className="absolute top-4 right-4 w-10 h-10 border-2 border-star-gold flex items-center justify-center transform rotate-45 bg-black/50 backdrop-blur-md z-20">
        <span className="text-star-gold font-bold font-mono transform -rotate-45 text-lg">
            <EditableField value={member.rank} onSave={(val) => updateMember(member.id, 'rank', val)} className="bg-transparent w-full text-center"/>
        </span>
      </div>

      {/* Content */}
      <div className={`absolute bottom-0 left-0 w-full p-6 z-20 ${isEditMode ? '' : 'transform translate-y-14 group-hover:translate-y-0'} transition-transform duration-500 ease-out`}>
        <div className="border-l-4 border-star-red pl-4 mb-4">
          <h3 className="text-3xl font-serif font-bold text-white mb-1">
              <EditableField value={member.alias} onSave={(val) => updateMember(member.id, 'alias', val)} />
          </h3>
          <div className="text-sm text-slate-400 font-mono uppercase tracking-widest">
              <EditableField value={member.name} onSave={(val) => updateMember(member.id, 'name', val)} />
          </div>
        </div>
        
        <div className={`space-y-3 ${isEditMode ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity duration-500 delay-100`}>
          <div className="flex items-center space-x-2 text-star-gold text-sm">
             <Shield size={14} />
             <EditableField value={member.role} onSave={(val) => updateMember(member.id, 'role', val)} />
          </div>
          <div className="flex items-center space-x-2 text-star-red text-sm font-bold">
             <Zap size={14} />
             <EditableField value={member.position} onSave={(val) => updateMember(member.id, 'position', val)} />
          </div>
          <div className="pt-4 border-t border-white/10">
            <p className="text-slate-300 text-xs italic font-serif flex flex-col">
                <span className="opacity-50 mr-1">Motto:</span>
                <EditableField value={member.motto} multiline onSave={(val) => updateMember(member.id, 'motto', val)} />
            </p>
          </div>
        </div>
      </div>
      
      {/* Decorative tech lines */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
         <div className="absolute top-10 left-0 w-1 h-20 bg-star-red opacity-0 group-hover:opacity-100 transition-opacity"></div>
         <div className="absolute bottom-10 right-0 w-1 h-20 bg-star-gold opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>
    </div>
  );
};

const Comrades: React.FC = () => {
  const { data } = useAdmin();

  return (
    <div className="min-h-screen py-20 px-6 bg-star-dark">
      <div className="container mx-auto">
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-100 mb-4">
            <span className="text-star-red">群星</span>闪耀时
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto font-light">
            他们是凡人，也是英雄。在潮汐中站立，在烟火中前行。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Leaders take prominent spots */}
          {data.members.map((member) => (
             <div key={member.id} className={member.special ? "lg:col-span-2" : ""}>
               <MemberCard member={member} />
             </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Comrades;
