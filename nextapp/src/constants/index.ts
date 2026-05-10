import { World, WorldId } from '@/types/user';

export const WORLDS: World[] = [
  { id: 'wellness', color: '#5a8a5a', label: 'Wellness' },
  { id: 'entrepreneurship', color: '#e8c97a', label: 'Entrepreneurship' },
  { id: 'conscious_living', color: '#4a8a80', label: 'Conscious Living' },
  { id: 'creative_life', color: '#c46a6a', label: 'Creative Life' },
];

export const WORLD_COLORS: Record<WorldId, string> = {
  wellness: '#5a8a5a',
  entrepreneurship: '#e8c97a',
  conscious_living: '#4a8a80',
  creative_life: '#c46a6a',
};

export function getWorldById(id: WorldId): World | undefined {
  return WORLDS.find((w) => w.id === id);
}
