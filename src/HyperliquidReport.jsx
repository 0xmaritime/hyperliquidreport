import React, { useEffect, useState } from 'react';
import { ArrowDown, TrendingUp, Users, Zap, AlertTriangle, Target } from 'lucide-react';

const HyperliquidReport = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);

      // Update active section based on scroll position
      const sections = document.querySelectorAll('section[id]');
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const MarketShareChart = () => (
    <div className="w-full max-w-4xl mx-auto my-16">
      <div className="relative h-64 bg-gray-50 rounded-lg p-8">
        <div className="absolute bottom-8 left-8 right-8 h-32 flex items-end space-x-4">
          <div className="flex-1 bg-black transition-all duration-1000 ease-out" style={{ height: '71%' }}>
            <div className="text-white text-center pt-2 font-bold">71%</div>
            <div className="text-white text-center text-xs mt-1">Hyperliquid</div>
          </div>
          <div className="flex-1 bg-gray-400 transition-all duration-1000 ease-out" style={{ height: '9.5%' }}>
            <div className="text-white text-center text-xs pt-1">Jupiter</div>
          </div>
          <div className="flex-1 bg-gray-400 transition-all duration-1000 ease-out" style={{ height: '4.6%' }}>
            <div className="text-white text-center text-xs">dYdX</div>
          </div>
          <div className="flex-1 bg-gray-400 transition-all duration-1000 ease-out" style={{ height: '15%' }}>
            <div className="text-white text-center text-xs pt-1">Others</div>
          </div>
        </div>
        <div className="text-sm text-gray-500 mt-4">DEX Perpetuals Market Share</div>
      </div>
    </div>
  );

  const TimelineChart = () => (
    <div className="w-full max-w-4xl mx-auto my-16">
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-300"></div>
        {[
          { date: '2017', event: 'dYdX launches first DEX perps', side: 'left' },
          { date: '2021', event: 'GMX introduces liquidity pool model', side: 'right' },
          { date: 'Nov 2022', event: 'FTX collapse', highlight: true, side: 'left' },
          { date: '2023', event: 'Hyperliquid launches', side: 'right' },
          { date: 'Nov 2024', event: '$7B airdrop', highlight: true, side: 'left' },
          { date: '2025', event: '71% market dominance', side: 'right' }
        ].map((item, index) => (
          <div key={index} className={`relative flex ${item.side === 'right' ? 'justify-end' : ''} mb-8`}>
            <div className={`w-5/12 ${item.side === 'right' ? 'text-left pl-8' : 'text-right pr-8'}`}>
              <div className={`${item.highlight ? 'font-bold text-lg' : 'text-sm text-gray-600'}`}>
                {item.date}
              </div>
              <div className={`${item.highlight ? 'text-lg' : 'text-sm'} mt-1`}>
                {item.event}
              </div>
            </div>
            <div className={`absolute left-0 w-3 h-3 ${item.highlight ? 'bg-black' : 'bg-gray-400'} rounded-full -translate-x-1/2`}
                 style={{ top: '0.5rem' }}></div>
          </div>
        ))}
      </div>
    </div>
  );

  const CompetitorComparison = () => (
    <div className="w-full max-w-4xl mx-auto my-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[
          { 
            name: 'dYdX', 
            share: '50% → 4.6%', 
            fatal: 'Cosmos migration freeze',
            strength: 'First mover, compliance'
          },
          { 
            name: 'GMX', 
            share: '~15%', 
            fatal: 'Complex liquidity model',
            strength: 'Zero slippage'
          },
          { 
            name: 'Synthetix', 
            share: '<5%', 
            fatal: 'Too complex for users',
            strength: 'Infinite liquidity'
          },
          { 
            name: 'Hyperliquid', 
            share: '0% → 71%', 
            fatal: '16 validators only',
            strength: 'CEX speed + DEX custody'
          }
        ].map((comp, index) => (
          <div key={index} className={`p-6 ${comp.name === 'Hyperliquid' ? 'bg-black text-white' : 'bg-gray-50'} rounded-lg`}>
            <h4 className="text-2xl font-bold mb-2">{comp.name}</h4>
            <div className="text-3xl font-light mb-4">{comp.share}</div>
            <div className="text-sm mb-2">
              <span className="font-semibold">Strength:</span> {comp.strength}
            </div>
            <div className="text-sm">
              <span className="font-semibold">Fatal flaw:</span> {comp.fatal}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-black transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Navigation dots */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
        {['intro', 'core', 'competitors', 'strategy', 'truth', 'sustainability'].map((section) => (
          <div
            key={section}
            className={`w-2 h-2 rounded-full mb-4 cursor-pointer transition-all ${
              activeSection === section ? 'bg-black w-8' : 'bg-gray-300'
            }`}
            onClick={() => document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' })}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section id="intro" className="min-h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-sm uppercase tracking-widest text-gray-500 mb-8">Analysis</div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-8">
            Why Hyperliquid<br />
            Is the Number 1<br />
            <span className="text-gray-400">Perp Trading Platform</span>
          </h1>
          <div className="max-w-3xl">
            <p className="text-xl md:text-2xl font-light leading-relaxed text-gray-700">
              Hyperliquid captured 71% of decentralized perpetual futures trading by admitting what others wouldn't: 
              most traders don't actually want full decentralization.
            </p>
          </div>
          <div className="mt-16 animate-bounce">
            <ArrowDown className="w-8 h-8 text-gray-400" />
          </div>
        </div>
      </section>

      {/* Core Insight Section */}
      <section id="core" className="py-24 px-8 md:px-16 lg:px-24">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <Zap className="w-6 h-6 mr-3" />
            <h2 className="text-sm uppercase tracking-widest text-gray-500">The Core Insight</h2>
          </div>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-12">
            CEX Performance<br />
            in DEX Clothing
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="p-8 bg-gray-50 rounded-lg">
              <div className="text-5xl font-bold mb-2">0.2s</div>
              <div className="text-sm text-gray-600">Order execution</div>
              <div className="text-xs text-gray-500 mt-1">vs 2-10s on "true" DEXs</div>
            </div>
            <div className="p-8 bg-gray-50 rounded-lg">
              <div className="text-5xl font-bold mb-2">158</div>
              <div className="text-sm text-gray-600">Perpetual markets</div>
              <div className="text-xs text-gray-500 mt-1">vs 20-67 on competitors</div>
            </div>
          </div>

          <div className="p-8 bg-black text-white rounded-lg mb-16">
            <div className="text-2xl font-bold mb-4">The Pragmatic Trade-off</div>
            <p className="text-lg leading-relaxed">
              Started with 4 validators, now expanded to 16. This isn't a bug—it's 
              the architectural choice that enables CEX-level performance while maintaining decentralization roadmap.
            </p>
          </div>
        </div>
      </section>

      {/* Competitors Section */}
      <section id="competitors" className="py-24 px-8 md:px-16 lg:px-24 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <TrendingUp className="w-6 h-6 mr-3" />
            <h2 className="text-sm uppercase tracking-widest text-gray-500">Competitive Landscape</h2>
          </div>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-12">
            How Competitors<br />
            Lost the Lead
          </h3>

          <TimelineChart />
          
          <div className="prose prose-lg max-w-none">
            <p className="text-xl leading-relaxed mb-8">
              Understanding Hyperliquid's rise requires examining why established players couldn't maintain dominance.
            </p>
          </div>

          <CompetitorComparison />
        </div>
      </section>

      {/* Strategy Section */}
      <section id="strategy" className="py-24 px-8 md:px-16 lg:px-24">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <Users className="w-6 h-6 mr-3" />
            <h2 className="text-sm uppercase tracking-widest text-gray-500">Growth Strategy</h2>
          </div>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-12">
            The $7 Billion<br />
            <span className="text-gray-400">Marketing Campaign</span><br />
            Disguised as an Airdrop
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">94K</div>
              <div className="text-sm text-gray-600">Evangelists created</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">~1M</div>
              <div className="text-sm text-gray-600">Organic reach</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">$0</div>
              <div className="text-sm text-gray-600">Marketing spend</div>
            </div>
          </div>

          <div className="bg-gray-50 p-8 rounded-lg mb-16">
            <h4 className="text-2xl font-bold mb-4">The Viral Mechanics</h4>
            <p className="text-lg leading-relaxed">
              94,000 financially incentivized evangelists. Each recipient likely told 10+ people about their windfall. 
              No marketing budget could buy this authentic word-of-mouth. Every HYPE price increase triggers new waves of testimonials.
            </p>
          </div>

          <blockquote className="text-2xl md:text-3xl font-light italic border-l-4 border-black pl-8 my-16">
            "Why would I trade anywhere else when I own a piece of this?"
            <cite className="block text-sm mt-4 not-italic text-gray-600">— Airdrop recipient</cite>
          </blockquote>

          <MarketShareChart />
        </div>
      </section>

      {/* Anti-VC Section - New */}
      <section className="py-24 px-8 md:px-16 lg:px-24 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <Target className="w-6 h-6 mr-3" />
            <h2 className="text-sm uppercase tracking-widest text-gray-500">The Moat</h2>
          </div>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-12">
            Anti-Establishment<br />
            <span className="text-gray-400">Positioning</span>
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div>
              <div className="text-2xl font-bold">76.2%</div>
              <div className="text-sm text-gray-600">Hyperliquid</div>
              <div className="text-xs text-gray-500">to community</div>
            </div>
            <div>
              <div className="text-2xl font-bold">27.7%</div>
              <div className="text-sm text-gray-600">dYdX</div>
              <div className="text-xs text-gray-500">to community</div>
            </div>
            <div>
              <div className="text-2xl font-bold">15%</div>
              <div className="text-sm text-gray-600">GMX</div>
              <div className="text-xs text-gray-500">to community</div>
            </div>
            <div>
              <div className="text-2xl font-bold">5-15%</div>
              <div className="text-sm text-gray-600">Typical DEX</div>
              <div className="text-xs text-gray-500">to community</div>
            </div>
          </div>

          <div className="bg-black text-white p-8 rounded-lg">
            <h4 className="text-2xl font-bold mb-4">No VCs = No Dumps</h4>
            <p className="text-lg leading-relaxed">
              In crypto's attention economy, being the only major project without VC backing became a rallying cry 
              for users tired of being exit liquidity. The 8-person team's minimal communication created more 
              mindshare than any marketing campaign.
            </p>
          </div>
        </div>
      </section>

      {/* Truth Section */}
      <section id="truth" className="py-24 px-8 md:px-16 lg:px-24 bg-black text-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <Target className="w-6 h-6 mr-3" />
            <h2 className="text-sm uppercase tracking-widest text-gray-400">The Truth</h2>
          </div>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-12">
            Users Want<br />
            "Decentralized Enough"
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4 text-green-400">What traders actually care about:</h4>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span> Non-custodial
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span> Transparent
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span> No KYC
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span> Fast and cheap
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4 text-red-400">What they'll sacrifice:</h4>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="text-red-400 mr-2">×</span> Validator decentralization
                </li>
                <li className="flex items-center">
                  <span className="text-red-400 mr-2">×</span> Governance participation
                </li>
                <li className="flex items-center">
                  <span className="text-red-400 mr-2">×</span> Ideological purity
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section id="sustainability" className="py-24 px-8 md:px-16 lg:px-24">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <AlertTriangle className="w-6 h-6 mr-3" />
            <h2 className="text-sm uppercase tracking-widest text-gray-500">Looking Forward</h2>
          </div>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-12">
            Brilliant Execution,<br />
            <span className="text-gray-400">Fragile Moat</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="p-6 border border-gray-200 rounded-lg">
              <h4 className="text-xl font-bold mb-2">Technical Risk</h4>
              <p className="text-sm text-gray-600">
                16 validators (up from 4) = still vulnerable vs. hundreds on other chains
              </p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg">
              <h4 className="text-xl font-bold mb-2">Regulatory Risk</h4>
              <p className="text-sm text-gray-600">
                No-KYC model vulnerable to enforcement
              </p>
            </div>
            <div className="p-6 border border-gray-200 rounded-lg">
              <h4 className="text-xl font-bold mb-2">Competitive Risk</h4>
              <p className="text-sm text-gray-600">
                Model is replicable, but mindshare isn't
              </p>
            </div>
          </div>

          <div className="bg-gray-50 p-8 rounded-lg mb-16">
            <h4 className="text-2xl font-bold mb-4">The Bottom Line</h4>
            <p className="text-lg leading-relaxed mb-4">
              Hyperliquid proved that the best decentralized exchange might not be very decentralized at all. 
              They won by being honest about what traders actually want versus what the industry thinks they should want.
            </p>
            <p className="text-lg leading-relaxed">
              But more importantly, they created a self-reinforcing cycle: success breeds evangelism, which breeds more success. 
              94,000 airdrop recipients became permanent advocates. The anti-VC positioning created a cult. 
              The mindshare moat may be stronger than the technical one.
            </p>
          </div>

          <div className="mt-16 text-sm text-gray-500 italic">
            Note: This analysis is based on publicly available data that cannot be independently verified. 
            Trading perpetual futures carries substantial risk.
          </div>
        </div>
      </section>
    </div>
  );
};

export default HyperliquidReport;
