import { CspDirective, StorageKey } from '@/src/dto';
import StorageHelper from '@/src/helpers/StorageHelper';
import React, { useEffect, useState } from 'react';
import { PermissionPolicy } from '../../src/dto/permission-policy';


function App() {
  const [siteName, setSiteName] = useState("");

  const [cspDirectives, setCspDirectives] = useState<Record<number, CspDirective[]>>({});

  const [permissionPolicy, setPermissionPolicy] = useState<Record<number, PermissionPolicy[]>>({});

  useEffect(() => {
    const getPageInfo = async () => {
      const cspDirectives = await StorageHelper.get<CspDirective[]>(`local:${StorageKey.CSP_DIRECTIVES}`) || [];
      const groupByRiskLevel = cspDirectives.reduce((acc, directive: any) => {
        if (!acc[directive.riskLevel]) {
          acc[directive.riskLevel] = [];
        }
        acc[directive.riskLevel].push(directive);
        return acc;
      }, {} as Record<number, CspDirective[]>);
      setCspDirectives(groupByRiskLevel);

      const permissionPolicy = await StorageHelper.get<PermissionPolicy[]>(`local:${StorageKey.PERMISSIONS_DIRECTIVES}`) || [];
      const groupByPermissionPolicy = permissionPolicy.reduce((acc, directive: any) => {
        if (!acc[directive.riskLevel]) {
          acc[directive.riskLevel] = [];
        }
        acc[directive.riskLevel].push(directive);
        return acc;
      }, {} as Record<number, PermissionPolicy[]>);
      setPermissionPolicy(groupByPermissionPolicy);
    };
    getPageInfo();
  }, []);

  return (
    <>
      <div className="text-2xl text-red-500 font-medium">App name : {siteName}</div>
     
      <ul>
  CSP:
  {Object.entries(cspDirectives).map(([riskLevel, directives]) => (
    <li key={riskLevel}>
      <h3>Risk Level: {riskLevel}</h3>
      <ul>
        {directives
          .sort((a, b) => b.riskScore - a.riskScore)
          .map((directive) => (
            <li key={directive.name} style={{ marginBottom: '10px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <span>
                {directive.name}: {directive.riskScore}
              </span>
              <span>
                {directive.technicalExplanation}
              </span>
              <span>
                {directive.explanation}
              </span>
              <span>
                {directive.recommended.join(", ")}
              </span>
            </li>
          ))}
      </ul>
    </li>
  ))}
</ul>
<ul>
  Permission Policy:
  {Object.keys(permissionPolicy).length === 0 ? (
    <div>
      No Permissions Policy Directives Found
    </div>
  ) : (
    Object.entries(permissionPolicy).map(([riskLevel, directives]) => (
      <li key={riskLevel}>
        <h3>Risk Level: {riskLevel}</h3>
        <ul>
          {directives
            .sort((a, b) => b.riskScore - a.riskScore)
            .map((directive) => (
              <li key={directive.name} style={{ marginBottom: '10px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <span>
                  {directive.name}: {directive.riskScore}
                </span>
                <span>
                {directive.technicalExplanation}
              </span>
                <span>
                  {directive.explanation}
                </span>
                <span>
                  {directive.recommended.join(", ")}
                </span>
              </li>
            ))}
        </ul>
      </li>
    ))
  )}
</ul>
    </>
  );
}

export default App;