
export interface Participant {
  id: string;
  name: string;
  avatar: string;
  department: string;
  email: string;
}

export interface Winner extends Participant {
  prizeTier: string;
  wonAt: number;
}

export enum AppView {
  LOTTERY = 'LOTTERY',
  PRIZES = 'PRIZES',
  DIRECTORY = 'DIRECTORY',
  HISTORY = 'HISTORY'
}

export enum PrizeTier {
  GRAND = '特等奖',
  FIRST = '一等奖',
  SECOND = '二等奖',
  THIRD = '三等奖',
  LUCKY = '阳光奖'
}

export interface PrizeInfo {
  tier: PrizeTier;
  item: string;
  total: number;
  description: string;
  icon: string;
}

export const PRIZE_CONFIG: Record<PrizeTier, PrizeInfo> = {
  [PrizeTier.GRAND]: {
    tier: PrizeTier.GRAND,
    item: 'iPhone 17 Pro',
    total: 1,
    description: 'The ultimate flagship smartphone.',
    icon: '📱'
  },
  [PrizeTier.FIRST]: {
    tier: PrizeTier.FIRST,
    item: 'Apple Watch',
    total: 3,
    description: 'Next-gen wearable tech.',
    icon: '⌚'
  },
  [PrizeTier.SECOND]: {
    tier: PrizeTier.SECOND,
    item: '1000元 京东卡',
    total: 10,
    description: 'Shopping spree on JD.com.',
    icon: '💳'
  },
  [PrizeTier.THIRD]: {
    tier: PrizeTier.THIRD,
    item: '500元 京东卡',
    total: 20,
    description: 'Great for electronics and more.',
    icon: '💰'
  },
  [PrizeTier.LUCKY]: {
    tier: PrizeTier.LUCKY,
    item: '100元 京东卡',
    total: 50,
    description: 'Everyone loves a little extra.',
    icon: '🧧'
  }
};
