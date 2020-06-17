export interface MetaDataJson {
  name: string;
  description: string;
  image: string;
  properties?: any;
  attributes?: Array<{
    display_type?: string;
    trait_type: string;
    value: string | number;
  }>;
}

export enum OpenseaDisplayType {
  NONE = 'empty',
  BoostPercenage = 'boost_percentage',
  BoostNumber = 'boost_number',
  Date = 'date'
}