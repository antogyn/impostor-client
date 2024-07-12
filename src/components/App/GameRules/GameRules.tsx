import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export const GameRules = () => {
  const { t } = useTranslation();
  const rules = t("app.game-rules.rules", { returnObjects: true }) as string[];
  const principles = t("app.game-rules.principle.principles", { returnObjects: true }) as string[];

  return (
    <div className="absolute top-4 left-4 flex items-center space-x-3">
      <Sheet>
        <SheetTrigger>
          <Button className="" size="icon" variant="ghost">
            ❓
          </Button>
        </SheetTrigger>
        <SheetContent className="w-screen h-screen">
          <SheetHeader>
            <SheetTitle>{t("app.game-rules.how-to-play")}</SheetTitle>
            <SheetDescription className="space-y-6 flex flex-col justify-center">
              <h4>{t("app.game-rules.principle.title")}</h4>
              <div>
                {principles.map((principle) => (
                  <p key={principle} className="text-lg text-left">
                    •&nbsp;{principle}
                  </p>
                ))}
              </div>
              <h4>{t("app.game-rules.title")}</h4>
              <div>
                {rules.map((rule) => (
                  <p key={rule} className="text-lg text-left">
                    •&nbsp;{rule}
                  </p>
                ))}
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};
