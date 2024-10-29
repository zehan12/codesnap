import { ChoiceDefinition } from "@/types";
import { FC } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";

interface ChoiceProps {
    choices: ChoiceDefinition[];
    initialValue: ChoiceDefinition;
    setValue: (_: ChoiceDefinition) => void;
}

export const Choices: FC<ChoiceProps> = (
    {
        choices,
        initialValue,
        setValue
    }
) => {
    return (<>
        <RadioGroup defaultValue={initialValue.label}>
            <div className="flex gap-3 py-[7px] text-sm">
                {
                    choices.map((choice) => (
                        <div key={choice.label} className="flex items-center space-x-2">
                            <RadioGroupItem value={choice.label} id={choice.label} />
                            <Label htmlFor={choice.label}
                                className={cn("rounded-md py-1 px-2",
                                    "transition-colors duration-300 ease-in-out")}
                            >
                                {choice.label}
                            </Label>
                        </div>
                    ))
                }
            </div>
        </RadioGroup>
    </>)
}