import React, { useState, useEffect } from 'react';
import SEOHead from '../components/common/SEOHead';
import ImageCarousel from '../components/common/ImageCarousel';

export default function CommunityPage() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  // Community event images from the images folder
  const eventImages = [
    require('../assets/images/community-1.jpg'),
    require('../assets/images/community-2.jpg'),
    require('../assets/images/community-3.jpg'),
    require('../assets/images/community-4.jpg'),
    require('../assets/images/community-5.jpg'),
  ].filter(img => img);

  // Fallback images from client/images folder (if assets not available)
  const fallbackEventImages = [
    '/images/594072099_1511170086828703_1064142684429330378_n.jpg',
    '/images/594074857_1511170193495359_1020885454247933538_n.jpg',
    '/images/602424310_1525382275407484_8089930141906262115_n.jpg',
    '/images/602992652_1525382208740824_58492769500653683_n.jpg',
    '/images/603904610_1525452105400501_8193436784536101434_n.jpg',
  ];

  useEffect(() => {
    // TODO: Fetch activities from API
    setLoading(false);
  }, []);

  return (
    <>
      <SEOHead
        title="Community Activities - Sanasa Bank Wilbagedara"
        description="Join our community activities, events, and social responsibility programs."
      />

      <div className="min-h-screen bg-gray-50">
        {/* Hero */}
        <section className="bg-sanasa-blue-700 text-white py-12">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Community</h1>
            <p className="text-lg">Join us in building a stronger community</p>
          </div>
        </section>

        {/* Content */}
        <section className="max-w-6xl mx-auto px-4 py-16">
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8">Recent Activities & Events</h2>
            
            {/* Image Carousel */}
            <div className="mb-8">
              <ImageCarousel 
                images={ eventImages}
                autoPlay={true}
                interval={3000}
              />
            </div>
            
            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-600">Loading activities...</p>
              </div>
            ) : activities.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <p className="text-gray-600">No activities available at the moment.</p>
                <p className="text-gray-500 text-sm mt-2">Check back soon for upcoming events!</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-8">
                {activities.map((activity) => (
                  <div key={activity._id} className="card">
                    <h3 className="text-xl font-bold mb-2">{activity.title}</h3>
                    <p className="text-gray-600 mb-4">{activity.description}</p>
                    <button className="btn-primary">Learn More</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow p-8">
              <h3 className="text-2xl font-bold mb-4">CSR Initiatives</h3>
              <p className="text-gray-600 mb-4">
                Sanasa Bank is committed to social responsibility and community development.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Financial literacy programs</li>
                <li>✓ Youth development projects</li>
                <li>✓ Women empowerment programs</li>
                <li>✓ Environmental conservation</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow p-8">
              <h3 className="text-2xl font-bold mb-4">Member Benefits</h3>
              <p className="text-gray-600 mb-4">
                Beyond loans and savings, we offer our members exclusive benefits.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Insurance products</li>
                <li>✓ Training programs</li>
                <li>✓ Social gathering events</li>
                <li>✓ Member discounts</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
