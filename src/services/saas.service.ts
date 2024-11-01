import { CspDirective, CspDirectives, DirectiveValue, StorageKey } from "../dto";
import { PermissionPolicies } from "../dto/permission";
import { PermissionPolicy } from "../dto/permission-policy";
import { PermissionPolicyValue } from "../dto/policy-value";
import StorageHelper from "../helpers/StorageHelper";

class SaasService {
  checkDirective(directive: string, value: string): CspDirective | null {
    const found = CspDirectives.find((d) => d.name === directive);
    if (!found) {
      console.log(`Directive not found: ${directive}`);
      return null;
    }
    const v = value.replace(/'/g, '');
    if (v === DirectiveValue.NONE) {
      found.value.push(v as any);
    }
    // check for both unsafe-inline and unsafe-eval
    if (v.indexOf(DirectiveValue.UNSAFE_INLINE) > -1 || v.indexOf(DirectiveValue.UNSAFE_EVAL) > -1) {
      const valueOf = v.indexOf(DirectiveValue.UNSAFE_INLINE) > -1 && v.indexOf(DirectiveValue.UNSAFE_EVAL) > -1
      ? `${DirectiveValue.UNSAFE_INLINE} and ${DirectiveValue.UNSAFE_EVAL}` :
      v.indexOf(DirectiveValue.UNSAFE_INLINE) > -1 ? DirectiveValue.UNSAFE_INLINE: DirectiveValue.UNSAFE_EVAL;
      found.value = [];
      found.technicalExplanation = `Usage of ${valueOf} on ${found.name}`;
      (found as any).recommended=[`Remove ${valueOf} from your source code.`];
    }else {
      if (found.recommended.includes(v as any)) {
        found.value.push(v as any);
      } else {
        found.value = [];
        found.technicalExplanation = `Usage of wildcards on ${found.name}`;
        (found as any).recommended=[`For sensitive resources, explicitly define the full paths.`];
      }
    }
    return found;
  }

  async splitDirectives(value: string): Promise<void>  {
    const directivesArray = value
                ?.split(";")
                .filter((directive) => directive.trim().length > 0) || [];
            const directives = directivesArray.map((directive) => {
              const [name, ...valueParts] = directive.trim().split(" ");
              const value = valueParts.join(" ");
              return {
                name: name,
                value: value,
              };
            });
            const resultDirectives = directives
              .map((directive) => {
                return this.checkDirective(
                  directive.name,
                  directive.value
                );
              })
              .filter((directive) => directive && directive.value.length === 0);
             StorageHelper.set(
              `local:${StorageKey.CSP_DIRECTIVES}`,
              resultDirectives
            );
  }

  checkPermissionPolicy(directive:string, value:string): PermissionPolicy | null {
    const found = PermissionPolicies.find((d) => d.name === directive);
    if (!found) {
      console.log(`Permission not found: ${directive}`);
      return null;
    }
    value.split(" ").forEach((v) => {
        //remove '' from value
       v = v.replace(/'/g, '');
      if (v === PermissionPolicyValue.DISALLOWED) {
        found.value.push(v as any);
      } else {
        if (
          v === PermissionPolicyValue.ALLOWED
        ) {
          found.value = [];
        } else {
          if (found.recommended.includes(v as any)) {
            {
              found.value.push(v as any);
            }
            found.recommended.forEach((r) => {
              if (r.includes(value) || value.includes(r)) {
                found.value.push(value as any);
              }
            });
          }
        }
      }
    });
    return found;
  }
}

export default new SaasService();
