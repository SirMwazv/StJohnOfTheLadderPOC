// app/page.js
import Image from 'next/image';
import Link from 'next/link';
import { getChurchInfo, getUpcomingEvents, getRecentAnnouncements } from './lib/markdown';
import { ChurchInfo, Event, Announcement } from './types';

export default function Home() {
  const churchInfo = getChurchInfo();
  const events = getUpcomingEvents(3);
  const announcements = getRecentAnnouncements(3);

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="bg-blue-50 rounded-lg p-8 mb-12 relative overflow-hidden">
        <div className="max-w-2xl relative z-10">
          <h1 className="text-4xl font-bold mb-4">{churchInfo.name || 'Welcome to Our Orthodox Church'}</h1>
          <p className="text-xl mb-6">{churchInfo.description || 'A place of worship, community, and Orthodox faith'}</p>
          <div className="flex flex-wrap gap-4">
            <Link 
              href="/about" 
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
            >
              About Us
            </Link>
            <Link 
              href="/contact" 
              className="bg-white text-blue-600 px-6 py-2 rounded-md border border-blue-600 hover:bg-blue-50 transition"
            >
              Find Us
            </Link>
          </div>
        </div>
      </section>

      {/* Services Schedule */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Service Schedule</h2>
        <div className="bg-white rounded-lg shadow p-6">
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
          <h2 className="text-2xl font-bold">Upcoming Events</h2>
          <Link href="/events" className="text-blue-600 hover:underline">
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
          <h2 className="text-2xl font-bold">Latest Announcements</h2>
          <Link href="/announcements" className="text-blue-600 hover:underline">
            View All
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
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
        <h2 className="text-2xl font-bold mb-4">Find Us</h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {churchInfo.mapUrl ? (
            <div className="aspect-video w-full">
              <iframe 
                src={churchInfo.mapUrl}
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
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
            <h3 className="font-semibold text-lg mb-2">Our Location</h3>
            <p className="mb-2">{churchInfo.address || 'Church address'}</p>
            {churchInfo.phone && <p className="mb-2">Phone: {churchInfo.phone}</p>}
            {churchInfo.email && <p className="mb-2">Email: {churchInfo.email}</p>}
            <Link 
              href="/contact" 
              className="inline-block mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}