import { CspDirective, StorageKey } from '@/src/dto';
import StorageHelper from '@/src/helpers/StorageHelper';
import React, { useEffect, useState } from 'react';


function App() {
  const [siteName, setSiteName] = useState("");

  const [cspDirectives, setCspDirectives] = useState<Record<number, CspDirective[]>>({});

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
    };
    getPageInfo();
  }, []);

  return (
    <>
      <div className="card">App name : {siteName}</div>
      <ul>
        {Object.entries(cspDirectives).map(([riskLevel, directives]) => (
          <li key={riskLevel}>
            <h3>Risk Level: {riskLevel}</h3>
            <ul>
              {directives
                .sort((a, b) => b.riskScore - a.riskScore)
                .map((directive) => (
                  <li key={directive.name} style={{ marginBottom: '10px', display:'flex', flexDirection:'column', gap:'5px' }}>
                    <span>
                    {directive.name}: {directive.riskScore}
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
    </>
  );
}

export default App;