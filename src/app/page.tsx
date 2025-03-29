// app/page.js
import Image from 'next/image';
import Link from 'next/link';
import type { ChurchInfo, Event, Announcement } from './types';
import { getChurchInfo, getUpcomingEvents, getRecentAnnouncements } from './lib/markdown';

export default function Home(): React.ReactNode {
  const churchInfo: ChurchInfo = getChurchInfo();
  const events: Event[] = getUpcomingEvents(3);
  const announcements: Announcement[] = getRecentAnnouncements(3);

  return (
    <main className="container mx-auto px-4 py-8 bg-[#F5F2ED]"> {/* Warm off-white background */}
      {/* Hero Section */}
      <section className="bg-[#E8DED1] rounded-lg p-8 mb-12 relative overflow-hidden border border-[#8B7355]"> {/* Light brown with darker border */}
        <div className="max-w-2xl relative z-10">
          <h1 className="text-4xl font-bold mb-4 text-[#2C1810]">St. John of the Ladder Orthodox Church</h1> {/* Dark brown text */}
          <p className="text-xl mb-6 text-[#4A3728]">{churchInfo.description || 'A place of worship, community, and Orthodox faith'}</p>
          <div className="flex flex-wrap gap-4">
            <Link 
              href="/about" 
              className="bg-[#8B7355] text-white px-6 py-2 rounded-md hover:bg-[#6B573D] transition"
            >
              About Us
            </Link>
            <Link 
              href="/contact" 
              className="bg-[#F5F2ED] text-[#8B7355] px-6 py-2 rounded-md border border-[#8B7355] hover:bg-[#E8DED1] transition"
            >
              Find Us
            </Link>
          </div>
        </div>
      </section>

      {/* Services Schedule */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-[#2C1810]">Service Schedule</h2>
        <div className="bg-white rounded-lg shadow-md p-6 border border-[#E8DED1]">
          {churchInfo.services && churchInfo.services.length > 0 ? (
            <ul className="divide-y">
              {churchInfo.services.map((service, index) => (
                <li key={index} className="py-3">
                  <p className="font-semibold">{service.serviceName}</p>
                  <p>{service.day} at {service.time}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>Service schedule coming soon...</p>
          )}
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-[#2C1810]">Upcoming Events</h2>
          <Link href="/events" className="text-[#8B7355] hover:text-[#6B573D] hover:underline">
            View All Events
          </Link>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {events.length > 0 ? (
            events.map((event) => (
              <div key={event.slug} className="bg-white rounded-lg shadow overflow-hidden">
                {event.featuredImage && (
                  <div className="relative h-48 w-full">
                    <Image 
                      src={event.featuredImage}
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-4">
                  <p className="text-sm text-gray-500 mb-1">
                    {new Date(event.date).toLocaleDateString()} at {new Date(event.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </p>
                  <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                  <p className="text-gray-700 mb-4 line-clamp-2">{event.description?.substring(0, 150)}...</p>
                  <Link 
                    href={`/events/${event.slug}`}
                    className="text-blue-600 hover:underline"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-3 text-center py-8 bg-white rounded-lg shadow">No upcoming events scheduled</p>
          )}
        </div>
      </section>

      {/* Latest Announcements */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-[#2C1810]">Latest Announcements</h2>
          <Link href="/announcements" className="text-[#8B7355] hover:text-[#6B573D] hover:underline">
            View All
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 border border-[#E8DED1]">
          {announcements.length > 0 ? (
            <ul className="divide-y">
              {announcements.map((announcement) => (
                <li key={announcement.slug} className="py-4">
                  <p className="text-sm text-gray-500 mb-1">
                    {new Date(announcement.date).toLocaleDateString()}
                  </p>
                  <h3 className="text-xl font-semibold mb-2">{announcement.title}</h3>
                  <p className="text-gray-700 mb-2 line-clamp-2">
                    {announcement.content.substring(0, 150)}...
                  </p>
                  <Link 
                    href={`/announcements/${announcement.slug}`}
                    className="text-blue-600 hover:underline"
                  >
                    Read More
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center py-4">No recent announcements</p>
          )}
        </div>
      </section>

      {/* Find Us */}
      <section>
        <h2 className="text-2xl font-bold mb-4 text-[#2C1810]">Find Us</h2>
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-[#E8DED1]">
          {churchInfo.mapUrl ? (
            <div className="aspect-video w-full">
              <iframe 
                src={churchInfo.mapUrl}
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          ) : (
            <div className="aspect-video w-full bg-gray-200 flex items-center justify-center">
              <p className="text-gray-500">Map will appear here once configured</p>
            </div>
          )}
          <div className="p-6">
            <h3 className="font-semibold text-lg mb-2 text-[#2C1810]">Our Location</h3>
            <p className="mb-2 text-[#4A3728]">{churchInfo.address || 'Church address'}</p>
            {churchInfo.phone && <p className="mb-2 text-[#4A3728]">Phone: {churchInfo.phone}</p>}
            {churchInfo.email && <p className="mb-2 text-[#4A3728]">Email: {churchInfo.email}</p>}
            <Link 
              href="/contact" 
              className="inline-block mt-2 bg-[#8B7355] text-white px-4 py-2 rounded-md hover:bg-[#6B573D] transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}