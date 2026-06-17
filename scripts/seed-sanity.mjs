import { createClient } from '@sanity/client';

const token = process.env.SANITY_TOKEN;
if (!token) {
  console.error('Missing SANITY_TOKEN env var. Run: SANITY_TOKEN=your_token node scripts/seed-sanity.mjs');
  process.exit(1);
}

const client = createClient({
  projectId: '3secccgm',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
});

let keyCounter = 1;
const key = () => `key${String(keyCounter++).padStart(6, '0')}`;

function parseInline(text) {
  const spans = [];
  const regex = /\*\*(.+?)\*\*|\*(.+?)\*|_(.+?)_|`(.+?)`/g;
  let last = 0;
  let match;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) {
      spans.push({ _type: 'span', _key: key(), text: text.slice(last, match.index), marks: [] });
    }
    if (match[1] !== undefined) spans.push({ _type: 'span', _key: key(), text: match[1], marks: ['strong'] });
    else if (match[2] !== undefined) spans.push({ _type: 'span', _key: key(), text: match[2], marks: ['em'] });
    else if (match[3] !== undefined) spans.push({ _type: 'span', _key: key(), text: match[3], marks: ['em'] });
    else if (match[4] !== undefined) spans.push({ _type: 'span', _key: key(), text: match[4], marks: ['code'] });
    last = match.index + match[0].length;
  }
  if (last < text.length) {
    spans.push({ _type: 'span', _key: key(), text: text.slice(last), marks: [] });
  }
  return spans.length ? spans : [{ _type: 'span', _key: key(), text, marks: [] }];
}

function mdToBlocks(md) {
  const blocks = [];
  const lines = md.trim().split('\n');
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();
    if (!trimmed) { i++; continue; }
    if (trimmed.startsWith('## ')) {
      blocks.push({ _type: 'block', _key: key(), style: 'h2', markDefs: [], children: [{ _type: 'span', _key: key(), text: trimmed.slice(3), marks: [] }] });
    } else if (trimmed.startsWith('### ')) {
      blocks.push({ _type: 'block', _key: key(), style: 'h3', markDefs: [], children: [{ _type: 'span', _key: key(), text: trimmed.slice(4), marks: [] }] });
    } else if (trimmed.startsWith('- ')) {
      blocks.push({ _type: 'block', _key: key(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [], children: parseInline(trimmed.slice(2)) });
    } else if (/^\d+\.\s/.test(trimmed)) {
      blocks.push({ _type: 'block', _key: key(), style: 'normal', listItem: 'number', level: 1, markDefs: [], children: parseInline(trimmed.replace(/^\d+\.\s/, '')) });
    } else {
      blocks.push({ _type: 'block', _key: key(), style: 'normal', markDefs: [], children: parseInline(trimmed) });
    }
    i++;
  }
  return blocks;
}

async function upsert(doc) {
  await client.createOrReplace(doc);
  console.log(`✓ ${doc._type}: ${doc._id ?? doc.title ?? ''}`);
}

async function seed() {
  console.log('\n🌱 Seeding Sanity...\n');

  // Site Settings
  await upsert({
    _id: 'siteSettings',
    _type: 'siteSettings',
    siteName: 'Applikation Limited',
    siteDescription: 'Growth & Innovation Partner — embedded, practical, results-driven.',
    footerTagline: 'Growth & Innovation Partner — embedded, practical, results-driven.',
    footerBookingStatus: 'Booking Q3 · 2026',
    footerLocations: ['Isle of Man — IM1 1JA', 'Manchester — M1 7JR'],
    copyrightText: '© 2026 Applikation Limited',
    logoCarousel: ['Annabel Karmel', 'ProvaRISK', 'Total Active Hub', 'Bioscore', 'Locus Security', 'Wellspace', 'Value for Venues', 'Optimise Your Marketing', 'Chlikk', 'Pocket Inspector', 'Olivier Mythodrama', 'Karmel & Co'],
    navLinks: [
      { _key: key(), label: 'Services', href: '/#services', isCta: false },
      { _key: key(), label: 'Work', href: '/#work', isCta: false },
      { _key: key(), label: 'Process', href: '/#process', isCta: false },
      { _key: key(), label: 'About', href: '/#about', isCta: false },
      { _key: key(), label: "Let's talk →", href: '/#contact', isCta: true },
    ],
  });

  // Homepage Content
  await upsert({
    _id: 'homepageContent',
    _type: 'homepageContent',
    heroEyebrow: 'Growth & Innovation Partner',
    heroHeadline: "Bring us in. We'll show you what's possible.",
    heroSubheadline: "We embed inside your business — driving real innovation, building new revenue streams, and making AI work for you. Not theory. Results.",
    heroCtaPrimary: 'Start a conversation →',
    heroCtaSecondary: 'See our work',
    aboutEyebrow: 'About us',
    aboutHeadline: 'Your Growth & Innovation Partner.',
    aboutBody: mdToBlocks("Applikation Limited was built on a simple belief: agencies should be invisible no more. We embed ourselves within businesses, drive real change from the inside, and bring the fearless thinking that internal teams sometimes can't."),
    servicesEyebrow: 'What we do',
    servicesHeadline: 'Built to move fast. Built to last.',
    processEyebrow: 'How we work',
    processHeadline: 'Embedded. Honest. Fast.',
    contactHeadline: "Let's find out what's possible.",
    contactSubtext: 'No sales pitch. Just an honest conversation about where you want to go and how we might help you get there faster.',
    contactEmail: 'hello@applikation.co.uk',
  });

  // Services
  const services = [
    { order: 1, tag: '// 01 — STRATEGY', title: 'AI Strategy', description: 'We cut through the hype and build a practical AI roadmap that aligns with your goals — identifying where automation and intelligence can create the biggest impact.', bullets: [] },
    { order: 2, tag: '// 02 — BUILD', title: 'Product Development', description: 'From early concept to launch-ready product, we design and build digital products that are intuitive, scalable, and deeply rooted in user needs.', bullets: [] },
    { order: 3, tag: '// 03 — INNOVATE', title: 'Development Innovation', description: "We don't just build to spec — we challenge assumptions and introduce modern engineering practices that future-proof what you're building today.", bullets: [] },
    { order: 4, tag: '// 04 — AUTOMATE', title: 'Process Automation', description: 'Manual processes slow teams down and introduce risk. We identify, design, and implement automations that free your people up to focus on what matters.', bullets: [] },
  ];
  for (const s of services) {
    await upsert({ _id: `service-${s.order}`, _type: 'service', ...s });
  }

  // Process Steps
  const steps = [
    { order: 1, number: '01', title: 'Discovery', description: "We get under the skin of your business — your goals, blockers, and the biggest opportunities hiding in plain sight." },
    { order: 2, number: '02', title: 'Strategy', description: "A practical, prioritised plan — not a 60-page deck. Clear, actionable, built around your actual constraints." },
    { order: 3, number: '03', title: 'Build', description: "We move fast without cutting corners. Iterative delivery, constant feedback, real users involved from day one." },
    { order: 4, number: '04', title: 'Scale', description: "We don't disappear after launch. We stay embedded, measuring impact and continuing to drive growth." },
  ];
  for (const s of steps) {
    await upsert({ _id: `processStep-${s.order}`, _type: 'processStep', ...s });
  }

  // Testimonials
  const testimonials = [
    { order: 1, quote: "They didn't behave like an agency. They behaved like part of our team — and shipped things our internal crew had been stuck on for a year.", name: 'Annabel Karmel', role: 'Founder // Annabel Karmel' },
    { order: 2, quote: "We went from paper forms to real-time visibility across hundreds of field engineers. Adoption was the part I worried about — it turned out to be the easy part.", name: 'Operations Director', role: 'Field Services // Pocket Inspector' },
    { order: 3, quote: "Practical, fast, and refreshingly free of jargon. They cut through the AI hype and built something that actually moved our numbers.", name: 'Head of Product', role: 'Risk Platform // ProvaRISK' },
    { order: 4, quote: "They asked the questions our own team had stopped asking. The result was a product that finally felt like us — only sharper.", name: 'Managing Director', role: 'Wellness Platform // Wellspace' },
    { order: 5, quote: "Most partners disappear after launch. This lot stayed embedded, kept measuring, and kept pushing the numbers in the right direction.", name: 'Founder', role: 'Venue Tech // Value for Venues' },
    { order: 6, quote: "Calm, capable, and honest about trade-offs. We trusted them with our hardest problem and they didn't flinch.", name: 'CTO', role: 'Security // Locus Security' },
  ];
  for (const t of testimonials) {
    await upsert({ _id: `testimonial-${t.order}`, _type: 'testimonial', ...t });
  }

  // Blog Posts
  const blogPosts = [
    {
      _id: 'blog-ai-infrastructure',
      slug: 'ai-infrastructure',
      title: "AI isn't magic — it's infrastructure. Here's how to build it right.",
      category: 'AI Strategy',
      excerpt: "Most businesses are approaching AI backwards — starting with the tool, not the problem. We break down how to build an AI strategy that creates real, lasting value rather than just ticking a box.",
      author: 'Applikation Team',
      pubDate: '2026-04-01',
      readTime: '6 min read',
      featured: true,
      body: mdToBlocks(`Most businesses are approaching AI backwards.

They see a shiny new tool — a chatbot, a co-pilot, an image generator — and ask: "how do we use this?" That's the wrong starting point. The right question is: "where in our business do we have a problem that intelligence could solve?"

The distinction sounds subtle. The outcomes are very different.

## Start with the problem, not the technology

When a business leads with the tool, they end up with AI bolted onto existing workflows. A chatbot that answers the same questions the FAQ page already answers. An image generator that saves the design team an hour a week. Useful, maybe. Transformational, no.

When a business leads with the problem, they ask different questions:

- Where are we slowest, and why?
- Where do errors creep in, and what's the cost?
- What would we do if labour weren't a constraint?
- What data do we have that we're not using?

Those questions lead to real opportunities.

## AI as infrastructure, not a feature

The companies getting the most from AI aren't treating it as a product feature to ship. They're treating it as infrastructure — a layer that makes everything else faster, smarter, and more reliable.

Think about how the internet changed business. At first, companies built "internet features." Then the internet became infrastructure — invisible, assumed, built into everything. AI is on the same trajectory.

The implication: building an AI capability isn't a project with a launch date. It's an ongoing investment in how your organisation operates.

## What a practical AI strategy looks like

A good AI strategy isn't a 60-page deck. It's three things:

**1. An honest audit of where you are.** What data do you have? What workflows are you running? Where is human time being spent on things that pattern-matching could handle? Where is judgement genuinely required?

**2. A prioritised list of opportunities.** Not every opportunity is worth pursuing. The best ones have high value, reasonable complexity, and don't depend on data you don't have yet.

**3. A build order.** Start with the highest-value, lowest-complexity item. Ship it. Learn from it. Let the next decision follow.

That's it. Everything else is theatre.

## The honest part

AI isn't magic. It fails in predictable ways — it hallucinates, it overfits, it struggles with edge cases, it needs good data to produce good outputs.

A good AI strategy accounts for this. It includes evaluation frameworks, human review where it matters, and a clear-eyed view of where the technology is genuinely useful versus where it's being used to look innovative.

The businesses that will win with AI aren't the ones who moved fastest to adopt it. They're the ones who thought hardest about where it actually belongs.`),
    },
    {
      _id: 'blog-hidden-cost-manual',
      slug: 'hidden-cost-manual',
      title: "The hidden cost of manual processes — and what to do about it",
      category: 'Process Automation',
      excerpt: "Manual workflows aren't just slow — they're quietly draining your team's energy and your business's potential.",
      author: 'Applikation Team',
      pubDate: '2026-03-01',
      readTime: '4 min read',
      featured: false,
      body: mdToBlocks(`Every business has them. The spreadsheet that three people update manually every Monday. The report that gets copy-pasted into a deck. The approval email that goes to six inboxes and waits three days for a reply.

Individually, they feel like minor irritants. Together, they represent a significant drag on everything.

## The visible cost and the invisible one

The visible cost of manual processes is time. If your team spends four hours a week on a process that could be automated in minutes, that's four hours not spent on something that matters.

The invisible cost is more damaging: cognitive load.

Manual processes don't just consume time — they fragment attention. Every interruption to check a spreadsheet, chase an approval, or re-enter data from one system to another breaks focus on more complex work. The cost isn't just the minutes spent; it's the minutes it takes to get back into flow.

Multiply that across a team, across a year, and the number gets uncomfortable.

## Why businesses don't automate sooner

The most common reason we hear: "we've always done it this way, and it works."

The second most common: "we don't have the technical resource to change it."

Both are more about friction than reality. Most manual processes can be automated faster than people expect, and for far less cost. The barrier is usually starting — finding the time to look at the problem when the process is already consuming the time.

## Where to start

Pick the process that causes the most pain. Not the most complex one, not the most impressive one — the one that generates the most complaints, the most errors, or the most context switching.

Document it as it actually works today, not as it's supposed to work. (These are often different.) Identify every handoff, every manual entry point, every decision that a human makes.

Then ask: which of these decisions genuinely require judgement, and which are just pattern-matching? The pattern-matching is where automation belongs.

## The goal isn't to remove people

A common misconception: automation is about replacing headcount. It's not — or at least, it shouldn't be.

The goal is to remove the parts of the job that nobody would choose to do. The copy-pasting, the chasing, the data entry. Free the team from those, and you'll find out what they're actually capable of.

That's the real case for automation.`),
    },
    {
      _id: 'blog-new-revenue-streams-ai',
      slug: 'new-revenue-streams-ai',
      title: "New revenue streams in the age of AI: where to look first",
      category: 'Growth',
      excerpt: "AI isn't just about efficiency — it opens entirely new business models. Here's where we see the biggest opportunities.",
      author: 'Applikation Team',
      pubDate: '2026-01-01',
      readTime: '7 min read',
      featured: false,
      body: mdToBlocks(`Most conversations about AI in business focus on efficiency. Automating the repetitive, accelerating the slow, reducing the headcount on the predictable. That's real value — but it's not the whole story.

The more interesting question is: what can you build now that you couldn't build before?

## The efficiency trap

Efficiency gains are easy to see. You have a process. You automate it. You measure the time saved. Done.

Revenue creation is harder to see, because it requires imagining something that doesn't exist yet. But the businesses that will look back on this period as transformational won't be the ones that automated their expenses process. They'll be the ones that built a new product, entered a new market, or created a capability their competitors couldn't match.

## Where we see the opportunities

### Data products

Most businesses are sitting on data they've collected for operational reasons — transaction records, usage logs, customer behaviours — and doing nothing with it beyond internal reporting.

AI makes it possible to turn that data into something customers will pay for. Benchmarking products. Predictive insights. Recommendation engines built on proprietary signals. The raw material is already there.

### Personalisation at scale

Personalised products have always been valuable. They've also always been expensive to build, because customisation requires human effort.

AI removes that constraint. Products that adapt to individual users — in their onboarding, their content, their recommendations, their support — are now buildable at the same cost as one-size-fits-all alternatives. That's a genuine product advantage.

### New service categories

Some service businesses are discovering that AI lets them offer things they couldn't previously afford to offer. Analysis that used to require a senior consultant can now be delivered more broadly. Monitoring that used to require dedicated staff can run continuously.

This isn't about replacing the senior consultant — it's about expanding what the business can deliver without proportionally expanding its cost base.

### Vertical software

AI dramatically lowers the cost of building specialised software for specific industries or workflows. The market for software tailored to niche professional contexts — a specific regulatory regime, a specific operational workflow — is much larger than it was when that software required bespoke development.

## The starting point

None of these opportunities are free. They require investment in data infrastructure, in building the models, in designing the products around the AI capability.

The right starting point is a clear-eyed audit of what you have: your data, your customer relationships, your domain expertise. The best new revenue streams are usually adjacent to something you're already doing — not leaps into unfamiliar territory.

What can you offer, using data you already have, to customers who already trust you?

That's usually where the answer is.`),
    },
    {
      _id: 'blog-start-with-the-user',
      slug: 'start-with-the-user',
      title: "Why we start with the user, not the brief",
      category: 'Product Development',
      excerpt: "The best products aren't built to spec. They're built from a deep understanding of real people with real problems.",
      author: 'Applikation Team',
      pubDate: '2026-02-01',
      readTime: '5 min read',
      featured: false,
      body: mdToBlocks(`Every product brief contains assumptions. Most of them are reasonable. Some of them are wrong.

The assumptions that survive into the finished product — without ever being tested — are the ones that cause the most damage. Features built for users who don't exist. Flows optimised for the happy path that nobody actually takes. Copy written for a reader who already understands the product.

This is why we start with the user, not the brief.

## What "starting with the user" actually means

It doesn't mean ignoring the brief. The brief captures what the business needs — that's valuable and real. But the brief is a statement of intent, not a statement of truth.

Starting with the user means interrogating the assumptions in the brief before they become decisions in the product. It means talking to the people who will actually use the thing before you build it. It means watching people struggle with the existing solution, if there is one, rather than imagining how they use it.

It means being willing to discover that some of what's in the brief is wrong.

## The questions that matter

When we start a new product engagement, we're trying to answer a small set of questions:

**Who is this actually for?** Not the target demographic — the real person, with their real constraints, habits, and frustrations.

**What are they trying to do?** Not the task in the brief, but the underlying goal. People don't want to fill in a form; they want to complete an application. They don't want to use a dashboard; they want to understand what's happening in their business.

**What's getting in the way today?** What do they do instead? How does that fall short? What workarounds have they built?

**What does success feel like to them?** Not the metric in the business case — the actual experience of the thing working.

## The brief changes. That's fine.

When we do this work properly, the brief almost always changes. Sometimes it gets narrower — we discover that three proposed features are trying to solve one problem, and the solution is simpler. Sometimes it gets broader — we discover a need the business hadn't seen.

Either way, the product is better for it.

The goal isn't to validate what's already been decided. It's to build something that works.`),
    },
  ];
  for (const post of blogPosts) {
    const { slug, author, pubDate, readTime, ...rest } = post;
    await upsert({
      ...rest,
      _type: 'blogPost',
      slug: { _type: 'slug', current: slug },
      author,
      pubDate,
      readTime,
    });
  }

  // Case Studies
  const caseStudies = [
    {
      _id: 'case-pocket-inspector',
      slug: 'pocket-inspector',
      order: 1,
      tag: '// Product Development · AI',
      title: 'Pocket Inspector',
      description: 'A mobile-first inspection tool that replaced paper-based processes for field engineers. AI-assisted report generation cut completion time, reduced errors, and gave management real-time visibility — all from a phone.',
      stats: [
        { _key: key(), num: '70%', label: 'Reduction in report completion time' },
        { _key: key(), num: '98%', label: 'Accuracy rate vs. paper baseline' },
      ],
      hasPage: true,
      challenge: mdToBlocks("Inspection reports were handwritten on multi-part carbon forms, photographed on personal phones, and faxed or transcribed back at the office — sometimes days after the visit. Three compounding problems: data integrity errors on every transcription, latency that left head office blind to live issues, and a history of failed digital tools built for offices rather than the field."),
      approach: mdToBlocks("We embedded with engineers for the first three weeks — riding along on inspections, reviewing failed digital attempts, and rebuilding the workflow from scratch. The result was offline-first architecture, one-handed UX designed for gloves and rain, and AI-assisted report generation that turns structured field data into polished narratives without slowing the engineer down."),
      results: mdToBlocks("Within six weeks of rollout, head office had visibility they'd never had in twenty years of operation. Report completion time dropped 70%. Accuracy vs the paper baseline reached 98%. Adoption — historically the hard part — turned out to be the easy part."),
      pullQuote: "We went from paper forms to real-time visibility across hundreds of field engineers. Adoption was the part I worried about — it turned out to be the easy part.",
      pullQuoteAttribution: 'Operations Director, Pocket Inspector',
    },
    {
      _id: 'case-provarisk',
      slug: 'provarisk',
      order: 2,
      tag: '// AI Strategy · Automation',
      title: 'ProvaRISK',
      description: 'An intelligent risk monitoring and analysis platform. Machine-learning pipelines surface risk signals in real-time, giving teams the data they need to act decisively before issues escalate.',
      stats: [
        { _key: key(), num: '3×', label: 'Faster risk identification vs. manual' },
        { _key: key(), num: '60%', label: 'Reduction in manual analyst time' },
        { _key: key(), num: '40+', label: 'Risk signal sources integrated' },
        { _key: key(), num: '<2s', label: 'Signal-to-alert latency' },
      ],
      hasPage: true,
      challenge: mdToBlocks("Risk monitoring was a manual, time-intensive process. Analysts were spending the majority of their day aggregating data from disparate sources rather than acting on it. By the time a risk signal was identified and validated, the window to respond had often passed."),
      approach: mdToBlocks("We built a data ingestion layer that pulls from multiple sources, normalises the signals, and applies ML models tuned to the client's specific risk typology. The interface was designed around action, not observation — every signal links directly to a recommended response workflow."),
      results: mdToBlocks("Risk identification speed tripled versus the manual baseline. Analyst time spent on data aggregation dropped 60%, freeing the team to focus on judgement rather than mechanics."),
      pullQuote: "Practical, fast, and refreshingly free of jargon. They cut through the AI hype and built something that actually moved our numbers.",
      pullQuoteAttribution: 'Head of Product, ProvaRISK',
    },
    {
      _id: 'case-annabel-karmel',
      slug: 'annabel-karmel',
      order: 3,
      tag: '// Product · Innovation',
      title: 'Annabel Karmel',
      description: 'Reimagining the digital experience for one of the UK\'s most trusted baby and toddler nutrition brands — a personalised platform that helps parents discover recipes, track nutrition, and build healthy habits.',
      stats: [
        { _key: key(), num: '2×', label: 'Increase in digital engagement' },
        { _key: key(), num: '4.8★', label: 'App Store rating' },
        { _key: key(), num: '240K', label: 'Monthly active users in year one' },
        { _key: key(), num: '68%', label: 'Improvement in session depth' },
      ],
      hasPage: true,
      challenge: mdToBlocks("The existing digital presence didn't reflect the depth and quality of the brand. Content was hard to navigate, personalisation was non-existent, and the app hadn't kept pace with user expectations. Parents were churning before they found the value."),
      approach: mdToBlocks("We started with user research — speaking to parents across different stages to understand what they actually needed. The result was a recipe discovery engine with smart filtering, a nutrition tracker tailored to developmental stage, and a content feed that adapts based on the child's age."),
      results: mdToBlocks("Digital engagement doubled versus the pre-launch baseline. The app hit 4.8 stars with over 12,000 reviews, and reached 240,000 monthly active users within the first year."),
      pullQuote: "They didn't behave like an agency. They behaved like part of our team — and shipped things our internal crew had been stuck on for a year.",
      pullQuoteAttribution: 'Annabel Karmel, Founder',
    },
  ];
  for (const cs of caseStudies) {
    const { slug, ...rest } = cs;
    await upsert({ ...rest, _type: 'caseStudy', slug: { _type: 'slug', current: slug } });
  }

  console.log('\n✅ Seed complete!\n');
}

seed().catch(err => { console.error(err); process.exit(1); });
