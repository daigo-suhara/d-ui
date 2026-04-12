import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Step {
  label: string;
  description?: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  orientation?: "horizontal" | "vertical";
  className?: string;
}

export function StepIndicator({
  steps,
  currentStep,
  orientation = "horizontal",
  className,
}: StepIndicatorProps) {
  const isVertical = orientation === "vertical";

  return (
    <div
      className={cn(
        isVertical ? "flex flex-col gap-0" : "flex items-start",
        className
      )}
    >
      {steps.map((step, i) => {
        const status =
          i < currentStep ? "completed" : i === currentStep ? "active" : "upcoming";
        const isLast = i === steps.length - 1;

        return (
          <div
            key={i}
            className={cn(
              isVertical ? "flex gap-4 pb-6 last:pb-0" : "flex flex-col items-center flex-1 last:flex-none"
            )}
          >
            {/* Circle + connector (horizontal) */}
            {!isVertical && (
              <div className="flex w-full items-center">
                <div
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors duration-300",
                    status === "completed" && "border-primary bg-primary text-primary-foreground",
                    status === "active" && "border-primary bg-background text-primary",
                    status === "upcoming" && "border-muted-foreground/30 bg-background text-muted-foreground/50"
                  )}
                >
                  {status === "completed" ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <span>{i + 1}</span>
                  )}
                </div>
                {!isLast && (
                  <div
                    className={cn(
                      "h-0.5 flex-1 transition-colors duration-300",
                      i < currentStep ? "bg-primary" : "bg-muted"
                    )}
                  />
                )}
              </div>
            )}

            {/* Circle + connector (vertical) */}
            {isVertical && (
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors duration-300",
                    status === "completed" && "border-primary bg-primary text-primary-foreground",
                    status === "active" && "border-primary bg-background text-primary",
                    status === "upcoming" && "border-muted-foreground/30 bg-background text-muted-foreground/50"
                  )}
                >
                  {status === "completed" ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <span>{i + 1}</span>
                  )}
                </div>
                {!isLast && (
                  <div
                    className={cn(
                      "w-0.5 flex-1 min-h-6 mt-1 transition-colors duration-300",
                      i < currentStep ? "bg-primary" : "bg-muted"
                    )}
                  />
                )}
              </div>
            )}

            {/* Label */}
            <div
              className={cn(
                isVertical ? "flex-1 min-w-0" : "mt-2 text-center"
              )}
            >
              <p
                className={cn(
                  "text-xs font-medium",
                  status === "active" && "text-primary",
                  status === "completed" && "text-foreground",
                  status === "upcoming" && "text-muted-foreground/50"
                )}
              >
                {step.label}
              </p>
              {step.description && (
                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                  {step.description}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
