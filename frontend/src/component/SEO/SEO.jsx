import { useEffect } from "react";

const defaultDescription =
  "Portfolio of Omid Teimory, frontend web developer crafting performant React, Tailwind, and JavaScript experiences. Open to work and collaborations.";
const defaultKeywords =
  "Omid Teimory, frontend developer, React developer, Tailwind CSS, JavaScript engineer, web developer portfolio, open to work";
const fallbackOrigin = "https://omidteimory.com";
const authorName = "Omid Teimory";

const resolveUrl = (value) => {
  if (!value) return fallbackOrigin;
  if (/^https?:\/\//i.test(value)) return value;
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : fallbackOrigin;
  return `${origin}${value.startsWith("/") ? value : `/${value}`}`;
};

const upsertMeta = (attr, name, content) => {
  if (!content) return;
  const selector =
    attr === "name" ? `meta[name="${name}"]` : `meta[property="${name}"]`;
  let tag = document.head.querySelector(selector);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
};

const upsertLink = (rel, href) => {
  if (!href) return;
  let tag = document.head.querySelector(`link[rel="${rel}"]`);
  if (!tag) {
    tag = document.createElement("link");
    tag.setAttribute("rel", rel);
    document.head.appendChild(tag);
  }
  tag.setAttribute("href", href);
};

function SEO({
  title,
  description = defaultDescription,
  keywords = defaultKeywords,
  image = "/og-image.png",
  type = "website",
  url,
  publishedTime,
  modifiedTime,
  noindex = false,
  locale = "en_US",
  siteName = "Omid Teimory Portfolio",
  twitterHandle = "@Omid2007hope",
  breadcrumbItems,
  jsonLd,
}) {
  useEffect(() => {
    const path =
      typeof window !== "undefined" && window.location.pathname
        ? window.location.pathname
        : "/";
    const canonical = resolveUrl(url || path);
    const resolvedImage = resolveUrl(image);
    const pageTitle = title
      ? `${title} | Omid Teimory`
      : "Omid Teimory | Frontend Web Developer";
    const pageLang = locale.replace("_", "-");

    document.title = pageTitle;
    document.documentElement?.setAttribute("lang", pageLang);

    upsertMeta("name", "description", description);
    upsertMeta("name", "keywords", keywords);
    upsertMeta("name", "author", authorName);
    upsertMeta(
      "name",
      "robots",
      noindex ? "noindex, nofollow, noimageindex" : "index, follow",
    );
    upsertMeta(
      "name",
      "googlebot",
      noindex ? "noindex, nofollow, noimageindex" : "index, follow",
    );

    upsertMeta("property", "og:title", pageTitle);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:type", type);
    upsertMeta("property", "og:url", canonical);
    upsertMeta("property", "og:image", resolvedImage);
    upsertMeta("property", "og:site_name", siteName);
    upsertMeta("property", "og:locale", locale);

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", pageTitle);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", resolvedImage);
    if (twitterHandle) {
      upsertMeta("name", "twitter:site", twitterHandle);
      upsertMeta("name", "twitter:creator", twitterHandle);
    }
    if (publishedTime && type === "article") {
      upsertMeta("property", "article:published_time", publishedTime);
    }
    if (modifiedTime && type === "article") {
      upsertMeta("property", "article:modified_time", modifiedTime);
    }

    upsertLink("canonical", canonical);

    const breadcrumbJson =
      breadcrumbItems && breadcrumbItems.length
        ? {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: breadcrumbItems.map((item, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: item.name,
              item: resolveUrl(item.url || item.item || "/"),
            })),
          }
        : null;

    const webPageJson = {
      "@context": "https://schema.org",
      "@type": type === "article" ? "Article" : "WebPage",
      name: pageTitle,
      url: canonical,
      description,
      inLanguage: pageLang,
      image: resolvedImage,
      datePublished: publishedTime,
      dateModified: modifiedTime || publishedTime,
      author: {
        "@type": "Person",
        name: authorName,
        url: fallbackOrigin,
      },
      isPartOf: {
        "@type": "WebSite",
        name: siteName,
        url: fallbackOrigin,
      },
    };

    const structuredData = [
      {
        "@context": "https://schema.org",
        "@type": "Person",
        name: authorName,
        jobTitle: "Frontend Web Developer",
        description,
        url: fallbackOrigin,
        image: resolvedImage,
        sameAs: [
          "https://github.com/omid2007hope",
          "https://www.linkedin.com/in/omid-teimory-48233638b/",
          "https://x.com/Omid2007hope",
        ],
        email: "mailto:omidhope2007@gmail.com",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Vienna",
          addressCountry: "Austria",
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: siteName,
        url: fallbackOrigin,
        inLanguage: pageLang,
        potentialAction: {
          "@type": "SearchAction",
          target: `${fallbackOrigin}/?s={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      webPageJson,
      jsonLd || null,
      breadcrumbJson,
    ].filter(Boolean);

    const scriptId = "structured-data";
    let script = document.getElementById(scriptId);
    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(structuredData);
  }, [
    breadcrumbItems
      ? breadcrumbItems
          .map((item) => `${item.name}-${item.url || item.item}`)
          .join("|")
      : null,
    description,
    image,
    keywords,
    locale,
    modifiedTime,
    noindex,
    jsonLd ? JSON.stringify(jsonLd) : null,
    publishedTime,
    siteName,
    title,
    twitterHandle,
    type,
    url,
  ]);

  return null;
}

export default SEO;
