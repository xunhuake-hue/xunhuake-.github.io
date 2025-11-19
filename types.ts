export enum MemberRank {
  A = 'A',
  B = 'B',
  C = 'C',
}

export interface Member {
  id: string;
  name: string;
  alias: string;
  rank: MemberRank;
  role: string;
  position: string;
  motto: string;
  imageUrl: string;
  special?: boolean; // For layout highlighting
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'Agricultural' | 'Merch';
  description: string;
  imageUrl: string;
  origin?: string; // For agricultural products
}

export interface Event {
  id: string;
  title: string;
  day: string;
  description: string;
  imageUrl: string;
  type: 'Food' | 'Culture';
}
