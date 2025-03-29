// lib/markdown.js
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import type { ChurchInfo, Event, Announcement } from '../types';
import { Compatible } from 'vfile';

const contentDirectory = path.join(process.cwd(), 'content');

export function getChurchInfo(): ChurchInfo {
  const filePath = path.join(contentDirectory, 'churchInfo.md');
  
  // Return default values if file doesn't exist yet
  if (!fs.existsSync(filePath)) {
    return {
      name: 'Orthodox Church',
      description: 'Welcome to our church',
      address: '123 Main St',
      services: []
    };
  }
  
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data } = matter(fileContents);
  return {
    name: data.name || 'Orthodox Church',
    description: data.description || 'Welcome to our church',
    services: data.services || [],
    address: data.address || '123 Main St',
    phone: data.phone || '',
    email: data.email || '',
    mapUrl: data.mapUrl || ''
  } as ChurchInfo;
}

export function getAllEvents() {
  const eventsDirectory = path.join(contentDirectory, 'events');
  if (!fs.existsSync(eventsDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(eventsDirectory);
  
  const allEvents = fileNames.map(fileName => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(eventsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    return {
      content,
      ...(data as Event),
      slug
    };
  });
  
  // Sort events by date in ascending order (upcoming first)
  return allEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

export function getUpcomingEvents(count: number): Event[] {
  const events = getAllEvents();
  const now = new Date();
  
  return events
    .filter(event => new Date(event.date) >= now)
    .slice(0, count);
}

export function getAllAnnouncements() {
  const announcementsDirectory = path.join(contentDirectory, 'announcements');
  if (!fs.existsSync(announcementsDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(announcementsDirectory);
  
  const allAnnouncements = fileNames.map(fileName => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(announcementsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    return {
      slug,
      content,
      date: data.date || null, // Ensure date is explicitly included
      title: data.title || '', // Ensure title is explicitly included
      ...data
    };
  });
  
  // Sort announcements by date in descending order (newest first)
  return allAnnouncements.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getRecentAnnouncements(count: number): Announcement[] {
  const announcements = getAllAnnouncements();
  return announcements.slice(0, count);
}

export async function markdownToHtml(markdown: Compatible | undefined) {
  const result = await remark()
    .use(html)
    .process(markdown);
  return result.toString();
}

export function getResourcesByCategory() {
  const resourcesDirectory = path.join(contentDirectory, 'resources');
  if (!fs.existsSync(resourcesDirectory)) {
    return {};
  }
  
  const fileNames = fs.readdirSync(resourcesDirectory);
  
  const allResources = fileNames.map(fileName => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(resourcesDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    return {
      slug,
      content,
      ...data
    } as { slug: string; content: string; category?: string };
  });
  
  // Group resources by category
  const resourcesByCategory: Record<string, any[]> = {};
  
  allResources.forEach(resource => {
    const category = resource.category || 'other';
    
    if (!resourcesByCategory[category]) {
      resourcesByCategory[category] = [];
    }
    
    resourcesByCategory[category].push(resource);
  });
  
  return resourcesByCategory;
}

export function getPageBySlug(slug: any) {
  const pagesDirectory = path.join(contentDirectory, 'pages');
  if (!fs.existsSync(pagesDirectory)) {
    return null;
  }
  
  const filePath = path.join(pagesDirectory, `${slug}.md`);
  if (!fs.existsSync(filePath)) {
    return null;
  }
  
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  
  return {
    slug,
    ...data,
    content
  };
}