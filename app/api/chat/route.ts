import { azure, createAzure } from "@ai-sdk/azure";
import { frontendTools } from "@assistant-ui/react-ai-sdk";
import { streamText, convertToModelMessages, type UIMessage } from "ai";
import {
  experimental_createMCPClient as createMCPClient,
  experimental_listPrompts as listPrompts,
  experimental_getPrompt as getPrompt,
} from "@ai-sdk/mcp";

export const maxDuration = 30;

const mcpClient = await createMCPClient({
  // TODO adjust this to point to your MCP server URL
  transport: {
    type: "http",
    url: process.env.MCP_SERVER_URL || "http://localhost:9000/mcp",
  },
});

const mcpTools = await mcpClient.tools();

const prompts = await mcpClient.listPrompts()

const prompt = await mcpClient.getPrompt({
  name: 'award_type_codes_guide'
})

export async function POST(req: Request) {
  const {
    messages,
    system,
    tools,
  }: { messages: UIMessage[]; system?: string; tools?: any } = await req.json();

  const result = streamText({
    model: azure("gpt-4.1-mini"),
    messages: convertToModelMessages(messages),
    system,
    tools: {
      ...mcpTools,
      ...frontendTools(tools),
      // add backend tools here
    },
    providerOptions: {},
  });

  return result.toUIMessageStreamResponse({
    sendReasoning: true,
  });
}
