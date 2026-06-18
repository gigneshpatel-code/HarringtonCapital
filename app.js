import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Mock Asset Data
const ASSETS = [
  {
    id: 'asset-1',
    title: 'The Palm Penthouse',
    location: 'Palm Jumeirah, Dubai',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    brochurePages: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
    ]
  },
  {
    id: 'asset-2',
    title: 'The Emirates Hills Mansion',
    location: 'Emirates Hills, Dubai',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    brochurePages: [
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80',
    ]
  }
];

export default function TrophyGallery() {
  const [isEntered, setIsEntered] = useState(false);
  const [activeAsset, setActiveAsset] = useState(null);
  const [brochurePage, setBrochurePage] = useState(0);

  return (
    <div className="relative min-h-screen bg-[#0B0B0C] text-[#E5E5E5] font-serif overflow-x-hidden">
      
      {/* 1. GATED ENTRANCE PORTAL */}
      <AnimatePresence>
        {!isEntered && (
          <motion.div 
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#070708]"
            exit={{ opacity: 0, transition: { duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] } }}
          >
            {/* Split Doors Left/Right Animation Visual */}
            <div className="absolute inset-0 flex">
              <motion.div exit={{ x: '-100%' }} transition={{ duration: 1.5, ease: 'easeInOut' }} className="w-1/2 h-full bg-[#0B0B0C] border-r border-[#1F1F22]/30" />
              <motion.div exit={{ x: '100%' }} transition={{ duration: 1.5, ease: 'easeInOut' }} className="w-1/2 h-full bg-[#0B0B0C] border-l border-[#1F1F22]/30" />
            </div>

            {/* Centered Identity & Portal Trigger */}
            <div className="relative z-10 flex flex-col items-center max-w-sm px-6 text-center">
              <img 
                src="Transparent logo.png" 
                alt="Harrington Capital Dubai Logo" 
                className="w-64 h-auto mb-12 opacity-90 select-none pointer-events-none"
              />
              <motion.button
                whileHover={{ scale: 1.03, color: '#FFFFFF' }}
                onClick={() => setIsEntered(true)}
                className="tracking-[0.3em] uppercase text-xs text-[#C5A880] border border-[#C5A880]/30 px-8 py-4 bg-transparent backdrop-blur-sm transition-all duration-500 hover:border-[#C5A880]"
              >
                Request Entry
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. THE MAIN SHOWROOM (Visible after Entry) */}
      {isEntered && (
        <motion.main 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="min-h-screen flex flex-col justify-between p-8 lg:p-16"
        >
          {/* Persistent Premium Header */}
          <header className="flex justify-between items-center z-10">
            <img src="Transparent logo.png" alt="Harrington Capital" className="h-14 w-auto opacity-80" />
            <span className="tracking-[0.4em] uppercase text-[10px] text-[#C5A880] border-b border-[#C5A880]/20 pb-1">
              Private Collection
            </span>
          </header>

          {/* Horizontal Cinematic Asset Carousel */}
          <div className="flex space-x-12 overflow-x-scroll py-12 scrollbar-hide snap-x snap-mandatory items-center my-auto min-h-[60vh]">
            {ASSETS.map((asset) => (
              <motion.div 
                key={asset.id}
                onClick={() => { setActiveAsset(asset); setBrochurePage(0); }}
                className="relative min-w-[85vw] md:min-w-[60vw] lg:min-w-[45vw] h-[55vh] snap-center cursor-pointer group overflow-hidden bg-[#121214]"
              >
                {/* Background Hero Asset Image */}
                <img 
                  src={asset.image} 
                  alt={asset.title} 
                  className="w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-60 transition-all duration-1000 ease-out" 
                />
                {/* Overlay Text Details */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-transparent to-transparent p-8 flex flex-col justify-end">
                  <p className="text-[11px] tracking-[0.25em] uppercase text-[#C5A880] mb-2">{asset.location}</p>
                  <h3 className="text-2xl md:text-3xl font-light text-white tracking-wide">{asset.title}</h3>
                  <div className="mt-4 w-0 group-hover:w-16 h-[1px] bg-[#C5A880] transition-all duration-500 ease-out" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer Coordinates */}
          <footer className="text-center text-[10px] tracking-[0.3em] uppercase text-[#555] z-10">
            © 2026 Harrington Capital Dubai · Institutional Grade Trophy Assets
          </footer>
        </motion.main>
      )}

      {/* 3. INTERACTIVE BROCHURE FLIPBOOK MODAL */}
      <AnimatePresence>
        {activeAsset && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#070708]/95 backdrop-blur-md flex items-center justify-center p-4"
          >
            <div className="relative max-w-4xl w-full flex flex-col items-center">
              {/* Close Button */}
              <button 
                onClick={() => setActiveAsset(null)}
                className="absolute -top-12 right-0 tracking-[0.2em] text-[11px] uppercase text-[#C5A880] hover:text-white transition-colors"
              >
                Exit Showroom [✕]
              </button>

              {/* Dynamic Brochure Page View */}
              <div className="w-full aspect-[4/3] bg-[#121214] shadow-2xl border border-[#1F1F22] flex items-center justify-center relative overflow-hidden">
                <img 
                  src={activeAsset.brochurePages[brochurePage]} 
                  alt={`Page ${brochurePage + 1}`}
                  className="w-full h-full object-contain p-4"
                />
                
                {/* Left/Right Interactive Flips */}
                {brochurePage > 0 && (
                  <button 
                    onClick={() => setBrochurePage(p => p - 1)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl text-[#C5A880] p-4 hover:text-white"
                  >
                    ⟨
                  </button>
                )}
                {brochurePage < activeAsset.brochurePages.length - 1 ? (
                  <button 
                    onClick={() => setBrochurePage(p => p + 1)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl text-[#C5A880] p-4 hover:text-white"
                  >
                    ⟩
                  </button>
                ) : (
                  /* Final Private Call to Action Gating */
                  <div className="absolute inset-0 bg-[#070708]/90 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center animate-fade-in">
                    <h4 className="text-xl text-white mb-2 tracking-wide">Acquisition Advisory</h4>
                    <p className="text-xs text-[#888] max-w-md mb-6 leading-relaxed font-sans">To view full underwriting financials, layout schematics, and arrange a private viewing, please contact your advisory manager directly.</p>
                    <a 
                      href="mailto:advisory@harringtoncapital.ae"
                      className="tracking-[0.2em] uppercase text-[10px] bg-[#C5A880] text-[#070708] font-bold px-6 py-3 transition-transform hover:scale-105"
                    >
                      Initiate Consultation
                    </a>
                  </div>
                )}
              </div>

              {/* Page Indicator */}
              <p className="text-[11px] tracking-[0.2em] text-[#555] mt-4 uppercase">
                Brochure Page {brochurePage + 1} of {activeAsset.brochurePages.length}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}