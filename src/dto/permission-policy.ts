import { PermissionPolicyValue } from "./policy-value";
import { RiskLevel } from "./risk-level";

export type PermissionPolicy = {
    name: string;
    description: string;
    value: PermissionPolicyValue[];
    recommended: PermissionPolicyValue[];
    riskLevel: RiskLevel;
    riskScore: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
    explanation: string;
    technicalExplanation: string;
}