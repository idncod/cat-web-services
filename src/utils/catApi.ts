import { fallbackBreeds } from '@/data/mockData';
import type { BreedOption } from '@/types/cws';

const BREEDS_ENDPOINT = 'https://api.thecatapi.com/v1/breeds';
const IMAGE_ENDPOINT = 'https://api.thecatapi.com/v1/images/search';

export const fetchBreeds = async (): Promise<BreedOption[]> => {
  try {
    const response = await fetch(BREEDS_ENDPOINT);

    if (!response.ok) {
      throw new Error('Failed to fetch breeds');
    }

    const breeds = (await response.json()) as Array<{ id: string; name: string }>;

    return breeds
      .map((breed) => ({ id: breed.id, name: breed.name }))
      .sort((left, right) => left.name.localeCompare(right.name));
  } catch {
    return fallbackBreeds;
  }
};

export const fetchBreedAvatar = async (breedId: string) => {
  try {
    const response = await fetch(`${IMAGE_ENDPOINT}?limit=1&breed_ids=${breedId}`);

    if (!response.ok) {
      throw new Error('Failed to fetch breed avatar');
    }

    const payload = (await response.json()) as Array<{ url?: string }>;
    return payload[0]?.url ?? '';
  } catch {
    return '';
  }
};
