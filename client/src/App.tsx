import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import TemplateSelection from "@/pages/template-selection";
import ResumeBuilder from "@/pages/resume-builder";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={TemplateSelection} />
       <Route path="/builder/:id" component={ResumeBuilder} />
       <Route path="/builder/:id/:template/:preset" component={ResumeBuilder} />
      <Route path="/builder" component={ResumeBuilder} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
