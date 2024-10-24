import { CspDirective, StorageKey } from "@/src/dto";
import StorageHelper from "@/src/helpers/StorageHelper";
import React, { useEffect, useState } from "react";
import { PermissionPolicy } from "../../src/dto/permission-policy";
import { AppData } from "../../src/dto";

function App() {
  const [appInfo, setAppInfo] = useState<AppData | null>();

  const [cspDirectives, setCspDirectives] = useState<
    Record<number, CspDirective[]>
  >({});

  const [permissionPolicy, setPermissionPolicy] = useState<
    Record<number, PermissionPolicy[]>
  >({});

  const [riskLevelAmount, setRiskLevelAmount] = useState({
    high: 0,
    medium: 0,
    low: 0,
    total:0
  });

  useEffect(() => {
    const getPageInfo = async () => {
      const cspDirectives =
        (await StorageHelper.get<CspDirective[]>(
          `local:${StorageKey.CSP_DIRECTIVES}`
        )) || [];
      const riskOrder = ["High", "Medium", "Low"];
      const groupByRiskLevel = cspDirectives.reduce((acc, directive: any) => {
        if (!acc[directive.riskLevel]) {
          acc[directive.riskLevel] = [];
        }
        acc[directive.riskLevel].push(directive);
        return acc;
      }, {} as Record<string, CspDirective[]>);

      const sortedGroupByRiskLevel = Object.keys(groupByRiskLevel)
        .sort((a, b) => riskOrder.indexOf(a) - riskOrder.indexOf(b))
        .reduce((acc, key) => {
          acc[key] = groupByRiskLevel[key];
          return acc;
        }, {} as Record<string, CspDirective[]>);

      setCspDirectives(sortedGroupByRiskLevel);

      const permissionPolicy =
        (await StorageHelper.get<PermissionPolicy[]>(
          `local:${StorageKey.PERMISSIONS_DIRECTIVES}`
        )) || [];
      const groupByPermissionPolicy = permissionPolicy.reduce(
        (acc, directive: any) => {
          if (!acc[directive.riskLevel]) {
            acc[directive.riskLevel] = [];
          }
          acc[directive.riskLevel].push(directive);
          return acc;
        },
        {} as Record<string, PermissionPolicy[]>
      );

      const sortedGroupByPermissionPolicy = Object.keys(groupByPermissionPolicy)
        .sort((a, b) => riskOrder.indexOf(a) - riskOrder.indexOf(b))
        .reduce((acc, key) => {
          acc[key] = groupByPermissionPolicy[key];
          return acc;
        }, {} as Record<string, PermissionPolicy[]>);

      setPermissionPolicy(sortedGroupByPermissionPolicy);

      const appInfo = await StorageHelper.get<AppData>(
        `local:${StorageKey.APP_DATA}`
      );
      setAppInfo(appInfo);
      const joinedDirectives = [...cspDirectives, ...permissionPolicy];
      const riskLevelAmount = joinedDirectives.reduce(
        (acc, directive) => {
          const riskLevel = directive.riskLevel.toLowerCase() as keyof typeof acc;
          acc[riskLevel] += 1;
          return acc;
        },
        { high: 0, medium: 0, low: 0, total: joinedDirectives.length }
      );
      setRiskLevelAmount(riskLevelAmount);
    };
    getPageInfo();
  }, []);

  return (
    <>
      <div className="flex flex-col items-start justify-start p-6 gap-4">
        <div className="flex flex-col gap-2 w-full">
          <div className="flex items-center justify-start gap-2">
            <img className="w-12 h-12" src={appInfo?.icon} alt="favicon"></img>
            <h2 className="text-2xl font-medium">{appInfo?.name}</h2>
          </div>
          <div className="flex items-start gap-8 justify-content-between align-content-between w-full border border-slate-700/60 rounded-md px-4 py-2">
            <div className="flex flex-col gap-2 text-lg font-semibold">
              <h2 className="text-lg font-medium">Risks Detected</h2>
              <span>{riskLevelAmount.total}</span>
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col gap-2 text-lg text-red-500 font-semibold">
                <span>High</span>
                <span>{riskLevelAmount.high}</span>
              </div>
              <div className="flex flex-col gap-2 text-lg text-orange-500 font-semibold">
                <span>Medium</span>
                <span>{riskLevelAmount.medium}</span>
              </div>
              <div className="flex flex-col gap-2 text-lg text-green-500 font-semibold">
                <span>Low</span>
                <span>{riskLevelAmount.low}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col py-2">
          <h2 className="text-2xl font-medium">Content Security Policy</h2>
          <ul>
            {Object.keys(cspDirectives).length === 0 ? (
              <div className="bg-zinc-800 p-2 mb-4">
                <span className="text-red-500 font-semibold">
                  No Content Security Policy Found
                </span>
              </div>
            ) : (
              Object.entries(cspDirectives).map(([riskLevel, directives]) => (
                <li key={riskLevel} className="bg-zinc-800 p-2 mb-4">
                  <h3
                    className={`text-xl font-medium mt-4 mb-2 ${
                      riskLevel === "High"
                        ? "text-red-500"
                        : riskLevel === "Medium"
                        ? "text-orange-500"
                        : "text-green-500"
                    }`}
                  >
                    {riskLevel} Risk ({directives.length})
                  </h3>
                  <ul>
                    {directives
                      .sort((a, b) => b.riskScore - a.riskScore)
                      .map((directive, index) => (
                        <li
                          key={directive.name}
                          className={`flex flex-col gap-2 mb-4 ${
                            index < directives.length - 1
                              ? "border-b border-slate-700/60"
                              : ""
                          }`}
                        >
                          <div className="flex gap-1">
                            <strong>Directive:</strong>
                            <span>{directive.name}</span>
                          </div>
                          <div className="flex flex-col gap-1">
                            <strong>Issue:</strong>
                            <span>{directive.technicalExplanation}</span>
                          </div>
                          <div className="flex flex-col gap-1">
                            <strong>Explanation:</strong>
                            <span>{directive.explanation}</span>
                          </div>
                          <div className="flex flex-col gap-1 mb-2">
                            <strong>Recommendation:</strong>
                            <span>{directive.recommended.join(", ")}</span>
                          </div>
                        </li>
                      ))}
                  </ul>
                </li>
              ))
            )}
          </ul>
        </div>
        <div className="flex flex-col py-2 w-full">
          <h2 className="text-2xl font-medium">Permission Policy</h2>
          <ul>
            {Object.keys(permissionPolicy).length === 0 ? (
              <div className="bg-zinc-800 p-2 mb-4">
                <span className="text-red-500 font-semibold">
                  No Permission Policy Found
                </span>
              </div>
            ) : (
              Object.entries(permissionPolicy).map(
                ([riskLevel, directives]) => (
                  <li key={riskLevel} className="bg-zinc-800 p-2 mb-4">
                    <h3
                      className={`text-xl font-medium mt-4 mb-2 ${
                        riskLevel === "High"
                          ? "text-red-500"
                          : riskLevel === "Medium"
                          ? "text-orange-500"
                          : "text-green-500"
                      }`}
                    >
                      {riskLevel} Risk ({directives.length})
                    </h3>
                    <ul>
                      {directives
                        .sort((a, b) => b.riskScore - a.riskScore)
                        .map((directive, index) => (
                          <li
                            key={directive.name}
                            className={`flex flex-col gap-2 mb-4 ${
                              index < directives.length - 1
                                ? "border-b border-slate-700/60"
                                : ""
                            }`}
                          >
                            <div className="flex gap-1">
                              <strong>Directive:</strong>
                              <span>{directive.name}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                              <strong>Issue:</strong>
                              <span>{directive.technicalExplanation}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                              <strong>Explanation:</strong>
                              <span>{directive.explanation}</span>
                            </div>
                            <div className="flex flex-col gap-1 mb-2">
                              <strong>Recommendation:</strong>
                              <span>{directive.recommended.join(", ")}</span>
                            </div>
                          </li>
                        ))}
                    </ul>
                  </li>
                )
              )
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
