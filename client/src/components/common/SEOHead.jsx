import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * SEOHead Component - Handles meta tags for each page
 * Optimized for Sanasa Bank Wilbagedara
 */
const SEOHead = ({
  title,
  description,
  keywords = [],
  canonicalUrl,
  ogImage = '/images/og-default.jpg',
  ogType = 'website',
  noIndex = false,
  structuredData = null,
}) => {
  const siteName = 'Sanasa Bank Wilbagedara';
  const defaultKeywords = [
    'Sanasa Bank Wilbagedara',
    'Thrift and Credit Cooperative Sri Lanka',
    'Wilbagedara community banking',
    'Low interest loans Wilbagedara',
    'Bandarakoswaththa cooperative bank',
  ];

  const allKeywords = [...new Set([...keywords, ...defaultKeywords])];
  const fullTitle = title ? `${title} | ${siteName}` : siteName;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={allKeywords.join(', ')} />
      
      {/* Robots */}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}
      
      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_LK" />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Geographic Tags */}
      <meta name="geo.region" content="LK-NW" />
      <meta name="geo.placename" content="Wilbagedara, Bandarakoswaththa" />
      
      {/* Language */}
      <meta httpEquiv="content-language" content="en, si" />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;
