## Getting Started

Set the following env variables in the `.env.local` file:

```
OPENAI_API_KEY=Fnxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
AZURE_RESOURCE_NAME=openai-xxxxxxxxxxxxxxxxxxxx
# This one is optional and defaults to http://localhost:9000/mcp
MCP_SERVER_URL=http://localhost:8000/mcp
```

Install the dependencies:
```
npm i
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
