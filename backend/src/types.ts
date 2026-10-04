export type SearchType = 'domain' | 'email' | 'username' | 'company';

export type SearchResult = {
  type: SearchType;
  query: string;
  summary: string;
  risk: 'Low' | 'Moderate' | 'High';
  evidence: string[];
};

export type User = {
  id: string;
  email: string;
  name: string;
  createdAt: string;
};
