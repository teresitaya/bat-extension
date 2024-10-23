import { DirectiveValue } from "./directive-value";
import { RiskLevel } from "./risk-level";

export type CspDirective = {
    name: string;
    description: string;
    value: DirectiveValue[];
    recommended: DirectiveValue[];
    riskLevel: RiskLevel;
    riskScore: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
    explanation: string;
    technicalExplanation: string;
    deprecated?: boolean;
}