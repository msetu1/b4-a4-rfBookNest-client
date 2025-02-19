
// Define the types
export interface Address {
  country: string;
  district: string;
  streetAddress: string;
}

export interface SocialLinks {
  facebook?: string;
  linkedin?: string;
  github?: string;
}

export interface User {
  address?: Address;
  socialLinks?: SocialLinks;
}

export interface AdditionalInfoProps {
  user: User | null;  // The user can be null if there's no data
}
