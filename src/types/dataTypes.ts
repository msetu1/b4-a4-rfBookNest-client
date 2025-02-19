export interface User {
  name: string;
  email: string;
  imageUrl: string;
  phone?: string; // Optional
  gender?: string; // Optional
  // Add any other properties that your user object has
}


export type TBook = {
  authorEmail: string;
  authorName: string;
  category: string;
  description: string;
  imageUrl: string;
  isAvailable: boolean;
  isDeleted: boolean;
  numberOfBooks: number;
  price: string;
  bookDiscount:number;
  title: string;
  __v: number;
  _id: string;
};

export interface BookData {
  numberOfBooks: number;
  bookDiscount: number;
  price: number;
  title: string;
  category: string;   // Add other properties like title if needed
  // Any additional properties you might need
}

export interface AccountSettingsProps {
  user: {
    role?: string;
    accountSettings?: {
      status?: string;
    };
  }|null;
}

// interface Address {
//   country?: string;
//   district?: string;
//   streetAddress?: string;
// }

// interface SocialLinks {
//   facebook?: string;
//   linkedin?: string;
//   github?: string;
// }

// export interface AdditionalSettingsProps {
//   user: {
//     address?: Address;
//     socialLinks?: SocialLinks;
//   }| null;
// }

export interface AllProductBannerProps {
  setPriceFilter: React.Dispatch<React.SetStateAction<string>>; // For updating price filter state
  priceFilter: string; // Current price filter value
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>; // For updating search term state
  searchTerm: string; // Current search term value
}

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

export interface TUser {
  name: string;
  email: string;
  imageUrl: string;
  address?: Address;
  socialLinks?: SocialLinks;
}
