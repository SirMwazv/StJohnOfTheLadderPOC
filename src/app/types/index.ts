export interface Service {
  serviceName: string;
  day: string;
  time: string;
}

export interface ChurchInfo {
  name: string;
  description: string;
  services: Service[];
  mapUrl?: string;
  address?: string;
  phone?: string;
  email?: string;
}

export interface Event {
  slug: string;
  title: string;
  date: string;
  description?: string;
  featuredImage?: string;
}

export interface Announcement {
  slug: string;
  title: string;
  date: string;
  content: string;
}

export interface MarkdownContent {
  data: {
    [key: string]: string | number | boolean;
  };
  content: string;
}