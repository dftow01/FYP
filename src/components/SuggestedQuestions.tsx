
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface SuggestedQuestionsProps {
  onSelectQuestion: (question: string) => void;
}

export const SuggestedQuestions = ({ onSelectQuestion }: SuggestedQuestionsProps) => {
  const suggestions = [
    "What's the prediction for Selangor?",
    "What's the trend for Kuala Lumpur?",
    "How is Sabah looking for the next week?",
    "What are the latest vaccination statistics?",
    "What are the current COVID-19 trends in Malaysia?",
    "What are the main risk factors for severe COVID-19?",
    "What symptoms should I watch for?",
    "Which variants are currently circulating?"
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm">Suggested Questions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {suggestions.map((question, index) => (
          <Button
            key={index}
            variant="ghost"
            className="w-full justify-start text-left h-auto py-2 px-3"
            onClick={() => onSelectQuestion(question)}
          >
            <span className="line-clamp-2 text-xs">{question}</span>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};
