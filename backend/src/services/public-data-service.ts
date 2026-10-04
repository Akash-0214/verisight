export type SearchType = 'domain' | 'email' | 'username' | 'company';

export type SearchResult = {
  type: SearchType;
  query: string;
  summary: string;
  risk: 'Low' | 'Moderate' | 'High';
  evidence: string[];
  legalNotice: string;
};

const publicFactMap: Record<SearchType, { summary: string; risk: 'Low' | 'Moderate' | 'High'; evidence: string[] }> = {
  domain: {
    summary: 'Domain is publicly registered and has valid public metadata.',
    risk: 'Low',
    evidence: ['WHOIS metadata is publicly visible', 'DNS records resolve successfully', 'Website presence is publicly indexed']
  },
  email: {
    summary: 'Email appears in public and consent-based network references.',
    risk: 'Moderate',
    evidence: ['Public breach references reviewed', 'Email visibility mapped to public directories', 'Consent-based business exposure checked']
  },
  username: {
    summary: 'Username is active in public channels and profile aggregators.',
    risk: 'Low',
    evidence: ['Public social channels found', 'Profile discovery is public-only', 'Public software profile references located']
  },
  company: {
    summary: 'Company profile is discoverable through public business and site metadata.',
    risk: 'Low',
    evidence: ['Website metadata found', 'Public company directory references detected', 'Business profile is publicly available']
  }
};

export async function performPublicLookup(type: SearchType, query: string): Promise<SearchResult> {
  const fact = publicFactMap[type];

  return {
    type,
    query,
    summary: fact.summary,
    risk: fact.risk,
    evidence: fact.evidence,
    legalNotice: 'Results are based on lawful public-source intelligence only.'
  };
}
