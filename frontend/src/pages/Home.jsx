import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import FeatureGrid from '../components/FeatureGrid';
import PricingShowcase from '../components/PricingShowcase';
import GallerySeed from '../components/GallerySeed';
import '../theme/mintora.css';

export default function Home(){
  useEffect(()=>{ document.body.classList.add('mintora'); return ()=>document.body.classList.remove('mintora'); },[]);
  return (<>
    <Hero/>
    <FeatureGrid/>
    <PricingShowcase/>
    <GallerySeed/>
    <footer className="footer container">© Mintora Lab</footer>
  </>);
}
