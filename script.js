/* =============================================
   COLD EMAIL GENERATOR â script.js
   Rich template engine, 20+ industries,
   5 frameworks Ã 3+ variants, spam checker,
   Flesch-Kincaid readability.
   ============================================= */

'use strict';

/* âââââââââââââââââââââââââââââââââââââââââââââ
   INDUSTRY DATA
   Each industry has:
     - painPoints  : array of selectable pain points
     - hooks       : personalisation openers (with placeholders)
     - buzzwords   : industry-specific language
     - sizeLabel   : how we refer to the business
     - resultTerms : outcomes they care about
   âââââââââââââââââââââââââââââââââââââââââââââ */
const INDUSTRY_DATA = {
  restaurant: {
    label: 'Restaurants & Cafes',
    sizeLabel: 'restaurant',
    painPoints: [
      'not ranking on Google Maps',
      'no online booking / reservation system',
      'poor social media presence',
      'outdated or hard-to-read menu online',
      'low TripAdvisor / Google review count',
      'no email list or loyalty programme'
    ],
    hooks: [
      'I tried to find your menu online and it took me three clicks to get there',
      'I searched for {industry} near {town} on Google Maps and noticed you weren\'t showing up in the top results',
      'I couldn\'t find an online booking option on your site â I almost gave up and went elsewhere',
      'I noticed your last Google review was several months ago'
    ],
    buzzwords: ['covers', 'reservations', 'footfall', 'TripAdvisor', 'dine-in', 'table turns', 'no-shows', 'walk-ins'],
    resultTerms: ['more covers per week', 'fewer no-shows', 'higher average spend per head', 'more 5-star reviews']
  },

  lawfirm: {
    label: 'Law Firms',
    sizeLabel: 'law firm',
    painPoints: [
      'not generating enough inbound leads online',
      'website looks outdated and unprofessional',
      'poor Google rankings for local searches',
      'slow or manual client intake process',
      'no consistent content / thought leadership',
      'low online review visibility'
    ],
    hooks: [
      'I searched for {industry} in your area and noticed your website doesn\'t rank on the first page',
      'I visited your website and the design looked like it hasn\'t been updated in a few years',
      'I couldn\'t find a clear way to book a consultation on your site',
      'I noticed you have very few Google reviews compared to your competitors in the area'
    ],
    buzzwords: ['retainer', 'consultation', 'case intake', 'lead generation', 'conversion rate', 'billable hours', 'referrals'],
    resultTerms: ['more qualified enquiries', 'a higher client close rate', 'less time on admin', 'stronger online authority']
  },

  tradesperson: {
    label: 'Tradespeople',
    sizeLabel: 'trades business',
    painPoints: [
      'relying too heavily on word of mouth',
      'no professional website or online presence',
      'not showing up in local Google searches',
      'no system for collecting reviews after a job',
      'quoting process is slow and manual',
      'struggling to fill the calendar in slow months'
    ],
    hooks: [
      'I searched for a {specific_trade} in {town} and you weren\'t showing up in Google',
      'I visited your Facebook page and noticed the last post was from over a year ago',
      'I couldn\'t find any Google reviews for your business â I know that puts off a lot of potential customers',
      'A lot of tradespeople I speak to say slow months are killing their cash flow'
    ],
    buzzwords: ['call-outs', 'booked up', 'local leads', 'quote requests', 'repeat customers', 'job calendar'],
    resultTerms: ['a full diary', 'more inbound call-outs', 'less reliance on word of mouth', 'consistent monthly revenue']
  },

  estateagent: {
    label: 'Estate Agents / Realtors',
    sizeLabel: 'estate agency',
    painPoints: [
      'losing listings to bigger agencies',
      'website not generating vendor leads',
      'poor Google / Rightmove visibility',
      'no automated follow-up system for leads',
      'low online review count',
      'social media presence is inconsistent'
    ],
    hooks: [
      'I was browsing properties in your area and noticed your listings aren\'t getting as many views as the major portals',
      'I searched for estate agents in {town} and noticed you were on page 2 of Google',
      'I checked your social media and the last post was a few weeks ago â in this market, that\'s a lot of opportunity missed',
      'I spoke to a few vendors recently who said they chose an agent based purely on their online presence'
    ],
    buzzwords: ['vendor leads', 'instructions', 'market appraisals', 'pipeline', 'portal listings', 'for sale board', 'completion'],
    resultTerms: ['more vendor instructions', 'a stronger pipeline', 'better portal visibility', 'more market appraisals booked']
  },

  gym: {
    label: 'Gyms & Fitness Studios',
    sizeLabel: 'gym',
    painPoints: [
      'high member churn / cancellation rate',
      'struggling to attract new members online',
      'no automated lead nurturing for trial sign-ups',
      'poor Google Maps visibility',
      'no referral programme in place',
      'class booking system is clunky or non-existent'
    ],
    hooks: [
      'I searched for gyms near {town} and noticed you weren\'t appearing in the top 3 on Google Maps',
      'I tried to sign up for a trial on your website and couldn\'t find a clear way to do it',
      'I checked your Instagram and the engagement on your recent posts seemed lower than it should be for a fitness brand',
      'A lot of gym owners I speak to lose 30â40% of new enquiries because there\'s no follow-up system'
    ],
    buzzwords: ['member retention', 'trial conversions', 'monthly recurring revenue', 'class occupancy', 'churn', 'direct debits'],
    resultTerms: ['more trial sign-ups', 'lower churn', 'higher monthly recurring revenue', 'fuller classes']
  },

  dentist: {
    label: 'Dentists & Orthodontists',
    sizeLabel: 'dental practice',
    painPoints: [
      'not attracting enough new NHS or private patients',
      'online booking system is hard to find or missing',
      'low Google review count vs. nearby practices',
      'website looks outdated and erodes trust',
      'no patient reactivation system for lapsed patients',
      'not ranking for high-intent local searches'
    ],
    hooks: [
      'I searched for dentists in {town} and noticed your practice isn\'t appearing in the top results',
      'I tried to book an appointment on your website and found it quite tricky to navigate',
      'I noticed your practice has far fewer Google reviews than some of your local competitors',
      'I couldn\'t find your pricing or treatment options on your website â most patients want to know upfront'
    ],
    buzzwords: ['new patient enquiries', 'treatment plans', 'NHS capacity', 'private revenue', 'appointment book', 'no-shows', 'patient lifetime value'],
    resultTerms: ['more new patient enquiries', 'higher private case conversions', 'fewer no-shows', 'a fully booked appointment book']
  },

  accountant: {
    label: 'Accountants & Bookkeepers',
    sizeLabel: 'accounting practice',
    painPoints: [
      'client acquisition is entirely word of mouth',
      'no content strategy or online authority',
      'website is basic and doesn\'t differentiate you',
      'onboarding new clients is slow and paper-heavy',
      'not showing up for niche-specific searches',
      'losing clients to cheaper online competitors'
    ],
    hooks: [
      'I searched for accountants specialising in {niche} businesses and you weren\'t showing up',
      'I checked your website and it didn\'t clearly communicate why someone should pick you over a competitor',
      'I noticed most of your competitors in the area are actively producing content and ranking for it â you\'re not',
      'Most accounting firms I speak to say they get 90% of clients through referrals, which makes growth unpredictable'
    ],
    buzzwords: ['recurring fees', 'bookkeeping clients', 'MTD', 'self-assessment', 'payroll clients', 'advisory services', 'compliance'],
    resultTerms: ['a predictable new client pipeline', 'more recurring fee income', 'better client retention', 'higher advisory revenue']
  },

  ecommerce: {
    label: 'Ecommerce Stores',
    sizeLabel: 'ecommerce brand',
    painPoints: [
      'high cart abandonment rate',
      'low returning customer rate / poor retention',
      'not leveraging email marketing properly',
      'low organic traffic / poor SEO',
      'high cost per acquisition on paid ads',
      'poor product page conversion rates'
    ],
    hooks: [
      'I went through your checkout process and noticed there are a few drop-off points that are likely costing you sales',
      'I looked at your email capture â there\'s no pop-up or post-purchase flow from what I can see',
      'Your products look great but your Google search visibility is very low for your main category',
      'I noticed you\'re running ads but your landing pages aren\'t optimised for conversion'
    ],
    buzzwords: ['AOV', 'LTV', 'ROAS', 'cart abandonment', 'email flows', 'retention', 'repeat purchase rate', 'conversion rate'],
    resultTerms: ['a higher conversion rate', 'better customer LTV', 'lower CAC', 'more repeat purchases']
  },

  construction: {
    label: 'Construction & Builders',
    sizeLabel: 'construction company',
    painPoints: [
      'no consistent source of new project enquiries',
      'website is outdated or non-existent',
      'not showing up in local Google searches',
      'quoting and tendering process is time-consuming',
      'no online portfolio of past work',
      'poor online reviews vs. local competitors'
    ],
    hooks: [
      'I searched for builders in {town} and noticed your company wasn\'t showing up on page 1',
      'I visited your website and couldn\'t find a portfolio of completed projects',
      'I noticed you have only a few Google reviews â in construction, trust signals like that matter enormously',
      'A lot of construction firms I speak to win jobs purely on price because they haven\'t differentiated themselves online'
    ],
    buzzwords: ['tender pipeline', 'project enquiries', 'site visits', 'contract value', 'subcontractors', 'planning permission', 'leads'],
    resultTerms: ['a stronger tender pipeline', 'more inbound project enquiries', 'higher-value contracts', 'a professional online presence']
  },

  salon: {
    label: 'Hair Salons & Barbers',
    sizeLabel: 'salon',
    painPoints: [
      'empty appointment slots, especially mid-week',
      'no online booking system',
      'not showing up on Google Maps',
      'low Instagram / social media engagement',
      'no client rebooking or retention system',
      'losing clients to nearby competitors'
    ],
    hooks: [
      'I searched for salons in {town} and you weren\'t coming up in Google Maps',
      'I tried to book online and couldn\'t find a way to do it on your website',
      'I noticed your Instagram hasn\'t been updated recently â that\'s often the first place people check before booking',
      'A lot of salon owners tell me their mid-week slots are consistently empty'
    ],
    buzzwords: ['chair occupancy', 'rebooking rate', 'appointment slots', 'walk-ins', 'retail upsell', 'no-shows', 'client retention'],
    resultTerms: ['fuller appointment books', 'more online bookings', 'higher rebooking rates', 'more Google reviews']
  },

  spa: {
    label: 'Spas & Beauty Clinics',
    sizeLabel: 'beauty clinic',
    painPoints: [
      'attracting new clients beyond word of mouth',
      'no strong online presence or SEO',
      'treatment packages aren\'t being upsold effectively',
      'email marketing is non-existent',
      'online booking is difficult to find',
      'low client review count'
    ],
    hooks: [
      'I searched for beauty clinics in {town} and you weren\'t appearing prominently in the results',
      'I visited your website and couldn\'t quickly find your treatment menu or pricing',
      'I noticed you have very few online reviews compared to some of your local competitors',
      'Your treatments look fantastic but I couldn\'t see any way to book directly from your social media'
    ],
    buzzwords: ['treatment packages', 'membership programmes', 'client retention', 'upsell', 'patch tests', 'rebooking', 'consultation'],
    resultTerms: ['more new client bookings', 'higher average spend per visit', 'stronger online visibility', 'more repeat clients']
  },

  mortgage: {
    label: 'Mortgage Brokers',
    sizeLabel: 'mortgage brokerage',
    painPoints: [
      'relying entirely on estate agent referrals',
      'no website or weak online presence',
      'not ranking for local mortgage searches',
      'slow lead follow-up process',
      'no automated nurture sequence for enquiries',
      'low online trust signals / reviews'
    ],
    hooks: [
      'I searched for mortgage brokers in {town} and noticed you\'re not showing up on the first page',
      'I visited your website and it was quite hard to understand what makes you different from a high-street bank',
      'I noticed you have very few Google reviews â for financial services, that\'s a big trust barrier',
      'Most brokers I speak to lose 50%+ of leads just because follow-up is too slow'
    ],
    buzzwords: ['completions', 'AIP', 'product transfer', 'proc fees', 'lead nurturing', 'referral network', 'first-time buyers'],
    resultTerms: ['more self-generated leads', 'faster lead-to-completion times', 'a larger referral network', 'higher completion volumes']
  },

  insurance: {
    label: 'Insurance Agencies',
    sizeLabel: 'insurance agency',
    painPoints: [
      'high reliance on price comparison leads',
      'low client retention at renewal',
      'not generating warm inbound enquiries',
      'weak digital presence vs. major aggregators',
      'no cross-sell or upsell strategy',
      'website doesn\'t build trust or authority'
    ],
    hooks: [
      'I compared insurance options for a {type} recently and noticed your agency wasn\'t showing up organically',
      'I visited your website and it was quite hard to understand why I\'d choose you over a comparison site',
      'A lot of brokers I speak to lose 20â30% of their book at renewal because clients never felt a personal connection',
      'I couldn\'t find any case studies or testimonials on your site'
    ],
    buzzwords: ['renewal retention', 'NTU rate', 'cross-sell', 'book of business', 'premium income', 'policy count', 'lead quality'],
    resultTerms: ['higher renewal retention', 'more warm inbound leads', 'a stronger book of business', 'better cross-sell revenue']
  },

  chiropractor: {
    label: 'Chiropractors & Physiotherapists',
    sizeLabel: 'clinic',
    painPoints: [
      'not generating enough new patient bookings online',
      'poor Google Maps visibility',
      'no online booking system',
      'website doesn\'t explain your treatments clearly',
      'low review count',
      'no patient retention / recall system'
    ],
    hooks: [
      'I searched for chiropractors in {town} and you weren\'t appearing in the top results on Google Maps',
      'I tried to book an appointment on your website and couldn\'t find an easy way to do it',
      'I noticed you have very few Google reviews compared to other practices nearby',
      'Your treatment descriptions are very clinical â most patients search in plain language and need reassurance'
    ],
    buzzwords: ['new patient bookings', 'patient retention', 'treatment plans', 'recall rate', 'no-shows', 'referrals', 'appointment capacity'],
    resultTerms: ['more new patient bookings', 'higher patient retention', 'fewer no-shows', 'a fuller appointment book']
  },

  marketing: {
    label: 'Marketing Agencies',
    sizeLabel: 'agency',
    painPoints: [
      'high client churn after the first 3 months',
      'over-reliance on referrals for new business',
      'struggling to differentiate from competitors',
      'long sales cycles with inconsistent close rates',
      'proposal process is slow and bespoke',
      'no strong thought leadership or case studies'
    ],
    hooks: [
      'I noticed your case studies don\'t include specific results figures â that\'s often the first thing a prospect looks for',
      'I searched for marketing agencies specialising in {niche} and you weren\'t appearing in the results',
      'I read your website and it\'s quite similar in tone to most of your competitors â there\'s a real opportunity to stand out',
      'Most agency owners I speak to say their biggest bottleneck is new business development'
    ],
    buzzwords: ['retainer clients', 'MRR', 'churn rate', 'sales pipeline', 'case studies', 'onboarding', 'scope creep'],
    resultTerms: ['a stronger new business pipeline', 'more retained clients', 'higher MRR', 'faster sales cycles']
  },

  recruiter: {
    label: 'Recruiters & Staffing Agencies',
    sizeLabel: 'recruitment agency',
    painPoints: [
      'over-reliance on job boards for candidates',
      'losing clients to larger competitors',
      'website doesn\'t attract employer enquiries',
      'no strong niche positioning',
      'slow time-to-fill is affecting client satisfaction',
      'no inbound marketing strategy'
    ],
    hooks: [
      'I searched for recruitment agencies specialising in {sector} and you weren\'t appearing prominently',
      'I visited your website and it was difficult to understand what makes you the go-to agency for {sector} hiring',
      'I noticed you\'re competing head-to-head on job boards with much larger agencies â that\'s a tough game to win',
      'Most recruiters I speak to say their biggest challenge is winning new clients, not finding candidates'
    ],
    buzzwords: ['placements', 'time-to-fill', 'PSL', 'contingency', 'retained search', 'candidate pipeline', 'client wins'],
    resultTerms: ['more inbound client enquiries', 'faster placements', 'a stronger niche reputation', 'less reliance on job boards']
  },

  coaching: {
    label: 'Life & Business Coaches',
    sizeLabel: 'coaching practice',
    painPoints: [
      'inconsistent client flow month to month',
      'under-pricing and struggling to raise rates',
      'no automated lead generation or funnel',
      'not visible enough online in a crowded market',
      'discovery calls aren\'t converting well',
      'no clear niche positioning'
    ],
    hooks: [
      'I came across your profile and noticed you don\'t have a clear lead magnet or entry point to your work',
      'I visited your website and it was hard to understand who specifically you help and what outcome they get',
      'Most coaches I speak to have inconsistent months because they stop marketing when client work picks up',
      'I noticed you don\'t have a content strategy to build authority â that\'s the fastest way to raise your rates'
    ],
    buzzwords: ['high-ticket clients', 'discovery calls', 'conversion rate', 'programme enrolment', 'recurring revenue', 'niche authority'],
    resultTerms: ['consistent client enrolments', 'higher programme prices', 'more discovery calls booked', 'predictable monthly revenue']
  },

  photographer: {
    label: 'Photographers & Videographers',
    sizeLabel: 'creative studio',
    painPoints: [
      'enquiry flow is feast or famine',
      'not showing up for local search',
      'website portfolio isn\'t converting visitors to enquiries',
      'low-quality leads who only care about price',
      'no referral or repeat booking strategy',
      'social media presence is inconsistent'
    ],
    hooks: [
      'I searched for {type} photographers in {town} and you weren\'t showing up in Google',
      'I visited your portfolio site and noticed there\'s no clear call to action to get in touch',
      'I noticed your Instagram is updated sporadically â consistency is everything for a creative portfolio',
      'Most photographers I speak to want better quality enquiries, not just more volume'
    ],
    buzzwords: ['enquiry rate', 'booking conversion', 'shoot days', 'day rate', 'licensing fees', 'referral network', 'retainer clients'],
    resultTerms: ['a steadier enquiry flow', 'better quality leads', 'higher booking rates', 'a stronger creative reputation']
  },

  architect: {
    label: 'Architects & Interior Designers',
    sizeLabel: 'design practice',
    painPoints: [
      'project pipeline is unpredictable',
      'website doesn\'t reflect the quality of the work',
      'not ranking for local project type searches',
      'relying entirely on word of mouth and past clients',
      'proposal win rate is inconsistent',
      'not targeting the right project size or client type'
    ],
    hooks: [
      'I searched for architects specialising in {project_type} in {town} and you weren\'t appearing in the results',
      'I visited your website and the project photography doesn\'t do justice to the quality of the work',
      'I noticed you don\'t have any case studies explaining your design process â that\'s often what converts high-value clients',
      'Most practices I speak to win projects through relationships, but that makes growth very hard to predict'
    ],
    buzzwords: ['RIBA stages', 'planning applications', 'project pipeline', 'fee proposals', 'design-led', 'client brief', 'repeat commissions'],
    resultTerms: ['a more predictable project pipeline', 'higher-value commissions', 'a stronger online presence', 'better proposal win rates']
  },

  vet: {
    label: 'Veterinary Practices',
    sizeLabel: 'veterinary practice',
    painPoints: [
      'not attracting new pet owners from the local area',
      'low Google Maps visibility',
      'website doesn\'t differentiate you from corporate chains',
      'no online booking or appointment request system',
      'low review count vs. nearby practices',
      'no pet owner retention or reminder system'
    ],
    hooks: [
      'I searched for vets in {town} and noticed your practice wasn\'t showing up in the top results on Google Maps',
      'I tried to book an appointment on your website and found it hard to navigate',
      'I noticed your practice has fewer Google reviews than some of the corporate chains nearby â and independent practices can absolutely win on that front',
      'I couldn\'t find any information about your vets or their specialisms on the website'
    ],
    buzzwords: ['new patient registrations', 'appointment capacity', 'preventive care', 'repeat visits', 'client retention', 'referrals'],
    resultTerms: ['more new pet owner registrations', 'a fuller appointment book', 'stronger community trust', 'more online visibility']
  },

  childcare: {
    label: 'Childcare & Nurseries',
    sizeLabel: 'nursery',
    painPoints: [
      'unfilled nursery places / waiting list management',
      'not showing up in local searches',
      'website doesn\'t clearly communicate your OFSTED rating',
      'no online enquiry or registration system',
      'low online review presence',
      'struggling to retain staff, affecting reputation'
    ],
    hooks: [
      'I searched for nurseries in {town} and noticed you weren\'t appearing prominently in Google',
      'I visited your website and couldn\'t quickly find your OFSTED rating or what makes your setting special',
      'I noticed you don\'t have many Google reviews â for parents choosing childcare, reviews are one of the most important trust signals',
      'Parents I speak to say they\'ll visit 3â5 nurseries before deciding, and the online presence is what gets them through the door'
    ],
    buzzwords: ['nursery places', 'OFSTED', 'funded hours', 'waiting list', 'key workers', 'parent communication', 'settling in'],
    resultTerms: ['more nursery enquiries', 'a shorter time to fill empty places', 'stronger online trust signals', 'better parent communication']
  },

  software: {
    label: 'Software / SaaS Companies',
    sizeLabel: 'SaaS company',
    painPoints: [
      'high churn in the first 30 days',
      'low trial-to-paid conversion rate',
      'onboarding process is confusing for new users',
      'not ranking for bottom-of-funnel keywords',
      'sales cycle is long and manual',
      'customer success is reactive rather than proactive'
    ],
    hooks: [
      'I signed up for a free trial of your product and noticed the onboarding flow has a few drop-off points',
      'I searched for tools that do {function} and you weren\'t appearing in the top results',
      'I noticed your G2 / Capterra profile doesn\'t have many recent reviews â that\'s a significant trust signal for B2B buyers',
      'I went through your trial experience and there wasn\'t a clear next step after signup'
    ],
    buzzwords: ['MRR', 'churn', 'LTV:CAC', 'trial conversions', 'activation rate', 'NPS', 'customer success', 'expansion revenue'],
    resultTerms: ['a higher trial-to-paid rate', 'lower 30-day churn', 'faster time to value', 'more expansion revenue']
  },

  retail: {
    label: 'Retail Shops',
    sizeLabel: 'retail business',
    painPoints: [
      'foot traffic is declining without a strong online presence',
      'no ecommerce channel to complement the physical store',
      'poor local SEO visibility',
      'no email list or loyalty programme',
      'social media is updated inconsistently',
      'competing on price with large online retailers'
    ],
    hooks: [
      'I searched for {product_type} shops in {town} and your store wasn\'t showing up online',
      'I visited your website and noticed there\'s no way to browse or purchase your products online',
      'I noticed your social media presence is quite sparse â for a local retailer, that\'s often the main discovery channel',
      'Most independent retailers I speak to are losing foot traffic and haven\'t built a digital revenue stream yet'
    ],
    buzzwords: ['footfall', 'basket size', 'repeat customers', 'loyalty', 'online orders', 'local marketing', 'click and collect'],
    resultTerms: ['more footfall', 'a new online revenue stream', 'stronger local visibility', 'a loyal customer base']
  }
};

/* âââââââââââââââââââââââââââââââââââââââââââââ
   SPAM WORD LIST (55+ trigger words)
   âââââââââââââââââââââââââââââââââââââââââââââ */
const SPAM_WORDS = [
  'free', 'guaranteed', 'winner', 'click here', 'act now', 'limited time',
  'urgent', 'offer expires', 'risk-free', 'no risk', 'no cost', 'no obligation',
  'incredible', 'amazing', 'unbelievable', 'once in a lifetime', 'best price',
  'lowest price', 'double your', 'earn extra', 'extra cash', 'make money',
  'cash bonus', 'big bucks', 'million dollars', 'money back', 'credit card',
  'order now', 'buy now', 'sign up free', '100% free', 'apply now',
  'special offer', 'special promotion', 'dear friend', 'congratulations',
  'you have been selected', 'you are a winner', 'claim your', 'claim now',
  'opt in', 'unsubscribe', 'miracle', 'lose weight', 'weight loss',
  'work from home', 'be your own boss', 'financial freedom', 'get rich',
  'passive income', 'multi level', 'pyramid', 'unlimited', 'obligation free',
  'while supplies last', 'exclusive deal', 'bonus', 'prize'
];

/* âââââââââââââââââââââââââââââââââââââââââââââ
   EMAIL FRAMEWORK TEMPLATES
   Each framework has 3+ variants.
   Placeholders: {name} {company} {contact} {service}
   {painPoint} {result} {cta} {hook} {buzzword}
   {sizeLabel} {resultTerm}
   âââââââââââââââââââââââââââââââââââââââââââââ */
const FRAMEWORKS = {

  aida: {
    label: 'AIDA',
    variants: [
      // Variant A â curiosity opener
      (d) => `Hi ${d.contact},

${d.hook ? d.hook + '\n\n' : ''}I help ${d.sizeLabel}s like ${d.company} tackle one of the biggest problems in the industry right now: ${d.painPoint}.

Most ${d.sizeLabel} owners I speak to have tried to fix this themselves â but without the right system in place, it's like trying to fill a bucket with a hole in it.

We've helped businesses similar to yours achieve ${d.resultTerm}, typically within the first 60 days of working together.

I'd love to show you how it could work for ${d.company} specifically â no pitch, just a quick ${d.cta}.

Worth a conversation?

Best,
${d.yourName}`,

      // Variant B â stat-led opener
      (d) => `Hi ${d.contact},

${d.hook ? d.hook + '\n\n' : ''}Here's a question I ask every ${d.sizeLabel} owner I meet: how much revenue are you losing right now to ${d.painPoint}?

Most can't answer â and that's exactly the problem.

${d.company} could be leaving significant money on the table without realising it. With the right ${d.service} approach, ${d.sizeLabel}s in your space are seeing ${d.resultTerm} â consistently.

I've put together a few specific ideas for ${d.company} that I think you'd find genuinely useful.

The next step is simple: ${d.cta}. No hard sell, just a proper conversation.

Let me know if that sounds good.

${d.yourName}`,

      // Variant C â story opener
      (d) => `Hi ${d.contact},

${d.hook ? d.hook + '\n\n' : ''}A ${d.sizeLabel} owner I worked with last year was in a very similar position to where ${d.company} might be right now â struggling with ${d.painPoint} and not sure where to start.

Six weeks later, they had ${d.resultTerm}. The difference? A focused ${d.service} strategy built specifically around their business.

I think there's a real opportunity to do something similar for ${d.company}, and I'd love to walk you through what that could look like.

If you're open to it, ${d.cta} â 20 minutes is all it takes.

Talk soon,
${d.yourName}`
    ]
  },

  pas: {
    label: 'PAS',
    variants: [
      // Variant A â empathy-led
      (d) => `Hi ${d.contact},

${d.hook ? d.hook + '\n\n' : ''}${d.painPoint.charAt(0).toUpperCase() + d.painPoint.slice(1)} is one of those problems that's easy to push to the back burner â until it starts costing you real money.

For most ${d.sizeLabel}s, it's not just an inconvenience. It's lost customers, lost revenue, and a growing gap between you and the competition who've already figured it out.

That's where my ${d.service} work comes in. I help ${d.sizeLabel}s like ${d.company} fix this at the root â not with generic advice, but with a system that's been proven to deliver ${d.resultTerm}.

Would it make sense to have a quick chat? ${d.cta} and we can see if it's a fit.

${d.yourName}`,

      // Variant B â sharp, punchy
      (d) => `Hi ${d.contact},

${d.hook ? d.hook + '\n\n' : ''}Problem: ${d.company} is dealing with ${d.painPoint}.

Why it matters: every week this goes unaddressed, your competitors are picking up the customers you should be getting.

The fix: a targeted ${d.service} strategy that addresses exactly this â and gets ${d.company} to ${d.resultTerm} without the usual agency runaround.

I work specifically with ${d.sizeLabel}s, so I know this space inside out.

${d.cta} â I'll keep it short and make it worth your time.

${d.yourName}`,

      // Variant C â provocative opener
      (d) => `Hi ${d.contact},

${d.hook ? d.hook + '\n\n' : ''}What's the cost of ${d.painPoint} to ${d.company} over the next 12 months?

It's a question worth sitting with â because for most ${d.sizeLabel}s, the answer is uncomfortable.

The businesses that are winning in your space right now aren't smarter or better resourced. They've just solved this problem first.

I specialise in helping ${d.sizeLabel}s do exactly that through ${d.service} â and the results speak for themselves: ${d.resultTerm} is what we aim for from day one.

If you're open to a quick conversation, ${d.cta}. I won't waste your time.

Best,
${d.yourName}`
    ]
  },

  bab: {
    label: 'BAB',
    variants: [
      // Variant A â before/after contrast
      (d) => `Hi ${d.contact},

${d.hook ? d.hook + '\n\n' : ''}Before: ${d.company} is dealing with ${d.painPoint} â something that's holding the business back from its real potential.

After: imagine ${d.resultTerm}, with a clear system in place so it keeps compounding month after month.

The bridge: that's exactly what my ${d.service} work delivers for ${d.sizeLabel}s like yours.

I've helped similar businesses make this shift, and I genuinely think there's a strong opportunity to do the same for ${d.company}.

Happy to walk you through it â ${d.cta} and let's see what's possible.

${d.yourName}`,

      // Variant B â narrative contrast
      (d) => `Hi ${d.contact},

${d.hook ? d.hook + '\n\n' : ''}Right now, ${d.company} is probably experiencing something familiar: ${d.painPoint}. It's frustrating, and it's costing you more than you realise.

Now picture a different scenario â one where that problem is solved, and you're seeing ${d.resultTerm} instead. That's not a pipe dream; it's what happens when the right ${d.service} system is in place.

The path from where you are to where you want to be is shorter than you think, and I'd like to show you exactly how.

${d.cta} â for no commitments, just a proper look at what's possible for ${d.company}.

${d.yourName}`,

      // Variant C â direct transformation
      (d) => `Hi ${d.contact},

${d.hook ? d.hook + '\n\n' : ''}Most ${d.sizeLabel}s I talk to are stuck with the same challenge: ${d.painPoint}. Sound familiar?

The good news is there's a clear path through it â and the businesses that have made it to the other side are now achieving ${d.resultTerm}.

As someone who works exclusively with ${d.sizeLabel}s on ${d.service}, I now exactly what that journey looks like. I think I could help ${d.company} get there significantly faster.

Would you be open to a quick call? ${d.cta} â I'll make it worth 20 minutes of your time.

Warm regards,
${d.yourName}`
    ]
  },

  straight: {
    label: 'Straight-Line',
    variants: [
      // Variant A â bullets, confident
      (d) => `Hi ${d.contact},

${d.hook ? d.hook + '\n\n' : ''}I help ${d.sizeLabel}s solve ${d.painPoint}.

Here's what that looks like in practice:

â Targeted ${d.service} built specifically for ${d.sizeLabel}s like ${d.company}
â Measurable results: ${d.resultTerm}
â No long-term lock-in, no fluff

If this is a priority for ${d.company} right now, ${d.cta}. Takes 15 minutes.

${d.yourName}`,

      // Variant B â ultra-short
      (d) => `Hi ${d.contact},

${d.hook ? d.hook + '\n\n' : ''}Quick one.

I specialise in ${d.service} for ${d.sizeLabel}s. I noticed ${d.company} might be dealing with ${d.painPoint}.

We fix that. Our clients typically see ${d.resultTerm}.

${d.cta}?

${d.yourName}`,

      // Variant C â confident assertion
      (d) => `Hi ${d.contact},

${d.hook ? d.hook + '\n\n' : ''}I'll keep this brief.

${d.company} has a ${d.painPoint} problem. I help ${d.sizeLabel}s fix it.

My ${d.service} clients don't just see improvement â they see ${d.resultTerm}, usually within 60 days.

If you want to know how, ${d.cta}. I'll send over a quick overview specific to ${d.company} before we speak.

${d.yourName}`
    ]
  },

  valuefirst: {
    label: 'Value-First',
    variants: [
      // Variant A â free insight
      (d) => `Hi ${d.contact},

${d.hook ? d.hook + '\n\n' : ''}Before I say anything about what I do, I wanted to share something that might be useful for ${d.company}.

One of the most common (and fixable) reasons ${d.sizeLabel}s struggle with ${d.painPoint} is a lack of a consistent, repeatable system â rather than effort or budget. Most businesses in your space try to solve it with one-off tactics rather than a joined-up approach, and it costs them every month.

I work in ${d.service} specifically for ${d.sizeLabel}s, and that's the one shift that consistently leads to ${d.resultTerm} for the businesses I work with.

If that resonates at all, I'd love to share a few more specific thoughts for ${d.company}. No pitch â just ${d.cta} to see if it's worth exploring further.

${d.yourName}`,

      // Variant B â quick tip
      (d) => `Hi ${d.contact},

${d.hook ? d.hook + '\n\n' : ''}I spend a lot of time working with ${d.sizeLabel}s on ${d.service}, so I see the same patterns again and again. Here's one that might be relevant to ${d.company}:

The biggest lever for solving ${d.painPoint} usually isn't more budget or more effort â it's a clearer strategy and the right infrastructure behind it. Once that's in place, ${d.resultTerm} tends to follow quickly.

I put this into practice for ${d.sizeLabel}s every day. I think there's a real opportunity for ${d.company} here, and I'd love to show you what it could look like specifically.

${d.cta} â I'm happy to make it a short, useful conversation with no commitment required.

Best,
${d.yourName}`,

      // Variant C â insight then bridge
      (d) => `Hi ${d.contact},

${d.hook ? d.hook + '\n\n' : ''}Here's something I've noticed working with ${d.sizeLabel}s across the industry: the ones that crack ${d.painPoint} rarely do it by working harder. They do it by fixing the underlying system.

Once that's sorted, the results compound â which is how our clients consistently achieve ${d.resultTerm} without burning more time or budget.

I specialise in ${d.service} for ${d.sizeLabel}s, and I'm confident there's an opportunity to do something similar for ${d.company}. I'd love to share a couple of specific ideas.

If you're open to it, ${d.cta}. Happy to keep it brief.

${d.yourName}`
    ]
  }
};

/* âââââââââââââââââââââââââââââââââââââââââââââ
   SUBJECT LINE TEMPLATES
   3 families Ã 3 variations = 9 options,
   pick 3 randomly per generation.
   âââââââââââââââââââââ
