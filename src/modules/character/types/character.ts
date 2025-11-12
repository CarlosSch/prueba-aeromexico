export type CharacterStatus = 'Alive' | 'Dead' | 'Unknown';

export type Location = {
  name: string;
  url: string;
};

export type Character = {
  id: number;
  name: string;
  status: CharacterStatus;
  species: string;
  type: string;
  gender: 'Female' | 'Male' | 'unknown';
  origin: Location;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: string;
};

export type CharacterState = {
  items: Character[];
  isLoading: boolean;
  error?: string;
};
