import type { ToolCallMessagePartComponent } from "@assistant-ui/react";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const formatArgs = (args) => {
  try {
    const parsedArgs = JSON.parse(args);
    return JSON.stringify(parsedArgs, null, 2);
  } catch (err) {
    console.error("Error parsing args", err)
    return args
  }
}

// use zod, typescript, or ai sdk types for this
// Should be built into assistant-ui or ai-sdk somewhere
const formatResult= (originalResult) => {
  let result = originalResult;
  if (result === undefined || result === null) {
    return '--';
  }
  if (result.isError) {
    // Maybe show red or something.
    try {
      const prettyFormat = JSON.stringify(result, null, 2);
      return prettyFormat;
    } catch (err) {
      console.error("Error formatting error response", result);
      return '--'
    }
  }
  if (Array.isArray(result.content) === false) {
    try {
      const prettyFormat = JSON.stringify(result);
      return prettyFormat;
    } catch (err) {
      console.error("Error formatting non array", result)
      return '--'
    }
  }
  if (result.content.length !== 1) {
    console.warn("Tool response was not expected structure, expecting array of length 1. Instead got", result.content.length)
    try {
      const prettyFormat = JSON.stringify(result, null, 2);
      return prettyFormat;
    } catch (err) {
      console.error('Error formatting response with length greater than 1')
      return '--';
    }
  }
  if (result.content[0].type === 'text') {
    result = structuredClone(originalResult);
    let parsedText = result.content[0].text;
    try {
      parsedText = JSON.parse(parsedText);
      result.content[0].text = parsedText;
      return JSON.stringify(result, null, 2);
    } catch (err) {
      console.error("Error parsing tool response text", err);
    }
  }
  return result;
}

export const ToolFallback: ToolCallMessagePartComponent = ({
  toolName,
  argsText,
  result,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const parsedArgs = formatArgs(argsText);
  const parsedResult = formatResult(result);

  return (
    <div className="aui-tool-fallback-root mb-4 flex w-full flex-col gap-3 rounded-lg border py-3">
      <div className="aui-tool-fallback-header flex items-center gap-2 px-4">
        <CheckIcon className="aui-tool-fallback-icon size-4" />
        <p className="aui-tool-fallback-title flex-grow">
          Used tool: <b>{toolName}</b>
        </p>
        <Button onClick={() => setIsCollapsed(!isCollapsed)}>
          {isCollapsed ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </Button>
      </div>
      {!isCollapsed && (
        <div className="aui-tool-fallback-content flex flex-col gap-2 border-t pt-2">
          <div className="aui-tool-fallback-args-root px-4">
            <pre className="aui-tool-fallback-args-value whitespace-pre-wrap">
              {parsedArgs}
            </pre>
          </div>
          {result !== undefined && (
            <div className="aui-tool-fallback-result-root border-t border-dashed px-4 pt-2">
              <p className="aui-tool-fallback-result-header font-semibold">
                Result:
              </p>
              <pre className="aui-tool-fallback-result-content whitespace-pre-wrap">
                { parsedResult }
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
