'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { BookOpen, Calendar, Tag, ArrowRight } from 'lucide-react';

export default function BlogPage() {
  const { lang, t } = useLanguage();
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/blog')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.posts) {
          setPosts(data.posts);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="bg-cream-bg min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block mb-2">
            {lang === 'or' ? 'ବୈଦିକ ଜ୍ଞାନ ଓ ଲେଖା' : 'Vedic Knowledge & Articles'}
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold text-navy mb-4">
            {t.common.blog}
          </h1>
          <p className="text-gray-600 text-base sm:text-lg">
            Explore authentic treatises on astronomical calculations, planetary remedies, and sacred Hindu scriptures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl border border-gold/30 p-8 shadow-md flex flex-col justify-between hover:shadow-lg transition-all"
            >
              <div>
                <div className="flex items-center gap-3 text-xs text-amber-700 font-semibold mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200">
                    {post.category}
                  </span>
                  <span>•</span>
                  <span>{new Date(post.published_at).toLocaleDateString()}</span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-navy mb-3 hover:text-amber-800 transition-colors">
                  {lang === 'or' ? post.title_or : post.title_en}
                </h2>

                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                  {lang === 'or' ? post.summary_or : post.summary_en}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs text-gray-400">By Pandit Dhananjaya Nanda</span>
                <span className="text-xs font-bold text-amber-800 flex items-center gap-1">
                  <span>{t.common.readMore}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
