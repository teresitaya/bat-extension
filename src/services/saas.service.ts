import { CspDirective, CspDirectives, DirectiveValue } from "../dto";
import { PermissionPolicies } from "../dto/permission";
import { PermissionPolicy } from "../dto/permission-policy";
import { PermissionPolicyValue } from "../dto/policy-value";

class SaasService {
  checkDirective(directive: string, value: string): CspDirective | null {
    const found = CspDirectives.find((d) => d.name === directive);
    if (!found) {
      console.log(`Directive not found: ${directive}`);
      return null;
    }
    value.split(" ").forEach((v) => {
        //remove '' from value
       v = v.replace(/'/g, '');
      if (v === DirectiveValue.NONE) {
        found.value.push(v as any);
      } else {
        if (
          v.indexOf(DirectiveValue.UNSAFE_INLINE) > -1 ||
            v.indexOf(DirectiveValue.UNSAFE_EVAL) > -1
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
