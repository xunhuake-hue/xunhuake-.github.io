
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Member, MemberRank, Product } from './types';
import { Activity, Heart, ShoppingCart } from 'lucide-react';

// --- Initial Data ---

const INITIAL_MEMBERS: Member[] = [
  {
    id: '1',
    name: '杨彦坤',
    alias: '阿彪',
    rank: MemberRank.A,
    role: '公会总负责人',
    position: '战场哲人',
    motto: '物质决定意识，但拳头能开辟未来。',
    imageUrl: 'https://picsum.photos/seed/abiao/400/600',
    special: true,
  },
  {
    id: '2',
    name: '杨淑宜',
    alias: '穆桂英',
    rank: MemberRank.B,
    role: '演艺部部长',
    position: '敏捷主攻',
    motto: '人生如戏，但我不仅是角儿，更是执枪的人。',
    imageUrl: 'https://picsum.photos/seed/shuyi/400/600',
  },
  {
    id: '3',
    name: '薛伊璠',
    alias: '宝儿',
    rank: MemberRank.A,
    role: '总参谋长',
    position: '阵法宗师',
    motto: '秩序与守护，是这混乱世间最昂贵的奢侈品。',
    imageUrl: 'https://picsum.photos/seed/baoer/400/600',
  },
  {
    id: '4',
    name: '薛伊玙',
    alias: '勇士',
    rank: MemberRank.A,
    role: '安保部部长',
    position: '重装坦克',
    motto: '只有弱者才恃强凌弱，强者只会保护身后的人。',
    imageUrl: 'https://picsum.photos/seed/warrior/400/600',
  },
  {
    id: '5',
    name: '冼凯文',
    alias: '阿丽',
    rank: MemberRank.C,
    role: '首席装备师',
    position: '造物主',
    motto: '万物皆有裂痕，那正是光（和我的以太）照进来的地方。',
    imageUrl: 'https://picsum.photos/seed/ali/400/600',
  },
  {
    id: '6',
    name: '陈雷',
    alias: '阿雷',
    rank: MemberRank.C,
    role: '情报部部长',
    position: '战场上帝视角',
    motto: '代码和音符一样，都不允许有逻辑上的冗余。',
    imageUrl: 'https://picsum.photos/seed/alei/400/600',
  },
  {
    id: '7',
    name: '雪莲',
    alias: '小太阳',
    rank: MemberRank.B,
    role: '公关部部长',
    position: '远程狙击',
    motto: '爱笑的人运气不会差，但我通常不靠运气，靠准头。',
    imageUrl: 'https://picsum.photos/seed/sun/400/600',
  },
];

const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: '徐闻“菠萝的海”金钻凤梨',
    price: 58,
    category: 'Agricultural',
    description: '每一口都是北纬20度的阳光。甜度18+，无需泡盐水。',
    imageUrl: 'https://picsum.photos/seed/pineapple/400/400',
    origin: '徐闻',
  },
  {
    id: 'p2',
    name: '廉江红橙',
    price: 88,
    category: 'Agricultural',
    description: '皮薄肉红，汁水丰盈。国宴佳果，助农优选。',
    imageUrl: 'https://picsum.photos/seed/orange/400/400',
    origin: '廉江',
  },
  {
    id: 'p3',
    name: '阿彪同款“辩证法”增肌粉',
    price: 299,
    category: 'Merch',
    description: '附赠《矛盾论》袖珍本。让肌肉与思想同步增长。',
    imageUrl: 'https://picsum.photos/seed/protein/400/400',
  },
  {
    id: 'p4',
    name: '穆桂英·手绘雷剧脸谱挂件',
    price: 45,
    category: 'Merch',
    description: '杨淑宜副会长亲手绘制，每一笔都有刀马旦的精气神。',
    imageUrl: 'https://picsum.photos/seed/mask/400/400',
  },
  {
    id: 'p5',
    name: '遂溪火龙果',
    price: 60,
    category: 'Agricultural',
    description: '夜灯照耀下的红肉火龙果，富含花青素。',
    imageUrl: 'https://picsum.photos/seed/dragonfruit/400/400',
    origin: '遂溪',
  },
  {
    id: 'p6',
    name: '阿丽手作·机械八音盒',
    price: 360,
    category: 'Merch',
    description: '齿轮与旋律的浪漫结合。限量发售。',
    imageUrl: 'https://picsum.photos/seed/musicbox/400/400',
  },
];

const INITIAL_STATS = {
    dungeons: "042",
    families: "1,208",
    sales: "582.6"
};

const INITIAL_HOME_DATA = {
    heroBg: "https://picsum.photos/1920/1080?grayscale&blur=2",
    heroSlogan1: "做最理想的现实主义者",
    heroSlogan2: "做最现实的理想主义者",
    heroSubSlogan: "潮汐时代的赤色防线 · 人民的公会",
    missionTitle: "公会宗旨",
    missionText: "在这个超凡力量觉醒的时代，力量不应成为特权的通行证，而应是守护弱者的盾牌。\n\n我们行走在田间地头，也穿梭于霓虹都市。我们是猎人，也是农夫；是战士，也是戏子。",
    missionHighlight: "“群星聚是一团火，散是满天星。”"
};

const INITIAL_ACTIONS_DATA = {
    mealTitle: "劳动者饭局",
    mealQuote: "\"甚至不需要一句谢谢，只需要你吃饱。\"",
    mealDesc: "面向自食其力的一线劳动者。没有领导讲话，没有摆拍仪式，只有热气腾腾的自助餐和朋友间的碰杯。",
    mealImg: "https://picsum.photos/seed/meal/800/600",
    
    heritageTitle: "非遗之夜 & 助农直播",
    heritageQuote: "\"当电音遇上雷剧，当代码遇上泥土。\"",
    heritageDesc1: "19:00 - 群星戏班：赛博雷剧公演",
    heritageDesc2: "20:30 - 阿雷 x 雪莲：特产带货直播",
    heritageImg: "https://picsum.photos/seed/opera/800/600",

    finalQuote: "\"承担，是我们对这片土地最深情的告白。\""
};

const INITIAL_BASE_DATA = {
    address: "海南省海口市龙华区骑楼老街XX号",
    addressNote: "（那栋挂着红色霓虹星牌的南洋骑楼）",
    hours: "18:00 - 02:00 (次日)",
    hoursNote: "周四公休（全员去办饭局了）",
    managerName: "林鱼鱼",
    managerRole: "主理人 / 普通人",
    managerQuote: "“这里没有等级，只有朋友。累了就进来喝杯东西吧。”",
    managerImg: "https://picsum.photos/seed/girl/100/100",
    vibeImg: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
};

// --- Types ---

interface AppData {
  members: Member[];
  products: Product[];
  stats: typeof INITIAL_STATS;
  home: typeof INITIAL_HOME_DATA;
  actions: typeof INITIAL_ACTIONS_DATA;
  base: typeof INITIAL_BASE_DATA;
}

interface AdminContextType {
  isAuthenticated: boolean;
  isEditMode: boolean;
  data: AppData;
  login: (password: string) => boolean;
  logout: () => void;
  toggleEditMode: () => void;
  updateData: (newData: Partial<AppData>) => void;
  updateMember: (id: string, field: keyof Member, value: any) => void;
  updateProduct: (id: string, field: keyof Product, value: any) => void;
  resetData: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

// --- Provider ---

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [data, setData] = useState<AppData>({
    members: INITIAL_MEMBERS,
    products: INITIAL_PRODUCTS,
    stats: INITIAL_STATS,
    home: INITIAL_HOME_DATA,
    actions: INITIAL_ACTIONS_DATA,
    base: INITIAL_BASE_DATA
  });

  // Load data from local storage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('stars_guild_data');
    if (savedData) {
      try {
        // Merge saved data with initial data to handle new fields if schema changes
        const parsed = JSON.parse(savedData);
        setData(prev => ({
            ...prev,
            ...parsed,
            home: { ...INITIAL_HOME_DATA, ...(parsed.home || {}) },
            actions: { ...INITIAL_ACTIONS_DATA, ...(parsed.actions || {}) },
            base: { ...INITIAL_BASE_DATA, ...(parsed.base || {}) }
        }));
      } catch (e) {
        console.error("Failed to parse saved data");
      }
    }
    
    const savedAuth = sessionStorage.getItem('stars_auth');
    if (savedAuth === 'true') {
        setIsAuthenticated(true);
    }
  }, []);

  // Save data to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('stars_guild_data', JSON.stringify(data));
  }, [data]);

  const login = (password: string) => {
    if (password === 'stars') { // Hardcoded simple password
      setIsAuthenticated(true);
      setIsEditMode(true);
      sessionStorage.setItem('stars_auth', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsEditMode(false);
    sessionStorage.removeItem('stars_auth');
  };

  const toggleEditMode = () => setIsEditMode(!isEditMode);

  const updateData = (newData: Partial<AppData>) => {
    setData(prev => ({ ...prev, ...newData }));
  };

  const updateMember = (id: string, field: keyof Member, value: any) => {
      setData(prev => ({
          ...prev,
          members: prev.members.map(m => m.id === id ? { ...m, [field]: value } : m)
      }));
  };

  const updateProduct = (id: string, field: keyof Product, value: any) => {
      setData(prev => ({
          ...prev,
          products: prev.products.map(p => p.id === id ? { ...p, [field]: value } : p)
      }));
  };

  const resetData = () => {
      if(confirm("确定重置所有数据到初始状态吗？此操作不可逆。")) {
        setData({
            members: INITIAL_MEMBERS,
            products: INITIAL_PRODUCTS,
            stats: INITIAL_STATS,
            home: INITIAL_HOME_DATA,
            actions: INITIAL_ACTIONS_DATA,
            base: INITIAL_BASE_DATA
        });
      }
  };

  return (
    <AdminContext.Provider value={{ 
        isAuthenticated, 
        isEditMode, 
        data, 
        login, 
        logout, 
        toggleEditMode, 
        updateData,
        updateMember,
        updateProduct,
        resetData
    }}>
      {children}
    </AdminContext.Provider>
  );
};

// --- Helper Component for Editable Fields ---

interface EditableProps {
    value: string | number;
    onSave: (val: string) => void;
    className?: string;
    multiline?: boolean;
    label?: string; // For placeholder
}

export const EditableField: React.FC<EditableProps> = ({ value, onSave, className = "", multiline = false, label }) => {
    const { isEditMode } = useAdmin();
    const [tempValue, setTempValue] = useState(String(value));

    useEffect(() => {
        setTempValue(String(value));
    }, [value]);

    if (!isEditMode) {
        return <span className={`${multiline ? 'whitespace-pre-wrap' : ''} ${className}`}>{value}</span>;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const val = e.target.value;
        setTempValue(val);
        onSave(val);
    };

    if (multiline) {
        return (
            <textarea 
                value={tempValue}
                onChange={handleChange}
                className={`bg-slate-800 border border-star-gold/50 text-white p-1 w-full rounded focus:outline-none focus:border-star-red min-h-[100px] ${className}`}
                placeholder={label}
            />
        );
    }

    return (
        <input 
            type="text" 
            value={tempValue}
            onChange={handleChange}
            className={`bg-slate-800 border border-star-gold/50 text-white px-1 rounded focus:outline-none focus:border-star-red min-w-[50px] ${className}`}
            placeholder={label}
        />
    );
};

export const EditableImage: React.FC<{ src: string, onSave: (val: string) => void, className?: string, alt?: string }> = ({ src, onSave, className = "", alt = "" }) => {
    const { isEditMode } = useAdmin();
    
    if (!isEditMode) {
        return <img src={src} alt={alt} className={className} />;
    }

    // In Edit Mode:
    // 1. We do NOT apply the passed `className` to the wrapper div to avoid double transforms/filters.
    // 2. We force the wrapper to w-full h-full to fill the parent container (which is usually sized).
    // 3. We apply `className` to the img to preserve visual style (grayscale, cover, etc).
    // 4. We force opacity-50 on img to indicate edit mode.
    // 5. INPUT POSITION: Moved to absolute top-2 left-2 right-2 to avoid obstructing bottom text content.
    return (
        <div className="relative w-full h-full overflow-hidden group bg-slate-900">
            <img src={src} alt={alt} className={`${className} w-full h-full opacity-50`} />
            <div className="absolute top-2 left-2 right-2 z-[60]">
                <input 
                    type="text" 
                    value={src} 
                    onChange={(e) => onSave(e.target.value)}
                    className="bg-black/80 text-white text-[10px] p-2 border border-star-red w-full rounded shadow-lg focus:outline-none focus:shadow-[0_0_10px_rgba(185,28,28,0.4)] hover:bg-black transition-colors"
                    placeholder="Image URL..."
                    onClick={(e) => e.stopPropagation()}
                />
            </div>
        </div>
    );
}
