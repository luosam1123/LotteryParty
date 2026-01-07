
import { Participant } from './types';

const departments = ['Windows Client', 'Mac Client', 'VDI Team', 'Mobile Core', 'UI Framework', 'Media Engine'];

export const generateMockParticipants = (count: number): Participant[] => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `webex-user-${i + 1000}`,
    name: [
      'Alex', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Jamie', 'Skyler', 'Riley', 'Quinn', 'Avery',
      'Chris', 'Sam', 'Robin', 'Pat', 'Drew', 'Terry', 'Dana', 'Kelly', 'Kim', 'Lee'
    ][Math.floor(Math.random() * 20)] + ' ' + 
    ['Chen', 'Wang', 'Li', 'Zhang', 'Liu', 'Yang', 'Huang', 'Zhao', 'Wu', 'Zhou'][Math.floor(Math.random() * 10)],
    avatar: `https://picsum.photos/seed/${i + 123}/200`,
    department: departments[Math.floor(Math.random() * departments.length)],
    email: `user${i + 1000}@webex.com`
  }));
};
