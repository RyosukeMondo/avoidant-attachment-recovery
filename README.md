# Avoidant Attachment Recovery — Book Summaries

AI-summarized insights from books on attachment theory, avoidant attachment recovery, trauma healing, and evidence-based therapeutic approaches.

## Structure

```
├── data/summaries/      # AI-generated summaries (source of truth)
├── data/books/          # Extracted book texts (gitignored — copyright)
├── src/
│   ├── lib/data.ts      # Typed data layer
│   ├── components/      # React components (Nav, BookCard)
│   ├── pages/           # Page components (Home, BookDetail, Category)
│   └── data/            # Generated JSON manifest (prebuild)
├── scripts/
│   └── generate-data.mjs  # Prebuild: txt → JSON
├── docs/                # Built site (Vite output → GitHub Pages)
└── vite.config.ts
```

## Development

```bash
npm install
npm run dev      # Start dev server
npm run build    # Prebuild data + typecheck + Vite build
```

## Categories

Books are tagged into: Attachment Theory, Trauma & Nervous System, EFT & Couples Therapy, Schema Therapy, Internal Family Systems, ACT / DBT, Interpersonal Neurobiology, Intimacy & Connection, Self-Help & Recovery, Psychology.

## License

Summaries are AI-generated transformative analysis for educational purposes.
